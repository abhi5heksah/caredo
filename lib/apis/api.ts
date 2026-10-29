import {createClient} from "@/lib/supabase/client";
import {Database, TablesInsert} from "@/types/database";
import { db } from "@/lib/db";
import { SEED_DOCTORS } from "@/lib/seed-doctors";
import { SPECIALTIES } from "@/lib/specialties";

const supabase = createClient();

export type DoctorProfileInsert = {
    area_id: number
    bio?: string | null
    clinic_address?: string | null
    created_at?: string
    full_name: string
    phone?: string | null
    photo_url?: string | null
    search_vector?: unknown | null
    specialty_id: number
    subscription_active?: boolean
    subscription_end?: string | null
    subscription_start?: string | null
    user_id: string
}

export type DoctorProfileUpdate = Partial<DoctorProfileInsert>

export const createDoctorProfile = async (profile:TablesInsert<'doctor_profiles'> ) => {
    const { data, error } = await supabase
        .from('doctor_profiles')
        .insert(profile)
        .select()
        .single()

    if (error) {
        console.error("Supabase insert error:", error)
        throw new Error(error.message || "Insert failed")
    }

    return data
}


export const MOCK_DOCTORS = SEED_DOCTORS;

export const fetchAllDoctorProfiles = async () => {
    return db.doctors.getAll() as any;
}

export const getDoctorProfileByUserId = async (user_id: string) => {
    const doctor = db.doctors.getById(user_id);
    return (doctor || db.doctors.getAll()[0]) as any;
}

export const updateDoctorProfile = async (user_id: string, updates: DoctorProfileUpdate) => {
    const { data, error } = await supabase
        .from('doctor_profiles')
        .update(updates)
        .eq('user_id', user_id)
        .select()
        .single()

    if (error) throw error
    return data
}

export const deleteDoctorProfile = async (user_id: string) => {
    const { error } = await supabase
        .from('doctor_profiles')
        .delete()
        .eq('user_id', user_id)

    if (error) throw error
    return { success: true }
}

// Patients
export type PatientProfileInsert = {
    user_id: string
    full_name: string
    phone?: string | null
    email?: string | null
    photo_url?: string | null
    date_of_birth?: string | null
    address?: string | null
    subscription_active?: boolean
    subscription_start?: string | null
    subscription_end?: string | null
    created_at?: string
}
export type PatientProfileUpdate = Partial<PatientProfileInsert>;
export async function fetchPatientProfile(userId: string) {
    const { data, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) throw error;
    return data;
}

export async function createPatientProfile(payload: Database["public"]["Tables"]["patient_profiles"]["Insert"]) {
    const { data, error } = await supabase
        .from("patient_profiles")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updatePatientProfile(
    userId: string,
    updates: Database["public"]["Tables"]["patient_profiles"]["Update"]
) {
    const { data, error } = await supabase
        .from("patient_profiles")
        .update(updates)
        .eq("user_id", userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function fetchPatientProfiles(
    limit?: number,
    offset?: number
) {
    let query = supabase
        .from("patient_profiles")
        .select("*");

    if (limit !== undefined || offset !== undefined) {
        const from = offset ?? 0;
        const to = limit !== undefined ? from + limit - 1 : -1;
        query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;   
}

export async function deletePatientProfile(userId: string) {
    const { data, error } = await supabase
        .from("patient_profiles")
        .delete()
        .eq("user_id", userId)
        .select()
        .single();
    if (error) throw error;
    return data;
}



// Appointments and Timeslots

// Define AppointmentStatus from your types (adjust if needed)
type AppointmentStatus = Database["public"]["Enums"]["appointment_status"];

// Helper to throw on error
function throwOnError<T>(response: { data: T | null; error: Error | null }): T {
    if (response.error) throw response.error;
    if (response.data === null) throw new Error("No data returned");
    return response.data;
}

// --- APPOINTMENTS ---

export async function fetchAppointmentsByDoctor(
    doctorId: string,
    limit?: number,
    offset?: number
): Promise<Database["public"]["Tables"]["appointments"]["Row"][]> {
    let query = supabase
        .from("appointments")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("booked_at", { ascending: true });

    if (limit !== undefined || offset !== undefined) {
        const from = offset ?? 0;
        const to = limit !== undefined ? from + limit - 1 : -1;
        query = query.range(from, to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

export async function fetchAppointmentsByPatient(
    patientId: string,
    limit?: number,
    offset?: number
): Promise<Database["public"]["Tables"]["appointments"]["Row"][]> {
    let query = supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", patientId)
        .order("booked_at", { ascending: true });

    if (limit !== undefined || offset !== undefined) {
        const from = offset ?? 0;
        const to = limit !== undefined ? from + limit - 1 : -1;
        query = query.range(from, to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

export async function fetchAppointmentById(
    appointmentId: string
): Promise<Database["public"]["Tables"]["appointments"]["Row"]> {
    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", appointmentId)
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function createAppointment(
    payload: Database["public"]["Tables"]["appointments"]["Insert"]
): Promise<Database["public"]["Tables"]["appointments"]["Row"]> {
    // TODO: Add validation here or in a service layer as needed

    const { data, error } = await supabase
        .from("appointments")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updateAppointment(
    appointmentId: string,
    updates: Database["public"]["Tables"]["appointments"]["Update"]
): Promise<Database["public"]["Tables"]["appointments"]["Row"]> {
    const { data, error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", appointmentId)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function cancelAppointment(
    appointmentId: string
): Promise<Database["public"]["Tables"]["appointments"]["Row"]> {
    // Use the correct enum/status type
    return updateAppointment(appointmentId, { status: "cancelled" as AppointmentStatus });
}

export async function deleteAppointment(
    appointmentId: string
): Promise<Database["public"]["Tables"]["appointments"]["Row"] | null> {
    const { data, error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- TIME SLOTS ---

export async function fetchTimeSlotsByDoctor(
    doctorId: string,
    date?: string,
    limit?: number,
    offset?: number
): Promise<Database["public"]["Tables"]["time_slots"]["Row"][]> {
    let query = supabase
        .from("time_slots")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("start_time", { ascending: true });

    if (date) query = query.eq("slot_date", date);
    if (limit !== undefined || offset !== undefined) {
        const from = offset ?? 0;
        const to = limit !== undefined ? from + limit - 1 : -1;
        query = query.range(from, to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

export async function createTimeSlot(
    payload: Database["public"]["Tables"]["time_slots"]["Insert"]
): Promise<Database["public"]["Tables"]["time_slots"]["Row"]> {
    const { data, error } = await supabase
        .from("time_slots")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updateTimeSlot(
    slotId: string,
    updates: Database["public"]["Tables"]["time_slots"]["Update"]
): Promise<Database["public"]["Tables"]["time_slots"]["Row"]> {
    const { data, error } = await supabase
        .from("time_slots")
        .update(updates)
        .eq("id", slotId)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function deleteTimeSlot(
    slotId: string
): Promise<Database["public"]["Tables"]["time_slots"]["Row"] | null> {
    const { data, error } = await supabase
        .from("time_slots")
        .delete()
        .eq("id", slotId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- PAYMENTS ---

export async function fetchPaymentsByDoctor(
    doctorId: string
): Promise<Database["public"]["Tables"]["payments"]["Row"][]> {
    const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("paid_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function fetchPaymentById(
    paymentId: string
): Promise<Database["public"]["Tables"]["payments"]["Row"]> {
    const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("id", paymentId)
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function createPayment(
    payload: Database["public"]["Tables"]["payments"]["Insert"]
): Promise<Database["public"]["Tables"]["payments"]["Row"]> {
    const { data, error } = await supabase
        .from("payments")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updatePayment(
    paymentId: string,
    updates: Database["public"]["Tables"]["payments"]["Update"]
): Promise<Database["public"]["Tables"]["payments"]["Row"]> {
    const { data, error } = await supabase
        .from("payments")
        .update(updates)
        .eq("id", paymentId)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function deletePayment(
    paymentId: string
): Promise<Database["public"]["Tables"]["payments"]["Row"] | null> {
    const { data, error } = await supabase
        .from("payments")
        .delete()
        .eq("id", paymentId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- RECEPTIONIST PROFILES ---

export async function fetchReceptionistsByDoctor(
    doctorId: string
): Promise<Database["public"]["Tables"]["receptionist_profiles"]["Row"][]> {
    const { data, error } = await supabase
        .from("receptionist_profiles")
        .select("*")
        .eq("doctor_id", doctorId);

    if (error) throw error;
    return data || [];
}

export async function fetchReceptionistByUserId(
    userId: string
): Promise<Database["public"]["Tables"]["receptionist_profiles"]["Row"]> {
    const { data, error } = await supabase
        .from("receptionist_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function createReceptionistProfile(
    payload: Database["public"]["Tables"]["receptionist_profiles"]["Insert"]
): Promise<Database["public"]["Tables"]["receptionist_profiles"]["Row"]> {
    const { data, error } = await supabase
        .from("receptionist_profiles")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updateReceptionistProfile(
    userId: string,
    updates: Database["public"]["Tables"]["receptionist_profiles"]["Update"]
): Promise<Database["public"]["Tables"]["receptionist_profiles"]["Row"]> {
    const { data, error } = await supabase
        .from("receptionist_profiles")
        .update(updates)
        .eq("user_id", userId)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function deleteReceptionistProfile(
    userId: string
): Promise<Database["public"]["Tables"]["receptionist_profiles"]["Row"] | null> {
    const { data, error } = await supabase
        .from("receptionist_profiles")
        .delete()
        .eq("user_id", userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- SPECIALTIES ---

export const MOCK_SPECIALTIES: Database["public"]["Tables"]["specialties"]["Row"][] = SPECIALTIES.map((s) => ({ id: s.id, name: s.name }));

export async function fetchAllSpecialties(): Promise<Database["public"]["Tables"]["specialties"]["Row"][]> {
    return db.specialties.getAll() as any;
}

export async function fetchSpecialtyById(
    id: number
): Promise<Database["public"]["Tables"]["specialties"]["Row"]> {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
            return MOCK_SPECIALTIES.find((s) => s.id === id) || MOCK_SPECIALTIES[0];
        }
        const { data, error } = await supabase
            .from("specialties")
            .select("*")
            .eq("id", id)
            .single();

        return throwOnError(data ? { data, error } : { data: null, error });
    } catch {
        return MOCK_SPECIALTIES.find((s) => s.id === id) || MOCK_SPECIALTIES[0];
    }
}

export async function createSpecialty(
    payload: Database["public"]["Tables"]["specialties"]["Insert"]
): Promise<Database["public"]["Tables"]["specialties"]["Row"]> {
    const { data, error } = await supabase
        .from("specialties")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updateSpecialty(
    id: number,
    updates: Database["public"]["Tables"]["specialties"]["Update"]
): Promise<Database["public"]["Tables"]["specialties"]["Row"]> {
    const { data, error } = await supabase
        .from("specialties")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function deleteSpecialty(
    id: number
): Promise<Database["public"]["Tables"]["specialties"]["Row"] | null> {
    const { data, error } = await supabase
        .from("specialties")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- AREAS ---

export const MOCK_AREAS: Database["public"]["Tables"]["areas"]["Row"][] = [
    { id: 1, name: "Sakkardhara", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 2, name: "Dhantoli", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 3, name: "Ramdaspeth", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 4, name: "Dharampeth", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 5, name: "Sitabuldi", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 6, name: "Civil Lines", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 7, name: "Wardha Road", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 8, name: "Sadar", city: "Nagpur", state: "Maharashtra", country: "India" },
];

export async function fetchAllAreas(): Promise<Database["public"]["Tables"]["areas"]["Row"][]> {
    return db.areas.getAll() as any;
}

export async function fetchAreaById(id: number): Promise<Database["public"]["Tables"]["areas"]["Row"]> {
    const { data, error } = await supabase
        .from("areas")
        .select("*")
        .eq("id", id)
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function createArea(
    payload: Database["public"]["Tables"]["areas"]["Insert"]
): Promise<Database["public"]["Tables"]["areas"]["Row"]> {
    const { data, error } = await supabase
        .from("areas")
        .insert(payload)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function updateArea(
    id: number,
    updates: Database["public"]["Tables"]["areas"]["Update"]
): Promise<Database["public"]["Tables"]["areas"]["Row"]> {
    const { data, error } = await supabase
        .from("areas")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    return throwOnError(data ? { data, error } : { data: null, error });
}

export async function deleteArea(
    id: number
): Promise<Database["public"]["Tables"]["areas"]["Row"] | null> {
    const { data, error } = await supabase
        .from("areas")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}