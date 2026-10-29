import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    HeartHandshake,
    ShieldCheck,
    Clock,
    Users,
    Sparkles,
    CheckCircle2,
    ArrowRight
} from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        About Caredo
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Bringing All Doctors of India Together on <span className="text-teal-600">Caredo</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We are on a mission to simplify healthcare access, eliminate exhausting clinic waiting times, and build trust between patients and medical professionals across India.
                    </p>
                    <div className="pt-2 flex justify-center gap-4">
                        <Link href="/doctors">
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl shadow-md font-semibold">
                                Find a Doctor
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-gray-300 px-6 py-2.5 rounded-xl font-semibold">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Our Story & Mission */}
                <div className="grid md:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm">
                    <div className="space-y-4">
                        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Our Purpose</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Healthcare Should Be Seamless, Respectful, and Transparent
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Every day, millions of patients wait for hours outside clinics with uncertainty. At the same time, doctors and clinic receptionists face manual appointment scheduling chaos.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Caredo solves this by bridging the gap with real-time slot booking, live token notifications, and verified doctor discovery. We put patients in control of their time and give doctors modern tools to manage appointments effortlessly.
                        </p>
                        <div className="pt-2 flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-semibold text-gray-800">100% Verified Medical Practitioners</span>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="/female-doctor-smiling.png"
                            alt="Caredo medical professionals"
                            className="rounded-2xl shadow-lg object-cover w-full h-80 sm:h-96"
                        />
                    </div>
                </div>

                {/* Key Pillars */}
                <div className="space-y-8">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Patients Choose Caredo</h2>
                        <p className="text-sm text-gray-500">Built for Indian families and patients who value prompt care and reliable doctors.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="rounded-2xl border border-gray-200 bg-white hover:border-teal-500 transition-all p-6 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Zero Wait Time</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Choose exact morning or evening time slots that match your schedule. Get updates on clinic delays before you leave your home.
                            </p>
                        </Card>

                        <Card className="rounded-2xl border border-gray-200 bg-white hover:border-teal-500 transition-all p-6 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Verified Credentials</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We verify registration numbers, qualifications, and clinic addresses of all healthcare specialists before they go live on Caredo.
                            </p>
                        </Card>

                        <Card className="rounded-2xl border border-gray-200 bg-white hover:border-teal-500 transition-all p-6 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Transparent & Free</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                No hidden booking fees or upfront charges. Pay directly at the doctor&#39;s clinic with complete transparency.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-8 sm:p-12 rounded-3xl shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold">150+</div>
                            <div className="text-xs sm:text-sm text-teal-100">Verified Doctors</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold">12,000+</div>
                            <div className="text-xs sm:text-sm text-teal-100">Appointments Booked</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold">15+</div>
                            <div className="text-xs sm:text-sm text-teal-100">Specialties Covered</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold">4.9 / 5</div>
                            <div className="text-xs sm:text-sm text-teal-100">Average Patient Rating</div>
                        </div>
                    </div>
                </div>

                {/* CTA for Doctors */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900">Are You a Doctor or Clinic Owner?</h3>
                        <p className="text-sm text-gray-600 max-w-xl">
                            Join Caredo to modernize your clinic, manage patient queues, and grow your practice with our receptionist dashboard and doctor portal.
                        </p>
                    </div>
                    <Link href="/auth/sign-up">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl whitespace-nowrap shadow-md">
                            Register as a Doctor <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
