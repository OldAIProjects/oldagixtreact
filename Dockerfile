# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run
FROM node:16-alpine AS runner
WORKDIR /app

# Copy the `node_modules` from builder
COPY --from=builder /app/node_modules ./node_modules
# Copy the `build` from builder
COPY --from=builder /app/build ./build
# Copy the `package.json` and `package-lock.json` from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

EXPOSE 3000

CMD ["npm", "start"]
