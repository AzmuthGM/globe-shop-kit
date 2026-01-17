import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="section-subheading mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-card animate-slide-up",
                index === 0 && "sm:col-span-2 lg:col-span-1"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm mb-3">{category.productCount} Products</p>
                <span className="inline-flex items-center text-white text-sm font-medium group-hover:underline">
                  Shop Now
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
