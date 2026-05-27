import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPayment extends Document {
  applicationId: mongoose.Types.ObjectId;
  method: string;
  proofUrl?: string;
  status: string;
  confirmedAt?: Date;
  confirmedBy?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: "Application", required: true, unique: true },
    method: { type: String, default: "crypto" },
    proofUrl: { type: String },
    status: { type: String, default: "pending" },
    confirmedAt: { type: Date },
    confirmedBy: { type: String },
  },
  { timestamps: true }
);

export const Payment = models.Payment ?? model<IPayment>("Payment", PaymentSchema);
