# Multistage build: build Next.js frontend, then copy server and serve with node
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/server ./server
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000 4000
ENV NODE_ENV=production
# Start both processes (frontend via next start, backend via node)
CMD ["sh", "-c", "node server/index.js & npm run start"]
