"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineShoppingCart,
  MdOutlineRemoveShoppingCart,
  MdAccountCircle,
} from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";
import { useCart } from "../app/context/CartContext";

function Navbar() {
  const { cart, subtotal, addToCart, removeFromCart, clearCart } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCart = () => {
    if (ref.current?.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current?.classList.remove("translate-x-0");
      ref.current?.classList.add("translate-x-full");
    }
  };

  return (
    <>
      <header className="bg-white text-black shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/name.png"
              alt="Wibrit Logo"
              width={160}
              height={40}
              className="rounded-lg w-auto h-auto"
            />
          </Link>

          <nav className="hidden md:flex gap-6 font-semibold text-black">
            <Link href="/tshirts" className="hover:text-purple-700 transition">
              Tshirts
            </Link>
            <Link href="/mugs" className="hover:text-purple-700 transition">
              Mugs
            </Link>
            <Link href="/hoodie" className="hover:text-purple-700 transition">
              Hoodie
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* account icon */}
            <Link href={"/login"}>
              <MdAccountCircle className="text-3xl text-black hover:text-purple-700 transition" />
            </Link>
            {/* cart icon */}
            <button onClick={toggleCart} className="relative group">
              <MdOutlineShoppingCart className="text-3xl text-black group-hover:text-purple-700 transition" />
              <span
                className={`absolute -top-2 -right-2 text-white bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold ${
                  Object.keys(cart).length === 0 ? "invisible" : ""
                }`}
              >
                {Object.keys(cart).length}
              </span>
            </button>

            <button
              className="md:hidden text-2xl text-purple-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white px-4 pb-4 text-black font-semibold">
            <Link href="/tshirts" className="block py-2 hover:text-purple-700">
              Tshirts
            </Link>
            <Link href="/mugs" className="block py-2 hover:text-purple-700">
              Mugs
            </Link>
            <Link href="/hoodie" className="block py-2 hover:text-purple-700">
              Hoodie
            </Link>
          </div>
        )}
      </header>
      <div
        ref={ref}
        className="sideCart fixed top-0 right-0 w-80 bg-[#4B0082] text-white p-6 z-50 shadow-lg transform transition-transform translate-x-full h-full flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={toggleCart} className="text-3xl font-bold">
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 cartScroll">
          <ul className="list-decimal font-semibold space-y-4">
            {cart && Object.keys(cart).length === 0 && (
              <li className="text-center text-sm">Cart is Empty</li>
            )}
            {cart &&
              Object.keys(cart).map((k) => (
                <li key={k}>
                  <div className="item flex gap-3 items-center border-b border-purple-700 pb-3">
                    <Image
                      src={cart[k].img}
                      alt={cart[k].name}
                      width={60}
                      height={60}
                      className="rounded-lg border border-purple-400 shadow-md"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold truncate">
                        {cart[k].name}
                      </div>
                      <div className="text-xs text-purple-200">
                        Size: {cart[k].size} | Color: {cart[k].variant}
                      </div>
                      <div className="flex items-center mt-2 gap-3 text-purple-200 text-lg">
                        <CiCircleMinus
                          onClick={() => removeFromCart(k, 1)}
                          className="cursor-pointer hover:text-white"
                        />
                        <span className="font-semibold text-white">
                          {cart[k].qty}
                        </span>
                        <CiCirclePlus
                          onClick={() => addToCart(k, 1)}
                          className="cursor-pointer hover:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="pt-4 border-t border-purple-700 mt-4">
          <span className="font-bold block mb-3">
            Total Amount: ₹{subtotal}
          </span>
          <div className="flex justify-center gap-3">
            <Link href="/checkout">
              <button className="flex items-center gap-2 text-white bg-[#6A0DAD] border-0 py-1.5 px-5 text-base focus:outline-none hover:bg-[#7e22ce] rounded-lg shadow-sm transition duration-300">
                <IoBagCheck />
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-white bg-[#B91C1C] border-0 py-1.5 px-5 text-base focus:outline-none hover:bg-[#991B1B] rounded-lg shadow-sm transition duration-300"
            >
              <MdOutlineRemoveShoppingCart />
              ClearCart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
