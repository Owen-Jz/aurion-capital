import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyPassword, createSession, adminSessionCookieOptions } from "@/lib/auth";

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

  if (!user.isAdmin) {
    return NextResponse.json(
      { error: "This portal is restricted to administrators." },
      { status: 403 }
    );
  }

  if (user.accountStatus === "suspended") {
    return NextResponse.json(
      { error: "This administrator account has been suspended." },
      { status: 403 }
    );
  }

  const token = await createSession(user._id.toString());
  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email },
  });
  res.cookies.set(adminSessionCookieOptions(token));
  return res;
}
