import { Router, Request, Response } from "express";
import { connectDB } from "../db/connect.js";

const router = Router();

router.get("/test", async (_req: Request, res: Response) => {
  try {
    const conn = await connectDB();
    return res.json({
      status: "connected",
      database: conn.name,
      host: conn.host,
      port: conn.port,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: String(err),
    });
  }
});

router.get("/init", async (_req: Request, res: Response) => {
  try {
    const conn = await connectDB();
    const db = conn.db!;

    const collections = await db.listCollections().toArray();
    const names = new Set(collections.map((c) => c.name));

    if (!names.has("orders")) await db.createCollection("orders");
    if (!names.has("careerapplications")) await db.createCollection("careerapplications");
    if (!names.has("payments")) await db.createCollection("payments");

    return res.json({
      status: "ok",
      database: conn.name,
      collections: await db.listCollections().toArray(),
    });
  } catch (err) {
    console.error("[db/init]", err);
    return res.status(500).json({ status: "error", message: String(err) });
  }
});

export default router;
