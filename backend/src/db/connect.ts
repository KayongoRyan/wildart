import mongoose from "mongoose";

let cached: mongoose.Connection | null = null;

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached && cached.readyState === 1) return cached;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env");
  }

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    dbName: "wildart",
  });
  cached = mongoose.connection;
  return cached;
}
