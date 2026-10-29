import {Badge} from "@/components/ui/badge"
import {CheckCircle, MapPin, Phone, Star} from "lucide-react"
import {Tables} from "@/types/database";
import { DoctorImage } from "@/components/doctor-image"
import { getSpecialtyName } from "@/lib/specialties"


interface DoctorProfileHeroProps {
  doctor: Tables<'doctor_profiles'>
}

export function DoctorProfileHero({ doctor }: DoctorProfileHeroProps) {
  const specialty = getSpecialtyName(doctor.specialty_id, "Medical Specialist");

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <DoctorImage
          src={doctor.photo_url}
          alt={doctor.full_name}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover object-top border-4 border-teal-50 mx-auto sm:mx-0 shadow-sm"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{doctor.full_name}</h1>
            <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0" />
          </div>
          <p className="text-teal-700 font-semibold text-lg">{specialty}</p>
          <p className="text-sm text-gray-500 mt-0.5">
            MBBS, M.D. &bull; 10+ Years Experience
          </p>
          {doctor.bio && (
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">{doctor.bio}</p>
          )}

          <div className="mt-4 flex flex-wrap justify-center sm:justify-start items-center gap-x-5 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5 font-medium text-gray-800">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.9 (128 Patient Stories)
            </span>
            {doctor.clinic_address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-teal-600" /> {doctor.clinic_address}
              </span>
            )}
            {doctor.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-teal-600" /> {doctor.phone}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
            <Badge variant="outline" className="bg-teal-50 text-teal-800 border-teal-200 text-sm px-3 py-1 font-semibold">
              ₹ 0 Consultation Fee (Pay at Clinic)
            </Badge>
            <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
              Available Today
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
