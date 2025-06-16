'use client'
import React, { useState } from 'react'

const Doctorlogin = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden border border-gray-200">

        {/* Left branding section */}
        <div className="w-full md:w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-center text-black">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Caredo</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Join fast, Patients are waiting for you...
          </h2>
          <p className="text-sm italic text-gray-800 mt-4 md:mt-8">
            “One INDIA, All Doctors, One Caredo”
          </p>
          <p className="text-xs text-gray-700 mt-1">“Caredo - Skip the line”</p>
        </div>

        {/* Right login section */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Login <span className="text-yellow-500">for Doctors only</span>
          </h3>

          <form className="mt-4 md:mt-6 space-y-4 md:space-y-5">
            {/* Mobile number input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number of doctor
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                pattern="^[0-9]{10}$"
                maxLength={10}
                title="Enter exactly 10 digits"
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                placeholder="Enter 10-digit mobile number"
                required
              />
            </div>

            {/* Password input with toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="w-full mt-1 p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  title="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-black text-sm"
            >
              Continue
            </button>

            {/* Forgot password */}
            <div className="text-right">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forget Password
              </a>
            </div>

            {/* Register now */}
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
  )
}

export default Doctorlogin
