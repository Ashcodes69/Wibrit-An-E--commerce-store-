"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
  img: string;
};
type User = {
  value: string;
};
type Cart = {
  [key: string]: CartItem;
};

type CartContextType = {
  cart: Cart;
  subtotal: number;
  user: User | null;
  isHydrated: boolean;
  logout: ()=>void;
  addToCart: (
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string
  ) => void;
  removeFromCart: (itemCode: string, qty: number) => void;
  clearCart: () => void;
  buyNow: (
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string
  ) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: {},
  subtotal: 0,
  user: null,
  isHydrated: false,
  logout:()=>{},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  buyNow: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({});
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
 

  const router = useRouter();
  
  const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
  router.refresh();
  router.push('/') 
};
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ value: token });
      } else {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

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
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string
  ) => {
    let key = itemCodeOrKey;
    const newCart = { ...cart };

    if (price !== undefined && name && size && variant && img) {
      key = `${itemCodeOrKey}-${size}-${variant}`;
      if (key in newCart) {
        newCart[key].qty += qty;
      } else {
        newCart[key] = { qty, price, name, size, variant, img };
      }
    } else {
      if (key in newCart) {
        newCart[key].qty += qty;
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (key: string, qty: number) => {
    const newCart = { ...cart };
    if (key in newCart) {
      newCart[key].qty -= qty;
      if (newCart[key].qty <= 0) {
        delete newCart[key];
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const buyNow = (
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string
  ) => {
    const key = `${itemCodeOrKey}-${size}-${variant}`;
    const newCart: Cart = {
      [key]: {
        qty,
        price: price || 0,
        name: name || "",
        size: size || "",
        variant: variant || "",
        img: img || "",
      },
    };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  if (!isHydrated) return null;

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        user,
        isHydrated,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { useContext } from "react";
export const useCart = () => useContext(CartContext);
