# backend/worker.py — QatarSpec Pro GPU Backend
# تنسيق pipeline: COLMAP → gsplat → SPZ → R2
# المرجع: QCS 2024 / Ashghal RDM 2023

import os
import asyncio
import logging
from typing import Dict, Any

from tasks.colmap_task   import run_colmap
from tasks.gsplat_task   import run_gsplat
from tasks.compress_task import compress_to_spz

logger = logging.getLogger(__name__)

# قاعدة بيانات الـ jobs في الذاكرة
# في الإنتاج: استبدل بـ Redis
jobs_db: Dict[str, Dict[str, Any]] = {}


async def process_job(job_id: str):
    """Pipeline رئيسي: COLMAP → gsplat → SPZ → رفع"""
    job = jobs_db.get(job_id)
    if not job:
        logger.error(f"[worker] Job {job_id} غير موجود")
        return

    images_dir = job["images_dir"]
    job_dir    = job["job_dir"]
    scale_info = job.get("scale_info", {})

    try:
        # ===== المرحلة 1: COLMAP SfM (0→40%) =====
        logger.info(f"[worker] {job_id} — بدأ COLMAP")
        jobs_db[job_id].update({"status": "processing", "progress": 5})

        colmap_dir = os.path.join(job_dir, "colmap")
        ply_path   = await run_colmap(
            images_dir=images_dir,
            output_dir=colmap_dir,
            known_scale=scale_info,
            on_progress=lambda p: _update_progress(job_id, int(p * 40)),
        )

        jobs_db[job_id].update({"progress": 40, "colmap_ply": ply_path})
        logger.info(f"[worker] {job_id} — COLMAP اكتمل: {ply_path}")

        # ===== المرحلة 2: Gaussian Splat (40→80%) =====
        logger.info(f"[worker] {job_id} — بدأ gsplat")
        splat_dir  = os.path.join(job_dir, "splat")
        splat_path = await run_gsplat(
            ply_path=ply_path,
            colmap_dir=colmap_dir,
            output_dir=splat_dir,
            on_progress=lambda p: _update_progress(job_id, 40 + int(p * 40)),
        )

        jobs_db[job_id].update({"progress": 80, "splat_path": splat_path})
        logger.info(f"[worker] {job_id} — gsplat اكتمل: {splat_path}")

        # ===== المرحلة 3: ضغط SPZ + رفع R2 (80→100%) =====
        logger.info(f"[worker] {job_id} — ضغط + رفع R2")
        output_path, download_url = await compress_to_spz(
            splat_path=splat_path,
            job_id=job_id,
            output_dir=job_dir,
        )

        file_size_mb = os.path.getsize(output_path) / (1024 * 1024)

        jobs_db[job_id].update({
            "status":       "completed",
            "progress":     100,
            "output_file":  output_path,
            "download_url": download_url,
            "file_size_mb": round(file_size_mb, 2),
        })
        logger.info(f"[worker] {job_id} ✅ اكتمل — {file_size_mb:.1f}MB")

    except asyncio.CancelledError:
        jobs_db[job_id].update({"status": "cancelled", "error": "تم الإلغاء"})
        raise

    except Exception as err:
        logger.error(f"[worker] {job_id} ❌ فشل: {err}", exc_info=True)
        jobs_db[job_id].update({"status": "failed", "error": str(err)})


def _update_progress(job_id: str, progress: int):
    """تحديث نسبة التقدم"""
    if job_id in jobs_db:
        jobs_db[job_id]["progress"] = max(0, min(100, progress))
