# buymeadr.ink

A single-page tip jar: pick a drink, pay via Stripe Checkout.

This app used to be split across two repositories — a NestJS API (`buymeadr.ink`)
and a Create React App frontend (`reactmeadr.ink`). Both have been merged into
this single [Next.js](https://nextjs.org/) (App Router) project:

- `app/page.tsx` renders the drink grid from `lib/drinks.json`.
- `components/ProductCard.tsx` starts a Stripe Checkout session and redirects
  the browser to the returned Checkout URL when a drink is clicked.
- `app/api/session/route.ts` is the Route Handler that creates the Stripe
  Checkout Session (replaces the old `StripeSessionController`).

The `reactmeadr.ink` repository is retired; this repo is now the only one to
clone.

## Getting started

```bash
npm install
cp .env.example .env.local # fill in Stripe keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`:

- `STRIPE_SECRET_API_KEY` — server-only Stripe secret key.
- `NEXT_PUBLIC_SITE_URL` — absolute site URL for Stripe Checkout success/cancel redirects (optional locally).

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
npm run test    # vitest
```

## Deployment

Deployed on [Vercel](https://vercel.com/). Connect this repository and set the
environment variables above in the project settings.
