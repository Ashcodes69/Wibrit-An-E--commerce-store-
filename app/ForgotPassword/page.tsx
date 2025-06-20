"use client";
import React from 'react';
import Link from "next/link";

function ForgotPassword() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-start justify-center bg-[#f8f4fd] px-4 pt-10 pb-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-4">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2.5 rounded-lg shadow-sm transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
