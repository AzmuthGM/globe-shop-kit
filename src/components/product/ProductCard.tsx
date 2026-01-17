import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, convertPrice, formatPrice } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { currency } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const currentPrice = convertPrice(product.priceUSD, currency);
  const originalPrice = product.originalPriceUSD 
    ? convertPrice(product.originalPriceUSD, currency) 
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultVariants: Record<string, string> = {};
    product.variants.forEach(v => {
      if (v.options.length > 0) {
        defaultVariants[v.id] = v.options[0];
      }
    });
    addToCart(product, 1, defaultVariants);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className={cn("product-card group", className)}>
      <Link to={`/product/${product.slug}`}>
        <div className="product-card-image bg-secondary">
          <img 
            src={product.images[0]} 
            alt={product.name}
            loading="lazy"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              {product.badge === 'new' && <span className="badge-new">New</span>}
              {product.badge === 'sale' && <span className="badge-sale">Sale</span>}
              {product.badge === 'bestseller' && <span className="badge-bestseller">Bestseller</span>}
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={handleToggleWishlist}
            >
              <Heart 
                className={cn(
                  "h-4 w-4 transition-colors",
                  isInWishlist(product.id) ? "fill-destructive text-destructive" : ""
                )} 
              />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button 
              className="w-full btn-premium text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-semibold",
              originalPrice ? "price-sale" : "price-current"
            )}>
              {formatPrice(currentPrice, currency)}
            </span>
            {originalPrice && (
              <span className="price-original">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
