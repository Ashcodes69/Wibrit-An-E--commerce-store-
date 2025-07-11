"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Myaccount() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);
  return (
    <>
      <div className="bg-gray-100 font-sans">
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">My Account</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value="John Doe"
                  className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Email Address
            </h2>
            <input
              type="email"
              value="john@example.com"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Change Password
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
              Save Changes
            </button>
            <button className="text-red-600 hover:underline">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myaccount;
