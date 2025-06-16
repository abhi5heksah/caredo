"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SlidersHorizontal, Search, MapPin, ListFilter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sortOptions = [
  { label: "Experience - High to Low", value: "exp_desc" },
  { label: "Experience - Low to High", value: "exp_asc" },
  { label: "Distance - Near to Far", value: "dist_asc" },
  { label: "Patient Stories - High to Low", value: "stories_desc" },
  { label: "Fees - High to Low", value: "fees_desc" },
  { label: "Fees - Low to High", value: "fees_asc" },
]

export function DoctorSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentLocation, setCurrentLocation] = useState(searchParams.get("city") || "Nagpur")
  const [currentSort, setCurrentSort] = useState(searchParams.get("sort") || "exp_desc")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "Dentist")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)
    if (currentLocation) params.set("city", currentLocation.toLowerCase())
    if (currentSort) params.set("sort", currentSort)
    router.push(`/doctors?${params.toString()}`)
  }

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`/doctors?${params.toString()}`)
  }

  const toggleFiltersPanel = () => {
    // Dispatch a more generic event name
    document.dispatchEvent(new CustomEvent("toggleFiltersPanel"))
  }

  return (
    <section className="bg-brand-teal-500 py-3 sm:py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
          {/* Search Input (Specialty/Doctor/Clinic) */}
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search specialty, doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-11 pl-10 text-sm sm:text-base w-full bg-white text-gray-700 rounded-md border-gray-300 focus:border-brand-teal-500 focus:ring-brand-teal-500"
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-grow w-full sm:w-auto">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Location"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-11 pl-10 text-sm sm:text-base w-full bg-white text-gray-700 rounded-md border-gray-300 focus:border-brand-teal-500 focus:ring-brand-teal-500"
            />
          </div>

          {/* Filters Button */}
          <Button
            variant="ghost"
            className="h-11 flex items-center gap-2 text-sm sm:text-base text-white hover:bg-brand-teal-600 hover:text-white px-3 w-full sm:w-auto justify-center"
            onClick={toggleFiltersPanel} // Changed event name
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </Button>

          {/* Sort By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-11 flex items-center gap-2 text-sm sm:text-base text-white hover:bg-brand-teal-600 hover:text-white px-3 w-full sm:w-auto justify-center"
              >
                <ListFilter className="h-5 w-5" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 sm:w-64">
              <DropdownMenuRadioGroup
                value={currentSort}
                onValueChange={(value) => {
                  setCurrentSort(value)
                  updateSearchParam("sort", value)
                }}
              >
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}
