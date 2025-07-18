"use client";
import AlertModal from "@/Components/AlertModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

function Myaccount() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    //if user is not logged in then send him to home page
    if (!token) {
      router.push("/");
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [readOnly, setReadOnly] = useState(false);

  // fetch city and state from users pincode
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
    }
  };
  useEffect(() => {
    if (
      name.trim() &&
      email.trim() &&
      address.trim() &&
      phone.trim().length === 10 &&
      pincode.trim().length === 6 &&
      city.trim() &&
      state.trim()
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, address, phone, pincode, city, state]);

  const saveUserProfile = async () => {
    const data = { name, email, address, phone, pincode, city, state };
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/userProfile/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await responce.json();
      if (responce.ok && result.success) {
        setSuccess(true);
        setMessage("Profile saved successfully!");
        setReadOnly(true);
      } else {
        setSuccess(false);
        setReadOnly(false);
        setMessage(result.error || "Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setMessage("Something went wrong.");
    }
    setShowAlert(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!email) {
        return;
      }
      try{
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/userProfile/get?email=${email}`
      );
      const data = await responce.json();
      console.log(data);
      if (responce.ok && data.success) {
        const user = data.user;
        setAddress(user.address);
        setPhone(user.phone.toString());
        setPincode(user.pincode.toString());
        setCity(user.city);
        setState(user.state);
        setReadOnly(true);
      }
    }catch(err){
      console.error(err)
    }
      }
fetchUserProfile();
  }, [email]);

  return (
    <>
      <AlertModal
        showAlert={showAlert}
        message={message}
        success={success}
        onClose={() => {
          setShowAlert(false);
        }}
      />
      <div className="max-w-5xl mx-auto p-4 bg-purple-50">
        <h2 className="text-3xl font-bold text-purple-800 mb-8 border-b pb-2">
          My Account
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">
            Personal Information
          </h3>
          <div className="flex flex-wrap gap-5">
            <div className="w-full md:w-[48%]">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Name
              </label>
              <input
                readOnly
                value={name}
                name="name"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full md:w-[48%]">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                readOnly
                value={email}
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">
            Address
          </h3>
          <div className="w-full mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Address
            </label>
            <textarea
              readOnly={readOnly}
              onChange={handleChange}
              value={address}
              name="address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Phone
              </label>
              <input
                readOnly={readOnly}
                onChange={handleChange}
                value={phone}
                name="phone"
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                PinCode
              </label>
              <input
                readOnly={readOnly}
                onChange={handleChange}
                value={pincode}
                name="pincode"
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                City
              </label>
              <input
                readOnly
                value={city}
                name="city"
                type="text"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                State
              </label>
              <input
                readOnly
                value={state}
                name="state"
                type="text"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={saveUserProfile}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-all shadow-md"
            disabled={disabled}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Myaccount;
