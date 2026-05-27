import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IInvestment extends Document {
  userId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  applicationId: mongoose.Types.ObjectId;
  sharesHeld: number;
  purchasePrice: number;
  currentValue: number;
  purchasedAt: Date;
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    applicationId: { type: Schema.Types.ObjectId, ref: "Application", required: true, unique: true },
    sharesHeld: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Investment = models.Investment ?? model<IInvestment>("Investment", InvestmentSchema);
