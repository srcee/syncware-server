# Stage 1: Build
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/init-db.sh ./
COPY --from=builder /app/node_modules ./node_modules

RUN chmod +x init-db.sh

CMD ["sh", "init-db.sh"]
