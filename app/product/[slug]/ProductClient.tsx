"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast, Zoom } from "react-toastify";

// interface of the product and its variants
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

export default function ProductClient({ slug }: { slug: string }) {
  const { addToCart, buyNow } = useCart();

  const [pin, setPin] = useState<string>("");
  const [pinerror, setPinerror] = useState<string>("");
  const [service, setService] = useState<boolean | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectSize, setSelectSize] = useState<string>("");
  const [selectColor, setSelectColor] = useState<string>("");
  const [invalidCombo, setInvalidCombo] = useState<boolean | null>(null);

  const cheackPincode = async () => {
    //function to cheac service avalablity in a particular pincode/aea
    const code = pin.trim();
    if (code.length < 6) {
      setPinerror("please enter a valid pincode");
      setService(null);
      return;
    }
    try {
      const res = await fetch( `${process.env.NEXT_PUBLIC_HOST}/api/pinCodes/getPinCodes?code=${code}`);
      const data = await res.json();
      if (data.success && data.pincode && data.pincode.isActive) {
        setService(true);
        setPinerror("");
      } else {
        setService(false);
        setPinerror("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onchangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  useEffect(() => {
    //function to fetch a product from a data base through its unique slug
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/products/getproducts?slug=${slug}`
        );
        const data = await res.json();
        setProduct(data);
        if (data?.variants?.length > 0) {
          setSelectColor(data.variants[0].color.toLowerCase());
          setSelectSize(data.variants[0].size.toLowerCase());
          setInvalidCombo(false);
        }
      } catch (error) {
        console.error("failed to fetch product" + error);
      }
    };
    fetchProduct();
  }, [slug]);

  const avaliableColors = React.useMemo(() => {
    //function to cheack avalable colors according to size
    if (!product) return [];
    return Array.from(
      new Set(
        product.variants
          .filter((v) =>
            selectSize
              ? v.size.toLowerCase() === selectSize.toLowerCase() &&
                v.quantity > 0
              : v.quantity > 0
          )
          .map((v) => v.color)
      )
    );
  }, [product, selectSize]);

  const avaliableSize = React.useMemo(() => {
    //function to display all the sizes of the product and from its all variants
    if (!product) return [];
    return Array.from(
      new Set(product.variants.map((v) => v.size.toLowerCase()))
    );
  }, [product]);

  useEffect(() => {
    //function to verify that product size and colors all are avalable and user select the currect one
    if (!product || !selectColor || !selectSize.toLowerCase() || !product) {
      setInvalidCombo(null);
      return;
    }
    const match = product?.variants.some(
      (v) =>
        v.color.toLowerCase() === selectColor &&
        v.size.toLowerCase() === selectSize &&
        v.quantity > 0
    );
    setInvalidCombo(!match);
  }, [selectSize, selectColor, product]);
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {product && (
              <Image
                alt={product?.title}
                className="lg:w-1/2 w-full lg:h-1/3 object-cover object-top rounded px-14"
                width={800}
                height={800}
                src={product?.img}
                priority
              />
            )}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.title},{" "}
                {selectColor && `-${selectColor.toUpperCase()}`}
                {selectSize && ` /${selectSize.toUpperCase()}`}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product?.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {avaliableColors.map((color) => (
                    <button
                      key={color}
                      value={color.toLowerCase()}
                      onClick={() => setSelectColor(color.toLowerCase())}
                      className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none
                        ${
                          selectColor === color.toLowerCase()
                            ? "ring-2 ring-purple-500"
                            : ""
                        }
                        `}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    ></button>
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10"
                      value={selectSize.toLowerCase()}
                      onChange={(e) =>
                        setSelectSize(e.target.value.toLowerCase())
                      }
                    >
                      {avaliableSize.map((size) => (
                        <option key={size} value={size.toLowerCase()}>
                          {size.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹
                  {selectSize && selectColor
                    ? product?.variants.find(
                        (v) =>
                          v.color.toLowerCase() === selectColor.toLowerCase() &&
                          v.size.toLowerCase() === selectSize.toLowerCase()
                      )?.price ?? "00"
                    : "00"}
                </span>
                <button
                  onClick={() => {
                    if (!selectSize || !selectColor) {
                      setInvalidCombo(true);
                      toast.warning("Please select Size and Color", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Zoom,
                      });
                      return;
                    }
                    if (invalidCombo) return;
                    const selectedVariant = product?.variants.find(
                      (v) =>
                        v.color.toLowerCase() === selectColor &&
                        v.size.toLowerCase() === selectSize
                    );
                    if (!selectedVariant) return;
                    buyNow(
                      product?.slug || "",
                      1,
                      selectedVariant.price || 0,
                      product?.title || "",
                      selectSize,
                      selectColor,
                      product?.img || "",
                      product?._id
                    );
                  }}
                  className="flex items-center ml-auto text-white bg-purple-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-purple-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (!selectSize || !selectColor) {
                      setInvalidCombo(true);
                      toast.warning("Please select Size and Color", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Zoom,
                      });
                      return;
                    }
                    if (invalidCombo) return;
                    const selectedVariant = product?.variants.find(
                      (v) =>
                        v.color.toLowerCase() === selectColor &&
                        v.size.toLowerCase() === selectSize
                    );
                    if (!selectedVariant) return;
                    addToCart(
                      product?.slug || "",
                      1,
                      selectedVariant.price || 0,
                      product?.title || "",
                      selectSize,
                      selectColor,
                      product?.img || "",
                      product?._id
                    );
                    toast.success("Product is added to Cart", {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Zoom,
                    });
                  }}
                  className="flex items-center ml-auto text-white bg-purple-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-purple-600 rounded"
                >
                  <IoMdAddCircleOutline className="mx-2 font-bold text-xl" />
                  To Cart
                </button>

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              {invalidCombo === true && (
                <p className="text-sm text-red-600 font-medium mt-2">
                  Please select Size and Color
                </p>
              )}

              <div className="pin mt-6 bg-purple-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-800 font-medium mb-2">
                  Check delivery service availability in your area
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    onChange={onchangePin}
                    placeholder="Enter your pin code"
                    className="flex-grow p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    onClick={cheackPincode}
                    className="text-white bg-purple-600 hover:bg-purple-700 border-0 py-2 px-4 rounded"
                  >
                    Check
                  </button>
                  <div className="displayPincodeResults min-h-[24px]">
                    {pinerror && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {pinerror}
                      </p>
                    )}
                    {service !== null && (
                      <p
                        className={`mt-2 text-sm font-medium ${
                          service ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {service
                          ? "Delivery is available at your pincode ✅"
                          : "Sorry, we do not deliver to this pincode ❌"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
