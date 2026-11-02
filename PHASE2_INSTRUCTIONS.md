# Porsche 911 Frame — Assignment 4 Phase 2 (Stripe Checkout TEST MODE)

**A PATCH, NOT A REPLACEMENT REPOSITORY.** Extract over your existing `proche-protfolio/` root. Only the listed files are new or changed. In particular, do **not** delete your gallery, cars data, users, existing environment files, Hero videos, `client/vercel.json`, or Git history.

## Files changed / added

- `server/sql/schema.sql` (adds authoritative `services` table; retains four Phase 1 tables)
- `server/scripts/init-db.js` (updates success log only)
- `server/scripts/seed-services.js` (new, populates server-side SAR prices)
- `server/package.json` (adds `stripe` dependency and seed script)
- `server/.env.example` (example variables only; never overwrite your `.env`)
- `server/src/index.js` (webhook BEFORE JSON middleware; mounts API routes)
- `server/src/stripe.js` (test-key-only Stripe client)
- `server/src/middleware/requireAuth.js` (signed session plus DB user check)
- `server/src/routes/services.js` (public list + official prices)
- `server/src/routes/checkout.js` (authorized Checkout session + pending order)
- `server/src/routes/orders.js` (private owned order lookup)
- `server/src/routes/webhook.js` (Stripe signature verification, payment update)
- `client/src/App.jsx` (checks Stripe return query parameters)
- `client/src/components/MainContent.jsx` (passes user to Services)
- `client/src/components/Services.jsx` (DB prices, Buy now button)
- `client/src/components/PaymentStatus.jsx` (new, webhook-status polling)

## Part A — Save working files

From project root in PowerShell:

```powershell
git status
# Keep your existing videos, .env files, and app contents intact.
git add -A
git commit -m "Save working Assignment 4 Phase 1"  # only if changes exist
```

Extract this ZIP **into the current project root**, preserving the `client` / `server` paths. Do NOT extract into a second nested `proche-protfolio` folder. The patch has no `.env` or `vercel.json` files.

## Part B — Configure Stripe TEST keys

1. Log into https://dashboard.stripe.com/ in a test/sandbox environment, or use the Stripe CLI sandbox if eligible (see note below).
2. Copy the **test** secret API key (starts `sk_test_`). Do not use a live key.
3. Open your existing **server/.env**. Preserve `DATABASE_URL`, `SESSION_SECRET`, `PORT`, `CLIENT_ORIGIN`, `NODE_ENV`. Add:

```dotenv
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_LOCAL_CLI_WEBHOOK_SECRET
```

`STRIPE_WEBHOOK_SECRET` is a *different* secret from `STRIPE_SECRET_KEY`. The local CLI webhook signing secret and the live Render/Dashboard endpoint signing secret are also different.

**Important account availability:** Stripe currently does **not** list Saudi Arabia among the countries in which businesses can activate Stripe payment processing. Do not use a false country or business identity to get an account. Stripe's CLI documentation describes creating a temporary test sandbox without an account (`stripe sandbox create`), which can be useful for local testing if account signup is unavailable. It expires after seven days unless claimed. Your instructor may need to provide a Stripe test workspace/account for the live assessment. See https://stripe.com/global and https://docs.stripe.com/cli.

## Part C — Create the schema and seed prices

In the `server/` directory:

```powershell
npm install
npm run db:init
npm run db:seed-services
```

If your current `.env` targets localhost, the commands above seed LOCAL PostgreSQL. For Neon, reuse your existing `.env.neon`:

```powershell
node --env-file=.env.neon scripts/init-db.js
node --env-file=.env.neon scripts/seed-services.js
```

If `.env.neon` doesn't exist, use Neon's SQL Editor to run the SQL for the `services` table, then set `DATABASE_URL` to Neon temporarily for seeding. Do NOT expose Neon passwords or Stripe keys.

Verify in pgAdmin or Neon SQL Editor:

```sql
SELECT code, name, price_cents, currency, active FROM services ORDER BY price_cents;
SELECT * FROM orders ORDER BY id DESC LIMIT 5;
SELECT * FROM order_items ORDER BY id DESC LIMIT 5;
```

Expected service prices: 19900, 54900, 99900 (halalas), equal to SAR 199, SAR 549, SAR 999. `orders` and `order_items` start empty.

## Part D — Test locally with Stripe CLI

Install the official CLI: https://docs.stripe.com/stripe-cli or https://docs.stripe.com/cli/install

In terminal 1 (from `server/`):

```powershell
npm run dev
```

In terminal 2:

```powershell
stripe login
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,checkout.session.expired --forward-to localhost:4000/api/stripe/webhook
```

The CLI displays a **`whsec_...`** signing secret. Add that exact secret to `server/.env` as `STRIPE_WEBHOOK_SECRET` and restart terminal 1's Express server. Don't use your Render webhook secret for local CLI events.

In terminal 3 (from `client/`):

```powershell
npm install
npm run dev
```

1. Visit `http://localhost:5173`.
2. Sign up / log in first.
3. In the Porsche 911 packages, click **Buy now**.
4. On Stripe Checkout (TEST mode), use card **4242 4242 4242 4242**, any future expiry, any CVC, any postal code if requested.
5. After Stripe redirects to `/?checkout=success&session_id=...`, the success page polls `GET /api/orders/by-session/:sessionId` and should show **paid** after the verified webhook reaches Express.
6. In pgAdmin: `SELECT id, user_id, status, total_amount_cents, stripe_checkout_session_id, paid_at FROM orders ORDER BY id DESC LIMIT 5;`

If you see `pending`, check the Stripe CLI terminal for webhook delivery and Express logs. The redirect alone is never proof of payment.

**Do not use `stripe trigger checkout.session.completed` as an end-to-end test of a specific order.** Its synthetic event isn't linked to the real checkout order ID created by the app. Pay through your app's actual Stripe Checkout link instead.

## Part E — Deploy Render + Vercel

1. Confirm the schema and services are initialized/seeding in **Neon** first.
2. In **Render > porsche-portfolio-api > Environment**, add `STRIPE_SECRET_KEY=sk_test_...` and a **new** `STRIPE_WEBHOOK_SECRET` specific to your Stripe Dashboard endpoint. Keep existing `DATABASE_URL` (Neon), `SESSION_SECRET`, `NODE_ENV=production`, and:

```dotenv
CLIENT_ORIGIN=https://portfolio-nine-red-yncidl120i.vercel.app
```

3. In Stripe Dashboard **test mode**, create a webhook/Event Destination for:

`https://porsche-portfolio-api.onrender.com/api/stripe/webhook`

Subscribe to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, and `checkout.session.expired`. Choose the normal **snapshot** events / account events, not thin events. Reveal this endpoint's signing secret (`whsec_...`) and use it for Render's `STRIPE_WEBHOOK_SECRET`. Save/redeploy Render.
4. Push the patch to GitHub; Render redeploys `server/`, Vercel redeploys `client/`. Keep your existing `client/vercel.json` rewrite that forwards `/api/:path*` to `https://porsche-portfolio-api.onrender.com/api/:path*`.
5. Verify `https://porsche-portfolio-api.onrender.com/api/services` returns three rows before testing checkout.
6. Open your deployed Vercel URL, sign in, click Buy now and pay with Stripe test card. Confirm the status page says **paid** and Neon contains an order with status `paid`.

Your browser's success redirect does NOT change `orders.status`. Only the signature-verified Stripe webhook executes the SQL that marks it `paid`.

## Routes and expected responses

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/services` | Public | Official package names and prices from database |
| POST | `/api/checkout` | Logged in | `{ "serviceCode": "single_photo" }` -> `{ orderId, url }` |
| GET | `/api/orders/by-session/:sessionId` | Order owner | `{ order: { id, status, items, ... } }` |
| GET | `/api/orders/:id` | Order owner | Same, by numeric order ID |
| POST | `/api/stripe/webhook` | Stripe signature | Verifies event; only handler marking paid |

A request without login to `POST /api/checkout` returns HTTP **401**. A request providing a fake price will be ignored: only `serviceCode` is read and the server loads `price_cents` from PostgreSQL.

## Debugging

- **503 Stripe is not configured:** set `STRIPE_SECRET_KEY` in `server/.env` or Render; restart.
- **400 Invalid Stripe signature:** ensure raw-body route is registered before `express.json` and check `STRIPE_WEBHOOK_SECRET`; local CLI and Dashboard secrets are different.
- **401 must sign in:** log in with an account from the SAME database that Express is using.
- **403 Unexpected origin:** `CLIENT_ORIGIN` on Render must be the exact Vercel production URL (no slash at end).
- **404 order lookup:** you are not signed in as its purchaser, or wrong session ID.
- **Order stuck pending:** verify Stripe sent a webhook to the correct URL, it has a valid signature, and Stripe recorded `payment_status=paid`; see CLI/Render logs. Free Render instances may need to wake up.
- **Missing services:** run `db:init` and `db:seed-services` on the database the server is connected to.
- **Stripe API rejects SAR:** Confirm your Stripe test account's country/capabilities allow the requested currency and payment method.

## Notes for the assessment

- A *Checkout Session* is a Stripe-hosted payment flow, not an order database row.
- An *order* is initially `pending` and tied to `users.id`.
- Each *order_item* stores the official price at purchase time, preserving it if future prices change.
- `services` is the authoritative catalog of prices, stored only in PostgreSQL.
- The webhook verifies the `Stripe-Signature` against original request bytes. It requires the Stripe Session ID, order metadata, price and currency to match the stored order before marking it paid.
- Order lookup checks `user_id` so a signed-in visitor cannot read another person's orders.
- A browser redirect to success does **not** prove the charge succeeded. Webhook `payment_status=paid` is the trusted signal.

Note: This patch has been syntax-checked. A full live Stripe transaction cannot be executed here without your own Stripe test credentials, webhook endpoint and deployed environment.
