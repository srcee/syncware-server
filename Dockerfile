# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

# Install only prod dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/init-db.sh ./

# Ensure script is executable
RUN chmod +x init-db.sh

# Start the compiled JS app
CMD ["node", "dist/main.js"]
