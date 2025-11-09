# Astra backend (added automatically)

Assumptions / defaults chosen for integration:
- Frontend: Web app (you confirmed).
- DB: PostgreSQL (recommended).
- File storage: AWS S3 (signed URLs); .env.example provided.
- Realtime: Socket.IO enabled for telemetry & notifications.
- Hosting recommendation: Render / Railway / Docker Compose for local.

Quick start (local, dev):
1. Copy `server/.env.example` to `server/.env` and update values.
2. Start local Postgres + API with Docker Compose:
   - `cd server && docker-compose up --build`
3. Run migrations:
   - `docker exec -it <container_name_for_api_or_db> bash`
   - or run locally: `npm run migrate` (requires psql and DATABASE_URL)

API endpoints:
- GET /health
- GET /api/users/count
- POST /api/sign-s3    { filename, filetype } -> { url, key }
- GET /api/files

Socket.IO events:
- connect -> join(room)
- telemetry -> broadcast to 'dashboard'
- task_update -> broadcast to 'notifications'

Notes:
- This backend is a starting integration. You'll likely need to:
  - Wire your existing frontend auth to validate JWTs (or keep using your existing auth provider and call backend with tokens).
  - Create API routes that mirror your frontend calls (members, approvals, tasks, uploads).
  - Add CORS origins for your deployed frontend domain.
  - Secure AWS credentials via secret manager on hosting platform.

If you want, I can:
- Modify the frontend in the zip to call these endpoints and connect Socket.IO.
- Deploy the backend to Render/Railway and provide a live URL.


## Frontend integration
A simple client helper was added at `src/lib/apiClient.ts` and `src/lib/socket.ts` in the frontend.
Install `socket.io-client` in the frontend: `npm install` in the project root will pick it up.


## Live deployment notes
See DEPLOYMENT_GUIDE.md at project root for provider-specific steps.
