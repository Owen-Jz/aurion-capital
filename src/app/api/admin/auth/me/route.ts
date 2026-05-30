import { NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const u = user as { _id: string; name: string; email: string; isAdmin: boolean };
  if (!u.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({
    user: { id: u._id, name: u.name, email: u.email, isAdmin: u.isAdmin },
  });
}
