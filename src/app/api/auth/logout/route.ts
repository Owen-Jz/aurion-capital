import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Session } from "@/lib/models/Session";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await connectDB();
    await Session.deleteOne({ token });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set({ name: SESSION_COOKIE_NAME, value: "", maxAge: 0, path: "/" });
  return res;
}
