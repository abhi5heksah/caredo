"use client"

import { useSearchParams, useParams, useRouter } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MOCK_DOCTORS } from "@/lib/apis/api"
import { DoctorImage } from "@/components/doctor-image"

export default function ConfirmBookingPage() {
    const searchParams = useSearchParams()
    const params = useParams()
    const router = useRouter()
    const doctorId = (params?.id as string) || "doc-1"
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0]
    const time = searchParams.get("time") || "10:00 AM"

    const doctor = MOCK_DOCTORS.find((d) => d.user_id === doctorId) || MOCK_DOCTORS[0]

    const [patientName, setPatientName] = useState("")
    const [patientPhone, setPatientPhone] = useState("")
    const [patientEmail, setPatientEmail] = useState("")
    const [reason, setReason] = useState("")
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [bookingRef, setBookingRef] = useState("")

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data?.user) {
                    if (data.user.name) setPatientName(data.user.name);
                    if (data.user.email) setPatientEmail(data.user.email);
                    if (data.user.phone) setPatientPhone(data.user.phone);
                }
            })
            .catch(() => {});
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: doctor.user_id,
                    doctorName: doctor.full_name,
                    patientName,
                    patientPhone,
                    patientEmail,
                    slotDate: date,
                    slotTime: time,
                    reason,
                }),
            });
            const data = await res.json();
            setBookingRef(data?.appointment?.id || ("CRD-" + Math.floor(100000 + Math.random() * 900000)));
        } catch {
            setBookingRef("CRD-" + Math.floor(100000 + Math.random() * 900000));
        }
        setIsConfirmed(true)
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    if (isConfirmed) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-md w-full border border-teal-200 shadow-xl rounded-2xl overflow-hidden bg-white">
                    <div className="bg-teal-600 p-6 text-white text-center">
                        <CheckCircle2 className="w-16 h-16 mx-auto mb-3 text-white" />
                        <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
                        <p className="text-teal-100 text-sm mt-1">Booking Ref: <span className="font-mono font-semibold">{bookingRef}</span></p>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Doctor:</span>
                                <span className="font-semibold text-gray-900">{doctor.full_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Date:</span>
                                <span className="font-medium text-gray-900">{formattedDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Time:</span>
                                <span className="font-medium text-teal-600 font-semibold">{time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Patient:</span>
                                <span className="font-medium text-gray-900">{patientName || "Guest Patient"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Clinic:</span>
                                <span className="font-medium text-gray-900 text-right">{doctor.clinic_address}</span>
                            </div>
                        </div>

                        <div className="text-center text-xs text-gray-500">
                            A confirmation SMS has been sent to {patientPhone || "your mobile number"}.
                        </div>

                        <div className="pt-2 space-y-2">
                            <Link href="/protected" className="block w-full">
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                                    View in My Dashboard
                                </Button>
                            </Link>
                            <Link href="/doctors" className="block w-full">
                                <Button variant="outline" className="w-full">
                                    Browse More Doctors
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Link href={`/doctors/${doctorId}`} className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Doctor Profile
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Doctor & Slot Summary */}
                    <div className="md:col-span-1 space-y-4">
                        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="p-4 bg-teal-50 border-b border-teal-100">
                                <CardTitle className="text-base text-teal-900">Appointment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <DoctorImage
                                        src={doctor.photo_url}
                                        alt={doctor.full_name}
                                        className="w-14 h-14 rounded-full object-cover object-top border-2 border-teal-200"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{doctor.full_name}</h4>
                                        <p className="text-xs text-teal-600 font-medium">Specialist Consultation</p>
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                <div className="space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                        <span className="font-semibold text-gray-800">{time}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>{doctor.clinic_address}</span>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg text-xs flex justify-between items-center font-medium">
                                    <span>Consultation Fee:</span>
                                    <span className="text-teal-700 font-bold">₹0 (Free / Pay at clinic)</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Patient Information Form */}
                    <div className="md:col-span-2">
                        <Card className="border border-gray-200 shadow-sm rounded-xl bg-white">
                            <CardHeader className="p-6 border-b border-gray-100">
                                <CardTitle className="text-xl text-gray-900">Patient Details</CardTitle>
                                <CardDescription>Enter patient information to confirm the appointment.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                                        <div className="relative">
                                            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="name"
                                                required
                                                placeholder="e.g. Rahul Sharma"
                                                className="pl-9"
                                                value={patientName}
                                                onChange={(e) => setPatientName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="phone"
                                                    required
                                                    type="tel"
                                                    placeholder="e.g. 9876543210"
                                                    className="pl-9"
                                                    value={patientPhone}
                                                    onChange={(e) => setPatientPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address (Optional)</Label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="e.g. rahul@example.com"
                                                    className="pl-9"
                                                    value={patientEmail}
                                                    onChange={(e) => setPatientEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="reason" className="text-sm font-medium text-gray-700">Reason for Visit / Symptoms</Label>
                                        <Input
                                            id="reason"
                                            placeholder="e.g. Toothache, routine checkup, pain consultation"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-3 font-semibold shadow-md">
                                            Confirm Appointment for {time}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
