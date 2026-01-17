import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { categories, getProductsByCategory } from '@/data/products';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const products = getProductsByCategory(slug || '');

  if (!category) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-white">Products</Link>
              <span>/</span>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <p className="text-muted-foreground mb-8">
          Showing {products.length} products
        </p>
        
        {products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No products in this category yet.
            </p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;
