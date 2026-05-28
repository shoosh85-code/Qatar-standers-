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

  // ── Gemini Prompt الهندسي — يعمل مع جميع أنواع المخططات ────
  const ANALYSIS_PROMPT = `You are an expert architectural engineer analyzing floor plans from Qatar, GCC, and international projects.
You can analyze ANY type of architectural drawing: villa, apartment, office, warehouse, commercial, educational, hospital, or mixed-use.

## YOUR TASK:
Convert the uploaded floor plan image into a precise JSON 3D model schema.

## STEP 1 — DETECT PLAN TYPE & SCALE:
- Identify: villa / apartment / office / commercial / warehouse / site layout / other
- Look for dimension annotations (numbers like "5000", "3.5m", "15'", arrows between lines)
- If dimensions exist: use them for accurate scale
- If not: estimate using standard sizes (bedroom ~12-16m², living ~20-30m², office ~9-15m², corridor width ~1.5-2m)
- Convert ALL to METERS

## STEP 2 — TRACE ALL WALLS (CRITICAL — most common failure point):
CAREFULLY trace EVERY visible line that represents a wall:
- External walls (perimeter): thicker lines, typically 200-250mm
- Internal partition walls: thinner lines, typically 100-150mm
- Ensure corners MATCH exactly: if wall W1 ends at [8,0] and wall W2 starts at that corner, use EXACTLY [8,0]
- For L-shaped or complex buildings: trace the full perimeter, then internal divisions
- MINIMUM: you must return at least 4 walls (the perimeter rectangle). If you see rooms, there MUST be walls between them.

## STEP 3 — IDENTIFY ALL ROOMS:
Each enclosed area = one room. Provide:
- Arabic name + English name
- Area in m²
- Polygon corners (closed shape matching wall coordinates)
- Common Qatari names: مجلس، صالة، غرفة نوم، غرفة نوم رئيسية، مطبخ، حمام، ممر، مدخل، مجلس نساء، غرفة طعام، مخزن، غرفة خادمة، مغسلة، شرفة، مكتب، غرفة اجتماعات، استقبال، مرآب
- For offices: مكتب، قاعة اجتماعات، استقبال، مطبخ صغير، حمام، ممر، سيرفر روم
- For commercial: محل، مستودع، مكتب إداري، حمام عمومي

## STEP 4 — IDENTIFY OPENINGS:
- Doors: arc symbols or breaks in walls. Note wall_id + position_ratio (0-1 along wall)
- Windows: parallel lines on external walls. Note sill height

## COORDINATE SYSTEM:
- Origin (0,0) = top-left of building footprint
- X positive → right, Y positive → downward
- All units: METERS

## CRITICAL RULES:
1. DO NOT invent rooms/walls you cannot see — mark unclear items as "estimated": true
2. WALLS ARE MANDATORY — even if you can only identify the perimeter, return those 4 walls minimum
3. Room polygons must use the SAME coordinates as wall endpoints
4. Return ONLY valid JSON — no markdown, no text before/after, no \`\`\` fences
5. Every wall needs: id, start, end, height_m, thickness_m, is_external
6. Every room needs: id, name, name_en, area_m2, polygon

## JSON SCHEMA:
{
  "version": "1.0",
  "source": { "type": "floorplan", "file_count": 1, "confidence": "high|medium|low", "plan_type": "villa|apartment|office|commercial|warehouse|mixed" },
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

    // ── الخطوة 1: تنظيف markdown fences ──────────────────────
    let cleaned = rawText
      .replace(/^```json\s*/im, '')
      .replace(/^```\s*/im, '')
      .replace(/\s*```\s*$/im, '')
      .trim();

    // ── الخطوة 2: استخراج JSON block (أول { ... آخر }) ───────
    const firstBrace = cleaned.indexOf('{');
    const lastBrace  = cleaned.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error('لا يوجد JSON في الرد: ' + rawText.slice(0, 300));
    }
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);

    // ── الخطوة 3: محاولة مباشرة ───────────────────────────────
    try { return JSON.parse(cleaned); } catch (_) {}

    // ── الخطوة 4: إصلاحات متتالية ────────────────────────────
    function repair(s) {
      return s
        // حذف تعليقات JS (// و /* */)
        .replace(/\/\/[^\n\r"]*/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // trailing commas قبل ] أو }
        .replace(/,\s*([\]}])/g, '$1')
        // مفاتيح بدون quotes: { key: → { "key":
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
        // single quotes → double quotes (مع تجنب apostrophes)
        .replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')
        // newlines داخل strings → \n
        .replace(/"([^"\\]*)(\n)([^"\\]*)"/g, '"$1\\n$3"')
        // أرقام مع وحدات: 5000mm → 5000
        .replace(/:\s*(\d+(?:\.\d+)?)\s*(?:mm|cm|m|ft|in|px)\b/g, ': $1')
        // undefined/NaN → null
        .replace(/:\s*undefined\b/g, ': null')
        .replace(/:\s*NaN\b/g, ': null')
        // trailing comma في آخر array/object
        .replace(/,(\s*[\]}])/g, '$1');
    }

    const fixed = repair(cleaned);
    try { return JSON.parse(fixed); } catch (_) {}

    // ── الخطوة 5: إصلاح الـ arrays المكسورة ──────────────────
    // المشكلة: "Expected ',' or ']' after array element"
    // السبب: إحداثيات مثل [0, 0\n3] أو قيم نصية غير منتهية
    function repairArrays(s) {
      // إصلاح arrays كمختصر: ابحث عن ] أو [ مع فواصل مكسورة
      return s
        // newline بين أرقام داخل array → فاصلة
        .replace(/(\d)\s*\n\s*(\d)/g, '$1, $2')
        // مسافات زائدة قبل closing bracket
        .replace(/\[\s+\]/g, '[]')
        // فاصلة مضاعفة
        .replace(/,\s*,/g, ',')
        // array element بدون فاصلة: ] [
        .replace(/\]\s*\[/g, '], [');
    }

    const fixed2 = repairArrays(repair(cleaned));
    try { return JSON.parse(fixed2); } catch (_) {}

    // ── الخطوة 6: استخراج partial JSON بدون strict parsing ───
    // بناء JSON آمن بمسح الـ values المشكوك فيها
    function aggressiveRepair(s) {
      // استبدال أي قيمة غير صالحة بـ null أو string آمن
      return s
        // أي شيء بعد : وقبل , أو } أو ] وليس number/string/bool/null/array/object
        .replace(/:\s*([^,}\]\n"{\[0-9tfn\-][^,}\]\n]*)/g, ': null')
        // مفاتيح مكررة — أبق الأول فقط (لا يمكن إصلاحها هنا)
        .replace(/,\s*([\]}])/g, '$1')
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
    }

    const fixed3 = aggressiveRepair(repair(cleaned));
    try { return JSON.parse(fixed3); } catch (finalErr) {
      // آخر محاولة: إعادة البناء من الأجزاء الصالحة
      // نُرجع schema فارغ بدلاً من الفشل الكامل
      console.warn('[parseGeminiJSON] كل محاولات الإصلاح فشلت — إرجاع schema أساسي. الخطأ:', finalErr.message);
      return {
        version: '1.0',
        source: { type: 'floorplan', file_count: 1, confidence: 'low', parse_failed: true },
        floors: [{ level: 0, label: 'الدور الأرضي', height_m: 3.0,
          walls: [], doors: [], windows: [], columns: [], rooms: [], stairs: [] }],
        dimensions: { total_width_m: 10, total_depth_m: 10, total_area_m2: 100, unit: 'm' },
        notes: ['تعذّر تحليل رد الذكاء الاصطناعي بدقة — يرجى إعادة المحاولة أو استخدام صورة بدقة أعلى']
      };
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

        // ═══ إصلاح: إحداثيات start/end كـ object بدل array ═══
        floor.walls = floor.walls.map(w => {
          if (w.start && !Array.isArray(w.start) && typeof w.start === 'object') {
            w.start = [w.start.x || 0, w.start.y || 0];
          }
          if (w.end && !Array.isArray(w.end) && typeof w.end === 'object') {
            w.end = [w.end.x || 0, w.end.y || 0];
          }
          return w;
        });

        // ═══ CRITICAL FIX: توليد جدران من الغرف إذا لم يرسل Gemini جدران ═══
        if (floor.walls.length === 0 && floor.rooms.length > 0) {
          console.info('[normalizeResult] لا جدران — توليد تلقائي من', floor.rooms.length, 'غرفة');
          const wallMap = new Map();
          let wIdx = 1;
          for (const room of floor.rooms) {
            const poly = room.polygon;
            if (!Array.isArray(poly) || poly.length < 3) continue;
            for (let i = 0; i < poly.length; i++) {
              const s = poly[i], e = poly[(i + 1) % poly.length];
              if (!Array.isArray(s) || !Array.isArray(e)) continue;
              // مفتاح فريد (مرتب)
              const sk = s[0].toFixed(2) + ',' + s[1].toFixed(2);
              const ek = e[0].toFixed(2) + ',' + e[1].toFixed(2);
              const key = sk < ek ? sk + '→' + ek : ek + '→' + sk;
              if (wallMap.has(key)) {
                wallMap.get(key).is_external = false;
                wallMap.get(key).thickness_m = 0.15;
              } else {
                const wall = {
                  id: 'WG' + wIdx++,
                  start: [s[0], s[1]], end: [e[0], e[1]],
                  height_m: floor.height_m, thickness_m: 0.2,
                  material: 'block', is_external: true,
                };
                wallMap.set(key, wall);
                floor.walls.push(wall);
              }
            }
          }
          json.notes.push('تم توليد الجدران تلقائياً من حدود الغرف — قد تحتاج تعديل يدوي');
        }

        // أضف IDs مفقودة
        floor.walls.forEach((w, i) => { if (!w.id) w.id = `W${i + 1}`; });
        floor.doors.forEach((d, i) => { if (!d.id) d.id = `D${i + 1}`; });
        floor.windows.forEach((w, i) => { if (!w.id) w.id = `WN${i + 1}`; });
        floor.columns.forEach((c, i) => { if (!c.id) c.id = `C${i + 1}`; });
        floor.rooms.forEach((r, i) => { if (!r.id) r.id = `R${i + 1}`; });
        floor.stairs.forEach((s, i) => { if (!s.id) s.id = `S${i + 1}`; });

        // حسابات الأبعاد الكلية من الجدران + الغرف
        if ((!json.dimensions.total_width_m || json.dimensions.total_width_m === 0)) {
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          for (const w of floor.walls) {
            if (Array.isArray(w.start) && Array.isArray(w.end)) {
              minX = Math.min(minX, w.start[0], w.end[0]);
              maxX = Math.max(maxX, w.start[0], w.end[0]);
              minY = Math.min(minY, w.start[1], w.end[1]);
              maxY = Math.max(maxY, w.start[1], w.end[1]);
            }
          }
          // أيضاً من الغرف
          for (const r of floor.rooms) {
            for (const p of (r.polygon || [])) {
              if (Array.isArray(p)) {
                minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
                minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
              }
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
      version: '1.1',
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
          version: '1.1',
          timestamp: new Date().toISOString(),
          sample: true,
        },
      };
    }

    /** نموذج شقة — apartment */
    static getSampleApartment() {
      return {
        version: '1.0',
        source: { type: 'floorplan', file_count: 1, confidence: 'high', plan_type: 'apartment' },
        floors: [{
          level: 0,
          label: 'شقة — الدور الخامس',
          height_m: 2.8,
          walls: [
            { id: 'W1', start: [0,0], end: [10,0], height_m: 2.8, thickness_m: 0.2, is_external: true },
            { id: 'W2', start: [10,0], end: [10,8], height_m: 2.8, thickness_m: 0.2, is_external: true },
            { id: 'W3', start: [10,8], end: [0,8], height_m: 2.8, thickness_m: 0.2, is_external: true },
            { id: 'W4', start: [0,8], end: [0,0], height_m: 2.8, thickness_m: 0.2, is_external: true },
            { id: 'W5', start: [0,5], end: [6,5], height_m: 2.8, thickness_m: 0.12, is_external: false },
            { id: 'W6', start: [6,0], end: [6,5], height_m: 2.8, thickness_m: 0.12, is_external: false },
            { id: 'W7', start: [6,5], end: [6,8], height_m: 2.8, thickness_m: 0.12, is_external: false },
            { id: 'W8', start: [3,5], end: [3,8], height_m: 2.8, thickness_m: 0.12, is_external: false },
          ],
          doors: [
            { id: 'D1', wall_id: 'W4', position_ratio: 0.35, width_m: 1.0, height_m: 2.1, type: 'single' },
            { id: 'D2', wall_id: 'W5', position_ratio: 0.3, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D3', wall_id: 'W6', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D4', wall_id: 'W7', position_ratio: 0.5, width_m: 0.8, height_m: 2.1, type: 'single' },
            { id: 'D5', wall_id: 'W8', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
          ],
          windows: [
            { id: 'WN1', wall_id: 'W1', position_ratio: 0.3, width_m: 1.5, height_m: 1.4, sill_height_m: 0.9 },
            { id: 'WN2', wall_id: 'W1', position_ratio: 0.7, width_m: 1.2, height_m: 1.4, sill_height_m: 0.9 },
            { id: 'WN3', wall_id: 'W2', position_ratio: 0.5, width_m: 1.5, height_m: 1.4, sill_height_m: 0.9 },
            { id: 'WN4', wall_id: 'W3', position_ratio: 0.5, width_m: 1.8, height_m: 1.4, sill_height_m: 0.9 },
          ],
          columns: [],
          rooms: [
            { id: 'R1', name: 'صالة', name_en: 'Living Room', area_m2: 30, polygon: [[0,0],[6,0],[6,5],[0,5]] },
            { id: 'R2', name: 'غرفة نوم', name_en: 'Bedroom', area_m2: 16, polygon: [[6,0],[10,0],[10,5],[6,5]] },  // يسار فوق - تعديل
            { id: 'R3', name: 'غرفة نوم رئيسية', name_en: 'Master Bedroom', area_m2: 18, polygon: [[0,5],[3,5],[3,8],[0,8]] },
            { id: 'R4', name: 'مطبخ', name_en: 'Kitchen', area_m2: 9, polygon: [[3,5],[6,5],[6,8],[3,8]] },
            { id: 'R5', name: 'حمام', name_en: 'Bathroom', area_m2: 12, polygon: [[6,5],[10,5],[10,8],[6,8]] },
          ],
          stairs: [],
        }],
        dimensions: { total_width_m: 10, total_depth_m: 8, total_area_m2: 80, unit: 'm' },
        notes: ['شقة نموذجية في برج سكني قطري'],
        metadata: { generated_by: 'QatarSpec Pro', analyzer: 'floorplan-analyzer', version: '1.1', timestamp: new Date().toISOString(), sample: true },
      };
    }

    /** نموذج مكتب — office */
    static getSampleOffice() {
      return {
        version: '1.0',
        source: { type: 'floorplan', file_count: 1, confidence: 'high', plan_type: 'office' },
        floors: [{
          level: 0,
          label: 'مكتب — الدور الثالث',
          height_m: 3.0,
          walls: [
            { id: 'W1', start: [0,0], end: [20,0], height_m: 3.0, thickness_m: 0.2, is_external: true },
            { id: 'W2', start: [20,0], end: [20,10], height_m: 3.0, thickness_m: 0.2, is_external: true },
            { id: 'W3', start: [20,10], end: [0,10], height_m: 3.0, thickness_m: 0.2, is_external: true },
            { id: 'W4', start: [0,10], end: [0,0], height_m: 3.0, thickness_m: 0.2, is_external: true },
            { id: 'W5', start: [0,3], end: [12,3], height_m: 3.0, thickness_m: 0.12, is_external: false },
            { id: 'W6', start: [6,0], end: [6,3], height_m: 3.0, thickness_m: 0.12, is_external: false },
            { id: 'W7', start: [12,0], end: [12,10], height_m: 3.0, thickness_m: 0.12, is_external: false },
            { id: 'W8', start: [12,5], end: [20,5], height_m: 3.0, thickness_m: 0.12, is_external: false },
            { id: 'W9', start: [16,5], end: [16,10], height_m: 3.0, thickness_m: 0.12, is_external: false },
          ],
          doors: [
            { id: 'D1', wall_id: 'W4', position_ratio: 0.15, width_m: 1.2, height_m: 2.1, type: 'double' },
            { id: 'D2', wall_id: 'W6', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D3', wall_id: 'W5', position_ratio: 0.7, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D4', wall_id: 'W7', position_ratio: 0.3, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D5', wall_id: 'W7', position_ratio: 0.7, width_m: 0.9, height_m: 2.1, type: 'single' },
            { id: 'D6', wall_id: 'W8', position_ratio: 0.5, width_m: 0.9, height_m: 2.1, type: 'single' },
          ],
          windows: [
            { id: 'WN1', wall_id: 'W1', position_ratio: 0.2, width_m: 2.0, height_m: 1.8, sill_height_m: 0.7 },
            { id: 'WN2', wall_id: 'W1', position_ratio: 0.6, width_m: 2.0, height_m: 1.8, sill_height_m: 0.7 },
            { id: 'WN3', wall_id: 'W2', position_ratio: 0.3, width_m: 2.0, height_m: 1.8, sill_height_m: 0.7 },
            { id: 'WN4', wall_id: 'W3', position_ratio: 0.3, width_m: 2.0, height_m: 1.8, sill_height_m: 0.7 },
            { id: 'WN5', wall_id: 'W3', position_ratio: 0.7, width_m: 2.0, height_m: 1.8, sill_height_m: 0.7 },
          ],
          columns: [
            { id: 'C1', position: [6,3], width_m: 0.4, depth_m: 0.4, type: 'rectangular' },
            { id: 'C2', position: [12,3], width_m: 0.4, depth_m: 0.4, type: 'rectangular' },
          ],
          rooms: [
            { id: 'R1', name: 'استقبال', name_en: 'Reception', area_m2: 18, polygon: [[0,0],[6,0],[6,3],[0,3]] },
            { id: 'R2', name: 'مكتب المدير', name_en: 'Manager Office', area_m2: 18, polygon: [[6,0],[12,0],[12,3],[6,3]] },
            { id: 'R3', name: 'منطقة عمل مفتوحة', name_en: 'Open Workspace', area_m2: 84, polygon: [[0,3],[12,3],[12,10],[0,10]] },
            { id: 'R4', name: 'قاعة اجتماعات', name_en: 'Meeting Room', area_m2: 40, polygon: [[12,0],[20,0],[20,5],[12,5]] },
            { id: 'R5', name: 'سيرفر + حمام', name_en: 'Server + WC', area_m2: 20, polygon: [[12,5],[16,5],[16,10],[12,10]] },
            { id: 'R6', name: 'مطبخ صغير', name_en: 'Kitchenette', area_m2: 20, polygon: [[16,5],[20,5],[20,10],[16,10]] },
          ],
          stairs: [],
        }],
        dimensions: { total_width_m: 20, total_depth_m: 10, total_area_m2: 200, unit: 'm' },
        notes: ['مكتب إداري نموذجي — برج تجاري في قطر'],
        metadata: { generated_by: 'QatarSpec Pro', analyzer: 'floorplan-analyzer', version: '1.1', timestamp: new Date().toISOString(), sample: true },
      };
    }

    /** اختيار نموذج حسب النوع */
    static getSample(type) {
      const samples = {
        villa: FloorplanAnalyzer.getSampleVilla,
        apartment: FloorplanAnalyzer.getSampleApartment,
        office: FloorplanAnalyzer.getSampleOffice,
      };
      return (samples[type] || samples.villa)();
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.FloorplanAnalyzer = FloorplanAnalyzer;

  console.info('[QS] FloorplanAnalyzer v1.1 loaded — universal plan support');

})();
