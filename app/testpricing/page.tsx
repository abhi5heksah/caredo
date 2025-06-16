"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefitsList = [
  { text: "Valid for 365 days", isBold: true },
  { text: "Just ₹15/day", isBold: true },
  { text: "Access all premium features", isBold: false },
  { text: "0% commission on patients", isBold: false },
  {
    text: "Unlimited bookings, patients & doctors (within the same hospital)",
    isBold: false,
  },
];

export default function Pricing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const handlePayNowClick = () => {
    // Payment logic here
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:bg-[#FFBB00]">
      <main className="relative flex flex-1 flex-col items-center justify-between py-8 px-4 md:py-12 md:px-8 md:flex-row md:justify-center">
        {/* Mobile Split Background */}
        <div className="absolute inset-0 md:hidden">
          <div className="h-1/2 bg-[#FFBB00]" />
          <div className="h-1/2 bg-white" />
        </div>

        {/* Text Section */}
        <div className="relative z-10 w-full max-w-md text-center md:text-left md:mr-12 mt-auto md:mt-0 flex flex-col items-center md:items-start order-2 md:order-1">
          <h1 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Doctors like you are on Caredo...
          </h1>
        </div>

        {/* Card Section */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center order-1 md:order-2 md:ml-12">
          <h1 className="block md:hidden text-xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Best Doctors like you are on Caredo...
          </h1>

          <Card className="w-full max-w-md rounded-2xl border border-gray-300 shadow-xl bg-gray-100">
            <CardContent className="flex flex-col p-4 sm:p-6 h-full">
              <div className="flex justify-center items-center mb-4">
                <span className="text-gray-900 text-xl sm:text-3xl">
                  Rs 15/day
                </span>
              </div>

              <ul className="mb-6 space-y-2 pl-4">
                {benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 mt-2 mr-2 bg-black rounded-full"></span>
                    <span
                      className={`${benefit.isBold ? "font-semibold" : "font-normal"} text-sm md:text-base`}
                    >
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Monthly Plan */}
              <div className="border rounded-lg mb-4 overflow-hidden border-gray-300">
                <div className="bg-gray-400 py-2 text-center">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    BASIC PLAN
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <span className="font-bold text-gray-800 text-base sm:text-xl">
                        1) Monthly Plan (30 days)
                      </span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-red-500 line-through text-xs sm:text-sm mr-2">
                          Rs 2,000
                        </span>
                        <span className="text-black text-sm sm:text-xl">
                          Rs 450/month
                        </span>
                        <span className="text-gray-500 text-xs ml-1">
                          (+18% gst)
                        </span>
                      </div>
                    </div>
                    <Button
                      className="bg-[#00c600] text-white text-sm px-4 py-2 rounded w-[40%] ml-auto sm:w-auto sm:ml-0"
                      onClick={handlePayNowClick}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Yearly Plan */}
              <div className="border rounded-lg overflow-hidden border-gray-300">
                <div className="bg-yellow-500 py-2 text-center">
                  <span className="text-xs sm:text-sm font-bold text-black">
                    DOCTORS TOP CHOICE
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <span className="font-bold text-gray-900 text-base sm:text-xl">
                        2) 1 Year Plan
                      </span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-red-700 line-through text-xs sm:text-sm mr-2">
                          Rs 25,000
                        </span>
                        <span className="text-gray-900 text-sm sm:text-xl">
                          Rs 5,400/year
                        </span>
                        <span className="text-gray-700 text-xs ml-1">
                          (+10% gst)
                        </span>
                      </div>
                    </div>
                    <Button
                      className="bg-[#00c600] text-white text-sm px-4 py-2 rounded w-[40%] ml-auto sm:w-auto sm:ml-0"
                      onClick={handlePayNowClick}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
