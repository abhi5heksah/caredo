import Link from "next/link"
import {Facebook, Globe, Globe2, Instagram, Mail, Phone, Youtube} from "lucide-react" // Added Globe2 for the bottom "India" icon

const footerLinks = [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms & condition" },
    { href: "/feedback", label: "Give Feedback" },
]

const contactItems = [
    { icon: Youtube, text: "@caredoindia", href: "https://youtube.com/@caredoindia" },
    { icon: Instagram, text: "caredoindia", href: "https://instagram.com/caredoindia" },
    { icon: Facebook, text: "Caredo.in", href: "https://facebook.com/Caredo.in" },
    { icon: Mail, text: "helpcaredo@gmail.com", href: "mailto:helpcaredo@gmail.com" },
    { icon: Phone, text: "8958739348", href: "tel:8958739348" },
    { icon: Globe, text: "caredo.in", href: "https://caredo.in" },
]

export function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Logo and Links */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="text-3xl font-bold text-gray-900">
                            Caredo
                        </Link>
                        <nav className="flex flex-col space-y-2">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-600 hover:text-brand-teal-600 hover:underline text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Middle Column: Empty for spacing, or can be used later */}
                    <div className="hidden md:block md:col-span-1"></div>

                    {/* Right Column: Contact Info */}
                    <div className="md:col-span-1 space-y-3">
                        {contactItems.map((item) => (
                            <a
                                key={item.text}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2.5 text-gray-600 hover:text-brand-teal-600 group text-sm"
                            >
                                <item.icon className="h-4 w-4 text-gray-500 group-hover:text-brand-teal-500 flex-shrink-0" />
                                <span>{item.text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex justify-end items-center text-xs text-gray-500">
                    <Globe2 className="h-3.5 w-3.5 mr-1" />
                    <span>India</span>
                </div>
            </div>
        </footer>
    )
}