import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Partnership } from "@/lib/models/Partnership";
import { getCurrentAdminUser } from "@/lib/auth";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "partnerships");

async function requireAdmin() {
  const user = (await getCurrentAdminUser()) as
    | { email: string; isAdmin: boolean }
    | null;
  if (!user?.isAdmin) return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const items = await Partnership.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ partnerships: items });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await request.formData();

  const file = form.get("document");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A document file is required." }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: "Only PDF, PNG, JPEG or WebP files are accepted." },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 10 MB limit." }, { status: 413 });
  }

  const partnerName = String(form.get("partnerName") ?? "").trim();
  const relationshipType = String(form.get("relationshipType") ?? "").trim();
  const summary = String(form.get("summary") ?? "").trim();
  const announcedAt = String(form.get("announcedAt") ?? "").trim();

  if (!partnerName || !relationshipType || !summary || !announcedAt) {
    return NextResponse.json(
      { error: "Partner name, relationship type, summary, and announcement date are required." },
      { status: 400 }
    );
  }

  // Persist file to disk under public/uploads/partnerships
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = extensionFor(file.type, file.name);
  const safeStem = crypto.randomBytes(12).toString("hex");
  const filename = `${safeStem}${ext}`;
  const fullPath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(fullPath, buffer);

  await connectDB();
  const created = await Partnership.create({
    partnerName,
    partnerRole: String(form.get("partnerRole") ?? "").trim() || undefined,
    partnerOrganization: String(form.get("partnerOrganization") ?? "").trim() || undefined,
    relationshipType,
    summary,
    announcedAt: new Date(announcedAt),
    documentPath: `/uploads/partnerships/${filename}`,
    documentMime: file.type,
    documentName: file.name,
    uploadedByEmail: admin.email,
    status: (form.get("status") as "draft" | "published" | "archived") ?? "draft",
    featured: form.get("featured") === "true",
    order: Number(form.get("order") ?? 0),
  });

  return NextResponse.json({ partnership: created }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, ...patch } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();
  const updated = await Partnership.findByIdAndUpdate(id, patch, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ partnership: updated });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();
  await Partnership.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

function extensionFor(mime: string, filename: string): string {
  switch (mime) {
    case "application/pdf":
      return ".pdf";
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    default: {
      const dot = filename.lastIndexOf(".");
      return dot >= 0 ? filename.slice(dot) : "";
    }
  }
}
