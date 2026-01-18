-- Fix validate_coupon function: change min_order_amount to min_order_value
CREATE OR REPLACE FUNCTION public.validate_coupon(p_code text, p_cart_total numeric)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  
  -- Check minimum order amount (FIXED: use min_order_value instead of min_order_amount)
  IF v_coupon.min_order_value IS NOT NULL AND v_coupon.min_order_value > 0 AND p_cart_total < v_coupon.min_order_value THEN
    RETURN json_build_object(
      'valid', false,
      'error', format('Minimum order amount of $%.2f required', v_coupon.min_order_value)
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
$function$;