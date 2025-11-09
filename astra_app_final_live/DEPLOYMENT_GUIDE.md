# Astra - Deployment Guide (Live-ready)

This repository is prepared to deploy to Render, Vercel, or Railway. Follow the section for your chosen provider.

IMPORTANT: Replace `<REPLACE_WITH_YOUR_REPO>` in `render.yaml` with your repository URL or use Render's web UI to connect the repo directly. Add required environment variables in the hosting platform's settings (DATABASE_URL, AWS keys, S3 bucket, JWT_SECRET, etc.).

---
## Common ENV variables to set (server)
- DATABASE_URL (Postgres connection string)
- AWS_ACCESS_KEY
- AWS_SECRET_KEY
- S3_BUCKET
- AWS_REGION
- JWT_SECRET
- PORT (default 4000)

## Render (recommended quick path)
1. Create a Render account and connect your Git repository (or use `render.yaml`).
2. Create two services:
   - **Frontend**: Static Web Service. Build command: `npm ci && npm run build`. Start command: `npm run start`.
   - **API**: Web Service (Docker). Point to `server/Dockerfile`.
3. Add environment variables for the API service in Render dashboard. For the frontend service set `NEXT_PUBLIC_API_URL` to your deployed API URL.
4. Deploy. Render will automatically build and deploy from the repo's `main` branch (or whichever branch you choose).

## Vercel
1. Create a Vercel account and import the Git repository.
2. Vercel will auto-detect the Next.js app. For the API (server) either:
   - Deploy the Node API as serverless functions by placing API files under `api/` (refactor needed), or
   - Deploy the API separately on Render/Railway and set `NEXT_PUBLIC_API_URL` in Vercel Environment Variables.
3. Add environment variables under Project Settings -> Environment Variables.

## Railway / Heroku
1. Create a new project and connect your Git repo.
2. If using Railway, create two services (one for Postgres, one for the Node API). Set environment variables accordingly.
3. For frontend, deploy on Vercel or use the root Dockerfile to host both frontend & backend on Railway (advanced).

## Local testing (development)
1. In `server/` copy `.env.example` to `.env` and update values.
2. Run `cd server && docker-compose up --build` to bring up Postgres + API?
3. In project root, copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:4000`.
4. `npm install` and `npm run dev` for Next.js dev server.
5. Visit http://localhost:3000

If you want, I can deploy the API to Render now and give you the live URL — tell me if you'd like me to proceed with Render or Railway and I'll deploy it and return the URL.
