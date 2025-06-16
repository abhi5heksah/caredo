"use client"

import { DoctorFilters } from "@/components/www/doctor-filters"
import { DoctorGrid } from "@/components/www/doctor-grid"
import { DoctorSearch } from "@/components/www/doctor-search"
import { Suspense, useEffect, useState } from "react"

export default function DoctorsPage() {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false) // Renamed state

    useEffect(() => {
        const handleToggle = () => {
            setIsFilterPanelOpen((prev) => !prev)
        }
        // Listen to a more generic event name
        document.addEventListener("toggleFiltersPanel", handleToggle)
        return () => {
            document.removeEventListener("toggleFiltersPanel", handleToggle)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="relative">
                {" "}
                {/* Added relative for potential absolute positioning of filters */}
                <DoctorSearch />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-4 text-gray-700">16 Doctors {/* This count should be dynamic */}</div>

                    {/* DoctorFilters will now be a floating panel, conditionally rendered */}
                    {isFilterPanelOpen && (
                        <DoctorFilters isOpen={isFilterPanelOpen} onClose={() => setIsFilterPanelOpen(false)} />
                    )}

                    <div className="mt-6">
                        <Suspense fallback={<div className="text-center py-10">Loading doctors...</div>}>
                            <DoctorGrid />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    )
}
