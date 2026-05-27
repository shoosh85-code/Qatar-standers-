// ═══════════════════════════════════════════════════════════════
// الفجوة 1: Capture Guide المرئي — QatarSpec Pro
// أضف هذا الكود داخل window.ScannerCamera — بعد دالة drawOverlay الموجودة
// المرجع: QCS 2024 | QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════

const CaptureGuide = {
  capturedCount: 0,
  targetCount: 30,           // الهدف: 30 صورة بحد أدنى
  coverageMap: new Array(9).fill(0),  // شبكة 3×3 لتتبع التغطية
  overlapThreshold: 0.65,    // 65% تداخل مطلوب

  // رسم الـ Guide Overlay على الكانفاس
  drawGuide(ctx, W, H, frameData) {
    // 1. شبكة التغطية 3×3
    this.drawCoverageGrid(ctx, W, H);

    // 2. مؤشر عداد الصور
    this.drawShotCounter(ctx, W, H);

    // 3. مؤشر التداخل (Overlap Indicator)
    this.drawOverlapMeter(ctx, W, H, frameData.overlapEstimate);

    // 4. سهم التوجيه للمنطقة التالية
    this.drawDirectionArrow(ctx, W, H, this.getNextTarget());
  },

  drawCoverageGrid(ctx, W, H) {
    const cellW = W / 3, cellH = H / 3;
    this.coverageMap.forEach((covered, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      ctx.fillStyle = covered > 0
        ? 'rgba(0,255,136,0.25)'
        : 'rgba(255,100,100,0.15)';
      ctx.fillRect(col * cellW + 2, row * cellH + 2, cellW - 4, cellH - 4);
      ctx.strokeStyle = covered > 0 ? '#00ff88' : '#ff6644';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(col * cellW + 2, row * cellH + 2, cellW - 4, cellH - 4);
      if (covered > 0) {
        ctx.fillStyle = '#00ff88';
        ctx.font = `${Math.min(cellW, cellH) * 0.4}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('✓', col * cellW + cellW / 2, row * cellH + cellH / 2 + 6);
      }
    });
  },

  drawShotCounter(ctx, W, H) {
    const pct = Math.min(this.capturedCount / this.targetCount, 1);
    // خلفية شريط التقدم
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(W * 0.05, H * 0.91, W * 0.9, 22);
    // شريط التقدم
    const barColor = pct < 0.5 ? '#ff6644' : pct < 0.85 ? '#f59e0b' : '#00ff88';
    ctx.fillStyle = barColor;
    ctx.fillRect(W * 0.05, H * 0.91, W * 0.9 * pct, 22);
    // النص
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Cairo, Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `📸 ${this.capturedCount} / ${this.targetCount} صورة — ${Math.round(pct * 100)}%`,
      W / 2, H * 0.91 + 15
    );
  },

  drawOverlapMeter(ctx, W, H, overlapEstimate) {
    const ok = overlapEstimate >= this.overlapThreshold;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(W * 0.05, H * 0.05, 130, 28);
    ctx.fillStyle = ok ? '#00ff88' : '#ff6644';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `تداخل: ${Math.round((overlapEstimate || 0) * 100)}% ${ok ? '✓' : '— تحرك أبطأ'}`,
      W * 0.05 + 125, H * 0.05 + 18
    );
  },

  drawDirectionArrow(ctx, W, H, targetZone) {
    if (!targetZone) return;
    // سهم ملون يشير لأقل منطقة تغطية
    const arrowX = W / 2 + (targetZone.col - 1) * 60;
    const arrowY = H / 2 + (targetZone.row - 1) * 60;
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('→', arrowX, arrowY);
  },

  getNextTarget() {
    // أقل منطقة تغطية
    let minIdx = 0, minVal = Infinity;
    this.coverageMap.forEach((v, i) => { if (v < minVal) { minVal = v; minIdx = i; } });
    return { col: minIdx % 3, row: Math.floor(minIdx / 3) };
  },

  registerCapture(regionHint) {
    // تسجيل صورة جديدة وتحديث خريطة التغطية
    this.capturedCount++;
    const idx = regionHint || Math.floor(Math.random() * 9);
    this.coverageMap[idx] = (this.coverageMap[idx] || 0) + 1;
  },

  isReadyToProcess() {
    // جاهز للمعالجة إذا: ≥30 صورة AND كل المناطق تغطيها صورة واحدة على الأقل
    return this.capturedCount >= this.targetCount &&
           this.coverageMap.every(v => v > 0);
  },

  reset() {
    this.capturedCount = 0;
    this.coverageMap = new Array(9).fill(0);
  }
};

// ═══════════════════════════════════════════════════════════════
// إضافات scanner.html — أضف بعد عنصر #video مباشرة
// ═══════════════════════════════════════════════════════════════
/*
<div id="captureInstructions" style="
  background: rgba(0,0,0,0.75); color: #e2e8f0;
  padding: 10px 14px; border-radius: 8px; font-size: 0.82rem;
  border-right: 3px solid #8b5cf6; margin-bottom: 8px; direction: rtl;
">
  <b>📷 دليل التصوير الصحيح:</b><br>
  ① التقط <b>30-50 صورة</b> بزوايا متداخلة (60-80% تغطية مشتركة)<br>
  ② تحرك <b>ببطء</b> حول الموضوع — كل خطوة 30-40 سم<br>
  ③ صوّر من <b>ارتفاعات مختلفة</b>: أسفل، متوسط، أعلى<br>
  ④ تجنب <b>الإضاءة المباشرة</b> والسطوح العاكسة<br>
  ⑤ اضغط ✅ عندما تكتمل الشبكة الخضراء أدناه
</div>
*/
