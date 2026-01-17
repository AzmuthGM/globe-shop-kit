import React from 'react';
import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from 'lucide-react';

const usps = [
  {
    icon: Truck,
    title: 'Fast Free Shipping',
    description: 'Free delivery on orders over $75. US & EU delivery in 5-7 days.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'Your payment info is safe with Stripe & PayPal protection.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our team is here to help you anytime, anywhere.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns on all products.',
  },
];

const USPSection: React.FC = () => {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <div 
              key={usp.title} 
              className="flex items-start gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <usp.icon className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{usp.title}</h3>
                <p className="text-sm text-muted-foreground">{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
