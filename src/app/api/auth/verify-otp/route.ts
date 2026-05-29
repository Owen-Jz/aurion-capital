import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSession, sessionCookieOptions } from "@/lib/auth";
import { verifyOtp } from "@/lib/otp";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json({ error: "Email and verification code are required." }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (!(await verifyOtp(email, code))) {
    return NextResponse.json(
      { error: "Verification code is invalid or has expired." },
      { status: 401 }
    );
  }

  const token = await createSession(user._id.toString());
  const res = NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
