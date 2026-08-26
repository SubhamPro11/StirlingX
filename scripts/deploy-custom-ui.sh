#!/usr/bin/env bash
# ==============================================================================
# Stirling PDF — Custom UI Build & Deploy Script
# Builds the custom frontend UI and deploys static assets to customFiles/static/
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$REPO_ROOT/frontend"
DIST_DIR="$FRONTEND_DIR/editor/dist"
CUSTOM_STATIC_DIR="$REPO_ROOT/customFiles/static"
MODE="${1:-core}"

echo "===================================================="
echo "  Stirling PDF — Custom UI Build & Deploy Tool     "
echo "===================================================="

# 1. Prepare environment
echo "[1/3] Preparing build environment..."
cd "$FRONTEND_DIR"
npx tsx editor/scripts/setup-env.mts
node editor/scripts/generate-icons.js
node editor/scripts/generate-og-metadata.mjs

# 2. Build production assets
echo "[2/3] Building production frontend ($MODE mode)..."
npx vite build editor --mode "$MODE"

if [ ! -d "$DIST_DIR" ]; then
  echo "Build failed: $DIST_DIR does not exist." >&2
  exit 1
fi

# 3. Deploy to customFiles/static/
echo "[3/3] Deploying static override files to $CUSTOM_STATIC_DIR..."
mkdir -p "$CUSTOM_STATIC_DIR"
rm -rf "${CUSTOM_STATIC_DIR:?}"/*
cp -R "$DIST_DIR"/* "$CUSTOM_STATIC_DIR"/

COUNT=$(find "$CUSTOM_STATIC_DIR" -type f | wc -l)
echo ""
echo "✅ Success! $COUNT static files deployed to customFiles/static/"
echo "Mount ./customFiles:/customFiles:rw in docker-compose or run Stirling-PDF to serve the new UI."
