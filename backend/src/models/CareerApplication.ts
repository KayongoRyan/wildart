import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareerApplication extends Document {
  type: "internship" | "artists";
  name: string;
  email: string;
  phone: string;
  location?: string;
  currentStatus?: string;
  preferredDuration?: string;
  background?: string;
  portfolioUrl?: string;
  preferredMedium?: string;
  wildlifeExperience?: string;
  availability?: string;
  aboutPractice?: string;
  whySawa?: string;
  createdAt: Date;
}

const CareerApplicationSchema = new Schema<ICareerApplication>(
  {
    type: { type: String, enum: ["internship", "artists"], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    currentStatus: { type: String, default: "" },
    preferredDuration: { type: String, default: "" },
    background: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    preferredMedium: { type: String, default: "" },
    wildlifeExperience: { type: String, default: "" },
    availability: { type: String, default: "" },
    aboutPractice: { type: String, default: "" },
    whySawa: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<ICareerApplication>("CareerApplication", CareerApplicationSchema);
