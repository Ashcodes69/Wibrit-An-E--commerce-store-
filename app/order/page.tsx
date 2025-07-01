"use client";
import React from "react";
import { useCart } from "../context/CartContext";

function Order() {
  const { cart, subtotal } = useCart();

  return (
    <section className="bg-purple-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="mb-10 text-center">
          <h2 className="text-sm font-semibold text-purple-700 tracking-widest">
            WIBRIT.COM
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Your Order has been placed successfully!
          </h1>
          <p className="text-gray-500 mt-2">Order Id:345987</p>

          <p className="text-gray-500 mt-2">Thank you for shopping with us.</p>
        </div>

        <div className="grid grid-cols-3 font-semibold text-gray-600 border-b border-gray-300 pb-3 mb-4 text-sm sm:text-base">
          <div className="col-span-1">Item</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
        </div>

        <div className="space-y-4 mb-8">
          {cart &&
            Object.keys(cart).map((k) => (
              <div
                key={k}
                className="grid grid-cols-3 items-center border-b border-gray-100 pb-3 text-gray-800 text-sm sm:text-base"
              >
                <div className="col-span-1">{cart[k].name}</div>
                <div className="text-center">{cart[k].qty}</div>
                <div className="text-right">₹{cart[k].price * cart[k].qty}</div>
              </div>
            ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
          <div className="text-xl font-bold text-gray-900">
            Order Value: ₹{subtotal}
          </div>
          <button className="mt-4 sm:mt-0 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition duration-200 shadow-md">
            Track Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default Order;
