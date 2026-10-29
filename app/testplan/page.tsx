"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Plan() {
  const [isMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPlanType, setCurrentPlanType] = useState<
    "free" | "monthly" | "yearly"
  >("free");

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedPlan = localStorage.getItem("currentPlanType") as
        | "free"
        | "monthly"
        | "yearly"
        | null;
      if (savedPlan) {
        setCurrentPlanType(savedPlan);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPlanType", currentPlanType);
    }
  }, [currentPlanType]);

  const handleLoginClick = () => {
    router.push("/testregistration/login");
  };

  const handlePayNowClick = (plan: string) => {
    console.log(`Paying for ${plan}`);
    if (plan === "Monthly Plan") {
      setCurrentPlanType("monthly");
    } else if (plan === "1 Year Plan") {
      setCurrentPlanType("yearly");
    } else if (plan === "Free Trial Plan") {
      setCurrentPlanType("free");
    }
  };

  const handleGoBack = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.back();
  };

  const commonPaidBenefits = [
    { text: "Access all premium features", isBold: false },
    { text: "0% commission on patients", isBold: false },
    {
      text: "Unlimited bookings, patients & doctors (within the same hospital)",
      isBold: false,
    },
  ];

  const mobilePlanDetails = {
    free: {
      title: "Free Trial Plan",
      validity: "Your plan is valid till 5th December 2025.",
      duration: "(5 Oct 2025 - 5 Dec 2025)",
    },
    monthly: {
      title: "1 months plan.",
      validity: "Your plan is valid till 5th April 2026.",
      duration: "(5 Oct 2025 - 5 Nov 2025)",
    },
    yearly: {
      title: "1 Year Plan",
      validity: "Your plan is valid till 5th October 2026.",
      duration: "(5 Oct 2025 - 5 Oct 2026)",
    },
  };

  const activePlanDetails = mobilePlanDetails[currentPlanType];

  const renderCurrentPlanCard = () => {
    if (currentPlanType === "free") {
      return (
        <Card
          key="free-card"
          className="w-11/12 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden border border-gray-300 -mt-8 md:mt-0 relative"
        >
          <CardContent className="p-4 sm:p-6 flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Free Trial Plan
            </h3>
            <ul className="mb-6 space-y-2 pl-4 flex-1">
              <li>2 month free testing plan</li>
              <li>₹0/day</li>
              {commonPaidBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 mt-2 mr-2 bg-black rounded-full flex-shrink-0" />
                  <span
                    className={`${
                      benefit.isBold ? "font-semibold" : "font-normal"
                    } text-sm md:text-base`}
                  >
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-end flex-shrink-0 ml-4 mt-auto">
              <div className="flex items-baseline">
                <span className="text-red-500 line-through text-sm mr-1">
                  Rs 2000
                </span>
                <span className="text-gray-900 text-xl font-bold">Rs 0</span>
              </div>
              <span className="text-green-600 text-lg font-semibold mt-1">
                *FREE*
              </span>
            </div>
          </CardContent>
        </Card>
      );
    } else if (currentPlanType === "monthly") {
      return (
        <Card
          key="monthly-card"
          className="w-11/12 max-w-md mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden border border-gray-300 -mt-8 md:mt-0 relative"
        >
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm font-semibold mb-2">BASIC PLAN</div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex-1">
                Monthly Plan (30days)
              </h3>
              <div className="flex flex-col items-end">
                <div className="flex items-baseline">
                  <span className="text-red-500 line-through text-sm mr-1">
                    Rs 2,000
                  </span>
                  <span className="text-gray-900 text-xl font-bold">
                    Rs 450/month
                  </span>
                </div>
                <span className="text-xs text-gray-600">(+18% gst)</span>
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
              <li>Valid for 30 days</li>
              <li>Just ~₹15/day</li>
              {commonPaidBenefits.map((benefit, index) => (
                <li key={index}>{benefit.text}</li>
              ))}
            </ul>
            <div className="flex flex-col items-center mt-auto">
              <span className="text-green-600 text-lg font-semibold mb-2">
                SAVED Rs. 1,550
              </span>
              <span className="text-sm text-gray-600 mb-4">
                (Discount ~75%)
              </span>
              <Button
                className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
                onClick={() => handlePayNowClick("Monthly Plan")}
              >
                Paid
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    } else if (currentPlanType === "yearly") {
      return (
        <Card
          key="yearly-card"
          className="w-11/12 max-w-md mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden border border-yellow-500 -mt-8 md:mt-0 relative"
        >
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm font-semibold mb-2">DOCTORS TOP CHOICE</div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex-1">1 Year Plan</h3>
              <div className="flex flex-col items-end">
                <div className="flex items-baseline">
                  <span className="text-red-500 line-through text-sm mr-1">
                    Rs 25,000
                  </span>
                  <span className="text-gray-900 text-xs">Rs 5,400/year</span>
                </div>
                <span className="text-xs text-gray-600">(+18% gst)</span>
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
              <li>Valid for 1 Year</li>
              <li>Just ~₹15/day</li>
              {commonPaidBenefits.map((benefit, index) => (
                <li key={index}>{benefit.text}</li>
              ))}
            </ul>
            <Button
              className="w-full bg-[#FFBB00] text-white py-2 rounded-md hover:bg-[#27b3a6] transition-colors"
              onClick={() => handlePayNowClick("1 Year Plan")}
            >
              Paid
            </Button>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  if (!isMounted) return null;

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row md:bg-gray-100">
      {/* Mobile Menu */}
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
          <Button
            className="mt-auto w-full bg-gray-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-gray-700 transition-colors duration-200 md:text-base md:py-3"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full bg-white p-4 flex items-center shadow-sm md:hidden fixed top-0 left-0 z-40">
        <button onClick={handleGoBack} className="text-gray-600 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">My Plan</h1>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col justify-start items-center pt-16 px-0 pb-8 md:py-8 md:px-8 relative md:flex-row md:justify-center md:items-stretch">
        {/* Left Section */}
        <div className="hidden md:flex md:flex-col md:w-1/2 md:min-h-screen bg-[#FFBB00] py-8 px-8 justify-center items-start text-gray-800 relative">
          <div className="absolute top-8 left-8">
            <button onClick={handleGoBack} className="text-gray-800">
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
          <h2 className="text-4xl font-bold mb-4">My Plan</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            <li className="text-lg">{activePlanDetails.title}</li>
            <li className="text-lg">{activePlanDetails.validity}</li>
            <li className="text-lg">{activePlanDetails.duration}</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center pt-0 pb-8 md:pb-0 md:justify-center md:pt-0">
          <div className="w-full bg-[#FFBB00] py-8 px-4 sm:px-6 md:hidden text-gray-800">
            <h2 className="text-lg font-bold mb-4">My Plan</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-sm">{activePlanDetails.title}</li>
              <li className="text-sm">{activePlanDetails.validity}</li>
              <li className="text-sm">{activePlanDetails.duration}</li>
            </ul>
          </div>

          {/* Card */}
          {renderCurrentPlanCard()}

          {/* Debug Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              onClick={() => setCurrentPlanType("free")}
              variant={currentPlanType === "free" ? "default" : "outline"}
            >
              Show Free Trial
            </Button>
            <Button
              onClick={() => setCurrentPlanType("monthly")}
              variant={currentPlanType === "monthly" ? "default" : "outline"}
            >
              Show Monthly Plan
            </Button>
            <Button
              onClick={() => setCurrentPlanType("yearly")}
              variant={currentPlanType === "yearly" ? "default" : "outline"}
            >
              Show Yearly Plan
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
