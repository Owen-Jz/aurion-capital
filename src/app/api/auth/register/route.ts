import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword, createSession, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, firm, phone, investorType } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashPassword(password),
    firm: firm || undefined,
    phone: phone || undefined,
    investorType: investorType || "individual",
  });

  const token = await createSession(user._id.toString());
  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, onboardingComplete: false },
  });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
