#!/bin/sh
set -e

cd /usr/src/app

echo "DEV ENTRYPOINT: user=$(id -u -n) uid=$(id -u) gid=$(id -g)"
echo "PWD: $(pwd)"
echo "Listing top-level files:"
ls -la | sed -n '1,200p'
echo "Node version: $(node -v)  npm: $(npm -v)"

# ensure .next exists and is writable
mkdir -p /usr/src/app/.next
chmod -R 0777 /usr/src/app/.next || true

# If node_modules (volume) is empty, install dependencies into the container volume
if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "node_modules missing or empty — installing dependencies in container..."
  if [ -f package-lock.json ]; then
    npm ci --prefer-offline --no-audit --no-fund || { echo "npm ci failed"; exit 1; }
  else
    npm install --no-audit --no-fund || { echo "npm install failed"; exit 1; }
  fi
else
  echo "node_modules present, skipping install"
fi

echo "Starting nodemon (verbose). Watching src, public, next.config.js, package.json"
# NOTE: --legacy-watch helps on some Windows mounts. --verbose prints events.
exec nodemon \
  --verbose \
  --watch src \
  --watch public \
  --watch next.config.js \
  --watch package.json \
  --ext js,jsx,ts,tsx,json,css,scss,md \
  --delay 150ms \
  --legacy-watch \
  --exec "npm run dev:webpack"
