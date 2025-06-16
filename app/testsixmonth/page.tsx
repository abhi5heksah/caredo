"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

// --- UPDATED CARD DETAILS ---
const benefitsList = [
  { text: "Valid for 30 days", isBold: true },
  { text: "Just ₹15/day", isBold: true },
  { text: "Access all premium features", isBold: false },
  { text: "0% commission on patients", isBold: false },
  {
    text: "Unlimited bookings, patients & doctors (within the same hospital)",
    isBold: false,
  },
];

export default function Pricing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Handles navigation for both Login button
  const handleLoginClick = () => {
    router.push("/testregistration/login"); // Assuming this is the correct login route
  };

  // Handler for Pay Now buttons - can be extended to pass plan details
  const handlePayNowClick = (plan: string) => {
    console.log(`Paying for ${plan}`);
    // Implement your payment gateway redirection or logic here
    // Example: router.push(`/payment?plan=${plan}`);
  };

  return (
    // FIX: Removed the extra '>' character here
    <div className="w-full min-h-screen flex flex-col md:bg-[#FFBB00]">
      {/* Mobile Menu (unchanged - this is for the side drawer) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:w-80`}
      >
        <div className="p-6 flex flex-col h-full relative">
          <div className="flex items-center space-x-1 text-lg font-semibold mb-8 md:text-xl">
            <span>Care</span>
            <span className="text-[#2ec4b6]">do</span>
          </div>
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-700 text-2xl md:text-3xl"
          >
            &times;
          </button>
          <Button
            className="mt-auto w-full bg-gray-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-gray-700 transition-colors duration-200 md:text-base md:py-3"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col justify-between items-center py-8 px-4 md:py-12 md:px-8 relative md:flex-row md:justify-center">
        {/* Mobile-Only Half Backgrounds */}
        <div className="absolute inset-0 bg-[#FFBB00] h-1/2 md:hidden"></div>
        <div className="absolute inset-x-0 bottom-0 bg-white h-1/2 md:hidden"></div>

        {/* Text Section (Desktop Left, Mobile Bottom) */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-md w-full text-center md:text-left items-center md:items-start md:mr-12 md:mt-0 mt-auto order-2 md:order-1">
          <h1 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Best Doctors like you are on Caredo...
          </h1>
        </div>

        {/* Card Section (Desktop Right, Mobile Middle) */}
        <div className="relative z-20 max-w-lg w-full flex flex-col justify-center items-center order-1 md:order-2 md:ml-12 md:flex-shrink-0">
          <Button
            className="block md:hidden mb-4 ml-auto w-full max-w-[80px] bg-gray-800 text-white rounded-lg py-1 text-base font-semibold hover:bg-gray-700 transition-colors duration-200"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          {/* This H1 is for the mobile view, displayed above the card and hidden on desktop */}
          <h1 className="block md:hidden text-xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Best Doctors like you are on Caredo...
          </h1>

          {/* Desktop-only blurred background for the card - CRITICAL FIX: Added bg-[#ffbb00] and z-0 */}
          <div className="hidden md:block absolute -top-10 -left-10 w-full h-[420px] bg-[#ffbb00] opacity-80 blur-xl z-0" />

          {/* CRITICAL FIX: Ensure Card has a higher z-index than the blurred background if they overlap */}
          <Card className="rounded-2xl border border-gray-300 shadow-xl bg-gray-100 w-full max-w-md mx-auto lg:-mt-2 relative z-10">
            <CardContent className="p-4 sm:p-6 flex flex-col h-full">
              {/* Top "Rs 15/day" text */}
              <div className="flex justify-center items-center mb-4">
                <span className="text-gray-900 text-xl sm:text-3xl">
                  {" "}
                  {/* Reduced text-2xl to text-xl for mobile */}1 MONTHS
                </span>
              </div>

              {/* Benefits list */}
              <ul className="mb-6 space-y-2 pl-4">
                {benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 mt-2 mr-2 bg-black rounded-full flex-shrink-0" />
                    <span
                      className={`${
                        benefit.isBold ? "font-semibold" : "font-normal"
                      } text-sm md:text-base`}
                    >
                      {" "}
                      {/* Reduced text-base to text-sm for mobile */}
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline justify-center mb-6">
                <span className="text-red-500 line-through text-lg sm:text-xl mr-2">
                  Rs 1,250
                </span>
                <span className="text-gray-900 text-2xl sm:text-2xl font-medium">
                  Rs 450
                </span>
                <span className="text-gray-500 text-xs ml-1">(+18% gst)</span>
              </div>

              {/* Total Section */}
              <div className="w-full">
                <h3 className="font-bold text-lg sm:text-xl mb-2">Total</h3>
                <div className="flex justify-between items-center text-sm sm:text-base mb-1">
                  <span className="text-gray-700">Market price</span>
                  <span className="text-gray-900">Rs 2,000</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base mb-1">
                  <span className="text-gray-700">Discount 52%</span>
                  <span className="text-green-600">-Rs 1,550</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base mb-4">
                  <span className="text-gray-700">(+18% gst)</span>
                  <span className="text-gray-900">Rs 81</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold mb-4">
                  <span className="text-gray-900">To Pay</span>
                  <span className="text-gray-900">Rs 531</span>
                </div>
              </div>

              {/* Single Pay Now Button at the bottom */}
              <Button
                className="w-full h-10 bg-[#00c600] text-white text-lg font-semibold rounded-full hover:bg-[#27b3a6] mt-auto" // Adjusted styling for the new button position
                onClick={handleLoginClick}
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
