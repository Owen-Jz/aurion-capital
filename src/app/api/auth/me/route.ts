import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const u = user as {
    _id: string; name: string; email: string;
    firm?: string; isAdmin: boolean; onboardingComplete: boolean;
  };
  return NextResponse.json({
    user: {
      id: u._id,
      name: u.name,
      email: u.email,
      firm: u.firm,
      isAdmin: u.isAdmin,
      onboardingComplete: u.onboardingComplete,
    },
  });
}
