/**
 * Create collections in the wildart database.
 * Run: node scripts/create-collections.mjs
 * (from backend folder, or: cd backend && node scripts/create-collections.mjs)
 */
import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wildart";

async function main() {
  console.log("Connecting to", MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"), "...");
  await mongoose.connect(MONGODB_URI, { dbName: "wildart" });
  const db = mongoose.connection.db;

  const existing = await db.listCollections().toArray();
  const names = new Set(existing.map((c) => c.name));

  const collections = ["orders", "careerapplications", "payments"];
  for (const name of collections) {
    if (names.has(name)) {
      console.log(`  ${name} - already exists`);
    } else {
      await db.createCollection(name);
      console.log(`  ${name} - created`);
    }
  }

  // Create indexes
  await db.collection("orders").createIndex({ customerEmail: 1 });
  await db.collection("orders").createIndex({ paymentStatus: 1 });
  await db.collection("orders").createIndex({ createdAt: -1 });
  await db.collection("careerapplications").createIndex({ email: 1 });
  await db.collection("careerapplications").createIndex({ type: 1 });
  await db.collection("careerapplications").createIndex({ createdAt: -1 });
  await db.collection("payments").createIndex({ orderId: 1 });
  await db.collection("payments").createIndex({ txRef: 1 }, { unique: true });
  await db.collection("payments").createIndex({ status: 1 });
  console.log("  Indexes created");

  const final = await db.listCollections().toArray();
  console.log("\nCollections in wildart:", final.map((c) => c.name).join(", "));
  console.log("Done.\n");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
