import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { User } from "@/lib/models/User";
import { Company } from "@/lib/models/Company";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const [pendingApplications, totalApplications, totalInvestors, activeCompanies] = await Promise.all([
    Application.countDocuments({ status: "pending" }),
    Application.countDocuments(),
    User.countDocuments({ isAdmin: false }),
    Company.countDocuments({ status: "active" }),
  ]);

  return NextResponse.json({ stats: { pendingApplications, totalApplications, totalInvestors, activeCompanies } });
}
