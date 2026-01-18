import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration for guest orders
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ORDERS_PER_WINDOW = 5; // 5 orders per 10 minutes per IP

// In-memory rate limit store
const rateLimitStore = new Map<string, { attempts: number[] }>();

// Clean up old entries
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    const recentAttempts = value.attempts.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (recentAttempts.length === 0) {
      rateLimitStore.delete(key);
    } else {
      value.attempts = recentAttempts;
    }
  }
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanupRateLimitStore();
  
  const now = Date.now();
  let entry = rateLimitStore.get(ip);
  
  if (!entry) {
    entry = { attempts: [] };
    rateLimitStore.set(ip, entry);
  }
  
  entry.attempts = entry.attempts.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (entry.attempts.length >= MAX_ORDERS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  
  entry.attempts.push(now);
  
  return { 
    allowed: true, 
    remaining: MAX_ORDERS_PER_WINDOW - entry.attempts.length 
  };
}

// Get client IP
function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP.trim();
  
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP.trim();
  
  return 'unknown';
}

// Sanitize string input
function sanitizeString(input: string, maxLength: number = 255): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim().substring(0, maxLength);
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation - basic international format
const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;

// Validate order data
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface CreateOrderRequest {
  email: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  discount?: number;
  paymentMethod: 'stripe' | 'paypal';
  shippingMethod: 'standard' | 'express';
}

function validateOrderData(data: unknown): { valid: boolean; error?: string; sanitized?: CreateOrderRequest } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request data' };
  }

  const order = data as Record<string, unknown>;

  // Validate email
  if (!order.email || typeof order.email !== 'string' || !emailRegex.test(order.email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Validate shipping address
  const addr = order.shippingAddress as Record<string, unknown>;
  if (!addr || typeof addr !== 'object') {
    return { valid: false, error: 'Shipping address is required' };
  }

  const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'country', 'phone'];
  for (const field of requiredFields) {
    if (!addr[field] || typeof addr[field] !== 'string' || addr[field].toString().trim().length === 0) {
      return { valid: false, error: `${field} is required` };
    }
  }

  // Validate phone format
  if (!phoneRegex.test(addr.phone as string)) {
    return { valid: false, error: 'Invalid phone number' };
  }

  // Validate items array
  const items = order.items as unknown[];
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: 'Order must contain at least one item' };
  }

  // Validate each item
  for (const item of items) {
    const i = item as Record<string, unknown>;
    if (!i.id || !i.name || typeof i.price !== 'number' || typeof i.quantity !== 'number') {
      return { valid: false, error: 'Invalid item data' };
    }
    if (i.price <= 0 || i.quantity <= 0 || i.quantity > 100 || !Number.isInteger(i.quantity)) {
      return { valid: false, error: 'Invalid item quantity or price' };
    }
  }

  // Validate totals
  const subtotal = order.subtotal as number;
  const shipping = order.shipping as number;
  const tax = order.tax as number;
  const total = order.total as number;

  if (typeof subtotal !== 'number' || subtotal <= 0 || !isFinite(subtotal)) {
    return { valid: false, error: 'Invalid subtotal' };
  }
  if (typeof shipping !== 'number' || shipping < 0 || !isFinite(shipping)) {
    return { valid: false, error: 'Invalid shipping cost' };
  }
  if (typeof tax !== 'number' || tax < 0 || !isFinite(tax)) {
    return { valid: false, error: 'Invalid tax amount' };
  }
  if (typeof total !== 'number' || total <= 0 || !isFinite(total)) {
    return { valid: false, error: 'Invalid total' };
  }

  // Validate payment and shipping methods
  if (!['stripe', 'paypal'].includes(order.paymentMethod as string)) {
    return { valid: false, error: 'Invalid payment method' };
  }
  if (!['standard', 'express'].includes(order.shippingMethod as string)) {
    return { valid: false, error: 'Invalid shipping method' };
  }

  // Return sanitized data
  return {
    valid: true,
    sanitized: {
      email: sanitizeString(order.email as string, 255).toLowerCase(),
      shippingAddress: {
        firstName: sanitizeString(addr.firstName as string, 50),
        lastName: sanitizeString(addr.lastName as string, 50),
        address: sanitizeString(addr.address as string, 200),
        apartment: addr.apartment ? sanitizeString(addr.apartment as string, 50) : undefined,
        city: sanitizeString(addr.city as string, 100),
        state: sanitizeString(addr.state as string, 50),
        zip: sanitizeString(addr.zip as string, 20),
        country: sanitizeString(addr.country as string, 50),
        phone: sanitizeString(addr.phone as string, 20),
      },
      items: (items as Record<string, unknown>[]).map(i => ({
        id: sanitizeString(i.id as string, 36),
        name: sanitizeString(i.name as string, 200),
        price: Math.round((i.price as number) * 100) / 100,
        quantity: Math.min(Math.floor(i.quantity as number), 100),
        image: i.image ? sanitizeString(i.image as string, 500) : undefined,
      })),
      subtotal: Math.round(subtotal * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      couponCode: order.couponCode ? sanitizeString(order.couponCode as string, 50).toUpperCase() : undefined,
      discount: typeof order.discount === 'number' ? Math.round((order.discount as number) * 100) / 100 : undefined,
      paymentMethod: order.paymentMethod as 'stripe' | 'paypal',
      shippingMethod: order.shippingMethod as 'standard' | 'express',
    },
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit FIRST
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.log(`[create-order] Rate limit exceeded for IP: ${clientIP.substring(0, 8)}***`);
      return new Response(
        JSON.stringify({ success: false, error: 'Too many orders. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '600' // 10 minutes
          } 
        }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and sanitize order data
    const validation = validateOrderData(body);
    if (!validation.valid || !validation.sanitized) {
      console.log(`[create-order] Validation failed for IP: ${clientIP.substring(0, 8)}***: ${validation.error}`);
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderData = validation.sanitized;

    console.log(`[create-order] Processing order for IP: ${clientIP.substring(0, 8)}***, items: ${orderData.items.length}, total: ${orderData.total}`);

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user is authenticated (optional for guest checkout)
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        userId = user.id;
        console.log(`[create-order] Authenticated user: ${userId.substring(0, 8)}***`);
      }
    }

    // Prepare order record
    const shippingAddr = {
      full_name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
      address_line1: orderData.shippingAddress.address,
      address_line2: orderData.shippingAddress.apartment || null,
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      postal_code: orderData.shippingAddress.zip,
      country: orderData.shippingAddress.country,
      phone: orderData.shippingAddress.phone,
    };

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        email: orderData.email,
        shipping_address: shippingAddr,
        subtotal_usd: orderData.subtotal,
        shipping_usd: orderData.shipping,
        tax_usd: orderData.tax,
        discount_usd: orderData.discount || 0,
        total_usd: orderData.total,
        coupon_code: orderData.couponCode || null,
        payment_method: orderData.paymentMethod,
        status: 'pending',
        payment_status: 'pending',
      })
      .select('id, order_number')
      .single();

    if (orderError) {
      console.error('[create-order] Order creation failed:', orderError.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.id.length === 36 ? item.id : null, // Only use as UUID if valid
      name: item.name,
      price_usd: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('[create-order] Order items insertion failed:', itemsError.message);
      // Don't fail the order, items can be reconciled later
    }

    console.log(`[create-order] Order created successfully: ${order.order_number} for IP: ${clientIP.substring(0, 8)}***`);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[create-order] Unexpected error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process order' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
