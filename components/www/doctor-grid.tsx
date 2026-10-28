"use client";

import {DoctorCard} from "@/components/www/doctor-card";
import {fetchAllDoctorProfiles} from "@/lib/apis/api";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {useMemo} from "react";

export function DoctorGrid() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";
    const city = searchParams.get("city")?.toLowerCase() || "";

    const {
        data: doctors,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["doctor_profiles"],
        queryFn: fetchAllDoctorProfiles,
    });

    const filteredDoctors = useMemo(() => {
        if (!doctors) return [];
        return (doctors as any[]).filter((doc: any) => {
            const matchesQuery = !query ||
                doc.full_name?.toLowerCase().includes(query) ||
                doc.bio?.toLowerCase().includes(query) ||
                (query.includes("dent") && doc.specialty_id === 1) ||
                (query.includes("cardio") && doc.specialty_id === 2) ||
                (query.includes("pedia") && doc.specialty_id === 3) ||
                (query.includes("derma") && doc.specialty_id === 4) ||
                (query.includes("ortho") && doc.specialty_id === 5) ||
                (query.includes("gyne") && doc.specialty_id === 6) ||
                (query.includes("neuro") && doc.specialty_id === 7) ||
                (query.includes("physician") && doc.specialty_id === 8);

            const matchesCity = !city ||
                doc.clinic_address?.toLowerCase().includes(city) ||
                city === "nagpur"; // default demo city

            return matchesQuery && matchesCity;
        });
    }, [doctors, query, city]);

    if (isLoading) return <p className="col-span-full text-center text-gray-600 py-12">Loading doctors...</p>;
    if (isError) return <p className="text-center text-red-500 py-8">Error: {(error as Error).message}</p>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center text-sm text-gray-700 font-medium">
                <span>
                    Showing <strong className="text-teal-700">{filteredDoctors.length}</strong> {filteredDoctors.length === 1 ? "Doctor" : "Doctors"}
                    {city ? ` in ${city.charAt(0).toUpperCase() + city.slice(1)}` : ""}
                    {query ? ` for "${query}"` : ""}
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredDoctors.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 p-8 space-y-3">
                        <p className="text-base font-semibold text-gray-700">No doctors found matching your criteria</p>
                        <p className="text-sm text-gray-500">Try searching for &quot;Dentist&quot;, &quot;Cardiologist&quot;, or clear your search.</p>
                        <a href="/doctors" className="inline-block mt-2 text-sm text-teal-600 font-semibold hover:underline">
                            View all doctors
                        </a>
                    </div>
                ) : (
                    filteredDoctors.map((doctor: any) => (
                        <DoctorCard key={doctor.user_id} doctor={doctor} />
                    ))
                )}
            </div>
        </div>
    );
}
