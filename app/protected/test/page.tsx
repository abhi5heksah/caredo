"use client";

import React from "react";

export default function FullPageComponent() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#dcfbf8] via-white to-[#ffe29f] overflow-x-hidden px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Welcome to <span className="text-[#2ec4b6]">Caredo</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          A smart platform for doctors and patients to connect, manage appointments,
          and streamline care—all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-[#2ec4b6] text-white font-semibold hover:bg-[#29b1a7] transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-full border border-[#2ec4b6] text-[#2ec4b6] font-semibold hover:bg-[#dcfbf8] transition">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <img
          src="https://images.unsplash.com/photo-1588776814546-ec14bcb638b4?auto=format&fit=crop&w=1000&q=80"
          alt="Doctor illustration"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
