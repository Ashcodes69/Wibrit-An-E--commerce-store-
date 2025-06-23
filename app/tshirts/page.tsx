"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string;
  color: string;
  price: number;
  availableQuantity: number;
}
function Tshirts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category="tShirts"
        const res = await fetch(`http://localhost:3000/api/getproducts?category=${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("failed to fetch product" + error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-3 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products &&products.map((item) => (
              <Link
                key={item._id}
                href={`/product/${item.slug}`}
                className="lg:w-1/4 md:w-1/2 p-10 w-full block shadow-lg mt-9"
              >
                <div className="relative h-48 rounded overflow-hidden">
                  <Image
                    alt={item.title}
                    src={item.img}
                    height={120}
                    width={150}
                    className="m-auto md:m-0"
                  />
                </div>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">₹{item.price}</p>
                  <p className="mt-1">{item.size}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tshirts;


