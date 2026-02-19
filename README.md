# VanTravelGeorgia

React (Vite) frontend + Node/Express backend for tours, bookings, and admin management.

## Stack

- Frontend: React + Vite
- Backend: Express + MongoDB (Mongoose)
- Emails: Nodemailer (booking/admin notifications)
- Static hosting: Netlify (frontend)

## Local setup

1. Install dependencies:
```bash
npm install
```
2. Create frontend env from `.env.example`.
3. Create backend env from `backend/.env.example`.
4. Run frontend:
```bash
npm run dev
```
5. Run backend (separate terminal):
```bash
npm run dev:server
```

## Netlify deployment (frontend)

1. Push repository to GitHub.
2. In Netlify: `Add new site` -> `Import from Git`.
3. Build settings:
- Build command: `npm run build`
- Publish directory: `dist`
4. Set Netlify environment variables:
- `VITE_API_BASE` = `https://api.yourdomain.com/api`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_ADMIN_API_KEY` (optional)
5. Deploy.

`netlify.toml` already includes SPA redirect so `/admin` and `/tour/:id` work after refresh.

## Backend deployment (required)

Netlify in this setup hosts only the frontend. Deploy backend separately (Railway/Render/Fly.io/VPS).

Backend requirements:

- Run `node backend/server.js`
- Set env from `backend/.env.example`
- Set `CLIENT_URLS` with all frontend origins:
  - `https://<netlify-subdomain>.netlify.app`
  - `https://yourdomain.com`
  - `https://www.yourdomain.com`

## Domain connection (Netlify)

1. In Netlify: `Site settings` -> `Domain management` -> `Add custom domain`.
2. Add both:
- `yourdomain.com`
- `www.yourdomain.com`
3. Configure DNS records at your registrar as Netlify instructs.
4. Wait for SSL provisioning and force HTTPS in Netlify.

## Notes

- Booking form now submits to `${VITE_API_BASE}/bookings`.
- Admin panel uses `${VITE_API_BASE}`.
- Contact form currently uses EmailJS directly from frontend.
