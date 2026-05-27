import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function POST() {
  const user = await getCurrentUser() as { _id: string } | null;
  if (!user) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  await connectDB();
  await User.findByIdAndUpdate(user._id, { onboardingComplete: true });
  return NextResponse.json({ success: true });
}
