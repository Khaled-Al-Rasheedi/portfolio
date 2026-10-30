# 911 Frame — React + Tailwind portfolio

A Porsche 911 photography portfolio adapted from a React/Vite assignment.

## Requirements

- Node.js compatible with your installed Vite version
- Existing Vite + React project using JavaScript (not TypeScript)
- Tailwind CSS v4 and `@tailwindcss/vite`

## How to use in your existing repository

1. Back up/commit your original project (`git add -A`, `git commit -m "Save original developer portfolio"`).
2. Copy this archive's **index.html, vite.config.js, and src/** over the matching files in your existing repository.
3. Keep the existing `package.json`, `package-lock.json`, `eslint.config.js`, and `.git` folder.
4. Delete obsolete `style.css` and `src/App.css` if present.
5. Run `npm install` and `npm run dev`.

## Features

- 8 Porsche 911 gallery photographs from Wikimedia Commons
- `object-cover` image crops, consistent `aspect-[4/3]` frames
- Category filter powered by React `useState`
- Reusable controlled `Toggle` for dark mode and each photo's favorite status
- Light palette: white + burgundy / dark red
- Dark palette: black + dark red / muted gold
- Responsive mobile-first Tailwind grid
- Short About section + mailto "Book a Shoot" link

## Before presenting/publishing

**IMPORTANT:** Replace `YOUR_EMAIL@example.com` in `src/components/About.jsx` with your own address. The Book a Shoot link opens an email application; it does not submit a form or store anything in a database.

The demo images are **not** the site creator's photographs. Each photo links to its Wikimedia Commons attribution, and `PHOTO_CREDITS.md` lists all authors and sources. See `PHOTO_CREDITS.md` for attribution and license information. External image URLs require internet access. Replace image URLs in `src/data/projects.js` with your own properly licensed local image paths if preferred.

## Project file mapping

We retained your existing component and filename structure to make updating easier:
- `src/data/projects.js` now exports `photos` rather than software projects
- `Projects.jsx` is the gallery and category filter
- `ProjectCard.jsx` is the photo card

## Commands

```powershell
npm install
npm run dev
npm run build
```
