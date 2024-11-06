# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install && npm install sharp

# Copy application code and build
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy built files and serve them from /ui-static
COPY --from=builder /app/.next/static /app/ui-static/_next/static
COPY --from=builder /app/node_modules node_modules

# Expose port
EXPOSE 3000

CMD ["npm", "run", "start"]
