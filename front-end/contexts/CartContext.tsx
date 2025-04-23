'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItemsType } from '../lib/types';

interface CartContextType {
  cartItems: CartItemsType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsType[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
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
