import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [query]);

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="section-heading">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} columns={4} />
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-4">No Products Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any products matching your search. Try different keywords or browse our categories.
            </p>
            <Button asChild className="btn-premium text-primary-foreground">
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
