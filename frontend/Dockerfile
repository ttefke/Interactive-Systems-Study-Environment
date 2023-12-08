# Use node for building the frontend
FROM node:21-alpine as frontend-builder

# Copy package data
WORKDIR /usr/src/app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Cleanly install modules
RUN npm ci

# Copy application data
COPY . .

# Build application
RUN npm run build

# Use nginx as web server
FROM nginx:mainline-alpine
COPY --from=frontend-builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
