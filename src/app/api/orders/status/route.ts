import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Order from "@/lib/db/Order";

export async function GET(req: NextRequest) {
  const txRef = req.nextUrl.searchParams.get("tx_ref");

  if (!txRef) {
    return NextResponse.json({ error: "tx_ref required" }, { status: 400 });
  }

  await connectDB();

  const order = await Order.findOne({ flutterwaveRef: txRef }).lean();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    paymentStatus: order.paymentStatus,
    customerName: order.customerName,
    total: order.total,
    currency: order.currency,
    items: order.items,
    createdAt: order.createdAt,
  });
}
