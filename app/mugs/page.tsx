import React from 'react'
import Image from "next/image";
import Link from "next/link";


function Mugs() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link
              href="/product/buy-ora"
              className="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg"
            >
              <div className="relative h-48 rounded overflow-hidden">
                <Image
                  alt="t-shirt"
                  src="/mug.webp"
                  height={120}
                  width={150}
                  className="m-auto md:m-0"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Shooting
                </h2>
                <p className="mt-1">$21.15</p>{" "}
                <p className="mt-1">S, M, L, XL, XXL</p>
              </div>
            </Link>

            <Link
              href="/product/buy-ora"
              className="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg"
            >
              <div className="relative h-48 rounded overflow-hidden">
                <Image
                  alt="t-shirt"
                  src="/mug.webp"
                  height={120}
                  width={150}
                  className="m-auto md:m-0"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Shooting
                </h2>
                <p className="mt-1">$21.15</p>{" "}
                <p className="mt-1">S, M, L, XL, XXL</p>
              </div>
            </Link>

            <Link
              href="/product/buy-ora"
              className="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg"
            >
              <div className="relative h-48 rounded overflow-hidden">
                <Image
                  alt="t-shirt"
                  src="/mug.webp"
                  height={120}
                  width={150}
                  className="m-auto md:m-0"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Shooting
                </h2>
                <p className="mt-1">$21.15</p>{" "}
                <p className="mt-1">S, M, L, XL, XXL</p>
              </div>
            </Link>

            <Link
              href="/product/buy-ora"
              className="lg:w-1/4 md:w-1/2 p-4 w-full block shadow-lg"
            >
              <div className="relative h-48 rounded overflow-hidden">
                <Image
                  alt="t-shirt"
                  src="/mug.webp"
                  height={120}
                  width={150}
                  className="m-auto md:m-0"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Shooting
                </h2>
                <p className="mt-1">$21.15</p>{" "}
                <p className="mt-1">S, M, L, XL, XXL</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mugs