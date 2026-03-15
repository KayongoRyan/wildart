import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";
import Order from "../models/Order.js";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    await connectDB();
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
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !items?.length) {
      return res.status(400).json({ error: "Missing required fields." });
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

    return res.status(201).json({ orderId: order._id.toString() });
  } catch (err) {
    console.error("[orders/create]", err);
    return res.status(500).json({ error: "Server error." });
  }
});

router.get("/status", async (req: Request, res: Response) => {
  const txRef = req.query.tx_ref as string;

  if (!txRef) {
    return res.status(400).json({ error: "tx_ref required" });
  }

  try {
    await connectDB();
    const order = await Order.findOne({ flutterwaveRef: txRef }).lean();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json({
      paymentStatus: order.paymentStatus,
      customerName: order.customerName,
      total: order.total,
      currency: order.currency,
      items: order.items,
      createdAt: order.createdAt,
    });
  } catch (err) {
    console.error("[orders/status]", err);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
