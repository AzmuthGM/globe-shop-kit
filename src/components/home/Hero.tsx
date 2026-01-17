import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px] py-12 lg:py-0">
          {/* Content */}
          <div className="relative z-10 animate-slide-up">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              New Season Collection
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Discover Premium
              <span className="block text-gradient-gold">Curated Products</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Explore our handpicked selection of premium products from around the world. 
              Quality meets style in every item we offer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-premium text-primary-foreground px-8">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/category/electronics">
                  Explore Categories
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">Fast</p>
                <p className="text-sm text-muted-foreground">Free Shipping</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <div className="relative h-[400px] lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                alt="Premium products showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-transparent lg:via-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
