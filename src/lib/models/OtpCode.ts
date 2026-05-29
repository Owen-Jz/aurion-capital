import { Schema, model, models, Document } from "mongoose";

/**
 * Single-use email OTP code.
 *
 * Records are deleted on first successful verification. A TTL index
 * on `expiresAt` cleans up expired codes automatically. The compound
 * index on `email` ensures only one outstanding code per address —
 * issuing a new code overwrites the previous one (upsert).
 */
export interface IOtpCode extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

const OtpCodeSchema = new Schema<IOtpCode>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// TTL index — MongoDB removes the document when expiresAt is reached.
OtpCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpCode =
  models.OtpCode ?? model<IOtpCode>("OtpCode", OtpCodeSchema);
