# VanTravelGeorgia

React (Vite) frontend + Express backend.

Current mode: booking/admin APIs are disabled; contact form is active.

## Stack

- Frontend: React + Vite
- Backend: Express
- Email provider: Resend (`/api/contact`)

## Local setup

1. Install dependencies:
```bash
npm install
```
2. Create env files:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```
3. Put real values in `backend/.env`:
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `ADMIN_API_KEY`
- `EMAIL_FROM` (e.g. `VanTravelGeorgia <onboarding@resend.dev>`)

4. Optional frontend env in `.env`:
- `VITE_SITE_URL` (your public domain)
- `VITE_ENABLE_ADMIN=true` (enable `/admin` UI route)

4. Start backend:
```bash
npm run dev:server
```

5. Start frontend:
```bash
npm run dev -- --host 127.0.0.1 --port 5174
```

6. Open:
- `http://127.0.0.1:5174`

## API endpoints (active)

- `GET /api/health`
- `GET /api/tours`
- `GET /api/tours/:id`
- `POST /api/contact`

## Security note

Never hardcode `RESEND_API_KEY` in source code. Keep it only in `backend/.env`.
