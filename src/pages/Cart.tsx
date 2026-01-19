import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Check, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCoupon } from '@/hooks/useCoupon';
import { convertPrice, formatPrice } from '@/data/products';
import { cn } from '@/lib/utils';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const { currency } = useCurrency();
  const {
    couponCode,
    setCouponCode,
    appliedCoupon,
    isValidating,
    error: couponError,
    applyCoupon,
    removeCoupon,
  } = useCoupon();

  const shippingThreshold = 75;
  const currentSubtotal = convertPrice(subtotal, currency);
  const freeShippingProgress = Math.min((currentSubtotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - currentSubtotal, 0);

  // Calculate discount amount based on applied coupon - convert from USD to current currency
  const discountAmountUSD = appliedCoupon?.discountAmount || 0;
  const discountAmount = convertPrice(discountAmountUSD, currency);
  const totalAfterDiscount = Math.max(currentSubtotal - discountAmount, 0);

  const handleApplyCoupon = () => {
    // Always send USD subtotal to edge function for validation
    applyCoupon(subtotal);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg" className="btn-premium text-primary-foreground">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="section-heading mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="p-4 bg-secondary rounded-xl">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Free shipping progress</span>
                  <span className="font-medium">
                    {formatPrice(remainingForFreeShipping, currency)} away
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            {items.map((item) => {
              const price = convertPrice(item.product.priceUSD, currency);
              const variantKey = JSON.stringify(item.selectedVariants);

              return (
                <div
                  key={`${item.product.id}-${variantKey}`}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="font-medium text-foreground hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {Object.keys(item.selectedVariants).length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {Object.values(item.selectedVariants).join(' / ')}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariants)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariants, item.quantity - 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariants, item.quantity + 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(price * item.quantity, currency)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(currentSubtotal, currency)}</span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span className="flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Discount ({appliedCoupon.discountType === 'percentage' 
                        ? `${appliedCoupon.discountValue}%` 
                        : formatPrice(appliedCoupon.discountValue || 0, currency)})
                    </span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={remainingForFreeShipping <= 0 ? "text-success" : ""}>
                    {remainingForFreeShipping <= 0 ? "Free" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Coupon - Secure server-side validation only */}
              <div className="mt-6 pt-4 border-t border-border">
                <label className="text-sm font-medium mb-2 block">Discount Code</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-success">
                      <Check className="h-4 w-4" />
                      <span className="font-medium">{couponCode}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeCoupon}
                      className="text-muted-foreground hover:text-destructive h-auto p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter code" 
                        className="flex-1"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        maxLength={50}
                        disabled={isValidating}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCoupon();
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        disabled={isValidating || !couponCode.trim()}
                      >
                        {isValidating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Apply'
                        )}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-destructive">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total</span>
                  <span>{formatPrice(totalAfterDiscount, currency)}</span>
                </div>

                <Button asChild className="w-full btn-premium text-primary-foreground" size="lg">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure checkout powered by Stripe & PayPal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
