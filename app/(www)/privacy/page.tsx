import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Privacy Policy
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
                        Your Privacy Matters
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Effective Date: October 2026</p>
                </div>

                <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
                        <p>
                            We collect personal information necessary to facilitate medical consultations, including patient names, contact numbers, email addresses, and general consultation reason notes provided during appointment booking.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                            <li>To confirm and coordinate your appointments with the selected doctor&#39;s clinic.</li>
                            <li>To send SMS / WhatsApp notifications regarding appointment tokens, timings, and clinic delays.</li>
                            <li>To maintain an accurate clinic reception roster for queue management.</li>
                            <li>We never sell or rent patient personal health data to third-party advertisers.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">3. Data Security &amp; Storage</h2>
                        <p>
                            We implement industry-standard encryption protocols, secure token authentication, and role-based access control to ensure patient information and doctor records are strictly protected.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-900">4. Your Data Rights</h2>
                        <p>
                            You have the right to request access to your appointment history, update contact details, or request deletion of your account and personal records by emailing helpcaredo@gmail.com.
                        </p>
                    </section>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Have privacy concerns? Write to privacy@caredo.in</span>
                    <Link href="/contact" className="text-teal-600 font-semibold hover:underline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    )
}
