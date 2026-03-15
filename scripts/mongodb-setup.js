/**
 * MongoDB Setup Script
 * Run with: mongosh wildart < scripts/mongodb-setup.js
 * Or connect first: mongosh
 * Then: use wildart
 * Then paste the commands below.
 */

// Switch to wildart database (creates it if it doesn't exist)
db = db.getSiblingDB("wildart");

// Create collections (MongoDB creates them on first insert, but we can create empty ones)
db.createCollection("orders");
db.createCollection("careerapplications");
db.createCollection("payments");

// Create indexes for common queries
db.orders.createIndex({ customerEmail: 1 });
db.orders.createIndex({ paymentStatus: 1 });
db.orders.createIndex({ createdAt: -1 });

db.careerapplications.createIndex({ email: 1 });
db.careerapplications.createIndex({ type: 1 });
db.careerapplications.createIndex({ createdAt: -1 });

db.payments.createIndex({ orderId: 1 });
db.payments.createIndex({ txRef: 1 }, { unique: true });
db.payments.createIndex({ status: 1 });

// Verify
print("Collections in wildart database:");
printjson(db.getCollectionNames());

print("\nSetup complete. You can now:");
print("  - View data: db.orders.find()");
print("  - Insert test order: db.orders.insertOne({ customerName: 'Test', customerEmail: 'test@example.com', ... })");
