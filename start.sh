#!/bin/bash

# Define paths
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "=========================================================="
echo "🚀 ĐANG KHỞI ĐỘNG YT DOWNLOADER PRO (REACT + PYTHON)"
echo "=========================================================="

# Function to kill background tasks on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# Start Python FastAPI Backend
echo "1️⃣ Khởi động Python FastAPI Backend (Port 8000)..."
cd "$BACKEND_DIR"
./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait briefly for backend startup
sleep 2

# Start React Frontend
echo "2️⃣ Khởi động React Vite Frontend (Port 5173)..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

echo "=========================================================="
echo "✅ HỆ THỐNG ĐÃ SẴN SÀNG!"
echo "👉 Truy cập Web tại: http://localhost:5173"
echo "👉 API Backend tại: http://localhost:8000"
echo "=========================================================="

# Keep script running
wait
