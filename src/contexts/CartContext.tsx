import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, variants: Record<string, string>) => void;
  removeFromCart: (productId: string, variants: Record<string, string>) => void;
  updateQuantity: (productId: string, variants: Record<string, string>, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartKey = (productId: string, variants: Record<string, string>): string => {
  return `${productId}-${JSON.stringify(variants)}`;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('azm-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('azm-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, variants: Record<string, string>) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedVariants: variants }];
    });
  };

  const removeFromCart = (productId: string, variants: Record<string, string>) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants))
    ));
  };

  const updateQuantity = (productId: string, variants: Record<string, string>, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variants);
      return;
    }

    setItems(prev => prev.map(item => {
      if (item.product.id === productId && 
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
