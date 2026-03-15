import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const router = Router();

async function getFlutterwave() {
  const pub = process.env.FLUTTERWAVE_PUBLIC_KEY;
  const sec = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!pub || !sec) {
    throw new Error("Flutterwave keys not configured. Add FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY to .env");
  }
  const { default: Flutterwave } = await import("flutterwave-node-v3");
  return new Flutterwave(pub, sec);
}

router.post("/initialize", async (req: Request, res: Response) => {
  try {
    const flw = await getFlutterwave();
    await connectDB();
    const {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      amount,
      currency,
      redirectPath,
    } = req.body;

    if (!orderId || !customerEmail || !amount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const txRef = `SAWA-${orderId}-${Date.now()}`;
    const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
    const redirectUrl = redirectPath
      ? `${baseUrl}${redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`}`
      : `${baseUrl}/order-confirmation`;

    const payload = {
      tx_ref: txRef,
      amount: String(amount),
      currency: currency ?? "USD",
      redirect_url: redirectUrl,
      customer: {
        email: customerEmail,
        phonenumber: customerPhone,
        name: customerName,
      },
      customizations: {
        title: "SAWA Wildlife Art",
        description: "Original wildlife artwork purchase",
        logo: `${baseUrl}/logo.png`,
      },
      payment_options: "mobilemoneyghana,mobilemoneyrwanda,card,banktransfer",
    };

    const response = await flw.Payment.initiate(payload);

    if (response.status !== "success") {
      throw new Error(response.message ?? "Flutterwave initiation failed.");
    }

    await Payment.create({
      orderId,
      provider: "flutterwave",
      amount,
      currency: currency ?? "USD",
      status: "pending",
      txRef,
    });

    await Order.findByIdAndUpdate(orderId, { flutterwaveRef: txRef });

    return res.json({ paymentLink: response.data.link });
  } catch (err) {
    console.error("[payments/initialize]", err);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
