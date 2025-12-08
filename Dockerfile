# Stage 1 — build
FROM node:20-alpine AS builder
# Set working dir
WORKDIR /app

# Install build dependencies
# Copy package manifests first — leverages docker cache when deps don't change
COPY package.json package-lock.json ./

# Use a non-root user for nicer file perms (optional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies (production + dev needed for build)
RUN npm ci

# Copy rest of the app
COPY . .

# Build the Next app
# If you have custom build env vars, pass them via --build-arg or set in CI
RUN npm run build

# Stage 2 — runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Install a tiny runtime if you need only production deps
# Copy only package.json & package-lock for npm ci --production to ensure same deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built output and necessary files from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

# Create non-root user and use it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port
EXPOSE 3000

# Default env
ENV NODE_ENV=production
# Start Next in production mode
CMD ["npm", "start"]
