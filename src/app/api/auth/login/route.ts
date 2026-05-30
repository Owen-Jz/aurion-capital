import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyPassword, createSession, sessionCookieOptions } from "@/lib/auth";
import { issueOtp } from "@/lib/otp";
import { emailOtpCode } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  /* ── Admin accounts must use the dedicated admin portal ─────────── */
  if (user.isAdmin) {
    return NextResponse.json(
      {
        error:
          "Administrator accounts cannot access the investor portal. Please sign in at /admin/login.",
        redirectTo: "/admin/login",
      },
      { status: 403 }
    );
  }

  /* ── Account-status gating ────────────────────────────────────────── */
  if (user.accountStatus === "pending_review") {
    return NextResponse.json(
      {
        error:
          "Your account is currently under compliance review. You will receive an email as soon as your portfolio is activated.",
        accountStatus: "pending_review",
      },
      { status: 403 }
    );
  }
  if (user.accountStatus === "rejected") {
    return NextResponse.json(
      {
        error:
          "Your application was not approved. Please contact Investor Relations for further information.",
        accountStatus: "rejected",
      },
      { status: 403 }
    );
  }
  if (user.accountStatus === "suspended") {
    return NextResponse.json(
      {
        error: "Your account has been suspended. Please contact Investor Relations.",
        accountStatus: "suspended",
      },
      { status: 403 }
    );
  }

  /* ── Two-factor email OTP ─────────────────────────────────────────── */
  if (user.otpEnabled) {
    const code = await issueOtp(user.email);
    await emailOtpCode({ to: user.email, name: user.name, code });
    return NextResponse.json({
      requiresOtp: true,
      email: user.email,
      message: "A verification code has been sent to your email address.",
    });
  }

  /* ── No OTP required → grant session ──────────────────────────────── */
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
