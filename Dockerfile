FROM node:20-slim

WORKDIR /app

ENV npm_config_cache=/tmp/.npm

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install deps fresh each redeploy; generate package-lock on the fly
COPY package.json ./
RUN npm install --include=dev

# Copy the rest of the source (no .git expected)
COPY . .

EXPOSE 8080

# Run DB migrations before starting the dev supervisor
CMD ["sh", "-c", "node scripts/db-init.js && node scripts/dev-supervisor.js"]
