import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"
import { DoctorImage } from "@/components/doctor-image"
import { getSpecialtyName } from "@/lib/specialties"

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
    const specialty = getSpecialtyName(doctor.specialty_id);

    return (
        <Link href={`/doctors/${doctor.user_id}`} className="block group h-full">
            <Card className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-teal-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <CardContent className="p-0 flex flex-col flex-grow">
                    <div className="relative overflow-hidden bg-gray-100 h-44">
                        <DoctorImage
                            src={doctor.photo_url}
                            alt={doctor.full_name}
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        {doctor.subscription_active && (
                            <span className="absolute top-2 right-2 bg-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                        )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                {doctor.full_name}
                            </h3>
                            <p className="text-xs font-semibold text-teal-600 mt-0.5">
                                {specialty}
                            </p>
                            {doctor.bio && (
                                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                                    {doctor.bio}
                                </p>
                            )}
                        </div>
                        <div className="pt-2 border-t border-gray-100 mt-auto">
                            {doctor.clinic_address && (
                                <div className="flex items-center text-xs text-gray-600 mb-1">
                                    <MapPin className="h-3.5 w-3.5 mr-1 text-teal-600 flex-shrink-0" />
                                    <span className="truncate">{doctor.clinic_address}</span>
                                </div>
                            )}
                            <div className="mt-2 text-center py-1.5 px-3 bg-teal-50 text-teal-700 rounded-lg text-xs font-semibold group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                View Profile &amp; Book Slot
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
