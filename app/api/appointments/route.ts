import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionStr = cookieStore.get("caredo_session")?.value || cookieStore.get("caredo_user")?.value;
        if (!sessionStr) {
            return NextResponse.json({ appointments: db.appointments.getAll() });
        }
        const session = JSON.parse(sessionStr);
        const userAppointments = db.appointments.getByPatient(session.email);
        // If no user-specific appointments found, return all demo appointments so dashboard is never empty
        const appointments = userAppointments.length > 0 ? userAppointments : db.appointments.getAll();
        return NextResponse.json({ appointments });
    } catch {
        return NextResponse.json({ appointments: db.appointments.getAll() });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            doctorId,
            doctorName,
            patientName,
            patientPhone,
            patientEmail,
            slotDate,
            slotTime,
            reason
        } = body;

        const newAppointment = db.appointments.create({
            doctor_id: doctorId || "doc-1",
            doctor_name: doctorName || "Dr. Sanket Gidmare",
            patient_name: patientName,
            patient_phone: patientPhone,
            patient_email: patientEmail,
            slot_date: slotDate,
            slot_time: slotTime,
            reason: reason || "General Medical Consultation",
            status: "confirmed",
        });

        return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Booking failed" }, { status: 500 });
    }
}
