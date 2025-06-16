"use client";

import {DoctorCard} from "@/components/www/doctor-card";
import {fetchAllDoctorProfiles} from "@/lib/apis/api"; // adjust path as needed
import {useQuery} from "@tanstack/react-query";

export function DoctorGrid() {
    const {
        data: doctors,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["doctor_profiles"],
        queryFn: fetchAllDoctorProfiles,
    });

    if (isLoading) return <p className="col-span-full text-center text-gray-600">Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {
                    doctors?.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">No doctors found</p>
                    ) :
                    doctors?.map((doctor) => (
                    <DoctorCard key={doctor.user_id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}
