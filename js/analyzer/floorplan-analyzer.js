// js/analyzer/floorplan-analyzer.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// محلل المخططات المعمارية بالذكاء الاصطناعي (Gemini Vision)
// يستقبل صورة مخطط → يُرجع JSON Schema موحد
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';

  // ── إعداد namespace ────────────────────────────────────────
  window.QS = window.QS || {};

  // ── الثوابت ────────────────────────────────────────────────
  const API_ENDPOINT = '/api/vision-proxy';
  const MAX_FILE_SIZE_MB = 10;
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 2000;
  const MAX_TOKENS = 16000; // زيادة لاستيعاب مخططات كبيرة ومعقدة

  // ── Gemini Prompt الهندسي ──────────────────────────────────
  const ANALYSIS_PROMPT = `You are a professional architectural engineer specializing in Qatari floor plans and engineering drawings.

## STEP 1 — UNDERSTAND SCALE:
Look carefully at dimension annotations in the drawing (numbers like "5000", "3.5m", "15'", etc.).
- If you see dimension lines, use them to calculate the real scale
- If no dimensions are visible, estimate based on standard room sizes (bedroom ~12-16m², living room ~20-30m²)
- Convert ALL measurements to METERS

## STEP 2 — IDENTIFY ALL WALLS:
Trace EVERY wall line you see — both external (perimeter) and internal (partitions).
For each wall give: start coordinate [x,y] and end coordinate [x,y] in meters from top-left origin (0,0).
Be very precise — walls that share corners must have EXACTLY matching coordinates.

## STEP 3 — IDENTIFY ALL ROOMS:
For each enclosed space, identify: Arabic name, English name, approximate area, and polygon corners.

## STEP 4 — IDENTIFY OPENINGS:
Every door opening and window you can see — note which wall it is on and where along that wall.

## COORDINATE SYSTEM:
- Origin (0,0) = top-left of the building footprint
- X positive = right
- Y positive = downward
- All units: METERS

## CRITICAL RULES:
- DO NOT invent elements you cannot see
- If a dimension is unclear, estimate conservatively and mark "estimated": true
- Walls that meet at corners must have MATCHING endpoints
- Return ONLY valid JSON — no text before or after
- Use standard Qatari room names: مجلس، صالة، غرفة نوم، غرفة نوم رئيسية، مطبخ، حمام، ممر، مدخل، مجلس نساء، غرفة طعام، مخزن، غرفة خادمة، مغسلة، شرفة

Return JSON matching EXACTLY this schema:
{
  "version": "1.0",
  "source": { "type": "floorplan", "file_count": 1, "confidence": "high|medium|low" },
  "floors": [{
    "level": 0,
    "label": "الدور الأرضي",
    "height_m": 3.2,
    "walls": [
      { "id": "W1", "start": [0,0], "end": [12,0], "height_m": 3.2, "thickness_m": 0.25, "material": "block", "is_external": true, "estimated": false }
    ],
    "doors": [
      { "id": "D1", "wall_id": "W1", "position_ratio": 0.5, "width_m": 0.9, "height_m": 2.1, "type": "single", "swing": "inward", "estimated": false }
    ],
    "windows": [
      { "id": "WN1", "wall_id": "W2", "position_ratio": 0.3, "width_m": 1.5, "height_m": 1.4, "sill_height_m": 0.9, "estimated": false }
    ],
    "columns": [],
    "rooms": [
      { "id": "R1", "name": "مجلس", "name_en": "Majlis", "area_m2": 28, "polygon": [[0,0],[6,0],[6,5],[0,5]], "wall_ids": ["W1","W5","W3","W4"] }
    ],
    "stairs": []
  }],
  "dimensions": { "total_width_m": 12, "total_depth_m": 10, "total_area_m2": 120, "unit": "m" },
  "notes": []
}`;

  // ── مساعدات ────────────────────────────────────────────────

  /** تحويل ملف إلى base64 */
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      reader.readAsDataURL(file);
    });
  }

  /** استخراج MIME type */
  function getMimeType(file) {
    const ext = (file.name || '').split('.').pop().toLowerCase();
    const map = {
      'jpg': 'image/jpeg', 'jpeg': 'image/jpeg',
      'png': 'image/png', 'gif': 'image/gif',
      'webp': 'image/webp', 'bmp': 'image/bmp',
      'pdf': 'application/pdf',
    };
    return map[ext] || file.type || 'image/jpeg';
  }

  /** تأخير */
  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  /** توليد ID فريد */
  function uid() {
    return 'fp_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
  }

  // ── التحقق من صحة الـ Schema ──────────────────────────────

  function validateSchema(json) {
    const errors = [];

    if (!json || typeof json !== 'object') {
      return { valid: false, errors: ['JSON ليس object'] };
    }

    // floors
    if (!Array.isArray(json.floors) || json.floors.length === 0) {
      errors.push('floors مفقود أو فارغ');
    } else {
      const floor = json.floors[0];

      // walls
      if (!Array.isArray(floor.walls) || floor.walls.length < 3) {
        errors.push('walls أقل من 3 (غير منطقي لمبنى)');
      } else {
        for (const w of floor.walls) {
          if (!w.id) errors.push('جدار بدون id');
          if (!Array.isArray(w.start) || w.start.length !== 2) errors.push(`جدار ${w.id}: start غير صالح`);
          if (!Array.isArray(w.end) || w.end.length !== 2) errors.push(`جدار ${w.id}: end غير صالح`);
          if (typeof w.thickness_m !== 'number' || w.thickness_m <= 0) errors.push(`جدار ${w.id}: سماكة غير صالحة`);
        }
      }

      // rooms
      if (!Array.isArray(floor.rooms) || floor.rooms.length === 0) {
        errors.push('rooms مفقود أو فارغ');
      } else {
        for (const r of floor.rooms) {
          if (!r.id) errors.push('غرفة بدون id');
          if (!r.name) errors.push(`غرفة ${r.id}: اسم عربي مفقود`);
          if (typeof r.area_m2 !== 'number' || r.area_m2 <= 0) errors.push(`غرفة ${r.id}: مساحة غير صالحة`);
          if (!Array.isArray(r.polygon) || r.polygon.length < 3) errors.push(`غرفة ${r.id}: polygon أقل من 3 نقاط`);
        }
      }

      // doors — اختياري لكن متوقع
      if (!Array.isArray(floor.doors)) {
        errors.push('doors مفقود (يجب أن يكون array حتى لو فارغ)');
      }

      // windows — اختياري
      if (!Array.isArray(floor.windows)) {
        errors.push('windows مفقود');
      }
    }

    // dimensions
    if (!json.dimensions || typeof json.dimensions.total_width_m !== 'number') {
      errors.push('dimensions.total_width_m مفقود');
    }
    if (!json.dimensions || typeof json.dimensions.total_depth_m !== 'number') {
      errors.push('dimensions.total_depth_m مفقود');
    }

    return {
      valid: errors.length === 0,
      errors,
      stats: json.floors?.[0] ? {
        walls: json.floors[0].walls?.length || 0,
        doors: json.floors[0].doors?.length || 0,
        windows: json.floors[0].windows?.length || 0,
        rooms: json.floors[0].rooms?.length || 0,
        columns: json.floors[0].columns?.length || 0,
        stairs: json.floors[0].stairs?.length || 0,
      } : null,
    };
  }

  // ── تنظيف JSON من Gemini ───────────────────────────────────

  function parseGeminiJSON(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('Gemini لم يُرجع نصاً');
    }

    // إزالة markdown fences
    let cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    // محاولة إيجاد أول { وآخر }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error('لا يوجد JSON صالح في الرد: ' + rawText.slice(0, 200));
    }
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      // محاولة إصلاح JSON شائع: trailing commas
      const fixed = cleaned
        .replace(/,\s*([\]}])/g, '$1')
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":'); // مفاتيح بدون quotes
      try {
        return JSON.parse(fixed);
      } catch {
        throw new Error('فشل تحليل JSON: ' + e.message);
      }
    }
  }

  // ── إضافة IDs مفقودة + إصلاحات ────────────────────────────

  function normalizeResult(json) {
    if (!json.version) json.version = '1.0';
    if (!json.source) json.source = { type: 'floorplan', file_count: 1 };
    if (!json.dimensions) json.dimensions = { total_width_m: 0, total_depth_m: 0, total_area_m2: 0, unit: 'm' };
    if (!json.notes) json.notes = [];

    if (Array.isArray(json.floors)) {
      for (const floor of json.floors) {
        if (floor.level === undefined) floor.level = 0;
        if (!floor.label) floor.label = 'الدور الأرضي';
        if (!floor.height_m) floor.height_m = 3.0;

        // تأكد كل العناصر arrays
        floor.walls = Array.isArray(floor.walls) ? floor.walls : [];
        floor.doors = Array.isArray(floor.doors) ? floor.doors : [];
        floor.windows = Array.isArray(floor.windows) ? floor.windows : [];
        floor.columns = Array.isArray(floor.columns) ? floor.columns : [];
        floor.rooms = Array.isArray(floor.rooms) ? floor.rooms : [];
        floor.stairs = Array.isArray(floor.stairs) ? floor.stairs : [];

        // أضف IDs مفقودة
        floor.walls.forEach((w, i) => { if (!w.id) w.id = `W${i + 1}`; });
        floor.doors.forEach((d, i) => { if (!d.id) d.id = `D${i + 1}`; });
        floor.windows.forEach((w, i) => { if (!w.id) w.id = `WN${i + 1}`; });
        floor.columns.forEach((c, i) => { if (!c.id) c.id = `C${i + 1}`; });
        floor.rooms.forEach((r, i) => { if (!r.id) r.id = `R${i + 1}`; });
        floor.stairs.forEach((s, i) => { if (!s.id) s.id = `S${i + 1}`; });

        // حسابات الأبعاد الكلية من الجدران
        if (floor.walls.length > 0 && (!json.dimensions.total_width_m || json.dimensions.total_width_m === 0)) {
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          for (const w of floor.walls) {
            if (Array.isArray(w.start) && Array.isArray(w.end)) {
              minX = Math.min(minX, w.start[0], w.end[0]);
              maxX = Math.max(maxX, w.start[0], w.end[0]);
              minY = Math.min(minY, w.start[1], w.end[1]);
              maxY = Math.max(maxY, w.start[1], w.end[1]);
            }
          }
          if (isFinite(minX)) {
            json.dimensions.total_width_m = +(maxX - minX).toFixed(2);
            json.dimensions.total_depth_m = +(maxY - minY).toFixed(2);
            json.dimensions.total_area_m2 = +(json.dimensions.total_width_m * json.dimensions.total_depth_m).toFixed(1);
          }
        }
      }
    }

    // إضافة metadata
    json.metadata = {
      generated_by: 'QatarSpec Pro',
      analyzer: 'floorplan-analyzer',
      version: '1.0',
      timestamp: new Date().toISOString(),
    };

    return json;
  }

  // ═══════════════════════════════════════════════════════════
  // ██ FloorplanAnalyzer Class
  // ═══════════════════════════════════════════════════════════

  class FloorplanAnalyzer {
    constructor(options = {}) {
      this._onProgress = options.onProgress || (() => {});
      this._onError = options.onError || (() => {});
      this._lastResult = null;
      this._analyzing = false;
    }

    /** تحليل ملف مخطط */
    async analyze(imageFile) {
      if (this._analyzing) {
        throw new Error('تحليل جاري بالفعل — انتظر الانتهاء');
      }

      // تحقق من الملف
      if (!imageFile || !(imageFile instanceof File || imageFile instanceof Blob)) {
        throw new Error('الملف غير صالح');
      }

      const sizeMB = imageFile.size / (1024 * 1024);
      if (sizeMB > MAX_FILE_SIZE_MB) {
        throw new Error(`حجم الملف ${sizeMB.toFixed(1)}MB يتجاوز الحد (${MAX_FILE_SIZE_MB}MB)`);
      }

      this._analyzing = true;
      this._progress('جاري قراءة الملف...', 5);

      try {
        // تحويل لـ base64
        const base64 = await fileToBase64(imageFile);
        const mimeType = getMimeType(imageFile);
        this._progress('جاري إرسال المخطط لـ Gemini AI...', 15);

        // إرسال لـ API مع retries
        let rawResult = null;
        let lastError = null;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            this._progress(`محاولة ${attempt}/${MAX_RETRIES} — جاري التحليل...`, 15 + attempt * 10);

            const response = await fetch(API_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: base64,
                mimeType: mimeType,
                prompt: ANALYSIS_PROMPT,
                maxTokens: MAX_TOKENS,
                jsonMode: true,
              }),
            });

            if (response.status === 429) {
              const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
              this._progress(`⏳ حد الطلبات — انتظر ${retryAfter} ثانية...`, 20);
              await delay(retryAfter * 1000);
              continue;
            }

            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              throw new Error(errData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            rawResult = data.result || data.text || JSON.stringify(data);
            break;

          } catch (err) {
            lastError = err;
            console.warn(`[FloorplanAnalyzer] محاولة ${attempt} فشلت:`, err.message);
            if (attempt < MAX_RETRIES) await delay(RETRY_DELAY_MS * attempt);
          }
        }

        if (!rawResult) {
          throw lastError || new Error('فشل التحليل بعد كل المحاولات');
        }

        this._progress('جاري تحليل النتائج...', 70);

        // تحليل الـ JSON
        const parsed = parseGeminiJSON(rawResult);
        this._progress('جاري التحقق من صحة البيانات...', 85);

        // تطبيع
        const normalized = normalizeResult(parsed);

        // تحقق
        const validation = validateSchema(normalized);
        if (!validation.valid) {
          console.warn('[FloorplanAnalyzer] تحذيرات التحقق:', validation.errors);
          normalized._validation_warnings = validation.errors;
        }

        this._lastResult = normalized;

        const stats = validation.stats || {};
        this._progress(
          `✅ تم التحليل — ${stats.walls || 0} جدار، ${stats.rooms || 0} غرفة، ${stats.doors || 0} باب، ${stats.windows || 0} شباك`,
          100
        );

        return normalized;

      } catch (err) {
        this._onError(err);
        throw err;
      } finally {
        this._analyzing = false;
      }
    }

    /** تحليل من URL (صورة عبر الإنترنت) */
    async analyzeFromURL(imageURL) {
      this._progress('جاري تحميل الصورة...', 5);

      const response = await fetch(imageURL);
      if (!response.ok) throw new Error(`فشل تحميل الصورة: ${response.status}`);

      const blob = await response.blob();
      const file = new File([blob], 'floorplan.jpg', { type: blob.type });
      return this.analyze(file);
    }

    /** تحليل من base64 مباشرة */
    async analyzeFromBase64(base64Data, mimeType = 'image/jpeg') {
      this._analyzing = true;
      this._progress('جاري إرسال المخطط لـ Gemini AI...', 15);

      try {
        let rawResult = null;
        let lastError = null;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            this._progress(`محاولة ${attempt}/${MAX_RETRIES}...`, 15 + attempt * 10);

            const response = await fetch(API_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: base64Data,
                mimeType,
                prompt: ANALYSIS_PROMPT,
                maxTokens: MAX_TOKENS,
                jsonMode: true,
              }),
            });

            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              throw new Error(errData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            rawResult = data.result || data.text || JSON.stringify(data);
            break;
          } catch (err) {
            lastError = err;
            if (attempt < MAX_RETRIES) await delay(RETRY_DELAY_MS * attempt);
          }
        }

        if (!rawResult) throw lastError || new Error('فشل التحليل');

        const parsed = parseGeminiJSON(rawResult);
        const normalized = normalizeResult(parsed);
        const validation = validateSchema(normalized);
        if (!validation.valid) normalized._validation_warnings = validation.errors;

        this._lastResult = normalized;
        this._progress('✅ تم التحليل', 100);
        return normalized;

      } finally {
        this._analyzing = false;
      }
    }

    /** التحقق من نتيجة خارجية */
    validateResult(json) {
      return validateSchema(json);
    }

    /** آخر نتيجة */
    getLastResult() {
      return this._lastResult;
    }

    /** هل يحلل حالياً */
    isAnalyzing() {
      return this._analyzing;
    }

    /** أحداث التقدم */
    _progress(message, percent) {
      try {
        this._onProgress({ message, percent });
      } catch {}
    }

    // ── أدوات إضافية ──────────────────────────────────────

    /** حساب محيط المبنى من الجدران الخارجية */
    static calcPerimeter(schemaJSON) {
      const floor = schemaJSON?.floors?.[0];
      if (!floor?.walls) return 0;

      let total = 0;
      for (const w of floor.walls) {
        if (w.is_external !== false && Array.isArray(w.start) && Array.isArray(w.end)) {
          const dx = w.end[0] - w.start[0];
          const dy = w.end[1] - w.start[1];
          total += Math.sqrt(dx * dx + dy * dy);
        }
      }
      return +total.toFixed(2);
    }

    /** حساب إجمالي مساحة الغرف */
    static calcTotalRoomArea(schemaJSON) {
      const floor = schemaJSON?.floors?.[0];
      if (!floor?.rooms) return 0;
      return +floor.rooms.reduce((sum, r) => sum + (r.area_m2 || 0), 0).toFixed(1);
    }

    /** عدد عناصر كل نوع */
    static getElementCounts(schemaJSON) {
      const floor = schemaJSON?.floors?.[0];
      if (!floor) return {};
      return {
        walls: floor.walls?.length || 0,
        doors: floor.doors?.length || 0,
        windows: floor.windows?.length || 0,
        columns: floor.columns?.length || 0,
        rooms: floor.rooms?.length || 0,
        stairs: floor.stairs?.length || 0,
      };
    }

    /** مثال JSON لمخطط فيلا قطرية (للاختبار) */
    static getSampleVilla() {
      return {
        version: '1.0',
        source: { type: 'floorplan', file_count: 1, confidence: 'high' },
        floors: [{
          level: 0,
          label: 'الدور الأرضي',
          height_m: 3.2,
          walls: [
            // جدران خارجية (مستطيل 15×12)
            { id: 'W1', start: [0,0], end: [15,0], height_m: 3.2, thickness_m: 0.2, material: 'block', is_external: true },
            { id: 'W2', start: [15,0], end: [15,12], height_m: 3.2, thickness_m: 0.2, material: 'block', is_external: true },
            { id: 'W3', start: [15,12], end: [0,12], height_m: 3.2, thickness_m: 0.2, material: 'block', is_external: true },
            { id: 'W4', start: [0,12], end: [0,0], height_m: 3.2, thickness_m: 0.2, material: 'block', is_external: true },
            // جدران داخلية
            { id: 'W5', start: [6,0], end: [6,6], height_m: 3.2, thickness_m: 0.15, material: 'block', is_external: false },
            { id: 'W6', start: [0,6], end: [15,6], height_m: 3.2, thickness_m: 0.15, material: 'block', is_external: false },
            { id: 'W7', start: [10,6], end: [10,12], height_m: 3.2, thickness_m: 0.15, material: 'block', is_external: false },
            { id: 'W8', start: [6,6], end: [6,9], height_m: 3.2, thickness_m: 0.15, material: 'block', is_external: false },
            { id: 'W9', start: [0,9], end: [6,9], height_m: 3.2, thickness_m: 0.15, material: 'block', is_external: false },
          ],
          doors: [
            { id: 'D1', wall_id: 'W1', position_ratio: 0.3, width_m: 1.2, height_m: 2.4, type: 'double' }, // مدخل رئيسي
            { id: 'D2', wall_id: 'W5', position_ratio: 0.4, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D3', wall_id: 'W6', position_ratio: 0.2, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D4', wall_id: 'W6', position_ratio: 0.55, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D5', wall_id: 'W7', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D6', wall_id: 'W8', position_ratio: 0.5, width_m: 0.8, height_m: 2.1, type: 'single' }, // حمام
            { id: 'D7', wall_id: 'W9', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
          ],
          windows: [
            { id: 'WN1', wall_id: 'W1', position_ratio: 0.7, width_m: 1.8, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN2', wall_id: 'W2', position_ratio: 0.25, width_m: 1.2, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN3', wall_id: 'W2', position_ratio: 0.75, width_m: 1.5, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN4', wall_id: 'W3', position_ratio: 0.3, width_m: 1.2, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN5', wall_id: 'W3', position_ratio: 0.7, width_m: 1.2, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN6', wall_id: 'W4', position_ratio: 0.3, width_m: 1.5, height_m: 1.5, sill_height_m: 0.9 },
            { id: 'WN7', wall_id: 'W4', position_ratio: 0.7, width_m: 1.2, height_m: 1.5, sill_height_m: 0.9 },
          ],
          columns: [
            { id: 'C1', position: [6,6], width_m: 0.4, depth_m: 0.4, type: 'rectangular' },
            { id: 'C2', position: [10,6], width_m: 0.4, depth_m: 0.4, type: 'rectangular' },
          ],
          rooms: [
            { id: 'R1', name: 'مجلس', name_en: 'Majlis', area_m2: 36, polygon: [[0,0],[6,0],[6,6],[0,6]], wall_ids: ['W1','W5','W6','W4'] },
            { id: 'R2', name: 'صالة', name_en: 'Living Room', area_m2: 54, polygon: [[6,0],[15,0],[15,6],[6,6]], wall_ids: ['W1','W2','W6','W5'] },
            { id: 'R3', name: 'غرفة نوم رئيسية', name_en: 'Master Bedroom', area_m2: 30, polygon: [[10,6],[15,6],[15,12],[10,12]], wall_ids: ['W6','W2','W3','W7'] },
            { id: 'R4', name: 'غرفة نوم', name_en: 'Bedroom', area_m2: 24, polygon: [[0,6],[6,6],[6,9],[0,9]], wall_ids: ['W6','W8','W9','W4'] },
            { id: 'R5', name: 'مطبخ', name_en: 'Kitchen', area_m2: 18, polygon: [[0,9],[6,9],[6,12],[0,12]], wall_ids: ['W9','W8','W3','W4'] },
            { id: 'R6', name: 'حمام', name_en: 'Bathroom', area_m2: 12, polygon: [[6,6],[10,6],[10,9],[6,9]], wall_ids: ['W6','W7','W8'] },
          ],
          stairs: [],
        }],
        dimensions: { total_width_m: 15, total_depth_m: 12, total_area_m2: 180, unit: 'm' },
        notes: [
          'مخطط فيلا قطرية نموذجية — دور أرضي',
          'مجلس منفصل مع مدخل مزدوج — تقليد قطري',
          'جدران خارجية 200mm بلوك خرساني',
        ],
        metadata: {
          generated_by: 'QatarSpec Pro',
          analyzer: 'floorplan-analyzer',
          version: '1.0',
          timestamp: new Date().toISOString(),
          sample: true,
        },
      };
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.FloorplanAnalyzer = FloorplanAnalyzer;

  console.info('[QS] FloorplanAnalyzer v1.0 loaded');

})();
