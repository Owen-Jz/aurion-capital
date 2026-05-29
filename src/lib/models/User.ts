import { Schema, model, models, Document } from "mongoose";

export interface IKycQuestionnaire {
  annualIncome?: string;
  netWorth?: string;
  liquidNetWorth?: string;
  sourceOfFunds?: string;
  employmentStatus?: string;
  employer?: string;
  occupation?: string;
  investmentExperience?: string;
  investmentObjectives?: string;
  riskTolerance?: string;
  expectedInvestmentSize?: string;
  isAccredited?: boolean;
  isPep?: boolean;
  taxResidency?: string;
  dateOfBirth?: string;
  ssnLast4?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  submittedAt?: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  firm?: string;
  phone?: string;
  investorType: string;
  kycStatus: string;
  accountStatus: "pending_review" | "approved" | "rejected" | "suspended";
  isAdmin: boolean;
  onboardingComplete: boolean;
  questionnaire?: IKycQuestionnaire;
  otpSecret?: string;
  otpEnabled: boolean;
  otpBackupCodes?: string[];
  approvedAt?: Date;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false }
);

const QuestionnaireSchema = new Schema<IKycQuestionnaire>(
  {
    annualIncome: String,
    netWorth: String,
    liquidNetWorth: String,
    sourceOfFunds: String,
    employmentStatus: String,
    employer: String,
    occupation: String,
    investmentExperience: String,
    investmentObjectives: String,
    riskTolerance: String,
    expectedInvestmentSize: String,
    isAccredited: { type: Boolean, default: false },
    isPep: { type: Boolean, default: false },
    taxResidency: String,
    dateOfBirth: String,
    ssnLast4: String,
    address: AddressSchema,
    submittedAt: Date,
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    firm: { type: String },
    phone: { type: String },
    investorType: { type: String, default: "individual" },
    kycStatus: { type: String, default: "pending" },
    accountStatus: {
      type: String,
      enum: ["pending_review", "approved", "rejected", "suspended"],
      default: "pending_review",
    },
    isAdmin: { type: Boolean, default: false },
    onboardingComplete: { type: Boolean, default: false },
    questionnaire: QuestionnaireSchema,
    otpSecret: { type: String },
    otpEnabled: { type: Boolean, default: false },
    otpBackupCodes: { type: [String], default: [] },
    approvedAt: { type: Date },
    approvedBy: { type: String },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IUser>("User", UserSchema);
