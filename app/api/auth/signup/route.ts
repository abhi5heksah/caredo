import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { email, password, name, role = "patient" } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const existing = db.users.findByEmail(email);
        if (existing) {
            return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
        }

        const newUser = db.users.create({
            email,
            password,
            name: name || email.split("@")[0],
            role: role as "patient" | "doctor" | "admin",
        });

        const userSession = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        };

        const cookieStore = await cookies();
        cookieStore.set("caredo_session", JSON.stringify(userSession), {
            path: "/",
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        return NextResponse.json({ success: true, user: userSession }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Registration failed" }, { status: 500 });
    }
}
