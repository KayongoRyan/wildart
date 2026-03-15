import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Order from "@/lib/db/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { customerName, customerEmail, customerPhone, amount, currency } = body;

    if (!customerName || !customerEmail || !amount || amount < 1) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and amount." },
        { status: 400 }
      );
    }

    const amt = Number(amount);
    if (isNaN(amt) || amt < 1) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone: customerPhone ?? "",
      items: [
        {
          title: "Conservation Programme Donation",
          artist: "SAWA",
          medium: "",
          size: "",
          price: amt,
          qty: 1,
        },
      ],
      subtotal: amt,
      shipping: 0,
      donation: 0,
      total: amt,
      currency: currency ?? "USD",
      paymentStatus: "pending",
    });

    return NextResponse.json({ orderId: order._id.toString() }, { status: 201 });
  } catch (err) {
    console.error("[donations/create]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
