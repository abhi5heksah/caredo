import {getDoctorProfileByUserId} from "@/lib/apis/api";
import {DoctorProfileHero} from "@/components/doctor-profile-hero";
import {DoctorBookingSection} from "@/components/doctor-booking-section";
import {DoctorInfoTabs} from "@/components/doctor-info-tabs";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

function generateAvailability() {
    const availability: Record<string, { morning: string[]; evening: string[] }> = {};
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        availability[dateStr] = {
            morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
            evening: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM"],
        };
    }
    return availability;
}

async function Page({params}: Props) {
    const { id } = await params;
    let doctorProfile = null;
    try {
        doctorProfile = await getDoctorProfileByUserId(id);
    } catch (e) {
        console.error("Failed to load doctor profile:", e);
    }

    if (!doctorProfile) {
        // Fallback profile if not found in database
        doctorProfile = {
            user_id: id,
            full_name: "Dr. Sanket Gidmare",
            bio: "Experienced Dental Surgeon & Aesthetic Consultant with over 10 years of clinical excellence.",
            clinic_address: "Ayodhya Nagar, Sakkardhara, Nagpur",
            phone: "+91 98765 43210",
            photo_url: "/placeholder-4qm88.png",
            area_id: 1,
            specialty_id: 1,
            subscription_active: true,
            subscription_start: null,
            subscription_end: null,
            search_vector: null,
            created_at: new Date().toISOString(),
        };
    }

    const doctorForTabs = {
        id: doctorProfile.user_id,
        name: doctorProfile.full_name,
        address: doctorProfile.clinic_address || "Ayodhya nagar, Sakkardhara, Nagpur",
        contact: doctorProfile.phone || "+91 98765 43210",
        services: [
            doctorProfile.bio || "Consultation & Diagnosis",
            "Root Canal Treatment",
            "Dental Veneers & Cosmetic Dentistry",
            "Cleaning & Polishing",
            "Preventive Oral Care",
        ],
        clinicImages: [
            doctorProfile.photo_url || "/placeholder-4qm88.png",
            "/female-doctor-smiling.png",
            "/placeholder.svg",
        ],
    };

    const availability = generateAvailability();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <DoctorProfileHero doctor={doctorProfile} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <DoctorBookingSection availability={availability} doctorId={id} />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Clinic Information</h3>
                            <div className="text-sm text-gray-600 space-y-2">
                                <strong className="text-gray-900 block font-medium">{doctorProfile.full_name}&apos;s Clinic</strong>
                                <p>{doctorProfile.clinic_address || "Ayodhya Nagar, Nagpur"}</p>
                                {doctorProfile.phone && (
                                    <p className="pt-2">
                                        <a href={`tel:${doctorProfile.phone}`} className="text-teal-600 font-medium hover:underline">
                                            Call: {doctorProfile.phone}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <DoctorInfoTabs doctor={doctorForTabs} />
            </div>
        </div>
    );
}

export default Page;
