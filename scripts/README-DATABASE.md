# Wildart Database Setup

## Quick Setup (MongoDB Shell)

### Option 1: Run the setup script

```bash
mongosh wildart < scripts/mongodb-setup.js
```

### Option 2: Run commands manually in mongosh

1. Open MongoDB shell:
   ```bash
   mongosh
   ```

2. Create and switch to the wildart database:
   ```javascript
   use wildart
   ```

3. Create the collections:
   ```javascript
   db.createCollection("orders")
   db.createCollection("careerapplications")
   db.createCollection("payments")
   ```

4. Verify:
   ```javascript
   show collections
   ```

---

## CRUD Examples (MongoDB Shell)

### Orders

```javascript
use wildart

// CREATE - Add an order
db.orders.insertOne({
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+250700000000",
  items: [
    { title: "Amahoro", artist: "Christine Mukamana", medium: "Graphite", size: "50×70cm", price: 480, qty: 1 }
  ],
  subtotal: 480,
  shipping: 120,
  donation: 0,
  total: 600,
  currency: "USD",
  paymentStatus: "pending",
  flutterwaveRef: "",
  createdAt: new Date()
})

// READ - Find all orders
db.orders.find().pretty()

// READ - Find by email
db.orders.find({ customerEmail: "john@example.com" })

// UPDATE - Mark order as paid
db.orders.updateOne(
  { _id: ObjectId("PASTE_ID_HERE") },
  { $set: { paymentStatus: "paid" } }
)

// DELETE - Remove an order
db.orders.deleteOne({ _id: ObjectId("PASTE_ID_HERE") })
```

### Career Applications

```javascript
use wildart

// CREATE
db.careerapplications.insertOne({
  type: "internship",
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+250788123456",
  currentStatus: "Student",
  preferredDuration: "3 months",
  background: "Art student",
  aboutPractice: "I love wildlife art",
  whySawa: "Want to learn from the best",
  createdAt: new Date()
})

// READ
db.careerapplications.find().pretty()
db.careerapplications.find({ type: "internship" })
```

### Payments

```javascript
use wildart

// READ
db.payments.find().pretty()
db.payments.find({ status: "successful" })
```

---

## Connection String

In `.env.local`:

```
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/wildart

# MongoDB Atlas
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/wildart?retryWrites=true&w=majority
```

---

## Collections Summary

| Collection          | Purpose                          |
|---------------------|----------------------------------|
| orders              | Shop orders, donations, checkout |
| careerapplications  | Internship & artist applications |
| payments            | Flutterwave payment records      |
