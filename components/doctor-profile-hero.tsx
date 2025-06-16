import {Badge} from "@/components/ui/badge"
import {CheckCircle, MapPin, Phone, Star} from "lucide-react"
import {Tables} from "@/types/database";


interface DoctorProfileHeroProps {
  doctor: Tables<'doctor_profiles'>
}

export function DoctorProfileHero({ doctor }: DoctorProfileHeroProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={doctor.photo_url || "/placeholder.svg?height=160&width=160&query=doctor+profile"}
          alt={doctor.full_name}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-teal-100 mx-auto sm:mx-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{doctor.full_name}</h1>
             <CheckCircle className="h-7 w-7 text-blue-500" />
          </div>
          {/* TODO: Speciality fetching */}
          <p className="text-gray-700 text-lg">{doctor.specialty_id}</p>
          <p className="text-sm text-gray-500">
            {/*TODO: Replace with actual qualitfication & experience*/}
            {doctor.specialty_id} &bull; {doctor.specialty_id}
          </p>
          {/* TODO: Clinic Name */}
          <p className="text-sm text-gray-500">{doctor.full_name}</p>

          <div className="mt-4 flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" /> {JSON.stringify("{doctor.rating}")}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" /> {doctor.clinic_address}
            </span>
            {doctor.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-gray-500" /> {doctor.phone}
              </span>
            )}
          </div>
          <div className="mt-3">
            <Badge variant="outline" className="text-base px-3 py-1">
              {/*₹{doctor.fees} Consultation Fee*/}
            {/*  TODO: Doctor Fees */}
              ₹ 0 Consultation Fee
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
