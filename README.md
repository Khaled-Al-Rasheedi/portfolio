````
# 911 FRAME — Porsche 911 Photography Portfolio

A full-stack photography portfolio and booking website dedicated exclusively to the Porsche 911.

## About the Project

I created **911 FRAME** as part of my Frontend and Backend Development Practicum to demonstrate my ability to design, develop, and deploy a complete full-stack web application.

The project began as a responsive photography portfolio built using HTML and CSS. It was later expanded into a React application with Tailwind CSS, followed by the integration of a Node.js and Express backend, PostgreSQL database, user authentication, and Stripe Checkout.

The website showcases Porsche 911 photography, allowing visitors to explore different generations of the iconic sports car, create accounts, and purchase photography services through Stripe's test payment environment.

The application is deployed using **Vercel for the frontend, Render for the backend, and Neon for PostgreSQL**.

**Live Website:** https://portfolio-nine-red-yncidl120i.vercel.app

**Backend API:** https://porsche-portfolio-api.onrender.com

> This is an educational practicum project. Stripe Checkout operates in test mode, meaning no real payments are processed. The photography services are demonstration offerings.

---

## Technologies Used

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Initial styling and layout |
| JavaScript | Application functionality |
| React | Component-based user interface |
| React Hooks | State management and side effects |
| Tailwind CSS | Responsive styling and dark mode |
| Vite | Development server and production builds |
| Fetch API | Communication with backend endpoints |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the backend |
| Express.js | HTTP server and REST API development |
| PostgreSQL | Relational database |
| node-postgres (`pg`) | PostgreSQL connections and SQL queries |
| bcryptjs | Password hashing and verification |
| cookie-session | Signed session cookies |
| express-rate-limit | API request rate limiting |
| dotenv | Environment variable configuration |
| Stripe SDK | Checkout Session creation and payment integration |
| Stripe CLI | Local webhook testing |

### Database and Deployment

| Service | Purpose |
|---|---|
| pgAdmin 4 | Local PostgreSQL database administration |
| Neon | Hosted PostgreSQL database |
| Render | Hosting the Express backend |
| Vercel | Hosting the React frontend |
| GitHub | Version control and deployment integration |
| Git | Source code management |
| Stripe Dashboard | Test payments, webhook configuration, and transaction monitoring |

---

## Features

### 1. Porsche 911 Photography Gallery

- Gallery showcasing eight Porsche 911 models.
- Photographs retrieved dynamically from PostgreSQL through Express.
- Categories including Classic, Carrera, GT Series, and Turbo & Targa.
- Individual photograph descriptions and photographer credits.
- Responsive image gallery.
- Category filtering.
- Favorite toggles.

### 2. Responsive User Interface

- Responsive layouts for desktop, tablet, and mobile.
- Light and dark themes.
- Theme toggle using React state.
- Porsche 911 driving videos in the Hero section.
- Different background videos depending on the selected theme.
- Navigation between Gallery, Services, About, and Contact sections.

### 3. User Authentication

- Account registration.
- Email and password login.
- Password hashing using bcryptjs.
- Signed HTTP-only session cookies.
- Automatic session checking after page refresh.
- Logout functionality.
- Authentication rate limiting.
- PostgreSQL-backed user accounts.

### 4. REST API

The Express backend provides endpoints for:

- Retrieving all Porsche gallery records.
- Retrieving an individual car by ID.
- Counting gallery records.
- Registering new users.
- Logging in and out.
- Checking authenticated sessions.
- Retrieving available photography services.
- Creating Stripe Checkout Sessions.
- Looking up customer orders.
- Receiving Stripe payment webhooks.

### 5. Porsche 911 Photography Services

The website offers three demonstration packages exclusively for Porsche 911 vehicles.

| Service | Description | Price |
|---|---|---|
| Single 911 Photo | One edited, high-resolution photograph | SAR 199 |
| 911 Photo Collection | Eight edited, high-resolution photographs | SAR 549 |
| 911 Cinematic Video | A 30–60-second edited driving video | SAR 999 |

Package details and official prices are retrieved from PostgreSQL.

The backend does not trust prices submitted by the browser.

### 6. Stripe Checkout Integration

- Stripe-hosted Checkout in test mode.
- Authentication required before purchasing.
- Database-backed service prices.
- Pending orders created before checkout.
- Order items saved with their purchased prices.
- Stripe webhook signature verification.
- Payment status updated by verified webhooks.
- Payment success and cancellation handling.
- Order status checks following checkout.
- Order lookup restricted to the authenticated purchaser.
- Test payment processing without charging real money.

### 7. Deployment

- React frontend hosted on Vercel.
- Node.js and Express backend hosted on Render.
- PostgreSQL database hosted on Neon.
- GitHub integration for deployments.
- Environment variables used to protect sensitive credentials.
- API forwarding through Vercel rewrites.

---

## Project Structure

```text
proche-protfolio/
│
├── client/
│   ├── public/
│   │   └── videos/
│   │       ├── porsche-light.mp4
│   │       └── porsche-dark.mp4
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MainContent.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── AuthPanel.jsx
│   │   │   ├── PaymentStatus.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Toggle.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   ├── data/
│   │   └── cars.js
│   │
│   ├── scripts/
│   │   ├── init-db.js
│   │   ├── seed.js
│   │   └── seed-services.js
│   │
│   ├── sql/
│   │   └── schema.sql
│   │
│   ├── src/
│   │   ├── middleware/
│   │   │   └── requireAuth.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── cars.js
│   │   │   ├── services.js
│   │   │   ├── checkout.js
│   │   │   ├── orders.js
│   │   │   └── webhook.js
│   │   │
│   │   ├── db.js
│   │   ├── stripe.js
│   │   └── index.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── .env
│
├── .gitignore
├── PHOTO_CREDITS.md
└── README.md
```

The `.env` file is private and must not be committed to GitHub.

---

## Database Structure

The application uses PostgreSQL with five tables.

| Table | Description |
|---|---|
| `users` | Registered user accounts and hashed passwords |
| `cars` | Porsche 911 gallery records |
| `services` | Photography packages and official prices |
| `orders` | Orders linked to registered users |
| `order_items` | Individual purchased services, quantities, and price snapshots |

### Database Relationships

- Each order belongs to one registered user.
- A user can have multiple orders.
- Each order can contain one or more order items.
- Order items preserve the purchased service name and price, even if the service catalog changes later.
- The services table acts as the authoritative source of prices for Checkout.

The current application allows users to purchase one service package per Checkout Session.

---

# Installation and Local Setup

The following instructions explain how to run the application locally on a Windows computer using PowerShell.

## Prerequisites

Install the following software:

1. Node.js and npm (Node.js 24 or another compatible modern version recommended).
2. Git.
3. PostgreSQL.
4. pgAdmin 4 (optional but recommended).
5. Stripe CLI for local payment testing.

Official websites:

- Node.js: https://nodejs.org/
- Git: https://git-scm.com/
- PostgreSQL: https://www.postgresql.org/
- pgAdmin: https://www.pgadmin.org/
- Stripe CLI: https://docs.stripe.com/stripe-cli

A Stripe testing sandbox with test API credentials is required to test payments.

## Step 1 — Clone the Repository

Open PowerShell or the VS Code terminal.

```powershell
git clone https://github.com/Khaled-Al-Rasheedi/portfolio.git
```

Enter the project directory:

```powershell
cd portfolio
```

The repository contains separate `client` and `server` applications.

## Step 2 — Install Backend Dependencies

Navigate to the server folder:

```powershell
cd server
```

Install dependencies:

```powershell
npm install
```

This installs Express, PostgreSQL drivers, authentication packages, Stripe, and the other backend dependencies.

## Step 3 — Install Frontend Dependencies

Open another terminal and navigate to the client directory:

```powershell
cd client
```

Run:

```powershell
npm install
```

This installs React, Vite, Tailwind CSS, and the frontend dependencies.

## Step 4 — Create a Local PostgreSQL Database

Open pgAdmin 4 and connect to your local PostgreSQL server.

Create a database named:

```text
porsche_portfolio
```

Example PostgreSQL connection information:

| Setting | Value |
|---|---|
| Host | localhost |
| Port | 5432 |
| Database | porsche_portfolio |
| Username | postgres |
| Password | Your PostgreSQL password |

Make sure your local PostgreSQL server is running.

## Step 5 — Configure Backend Environment Variables

Inside the `server` folder, create a `.env` file by copying the example:

```powershell
Copy-Item .env.example .env
```

Open `server/.env` and configure:

```dotenv
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/porsche_portfolio

SESSION_SECRET=YOUR_RANDOM_SESSION_SECRET

PORT=4000
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development

STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LOCAL_WEBHOOK_SECRET
```

Replace all placeholders with your own configuration values.

The database password must be correctly URL-encoded if it contains reserved URL characters.

Generate a secure session secret using:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Copy the generated value into `SESSION_SECRET`.

Important:

- Never commit `.env` to GitHub.
- Never expose Stripe secret keys in React code.
- Only use Stripe test credentials for this project.
- Local and deployed webhook signing secrets are different.

## Step 6 — Initialize the Database

From the `server` directory:

```powershell
npm run db:init
```

This executes:

```text
server/sql/schema.sql
```

The script creates the five database tables:

```text
users
cars
services
orders
order_items
```

The SQL uses `CREATE TABLE IF NOT EXISTS`, so existing tables are not recreated unnecessarily.

## Step 7 — Seed the Porsche Gallery Data

Run:

```powershell
npm run db:seed
```

This reads the initial Porsche records from:

```text
server/data/cars.js
```

The script inserts or updates the eight Porsche gallery records.

Verify the records using pgAdmin:

```sql
SELECT * FROM cars;
```

Or:

```sql
SELECT COUNT(*) FROM cars;
```

Expected count:

```text
8
```

## Step 8 — Seed the Photography Services

From `server`, run:

```powershell
npm run db:seed-services
```

This inserts or updates the three Porsche 911 services and their official prices.

Verify them:

```sql
SELECT code, name, price_cents, currency
FROM services
ORDER BY price_cents;
```

Expected prices:

```text
Single 911 Photo       19900
911 Photo Collection   54900
911 Cinematic Video    99900
```

Prices are stored in halalas, the smallest unit of Saudi Riyals.

For example:

```text
19900 halalas = SAR 199
```

## Step 9 — Start the Express Backend

In the `server` terminal, run:

```powershell
npm run dev
```

The backend should start at:

```text
http://localhost:4000
```

Test the API:

```text
http://localhost:4000/api/health
http://localhost:4000/api/cars
http://localhost:4000/api/cars/count
http://localhost:4000/api/cars/3
http://localhost:4000/api/services
```

For example, the count endpoint should return:

```json
{
  "count": 8
}
```

## Step 10 — Start the React Frontend

Open a separate terminal.

Navigate to `client`:

```powershell
cd client
```

Run:

```powershell
npm run dev
```

Open the website at:

```text
http://localhost:5173
```

Vite forwards local requests beginning with `/api` to the Express backend at `localhost:4000`.

The frontend should display the Porsche gallery and the available booking packages.

For the Hero background videos, ensure the required MP4 files are present:

```text
client/public/videos/porsche-light.mp4
client/public/videos/porsche-dark.mp4
```

If these files are missing, the Hero section will fall back to its background color.

---

# Stripe Checkout Setup

## Step 11 — Obtain Stripe Test Credentials

Sign in to the Stripe Dashboard:

https://dashboard.stripe.com/

Make sure you are using a testing sandbox.

Open the API Keys section and obtain a test secret API key beginning with:

```text
sk_test_
```

Add it to `server/.env`:

```dotenv
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
```

The secret key must remain on the backend.

## Step 12 — Install and Authenticate the Stripe CLI

Install the official Stripe CLI:

https://docs.stripe.com/stripe-cli/install

Verify installation:

```powershell
stripe --version
```

Authenticate:

```powershell
stripe login
```

Complete the browser authorization process.

Make sure the CLI is connected to the same Stripe testing sandbox as the `STRIPE_SECRET_KEY` used by Express.

## Step 13 — Start the Stripe Webhook Listener

Open another terminal.

Run:

```powershell
stripe listen --all-snapshot --forward-to http://localhost:4000/api/stripe/webhook
```

Alternatively, listen only for the application events:

```powershell
stripe listen --events "checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,checkout.session.expired" --forward-to http://localhost:4000/api/stripe/webhook
```

The CLI displays a webhook signing secret beginning with:

```text
whsec_
```

Copy it into `server/.env`:

```dotenv
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LOCAL_CLI_SECRET
```

Restart Express after changing environment variables.

Keep the Stripe CLI running while testing purchases locally.

## Step 14 — Make a Stripe Test Purchase

Make sure all three processes are running:

| Terminal | Command |
|---|---|
| Backend | `npm run dev` inside server |
| Frontend | `npm run dev` inside client |
| Stripe CLI | `stripe listen --all-snapshot --forward-to http://localhost:4000/api/stripe/webhook` |

Open:

```text
http://localhost:5173
```

Follow these steps:

1. Register a new account or sign in.
2. Navigate to the Porsche 911 booking section.
3. Select one of the three service packages.
4. Click **Buy now**.
5. The application redirects to Stripe Checkout.
6. Complete the payment using Stripe's test card.

Test card information:

```text
Card number: 4242 4242 4242 4242
Expiration: Any valid future date
CVC: Any valid CVC
```

After payment, Stripe redirects to the website.

The payment status page checks the order's status and displays confirmation when the webhook updates the database.

No real money is charged.

## Step 15 — Verify the Payment in PostgreSQL

Open pgAdmin and execute:

```sql
SELECT
    id,
    user_id,
    status,
    total_amount_cents,
    stripe_checkout_session_id,
    paid_at
FROM orders
ORDER BY id DESC;
```

A successful payment should have:

```text
status = paid
```

The `paid_at` field should contain a timestamp.

To inspect purchased services:

```sql
SELECT
    o.id AS order_id,
    o.status,
    oi.service_name,
    oi.quantity,
    oi.unit_price_cents
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
ORDER BY o.id DESC;
```

The order should be linked to a registered user and contain the correct service information.

**Only the verified Stripe webhook marks an order as paid.**

Simply returning from Stripe Checkout does not update an order to `paid`.

---

# API Endpoints

## Gallery API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/cars` | Retrieve all Porsche gallery records |
| GET | `/api/cars/count` | Retrieve the number of cars |
| GET | `/api/cars/:id` | Retrieve a car by ID |

## Authentication API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Check the current session |
| POST | `/api/auth/logout` | Log out |

## Services and Payments API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | Retrieve available Porsche 911 packages |
| POST | `/api/checkout` | Create a Stripe Checkout Session |
| GET | `/api/orders/:id` | Retrieve an owned order by ID |
| GET | `/api/orders/by-session/:sessionId` | Retrieve an owned order using its Stripe Session ID |
| POST | `/api/stripe/webhook` | Receive and verify Stripe payment events |

### Example Checkout Request

The client sends:

```http
POST /api/checkout
Content-Type: application/json
```

Request body:

```json
{
  "serviceCode": "single_photo"
}
```

The client does not provide the price.

Express looks up the official price from PostgreSQL, verifies the authenticated user, and creates the pending order.

Then Express creates a Stripe Checkout Session and returns the Checkout URL.

---

# Deployment

The application uses three hosting services:

```text
Visitor
   |
   v
Vercel (React Frontend)
   |
   | HTTP API Requests
   v
Render (Node.js + Express Backend)
   |
   | PostgreSQL Queries
   v
Neon (PostgreSQL Database)
```

Stripe Checkout and its webhook provide the payment flow.

## Step 16 — Create a Neon Database

Open:

https://console.neon.tech/

Create a PostgreSQL project.

Copy its connection string, which resembles:

```dotenv
postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
```

Use the complete connection string as `DATABASE_URL` in your deployed backend.

Initialize the hosted database and seed its data.

If you have a separate `server/.env.neon` file configured:

```powershell
cd server
node --env-file=.env.neon scripts/init-db.js
node --env-file=.env.neon scripts/seed.js
node --env-file=.env.neon scripts/seed-services.js
```

Alternatively, configure `server/.env` temporarily to use Neon before running the normal npm scripts.

Keep your database credentials private.

## Step 17 — Deploy Express to Render

Open:

https://dashboard.render.com/

Create a Web Service connected to the GitHub repository.

Recommended settings:

| Setting | Value |
|---|---|
| Language | Node |
| Branch | main |
| Root Directory | server |
| Build Command | `npm install` |
| Start Command | `npm start` |

Add the following environment variables through Render's dashboard:

```dotenv
DATABASE_URL=YOUR_NEON_DATABASE_URL
SESSION_SECRET=YOUR_SESSION_SECRET

NODE_ENV=production
CLIENT_ORIGIN=https://YOUR_VERCEL_DOMAIN.vercel.app

STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_DASHBOARD_WEBHOOK_SECRET
```

Do not upload your local `.env` file.

Render provides the application port through its environment.

The backend is configured to listen on the host `0.0.0.0`, allowing Render to route requests to it.

After deployment, verify:

```text
https://porsche-portfolio-api.onrender.com/api/health
https://porsche-portfolio-api.onrender.com/api/cars
https://porsche-portfolio-api.onrender.com/api/services
```

## Step 18 — Deploy React to Vercel

Open:

https://vercel.com/

Import the GitHub repository.

Configure:

| Setting | Value |
|---|---|
| Framework | Vite |
| Branch | main |
| Root Directory | client |
| Build Command | `npm run build` |
| Output Directory | dist |
| Install Command | `npm install` |

The frontend uses a Vercel rewrite configuration in:

```text
client/vercel.json
```

Example configuration:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://porsche-portfolio-api.onrender.com/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

The first rule forwards `/api` requests to the deployed Express backend.

The second rule supports client-side application routing.

After deploying, update Render's `CLIENT_ORIGIN` to match the actual production Vercel domain.

## Step 19 — Configure the Deployed Stripe Webhook

In the Stripe Dashboard, while using the testing sandbox, create a webhook event destination.

Webhook URL:

```text
https://porsche-portfolio-api.onrender.com/api/stripe/webhook
```

Subscribe to:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
checkout.session.expired
```

Use account snapshot events compatible with the webhook handler.

Reveal the endpoint's webhook signing secret.

Add this secret to Render:

```dotenv
STRIPE_WEBHOOK_SECRET=whsec_YOUR_DASHBOARD_WEBHOOK_SECRET
```

The deployed webhook signing secret is different from the signing secret generated by Stripe CLI during local testing.

Save the changes and redeploy or restart the backend.

## Step 20 — Test the Deployed Application

Open the deployed Vercel website:

https://portfolio-nine-red-yncidl120i.vercel.app

Test the complete application:

1. Verify the Porsche gallery loads.
2. Verify all three service packages appear.
3. Create an account or sign in.
4. Select a Porsche 911 photography service.
5. Click Buy now.
6. Complete Stripe's test Checkout.
7. Confirm the browser returns to the Vercel website.
8. Verify the payment success page shows `paid`.
9. Check Neon to verify that the order was recorded.
10. Check Stripe Dashboard to confirm successful webhook delivery.

A successful Stripe webhook should normally return HTTP `200`.

---

# How Payment Processing Works

The payment system follows this process:

```text
User clicks Buy now
        |
        v
React sends serviceCode
        |
        v
Express checks authentication
        |
        v
PostgreSQL returns official service price
        |
        v
Express creates a pending order
        |
        v
Express creates Stripe Checkout Session
        |
        v
User completes test payment on Stripe
        |
        v
Stripe sends a signed webhook to Express
        |
        v
Express verifies signature and payment details
        |
        v
PostgreSQL updates order status to paid
        |
        v
React payment status page displays confirmation
```

The backend validates the order against the payment information received from Stripe.

The redirect to the success page is not trusted as payment confirmation.

Only a valid Stripe webhook can mark an order as paid.

---

# Security Features

The application includes the following security measures:

- Password hashing using bcryptjs.
- Signed HTTP-only session cookies.
- Secure cookies when running over HTTPS in production.
- Database access restricted to the backend.
- Environment variables for database credentials and Stripe secrets.
- Parameterized SQL queries to protect against SQL injection.
- Authentication middleware for checkout.
- Order lookup authorization based on the signed-in user's ID.
- Request rate limiting.
- Webhook signature verification using Stripe's signing secret.
- Server-side price lookup before checkout.
- Payment amount and currency verification.
- Database transactions for order creation.
- Idempotency handling for Stripe Checkout requests.
- Duplicate webhook processing safeguards.

These measures support the practicum demonstration but should not be treated as a complete security audit or a production-ready commercial payment system.

---

# Troubleshooting

| Problem | Possible Cause | Solution |
|---|---|---|
| Gallery doesn't load | Express or PostgreSQL unavailable | Check backend and database connection |
| No Porsche records | Database not seeded | Run `npm run db:seed` |
| Services don't appear | Services table empty | Run `npm run db:seed-services` |
| Signup fails | Database or authentication error | Inspect Express logs |
| Session disappears after refresh | Cookie or session configuration problem | Verify session secret, HTTPS, and API routing |
| Checkout requires login | No authenticated user | Sign in first |
| Checkout fails | Stripe key, database, or Checkout Session error | Inspect Express logs |
| Stripe returns an idempotency error | Reused idempotency key for a different Checkout request | Ensure new checkout attempts use unique keys |
| Order stays pending | Webhook not delivered or not verified | Check Stripe CLI/Dashboard and Express logs |
| Webhook returns 400 | Invalid or missing Stripe signature | Verify the correct webhook secret |
| Webhook URL returns 404 in a browser | Browser sent GET instead of POST | Expected for the POST-only webhook |
| Deployed checkout redirects to localhost | Incorrect `CLIENT_ORIGIN` | Update Render's environment variable |
| Vercel can't reach API | Missing or incorrect rewrite | Verify `client/vercel.json` |
| Render initially responds slowly | Free instance may have been idle | Allow it to start and retry |

---

# Project Purpose

The objective of 911 FRAME was to apply the concepts learned throughout the practicum in a single evolving project.

The development covered:

1. Building a responsive website using HTML and CSS.
2. Converting the website to React and Tailwind CSS.
3. Creating reusable React components.
4. Managing component state using React Hooks.
5. Developing a Node.js and Express backend.
6. Creating PostgreSQL tables and database relationships.
7. Implementing database initialization and seed scripts.
8. Building REST API endpoints.
9. Connecting React to Express using HTTP requests.
10. Implementing user registration, login, logout, and sessions.
11. Deploying a full-stack application using GitHub, Vercel, Render, and Neon.
12. Integrating Stripe Checkout in test mode.
13. Implementing authenticated purchases, verified webhooks, and persistent order records.

The final result demonstrates a complete full-stack development workflow, from the initial user interface to database integration, authentication, payment processing, and public deployment.

---

## Photography Credits

The gallery uses sample Porsche 911 photographs credited to their respective photographers.

Refer to `PHOTO_CREDITS.md` for image sources and licensing information.

The gallery is an independent educational portfolio concept and is not affiliated with or endorsed by Porsche AG.

---

## Author

**Khaled Alrasheedi**



Developed as part of a Frontend and Backend Development Practicum.

**GitHub Repository:** https://github.com/Khaled-Al-Rasheedi/portfolio

**Live Portfolio:** https://portfolio-nine-red-yncidl120i.vercel.app
````