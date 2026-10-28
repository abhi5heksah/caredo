import {createClient} from "@/lib/supabase/client";
import {Database, TablesInsert} from "@/types/database";
import { db } from "@/lib/db";

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


export const MOCK_DOCTORS = [
    {
        user_id: "doc-1",
        full_name: "Dr. Sanket Gidmare",
        bio: "Experienced Dental Surgeon & Aesthetic Consultant with 10+ years of clinical excellence.",
        clinic_address: "Ayodhya Nagar, Sakkardhara, Nagpur",
        phone: "+91 98765 43210",
        photo_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
        area_id: 1,
        specialty_id: 1,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-2",
        full_name: "Dr. Priya Sharma",
        bio: "Senior Interventional Cardiologist specializing in preventive heart health and diagnostics.",
        clinic_address: "Dhantoli Medical Enclave, Nagpur",
        phone: "+91 98765 43211",
        photo_url: "https://images.unsplash.com/photo-1594824813589-9159045fa787?w=400&auto=format&fit=crop&q=80",
        area_id: 2,
        specialty_id: 2,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-3",
        full_name: "Dr. Rajesh Verma",
        bio: "Pediatrician & Neonatologist dedicated to comprehensive child health and growth monitoring.",
        clinic_address: "Ramdaspeth Central Clinic, Nagpur",
        phone: "+91 98765 43212",
        photo_url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
        area_id: 3,
        specialty_id: 3,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-4",
        full_name: "Dr. Ananya Deshmukh",
        bio: "Consultant Dermatologist & Cosmetologist specializing in skin rejuvenating and clinical care.",
        clinic_address: "Dharampeth Main Road, Nagpur",
        phone: "+91 98765 43213",
        photo_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
        area_id: 4,
        specialty_id: 4,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-5",
        full_name: "Dr. Vikram Joshi",
        bio: "Chief Orthopedic Surgeon with expertise in joint replacements and sports medicine.",
        clinic_address: "Sitabuldi Square, Nagpur",
        phone: "+91 98765 43214",
        photo_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
        area_id: 5,
        specialty_id: 5,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-6",
        full_name: "Dr. Neha Patel",
        bio: "Obstetrician & Gynecologist offering high-risk pregnancy care and laparoscopic surgery.",
        clinic_address: "Civil Lines, Nagpur",
        phone: "+91 98765 43215",
        photo_url: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop&q=80",
        area_id: 6,
        specialty_id: 6,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-7",
        full_name: "Dr. Amit Kulkarni",
        bio: "Consultant Neurologist focusing on stroke rehabilitation, migraines, and neurological care.",
        clinic_address: "Wardha Road, Nagpur",
        phone: "+91 98765 43216",
        photo_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80",
        area_id: 7,
        specialty_id: 7,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
    {
        user_id: "doc-8",
        full_name: "Dr. Snehal Patil",
        bio: "General Physician & Diabetologist providing complete preventive family healthcare.",
        clinic_address: "Sadar Residency Road, Nagpur",
        phone: "+91 98765 43217",
        photo_url: "https://images.unsplash.com/photo-1594824813603-ee8388828e3b?w=400&auto=format&fit=crop&q=80",
        area_id: 8,
        specialty_id: 8,
        subscription_active: true,
        subscription_start: null,
        subscription_end: null,
        search_vector: null,
        created_at: new Date().toISOString(),
    },
];

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

export const MOCK_SPECIALTIES: Database["public"]["Tables"]["specialties"]["Row"][] = [
    { id: 1, name: "Dentist" },
    { id: 2, name: "Cardiologist" },
    { id: 3, name: "Pediatrician" },
    { id: 4, name: "Dermatologist" },
    { id: 5, name: "Orthopedic Surgeon" },
    { id: 6, name: "Gynecologist" },
    { id: 7, name: "Neurologist" },
    { id: 8, name: "General Physician" },
];

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