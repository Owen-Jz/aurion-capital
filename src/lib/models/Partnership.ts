import { Schema, model, models, Document } from "mongoose";

/**
 * A published partnership / press item.
 *
 * Each record is created by an admin uploading a real, executed document
 * (PDF or image). The public `/partnerships` page renders these as cards
 * with a "View Document" link to the uploaded file. Nothing here is
 * auto-generated — every record corresponds to a file the admin uploaded.
 */
export interface IPartnership extends Document {
  partnerName: string;
  partnerRole?: string;
  partnerOrganization?: string;
  relationshipType: string; // e.g. "Strategic Partner", "Press Release", "Advisory Engagement"
  summary: string;
  announcedAt: Date;
  documentPath: string; // path under /public, e.g. /uploads/partnerships/abc123.pdf
  documentMime: string;
  documentName: string;
  uploadedByEmail: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PartnershipSchema = new Schema<IPartnership>(
  {
    partnerName: { type: String, required: true },
    partnerRole: { type: String },
    partnerOrganization: { type: String },
    relationshipType: { type: String, required: true },
    summary: { type: String, required: true },
    announcedAt: { type: Date, required: true },
    documentPath: { type: String, required: true },
    documentMime: { type: String, required: true },
    documentName: { type: String, required: true },
    uploadedByEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Partnership =
  models.Partnership ?? model<IPartnership>("Partnership", PartnershipSchema);
