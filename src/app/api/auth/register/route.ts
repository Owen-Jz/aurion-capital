import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/auth";
import { emailAccountSubmitted } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    password,
    firm,
    phone,
    investorType,
    questionnaire,
    otpEnabled,
  } = body;

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
    accountStatus: "pending_review",
    kycStatus: "pending",
    onboardingComplete: false,
    otpEnabled: !!otpEnabled,
    questionnaire: questionnaire
      ? { ...questionnaire, submittedAt: new Date() }
      : undefined,
  });

  // Fire the "under review" email — non-blocking on errors so registration
  // succeeds even if mail transport hiccups.
  emailAccountSubmitted({ to: user.email, name: user.name }).catch((err) => {
    console.error("[register] failed to send submission email:", err);
  });

  // IMPORTANT: do not create a session. Account is on hold until admin approves.
  return NextResponse.json({
    success: true,
    accountStatus: "pending_review",
    message:
      "Your application has been submitted. Our compliance team will review your file and respond within 1–3 business days.",
  });
}
