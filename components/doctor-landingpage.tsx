"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const benefitsList = [
  { text: "2 month free testing plan", isBold: true },
  { text: "₹0/day", isBold: true },
  { text: "Access all premium features", isBold: false },
  { text: "0% commission on patients", isBold: false },
  {
    text: "Unlimited bookings, patients & doctors",
    isBold: false,
    hasItalic: true,
  },
];

export default function DoctorLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  // Handles navigation for both Login button and Register Now button
  const handleLoginClick = () => {
    router.push("/testregistration/login");
  };

  return (
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
          {/* This H1 is for the desktop view, hidden on mobile */}
          <h1 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Join fast, Patients are waiting for you...
          </h1>

          <div className="flex justify-end md:justify-start w-full">
            <div className="space-y-1 mt-6 md:mt-6">
              <div className="font-extrabold text-xl sm:text-2xl text-[#FFBB00] md:text-[#ffffff]">
                {'"'}One INDIA,
              </div>
              <div className="font-extrabold text-xl sm:text-2xl text-black">
                All Doctors,
              </div>
              <div className="font-extrabold text-xl sm:text-2xl text-[#2ec4b6] md:text-[#ffffff]">
                One Caredo{'"'}
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <p className="italic text-gray-600 text-sm lg:text-white">
              &quot;Be the part of this mission to save time and life of every Indians&quot;
            </p>
          </div>
        </div>

        {/* Card Section (Desktop Right, Mobile Middle) */}
        <div className="relative z-20 max-w-lg w-full flex flex-col justify-center items-center order-1 md:order-2 md:ml-12 md:flex-shrink-0">
          {/* Mobile-only Login Button */}
          <Button
            className="block md:hidden mb-4 ml-auto w-full max-w-[80px] bg-gray-800 text-white rounded-lg py-1 text-base font-semibold hover:bg-gray-700 transition-colors duration-200"
            onClick={handleLoginClick}
          >
            Login
          </Button>

          {/* This H1 is for the mobile view, displayed above the card and hidden on desktop */}
          <h1 className="block md:hidden text-xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Join fast, Patients are waiting for you...
          </h1>

          {/* Desktop-only blurred background for the card - CRITICAL FIX: Added bg-[#ffbb00] and z-0 */}
          <div className="hidden md:block absolute -top-10 -left-10 w-full h-[420px] bg-[#ffbb00] opacity-80 blur-xl z-0" />

          {/* CRITICAL FIX: Ensure Card has a higher z-index than the blurred background if they overlap */}
          <Card className="rounded-2xl border border-gray-300 shadow-xl bg-white w-full max-w-md mx-auto lg:-mt-20 relative z-10">
            <CardContent className="p-4 sm:p-8 flex flex-col h-full">
              <div className="flex justify-between items-center -mb-2">
                <div className="font-bold text-[#424242] text-center text-lg sm:text-xl">
                  2 MONTHS
                </div>
                <div className="font-semibold text-[#14d100] text-base sm:text-2xl">
                  *FREE
                </div>
              </div>
              <ul className="mt-4 mb-6 space-y-3">
                {benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-black rounded-full flex-shrink-0" />
                    <span
                      className={`${
                        benefit.isBold ? "font-semibold" : "font-normal"
                      } text-gray-800 text-base`}
                    >
                      {benefit.text}
                      {benefit.hasItalic && (
                        <span className="italic text-sm text-gray-500">
                          {" "}
                          (within the same hospital)
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <div className="italic text-gray-700 text-xs mb-2">
                *Join Caredo for Free
              </div>
              <Button
                className="w-full h-10 bg-[#424242] rounded-full text-lg font-semibold hover:bg-[#323232]"
                onClick={handleLoginClick}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
