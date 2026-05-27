import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  firm?: string;
  phone?: string;
  investorType: string;
  kycStatus: string;
  isAdmin: boolean;
  onboardingComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    firm: { type: String },
    phone: { type: String },
    investorType: { type: String, default: "individual" },
    kycStatus: { type: String, default: "pending" },
    isAdmin: { type: Boolean, default: false },
    onboardingComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IUser>("User", UserSchema);
