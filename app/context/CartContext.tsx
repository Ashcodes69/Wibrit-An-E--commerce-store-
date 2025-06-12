"use client";
import React, { createContext, useState, useEffect } from "react";

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

  useEffect(() => {
    console.log("hi, I am a useEffect from CartContext");
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const saveCart = (newCart: Cart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let subT = 0;
    const keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subT += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    setSubtotal(subT);
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

      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }

      setCart(newCart);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <CartContext.Provider
      value={{ cart, subtotal, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
