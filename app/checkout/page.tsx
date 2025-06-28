"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function Checkout() {
  const { cart, subtotal, addToCart, removeFromCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-purple-100 min-h-screen rounded-2xl shadow-lg">
      <h1 className="text-center text-4xl font-extrabold text-purple-900 mb-10">
        Checkout
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-12">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          1. Delivery Details
        </h2>
        <div className="flex flex-wrap gap-5">
          <div className="w-full md:w-[48%]">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="w-full md:w-[48%]">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Address
            </label>
            <textarea className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Phone
            </label>
            <input
              type="number"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              City
            </label>
            <input
              type="text"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              State
            </label>
            <input
              type="text"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              PinCode
            </label>
            <input
              type="number"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          2. Review Cart Items
        </h2>

        <ol className="space-y-6 text-gray-800 font-medium">
          {cart && Object.keys(cart).length === 0 && (
            <li className="text-gray-500 text-sm text-center">
              Your cart is empty
            </li>
          )}
          {cart &&
            Object.keys(cart).map((k) => (
              <li
                key={k}
                className="flex flex-col sm:flex-row items-center gap-4 border border-purple-100 rounded-xl p-4"
              >
                <Image
                  src={cart[k].img}
                  alt={cart[k].name}
                  width={60}
                  height={60}
                  className="rounded-lg border border-purple-400 shadow-md"
                />

                <div className="flex-1 w-full">
                  <p className="text-base font-semibold text-gray-900">
                    {cart[k].name}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">
                    Size: {cart[k].size} | Color: {cart[k].variant}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-2xl text-purple-700">
                  <CiCircleMinus
                    onClick={() => removeFromCart(k, 1)}
                    className="cursor-pointer hover:text-red-500 transition"
                  />
                  <span className="text-lg font-semibold">{cart[k].qty}</span>
                  <CiCirclePlus
                    onClick={() => addToCart(k, 1)}
                    className="cursor-pointer hover:text-green-500 transition"
                  />
                </div>
              </li>
            ))}
        </ol>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold text-xl text-gray-900">
            Total Amount: ₹{subtotal}
          </span>
          <Link href={"/order"}>
            <button className="bg-purple-700 text-white px-8 py-2 rounded-full hover:bg-purple-800 transition shadow-md">
              Pay ₹{subtotal}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
