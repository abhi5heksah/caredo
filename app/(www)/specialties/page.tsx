"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Search,
    Stethoscope,
    HeartPulse,
    Baby,
    Sparkles,
    Bone,
    Brain,
    Activity,
    Eye,
    Ear,
    Smile,
    ArrowRight
} from "lucide-react"

const specialtiesList = [
    {
        id: 1,
        slug: "dentist",
        name: "Dentist",
        icon: Smile,
        doctorCount: "18+ Doctors",
        description: "Specialists in oral health, teeth cleaning, root canal treatments, and cosmetic smiles.",
        conditions: ["Toothache", "Cavities", "Root Canal", "Braces", "Teeth Whitening"]
    },
    {
        id: 2,
        slug: "cardiologist",
        name: "Cardiologist",
        icon: HeartPulse,
        doctorCount: "12+ Doctors",
        description: "Experts in heart diseases, hypertension, heart rhythm disorders, and preventive cardiac care.",
        conditions: ["High Blood Pressure", "Chest Pain", "Palpitations", "Cholesterol", "ECG Checkup"]
    },
    {
        id: 3,
        slug: "pediatrician",
        name: "Pediatrician",
        icon: Baby,
        doctorCount: "15+ Doctors",
        description: "Dedicated medical care for infants, children, and adolescents, including vaccination.",
        conditions: ["Childhood Fever", "Vaccination", "Growth & Nutrition", "Cough & Cold", "Allergies"]
    },
    {
        id: 4,
        slug: "dermatologist",
        name: "Dermatologist",
        icon: Sparkles,
        doctorCount: "14+ Doctors",
        description: "Physicians specializing in skin, hair, and nail conditions, cosmetic and laser treatments.",
        conditions: ["Acne & Pimples", "Hair Fall", "Eczema", "Skin Pigmentation", "Fungal Infections"]
    },
    {
        id: 5,
        slug: "orthopedic",
        name: "Orthopedic Surgeon",
        icon: Bone,
        doctorCount: "10+ Doctors",
        description: "Specialists in bone, joint, ligament, and spine disorders, fractures, and sports injuries.",
        conditions: ["Knee Pain", "Joint Pain", "Fractures", "Back Ache", "Arthritis"]
    },
    {
        id: 6,
        slug: "gynecologist",
        name: "Gynecologist",
        icon: Activity,
        doctorCount: "16+ Doctors",
        description: "Complete women's healthcare, pregnancy monitoring, infertility care, and wellness.",
        conditions: ["Pregnancy Care", "PCOS / PCOD", "Menstrual Health", "Infertility", "Menopause"]
    },
    {
        id: 7,
        slug: "neurologist",
        name: "Neurologist",
        icon: Brain,
        doctorCount: "8+ Doctors",
        description: "Experts diagnosing and treating nervous system, brain, and spinal disorders.",
        conditions: ["Migraine & Headache", "Stroke Recovery", "Seizures & Epilepsy", "Nerve Pain", "Vertigo"]
    },
    {
        id: 8,
        slug: "general-physician",
        name: "General Physician",
        icon: Stethoscope,
        doctorCount: "25+ Doctors",
        description: "Primary care physicians treating general illnesses, diabetes, infections, and chronic care.",
        conditions: ["Viral Fever", "Diabetes Management", "Thyroid", "Weakness", "Routine Checkup"]
    },
    {
        id: 9,
        slug: "ent",
        name: "ENT Specialist",
        icon: Ear,
        doctorCount: "9+ Doctors",
        description: "Ear, nose, throat, and head & neck specialists for sinus, hearing, and tonsil issues.",
        conditions: ["Sinusitis", "Ear Infection", "Hearing Loss", "Tonsillitis", "Snoring"]
    },
    {
        id: 10,
        slug: "ophthalmologist",
        name: "Ophthalmologist",
        icon: Eye,
        doctorCount: "7+ Doctors",
        description: "Eye specialists providing vision care, cataract surgery, and retinal diagnosis.",
        conditions: ["Eye Strain", "Cataract", "Glaucoma", "Dry Eyes", "Vision Correction"]
    }
]

export default function SpecialtiesPage() {
    const [search, setSearch] = useState("")

    const filtered = specialtiesList.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Explore Medical Care
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Find Doctors by <span className="text-teal-600">Specialty</span>
                    </h1>
                    <p className="text-base text-gray-600">
                        Consult with India&#39;s verified healthcare experts. Choose from our wide network of certified doctors, dentists, and surgeons.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto pt-2">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search specialty or symptom (e.g. Toothache, Skin, Heart)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-11 h-12 rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                        />
                    </div>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {filtered.map((specialty) => {
                        const Icon = specialty.icon
                        return (
                            <Card
                                key={specialty.id}
                                className="group hover:border-teal-500 hover:shadow-lg transition-all duration-300 rounded-2xl bg-white border border-gray-200 overflow-hidden flex flex-col justify-between"
                            >
                                <CardContent className="p-6 space-y-4 flex flex-col flex-grow justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                {specialty.doctorCount}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                {specialty.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {specialty.description}
                                            </p>
                                        </div>

                                        {/* Symptom pills */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {specialty.conditions.slice(0, 3).map((cond) => (
                                                <span
                                                    key={cond}
                                                    className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200"
                                                >
                                                    {cond}
                                                </span>
                                            ))}
                                            {specialty.conditions.length > 3 && (
                                                <span className="text-[11px] text-gray-400 self-center">
                                                    +{specialty.conditions.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Link */}
                                    <div className="pt-3 border-t border-gray-100">
                                        <Link
                                            href={`/doctors?query=${encodeURIComponent(specialty.name)}`}
                                            className="inline-flex items-center justify-between w-full text-xs font-semibold text-teal-600 group-hover:text-teal-700"
                                        >
                                            <span>Find {specialty.name}s</span>
                                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 space-y-3 max-w-lg mx-auto">
                        <p className="text-base font-semibold text-gray-800">No matching specialties found</p>
                        <p className="text-xs text-gray-500">
                            Try searching for general terms like &quot;Dentist&quot;, &quot;Heart&quot;, or &quot;Skin&quot;.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSearch("")}
                            className="mt-2 text-xs"
                        >
                            Reset Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
