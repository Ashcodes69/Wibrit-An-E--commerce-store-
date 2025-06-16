
"use client";
import React, { createContext, useState, useEffect } from "react";

type CartItem = {
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
};

type Cart = {
  [key: string]: CartItem;
};

type CartContextType = {
  cart: Cart;
  subtotal: number;
  addToCart: (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: string,
    variant: string
  ) => void;
  removeFromCart: (itemCode: string, qty: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: {},
  subtotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({});
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData);
          setCart(parsedCart);
          updateSubtotal(parsedCart);
        } catch (error) {
          console.error("Error parsing cart data:", error);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  const updateSubtotal = (cartObj: Cart) => {
    let subT = 0;
    Object.values(cartObj).forEach((item) => {
      subT += item.price * item.qty;
    });
    setSubtotal(subT);
  };

  const saveCart = (newCart: Cart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateSubtotal(newCart);
  };

  const addToCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: string,
    variant: string
  ) => {
    const newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    const newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
      if (newCart[itemCode].qty <= 0) delete newCart[itemCode];
      setCart(newCart);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  if (!isHydrated) return null;

  return (
    <CartContext.Provider
      value={{ cart, subtotal, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { useContext } from "react";
export const useCart = () => useContext(CartContext);
