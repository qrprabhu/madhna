# Vanni Arasu MLA — Petition Platform

Official website for Vanni Arasu, MLA Tindivanam (VCK). Lets constituents submit petitions and track government action through to resolution.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React + Vite + Nitro, SSR)
- [TanStack Router](https://tanstack.com/router) / [TanStack Query](https://tanstack.com/query)
- Tailwind CSS v4
- Supabase (Postgres + Auth) for petitions data
- Framer Motion

## Prerequisites

- **Node.js ≥ 22.12.0**
- **npm** (the project uses `package-lock.json`)
- Git

## Setup on a new machine

1. **Clone the repo**

   ```bash
   git clone https://github.com/qrprabhu/madhna.git
   cd madhna
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and fill in real values:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set the Supabase project URL and anon/publishable key (from your Supabase dashboard → Project Settings → API, or copy them from an existing working `.env` on another machine — this file is gitignored and never committed):

   ```
   VITE_SUPABASE_URL="https://<your-project>.supabase.co"
   VITE_SUPABASE_ANON_KEY="<anon key>"
   VITE_SUPABASE_PROJECT_ID="<project id>"

   SUPABASE_URL="https://<your-project>.supabase.co"
   SUPABASE_PUBLISHABLE_KEY="<anon key>"
   ```

   > ⚠️ Don't leave a stray `.env.local` with placeholder values lying around — Vite loads `.env.local` with **higher priority** than `.env`, so leftover placeholders will silently override real credentials and break all Supabase requests ("Failed to fetch").

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Opens at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`       | Start the dev server                      |
| `npm run build`     | Production build                          |
| `npm run preview`   | Preview the production build locally      |
| `npm start`         | Run the built server (`.output/server`)   |
| `npm run lint`      | Run ESLint                                |
| `npm run format`    | Format the codebase with Prettier         |
