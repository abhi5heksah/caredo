// lib/db.ts - Local Database for Caredo

import { SEED_DOCTORS } from "@/lib/seed-doctors"
import { SPECIALTIES } from "@/lib/specialties"

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

const DEFAULT_DOCTORS: DoctorProfile[] = SEED_DOCTORS as DoctorProfile[];

const DEFAULT_SPECIALTIES: Specialty[] = SPECIALTIES.map((s) => ({ id: s.id, name: s.name }));

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
function mergeSeedData(parsed: Partial<DatabaseSchema>): { db: DatabaseSchema; upgraded: boolean } {
    let upgraded = false;
    const users = parsed.users?.length ? parsed.users : DEFAULT_USERS;
    const appointments = parsed.appointments?.length ? parsed.appointments : DEFAULT_APPOINTMENTS;
    const areas = parsed.areas?.length ? parsed.areas : DEFAULT_AREAS;
    const specialties =
        parsed.specialties && parsed.specialties.length >= DEFAULT_SPECIALTIES.length
            ? parsed.specialties
            : DEFAULT_SPECIALTIES;
    if (!parsed.specialties || parsed.specialties.length < DEFAULT_SPECIALTIES.length) {
        upgraded = true;
    }

    const doctors = [...(parsed.doctors || [])];
    for (const seed of DEFAULT_DOCTORS) {
        const current = doctors.find((d) => d.user_id === seed.user_id);
        if (!current) {
            doctors.push(seed);
            upgraded = true;
        } else if (current.photo_url && current.photo_url.startsWith("http")) {
            current.photo_url = seed.photo_url;
            upgraded = true;
        }
    }

    return { db: { users, doctors, appointments, specialties, areas }, upgraded };
}

function loadDB(): DatabaseSchema {
    if (typeof window !== "undefined") {
        // Client-side: try localStorage
        try {
            const stored = localStorage.getItem("caredo_local_db");
            if (stored) {
                const parsed = JSON.parse(stored);
                const { db: merged, upgraded } = mergeSeedData(parsed);
                inMemoryDB = merged;
                if (upgraded) saveDB(merged);
                return merged;
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
            if (content && content.trim()) {
                try {
                    const parsed = JSON.parse(content);
                    const { db: merged, upgraded } = mergeSeedData(parsed);
                    inMemoryDB = merged;
                    if (upgraded) saveDB(inMemoryDB);
                } catch {
                    // Fall back cleanly if file is read during concurrent worker writes
                }
            }
        } else {
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
