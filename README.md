# 911 Frame — Assignment 3 (React + Express + PostgreSQL)

This version continues the existing photography portfolio. It is deliberately split into `client` and `server`, **not Next.js**.

- `client/`: React + Tailwind frontend (Vite); API data is now fetched, not hardcoded.
- `server/`: Node.js + Express backend, `pg` PostgreSQL driver, `bcryptjs` password hashes, `cookie-session` sessions.
- `server/sql/schema.sql`: the two application tables: `users` and `cars`.
- `server/data/cars.js`: the old eight static gallery entries, now used **only by the seed script**.
- `server/scripts/init-db.js`: creates schema.
- `server/scripts/seed.js`: inserts or updates eight cars.

## Installation and local start

Run these commands from the repository root (VS Code PowerShell):

```powershell
cd .\client
npm install
cd ..\server
npm install
Copy-Item .env.example .env
```

Edit `server/.env`. Supply a real local or Neon `DATABASE_URL` and a randomly generated `SESSION_SECRET` with at least 32 characters. For generating a secret on PowerShell with Node:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

If using a **local** PostgreSQL server, first create the database `porsche_portfolio` in pgAdmin or `psql`, and use a local connection string with no `sslmode=require` (see `.env.example` comment).
If using **Neon**, create a database in the dashboard, click **Connect**, and copy the full pooled `DATABASE_URL` (including `sslmode=require`).

From `server/`:

```powershell
npm run db:init
npm run db:seed
npm run dev
```

In a **second** VS Code terminal from `client/`:

```powershell
npm run dev
```

Open `http://localhost:5173`. Vite proxies requests beginning with `/api` to `http://localhost:4000` so the browser sees one origin while developing.

## API routes

- `GET /api/health` → `{ "ok": true }`
- `GET /api/cars` → `{ "cars": [...] }` (database entries)
- `GET /api/cars/count` → `{ "count": 8 }`
- `GET /api/cars/3` → `{ "car": { ... } }` or HTTP 404 if missing
- `POST /api/auth/signup` → JSON `{ "email": "...", "password": "..." }`
- `POST /api/auth/login` → JSON `{ "email": "...", "password": "..." }`
- `GET /api/auth/me` → `{ "user": { ... } }` or `{ "user": null }`
- `POST /api/auth/logout` → `{ "ok": true }`

## Sessions and security

- Passwords are hashed using bcrypt, never stored or returned as plain text.
- Sessions are held in **signed, HTTP-only cookies**, lasting 7 days by default. A cookie holds **only `userId`**, never a password or secret. Browser JS cannot read this cookie.
- `GET /api/auth/me` checks the user ID against PostgreSQL on page load, so authentication survives browser refreshes.
- Cookies are **signed, not encrypted**. They are not independently revocable from the server (a stolen cookie could be replayed until expiry); use an authenticated session store and CSRF protections for a production commercial system.
- Auth routes have basic rate limiting; requests use parameterized SQL queries.
- The local Vite proxy avoids browser cross-origin complexity. A public two-domain deployment will need deliberate cookie/proxy settings and production environment variables (covered in the deployment phase).
- Favorite toggles are still client-side only; persisting favorites would require an additional database table.

## Important file and git safety

`.gitignore` excludes `**/.env` and `**/node_modules`. Keep `server/.env` private. Before committing:

```powershell
git status --short
git check-ignore -v server/.env
```

The `server/.env.example` file contains placeholders only and can be safely committed.

## Credits

Photograph are externally hosted and credited to their respective photographers under the licenses described in `PHOTO_CREDITS.md`. This is sample portfolio content, not an assertion that Khaled personally photographed these cars.

## Deployment (later)

This local project still needs to be deployed to meet the instructor's requirement. The general target is hosted PostgreSQL (Neon), hosted Express API (e.g., Railway), and hosted Vite frontend (e.g., Vercel). Configure an HTTPS `/api` proxy/rewrite on the frontend domain to keep cookie-based requests same-origin.
