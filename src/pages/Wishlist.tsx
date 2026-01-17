import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import { useWishlist } from '@/contexts/WishlistContext';

const Wishlist: React.FC = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite items here to buy them later.
            </p>
            <Button asChild size="lg" className="btn-premium text-primary-foreground">
              <Link to="/products">
                Discover Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="section-heading mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">{items.length} items saved</p>
        
        <ProductGrid products={items} columns={4} />
      </div>
    </Layout>
  );
};

export default Wishlist;
