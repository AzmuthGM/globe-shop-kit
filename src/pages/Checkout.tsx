import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { convertPrice, formatPrice } from '@/data/products';
import { checkoutSchema, type CheckoutFormData, sanitizeInput } from '@/lib/validations/checkout';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      country: 'us',
      phone: '',
      createAccount: false,
      shippingMethod: 'standard',
      paymentMethod: 'stripe',
    },
  });

  const currentSubtotal = convertPrice(subtotal, currency);
  const shippingMethod = form.watch('shippingMethod');
  const paymentMethod = form.watch('paymentMethod');
  const shipping = shippingMethod === 'express' ? 19.99 : (currentSubtotal >= 75 ? 0 : 9.99);
  const tax = currentSubtotal * 0.08; // 8% tax placeholder
  const total = currentSubtotal + shipping + tax;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CheckoutFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Sanitize all string inputs before processing
      const sanitizedData = {
        ...data,
        email: sanitizeInput(data.email),
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        address: sanitizeInput(data.address),
        apartment: data.apartment ? sanitizeInput(data.apartment) : '',
        city: sanitizeInput(data.city),
        zip: sanitizeInput(data.zip),
        phone: sanitizeInput(data.phone),
      };

      // Prepare order data for the secure edge function
      const orderPayload = {
        email: sanitizedData.email,
        shippingAddress: {
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          address: sanitizedData.address,
          apartment: sanitizedData.apartment,
          city: sanitizedData.city,
          state: data.state,
          zip: sanitizedData.zip,
          country: data.country,
          phone: sanitizedData.phone,
        },
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.priceUSD,
          quantity: item.quantity,
          image: item.product.images[0],
        })),
        subtotal: currentSubtotal,
        shipping,
        tax,
        total,
        paymentMethod: data.paymentMethod,
        shippingMethod: data.shippingMethod,
      };

      // Call the secure create-order edge function
      const { data: result, error } = await supabase.functions.invoke('create-order', {
        body: orderPayload,
      });

      if (error) {
        console.error('Order creation error:', error);
        toast.error('Failed to create order', {
          description: 'Please try again later.',
        });
        return;
      }

      if (!result?.success) {
        toast.error('Order failed', {
          description: result?.error || 'Please check your information and try again.',
        });
        return;
      }

      // Order created successfully
      toast.success('Order placed successfully!', {
        description: `Thank you for your order, ${sanitizedData.firstName}! Order #${result.orderNumber}`,
      });
      
      clearCart();
      navigate('/');
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <div className="space-y-8">
                {/* Contact */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your@email.com" 
                              {...field}
                              maxLength={255}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="createAccount"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Create an account for faster checkout next time
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John" 
                                {...field}
                                maxLength={50}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Doe" 
                                {...field}
                                maxLength={50}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123 Main Street" 
                              {...field}
                              maxLength={200}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apartment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Apt 4B" 
                              {...field}
                              maxLength={50}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="New York" 
                                {...field}
                                maxLength={100}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ny">New York</SelectItem>
                                <SelectItem value="ca">California</SelectItem>
                                <SelectItem value="tx">Texas</SelectItem>
                                <SelectItem value="fl">Florida</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="10001" 
                                {...field}
                                maxLength={20}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+1 (555) 123-4567" 
                              {...field}
                              maxLength={20}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                  <FormField
                    control={form.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="standard" id="standard" />
                                <Label htmlFor="standard" className="cursor-pointer">
                                  <span className="font-medium">Standard Shipping</span>
                                  <span className="block text-sm text-muted-foreground">5-7 business days</span>
                                </Label>
                              </div>
                              <span className={currentSubtotal >= 75 ? "text-success font-medium" : ""}>
                                {currentSubtotal >= 75 ? "Free" : formatPrice(9.99, currency)}
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            className="space-y-3"
                          >
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <Button 
                    type="submit" 
                    className="w-full mt-6 btn-premium text-primary-foreground" 
                    size="lg"
                    disabled={isSubmitting || form.formState.isSubmitting}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Processing...' : 'Complete Order'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By placing your order, you agree to our{' '}
                    <Link to="/terms" className="underline">Terms of Service</Link> and{' '}
                    <Link to="/privacy" className="underline">Privacy Policy</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Checkout;
