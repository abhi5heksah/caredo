
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, Menu } from "lucide-react";
import React, { useState } from "react";

export default function Address() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const progressSteps = [
    { name: "About", active: true, completed: true },
    { name: "Address", active: true, completed: false },
    { name: "Images", active: false, completed: false },
  ];

  const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"];
  const cities = ["Mumbai", "Nagpur", "Pune", "Bengaluru", "Chennai", "Delhi"];

  const handleBack = () => window.history.back();
  const handleContinue = () => (window.location.href = "/protected/clinic/images");

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12 border-b border-gray-200">
        <button onClick={toggleMenu} aria-label="Open menu">
          <Menu className="w-6 h-6 md:w-7 md:h-7 text-black" />
        </button>
        <div className="text-2xl md:text-3xl lg:text-4xl font-normal">
          <span className="text-black">Care</span>
          <span className="text-[#2ec4b6]">do</span>
        </div>
        <div className="text-right">
          <p className="text-[#ffbb00] font-bold text-xs md:text-sm">150+</p>
          <p className="text-[#807d7d] text-[11px] md:text-sm">doctors joined</p>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 w-64 md:w-80 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full relative">
          <button onClick={closeMenu} className="absolute top-4 right-4 text-2xl">&times;</button>
          <div className="text-xl font-semibold mb-8">
            Care<span className="text-[#2ec4b6]">do</span>
          </div>
          <nav className="flex flex-col gap-4 text-lg">
            {["My Profile", "Plans & Pricing", "Terms & Condition", "Contact Us", "Give Feedback"].map(item => (
              <a key={item} href="#" onClick={closeMenu} className="hover:text-[#2ec4b6]">{item}</a>
            ))}
          </nav>
          <Button className="mt-auto w-full bg-gray-800 text-white rounded-full py-2">Login</Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.name}>
                <div className={`w-5 h-5 rounded-full ${step.completed ? 'bg-[#ffbb00]' : 'bg-[#d9d9d9]'}`} />
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-2 bg-${progressSteps[index].completed ? '[#ffbb00]' : '[#d9d9d9]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-sm mt-2">
            {progressSteps.map((step) => (
              <span
                key={step.name}
                className={`text-[#6e6e6e] ${step.active ? 'font-semibold' : ''}`}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {/* Address Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Select>
              <SelectTrigger className="w-full h-12 border border-gray-400 text-gray-700">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-12 border border-gray-400 text-gray-700">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              className="w-full h-12 border border-gray-400 text-gray-700 px-4"
              placeholder="Area to show patient e.g., itwari, mahal"
            />
          </div>

          <div className="space-y-6">
            <Separator className="bg-gray-300" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">Turn ON location</span>
              <Switch defaultChecked />
            </div>
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-red-500" />
              <Input
                className="pl-10 w-full h-12 border border-gray-400 text-gray-700"
                placeholder="Search your hospital location"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Button
            className="bg-[#008ce3] text-white rounded-full px-8 py-2 text-base font-bold hover:bg-[#007ad9]"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className="bg-[#ffbb00] text-white rounded-full px-8 py-2 text-base font-bold hover:bg-[#e6a800] flex-1"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
