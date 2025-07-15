"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { FaCheck } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import AlertModal from "@/Components/AlertModal";

function Signup() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { Name, email, password };
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/authentication/signUp`,
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
        setName("");
        setEmail("");
        setPassword("");
        setMessage(result.message + "\nWelcome to Wibrit\n" + data.Name);
        setSuccess(true);
      } else {
        setSuccess(false);
        setMessage(result.message);
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Failed to submit:", error);
      setSuccess(false);
      setMessage("Failedd to submit");
      setShowAlert(true);
    }
  };

  return (
    <>
      <AlertModal
        showAlert={showAlert}
        message={message}
        success={success}
        onClose={() => {
          setShowAlert(false);
          if (success === true) {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
          }
        }}
      />
      <section className="min-h-screen flex items-center justify-center bg-[#f8f4fd] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join WIBRIT and start shopping with us
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" method="POST">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                value={Name}
                name="name"
                autoComplete="name"
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John Doe"
                required
              />
            </div>

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

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Signup;
