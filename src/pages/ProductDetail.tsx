import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getProductBySlug, convertPrice, formatPrice, getProductsByCategory } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/product/ProductGrid';
import { cn } from '@/lib/utils';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Initialize variants
  React.useEffect(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach(v => {
      if (v.options.length > 0) {
        initial[v.id] = v.options[0];
      }
    });
    setSelectedVariants(initial);
  }, [product]);

  const currentPrice = convertPrice(product.priceUSD, currency);
  const originalPrice = product.originalPriceUSD 
    ? convertPrice(product.originalPriceUSD, currency) 
    : null;

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  {product.badge === 'new' && <span className="badge-new">New</span>}
                  {product.badge === 'sale' && <span className="badge-sale">Sale</span>}
                  {product.badge === 'bestseller' && <span className="badge-bestseller">Bestseller</span>}
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating) 
                          ? "text-accent fill-accent" 
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className={cn(
                "text-3xl font-bold",
                originalPrice ? "text-destructive" : "text-foreground"
              )}>
                {formatPrice(currentPrice, currency)}
              </span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(originalPrice, currency)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {product.variants.map(variant => (
              <div key={variant.id}>
                <label className="block text-sm font-medium mb-2">
                  {variant.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(option => (
                    <button
                      key={option}
                      onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.id]: option }))}
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                        selectedVariants[variant.id] === option
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity} in stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1 btn-premium text-primary-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={cn(
                  "h-5 w-5",
                  isInWishlist(product.id) ? "fill-destructive text-destructive" : ""
                )} />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-16">
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-semibold">Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-semibold">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  <strong>Shipping:</strong> Free standard shipping on orders over $75. 
                  Delivery typically takes 5-7 business days to US & EU destinations.
                </p>
                <p>
                  <strong>Returns:</strong> We offer a 30-day hassle-free return policy. 
                  Items must be unused and in original packaging.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger className="text-lg font-semibold">FAQ</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <p className="font-medium text-foreground">Is this product authentic?</p>
                  <p>Yes, all our products are 100% authentic and sourced directly from authorized distributors.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Do you offer international shipping?</p>
                  <p>Yes, we ship to most countries in the US and EU. Shipping costs vary by location.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
