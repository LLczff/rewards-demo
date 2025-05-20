# Dependencies stage
FROM node:23-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Build stage
FROM node:23-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Run stage
FROM node:23-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./
ENV NODE_ENV=production
CMD ["node", ".next/standalone/server.js"]