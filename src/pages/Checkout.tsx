import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { convertPrice, formatPrice } from '@/data/products';

const Checkout: React.FC = () => {
  const { items, subtotal } = useCart();
  const { currency } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [createAccount, setCreateAccount] = useState(false);

  const currentSubtotal = convertPrice(subtotal, currency);
  const shipping = currentSubtotal >= 75 ? 0 : 9.99;
  const tax = currentSubtotal * 0.08; // 8% tax placeholder
  const total = currentSubtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="section-heading mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="create-account"
                    checked={createAccount}
                    onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
                  />
                  <Label htmlFor="create-account" className="text-sm font-normal">
                    Create an account for faster checkout next time
                  </Label>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" placeholder="Apt 4B" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="cursor-pointer">
                      <span className="font-medium">Standard Shipping</span>
                      <span className="block text-sm text-muted-foreground">5-7 business days</span>
                    </Label>
                  </div>
                  <span className={shipping === 0 ? "text-success font-medium" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="cursor-pointer">
                      <span className="font-medium">Express Shipping</span>
                      <span className="block text-sm text-muted-foreground">2-3 business days</span>
                    </Label>
                  </div>
                  <span>{formatPrice(19.99, currency)}</span>
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="cursor-pointer flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">via Stripe</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === 'stripe' && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    You'll be redirected to Stripe's secure checkout to complete your payment.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const price = convertPrice(item.product.priceUSD, currency);
                  return (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                        {Object.keys(item.selectedVariants).length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {Object.values(item.selectedVariants).join(' / ')}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(price * item.quantity, currency)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(currentSubtotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-success" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (est.)</span>
                  <span>{formatPrice(tax, currency)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-border">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>

              <Button className="w-full mt-6 btn-premium text-primary-foreground" size="lg">
                <Lock className="mr-2 h-4 w-4" />
                Complete Order
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing your order, you agree to our{' '}
                <Link to="/terms" className="underline">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
