"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/logIn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await responce.json();
      if (responce.ok) {
        localStorage.setItem("token", result.token);
        window.dispatchEvent(new Event("storage"));
        setEmail("");
        setPassword("");
        setMessage(`Welcome back to WibRit, ${result.Name}!`);
        setSuccess(true);
      } else {
        setMessage(result.error);
        setSuccess(false);
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Failed to submit:", error);
       setMessage("failed to submit");
       setSuccess(false);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        //it shows an alert in the center of the scren
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-purple-100 border border-purple-600 rounded-xl shadow-xl p-6 w-72 sm:w-96 text-center">
            {success ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-300 animate-bounce mb-3">
                  <FaCheck className="text-green-700 text-3xl" />
                </div>
                <p className="text-lg font-semibold text-green-900 mb-4">
                  {message}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-300 animate-bounce mb-3">
                  <IoCloseSharp className="text-red-700 text-3xl" />
                </div>
                <p className="text-lg font-semibold text-red-900 mb-4">
                  {message}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                setShowAlert(false);
                if (success === true) {
                  router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
                } else {
                  return;
                }
              }}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <section className="min-h-screen flex items-center justify-center bg-[#f8f4fd] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Login to your WIBRIT account
          </p>

          <form onSubmit={handleSubmit} method="POST" className="space-y-5">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                value={email}
                name="email"
                autoComplete="email"
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                value={password}
                name="password"
                autoComplete="new-password"
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
              <Link
                href="/ForgotPassword"
                className="text-purple-600 hover:underline"
              >
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
            <Link
              href="/signup"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
