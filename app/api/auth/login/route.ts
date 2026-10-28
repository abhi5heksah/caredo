import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = db.users.findByEmail(email);
        if (!user || user.password !== password) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const userSession = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const cookieStore = await cookies();
        cookieStore.set("caredo_session", JSON.stringify(userSession), {
            path: "/",
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        return NextResponse.json({ success: true, user: userSession });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
    }
}
