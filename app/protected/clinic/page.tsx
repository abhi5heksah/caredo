"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Menu } from "lucide-react";
import React, { useState } from "react";

export default function Clinic(): React.JSX.Element {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // password toggle

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleClick = () => {
    router.push('/protected/clinic/address');
  };

  const progressSteps = [
    { id: 1, name: "About", active: true },
    { id: 2, name: "Address", active: false },
    { id: 3, name: "Images", active: false },
  ];

  type FormField = {
    name: string;
    type: string;
    options?: string[];
    optional?: boolean;
    highlight?: boolean;
    maxLength?: number;
    pattern?: string;
    inputMode?: string;
  };

  const formSections: {
    title: string;
    fields: FormField[];
  }[] = [
    {
      title: "Personal Details of doctor",
      fields: [
        { name: "Name of doctor", type: "text" },
        {
          name: "Personal Mobile Number",
          type: "text",
          maxLength: 10,
          pattern: "[0-9]{10}",
          inputMode: "numeric"
        },
        {
          name: "Gender",
          type: "select",
          options: ["Male", "Female", "Other"],
        },
        {
          name: "Speciality",
          type: "select",
          options: ["Cardiology", "Dermatology", "Pediatrics", "Orthopedics"],
        },
        { name: "Education Qualification", type: "text" },
        { name: "Enter Doctor Registration Number", type: "text" },
        { name: "Year of experience", type: "number" },
      ],
    },
    {
      title: "Clinic Details",
      fields: [
        { name: "Name of Hospital/clinic", type: "text" },
        { name: "Hospital Phone Number for patient", type: "text" },
        { name: "Fees in Rs", type: "number" },
        { name: "Major Services for patient", type: "text", optional: true },
        {
          name: "Average time for one patient (in minute)",
          type: "text",
        },
      ],
    },
    {
      title: "Login details",
      fields: [
        { name: "Doctor Mobile Number", type: "text" },
        { name: "Password", type: "password" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <header className="flex items-center justify-between w-full p-4 md:px-8 lg:px-12 border-b border-gray-200">
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="text-black text-2xl md:text-3xl"
        >
          <Menu className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        <div className="font-normal text-2xl tracking-[0.30px] md:text-4xl lg:text-3xl">
          <span className="text-black">Care</span>
          <span className="text-[#2ec4b6]">do</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-bold text-[#ffbb00] text-[13px] md:text-base">
            150+
          </span>
          <span className="font-normal text-[#807d7d] text-[11px] md:text-sm">
            doctors joined
          </span>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:w-80`}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation menu"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-1 text-lg font-semibold mb-8 md:text-xl">
            <span>Care</span>
            <span className="text-[#2ec4b6]">do</span>
          </div>

          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-700 text-2xl md:text-3xl"
            aria-label="Close menu"
          >
            &times;
          </button>

          <nav className="space-y-4 flex-grow text-lg md:text-xl">
            <a href="#" onClick={closeMenu} className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-2">My Profile</a>
            <a href="#" onClick={closeMenu} className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-2">Plans & Pricing</a>
            <a href="#" onClick={closeMenu} className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-2">Terms & Condition</a>
            <a href="#" onClick={closeMenu} className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-2">Contact Us</a>
            <a href="#" onClick={closeMenu} className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-2">Give Feedback</a>
          </nav>

          <Button className="mt-auto w-full bg-gray-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-gray-700 transition-colors duration-200">
            Login
          </Button>
        </div>
      </div>

      <main className="w-full max-w-full md:max-w-3xl lg:max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="pt-4 pb-6 md:pt-8 lg:pt-12">
          <div className="flex items-center space-x-3">
            <span className="text-[#2ec4b6] text-sm md:text-base lg:text-lg font-medium">CLINIC</span>
          </div>
          <Separator className="w-16 h-1 mt-2 bg-[#ffbb00] md:w-20 lg:w-24 lg:h-2" />
        </div>

        <div className="flex flex-col items-center my-8 md:my-10 lg:my-12">
          <div className="relative flex items-center w-full sm:max-w-md md:max-w-lg lg:max-w-xl justify-between">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`w-4 h-4 rounded-full ${index === 0 ? "bg-[#ffbb00]" : "bg-[#d9d9d9]"} md:w-5 md:h-5 lg:w-6 lg:h-6`}
                />
                {index < progressSteps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${index === 0 ? "bg-[#ffbb00]" : "bg-[#d9d9d9]"} mx-1 md:mx-2`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between w-full sm:max-w-md md:max-w-lg lg:max-w-xl mt-4">
            {progressSteps.map((step) => (
              <span key={step.id} className="text-[#6e6e6e] text-sm md:text-base lg:text-lg">
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            {formSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8 md:mb-10 lg:mb-12">
                <h3 className="text-[#646464] text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 font-medium">
                  {section.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className={`relative ${field.highlight ? "bg-yellow-50 rounded-md p-2 -m-2" : ""}`}>
                      {field.type === "select" ? (
                        <Select>
                          <SelectTrigger className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base">
                            <SelectValue placeholder={field.name} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option, idx) => (
                              <SelectItem key={idx} value={option.toLowerCase().replace(/\s/g, "-")}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "password" ? (
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={field.name}
                            className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.name}
                          className="w-full h-10 md:h-12 border border-[#8f8f8f] text-[#646464] text-sm md:text-base pl-3"
                        />
                      )}

                      {field.optional && (
                        <span className="absolute top-2 right-3 italic text-[#646464] text-xs md:text-sm">
                          *optional
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {sectionIndex < formSections.length - 1 && (
                  <Separator className="my-6 md:my-8 bg-gray-200" />
                )}
              </div>
            ))}

            <div className="flex justify-center mt-8 pb-10 md:mt-10 lg:mt-12">
              <Button
                className="w-32 h-10 md:w-40 md:h-12 bg-[#ffbb00] rounded-full text-white text-base font-extrabold hover:bg-[#e6a800]"
                onClick={handleClick}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
