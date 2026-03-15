import "dotenv/config";
import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders.js";
import careerRouter from "./routes/career.js";
import donationsRouter from "./routes/donations.js";
import paymentsRouter from "./routes/payments.js";
import webhooksRouter from "./routes/webhooks.js";
import dbRouter from "./routes/db.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.BASE_URL ?? "http://localhost:3000" }));
app.use(express.json());

// API routes
app.use("/api/orders", ordersRouter);
app.use("/api/career", careerRouter);
app.use("/api/donations", donationsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/webhooks", webhooksRouter);
app.use("/api/db", dbRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "wildart-backend" });
});

function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`\nWildart backend running at http://localhost:${port}`);
    console.log(`  API: http://localhost:${port}/api`);
    console.log(`  Health: http://localhost:${port}/health`);
    console.log(`  DB test: http://localhost:${port}/api/db/test\n`);
  });
  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      console.warn(`Set NEXT_PUBLIC_API_URL=http://localhost:${port + 1} in frontend .env.local if needed.`);
      startServer(port + 1);
    } else {
      throw err;
    }
  });
}

startServer(Number(PORT));
