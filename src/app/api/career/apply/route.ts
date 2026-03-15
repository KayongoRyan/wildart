import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import CareerApplication from "@/lib/db/CareerApplication";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { type, name, email } = body;

    if (!type || !name || !email) {
      return NextResponse.json(
        { error: "Name, email, and application type are required." },
        { status: 400 }
      );
    }

    if (!["internship", "artists"].includes(type)) {
      return NextResponse.json({ error: "Invalid application type." }, { status: 400 });
    }

    await CareerApplication.create({
      type,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(body.phone ?? "").trim(),
      location: String(body.location ?? "").trim(),
      currentStatus: String(body.currentStatus ?? "").trim(),
      preferredDuration: String(body.preferredDuration ?? "").trim(),
      background: String(body.background ?? "").trim(),
      portfolioUrl: String(body.portfolioUrl ?? "").trim(),
      preferredMedium: String(body.preferredMedium ?? "").trim(),
      wildlifeExperience: String(body.wildlifeExperience ?? "").trim(),
      availability: String(body.availability ?? "").trim(),
      aboutPractice: String(body.aboutPractice ?? "").trim(),
      whySawa: String(body.whySawa ?? "").trim(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[career/apply]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
