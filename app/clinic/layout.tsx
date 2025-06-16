"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 md:px-8 lg:px-12 border-b border-gray-200">
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="text-black text-2xl md:text-3xl"
        >
          <Menu className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        <div className="font-normal text-3xl tracking-[0.30px] leading-[27.0px] md:text-4xl md:leading-[36px] lg:text-4xl lg:leading-[45px]">
          <span className="text-black tracking-[0.09px]">Care</span>
          <span className="text-[#2ec4b6] tracking-[0.09px]">do</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-bold text-[#ffbb00] text-[13px] tracking-[0.13px] leading-[11.7px] md:text-base md:leading-[14px]">
            150+
          </span>
          <span className="font-normal text-[#807d7d] text-[11px] tracking-[0.11px] leading-[9.9px] md:text-sm md:leading-[12px]">
            doctors joined
          </span>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:w-80`}
      >
        <div className="p-6  flex flex-col h-full relative">
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

          <nav className="space-y-2 md:space-y-1 flex-grow text-xs md:text-lg">
            {[
              "My Profile",
              "Plans & Pricing",
              "Terms & Condition",
              "Contact Us",
              "Give Feedback",
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="block text-gray-800 hover:text-[#2ec4b6] font-medium py-1 md:py-2 leading-tight md:leading-normal transition-colors duration-200"
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-grow overflow-x-hidden">
        {children}
        <Toaster position="top-center" />
      </main>
    </div>
  );
}
