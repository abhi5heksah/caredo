import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("caredo_session");
    cookieStore.delete("caredo_user");
    return NextResponse.json({ success: true });
}
