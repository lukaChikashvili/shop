"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);


  useEffect(() => {
    const storedCart = localStorage.getItem(
      "luka-devlab-cart"
    );

    if (!storedCart) return;

    try {
      setItems(JSON.parse(storedCart));
    } catch {
      localStorage.removeItem("luka-devlab-cart");
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "luka-devlab-cart",
      JSON.stringify(items)
    );
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((current) => {
  
      if (
        current.some(
          (existing) => existing.id === item.id
        )
      ) {
        return current;
      }

      return [...current, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string) => {
    return items.some(
      (item) => item.id === id
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}