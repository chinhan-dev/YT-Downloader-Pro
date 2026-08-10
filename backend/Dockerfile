FROM python:3.12-slim

# Install ffmpeg, curl, git, unzip and system dependencies
RUN apt-get update && apt-get install -y ffmpeg curl git unzip && rm -rf /var/lib/apt/lists/*

# Install Deno for yt-dlp JavaScript challenge solver
RUN curl -fsSL https://deno.land/install.sh | sh -s -- -y
ENV PATH="/root/.deno/bin:$PATH"

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

ENV PORT=8000

# Use shell form CMD so ${PORT} expands dynamically for Render ($PORT) or local (8000)
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
