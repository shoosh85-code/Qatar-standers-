# backend/tasks/colmap_task.py — QatarSpec Pro
# تشغيل COLMAP SfM لاستخراج النقاط والـ camera poses
# المرجع: QCS 2024 / Ashghal RDM 2023

from __future__ import annotations

import os
import asyncio
import logging
import shutil
from pathlib import Path
from typing import Callable, Dict, Any, Optional

logger = logging.getLogger(__name__)

COLMAP_BIN = os.environ.get("COLMAP_BIN", "colmap")


async def run_colmap(
    images_dir: str,
    output_dir: str,
    known_scale: Optional[Dict[str, Any]] = None,
    on_progress: Optional[Callable[[float], None]] = None,
) -> str:
    """
    يُشغّل COLMAP pipeline كاملاً:
      1. feature_extractor
      2. exhaustive_matcher (أو sequential_matcher)
      3. mapper → sparse/0/points3D.ply

    Returns: مسار ملف points3D.ply
    """
    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)
    db_path    = out / "database.db"
    sparse_dir = out / "sparse"
    sparse_dir.mkdir(exist_ok=True)

    # ===== 1. Feature Extraction =====
    logger.info("[colmap] feature_extractor ...")
    _progress(on_progress, 0.05)
    await _run_cmd([
        COLMAP_BIN, "feature_extractor",
        "--database_path", str(db_path),
        "--image_path",    images_dir,
        "--ImageReader.single_camera", "1",
        "--SiftExtraction.use_gpu",    "1",
        "--SiftExtraction.num_threads", "4",
    ])
    _progress(on_progress, 0.20)

    # ===== 2. Feature Matching =====
    # sequential إذا < 30 صورة، exhaustive إذا أكثر
    n_images = len(list(Path(images_dir).glob("*.[jJpP][pPnN][gGeE]*")))
    matcher  = "sequential_matcher" if n_images >= 30 else "exhaustive_matcher"
    logger.info(f"[colmap] {matcher} ({n_images} images) ...")
    _progress(on_progress, 0.25)
    await _run_cmd([
        COLMAP_BIN, matcher,
        "--database_path", str(db_path),
        "--SiftMatching.use_gpu", "1",
    ])
    _progress(on_progress, 0.55)

    # ===== 3. Sparse Reconstruction =====
    logger.info("[colmap] mapper ...")
    await _run_cmd([
        COLMAP_BIN, "mapper",
        "--database_path",  str(db_path),
        "--image_path",     images_dir,
        "--output_path",    str(sparse_dir),
        "--Mapper.num_threads", "4",
        "--Mapper.init_min_tri_angle", "4",
    ])
    _progress(on_progress, 0.90)

    # ===== 4. تصدير PLY =====
    model_dir = _find_best_model(sparse_dir)
    ply_path  = out / "points3D.ply"
    await _run_cmd([
        COLMAP_BIN, "model_converter",
        "--input_path",  str(model_dir),
        "--output_path", str(ply_path),
        "--output_type", "PLY",
    ])
    _progress(on_progress, 1.0)
    logger.info(f"[colmap] ✅ PLY: {ply_path}")
    return str(ply_path)


def _find_best_model(sparse_dir: Path) -> Path:
    """يختار أكبر model (أكثر نقاط) من sparse/"""
    models = [d for d in sparse_dir.iterdir() if d.is_dir()]
    if not models:
        raise RuntimeError("COLMAP لم ينتج أي model — الصور غير كافية أو بدون تداخل")
    # أكبر مجلد = أكثر صوراً
    return max(models, key=lambda d: sum(1 for _ in d.glob("*.bin")))


async def _run_cmd(cmd: list[str]):
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        err = stderr.decode(errors="replace")[-800:]
        raise RuntimeError(f"COLMAP فشل (exit {proc.returncode}):\n{err}")
    return stdout.decode(errors="replace")


def _progress(cb: Optional[Callable], val: float):
    if cb:
        try:
            cb(val)
        except Exception:
            pass
