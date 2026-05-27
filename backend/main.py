# backend/main.py — QatarSpec Pro GPU Backend
# FastAPI: استقبال الصور → COLMAP → gsplat → SPZ → R2
# المرجع: QCS 2024 / Ashghal RDM 2023

from __future__ import annotations

import os
import uuid
import asyncio
import logging
import tempfile
from pathlib import Path
from typing import Dict, Any, Optional

from fastapi import FastAPI, File, UploadFile, HTTPException, Header, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from worker import process_job, jobs_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s — %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="QatarSpec GPU Backend", version="1.0.0")

# CORS — فقط من Vercel + localhost
ALLOWED_ORIGINS = [
    "https://qatar-standers.vercel.app",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

BACKEND_SECRET = os.environ.get("BACKEND_SECRET", "")
UPLOAD_DIR     = Path(os.environ.get("UPLOAD_DIR", "/tmp/qs-uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

MIN_IMAGES = 20
MAX_IMAGES = 60


def _verify_secret(x_backend_secret: Optional[str]):
    """تحقق من الـ shared secret بين Vercel والـ backend"""
    if BACKEND_SECRET and x_backend_secret != BACKEND_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")


# ===== POST /process — إنشاء job جديد =====
@app.post("/process")
async def process(
    background_tasks: BackgroundTasks,
    images: list[UploadFile] = File(...),
    session_id: str = "default",
    scale_method: str = "none",     # none | a4 | manual | gps
    known_distance_m: float = 0.0,
    known_pixels: float = 0.0,
    lat: float = 0.0,
    lon: float = 0.0,
    x_backend_secret: Optional[str] = Header(default=None),
):
    _verify_secret(x_backend_secret)

    if not (MIN_IMAGES <= len(images) <= MAX_IMAGES):
        raise HTTPException(
            status_code=422,
            detail=f"يجب بين {MIN_IMAGES} و {MAX_IMAGES} صورة، استلمت {len(images)}"
        )

    # إنشاء job_id + مجلدات
    job_id   = str(uuid.uuid4())
    job_dir  = UPLOAD_DIR / job_id
    img_dir  = job_dir / "images"
    img_dir.mkdir(parents=True)

    # حفظ الصور
    saved = 0
    for img in images:
        if img.content_type not in ("image/jpeg", "image/png", "image/webp"):
            continue
        dest = img_dir / (f"{saved:04d}_" + Path(img.filename or "img.jpg").name)
        dest.write_bytes(await img.read())
        saved += 1

    if saved < MIN_IMAGES:
        raise HTTPException(status_code=422, detail=f"صور صالحة غير كافية: {saved}")

    # بناء scale_info
    scale_info: Dict[str, Any] = {"method": scale_method}
    if scale_method == "a4":
        scale_info["a4_pixels"] = known_pixels
    elif scale_method == "manual":
        scale_info["distance_m"] = known_distance_m
        scale_info["pixels"]     = known_pixels
    elif scale_method == "gps":
        scale_info["lat"] = lat
        scale_info["lon"] = lon

    # تسجيل الـ job
    jobs_db[job_id] = {
        "status":     "queued",
        "progress":   0,
        "session_id": session_id,
        "images_dir": str(img_dir),
        "job_dir":    str(job_dir),
        "scale_info": scale_info,
        "error":      None,
    }

    logger.info(f"[main] Job {job_id} queued — {saved} images — scale: {scale_method}")

    # تشغيل الـ pipeline في الخلفية
    background_tasks.add_task(process_job, job_id)

    return JSONResponse({"job_id": job_id, "images": saved, "status": "queued"})


# ===== GET /status/{job_id} — حالة الـ job =====
@app.get("/status/{job_id}")
async def status(
    job_id: str,
    x_backend_secret: Optional[str] = Header(default=None),
):
    _verify_secret(x_backend_secret)

    job = jobs_db.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job غير موجود")

    return {
        "job_id":       job_id,
        "status":       job["status"],
        "progress":     job["progress"],
        "download_url": job.get("download_url"),
        "file_size_mb": job.get("file_size_mb"),
        "error":        job.get("error"),
    }


# ===== GET /health =====
@app.get("/health")
async def health():
    # فحص GPU
    gpu_available = False
    gpu_info = "CPU only"
    try:
        import torch
        if torch.cuda.is_available():
            gpu_available = True
            gpu_info = torch.cuda.get_device_name(0)
    except ImportError:
        pass

    return {
        "status":        "ok",
        "gpu_available": gpu_available,
        "gpu_info":      gpu_info,
        "jobs_active":   sum(1 for j in jobs_db.values() if j["status"] == "processing"),
        "jobs_total":    len(jobs_db),
    }
