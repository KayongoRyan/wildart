import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Payment from "@/lib/db/Payment";
import Order from "@/lib/db/Order";

export async function POST(req: NextRequest) {
  // Task 8 — verify Flutterwave webhook signature
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
  const signature = req.headers.get("verif-hash");

  if (!signature || signature !== secretHash) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectDB();

  const event = payload?.event as string;
  const data = payload?.data as Record<string, unknown>;

  // Only handle charge completion events
  if (event !== "charge.completed") {
    return NextResponse.json({ received: true });
  }

  const txRef = data?.tx_ref as string;
  const status = data?.status as string;          // "successful" | "failed"
  const transactionId = String(data?.id ?? "");

  // Task 9 — update order status
  try {
    const payment = await Payment.findOne({ txRef });

    if (!payment) {
      console.warn("[webhook] Payment not found for txRef:", txRef);
      return NextResponse.json({ received: true });
    }

    const newPaymentStatus = status === "successful" ? "successful" : "failed";
    const newOrderStatus   = status === "successful" ? "paid" : "failed";

    await Payment.findByIdAndUpdate(payment._id, {
      status: newPaymentStatus,
      providerRef: transactionId,
      webhookPayload: payload,
    });

    await Order.findByIdAndUpdate(payment.orderId, {
      paymentStatus: newOrderStatus,
    });

    console.log(`[webhook] Order ${payment.orderId} → ${newOrderStatus}`);
  } catch (err) {
    console.error("[webhook] DB update failed:", err);
    // Return 200 so Flutterwave doesn't retry — log the error for manual review
  }

  return NextResponse.json({ received: true });
}
