#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d node_modules ]] || [[ ! -d server/node_modules ]] || [[ ! -d client/node_modules ]]; then
  echo "Installing dependencies..."
  npm run install:all
fi

echo "Starting server (http://localhost:3001) and client (http://localhost:5173)..."
npm run dev
