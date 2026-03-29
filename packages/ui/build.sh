#!/bin/bash

cd /vercel/share/v0-project/packages/ui

echo "Installing dependencies..."
npm install

echo "Building package with tsup..."
npm run build

echo "Build complete! dist/ folder created."
ls -la dist/
