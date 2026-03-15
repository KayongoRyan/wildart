import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy: forwards Flutterwave webhook to the backend.
 * Flutterwave calls this URL; we forward to the backend.
 */
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signature = req.headers.get("verif-hash");

    const res = await fetch(`${BACKEND_URL}/api/webhooks/flutterwave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(signature && { "verif-hash": signature }),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[webhook proxy]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
