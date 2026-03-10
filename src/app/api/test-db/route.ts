import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";

export async function GET() {
  try {
    const conn = await connectDB();
    return NextResponse.json({
      status: "connected",
      database: conn.name,
      host: conn.host,
      port: conn.port,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: String(err) },
      { status: 500 }
    );
  }
}
