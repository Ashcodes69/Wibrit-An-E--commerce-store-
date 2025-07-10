"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

type ServerCartProduct = {
  productId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  img: string;
};

type CartItem = {
  _id: string;
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
  logout: () => void;
  addToCart: (
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string,
    _id?: string
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
    img?: string,
    _id?: string
  ) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: {},
  subtotal: 0,
  user: null,
  isHydrated: false,
  logout: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  buyNow: () => {},
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCart({});
    setSubtotal(0);
    router.refresh();
    router.push("/");
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
    } else {
      setUser(null);
    }
    setIsHydrated(true);
  }, []);

  // Fetch cart from server when user is loaded
  useEffect(() => {
  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart({});
      setSubtotal(0);
      setIsHydrated(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/get?userId=${token}`);
      const data = await res.json();

      if (res.ok && data.products && Array.isArray(data.products)) {
        const newCart: Cart = {};
        data.products.forEach((p: ServerCartProduct) => {
          const key = `${p.productId}-${p.size}-${p.color}`;
          newCart[key] = {
            _id: p.productId,
            qty: p.quantity,
            price: p.price,
            name: p.title,
            size: p.size,
            variant: p.color,
            img: p.img,
          };
        });
        setCart(newCart);
        updateSubtotal(newCart);
      } else {
        console.warn(" Cart empty or invalid structure");
        setCart({});
        setSubtotal(0);
      }
    } catch (err) {
      console.error(" Error loading cart:", err);
      setCart({});
      setSubtotal(0);
    } finally {
      setIsHydrated(true);
    }
  };

  loadCart();
}, [user]); // ← this is the key fix!

useEffect(() => {
  const syncLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token }); //  Triggers loadCart()
    }
  };

  window.addEventListener("storage", syncLogin);

  return () => {
    window.removeEventListener("storage", syncLogin);
  };
}, []);


  const updateSubtotal = (cartObj: Cart) => {
    let subT = 0;
    Object.values(cartObj).forEach((item) => {
      subT += item.price * item.qty;
    });
    setSubtotal(subT);
  };

  const saveCart = async (newCart: Cart) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const products = Object.values(newCart).map((item) => ({
      productId: item._id,
      title: item.name,
      size: item.size,
      color: item.variant,
      price: item.price,
      quantity: item.qty,
      img: item.img,
    }));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: token, products }),
      });
      const data = await res.json();
      console.log("📬 Save response:", data);
    } catch (err) {
      console.error(" Error saving cart to server:", err);
    }

    updateSubtotal(newCart);
  };
const addToCart = async (
  itemCodeOrKey: string,
  qty: number,
  price?: number,
  name?: string,
  size?: string,
  variant?: string,
  img?: string,
  _id?: string
) => {
  const newCart = { ...cart };

  if (itemCodeOrKey in newCart) {
    //  Item exists, increase qty
    newCart[itemCodeOrKey].qty += qty;
  } else {
    //  Item doesn't exist, we must build it
    const itemDetails = {
      _id: _id ?? "",
      price: price ?? 0,
      name: name ?? "",
      size: size ?? "",
      variant: variant ?? "",
      img: img ?? "",
    };

    const values = Object.values(itemDetails);
    if (values.some((v) => v === "" || v === 0)) {
      console.warn(" Missing values. Item not added to cart.", itemDetails);
      return;
    }

    // Create the new cart item
    newCart[itemCodeOrKey] = { ...itemDetails, qty };
  }

  setCart(newCart);
  await saveCart(newCart);
};


  const removeFromCart = async (key: string, qty: number) => {
    const newCart = { ...cart };
    if (key in newCart) {
      newCart[key].qty -= qty;
      if (newCart[key].qty <= 0) {
        delete newCart[key];
      }
    }
    setCart(newCart);
    await saveCart(newCart);
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/clear?userId=${token}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(" Error clearing cart:", err);
    }

    setCart({});
    setSubtotal(0);
  };

  const buyNow = async (
    itemCodeOrKey: string,
    qty: number,
    price?: number,
    name?: string,
    size?: string,
    variant?: string,
    img?: string,
    _id?: string
  ) => {
    if (!price || !name || !size || !variant || !img || !_id) return;

    const key = `${itemCodeOrKey}-${size}-${variant}`;
    const newCart: Cart = {
      [key]: {
        _id,
        qty,
        price,
        name,
        size,
        variant,
        img,
      },
    };

    setCart(newCart);
    await saveCart(newCart);
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

export const useCart = () => useContext(CartContext);
