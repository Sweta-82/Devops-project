# frontend-GenAi
FROM node:20-alpine AS frontend-builder
COPY ./frontend /app
WORKDIR /app
RUN npm install
RUN npm run build

# backend-GenAi
FROM node:20-alpine

# Install Chromium and dependencies required by Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# tell Puppeteer to use the installed Chromium instead of downloading its own
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY ./backend /app
WORKDIR /app
RUN npm install
COPY --from=frontend-builder /app/dist /app/public
CMD ["node", "server.js"]
