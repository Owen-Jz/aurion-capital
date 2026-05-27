import { Schema, model, models, Document } from "mongoose";

export interface IShareTier {
  name: string;
  price: number;
  shares: number;
  order: number;
  available: boolean;
}

export interface IHighlight {
  stat: string;
  label: string;
  sub?: string;
}

export interface ITeamMember {
  name: string;
  title: string;
  bio: string;
  initials: string;
}

export interface IFundUse {
  label: string;
  pct: number;
  color: string;
  description: string;
}

export interface IMetric {
  label: string;
  value: string;
  trend?: string;
}

export interface IRisk {
  title: string;
  body: string;
}

export interface ICompany extends Document {
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  description: string;
  baseValuation: number;
  totalShares: number;
  sharesRemaining: number;
  minInvestment: number;
  status: string;
  tiers: IShareTier[];
  highlights: IHighlight[];
  team: ITeamMember[];
  useOfFunds: IFundUse[];
  metrics: IMetric[];
  risks: IRisk[];
  createdAt: Date;
  updatedAt: Date;
}

const ShareTierSchema = new Schema<IShareTier>(
  { name: String, price: Number, shares: Number, order: { type: Number, default: 0 }, available: { type: Boolean, default: true } },
  { _id: true }
);

const CompanySchema = new Schema<ICompany>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sector: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    baseValuation: { type: Number, required: true },
    totalShares: { type: Number, required: true },
    sharesRemaining: { type: Number, required: true },
    minInvestment: { type: Number, required: true },
    status: { type: String, default: "draft" },
    tiers: [ShareTierSchema],
    highlights: [{ stat: String, label: String, sub: String }],
    team: [{ name: String, title: String, bio: String, initials: String }],
    useOfFunds: [{ label: String, pct: Number, color: String, description: String }],
    metrics: [{ label: String, value: String, trend: String }],
    risks: [{ title: String, body: String }],
  },
  { timestamps: true }
);

export const Company = models.Company ?? model<ICompany>("Company", CompanySchema);
