"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Static benefits list
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
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/testregistration/login");
  };

  const handlePayNowClick = () => {
    // Handle actual payment logic
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:bg-[#FFBB00]">
      <main className="flex flex-1 flex-col items-center justify-between py-8 px-4 md:py-12 md:px-8 relative md:flex-row md:justify-center">
        {/* Mobile yellow/white split background */}
        <div className="absolute inset-0 md:hidden">
          <div className="h-1/2 bg-[#FFBB00]" />
          <div className="h-1/2 bg-white" />
        </div>

        {/* Left side text */}
        <div className="relative z-10 max-w-md w-full text-center md:text-left md:items-start items-center md:mr-12 mt-auto md:mt-0 order-2 md:order-1">
          <h1 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Doctors like you are on Caredo...
          </h1>
        </div>

        {/* Right side card */}
        <div className="relative z-10 max-w-lg w-full flex flex-col justify-center items-center order-1 md:order-2 md:ml-12">
          {/* Mobile-only login */}
          <Button
            className="block md:hidden mb-4 ml-auto w-full max-w-[80px] bg-gray-800 text-white rounded-lg py-1 text-base font-semibold hover:bg-gray-700 transition-colors duration-200"
            onClick={handleLoginClick}
          >
            Login
          </Button>

          {/* Mobile-only headline */}
          <h1 className="block md:hidden text-xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Best Doctors like you are on Caredo...
          </h1>

          <Card className="rounded-2xl border border-gray-700 shadow-xl bg-white w-full max-w-md">
            <div className="w-full bg-[#424242] text-amber-400 text-center py-1 rounded-t-2xl">
              <span className="text-sm sm:text-base font-semibold">
                DOCTOR'S TOP CHOICE
              </span>
            </div>
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex justify-center items-center mb-3">
                <span className="text-gray-900 text-xl sm:text-3xl font-medium">
                  1 YEAR
                </span>
              </div>
              <ul className="mb-4 space-y-1 pl-4" key="benefits">
                {benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 mt-1.5 mr-2 bg-black rounded-full flex-shrink-0" />
                    <span
                      className={`${
                        benefit.isBold ? "font-bold" : "font-normal"
                      } text-sm`}
                    >
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline justify-center mb-4">
                <span className="text-red-500 line-through text-base sm:text-xl mr-2">
                  Rs 25,000
                </span>
                <span className="text-gray-900 font-bold text-sm sm:text-3xl lg:font-normal">
                  Rs 5,400
                </span>
                <span className="text-gray-500 text-xs ml-1">(+18% gst)</span>
              </div>

              <div className="w-full">
                <h3 className="font-bold text-lg sm:text-xl mb-1">Total</h3>
                <div className="flex justify-between text-sm sm:text-base mb-0.5">
                  <span className="text-gray-700">Market price</span>
                  <span className="text-gray-900">Rs 25,000</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base mb-0.5">
                  <span className="text-gray-700">Discount 65%</span>
                  <span className="text-green-600">-Rs 19,600</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base mb-3">
                  <span className="text-gray-700">(+18% gst)</span>
                  <span className="text-gray-900">Rs 972</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg sm:text-xl font-bold mb-3">
                  <span className="text-gray-900">To Pay</span>
                  <span className="text-gray-900">Rs 6,372</span>
                </div>
              </div>

              <Button
                className="w-full h-10 bg-[#00c600] text-white text-lg font-semibold rounded-full hover:bg-[#27b3a6] mt-auto"
                onClick={handlePayNowClick}
              >
                Pay now
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
