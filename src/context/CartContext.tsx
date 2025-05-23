
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudioEffect } from '@/hooks/useAudioEffect';

export interface CartItem {
  id: number;
  image: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: string;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  getItemTotal: (item: CartItem) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { playSound } = useAudioEffect();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Helper function to calculate the price of an individual item based on quantity
  const getItemTotal = (item: CartItem): string => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return (price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    playSound("add-to-cart");
    
    setCart(currentCart => {
      // Check if the product is already in the cart
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, increase its quantity
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the product isn't in the cart, add it with a quantity of 1
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    playSound("click");
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    playSound("click");
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price of items in the cart
  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + price * item.quantity;
  }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  // Calculate total number of items in the cart
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    getItemTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
