
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  return (
    <header className="bg-white text-black shadow-md w-full px-4 py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-center md:justify-start mb-3 md:mb-0">
        <Link href={'/'}> <Image
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

        {/* Cart Icon */}
        <div className="flex items-center justify-center">
          <button className="relative group">
            <MdOutlineShoppingCart className="text-3xl text-black group-hover:text-purple-700 transition duration-200" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

