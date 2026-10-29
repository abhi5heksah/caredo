"use client";

import {DoctorCard} from "@/components/www/doctor-card";
import {fetchAllDoctorProfiles} from "@/lib/apis/api";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {useMemo} from "react";
import { SPECIALTIES, getSpecialtyName } from "@/lib/specialties";

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
        const q = query.trim().toLowerCase();
        const exactSpecialty = q
            ? SPECIALTIES.find(
                  (s) =>
                      s.name.toLowerCase() === q ||
                      s.slug === q ||
                      `${s.name.toLowerCase()}s` === q
              )
            : null;

        return (doctors as any[]).filter((doc: any) => {
            const matchesCity =
                !city ||
                doc.clinic_address?.toLowerCase().includes(city) ||
                city === "nagpur"; // default demo city

            if (!matchesCity) return false;
            if (!q) return true;

            if (exactSpecialty) {
                return doc.specialty_id === exactSpecialty.id;
            }

            const specialtyName = getSpecialtyName(doc.specialty_id).toLowerCase();
            const matchesSpecialty = SPECIALTIES.some(
                (s) =>
                    doc.specialty_id === s.id &&
                    (s.name.toLowerCase().includes(q) ||
                        s.slug.includes(q) ||
                        s.conditions.some((c) => c.toLowerCase().includes(q)))
            );

            return (
                doc.full_name?.toLowerCase().includes(q) ||
                doc.bio?.toLowerCase().includes(q) ||
                specialtyName.includes(q) ||
                matchesSpecialty
            );
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
