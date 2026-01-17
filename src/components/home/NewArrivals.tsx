import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import { getNewArrivals } from '@/data/products';

const NewArrivals: React.FC = () => {
  const newArrivals = getNewArrivals();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-heading">New Arrivals</h2>
            <p className="section-subheading">
              Fresh drops just landed in store
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/products?sort=newest">
              See All New
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={newArrivals} columns={4} />
      </div>
    </section>
  );
};

export default NewArrivals;
