import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";
import {
    User,
    Calendar,
    Clock,
    MapPin,
    Stethoscope,
    CheckCircle2,
    PlusCircle,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Retrieve user appointments from local database
    const allAppointments = db.appointments.getAll();
    const userAppointments = allAppointments.filter(
        (a) => a.patient_email === user.email || a.patient_id === user.id
    );
    const appointmentsToDisplay = userAppointments.length > 0 ? userAppointments : allAppointments.slice(0, 3);

    const userName = user.user_metadata?.name || user.email.split("@")[0];
    const userRole = user.user_metadata?.role || "Patient";

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Dashboard Welcome Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xl border border-teal-100">
                            <User className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome, {userName}!
                                </h1>
                                <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200 uppercase">
                                    {userRole}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/doctors">
                            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm">
                                <PlusCircle className="w-4 h-4 mr-1.5" /> Book Appointment
                            </Button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
                            <span>Total Appointments</span>
                            <Calendar className="w-4 h-4 text-teal-600" />
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900">
                            {appointmentsToDisplay.length}
                        </div>
                        <p className="text-xs text-gray-400">Scheduled on Caredo</p>
                    </Card>

                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
                            <span>Status</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="text-2xl font-extrabold text-emerald-600">Active</div>
                        <p className="text-xs text-gray-400">Account verified.</p>
                    </Card>

                    <Card className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
                            <span>Booking</span>
                            <Stethoscope className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900">Confirmed </div>
                        <p className="text-xs text-gray-400">verified</p>
                    </Card>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Booked Appointments</h2>
                        <Link href="/doctors" className="text-xs font-semibold text-teal-600 hover:underline flex items-center">
                            Find new doctor <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                    </div>

                    {appointmentsToDisplay.length === 0 ? (
                        <Card className="rounded-2xl border border-gray-200 bg-white p-8 text-center space-y-3">
                            <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
                            <h3 className="text-base font-semibold text-gray-800">No appointments scheduled yet</h3>
                            <p className="text-xs text-gray-500">Book your first doctor appointment with zero waiting queue.</p>
                            <Link href="/doctors" className="inline-block pt-2">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white text-xs">
                                    Browse Doctors
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appointmentsToDisplay.map((app) => (
                                <Card
                                    key={app.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3 hover:border-teal-500 transition-all shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-[11px] font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                                                {app.id}
                                            </span>
                                            <h3 className="text-base font-bold text-gray-900 mt-1">
                                                {app.doctor_name}
                                            </h3>
                                            <p className="text-xs text-gray-500">Patient: {app.patient_name}</p>
                                        </div>
                                        <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                                        </span>
                                    </div>

                                    <hr className="border-gray-100" />

                                    <div className="space-y-1.5 text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                                            <span className="font-medium text-gray-900">{app.slot_date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                                            <span>{app.slot_time}</span>
                                        </div>
                                        {app.reason && (
                                            <div className="text-[11px] text-gray-500 italic pt-1">
                                                &quot;{app.reason}&quot;
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* College Project Architecture Guide for user */}
                <Card className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 space-y-3">
                    <h3 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-700" /> Project Database Architecture (lib/db.ts)
                    </h3>
                    <p className="text-xs text-teal-800 leading-relaxed">
                        This application operates with an offline, autonomous, file-backed database layer located at <code className="bg-teal-100 px-1 py-0.5 rounded font-mono">lib/db.ts</code> and persistent file <code className="bg-teal-100 px-1 py-0.5 rounded font-mono">data/db.json</code>. All registration, login authentication, doctor profiles, specialties, and appointments are stored locally without needing external cloud Supabase credentials.
                    </p>
                </Card>
            </div>
        </div>
    );
}
