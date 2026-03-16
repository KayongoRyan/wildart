# Wildart

SAWA Studio — wildlife art from Rwanda.

## Project structure

```
wildart/
├── frontend/     # Next.js app (pages, components, API routes)
├── backend/      # Express API server
├── scripts/      # DB setup scripts
└── .github/      # CI/CD workflows
```

## Getting started

### Frontend

```bash
# From project root
npm run dev

# Or from frontend directory
cd frontend && npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```bash
npm run backend
```

### Database setup

```bash
npm run db:setup
```

## Environment

Copy `frontend/.env.example` to `frontend/.env.local` and fill in your values.

## Docker

```bash
# Create .env at project root with MONGODB_URI (and Flutterwave keys if needed)
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

# Build and run
docker compose up --build

# Frontend: http://localhost:3000
# Backend:  http://localhost:4000
```
