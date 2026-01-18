import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS_PER_WINDOW = 10; // 10 attempts per 5 minutes

// In-memory rate limit store (resets on function cold start)
const rateLimitStore = new Map<string, { attempts: number[]; blocked: boolean }>();

// Clean up old entries periodically
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

// Check and update rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanupRateLimitStore();
  
  const now = Date.now();
  let entry = rateLimitStore.get(ip);
  
  if (!entry) {
    entry = { attempts: [], blocked: false };
    rateLimitStore.set(ip, entry);
  }
  
  // Filter to only recent attempts
  entry.attempts = entry.attempts.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (entry.attempts.length >= MAX_ATTEMPTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  
  // Add current attempt
  entry.attempts.push(now);
  
  return { 
    allowed: true, 
    remaining: MAX_ATTEMPTS_PER_WINDOW - entry.attempts.length 
  };
}

// Get client IP from request headers
function getClientIP(req: Request): string {
  // Try various headers that may contain the real IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  return 'unknown';
}

interface ValidateCouponRequest {
  code: string;
  cartTotal: number;
}

interface CouponValidationResult {
  valid: boolean;
  error?: string;
  discount_type?: string;
  discount_value?: number;
  coupon_id?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ valid: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit BEFORE any validation logic
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.log(`[validate-coupon] Rate limit exceeded for IP: ${clientIP.substring(0, 8)}***`);
      return new Response(
        JSON.stringify({ valid: false, error: 'Too many attempts. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '300' // 5 minutes
          } 
        }
      );
    }

    // Parse request body
    let body: ValidateCouponRequest;
    try {
      body = await req.json();
    } catch {
      // Generic error - don't reveal parsing issues
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { code, cartTotal } = body;

    // Validate input with generic error messages
    if (!code || typeof code !== 'string' || code.length === 0 || code.length > 50) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid coupon code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof cartTotal !== 'number' || cartTotal < 0 || !isFinite(cartTotal)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize the code - only allow alphanumeric and common characters
    const sanitizedCode = code.trim().toUpperCase().replace(/[^A-Z0-9\-_]/g, '');
    if (sanitizedCode.length === 0) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid coupon code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[validate-coupon] Validating code for IP: ${clientIP.substring(0, 8)}***, remaining attempts: ${rateLimit.remaining}`);

    // Create Supabase client with service role for secure access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the secure database function to validate the coupon
    const { data, error } = await supabase.rpc('validate_coupon', {
      p_code: sanitizedCode,
      p_cart_total: cartTotal,
    });

    if (error) {
      console.error('[validate-coupon] Database error:', error.message);
      return new Response(
        JSON.stringify({ valid: false, error: 'Unable to validate coupon' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = data as CouponValidationResult;

    // Calculate the actual discount amount for the response
    if (result.valid && result.discount_type && result.discount_value) {
      let discountAmount = 0;
      if (result.discount_type === 'percentage') {
        discountAmount = (cartTotal * result.discount_value) / 100;
      } else if (result.discount_type === 'fixed') {
        discountAmount = Math.min(result.discount_value, cartTotal);
      }

      console.log(`[validate-coupon] Valid coupon applied for IP: ${clientIP.substring(0, 8)}***`);

      return new Response(
        JSON.stringify({
          valid: true,
          discountType: result.discount_type,
          discountValue: result.discount_value,
          discountAmount: Math.round(discountAmount * 100) / 100,
          couponId: result.coupon_id,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return generic error response - don't reveal if coupon exists vs expired vs invalid
    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid coupon code' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[validate-coupon] Unexpected error:', err);
    return new Response(
      JSON.stringify({ valid: false, error: 'Unable to validate coupon' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
