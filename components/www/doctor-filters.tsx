"use client"

import { useState, useEffect } from "react" // Added useEffect
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const filterCategories = [
  {
    title: "Distance",
    options: [
      { label: "Within 1 km", value: "1km" },
      { label: "Within 2 km", value: "2km", default: true },
      { label: "Within 3 km", value: "3km" },
      { label: "Entire city", value: "city" },
    ],
  },
  {
    title: "Fees",
    options: [
      { label: "Below Rs 100", value: "below100" },
      { label: "Rs 100-200", value: "100-200" },
      { label: "Rs 200-Rs 500", value: "200-500" },
      { label: "Above Rs 500", value: "above500" },
      { label: "Above Rs 1000", value: "above1000" },
    ],
  },
  {
    title: "Available",
    options: [
      { label: "Now", value: "now" },
      { label: "Within 4 hours", value: "4hours" },
      { label: "Today", value: "today" },
      { label: "Tomorrow", value: "tomorrow" },
      { label: "Within 7 days", value: "7days" },
    ],
  },
  {
    title: "Gender",
    options: [
      { label: "Any", value: "any", default: true },
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
    ],
  },
]

interface DoctorFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export function DoctorFilters({ isOpen, onClose }: DoctorFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    distance: "2km",
    fees: "",
    available: "",
    gender: "any",
  })

  // Effect to prevent body scroll when filter panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset" // Cleanup on unmount
    }
  }, [isOpen])

  const handleFilterChange = (categoryTitle: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [categoryTitle.toLowerCase()]: value,
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      distance: "2km",
      fees: "",
      available: "",
      gender: "any",
    })
  }

  const showDoctors = () => {
    console.log("Applying filters:", selectedFilters)
    onClose() // Close the panel after applying
  }

  if (!isOpen) {
    return null
  }

  return (
    // Floating panel container
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24">
      {" "}
      {/* Adjust pt for header/search bar height */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} // Close on overlay click
      ></div>
      <div className="relative bg-white rounded-lg shadow-xl p-4 sm:p-5 w-full max-w-5xl mx-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
        {" "}
        {/* Constrain height and enable scroll */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">Filters:</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Filter Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:flex lg:flex-1 gap-x-4 gap-y-4 mb-4 lg:mb-0">
            {filterCategories.map((category) => (
              <div key={category.title} className="pr-0 lg:pr-4">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">{category.title}</h4>
                <RadioGroup
                  value={selectedFilters[category.title.toLowerCase() as keyof typeof selectedFilters] || ""}
                  onValueChange={(value) => handleFilterChange(category.title, value)}
                  className="space-y-1.5"
                >
                  {category.options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={opt.value}
                        id={`${category.title}-${opt.value}`}
                        className="h-4 w-4 border-gray-400"
                      />
                      <Label htmlFor={`${category.title}-${opt.value}`} className="text-sm font-normal text-gray-600">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          {/* Vertical Separator for Desktop-like layout inside modal */}
          <div className="hidden lg:block border-l mx-4"></div>

          {/* Action Box */}
          <div className="flex flex-col items-center justify-center space-y-3 lg:w-48 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 mt-4 lg:mt-0">
            <button onClick={clearAllFilters} className="text-xs text-brand-teal-600 hover:underline">
              Clear Filter
            </button>
            <p className="text-sm text-gray-700 text-center">
              <span className="font-bold text-brand-teal-600 text-lg">27+</span>
              <br />
              Doctors available
            </p>
            <Button
              onClick={showDoctors}
              className="w-full bg-brand-teal-500 hover:bg-brand-teal-600 text-white px-4 py-2.5 text-sm"
            >
              Show Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
