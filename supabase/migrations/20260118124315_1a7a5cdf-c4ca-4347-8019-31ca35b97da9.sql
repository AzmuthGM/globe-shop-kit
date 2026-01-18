-- Fix: Remove public coupon exposure - restrict to admin only
-- Drop the public SELECT policy
DROP POLICY IF EXISTS "Public can view active coupons" ON public.coupons;

-- Create admin-only SELECT policy
CREATE POLICY "Admins can view coupons" 
ON public.coupons FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_admin_or_editor(auth.uid()));

-- Create a secure function to validate coupon codes server-side
-- This allows coupon validation without exposing the coupons table
CREATE OR REPLACE FUNCTION public.validate_coupon(
  p_code TEXT,
  p_cart_total NUMERIC
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_coupon RECORD;
  v_result JSON;
BEGIN
  -- Find the coupon
  SELECT * INTO v_coupon
  FROM public.coupons
  WHERE code = UPPER(TRIM(p_code))
    AND is_active = true
    AND (starts_at IS NULL OR starts_at <= NOW())
    AND (expires_at IS NULL OR expires_at > NOW())
    AND (max_uses IS NULL OR used_count < max_uses)
  LIMIT 1;
  
  -- Check if coupon exists
  IF v_coupon IS NULL THEN
    RETURN json_build_object(
      'valid', false,
      'error', 'Invalid or expired coupon code'
    );
  END IF;
  
  -- Check minimum order amount
  IF v_coupon.min_order_amount IS NOT NULL AND p_cart_total < v_coupon.min_order_amount THEN
    RETURN json_build_object(
      'valid', false,
      'error', format('Minimum order amount of $%.2f required', v_coupon.min_order_amount)
    );
  END IF;
  
  -- Calculate discount
  RETURN json_build_object(
    'valid', true,
    'discount_type', v_coupon.discount_type,
    'discount_value', v_coupon.discount_value,
    'coupon_id', v_coupon.id
  );
END;
$$;