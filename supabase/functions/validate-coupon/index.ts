import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ valid: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body: ValidateCouponRequest = await req.json();
    const { code, cartTotal } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      console.log('[validate-coupon] Invalid code provided:', code);
      return new Response(
        JSON.stringify({ valid: false, error: 'Coupon code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof cartTotal !== 'number' || cartTotal < 0) {
      console.log('[validate-coupon] Invalid cart total:', cartTotal);
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid cart total' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize the code - only allow alphanumeric and common characters
    const sanitizedCode = code.trim().toUpperCase().replace(/[^A-Z0-9\-_]/g, '');
    if (sanitizedCode.length === 0 || sanitizedCode.length > 50) {
      console.log('[validate-coupon] Invalid code format:', code);
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid coupon code format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[validate-coupon] Validating code:', sanitizedCode, 'for cart total:', cartTotal);

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
      console.error('[validate-coupon] Database error:', error);
      return new Response(
        JSON.stringify({ valid: false, error: 'Failed to validate coupon' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = data as CouponValidationResult;
    console.log('[validate-coupon] Validation result:', result);

    // Calculate the actual discount amount for the response
    if (result.valid && result.discount_type && result.discount_value) {
      let discountAmount = 0;
      if (result.discount_type === 'percentage') {
        discountAmount = (cartTotal * result.discount_value) / 100;
      } else if (result.discount_type === 'fixed') {
        discountAmount = Math.min(result.discount_value, cartTotal);
      }

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

    // Return error response
    return new Response(
      JSON.stringify({ valid: false, error: result.error || 'Invalid coupon code' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[validate-coupon] Unexpected error:', err);
    return new Response(
      JSON.stringify({ valid: false, error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
