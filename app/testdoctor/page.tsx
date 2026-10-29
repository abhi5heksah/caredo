"use client";

import React, { useState } from "react";
import { Calendar, ArrowLeft } from "lucide-react";

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedDate(event.target.value);
  };

  const handleDoneClick = () => {
    // console.log("Done button clicked! Selected Date:", selectedDate);
  };

  const handleClinicClosedClick = () => {
    // console.log("Clinic Will Be Closed button clicked!");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4 px-4 sm:px-6 md:px-8 flex items-center border-b border-gray-200">
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Mark Holiday</h1>
      </header>

      {/* Main */}
      <main className="w-full bg-amber-400 py-8 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
        {/* Left Section */}
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left mb-2 sm:mb-8 lg:mb-0 lg:w-1/2">
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Set unavailable dates:
          </h2>
          <div className="flex flex-row items-center justify-center sm:justify-start space-x-2 w-full">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full max-w-[200px] sm:w-64 md:w-72 pl-4 pr-12 py-1 rounded-full border-2 border-transparent focus:outline-none focus:border-amber-600 text-gray-800 placeholder-gray-500 shadow-md"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleDoneClick}
              className="bg-gray-800 text-white px-4 py-1 rounded-full font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 shadow-md transition duration-200"
            >
              Done
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={handleClinicClosedClick}
              className="px-2 py-1 bg-white text-gray-600 rounded-lg font-normal shadow-md hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-200"
            >
              CLINIC WILL BE CLOSED
            </button>

            {/* Thought Bubble Dots */}
            <div className="flex items-end -mb-1 space-x-0.5">
              <span className="h-2 w-2 bg-white rounded-full"></span>
              <span className="h-3 w-3 bg-white rounded-full"></span>
              <span className="h-4 w-4 bg-white rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative z-10 mt-2 lg:mt-2 lg:w-[50%] flex lg:justify-end">
          <img
            src="/placeholder-4qm88.png"
            alt="Doctor"
            className="w-48 h-48 sm:w-80 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain rounded-full shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/300x300/FACC15/FFFFFF?text=DoctorImage";
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-200 py-8 px-4 sm:px-6 md:px-8 text-gray-700 text-center">
        <p className="mb-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          During national holidays, major festivals or personal holidays, we
          understand that you or your clinic might be unavailable or operating
          with limited hours.
        </p>
        <p className="mb-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          To help patients avoid any last-minute inconvenience, we encourage you
          to update your availability in advance. This allows your patients to
          plan better and ensures a more seamless appointment experience.
        </p>
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Let&apos;s keep patients informed and prepared — because their health
          shouldn&apos;t have to wait.
        </p>
      </footer>
    </div>
  );
};

export default App;
