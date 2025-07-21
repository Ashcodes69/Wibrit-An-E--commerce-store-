"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import AlertModal from "@/Components/AlertModal";
import jwt, { JwtPayload } from "jsonwebtoken";
import { FaEdit } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

function Checkout() {
  const { cart, subtotal, addToCart, removeFromCart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [success, setSuccess] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [originalData, setOriginalData] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [reset, setReset] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "pincode") {
      setPincode(value);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    //if user is not logged in then send him to home page
    if (!token) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
      return;
    }
    try {
      //fetch name and email of an logged in user
      const decoded = jwt.decode(token) as JwtPayload | null;
      if (decoded && typeof decoded === "object" && "email" in decoded) {
        setEmail(decoded.email as string);
        setName((decoded.name as string) || "");
        console.log(decoded.name as string);
      }
    } catch (err) {
      console.log(err);
    }
  }, [router]);

  // fetch ciity and state from backend from user given pin
  const fetchCityState = async (pin: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pinCodes/getPinCodes?code=${pin}`
    );
    const { pincode } = await res.json();
    if (pincode) {
      return { city: pincode.city, state: pincode.state, found: true };
    }
    return { city: "", state: "", found: false };
  };
  useEffect(() => {
    const fetchCityStateForPin = async () => {
      if (pincode.trim().length === 6) {
        try {
          const { city, state, found } = await fetchCityState(pincode.trim());
          if (found) {
            setCity(city);
            setState(state);
          } else {
            setShowAlert(true);
            setSuccess(false);
            setMessage("Sorry! currently we dont delever in your area ");
            setDisabled(true);
            setCity("");
            setState("");
          }
        } catch (err) {
          console.error("Error fetching city/state:", err);
          setCity("");
          setState("");
        }
      } else {
        setCity("");
        setState("");
      }
    };
    fetchCityStateForPin();
  }, [pincode]);

  useEffect(() => {
    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      address.trim() !== "" &&
      phone.trim().length >= 10 &&
      pincode.trim().length >= 6 &&
      Object.keys(cart).length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, address, phone, pincode, cart]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!email) {
        return;
      }
      try {
        const responce = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/userProfile/get?email=${email}`
        );
        const data = await responce.json();
        if (responce.ok && data.success) {
          const user = data.user;
          setAddress(user.address);
          setPhone(user.phone.toString());
          setPincode(user.pincode.toString());
          setCity(user.city);
          setState(user.state);
          // setReadOnly(true);
          setOriginalData({
            name: user.name || "",
            address: user.address,
            phone: user.phone.toString(),
            pincode: user.pincode.toString(),
            city: user.city,
            state: user.state,
          });
        } else {
          setIsEditable(true);
          setReadOnly(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserProfile();
  }, [email]);

  const resetForm = () => {
    setName(originalData.name);
    setAddress(originalData.address);
    setPhone(originalData.phone);
    setPincode(originalData.pincode);
    setCity(originalData.city);
    setState(originalData.state);
    setIsEditable(false);
    setReadOnly(true);
    setShowAlert(false);
  };

  //main checkout function
  // TODO----->>> add a payment gateway

  const pay = async () => {
    const formattedProducts = Object.keys(cart).map((key) => {
      const item = cart[key];
      return {
        productId: item._id,
        title: item.name,
        size: item.size,
        color: item.variant,
        price: item.price,
        quantity: item.qty,
        img: item.img,
      };
    });

    const orderPayload = {
      email,
      address,
      amount: subtotal,
      products: formattedProducts,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success) {
        setShowAlert(true);
        setOrderId(data.orderId);
        setSuccess(true);
        setMessage("Your order has been placed successfully!");
        clearCart();
      } else {
        console.error(" Order failed response:", data);
        setShowAlert(true);
        setSuccess(false);
        if (Array.isArray(data.outOfStockItems)) {
          const formattedMessage = data.outOfStockItems
            .map(
              (item: {
                title: string;
                color: string;
                size: string;
                requested: number;
                avalable: number;
              }) =>
                `Products are out Of Stock\n${item.title} (${item.color}/${item.size}) - Requested: ${item.requested}, Available: ${item.avalable}\m`
            )
            .join("\n");
          setMessage(formattedMessage);
        } else {
          setMessage(data.massage || "order failed");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setShowAlert(true);
      setSuccess(false);
      setMessage("Something went wrong while placing the order.");
    }
  };
  return (
    <>
      <AlertModal
        showAlert={showAlert}
        message={message}
        success={success}
        confirmation={confirmation}
        onClose={() => {
          setShowAlert(false);
          if (success === true) {
            router.push(
              `${process.env.NEXT_PUBLIC_HOST}/order?orderId=${orderId}`
            );
          }
        }}
        onConfirm={() => {
          if (!reset) {
            setReadOnly(false);
            setIsEditable(true);
            setShowAlert(false);
            setConfirmation(false);
          } else if (reset) {
            resetForm();
            // setConfirmation(false);
          }
        }}
      />
      <div className="max-w-4xl mx-auto px-6 py-10 bg-purple-100 min-h-screen rounded-2xl shadow-lg">
        <h1 className="text-center text-4xl font-extrabold text-purple-900 mb-10">
          Checkout
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            1. Delivery Details
          </h2>
          <div className="flex flex-wrap gap-5">
            <div className="w-full md:w-[48%]">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Name
              </label>
              <input
                readOnly={readOnly}
                onChange={handleChange}
                value={name}
                name="name"
                type="text"
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none ${
                  isEditable
                    ? "bg-purple-100 shadow-purple-300 shadow-md transition-transform hover:scale-105"
                    : "bg-gray-100"
                }`}
              />
            </div>
            <div className="w-full md:w-[48%]">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Email
              </label>
              <input
                readOnly
                onChange={handleChange}
                value={email}
                name="email"
                type="email"
                className="bg-gray-100 w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Address
              </label>
              <textarea
                readOnly={readOnly}
                onChange={handleChange}
                value={address}
                name="address"
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none ${
                  isEditable
                    ? "bg-purple-100 shadow-purple-300 shadow-md transition-transform hover:scale-105"
                    : "bg-gray-100"
                }`}
              ></textarea>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Phone
              </label>
              <input
                readOnly={readOnly}
                onChange={handleChange}
                value={phone}
                name="phone"
                type="number"
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none ${
                  isEditable
                    ? "bg-purple-100 shadow-purple-300 shadow-md transition-transform hover:scale-105"
                    : "bg-gray-100"
                }`}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                PinCode
              </label>
              <input
                readOnly={readOnly}
                onChange={handleChange}
                value={pincode}
                name="pincode"
                type="number"
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none ${
                  isEditable
                    ? "bg-purple-100 shadow-purple-300 shadow-md transition-transform hover:scale-105"
                    : "bg-gray-100"
                }`}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                City
              </label>
              <input
                readOnly={true}
                value={city}
                name="city"
                type="text"
                className="bg-gray-100 w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                State
              </label>
              <input
                readOnly={true}
                name="state"
                value={state}
                type="text"
                className="bg-gray-100 w-full border border-purple-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => {
                  setShowAlert(true);
                  setMessage("Do you want to Edit Delivery Details?");
                  setConfirmation(true);
                }}
                disabled={isEditable}
                className={`px-6 py-3 rounded-lg shadow-md transition-all ${
                  isEditable
                    ? "invisible"
                    : "bg-gray-100 hover:bg-red-400 text-red cursor-pointer"
                }`}
              >
                <FaEdit />
              </button>
              {isEditable && (
                <button
                  onClick={() => {
                    setShowAlert(true);
                    setMessage("Do you want to reset");
                    setConfirmation(true);
                    setReset(true);
                  }}
                  className="bg-gray-100 text-xl px-6 py-2 rounded-lg text-purple font-bold hover:bg-purple-500 transition"
                >
                  <RiResetLeftLine />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            2. Review Cart Items
          </h2>

          <ol className="space-y-6 text-gray-800 font-medium">
            {cart && Object.keys(cart).length === 0 && (
              <li className="text-gray-500 text-sm text-center">
                Your cart is empty
              </li>
            )}
            {cart &&
              Object.keys(cart).map((k) => (
                <li
                  key={k}
                  className="flex flex-col sm:flex-row items-center gap-4 border border-purple-100 rounded-xl p-4"
                >
                  <Image
                    src={cart[k].img}
                    alt={cart[k].name}
                    width={60}
                    height={60}
                    className="rounded-lg border border-purple-400 shadow-md"
                  />

                  <div className="flex-1 w-full">
                    <p className="text-base font-semibold text-gray-900">
                      {cart[k].name}
                    </p>
                    <p className="text-xs text-purple-500 mt-1">
                      Size: {cart[k].size} | Color: {cart[k].variant}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-2xl text-purple-700">
                    <CiCircleMinus
                      onClick={() => removeFromCart(k, 1)}
                      className="cursor-pointer hover:text-red-500 transition"
                    />
                    <span className="text-lg font-semibold">{cart[k].qty}</span>
                    <CiCirclePlus
                      onClick={() => addToCart(k, 1)}
                      className="cursor-pointer hover:text-green-500 transition"
                    />
                  </div>
                </li>
              ))}
          </ol>

          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="font-bold text-xl text-gray-900">
              Total Amount: ₹{subtotal}
            </span>
            <button
              onClick={pay}
              disabled={disabled}
              className="bg-purple-700 text-white px-8 py-2 rounded-full hover:bg-purple-800 transition shadow-md disabled:bg-purple-400"
            >
              Pay ₹{subtotal}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
