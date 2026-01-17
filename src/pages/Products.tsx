import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { products, categories, convertPrice, formatPrice } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currency } = useCurrency();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categorySlug));
    }

    // Price filter
    result = result.filter(p => {
      const price = convertPrice(p.priceUSD, currency);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // In stock filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategories, priceRange, inStockOnly, sortBy, currency]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Categories
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat.slug)}
                onCheckedChange={() => toggleCategory(cat.slug)}
              />
              <span className="text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">({cat.productCount})</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Price Range
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0], currency)}</span>
            <span>{formatPrice(priceRange[1], currency)}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Availability
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 500]);
          setInStockOnly(false);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-heading">All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterContent />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-4">
                {/* Grid Toggle */}
                <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      gridCols === 3 ? "bg-secondary" : "hover:bg-secondary/50"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      gridCols === 4 ? "bg-secondary" : "hover:bg-secondary/50"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={gridCols} />
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 500]);
                    setInStockOnly(false);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
