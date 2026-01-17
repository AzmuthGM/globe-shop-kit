import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts: React.FC = () => {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-heading">Featured Products</h2>
            <p className="section-subheading">
              Handpicked favorites loved by our customers
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={featured} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
