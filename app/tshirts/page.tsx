"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Variant {
  size: string;
  color: string;
  quantity: number;
  price: number;
}
interface Product {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  variants: Variant[];
}

function Tshirts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = "tShirts";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?category=${category}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("failed to fetch product" + error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item._id}
              href={`/product/${item.slug}`}
              className="block shadow-md rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-transform hover:scale-105"
            >
              <div className="relative h-60 bg-gray-100 flex items-center justify-center">
                <Image
                  alt={item.title}
                  src={item.img}
                  height={200}
                  width={200}             
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-5">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                  {item.category}
                </h3>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {item.title}
                </h2>
                <p className="mt-2 text-lg font-bold text-indigo-600">
                  ₹{item.variants[0]?.price}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Sizes:</p>
                  <div className="flex flex-wrap mt-1">
                    {Array.from(new Set(item.variants.map((v) => v.size))).map(
                      (size) => (
                        <span
                          key={size}
                          className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 mr-2 mb-2 rounded"
                        >
                          {size}
                        </span>
                      )
                    )}
                  </div>

                  <p className="text-sm font-medium text-gray-700 mt-2">
                    Colors:
                  </p>
                  <div className="flex flex-wrap mt-1">
                    {Array.from(new Set(item.variants.map((v) => v.color))).map(
                      (color) => (
                        <span
                          key={color}
                          className="inline-block bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 mr-2 mb-2 rounded"
                        >
                          {color}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tshirts;
