# Wildart Backend

Express API server for the Wildart app. Handles orders, donations, career applications, and payments.

## Quick Start

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MONGODB_URI and Flutterwave keys
npm run dev
```

Server runs at **http://localhost:4000**

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/orders/create | Create shop order |
| GET | /api/orders/status?tx_ref= | Get order status by Flutterwave ref |
| POST | /api/career/apply | Submit career application |
| POST | /api/donations/create | Create donation |
| POST | /api/payments/initialize | Initialize Flutterwave payment |
| POST | /api/webhooks/flutterwave | Flutterwave webhook (payment status) |
| GET | /api/db/test | Test database connection |
| GET | /api/db/init | Create collections if missing |
| GET | /health | Health check |

## Environment Variables

Create `.env` from `.env.example`:

- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `FLUTTERWAVE_PUBLIC_KEY` - Flutterwave public key
- `FLUTTERWAVE_SECRET_KEY` - Flutterwave secret key
- `FLUTTERWAVE_WEBHOOK_SECRET` - For webhook verification
- `BASE_URL` - Frontend URL (for payment redirects)

## Running with Frontend

1. **Terminal 1** – Backend:
   ```bash
   cd backend && npm run dev
   ```

2. **Terminal 2** – Frontend:
   ```bash
   npm run dev
   ```

3. In frontend `.env.local`, set:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Express app
│   ├── db/
│   │   └── connect.ts    # MongoDB connection
│   ├── models/           # Mongoose models
│   │   ├── Order.ts
│   │   ├── CareerApplication.ts
│   │   └── Payment.ts
│   └── routes/
│       ├── orders.ts
│       ├── career.ts
│       ├── donations.ts
│       ├── payments.ts
│       ├── webhooks.ts
│       └── db.ts
├── package.json
├── tsconfig.json
└── .env.example
```
