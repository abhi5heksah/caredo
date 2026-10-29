import Link from "next/link"
import { SPECIALTIES } from "@/lib/specialties"
import { specialtyIconMap } from "@/lib/specialty-icons"

export function DepartmentsSection() {
    return (
        <section className="bg-white pt-28 pb-20 md:pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        24 Medical Departments
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-3">
                        Find care by department
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Book verified specialists across 24 departments, from dentistry and cardiology to radiology and mental health.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {SPECIALTIES.map((dept) => {
                        const Icon = specialtyIconMap[dept.icon]
                        return (
                            <Link
                                key={dept.id}
                                href={`/doctors?query=${encodeURIComponent(dept.name)}`}
                                className="group rounded-2xl border border-gray-200 bg-gray-50 hover:bg-teal-50 hover:border-teal-400 p-4 text-center transition-all"
                            >
                                <div className="mx-auto mb-3 w-11 h-11 rounded-xl bg-white text-teal-600 flex items-center justify-center shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                    {Icon ? <Icon className="w-5 h-5" /> : null}
                                </div>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 leading-snug">
                                    {dept.name}
                                </p>
                            </Link>
                        )
                    })}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/specialties"
                        className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                        View all departments
                    </Link>
                </div>
            </div>
        </section>
    )
}
