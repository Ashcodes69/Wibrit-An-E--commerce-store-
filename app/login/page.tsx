"use client";
import React from "react";
import Link from "next/link";

function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8f4fd] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to your WIBRIT account
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" />
              Remember me
            </label>
            <Link href="/ForgotPassword" className="text-purple-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
