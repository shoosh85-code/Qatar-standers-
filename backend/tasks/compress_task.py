# backend/tasks/compress_task.py — QatarSpec Pro
# ضغط Gaussian Splat → SPZ + رفع لـ Cloudflare R2
# المرجع: QCS 2024 / Ashghal RDM 2023

from __future__ import annotations

import os
import gzip
import json
import struct
import logging
import asyncio
from pathlib import Path
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

# Cloudflare R2 / S3 config — server-side env vars فقط
R2_ENDPOINT   = os.environ.get("R2_ENDPOINT", "")
R2_BUCKET     = os.environ.get("R2_BUCKET",   "qatarspec-scans")
R2_ACCESS_KEY = os.environ.get("R2_ACCESS_KEY", "")
R2_SECRET_KEY = os.environ.get("R2_SECRET_KEY", "")
R2_PUBLIC_URL = os.environ.get("R2_PUBLIC_URL", "")  # CDN URL


async def compress_to_spz(
    splat_path: str,
    job_id: str,
    output_dir: str,
) -> Tuple[str, str]:
    """
    1. يحوّل .ply → .spz (Gaussian Splat ZIP)
    2. يرفع لـ Cloudflare R2
    Returns: (local_path, download_url)
    """
    out_dir = Path(output_dir)
    spz_path = out_dir / f"{job_id}.spz"

    # تحويل PLY → SPZ
    logger.info(f"[compress] تحويل {splat_path} → {spz_path}")
    await asyncio.to_thread(_ply_to_spz, splat_path, str(spz_path))

    size_mb = spz_path.stat().st_size / (1024 * 1024)
    logger.info(f"[compress] SPZ: {size_mb:.1f}MB")

    # رفع لـ R2
    download_url = await _upload_to_r2(str(spz_path), job_id)

    return str(spz_path), download_url


def _ply_to_spz(ply_path: str, spz_path: str):
    """
    تحويل .ply (Gaussian Splat) → .spz (gzip JSON + binary)
    SPZ format: gzipped binary Gaussian data

    Header JSON:
      { "version": 1, "numPoints": N, "sh_degree": 0, "antialiased": false,
        "fractionalBits": 12, "flags": 0 }
    Body: float32 لكل Gaussian: [x, y, z, scale_x, scale_y, scale_z, rot_w, rot_x, rot_y, rot_z, opacity, r, g, b]
    """
    gaussians = _parse_gaussian_ply(ply_path)
    n = len(gaussians["positions"])

    header = {
        "version": 1,
        "numPoints": n,
        "sh_degree": 0,
        "antialiased": False,
        "fractionalBits": 12,
        "flags": 0,
    }
    header_bytes = json.dumps(header, separators=(",", ":")).encode()

    # Pack binary: x,y,z + scales + rotation(quat) + opacity + rgb
    body_vals = []
    pos  = gaussians["positions"]   # (N,3)
    scl  = gaussians["scales"]      # (N,3)
    rot  = gaussians["rotations"]   # (N,4) quat
    opac = gaussians["opacities"]   # (N,)
    col  = gaussians["colors"]      # (N,3)

    for i in range(n):
        body_vals.extend([pos[i][0], pos[i][1], pos[i][2]])
        body_vals.extend([scl[i][0], scl[i][1], scl[i][2]])
        body_vals.extend([rot[i][0], rot[i][1], rot[i][2], rot[i][3]])
        body_vals.append(opac[i])
        body_vals.extend([col[i][0], col[i][1], col[i][2]])

    body_bytes = struct.pack(f"{len(body_vals)}f", *body_vals)

    # gzip = header_len (uint32) + header + body
    raw = struct.pack("<I", len(header_bytes)) + header_bytes + body_bytes
    with gzip.open(spz_path, "wb", compresslevel=6) as f:
        f.write(raw)


def _parse_gaussian_ply(ply_path: str) -> dict:
    """قراءة Gaussian Splat PLY — يدعم binary_little_endian فقط"""
    with open(ply_path, "rb") as f:
        # قراءة الـ header
        props = []
        num_points = 0
        while True:
            line = f.readline().decode(errors="replace").strip()
            if line.startswith("element vertex"):
                num_points = int(line.split()[-1])
            elif line.startswith("property float"):
                props.append(line.split()[-1])
            elif line == "end_header":
                break

        # قراءة البيانات
        n_floats = len(props)
        data = []
        for _ in range(num_points):
            row = struct.unpack(f"<{n_floats}f", f.read(4 * n_floats))
            data.append(row)

    # استخراج الأعمدة بالاسم
    idx = {p: i for i, p in enumerate(props)}

    def _col(name, default=0.0):
        i = idx.get(name, -1)
        return [row[i] if i >= 0 else default for row in data]

    positions = list(zip(_col("x"), _col("y"), _col("z")))
    scales    = list(zip(_col("scale_0"), _col("scale_1"), _col("scale_2")))
    rotations = list(zip(_col("rot_0", 1.0), _col("rot_1"), _col("rot_2"), _col("rot_3")))
    opacities = _col("opacity")

    # SH coefficients degree 0 → RGB
    import math
    SH_C0 = 0.28209479177
    colors = [
        (
            min(1.0, max(0.0, 0.5 + SH_C0 * f0)),
            min(1.0, max(0.0, 0.5 + SH_C0 * f1)),
            min(1.0, max(0.0, 0.5 + SH_C0 * f2)),
        )
        for f0, f1, f2 in zip(_col("f_dc_0"), _col("f_dc_1"), _col("f_dc_2"))
    ]

    return {
        "positions": positions,
        "scales":    scales,
        "rotations": rotations,
        "opacities": opacities,
        "colors":    colors,
    }


async def _upload_to_r2(file_path: str, job_id: str) -> str:
    """رفع لـ Cloudflare R2 باستخدام boto3"""
    if not R2_ENDPOINT:
        # بدون R2 — أعد رابطاً محلياً مؤقتاً
        logger.warning("[compress] R2_ENDPOINT غير مضبوط — الملف محلي فقط")
        return f"/tmp/{job_id}.spz"

    try:
        import boto3
        from botocore.config import Config

        s3 = boto3.client(
            "s3",
            endpoint_url=R2_ENDPOINT,
            aws_access_key_id=R2_ACCESS_KEY,
            aws_secret_access_key=R2_SECRET_KEY,
            config=Config(signature_version="s3v4"),
        )

        key = f"scans/{job_id}.spz"
        await asyncio.to_thread(
            s3.upload_file,
            file_path,
            R2_BUCKET,
            key,
            ExtraArgs={"ContentType": "application/octet-stream"},
        )

        url = f"{R2_PUBLIC_URL.rstrip('/')}/{key}"
        logger.info(f"[compress] R2 رُفع: {url}")
        return url

    except Exception as e:
        logger.error(f"[compress] R2 فشل: {e}")
        return f"/tmp/{job_id}.spz"
