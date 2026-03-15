import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPayment extends Document {
  orderId: Types.ObjectId;
  provider: "flutterwave";
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed";
  providerRef: string;
  txRef: string;
  webhookPayload: Record<string, unknown>;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    provider: { type: String, enum: ["flutterwave"], default: "flutterwave" },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    },
    providerRef: { type: String, default: "" },
    txRef: { type: String, required: true, unique: true },
    webhookPayload: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
