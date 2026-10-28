import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
    const cookieStore = await cookies();
    const sessionStr = cookieStore.get("caredo_session")?.value || cookieStore.get("caredo_user")?.value;
    if (!sessionStr) {
        return NextResponse.json({ user: null });
    }

    try {
        const session = JSON.parse(sessionStr);
        const user = db.users.findById(session.id) || db.users.findByEmail(session.email);
        if (!user) {
            return NextResponse.json({ user: null });
        }
        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                phone: user.phone,
                created_at: user.created_at,
            },
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}
