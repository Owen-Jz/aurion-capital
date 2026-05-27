import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  tierId: mongoose.Types.ObjectId;
  tierName: string;
  tierPrice: number;
  tierShares: number;
  amount: number;
  status: string;
  adminNote?: string;
  paymentToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    tierId: { type: Schema.Types.ObjectId, required: true },
    tierName: { type: String, required: true },
    tierPrice: { type: Number, required: true },
    tierShares: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    adminNote: { type: String },
    paymentToken: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const Application = models.Application ?? model<IApplication>("Application", ApplicationSchema);
