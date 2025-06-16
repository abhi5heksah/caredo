"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Menu, X} from "lucide-react"
import {useState} from "react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-2xl font-bold">Care<span className="text-teal-600">do</span>
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/doctors" className="text-gray-700 hover:text-teal-600 font-medium">
                            Find Doctors
                        </Link>
                        <Link href="/specialties" className="text-gray-700 hover:text-teal-600 font-medium">
                            Specialties
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-teal-600 font-medium">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-teal-600 font-medium">
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              <span className="text-amber-500 font-semibold">150+</span> doctors joined
            </span>
                        <Link href="/auth/login">
                            <Button variant="outline" className="border-gray-300">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/doctor/register">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Doctor</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/doctors" className="text-gray-700 hover:text-teal-600 font-medium">
                                Find Doctors
                            </Link>
                            <Link href="/specialties" className="text-gray-700 hover:text-teal-600 font-medium">
                                Specialties
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-teal-600 font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-teal-600 font-medium">
                                Contact
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4">
                                <Link href="/auth/login">
                                    <Button variant="outline" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/doctor/register">
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Doctor Registration</Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}