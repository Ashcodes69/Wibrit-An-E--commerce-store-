// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MdOutlineShoppingCart } from "react-icons/md";

// function Navbar() {
//   return (
//     <div className="flex justify-center md:justify-start items-center flex-col md:flex-row">
//       <div className="logo mx-5">
//         <Image
//           src="/name.jpg"
//           alt="Descriptive alt text"
//           width={200}
//           height={30}
//         />
//       </div>
//       <div className="nav">
//         <ul className="flex items-center font-bold space-x-2 md:text-xl">
//           <li>
//             <Link href={"/"}>Tshirts</Link>
//           </li>
//           <li>
//             <Link href={"/"}>Mugs</Link>
//           </li>
//           <li>
//             <Link href={"/"}>Watchs</Link>
//           </li>
//         </ul>
//       </div>
//       <div className="cart absolute right-0 top-1 mx-2">
//         <MdOutlineShoppingCart className="text-4xl" />
//       </div>
//     </div>
//   );
// }

// export default Navbar;
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  return (
    <header className="bg-gray-900 text-white shadow-md w-full px-4 py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start mb-3 md:mb-0">
          <Image
            src="/name.jpg"
            alt="Buyora Logo"
            width={160}
            height={40}
            className="rounded-lg"
          />
        </div>

        {/* Navigation Links */}
        <nav className="mb-3 md:mb-0">
          <ul className="flex flex-col md:flex-row items-center gap-4 font-semibold text-gray-300">
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors duration-200"
              >
                Tshirts
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors duration-200"
              >
                Mugs
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors duration-200"
              >
                Watches
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center justify-center">
          <button className="relative group">
            <MdOutlineShoppingCart className="text-3xl text-gray-300 group-hover:text-white transition duration-200" />
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

