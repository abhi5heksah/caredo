import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"

interface Doctor {
    area_id: number
    bio: string | null
    clinic_address: string | null
    created_at: string
    full_name: string
    phone: string | null
    photo_url: string | null
    search_vector: unknown | null
    specialty_id: number
    subscription_active: boolean
    subscription_end: string | null
    subscription_start: string | null
    user_id: string
}

interface DoctorCardProps {
    doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <Link href={`/doctors/${doctor.user_id}/book`} className="block group">
            <Card className="w-full overflow-hidden rounded-lg border border-gray-200 group-hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-0">
                    <div className="relative">
                        <img
                            src={doctor.photo_url || "/placeholder.svg?height=160&width=240&query=doctor+avatar"}
                            alt={doctor.full_name}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" // Slightly shorter image, added hover effect
                        />
                    </div>
                    <div className="p-3 space-y-1.5">
                        {" "}
                        {/* Compact padding and spacing */}
                        <h3 className="text-md font-semibold text-gray-800 truncate group-hover:text-brand-teal-600">
                            {doctor.full_name}
                        </h3>
                        <p className="text-[11px] text-gray-500 truncate">
                            {doctor.specialty_id} &bull; {doctor.bio}
                        </p>
                        <p className="text-[11px] text-gray-500">{doctor.phone}</p>
                        <hr className="my-1.5 border-gray-100" /> {/* Thinner margin for HR */}
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center text-gray-600">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-red-500 flex-shrink-0" />
                                <span className="truncate">{doctor.clinic_address}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
