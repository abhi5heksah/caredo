"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Availability {
  [date: string]: {
    morning: string[]
    evening: string[]
  }
}

interface DoctorBookingSectionProps {
  availability: Availability
  doctorId: string
}

// Helper to get next 7 days
const getNextDays = (numDays: number) => {
  const days = []
  const today = new Date()
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push(date)
  }
  return days
}

export function DoctorBookingSection({ availability, doctorId }: DoctorBookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState(new Date()) // Default to today
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [dateOffset, setDateOffset] = useState(0) // For week navigation

  const displayDays = getNextDays(7).slice(dateOffset, dateOffset + 7)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0]
  const slotsForSelectedDate = availability[formattedSelectedDate] || { morning: [], evening: [] }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Select a Time Slot for Your Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Date Picker */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDateOffset(Math.max(0, dateOffset - 7))}
              disabled={dateOffset === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h4 className="text-sm font-medium">
              {displayDays[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDateOffset(dateOffset + 7)}
              disabled={getNextDays(14).length <= dateOffset + 7}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {displayDays.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedDate.toDateString() === day.toDateString() ? "bg-cyan-500 text-white" : "hover:bg-teal-100"
                }`}
              >
                <div className="text-xs">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="font-semibold">{day.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">
                Morning ({slotsForSelectedDate.morning.length} slots available)
              </h4>
              {slotsForSelectedDate.morning.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {slotsForSelectedDate.morning.map((time) => (
                    <Button
                      key={`morning-${time}`}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`w-full ${selectedTime === time ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "border-teal-500 text-teal-600 hover:bg-teal-50"}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No morning slots available for this date.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-700">
                Evening ({slotsForSelectedDate.evening.length} slots available)
              </h4>
              {slotsForSelectedDate.evening.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {slotsForSelectedDate.evening.map((time) => (
                    <Button
                      key={`evening-${time}`}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`w-full ${selectedTime === time ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "border-teal-500 text-teal-600 hover:bg-teal-50"}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No evening slots available for this date.</p>
              )}
            </div>
          </div>
        )}

        {/* Booking Button */}
        {selectedTime && (
          <div className="mt-8">
            <Link
              href={`/doctors/${doctorId}/confirm-booking?date=${formattedSelectedDate}&time=${encodeURIComponent(selectedTime)}`}
              passHref
            >
              <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3">
                Book Now for {selectedTime} on{" "}
                {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </Button>
            </Link>
          </div>
        )}
        {!selectedTime &&
          selectedDate &&
          (slotsForSelectedDate.morning.length > 0 || slotsForSelectedDate.evening.length > 0) && (
            <p className="mt-8 text-center text-gray-600">Please select a time slot to proceed.</p>
          )}
        {selectedDate && slotsForSelectedDate.morning.length === 0 && slotsForSelectedDate.evening.length === 0 && (
          <p className="mt-8 text-center text-red-600 font-medium">
            No slots available for {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}.
            Please select another date.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
