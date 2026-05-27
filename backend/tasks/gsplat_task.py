# backend/tasks/gsplat_task.py — QatarSpec Pro
# تدريب Gaussian Splat باستخدام gsplat library
# المرجع: QCS 2024 / Ashghal RDM 2023

from __future__ import annotations

import os
import asyncio
import logging
from pathlib import Path
from typing import Callable, Optional

logger = logging.getLogger(__name__)

# عدد التكرارات — Pro: 30000، Free: 7000
ITERATIONS = int(os.environ.get("GSPLAT_ITERATIONS", "30000"))


async def run_gsplat(
    ply_path: str,
    colmap_dir: str,
    output_dir: str,
    on_progress: Optional[Callable[[float], None]] = None,
) -> str:
    """
    يُشغّل gsplat لتدريب Gaussian Splat.
    يحاول:
      1. gsplat Python API (إذا مُنصَّب)
      2. gaussian-splatting CLI (fallback)

    Returns: مسار ملف .ply النهائي (Gaussian Splat format)
    """
    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)

    try:
        import gsplat
        logger.info("[gsplat] استخدام gsplat Python API")
        result = await _run_gsplat_api(
            ply_path=ply_path,
            colmap_dir=colmap_dir,
            output_dir=str(out),
            on_progress=on_progress,
        )
    except ImportError:
        logger.warning("[gsplat] gsplat غير مُنصَّب — جرّب gaussian-splatting CLI")
        result = await _run_gsplat_cli(
            ply_path=ply_path,
            colmap_dir=colmap_dir,
            output_dir=str(out),
            on_progress=on_progress,
        )

    logger.info(f"[gsplat] ✅ output: {result}")
    return result


async def _run_gsplat_api(
    ply_path: str,
    colmap_dir: str,
    output_dir: str,
    on_progress: Optional[Callable],
) -> str:
    """gsplat Python API — تدريب في نفس العملية"""
    import torch
    from gsplat import DefaultStrategy, rasterization

    # هذه skeleton مبسّطة — في الإنتاج: استبدل بـ full gsplat training loop
    # ref: https://docs.gsplat.studio/main/

    device = "cuda" if torch.cuda.is_available() else "cpu"
    logger.info(f"[gsplat] device: {device}")

    if device == "cpu":
        logger.warning("[gsplat] CPU mode — سيكون بطيئاً جداً")

    _progress(on_progress, 0.1)

    # Placeholder: تشغيل الـ CLI بدلاً من الـ API مباشرة
    # في الإنتاج الكامل: نفّذ training loop هنا
    return await _run_gsplat_cli(ply_path, colmap_dir, output_dir, on_progress)


async def _run_gsplat_cli(
    ply_path: str,
    colmap_dir: str,
    output_dir: str,
    on_progress: Optional[Callable],
) -> str:
    """
    تشغيل gaussian-splatting CLI:
    python train.py -s [colmap_dir] --iterations [n] --model_path [out]
    """
    gs_script = os.environ.get("GS_TRAIN_SCRIPT", "train.py")
    cmd = [
        "python", gs_script,
        "-s", colmap_dir,
        "--model_path", output_dir,
        "--iterations", str(ITERATIONS),
        "--densification_interval", "100",
        "--save_iterations", str(ITERATIONS),
    ]

    _progress(on_progress, 0.15)
    logger.info(f"[gsplat] cmd: {' '.join(cmd)}")

    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        cwd=os.path.dirname(gs_script) or ".",
    )

    # متابعة التقدم من الـ stdout
    iter_total = ITERATIONS
    last_iter  = 0
    async for line in proc.stdout:
        text = line.decode(errors="replace").strip()
        if "iteration" in text.lower():
            try:
                # "[ITER 5000]" أو "iteration 5000/30000"
                parts = text.split()
                for i, p in enumerate(parts):
                    if p.isdigit():
                        last_iter = int(p)
                        break
                _progress(on_progress, 0.15 + 0.80 * (last_iter / iter_total))
            except Exception:
                pass

    await proc.wait()
    if proc.returncode != 0:
        err = (await proc.stderr.read()).decode(errors="replace")[-600:]
        raise RuntimeError(f"gsplat فشل (exit {proc.returncode}):\n{err}")

    # ابحث عن ملف point_cloud النهائي
    for pattern in [
        f"{output_dir}/point_cloud/iteration_{ITERATIONS}/point_cloud.ply",
        f"{output_dir}/output.ply",
        f"{output_dir}/splat.ply",
    ]:
        if Path(pattern).exists():
            _progress(on_progress, 1.0)
            return pattern

    raise RuntimeError(f"لم يُنتَج ملف PLY في {output_dir}")


def _progress(cb, val):
    if cb:
        try:
            cb(val)
        except Exception:
            pass
