"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    Youtube,
    Instagram,
    Facebook,
    Send
} from "lucide-react"

export default function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [subject, setSubject] = useState("Patient Support")
    const [message, setMessage] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Contact &amp; Support
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        We&#39;re Here to Help You
                    </h1>
                    <p className="text-base text-gray-600">
                        Have a question about an appointment, doctor registration, or feedback? Get in touch and our team will assist you promptly.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 hover:border-teal-500 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Phone Support</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Mon - Sat, 9am - 8pm</p>
                            <a href="tel:8958739348" className="text-sm font-semibold text-teal-600 hover:underline block mt-1">
                                +91 89587 39348
                            </a>
                        </div>
                    </Card>

                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 hover:border-teal-500 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Email Us</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Quick responses in 24 hours</p>
                            <a href="mailto:helpcaredo@gmail.com" className="text-sm font-semibold text-teal-600 hover:underline block mt-1 truncate">
                                helpcaredo@gmail.com
                            </a>
                        </div>
                    </Card>

                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 hover:border-teal-500 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Headquarters</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Serving patients across India</p>
                            <span className="text-xs font-semibold text-gray-700 block mt-1">
                                Nagpur, Maharashtra, India
                            </span>
                        </div>
                    </Card>

                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 hover:border-teal-500 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Social Channels</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Follow our updates</p>
                            <div className="flex items-center gap-2.5 mt-1 text-gray-600">
                                <a href="https://youtube.com/@caredoindia" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                                    <Youtube className="w-4 h-4" />
                                </a>
                                <a href="https://instagram.com/caredoindia" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com/Caredo.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                    <Facebook className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form & FAQ Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <Card className="rounded-3xl border border-gray-200 shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-6 sm:p-8 border-b border-gray-100">
                                <CardTitle className="text-xl font-bold text-gray-900">Send Us a Message</CardTitle>
                                <p className="text-xs text-gray-500 mt-1">Fill out the form below and our team will get back to you.</p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8">
                                {isSubmitted ? (
                                    <div className="text-center py-12 space-y-3">
                                        <CheckCircle2 className="w-14 h-14 text-teal-600 mx-auto" />
                                        <h3 className="text-xl font-bold text-gray-900">Thank You, {name || "Friend"}!</h3>
                                        <p className="text-sm text-gray-600 max-w-sm mx-auto">
                                            Your message has been received. Our support team will review your inquiry and reach out shortly.
                                        </p>
                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            variant="outline"
                                            className="mt-4"
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="c-name" className="text-xs font-semibold text-gray-700">Full Name *</Label>
                                                <Input
                                                    id="c-name"
                                                    required
                                                    placeholder="e.g. Anand Deshmukh"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="c-phone" className="text-xs font-semibold text-gray-700">Phone Number *</Label>
                                                <Input
                                                    id="c-phone"
                                                    required
                                                    type="tel"
                                                    placeholder="e.g. 9876543210"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="c-email" className="text-xs font-semibold text-gray-700">Email Address</Label>
                                                <Input
                                                    id="c-email"
                                                    type="email"
                                                    placeholder="e.g. anand@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="c-subject" className="text-xs font-semibold text-gray-700">Subject</Label>
                                                <select
                                                    id="c-subject"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                >
                                                    <option value="Patient Support">Patient Appointment Support</option>
                                                    <option value="Doctor Registration">Doctor / Clinic Registration</option>
                                                    <option value="Feature Request">Feedback &amp; Feature Request</option>
                                                    <option value="General Inquiry">General Inquiry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="c-message" className="text-xs font-semibold text-gray-700">Message *</Label>
                                            <textarea
                                                id="c-message"
                                                required
                                                rows={4}
                                                placeholder="How can we assist you today?"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md"
                                        >
                                            <Send className="w-4 h-4 mr-2" /> Submit Inquiry
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick FAQs */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>

                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1.5">
                                <h4 className="text-sm font-semibold text-gray-900">Is booking through Caredo free?</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Yes! Patients do not pay any fee to book on Caredo. You only pay the consultation fee directly to your doctor at the clinic.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1.5">
                                <h4 className="text-sm font-semibold text-gray-900">What if I am late for my appointment?</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    If you are late, please contact the clinic receptionist. Priority is given to active slot holders, but receptionists can re-slot you in the next open window.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1.5">
                                <h4 className="text-sm font-semibold text-gray-900">How do doctors join Caredo?</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Doctors can register through our Doctor Registration portal or call our clinic partner desk at +91 89587 39348.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
