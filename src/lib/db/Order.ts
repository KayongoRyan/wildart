import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  title: string;
  artist: string;
  medium: string;
  size: string;
  price: number;
  qty: number;
}

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  donation: number;
  total: number;
  currency: "RWF" | "USD";
  paymentStatus: "pending" | "paid" | "failed";
  flutterwaveRef: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  title:  { type: String, required: true },
  artist: { type: String, required: true },
  medium: { type: String, default: "" },
  size:   { type: String, default: "" },
  price:  { type: Number, required: true },
  qty:    { type: Number, required: true, min: 1 },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerName:  { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items:         { type: [OrderItemSchema], required: true },
    subtotal:      { type: Number, required: true },
    shipping:      { type: Number, required: true },
    donation:      { type: Number, default: 0 },
    total:         { type: Number, required: true },
    currency:      { type: String, enum: ["RWF", "USD"], default: "USD" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    flutterwaveRef: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
