export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color';
  options: string[];
  priceModifier?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  priceUSD: number;
  originalPriceUSD?: number;
  category: string;
  categorySlug: string;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'sale' | 'bestseller';
  createdAt: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    description: 'Smart devices and tech accessories for modern living',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    productCount: 2,
  },
  {
    id: '2',
    name: 'Home & Living',
    slug: 'home',
    description: 'Elevate your space with curated home essentials',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    productCount: 2,
  },
  {
    id: '3',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    productCount: 2,
  },
  {
    id: '4',
    name: 'Beauty & Care',
    slug: 'beauty',
    description: 'Self-care essentials for your daily routine',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    productCount: 2,
  },
  {
    id: '5',
    name: 'Fitness & Sports',
    slug: 'fitness',
    description: 'Gear up for your active lifestyle',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    productCount: 2,
  },
  {
    id: '6',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Timeless pieces for every wardrobe',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    productCount: 2,
  },
];

export const products: Product[] = [
  // Electronics
  {
    id: '1',
    slug: 'wireless-noise-cancelling-headphones',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Experience premium sound quality with our advanced noise-cancelling technology. These headphones feature 40mm drivers, 30-hour battery life, and plush memory foam ear cushions for all-day comfort. Perfect for music lovers, remote workers, and travelers.',
    shortDescription: 'Premium audio with 30hr battery & ANC technology',
    priceUSD: 179.99,
    originalPriceUSD: 249.99,
    category: 'Electronics & Gadgets',
    categorySlug: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Midnight Black', 'Pearl White', 'Navy Blue'] },
    ],
    tags: ['wireless', 'audio', 'noise-cancelling', 'premium'],
    sku: 'AZM-EL-001',
    inStock: true,
    stockQuantity: 45,
    rating: 4.8,
    reviewCount: 324,
    badge: 'bestseller',
    createdAt: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    slug: 'smart-fitness-watch-pro',
    name: 'Smart Fitness Watch Pro',
    description: 'Track your health and fitness with precision. Features include heart rate monitoring, GPS, sleep tracking, and 100+ workout modes. Water-resistant up to 50m with a stunning AMOLED display.',
    shortDescription: 'Advanced health tracking with GPS & AMOLED display',
    priceUSD: 299.99,
    category: 'Electronics & Gadgets',
    categorySlug: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    ],
    variants: [
      { id: 'size', name: 'Size', type: 'size', options: ['40mm', '44mm'] },
      { id: 'color', name: 'Band Color', type: 'color', options: ['Black', 'Silver', 'Rose Gold'] },
    ],
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    sku: 'AZM-EL-002',
    inStock: true,
    stockQuantity: 28,
    rating: 4.7,
    reviewCount: 189,
    badge: 'new',
    createdAt: '2024-02-01',
    featured: true,
  },
  // Home
  {
    id: '3',
    slug: 'minimalist-ceramic-vase-set',
    name: 'Minimalist Ceramic Vase Set',
    description: 'Handcrafted ceramic vases in a set of 3. Each piece features a unique matte finish and organic shape. Perfect for fresh or dried flowers, or as standalone decorative pieces.',
    shortDescription: 'Set of 3 handcrafted matte ceramic vases',
    priceUSD: 89.99,
    category: 'Home & Living',
    categorySlug: 'home',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Sand', 'Sage', 'Terracotta'] },
    ],
    tags: ['home decor', 'ceramic', 'vase', 'minimalist'],
    sku: 'AZM-HM-001',
    inStock: true,
    stockQuantity: 67,
    rating: 4.9,
    reviewCount: 156,
    createdAt: '2024-01-20',
    featured: true,
  },
  {
    id: '4',
    slug: 'aromatherapy-essential-oil-diffuser',
    name: 'Aromatherapy Essential Oil Diffuser',
    description: 'Create a calming atmosphere with this elegant wood-grain diffuser. Features 7 LED color options, whisper-quiet operation, and auto shut-off. Covers up to 300 sq ft.',
    shortDescription: 'Elegant wood-grain diffuser with 7 LED colors',
    priceUSD: 49.99,
    originalPriceUSD: 69.99,
    category: 'Home & Living',
    categorySlug: 'home',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Finish', type: 'color', options: ['Light Wood', 'Dark Wood', 'White'] },
    ],
    tags: ['aromatherapy', 'diffuser', 'wellness', 'home'],
    sku: 'AZM-HM-002',
    inStock: true,
    stockQuantity: 89,
    rating: 4.6,
    reviewCount: 234,
    badge: 'sale',
    createdAt: '2024-01-10',
    featured: false,
  },
  // Accessories
  {
    id: '5',
    slug: 'premium-leather-wallet',
    name: 'Premium Leather Wallet',
    description: 'Crafted from full-grain Italian leather, this slim wallet features RFID blocking technology, 8 card slots, and a bill compartment. The perfect blend of style and functionality.',
    shortDescription: 'Full-grain Italian leather with RFID protection',
    priceUSD: 79.99,
    category: 'Accessories',
    categorySlug: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Cognac', 'Black', 'Navy'] },
    ],
    tags: ['wallet', 'leather', 'rfid', 'premium'],
    sku: 'AZM-AC-001',
    inStock: true,
    stockQuantity: 112,
    rating: 4.8,
    reviewCount: 445,
    badge: 'bestseller',
    createdAt: '2024-01-05',
    featured: true,
  },
  {
    id: '6',
    slug: 'classic-aviator-sunglasses',
    name: 'Classic Aviator Sunglasses',
    description: 'Timeless aviator design with polarized lenses for superior UV protection. Lightweight titanium frame with adjustable nose pads for a custom fit. Includes premium case and cleaning cloth.',
    shortDescription: 'Polarized lenses with titanium frame',
    priceUSD: 129.99,
    category: 'Accessories',
    categorySlug: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Frame Color', type: 'color', options: ['Gold', 'Silver', 'Gunmetal'] },
    ],
    tags: ['sunglasses', 'aviator', 'polarized', 'uv protection'],
    sku: 'AZM-AC-002',
    inStock: true,
    stockQuantity: 78,
    rating: 4.7,
    reviewCount: 267,
    createdAt: '2024-02-05',
    featured: false,
  },
  // Beauty
  {
    id: '7',
    slug: 'luxury-skincare-set',
    name: 'Luxury Skincare Set',
    description: 'Complete 4-piece skincare routine featuring cleanser, toner, serum, and moisturizer. Formulated with hyaluronic acid, vitamin C, and botanical extracts for radiant skin.',
    shortDescription: '4-piece routine with hyaluronic acid & vitamin C',
    priceUSD: 149.99,
    originalPriceUSD: 199.99,
    category: 'Beauty & Care',
    categorySlug: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    ],
    variants: [
      { id: 'type', name: 'Skin Type', type: 'size', options: ['Normal/Dry', 'Oily/Combination', 'Sensitive'] },
    ],
    tags: ['skincare', 'beauty', 'vitamin c', 'hyaluronic acid'],
    sku: 'AZM-BT-001',
    inStock: true,
    stockQuantity: 34,
    rating: 4.9,
    reviewCount: 512,
    badge: 'sale',
    createdAt: '2024-01-25',
    featured: true,
  },
  {
    id: '8',
    slug: 'natural-bamboo-brush-set',
    name: 'Natural Bamboo Brush Set',
    description: 'Eco-friendly 10-piece makeup brush set with sustainable bamboo handles and ultra-soft synthetic bristles. Includes face and eye brushes with a canvas travel pouch.',
    shortDescription: '10-piece eco-friendly set with travel pouch',
    priceUSD: 44.99,
    category: 'Beauty & Care',
    categorySlug: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&q=80',
    ],
    variants: [],
    tags: ['makeup', 'brushes', 'eco-friendly', 'bamboo'],
    sku: 'AZM-BT-002',
    inStock: true,
    stockQuantity: 156,
    rating: 4.5,
    reviewCount: 189,
    badge: 'new',
    createdAt: '2024-02-10',
    featured: false,
  },
  // Fitness
  {
    id: '9',
    slug: 'resistance-bands-set-pro',
    name: 'Resistance Bands Set Pro',
    description: '5-level resistance bands set with door anchor, handles, and ankle straps. Perfect for home workouts, physical therapy, and travel fitness. Includes workout guide.',
    shortDescription: '5-level set with accessories & workout guide',
    priceUSD: 34.99,
    category: 'Fitness & Sports',
    categorySlug: 'fitness',
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80',
    ],
    variants: [],
    tags: ['fitness', 'resistance bands', 'home workout', 'exercise'],
    sku: 'AZM-FT-001',
    inStock: true,
    stockQuantity: 234,
    rating: 4.6,
    reviewCount: 678,
    badge: 'bestseller',
    createdAt: '2024-01-08',
    featured: false,
  },
  {
    id: '10',
    slug: 'yoga-mat-premium',
    name: 'Premium Non-Slip Yoga Mat',
    description: 'Extra-thick 6mm mat with superior grip and cushioning. Made from eco-friendly TPE material, non-toxic and free from PVC, latex, and silicone. Includes carrying strap.',
    shortDescription: '6mm eco-friendly TPE with superior grip',
    priceUSD: 59.99,
    category: 'Fitness & Sports',
    categorySlug: 'fitness',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Forest Green', 'Ocean Blue', 'Sunset Orange', 'Midnight Purple'] },
    ],
    tags: ['yoga', 'mat', 'eco-friendly', 'fitness'],
    sku: 'AZM-FT-002',
    inStock: true,
    stockQuantity: 145,
    rating: 4.8,
    reviewCount: 423,
    createdAt: '2024-01-18',
    featured: true,
  },
  // Fashion
  {
    id: '11',
    slug: 'cashmere-blend-scarf',
    name: 'Cashmere Blend Scarf',
    description: 'Luxuriously soft cashmere-wool blend scarf. Generously sized at 200cm x 70cm for versatile styling. Perfect for layering in cooler weather or as an elegant accessory.',
    shortDescription: 'Luxurious cashmere-wool blend, 200cm x 70cm',
    priceUSD: 89.99,
    category: 'Fashion',
    categorySlug: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Camel', 'Charcoal', 'Burgundy', 'Cream'] },
    ],
    tags: ['scarf', 'cashmere', 'fashion', 'winter'],
    sku: 'AZM-FS-001',
    inStock: true,
    stockQuantity: 67,
    rating: 4.9,
    reviewCount: 234,
    badge: 'new',
    createdAt: '2024-02-08',
    featured: true,
  },
  {
    id: '12',
    slug: 'minimalist-canvas-backpack',
    name: 'Minimalist Canvas Backpack',
    description: 'Water-resistant waxed canvas backpack with leather accents. Features padded 15" laptop sleeve, multiple organizer pockets, and comfortable padded straps. Perfect for work or weekend adventures.',
    shortDescription: 'Water-resistant canvas with 15" laptop sleeve',
    priceUSD: 119.99,
    originalPriceUSD: 149.99,
    category: 'Fashion',
    categorySlug: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    variants: [
      { id: 'color', name: 'Color', type: 'color', options: ['Olive', 'Navy', 'Charcoal'] },
    ],
    tags: ['backpack', 'canvas', 'minimalist', 'laptop'],
    sku: 'AZM-FS-002',
    inStock: true,
    stockQuantity: 89,
    rating: 4.7,
    reviewCount: 356,
    badge: 'sale',
    createdAt: '2024-01-22',
    featured: false,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getNewArrivals = (): Product[] => {
  return [...products].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);
};

export const getBestsellers = (): Product[] => {
  return products.filter(p => p.badge === 'bestseller');
};

// Currency conversion
export const USD_TO_CAD_RATE = 1.36; // This would be fetched from API in production

export const convertPrice = (priceUSD: number, currency: 'USD' | 'CAD'): number => {
  if (currency === 'CAD') {
    return priceUSD * USD_TO_CAD_RATE;
  }
  return priceUSD;
};

export const formatPrice = (price: number, currency: 'USD' | 'CAD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};
