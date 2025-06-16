import {getDoctorProfileByUserId} from "@/lib/apis/api";
import {DoctorProfileHero} from "@/components/doctor-profile-hero";
import {DoctorBookingSection} from "@/components/doctor-booking-section";

type Props = {
    params:{
        doctorId: string;
    }
};

async function Page({params}: Props) {
    const doctorId = params.doctorId;
    const doctorProfile = await getDoctorProfileByUserId(doctorId);

    if (!doctorProfile) {
        return <div>Doctor profile not found</div>;
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <DoctorProfileHero doctor={doctorProfile} />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <DoctorBookingSection availability={true} doctorId={doctorId} />
                    </div>
                    <div className="lg:col-span-1">
                        {/* Placeholder for additional info or ads */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Clinic Information</h3>
                            <p className="text-sm text-gray-600">
                                <strong>{doctor.hospital}</strong>
                                <br />
                                {doctor.address}
                                <br />
                                <a href={`tel:${doctor.contact}`} className="text-teal-600 hover:underline">
                                    Call: {doctor.contact}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <DoctorInfoTabs doctor={doctor} />
        </>
    );
}

export default Page;
