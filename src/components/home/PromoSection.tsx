import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromoSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 rounded-full text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Get 20% Off Your
              <span className="block">First Order</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
              Sign up for our newsletter and unlock exclusive savings on premium products. 
              Plus, get early access to new arrivals and special promotions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-gold px-8">
                <Link to="/products">
                  Claim Offer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/50 mt-4">
              *Use code WELCOME20 at checkout. Valid for new customers only.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
                alt="Premium watch"
                className="rounded-2xl object-cover w-full aspect-square"
              />
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80"
                alt="Sunglasses"
                className="rounded-2xl object-cover w-full aspect-[4/3]"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80"
                alt="Sneakers"
                className="rounded-2xl object-cover w-full aspect-[4/3]"
              />
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
                alt="Backpack"
                className="rounded-2xl object-cover w-full aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
