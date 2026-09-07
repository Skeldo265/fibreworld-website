# Fibre World — Website

A two-part project for the company (panel beating, spray painting, fibreglass fabrication,
and carport manufacturing — Malangalanga, Lilongwe):

- **frontend/** — React site (built with Vite). One-page marketing site: hero, mission,
  who-we-serve, products, services, gallery, and a contact/quote form.
- **backend/** — Node.js + Express API. Receives the contact form submissions, saves them
  to a local JSON file (`backend/data/enquiries.json`) and — if you add email credentials —
  emails them to `fibreworldpat@gmail.com` too.

## Running it locally

You'll need [Node.js](https://nodejs.org) (v18+) installed.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your Gmail app password if you want email alerts
npm run dev
```

The API runs on `http://localhost:4000` by default.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The site runs on `http://localhost:5173` and talks to the backend automatically in dev mode.

## Deploying

- Frontend: `npm run build` inside `frontend/` produces a static `dist/` folder — this can
  be hosted anywhere (Netlify, Vercel, cPanel, etc).
- Backend: deploy `backend/` to any Node host (Render, Railway, a VPS). Set the `PORT` and
  email environment variables there, and point the frontend's `VITE_API_URL` at it.

## What's built in

- Every image you shared (carports, the resin pool, a repaired boat hull, a fibreglass mould,
  the Hilux under a canopy, the translucent roof sheeting) is already placed on the site.
- Send me more photos any time — drop them in `frontend/src/assets/` and I can wire up a
  proper gallery, or just send them to me here and I'll do it.
- The contact form validates on the client, posts to `/api/contact` on the backend, and shows
  a confirmation message. It currently writes to a JSON file so nothing is lost even before
  you configure email.
