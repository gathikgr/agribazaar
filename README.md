# AgriLink (Next.js + FastAPI + Supabase-ready)

AgriLink is a full stack agricultural marketplace demo connecting **Farmers**, **Buyers**, and **Storage Providers** with role-based dashboards, trust scoring, transport flows, storage bidding, and AI-powered predictions.

## Tech stack
- Frontend: Next.js + TailwindCSS + Chart.js
- Backend: FastAPI
- Database/Auth: Supabase-ready design with local seed fallback data
- AI: Random Forest regression microservice (crop price + yield predictions)

## Project structure
- `frontend/` Next.js app (landing page, dashboards, marketplace)
- `backend/` FastAPI APIs, in-memory seed data, trust score and AI services

## Run locally
### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Seed capabilities included
- Role-based signup endpoint accepting full role profile payloads.
- Farmer listing creation with harvest time, quantity, quality grade, photos, and price.
- Buyer marketplace browse, sample request/place-order UI hooks.
- Storage provider capacity listing + storage bidding endpoints.
- Profit analytics endpoint with projected revenue/profit chart series.
- AI insights endpoint using RandomForestRegressor.

## Key backend endpoints
- `POST /auth/signup`
- `GET /dashboard/{role}` where role = `Farmer`, `Buyer`, `Storage Provider`
- `GET /marketplace` with filter query params
- `POST /farmer/listings`
- `POST /storage/needs`
- `POST /storage/bids`
- `GET /transport/options`
- `POST /analytics/profit`
- `POST /ai/predict`

## Example farmer signup payload
```json
{
  "role": "Farmer",
  "phone": "+919876543210",
  "otp": "123456",
  "profile": {
    "name": "Ramesh Patil",
    "gps_location": "19.9975,73.7898",
    "crops_grown": ["Wheat", "Maize"],
    "years_of_experience": 12,
    "bank_account": "XXXXXX8732",
    "languages": ["Marathi", "Hindi"],
    "kisan_pehchaan_patra_url": "https://example.com/doc.pdf"
  }
}
```

## Supabase integration
Create these env vars when connecting a live Supabase project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

This repository uses realistic dummy seed data by default so it runs without external APIs.
