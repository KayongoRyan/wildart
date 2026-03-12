import { NextRequest, NextResponse } from "next/server";
import Flutterwave from "flutterwave-node-v3";
import { connectDB } from "@/lib/db/connect";
import Payment from "@/lib/db/Payment";
import Order from "@/lib/db/Order";

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY as string,
  process.env.FLUTTERWAVE_SECRET_KEY as string
);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId, customerName, customerEmail, customerPhone, amount, currency, redirectPath } =
      await req.json();

    if (!orderId || !customerEmail || !amount) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Generate a unique transaction reference
    const txRef = `SAWA-${orderId}-${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
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

    // Save payment record
    await Payment.create({
      orderId,
      provider: "flutterwave",
      amount,
      currency: currency ?? "USD",
      status: "pending",
      txRef,
    });

    // Store txRef on the Order for easy lookup later
    await Order.findByIdAndUpdate(orderId, { flutterwaveRef: txRef });

    return NextResponse.json({ paymentLink: response.data.link }, { status: 200 });
  } catch (err) {
    console.error("[payments/initialize]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
