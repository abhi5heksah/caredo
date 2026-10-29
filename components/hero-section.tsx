"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {MapPin, Search} from "lucide-react"
import {useState} from "react"
import {useRouter} from "next/navigation"

const cities = ["Nagpur", "Mumbai", "Delhi", "Bangalore", "Pune"] // Example cities

export function HeroSection() {
    const [selectedCity, setSelectedCity] = useState("nagpur")
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (selectedCity) params.set("city", selectedCity)
        if (searchQuery) params.set("query", searchQuery)
        router.push(`/doctors?${params.toString()}`)
    }

    return (
        <section className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            India&#39;s Most Trusted Doctor Booking Platform
                        </h1>
                        <p className="text-lg lg:text-xl text-teal-100">
                            &#34;Our mission is to bring all doctors of India together on Cared.&#34;
                        </p>
                        {/* Search Integrated into Hero */}
                        <div className="mt-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-2xl">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-none sm:w-1/3">
                                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                                        <SelectTrigger className="h-14 text-gray-700 text-base border-gray-300">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                            <SelectValue placeholder="Select city" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem key={city} value={city.toLowerCase()} className="text-base">
                                                    {city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex-grow relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search doctor, clinic, hospitals"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-14 pl-10 text-gray-700 text-base border-gray-300"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    size="lg"
                                    className="h-14 bg-orange-500 hover:bg-orange-600 text-white text-base px-6 sm:px-4"
                                >
                                    <Search className="h-5 w-5 sm:mr-2" />
                                    <span className="hidden sm:inline">Search</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Image */}
                    <div className="hidden lg:block relative">
                        <img
                            src="/doctor.png"
                            alt="Professional Doctor"
                            className="w-full h-auto max-w-md mx-auto rounded-2xl drop-shadow-2xl object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/female-doctor-smiling.png";
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Adding the bottom promotional banner from the screenshot */}
            <div className="absolute bottom-0 left-0 right-0 hidden md:block transform translate-y-1/2">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src="/female-doctor-smiling.png"
                                alt="One India, One Caredo"
                                className="w-24 h-24 rounded-full object-cover border-4 border-teal-200 shadow-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "/placeholder-4qm88.png";
                                }}
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    "One <span className="text-teal-600">INDIA</span>,
                                </h3>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    All Doctors, One <span className="text-teal-600">Caredo</span>
                                </h3>
                                <p className="text-sm text-gray-500">&#34;Caredo-Skip the line&#34;</p>
                            </div>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                            <li>Now NO waiting in hospital lines.</li>
                            <li>FREE Booking</li>
                            <li>Choose your hospital timing.</li>
                            <li>Waiting time : 0 minutes</li>
                            <li>Find trusted doctors near you .</li>
                            <li>Live tracking of current patient number.</li>
                            <li>In and out of the hospital in few minutes.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}