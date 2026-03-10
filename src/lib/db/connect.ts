import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Cached connection for Next.js serverless hot-reload
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: mongoose.Connection | null;
}

let cached = global._mongooseConn ?? null;

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached && cached.readyState === 1) return cached;

  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cached = mongoose.connection;
  global._mongooseConn = cached;
  return cached;
}
