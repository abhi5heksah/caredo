"use client";

import React, { useState } from "react";
import { Toaster, toast } from "sonner"; // Import Toaster and toast from sonner
import { useRouter } from "next/navigation"; // This import caused the error in the Canvas environment

const Doctorlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    toast.success("Login Successful!");

    setTimeout(() => {
      router.push("/testreceptionist");
    }, 500);
  };

  return (
    <>
      <Toaster position="top-center" richColors />{" "}
      {/* Desktop View (Visible only on medium screens and up) */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-white py-6">
        <div className="w-full max-w-4xl mx-auto flex shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Left branding section - Desktop */}
          <div className="w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-center text-black">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Join fast, Patients are waiting for you...
            </h2>
            <p className="text-sm italic text-gray-800 mt-4 md:mt-8">
              “One INDIA, All Doctors, One Caredo”
            </p>
            <p className="text-xs text-gray-700 mt-1">
              “Caredo - Skip the line”
            </p>
          </div>

          {/* Right login section - Desktop */}
          <div className="w-1/2 bg-white p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Login <span className="text-yellow-500">for Doctors only</span>
            </h3>

            <form
              onSubmit={handleLoginSubmit}
              className="mt-4 md:mt-6 space-y-4 md:space-y-5"
            >
              <div>
                <label
                  htmlFor="mobile-desktop"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number of doctor
                </label>
                <input
                  type="text"
                  name="mobile-desktop"
                  id="mobile-desktop"
                  pattern="^[0-9]{10}$"
                  maxLength={10}
                  title="Enter exactly 10 digits"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password-desktop"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password-desktop"
                    id="password-desktop"
                    className="w-full mt-1 p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    title="Toggle password visibility"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-black text-sm"
              >
                Continue
              </button>
              <div className="text-right">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forget Password
                </a>
              </div>
              <div className="text-center mt-5 md:mt-6">
                <p className="text-sm italic text-gray-700 mb-2">
                  Don’t have account yet?
                </p>
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-md font-semibold text-sm"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile View (Visible only on screens smaller than medium) */}
      <div className="md:hidden relative min-h-screen flex flex-col items-center p-4">
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-[#FFBB00]"></div>
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-white"></div>

        {/* Marketing text "Join fast..."  */}
        <div className="relative z-10 w-full text-center mt-8 mb-8 order-1">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Join fast, Patients are waiting for you...
          </h2>
        </div>

        {/* Centered login card container - Mobile */}
        <div className="relative z-20 w-full max-w-md mx-auto flex flex-col shadow-lg rounded-lg overflow-hidden border border-gray-200 order-2">
          <div className="w-full bg-white p-8">
            <h3 className="text-xl font-bold mb-3">
              Login <span className="text-yellow-500">for Doctors only</span>
            </h3>
            <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="mobile-mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number of doctor
                </label>
                <input
                  type="text"
                  name="mobile-mobile"
                  id="mobile-mobile"
                  pattern="^[0-9]{10}$"
                  maxLength={10}
                  title="Enter exactly 10 digits"
                  className="w-full mt-1 p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password-mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password-mobile"
                    id="password-mobile"
                    className="w-full mt-1 p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    title="Toggle password visibility"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-black text-sm"
              >
                Continue
              </button>
              <div className="text-right">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forget Password
                </a>
              </div>
              <div className="text-center mt-5">
                <p className="text-sm italic text-gray-700 mb-2">
                  Don’t have account yet?
                </p>
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-md font-semibold text-sm"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative z-10 w-full text-center order-3 mt-8 ml-40">
          <div className="space-y-1">
            <div className="font-extrabold text-xl text-[#FFBB00]">
              {"“"}One INDIA,
            </div>
            <div className="font-extrabold text-xl text-black">
              All Doctors,
            </div>
            <div className="font-extrabold text-xl text-[#2ec4b6]">
              One Caredo{"”"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorlogin;
