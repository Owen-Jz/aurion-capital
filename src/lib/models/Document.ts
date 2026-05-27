import mongoose, { Schema, model, models, Document as MongoDocument } from "mongoose";

export interface IDocument extends MongoDocument {
  userId: mongoose.Types.ObjectId;
  investmentId: mongoose.Types.ObjectId;
  type: string;
  content?: string;
  signed: boolean;
  signedAt?: Date;
  signedIp?: string;
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    investmentId: { type: Schema.Types.ObjectId, ref: "Investment", required: true },
    type: { type: String, required: true },
    content: { type: String },
    signed: { type: Boolean, default: false },
    signedAt: { type: Date },
    signedIp: { type: String },
  },
  { timestamps: true }
);

export const InvestmentDocument = models.Document ?? model<IDocument>("Document", DocumentSchema);
