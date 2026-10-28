// lib/db.ts - Local Database for Caredo

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: "patient" | "doctor" | "admin";
    phone?: string;
    created_at: string;
}

export interface DoctorProfile {
    user_id: string;
    full_name: string;
    bio: string | null;
    clinic_address: string | null;
    phone: string | null;
    photo_url: string | null;
    specialty_id: number;
    area_id: number;
    subscription_active: boolean;
    subscription_start: string | null;
    subscription_end: string | null;
    search_vector: unknown | null;
    created_at: string;
}

export interface Appointment {
    id: string;
    doctor_id: string;
    doctor_name: string;
    patient_id?: string;
    patient_name: string;
    patient_phone: string;
    patient_email?: string;
    slot_date: string;
    slot_time: string;
    reason?: string;
    status: "confirmed" | "completed" | "cancelled";
    created_at: string;
}

export interface Specialty {
    id: number;
    name: string;
}

export interface Area {
    id: number;
    name: string;
    city: string | null;
    state: string | null;
    country: string | null;
}

export interface DatabaseSchema {
    users: User[];
    doctors: DoctorProfile[];
    appointments: Appointment[];
    specialties: Specialty[];
    areas: Area[];
}

const DEFAULT_USERS: User[] = [
    {
        id: "usr-patient-1",
        email: "patient@caredo.in",
        password: "password123",
        name: "Rahul Sharma",
        role: "patient",
        phone: "+91 98765 00001",
        created_at: "2026-01-15T10:00:00.000Z",
    },
    {
        id: "usr-doctor-1",
        email: "doctor@caredo.in",
        password: "password123",
        name: "Dr. Sanket Gidmare",
        role: "doctor",
        phone: "+91 98765 43210",
        created_at: "2026-01-10T08:30:00.000Z",
    },
    {
        id: "usr-admin-1",
        email: "admin@caredo.in",
        password: "admin123",
        name: "System Administrator",
        role: "admin",
        created_at: "2026-01-01T00:00:00.000Z",
    },
];

const DEFAULT_DOCTORS: DoctorProfile[] = [
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
        created_at: "2026-01-01T00:00:00.000Z",
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
        created_at: "2026-01-02T00:00:00.000Z",
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
        created_at: "2026-01-03T00:00:00.000Z",
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
        created_at: "2026-01-04T00:00:00.000Z",
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
        created_at: "2026-01-05T00:00:00.000Z",
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
        created_at: "2026-01-06T00:00:00.000Z",
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
        created_at: "2026-01-07T00:00:00.000Z",
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
        created_at: "2026-01-08T00:00:00.000Z",
    },
];

const DEFAULT_SPECIALTIES: Specialty[] = [
    { id: 1, name: "Dentist" },
    { id: 2, name: "Cardiologist" },
    { id: 3, name: "Pediatrician" },
    { id: 4, name: "Dermatologist" },
    { id: 5, name: "Orthopedic Surgeon" },
    { id: 6, name: "Gynecologist" },
    { id: 7, name: "Neurologist" },
    { id: 8, name: "General Physician" },
];

const DEFAULT_AREAS: Area[] = [
    { id: 1, name: "Sakkardhara", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 2, name: "Dhantoli", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 3, name: "Ramdaspeth", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 4, name: "Dharampeth", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 5, name: "Sitabuldi", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 6, name: "Civil Lines", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 7, name: "Wardha Road", city: "Nagpur", state: "Maharashtra", country: "India" },
    { id: 8, name: "Sadar", city: "Nagpur", state: "Maharashtra", country: "India" },
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
    {
        id: "CRD-842911",
        doctor_id: "doc-1",
        doctor_name: "Dr. Sanket Gidmare",
        patient_id: "usr-patient-1",
        patient_name: "Rahul Sharma",
        patient_phone: "+91 98765 00001",
        patient_email: "patient@caredo.in",
        slot_date: "2026-10-30",
        slot_time: "10:00 AM",
        reason: "Dental cavity checkup and cleaning",
        status: "confirmed",
        created_at: "2026-10-25T14:20:00.000Z",
    },
];

// Safe dynamic require for Node.js modules without tripping client bundlers
function getNodeModules(): { fs: any; path: any } | null {
    if (typeof window !== "undefined") return null;
    try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const dynamicRequire = eval("require");
        return {
            fs: dynamicRequire("fs"),
            path: dynamicRequire("path"),
        };
    } catch {
        return null;
    }
}

function getDbFilePath(): string {
    const mods = getNodeModules();
    if (mods && mods.path && typeof process !== "undefined" && process.cwd) {
        return mods.path.join(process.cwd(), "data", "db.json");
    }
    return "./data/db.json";
}

// In-memory cache
let inMemoryDB: DatabaseSchema = {
    users: [...DEFAULT_USERS],
    doctors: [...DEFAULT_DOCTORS],
    appointments: [...DEFAULT_APPOINTMENTS],
    specialties: [...DEFAULT_SPECIALTIES],
    areas: [...DEFAULT_AREAS],
};

// Safe file load
function loadDB(): DatabaseSchema {
    if (typeof window !== "undefined") {
        // Client-side: try localStorage
        try {
            const stored = localStorage.getItem("caredo_local_db");
            if (stored) {
                return JSON.parse(stored);
            }
        } catch {
            // ignore
        }
        return inMemoryDB;
    }

    const mods = getNodeModules();
    if (!mods) return inMemoryDB;
    const { fs, path } = mods;
    const dbPath = getDbFilePath();

    try {
        if (fs.existsSync(dbPath)) {
            const content = fs.readFileSync(dbPath, "utf-8");
            const parsed = JSON.parse(content);
            inMemoryDB = {
                users: parsed.users || DEFAULT_USERS,
                doctors: parsed.doctors || DEFAULT_DOCTORS,
                appointments: parsed.appointments || DEFAULT_APPOINTMENTS,
                specialties: parsed.specialties || DEFAULT_SPECIALTIES,
                areas: parsed.areas || DEFAULT_AREAS,
            };
        } else {
            // Ensure data directory exists and write initial state
            const dir = path.dirname(dbPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            saveDB(inMemoryDB);
        }
    } catch (err) {
        console.error("Error loading db.json:", err);
    }
    return inMemoryDB;
}

// Safe file save
function saveDB(db: DatabaseSchema) {
    inMemoryDB = db;

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("caredo_local_db", JSON.stringify(db));
        } catch {
            // ignore
        }
        return;
    }

    const mods = getNodeModules();
    if (!mods) return;
    const { fs, path } = mods;
    const dbPath = getDbFilePath();

    try {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
    } catch (err) {
        console.error("Error saving db.json:", err);
    }
}

// Initialize on load
loadDB();

export const db = {
    users: {
        getAll(): User[] {
            return loadDB().users;
        },
        findById(id: string): User | undefined {
            return loadDB().users.find((u) => u.id === id);
        },
        findByEmail(email: string): User | undefined {
            return loadDB().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        },
        create(userData: Omit<User, "id" | "created_at">): User {
            const currentDB = loadDB();
            const existing = currentDB.users.find(
                (u) => u.email.toLowerCase() === userData.email.toLowerCase()
            );
            if (existing) {
                throw new Error("A user with this email already exists");
            }
            const newUser: User = {
                ...userData,
                id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                created_at: new Date().toISOString(),
            };
            currentDB.users.push(newUser);
            saveDB(currentDB);
            return newUser;
        },
    },

    doctors: {
        getAll(): DoctorProfile[] {
            return loadDB().doctors;
        },
        getById(id: string): DoctorProfile | undefined {
            return loadDB().doctors.find((d) => d.user_id === id);
        },
        create(doctorData: DoctorProfile): DoctorProfile {
            const currentDB = loadDB();
            currentDB.doctors.push(doctorData);
            saveDB(currentDB);
            return doctorData;
        },
    },

    appointments: {
        getAll(): Appointment[] {
            return loadDB().appointments;
        },
        getById(id: string): Appointment | undefined {
            return loadDB().appointments.find((a) => a.id === id);
        },
        getByPatient(patientIdOrEmail: string): Appointment[] {
            return loadDB().appointments.filter(
                (a) =>
                    a.patient_id === patientIdOrEmail ||
                    (a.patient_email && a.patient_email.toLowerCase() === patientIdOrEmail.toLowerCase())
            );
        },
        getByDoctor(doctorId: string): Appointment[] {
            return loadDB().appointments.filter((a) => a.doctor_id === doctorId);
        },
        create(appData: Omit<Appointment, "id" | "created_at">): Appointment {
            const currentDB = loadDB();
            const newApp: Appointment = {
                ...appData,
                id: "CRD-" + Math.floor(100000 + Math.random() * 900000),
                created_at: new Date().toISOString(),
            };
            currentDB.appointments.unshift(newApp);
            saveDB(currentDB);
            return newApp;
        },
    },

    specialties: {
        getAll(): Specialty[] {
            return loadDB().specialties;
        },
        getById(id: number): Specialty | undefined {
            return loadDB().specialties.find((s) => s.id === id);
        },
    },

    areas: {
        getAll(): Area[] {
            return loadDB().areas;
        },
        getById(id: number): Area | undefined {
            return loadDB().areas.find((a) => a.id === id);
        },
    },
};

export default db;
