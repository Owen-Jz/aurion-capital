import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const applications = await Application.find()
    .populate("userId", "name email firm")
    .populate("companyId", "name sector slug")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ applications });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { applicationId, action, adminNote } = body;

  if (!applicationId || !action) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const update: Record<string, string> = { status: action };
  if (adminNote) update.adminNote = adminNote;

  if (action === "approved") {
    update.paymentToken = crypto.randomBytes(24).toString("hex");
  }

  const application = await Application.findByIdAndUpdate(
    applicationId,
    update,
    { new: true }
  ).populate("userId", "name email").populate("companyId", "name");

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json({ application });
}
