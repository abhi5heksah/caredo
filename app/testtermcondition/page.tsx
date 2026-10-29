// components/TermsAndConditions.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Globe, Instagram, Youtube, Facebook } from "lucide-react";

export default function TermsAndConditions() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleGoBack() {
    router.back();
  }

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white p-4 flex items-center shadow-sm fixed top-0 left-0 z-40">
        <button onClick={handleGoBack} className="text-gray-600 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col justify-start items-center pt-16 px-4 pb-8 sm:px-6 md:px-8">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-lg font-bold mb-6 text-gray-800">
            Terms And Condition for Doctors
          </h1>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>First priority will be given to patients with appointments booked through Caredo.</li>
            <li>In case of emergencies, the doctor may prioritize emergency patients first.</li>
            <li>
              If the patient is <b>absent or late</b> at the scheduled time, the appointment will be cancelled and the patient will need to book a new one and ask the receptionist to help.
            </li>
            <li>
              If a patient’s appointment is cancelled due to <b>emergency cases in the hospital</b> or <b>long time taken by a previous patient</b>, they will be given first priority in the next available slot on Caredo.
            </li>
            <li>
              Receptionist will click <b>&quot;Patient in&quot;</b> regularly <b>(when the patient is entering the doctor’s cabin)</b>, which helps patients get live updates of their numbers in the hospital.
            </li>
          </ul>

          <hr className="my-10" />

          <h2 className="text-xl font-bold mb-6 text-gray-800">Contacts</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center space-x-3">
              <Youtube className="h-5 w-5 text-gray-600" />
              <span>@caredoindia</span>
            </div>
            <div className="flex items-center space-x-3">
              <Instagram className="h-5 w-5 text-gray-600" />
              <span>caredoindia</span>
            </div>
            <div className="flex items-center space-x-3">
              <Facebook className="h-5 w-5 text-gray-600" />
              <span>Caredo.in</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <span>helpcaredo@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <span>8958739348</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-600" />
              <span>caredo.in</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
