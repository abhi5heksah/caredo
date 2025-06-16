'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  'My Profile',
  'Plans & Pricing',
  'Terms & Condition',
  'Contact Us',
  'Give Feedback',
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full relative bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-black focus:outline-none"
        >
          <Menu className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Logo */}
        <div className="text-2xl md:text-3xl font-semibold">
          <span className="text-black">Care</span>
          <span className="text-[#2ec4b6]">do</span>
        </div>

        {/* Placeholder for spacing or future buttons */}
        <div className="w-6 h-6" />
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 flex flex-col h-full relative">
          <div className="flex items-center space-x-1 text-xl font-bold mb-8">
            <span>Care</span>
            <span className="text-[#2ec4b6]">do</span>
          </div>
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-700 text-2xl"
          >
            &times;
          </button>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#2ec4b6] font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <Button
            className="mt-auto w-full bg-gray-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-gray-700 transition-colors duration-200"
            onClick={closeMenu}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
