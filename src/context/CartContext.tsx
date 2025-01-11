import React, { createContext, useContext, useState } from 'react';
import { Plant, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: number) => void;
  updateQuantity: (plantId: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (plant: Plant) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.plant.id === plant.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId: number) => {
    setItems(currentItems => currentItems.filter(item => item.plant.id !== plantId));
  };

  const updateQuantity = (plantId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(plantId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.plant.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}