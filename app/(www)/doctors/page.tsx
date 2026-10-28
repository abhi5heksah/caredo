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
        <div className="min-h-screen bg-gray-50">
            <main className="relative">
                <Suspense fallback={<div className="h-16 bg-teal-600 animate-pulse" />}>
                    <DoctorSearch />
                </Suspense>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {isFilterPanelOpen && (
                        <DoctorFilters isOpen={isFilterPanelOpen} onClose={() => setIsFilterPanelOpen(false)} />
                    )}

                    <div className="mt-4">
                        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading verified doctors...</div>}>
                            <DoctorGrid />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    )
}
