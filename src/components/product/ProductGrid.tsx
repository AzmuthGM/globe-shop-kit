import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  className,
  columns = 4 
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {products.map((product, index) => (
        <div 
          key={product.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
