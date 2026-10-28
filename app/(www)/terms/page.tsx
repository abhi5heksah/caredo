import Link from "next/link"
import { Shield, Clock, AlertCircle } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Legal
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Last updated: October 2026</p>
                </div>

                <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using Caredo (the &quot;Platform&quot;), whether as a patient booking an appointment or a medical professional listing clinic services, you agree to comply with and be bound by these Terms and Conditions.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">2. Appointment Scheduling &amp; Clinic Priority</h2>
                        <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                            <li>Appointments booked through Caredo receive scheduled priority at the doctor&#39;s clinic.</li>
                            <li>In case of medical emergencies, the clinic physician reserves the right to prioritize urgent emergency care.</li>
                            <li>Patients are requested to arrive 10 minutes prior to their selected time slot. If late, the clinic receptionist may re-allocate your slot to the next available window.</li>
                            <li>Live queue updates and token numbers are provided for convenience and estimate clinic flow.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">3. Fees &amp; Payments</h2>
                        <p>
                            Booking appointments on Caredo is free for patients. Consultation fees specified on doctor profiles are paid directly at the doctor&#39;s clinic or hospital in accordance with their standard clinic pricing.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">4. Medical Disclaimer</h2>
                        <p>
                            Caredo is a digital healthcare coordination platform connecting patients with certified independent healthcare providers. Caredo does not provide medical advice or emergency medical services. In life-threatening emergencies, immediately call emergency services or visit the nearest hospital casualty.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">5. Doctor Verification</h2>
                        <p>
                            While Caredo validates medical registration credentials of participating practitioners, patient-doctor consultations establish an independent direct relationship between patient and physician.
                        </p>
                    </section>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Questions about our terms? Contact helpcaredo@gmail.com</span>
                    <Link href="/contact" className="text-teal-600 font-semibold hover:underline">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    )
}
