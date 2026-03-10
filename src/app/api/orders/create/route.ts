import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Order from "@/lib/db/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      shipping,
      donation,
      total,
      currency,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      shipping,
      donation: donation ?? 0,
      total,
      currency: currency ?? "USD",
      paymentStatus: "pending",
    });

    return NextResponse.json({ orderId: order._id.toString() }, { status: 201 });
  } catch (err) {
    console.error("[orders/create]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
