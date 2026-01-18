import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CouponResult {
  valid: boolean;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  discountAmount?: number;
  couponId?: string;
  error?: string;
}

export interface UseCouponReturn {
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: CouponResult | null;
  isValidating: boolean;
  error: string | null;
  applyCoupon: (cartTotal: number) => Promise<void>;
  removeCoupon: () => void;
}

export function useCoupon(): UseCouponReturn {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCoupon = useCallback(async (cartTotal: number) => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke<CouponResult>(
        'validate-coupon',
        {
          body: {
            code: couponCode.trim(),
            cartTotal,
          },
        }
      );

      if (invokeError) {
        console.error('[useCoupon] Error validating coupon:', invokeError);
        setError('Failed to validate coupon. Please try again.');
        setAppliedCoupon(null);
        return;
      }

      if (!data) {
        setError('Invalid response from server');
        setAppliedCoupon(null);
        return;
      }

      if (data.valid) {
        setAppliedCoupon(data);
        setError(null);
      } else {
        setError(data.error || 'Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (err) {
      console.error('[useCoupon] Unexpected error:', err);
      setError('An unexpected error occurred');
      setAppliedCoupon(null);
    } finally {
      setIsValidating(false);
    }
  }, [couponCode]);

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setAppliedCoupon(null);
    setError(null);
  }, []);

  return {
    couponCode,
    setCouponCode,
    appliedCoupon,
    isValidating,
    error,
    applyCoupon,
    removeCoupon,
  };
}
