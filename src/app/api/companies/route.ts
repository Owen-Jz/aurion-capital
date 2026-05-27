import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Company } from "@/lib/models/Company";

export async function GET() {
  await connectDB();
  const companies = await Company.find({ status: "active" })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ companies });
}
