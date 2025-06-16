"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming this is from shadcn/ui or similar
import { Toaster, toast } from 'sonner'; // Import Toaster and toast from sonner

// Format like: 10 Mon, 25
const formatReadableDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue
  const year = date.getFullYear().toString().slice(-2); // e.g., 25
  return `${day} ${weekday}, ${year}`;
};

const formatMonthYear = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

export default function ReceptionistPage() {
  const [filter, setFilter] = useState<"TODAY" | "DAILY" | "MONTHLY">("TODAY");
  const [showModal, setShowModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // New state for selected time

  // New states for "Patient In" feature
  const [patientInId, setPatientInId] = useState<number | null>(null);
  const [isSelectingPatientIn, setIsSelectingPatientIn] = useState(false);

  const todayISO = new Date().toISOString().split("T")[0]; // e.g. 2025-06-13

  const [patients, setPatients] = useState([
    // --- Static data for TODAY section (10 entries) ---
    { id: 101, name: "Alice Smith", time: "9:00 AM", date: todayISO, mobile: "1111111101" },
    { id: 102, name: "Bob Johnson", time: "9:30 AM", date: todayISO, mobile: "1111111102" },
    { id: 103, name: "Charlie Brown", time: "10:00 AM", date: todayISO, mobile: "1111111103" },
    { id: 104, name: "Diana Prince", time: "10:30 AM", date: todayISO, mobile: "1111111104" },
    { id: 105, name: "Eve Adams", time: "11:00 AM", date: todayISO, mobile: "1111111105" },
    { id: 106, name: "Frank White", time: "11:30 AM", date: todayISO, mobile: "1111111106" },
    { id: 107, name: "Grace Davis", time: "12:00 PM", date: todayISO, mobile: "1111111107" },
    { id: 108, name: "Harry Wilson", time: "12:30 PM", date: todayISO, mobile: "1111111108" },
    { id: 109, name: "Ivy Moore", time: "1:00 PM", date: todayISO, mobile: "1111111109" },
    { id: 110, name: "Jack Taylor", time: "1:30 PM", date: todayISO, mobile: "1111111110" },
    // --- Existing data (re-indexed for uniqueness if adding more) ---
    { id: 1, name: "Ravi", time: "9:00 AM", date: "2024-12-01", mobile: "9999999991" },
    { id: 2, name: "Priya", time: "10:00 AM", date: "2024-12-05", mobile: "9999999992" },
    { id: 3, name: "Aman", time: "11:00 AM", date: "2025-01-10", mobile: "9999999993" },
    { id: 4, name: "Neha", time: "12:00 PM", date: "2025-01-12", mobile: "9999999994" },
    { id: 5, name: "Rohit", time: "1:00 PM", date: "2025-02-02", mobile: "9999999995" },
  ]);

  // Predefined time slots (you can customize these)
  const availableTimeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  ];

  const openModal = () => {
    setShowModal(true);
    setSelectedTime(null); // Reset selected time when opening modal
    setName(""); // Clear name input
    setMobile(""); // Clear mobile input
  };
  const closeModal = () => setShowModal(false);
  const closePatientModal = () => setShowPatientModal(false);

  const handleSubmit = () => {
    if (!name || !mobile || !selectedTime) {
      toast.error("Please fill in all fields and select a time slot.");
      return;
    }

    const newPatient = {
      id: patients.length + 1, // Ensure unique ID
      name,
      mobile,
      time: selectedTime, // Use the selected time
      date: todayISO,
    };
    setPatients((prev) => [...prev, newPatient]); // Add new patient to the list
    toast.success(`Patient ${name} booked for ${selectedTime}!`); // Sonner notification on success
    setName("");
    setMobile("");
    setSelectedTime(null); // Clear selected time after submission
    closeModal();
  };

  const dailyData = patients
    .filter((item) => new Date(item.date) <= new Date())
    .slice(-10);

  const todayPatients = patients.filter((p) => p.date === todayISO);

  const monthlySummary = Object.entries(
    patients.reduce((acc, curr) => {
      const monthYear = formatMonthYear(curr.date);
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const handlePatientClick = (patient: any) => {
    if (isSelectingPatientIn) {
      setPatientInId(patient.id);
      toast.info(`Patient ${patient.name} is now in the doctor's cabin.`);
      setIsSelectingPatientIn(false); // Exit selection mode
    } else {
      setSelectedPatient(patient);
      setShowPatientModal(true);
    }
  };

  const handlePatientInButtonClick = () => {
    setIsSelectingPatientIn(true);
    toast.info("Select a patient from 'Today's Patients' to mark them as 'In'.");
    // Optionally, you could set the filter to "TODAY" here if it's not already
    setFilter("TODAY");
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden bg-white">
      <Toaster position="top-center" richColors /> {/* Sonner Toaster component */}
      <div className="w-full max-w-screen px-4 sm:px-6 py-6 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Dashboard</h2>
          <span className="text-sm text-gray-500 mt-1 sm:mt-0">Dr Sanket Gidmare</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {["TODAY", "DAILY", "MONTHLY"].map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label as any)}
                className={`${filter === label ? "text-[#2ec4b6]" : "text-gray-500"} hover:underline text-xs font-medium`}
              >
                {label}
              </button>
            ))}
          </div>
          <Button
            onClick={openModal}
            className="bg-[#2ec4b6] text-white text-sm px-4 py-2 hover:bg-[#27b3a6] rounded"
          >
            Book Now
          </Button>
        </div>

        <div className="w-full h-px bg-[#2ec4b6] mt-3" />

        <div className="mt-4 text-sm">
          {filter === "TODAY" && (
            <div>
              <p className="text-gray-600 font-semibold mb-2">Today's Patients</p>
              {todayPatients.length === 0 && (
                <p className="text-gray-500 italic">No bookings yet for today.</p>
              )}
              {todayPatients.map((p) => (
                <div
                  key={p.id}
                  className={`flex justify-between py-1 border-b border-gray-100 cursor-pointer hover:text-[#2ec4b6] 
                              ${patientInId === p.id ? "text-red-500 font-bold" : ""}`}
                  onClick={() => handlePatientClick(p)}
                >
                  <span>{p.name}</span>
                  <span>{p.time}</span>
                </div>
              ))}
            </div>
          )}

          {filter === "DAILY" && (
            <div>
              <p className="text-gray-600 font-semibold mb-2">Last 10 Days</p>
              {dailyData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-1 border-b border-gray-100"
                >
                  <span>{formatReadableDate(item.date)}</span>
                  <span>Total: 1</span> {/* This still assumes 1, consider updating if you track daily counts */}
                </div>
              ))}
            </div>
          )}

          {filter === "MONTHLY" && (
            <div>
              <p className="text-gray-600 font-semibold mb-2">Monthly Summary</p>
              {monthlySummary.map(([month, count], idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-1 border-b border-gray-100"
                >
                  <span>{month}</span>
                  <span>Total Patients: {count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-xs text-gray-500 text-center">
          *Click when patient enters doctor's cabin.
        </p>
        <Button
          onClick={handlePatientInButtonClick}
          className={`bg-black/70 text-white font-bold rounded-full py-2 w-full mt-4 
                      ${isSelectingPatientIn ? 'bg-orange-500 animate-pulse' : 'hover:bg-black'} transition-colors`}
        >
          {isSelectingPatientIn ? 'Select Patient for Cabin...' : 'Patient In'}
        </Button>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-[#f9f9f9] rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            <div className="text-sm sm:text-base">
              <p className="font-semibold">Number: {patients.length + 1}</p>
              <p className="font-semibold">
                Your Timing:- <span className="text-black">{selectedTime || "Select a time"}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Date: {new Date(todayISO).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Time Slot Selection */}
            <div className="mt-4">
              <p className="font-semibold text-gray-700 mb-2">Select Time Slot:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar class */}
                {availableTimeSlots.map((slot, idx) => (
                  <span
                    key={idx}
                    className={`cursor-pointer px-3 py-1 rounded-md text-center text-xs sm:text-sm border transition-colors
                                  ${selectedTime === slot ? "bg-[#2ec4b6] text-white border-[#2ec4b6]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Patient Full Name"
                className="w-full border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#2ec4b6]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#2ec4b6]"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                className="bg-[#2ec4b6] text-white text-sm px-4 py-2 rounded hover:bg-[#27b3a6] w-full"
              >
                Book now
              </Button>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-[#f9f9f9] rounded-xl p-6 w-[90%] max-w-md shadow-lg relative text-sm">
            <p className="font-semibold">Number: {selectedPatient.id}</p>
            <p className="font-semibold">
              Your Timing:- <span className="text-black">{selectedPatient.time}</span>
            </p>
            <p className="text-gray-600 mt-1">
              Date: {new Date(selectedPatient.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="mt-4">
              Patient Full Name: {selectedPatient.name}
            </p>
            <p>Mobile Number: {selectedPatient.mobile}</p>
            <button
              onClick={closePatientModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
