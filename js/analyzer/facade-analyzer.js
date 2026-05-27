// js/analyzer/facade-analyzer.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// محلل واجهات المبنى من صور — Gemini Vision
// يستقبل 4-8 صور واجهات → يستخرج elevations + عيوب
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  const API_ENDPOINT = '/api/vision-proxy';
  const MAX_RETRIES = 2;

  // ── Prompt Gemini للواجهة ───────────────────────────────────
  const FACADE_PROMPT = (direction) => `أنت مهندس معماري خبير. حلل هذه الصورة لواجهة مبنى (اتجاه: ${direction}).

استخرج:
1. عدد الأدوار المرئية وارتفاع كل دور بالمتر
2. كل الشبابيك: الدور + الموقع الأفقي (نسبة 0-1) + العرض + الارتفاع بالمتر
3. كل الأبواب: الموقع + العرض + الارتفاع + النوع
4. نوع التشطيب: paint/stone/cladding/glass/plaster
5. أي عيوب مرئية: تشققات/رطوبة/تآكل/تقشير + الموقع + الشدة + مرجع QCS

أبعاد تقديرية إذا لم تظهر:
- ارتفاع الدور: 3.0م | باب: 0.9×2.1م | شباك: 1.2×1.5م
- واجهة فيلا قطرية: 10-20م عرض | 3-12م ارتفاع

أجب بـ JSON فقط:
{
  "direction": "${direction}",
  "width_m": 0,
  "height_m": 0,
  "floors_visible": 0,
  "floor_heights_m": [3.0],
  "elements": [
    { "type": "window|door", "floor": 1, "x_ratio": 0.5, "width_m": 1.2, "height_m": 1.5, "style": "" }
  ],
  "finish": { "type": "paint|stone|cladding|glass|plaster", "color_hex": "#F5E6CC", "condition": "good|fair|poor" },
  "defects": [
    { "type": "crack|moisture|corrosion|peeling|stain", "location": "description", "severity": "minor|major|critical", "qcs_ref": "QCS 2024 ..." }
  ],
  "notes": []
}`;

  // ── مساعدات ────────────────────────────────────────────────

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      reader.readAsDataURL(file);
    });
  }

  function getMimeType(file) {
    const ext = (file.name || '').split('.').pop().toLowerCase();
    return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] || file.type || 'image/jpeg';
  }

  function parseJSON(raw) {
    if (!raw) throw new Error('رد فارغ');
    let cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first === -1 || last <= first) throw new Error('لا يوجد JSON');
    cleaned = cleaned.slice(first, last + 1);
    try { return JSON.parse(cleaned); }
    catch { return JSON.parse(cleaned.replace(/,\s*([\]}])/g, '$1')); }
  }

  async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ═══════════════════════════════════════════════════════════
  // ██ FacadeAnalyzer Class
  // ═══════════════════════════════════════════════════════════

  class FacadeAnalyzer {
    constructor(options = {}) {
      this._onProgress = options.onProgress || (() => {});
      this._results = [];
    }

    /** تحليل واجهة واحدة */
    async analyzeFacade(imageFile, direction = 'north') {
      this._onProgress({ message: `جاري تحليل الواجهة ${direction}...`, percent: 20 });

      const base64 = await fileToBase64(imageFile);
      const mimeType = getMimeType(imageFile);

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const res = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: base64, mimeType,
              prompt: FACADE_PROMPT(direction),
              maxTokens: 4096, jsonMode: true,
            }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const parsed = parseJSON(data.text || JSON.stringify(data));
          parsed.direction = direction;
          parsed.image_index = this._results.length;
          return parsed;
        } catch (err) {
          if (attempt === MAX_RETRIES) throw err;
          await delay(2000 * attempt);
        }
      }
    }

    /** تحليل كل الواجهات (4-8 صور) */
    async analyzeAllFacades(imageFiles, directions) {
      const dirs = directions || ['north', 'east', 'south', 'west'];
      this._results = [];
      const total = Math.min(imageFiles.length, dirs.length);

      for (let i = 0; i < total; i++) {
        this._onProgress({
          message: `تحليل الواجهة ${i + 1}/${total} (${dirs[i]})...`,
          percent: Math.round((i / total) * 90)
        });
        try {
          const result = await this.analyzeFacade(imageFiles[i], dirs[i]);
          result.image_index = i;
          this._results.push(result);
        } catch (err) {
          console.warn(`[FacadeAnalyzer] فشل تحليل ${dirs[i]}:`, err.message);
          this._results.push({ direction: dirs[i], error: err.message, image_index: i });
        }
      }

      this._onProgress({ message: `✅ تم تحليل ${this._results.length} واجهة`, percent: 100 });

      return {
        facades: this._results,
        summary: this._buildSummary(),
      };
    }

    /** دمج نتائج الواجهات مع بيانات المخطط */
    mergeWithFloorplan(facadeData, floorplanJSON) {
      const merged = JSON.parse(JSON.stringify(floorplanJSON));
      merged.facades = facadeData.facades || [];
      merged.facade_summary = facadeData.summary || {};

      // إضافة عيوب الواجهات لـ qcs_checks
      if (!merged.qcs_checks) merged.qcs_checks = [];

      for (const facade of (facadeData.facades || [])) {
        for (const defect of (facade.defects || [])) {
          merged.qcs_checks.push({
            id: `FC_${facade.direction}_${defect.type}`,
            item: `عيب ${defect.type} — واجهة ${facade.direction}`,
            clause: defect.qcs_ref || 'QCS 2024 Section 9',
            measured: defect.severity,
            required_min: 'good',
            unit: 'condition',
            status: defect.severity === 'critical' ? 'fail' : defect.severity === 'major' ? 'fail' : 'warning',
            severity: defect.severity,
            source: 'facade_analysis',
          });
        }
      }

      return merged;
    }

    /** توليد SVG elevation لواجهة واحدة */
    generateElevation(facadeData, options = {}) {
      const w = facadeData.width_m || 15;
      const h = facadeData.height_m || 9;
      const scale = options.scale || 40; // pixels per meter
      const svgW = w * scale + 80;
      const svgH = h * scale + 80;
      const ox = 40, oy = 40;

      let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" dir="rtl">`;
      svg += `<style>text{font-family:Arial;font-size:12px;fill:#333;}</style>`;

      // خلفية الواجهة
      const fillColor = facadeData.finish?.color_hex || '#F5E6CC';
      svg += `<rect x="${ox}" y="${oy}" width="${w*scale}" height="${h*scale}" fill="${fillColor}" stroke="#333" stroke-width="2"/>`;

      // خطوط الأدوار
      const floorHeights = facadeData.floor_heights_m || [3.0];
      let yAcc = 0;
      for (let i = 0; i < (facadeData.floors_visible || 1); i++) {
        const fh = floorHeights[i] || 3.0;
        yAcc += fh;
        if (yAcc < h) {
          const lineY = oy + (h - yAcc) * scale;
          svg += `<line x1="${ox}" y1="${lineY}" x2="${ox + w*scale}" y2="${lineY}" stroke="#999" stroke-dasharray="5,5"/>`;
          svg += `<text x="${ox - 5}" y="${lineY + 4}" text-anchor="end" font-size="10">الدور ${i + 1}</text>`;
        }
      }

      // الشبابيك والأبواب
      for (const el of (facadeData.elements || [])) {
        const elX = ox + (el.x_ratio || 0.5) * w * scale - (el.width_m || 1) * scale / 2;
        const floorBase = h - (el.floor || 1) * (floorHeights[0] || 3.0);
        const elY = oy + floorBase * scale + (el.type === 'window' ? 0.9 : 0) * scale;
        const elW = (el.width_m || 1) * scale;
        const elH = (el.height_m || 1.5) * scale;

        if (el.type === 'window') {
          svg += `<rect x="${elX}" y="${elY}" width="${elW}" height="${elH}" fill="#87CEEB" fill-opacity="0.4" stroke="#666" stroke-width="1.5"/>`;
          svg += `<line x1="${elX + elW/2}" y1="${elY}" x2="${elX + elW/2}" y2="${elY + elH}" stroke="#999" stroke-width="0.5"/>`;
          svg += `<line x1="${elX}" y1="${elY + elH/2}" x2="${elX + elW}" y2="${elY + elH/2}" stroke="#999" stroke-width="0.5"/>`;
        } else {
          svg += `<rect x="${elX}" y="${elY}" width="${elW}" height="${elH}" fill="#8B6914" fill-opacity="0.5" stroke="#5C4A1E" stroke-width="1.5"/>`;
          // قوس فوق الباب
          svg += `<path d="M${elX},${elY} Q${elX + elW/2},${elY - elH*0.1} ${elX + elW},${elY}" fill="none" stroke="#5C4A1E" stroke-width="1"/>`;
        }
      }

      // عيوب
      for (const defect of (facadeData.defects || [])) {
        const colors = { minor: '#F59E0B', major: '#EF4444', critical: '#DC2626' };
        const color = colors[defect.severity] || '#F59E0B';
        // رمز تحذير
        svg += `<circle cx="${ox + w*scale - 20}" cy="${oy + 20}" r="8" fill="${color}" opacity="0.8"/>`;
        svg += `<text x="${ox + w*scale - 20}" y="${oy + 24}" text-anchor="middle" font-size="12" fill="white" font-weight="bold">!</text>`;
      }

      // أبعاد
      svg += `<text x="${ox + w*scale/2}" y="${oy + h*scale + 25}" text-anchor="middle" font-weight="bold">${w.toFixed(1)} م</text>`;
      svg += `<text x="${ox - 20}" y="${oy + h*scale/2}" text-anchor="middle" transform="rotate(-90,${ox-20},${oy+h*scale/2})" font-weight="bold">${h.toFixed(1)} م</text>`;

      // عنوان
      const dirLabels = { north: 'الواجهة الشمالية', south: 'الواجهة الجنوبية', east: 'الواجهة الشرقية', west: 'الواجهة الغربية' };
      svg += `<text x="${ox + w*scale/2}" y="${oy - 10}" text-anchor="middle" font-size="16" font-weight="bold" fill="#1a1a2e">${dirLabels[facadeData.direction] || facadeData.direction}</text>`;

      svg += '</svg>';
      return svg;
    }

    /** ملخص كل الواجهات */
    _buildSummary() {
      const valid = this._results.filter(f => !f.error);
      return {
        total_facades: this._results.length,
        analyzed: valid.length,
        total_defects: valid.reduce((sum, f) => sum + (f.defects?.length || 0), 0),
        critical_defects: valid.reduce((sum, f) => sum + (f.defects || []).filter(d => d.severity === 'critical').length, 0),
        finishes: valid.map(f => ({ direction: f.direction, type: f.finish?.type, condition: f.finish?.condition })),
        estimated_floors: Math.max(...valid.map(f => f.floors_visible || 1), 1),
      };
    }

    getResults() { return [...this._results]; }
  }

  window.QS.FacadeAnalyzer = FacadeAnalyzer;
  console.info('[QS] FacadeAnalyzer v1.0 loaded');
})();
