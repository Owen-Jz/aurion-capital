import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Partnership } from "@/lib/models/Partnership";

/** Public list of published partnerships. */
export async function GET() {
  await connectDB();
  const items = await Partnership.find({ status: "published" })
    .sort({ featured: -1, order: 1, announcedAt: -1 })
    .select("-uploadedByEmail")
    .lean();
  return NextResponse.json({ partnerships: items });
}
