# backend/Dockerfile — QatarSpec Pro GPU Backend
# Base: NVIDIA CUDA 12.1 + Ubuntu 22.04
# يُستخدم مع: docker run --gpus all -p 8000:8000

FROM nvidia/cuda:12.1.0-cudnn8-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# ===== System deps =====
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.11 python3-pip python3.11-dev \
    colmap \
    libgl1 libglib2.0-0 \
    git wget curl \
    && rm -rf /var/lib/apt/lists/*

# link python
RUN ln -sf /usr/bin/python3.11 /usr/bin/python && \
    ln -sf /usr/bin/python3.11 /usr/bin/python3

WORKDIR /app

# ===== Python deps =====
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cu121

# gsplat بعد torch
RUN pip install --no-cache-dir gsplat || echo "gsplat تخطّي — سيستخدم CLI fallback"

# ===== App =====
COPY . .

EXPOSE 8000

# متغيرات البيئة — تُمرَّر عبر docker run -e أو .env
ENV SCAN_BACKEND=colmap-gsplat
ENV UPLOAD_DIR=/tmp/qs-uploads
ENV GSPLAT_ITERATIONS=30000
# ENV R2_ENDPOINT=...
# ENV R2_BUCKET=...
# ENV R2_ACCESS_KEY=...
# ENV R2_SECRET_KEY=...
# ENV R2_PUBLIC_URL=...
# ENV BACKEND_SECRET=...

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
