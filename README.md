# AgriSync – Smart Pre-Harvest Coordination Platform

AgriSync is a production-oriented full-stack platform for pre-harvest coordination between Farmers, Buyers, Transporters, Storage Providers, and Admins.

## Stack
- Next.js App Router + TypeScript + TailwindCSS
- i18next multilingual rendering (English, Hindi, Telugu)
- React Query
- Supabase Auth + PostgreSQL + Storage + RLS policies
- Local FastAPI ML service (`/ml-service`)

## Unified Greeting + Language Selection
Single screen at `/language` provides greeting-based selection:
- Hello / English
- नमस्ते / हिंदी
- నమస్కారం / తెలుగు

Selection immediately updates i18next, persists in localStorage, and syncs to `users.language` in Supabase when logged in.

## Project structure
- `frontend/` Next.js app, APIs, dashboards, i18n, language context
- `ml-service/` Local FastAPI prediction service
- `supabase/migrations/001_init.sql` schema + RLS policies

## Setup
### 1) Environment
Copy `.env.example` into `.env.local` in `frontend/` and configure Supabase keys.

### 2) Run ML service
```bash
cd ml-service
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3) Run frontend
```bash
cd frontend
npm install
npm run dev
```

### 4) Apply Supabase migration
Apply `supabase/migrations/001_init.sql` in Supabase SQL editor.

## ML endpoints
- `POST /predict-price`
- `POST /recommend-crop`
- `POST /storage-decision`

## Security notes
- Supabase Auth + role-aware access via RLS
- Dashboard route middleware gate in Next.js
- User language persisted with profile-bound updates
