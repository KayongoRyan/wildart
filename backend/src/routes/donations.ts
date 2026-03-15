import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";
import Order from "../models/Order.js";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { customerName, customerEmail, customerPhone, amount, currency } = req.body;

    if (!customerName || !customerEmail || !amount || amount < 1) {
      return res.status(400).json({
        error: "Missing required fields: name, email, and amount.",
      });
    }

    const amt = Number(amount);
    if (isNaN(amt) || amt < 1) {
      return res.status(400).json({ error: "Invalid amount." });
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

    return res.status(201).json({ orderId: order._id.toString() });
  } catch (err) {
    console.error("[donations/create]", err);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
