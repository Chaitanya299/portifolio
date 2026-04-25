# Industrial-Grade Multi-Stage Dockerfile
# Optimized for Next.js 16 Standalone Output

# Stage 1: Dependency Management
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Production Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build-time optimizations
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Ensure build succeeds even without live backend access (using mock URLs)
RUN NEXT_PUBLIC_CONVEX_URL=https://mock.convex.cloud npm run build

# Stage 3: High-Availability Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Security: Run as a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/me', (res) => res.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "server.js"]
