import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const router = Router();

router.post("/flutterwave", async (req: Request, res: Response) => {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
  const signature = req.headers["verif-hash"] as string;

  if (!signature || signature !== secretHash) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const payload = req.body as Record<string, unknown>;

  await connectDB();

  const event = payload?.event as string;
  const data = payload?.data as Record<string, unknown>;

  if (event !== "charge.completed") {
    return res.json({ received: true });
  }

  const txRef = data?.tx_ref as string;
  const status = data?.status as string;
  const transactionId = String(data?.id ?? "");

  try {
    const payment = await Payment.findOne({ txRef });

    if (!payment) {
      console.warn("[webhook] Payment not found for txRef:", txRef);
      return res.json({ received: true });
    }

    const newPaymentStatus = status === "successful" ? "successful" : "failed";
    const newOrderStatus = status === "successful" ? "paid" : "failed";

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
  }

  return res.json({ received: true });
});

export default router;
