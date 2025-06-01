"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";

function Navbar() {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <>
      <header className="bg-white text-black shadow-md w-full px-4 py-3">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-center md:justify-start mb-3 md:mb-0">
            <Link href={"/"}>
              {" "}
              <Image
                src="/name.png"
                alt="wibrit-Logo"
                width={160}
                height={40}
                className="rounded-lg"
              />
            </Link>
          </div>

          <nav className="mb-3 md:mb-0">
            <ul className="flex flex-col md:flex-row items-center gap-4 font-semibold text-black">
              <li>
                <Link
                  href="/tshirts"
                  className="hover:text-purple-700 transition-colors duration-200"
                >
                  Tshirts
                </Link>
              </li>
              <li>
                <Link
                  href="/mugs"
                  className="hover:text-purple-700 transition-colors duration-200"
                >
                  Mugs
                </Link>
              </li>
              <li>
                <Link
                  href="/hoodie"
                  className="hover:text-purple-700 transition-colors duration-200"
                >
                  Hoodie
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center justify-center">
            <button onClick={toggleCart} className="relative group">
              <MdOutlineShoppingCart className="text-3xl text-black group-hover:text-purple-700 transition duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold">
                3
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        ref={ref}
        className="sideCart fixed top-0 right-0 w-80 bg-[#4B0082] text-white p-6 z-50 overflow-y-auto shadow-lg transform transition-transform translate-x-full"
      >
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        <button
          onClick={toggleCart}
          className="absolute top-2 right-2 text-3xl font-bold"
        >
          <IoMdCloseCircle />
        </button>
        <ul className="list-decimal font-semibold">
          <li>
            <div className="item flex">
              <div className="w-2/3 font-semibold">Tshirt--wear your ora</div>
              <div className="font-semibold flex items-center justify-center w-1/3 text-xl">
                <CiCircleMinus className="cursor-pointer font-bold" />
                <span className="mx-5">1</span>
                <CiCirclePlus className="cursor-pointer font-bold" />
              </div>
            </div>
          </li>
        </ul>
        <button className="flex items-center gap-2 mx-auto mt-16 text-white bg-[#6A0DAD] border-0 py-2 px-8 focus:outline-none hover:bg-[#7e22ce] rounded-xl shadow-md transition duration-300 text-lg">
          <IoBagCheck />
          Checkout
        </button>
      </div>
    </>
  );
}

export default Navbar;
