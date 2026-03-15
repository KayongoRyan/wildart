import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";
import CareerApplication from "../models/CareerApplication.js";

const router = Router();

router.post("/apply", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const body = req.body;
    const { type, name, email } = body;

    if (!type || !name || !email) {
      return res.status(400).json({
        error: "Name, email, and application type are required.",
      });
    }

    if (!["internship", "artists"].includes(type)) {
      return res.status(400).json({ error: "Invalid application type." });
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

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("[career/apply]", err);
    const msg =
      err instanceof Error && err.message?.includes("MONGODB")
        ? "Database not configured. Please add MONGODB_URI to .env"
        : "Server error. Please try again.";
    return res.status(500).json({ error: msg });
  }
});

export default router;
