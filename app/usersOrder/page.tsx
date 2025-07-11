"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type OrderProduct = {
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  amount: number;
  status: string;
  address: string;
  createdAt: string;
  products: OrderProduct[];
};

type JwtPayload = { email: string; exp: number; iat: number; id: string };

function UsersOrder() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setEmail(decoded.email);
    } catch (err) {
      console.error("Invalid token:", err);
    }

    const getMyOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/fetchMyOrders?token=${token}`
        );
        const data = await res.json();
        if (data.success) setOrders(data.myOrders); // ✅ fixed here
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMyOrders();
  }, [router]);

  return (
    <div className="bg-purple-100 min-h-screen pt-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">My Orders</h1>
        <p className="text-gray-600">Email: {email || "Fetching..."}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6 mb-12 cursor-pointer">
        {loading ? (
          <p className="text-center text-gray-600">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="hover:bg-purple-200 bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-semibold text-black">
                  Order ID: {order._id}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-black space-y-1">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹{order.amount}
                </p>
                <p className="text-xs text-gray-500">
                  Placed on: {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div className="mt-3">
                <h2 className="font-semibold text-purple-700 text-sm mb-1">
                  Products:
                </h2>
                <ul className="text-sm text-gray-800 list-disc pl-5">
                  {order.products.map((product, i) => (
                    <li key={i}>
                      {product.title} — {product.size}, {product.color} — ₹
                      {product.price} × {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UsersOrder;
