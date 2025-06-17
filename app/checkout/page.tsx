"use client";
import React from "react";
import { useCart } from "../context/CartContext";
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
            <textarea
              className="w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            ></textarea>
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
        <ol className="list-decimal space-y-4 text-gray-800 font-medium">
          {cart && Object.keys(cart).length === 0 && (
            <li className="text-gray-500 text-sm text-center">
              Your cart is empty
            </li>
          )}
          {cart &&
            Object.keys(cart).map((k) => (
              <li
                key={k}
                className="flex flex-wrap justify-between items-center"
              >
                <div className="w-full sm:w-2/3">{cart[k].name}</div>
                <div className="flex items-center gap-3 w-full sm:w-1/3 justify-end mt-2 sm:mt-0 text-2xl text-purple-700">
                  <CiCircleMinus
                    onClick={() => removeFromCart(k, 1)}
                    className="cursor-pointer hover:text-red-500 transition"
                  />
                  <span className="text-lg">{cart[k].qty}</span>
                  <CiCirclePlus
                    onClick={() =>
                      addToCart(k, 1, 499, cart[k].name, "xl", "red")
                    }
                    className="cursor-pointer hover:text-green-500 transition"
                  />
                </div>
              </li>
            ))}
        </ol>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <span className="font-bold text-xl text-gray-900">
            Total Amount: ₹{subtotal}
          </span>
          <button className="mt-5 sm:mt-0 bg-purple-700 text-white px-8 py-2 rounded-full hover:bg-purple-800 transition shadow-md">
            Pay ₹{subtotal}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
