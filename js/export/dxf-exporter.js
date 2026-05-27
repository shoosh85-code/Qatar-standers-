// js/export/dxf-exporter.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// مصدّر DXF (AutoCAD) من JSON Schema
// ينتج ملف DXF R2010 صالح يُفتح في AutoCAD/DraftSight/LibreCAD
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── ثوابت DXF ─────────────────────────────────────────────
  const DXF_VERSION = 'AC1024'; // AutoCAD 2010
  const HANDLE_START = 100;     // بداية الـ handles

  // ألوان AutoCAD ACI (AutoCAD Color Index)
  const ACI = {
    white: 7, red: 1, yellow: 2, green: 3,
    cyan: 4, blue: 5, magenta: 6, gray: 8, lightGray: 9,
  };

  // ── طبقات (Layers) ────────────────────────────────────────
  const LAYERS = [
    { name: 'WALLS',      color: ACI.white,    ltype: 'CONTINUOUS', lweight: 50 },
    { name: 'WALLS_INT',  color: ACI.gray,     ltype: 'CONTINUOUS', lweight: 25 },
    { name: 'DOORS',      color: ACI.green,    ltype: 'CONTINUOUS', lweight: 25 },
    { name: 'WINDOWS',    color: ACI.cyan,     ltype: 'CONTINUOUS', lweight: 25 },
    { name: 'COLUMNS',    color: ACI.red,      ltype: 'CONTINUOUS', lweight: 35 },
    { name: 'ROOMS',      color: ACI.yellow,   ltype: 'CONTINUOUS', lweight: 0  },
    { name: 'DIMENSIONS', color: ACI.magenta,  ltype: 'CONTINUOUS', lweight: 13 },
    { name: 'GRID',       color: ACI.lightGray,ltype: 'DASHED',     lweight: 0  },
    { name: 'TITLEBLOCK', color: ACI.white,    ltype: 'CONTINUOUS', lweight: 50 },
  ];

  // ═══════════════════════════════════════════════════════════
  // ██ DXFExporter Class
  // ═══════════════════════════════════════════════════════════

  class DXFExporter {
    constructor() {
      this._schema = null;
      this._handle = HANDLE_START;
      this._lines = [];
    }

    /** تجهيز البيانات من JSON Schema */
    fromJSON(schemaJSON) {
      if (!schemaJSON?.floors?.[0]) {
        throw new Error('JSON Schema غير صالح');
      }
      this._schema = schemaJSON;
      return this;
    }

    /** توليد محتوى DXF كاملاً */
    generate() {
      if (!this._schema) throw new Error('استدعِ fromJSON أولاً');

      this._handle = HANDLE_START;
      this._lines = [];

      this._writeHeader();
      this._writeTables();
      this._writeBlocks();
      this._writeEntities();
      this._writeObjects();
      this._writeEOF();

      return this._lines.join('\n');
    }

    /** تنزيل الملف */
    download(filename) {
      const content = this.generate();
      const blob = new Blob(['\uFEFF' + content], { type: 'application/dxf; charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'QatarSpec_Plan.dxf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // ═══════════════════════════════════════════════════════════
    // ██ INTERNAL — بناء أقسام DXF
    // ═══════════════════════════════════════════════════════════

    _nextHandle() {
      return (this._handle++).toString(16).toUpperCase();
    }

    _w(code, value) {
      this._lines.push(String(code));
      this._lines.push(String(value));
    }

    // ── HEADER ───────────────────────────────────────────────

    _writeHeader() {
      const dim = this._schema.dimensions || {};
      const maxX = dim.total_width_m || 20;
      const maxY = dim.total_depth_m || 20;

      this._w(0, 'SECTION');
      this._w(2, 'HEADER');

      // نسخة DXF
      this._w(9, '$ACADVER'); this._w(1, DXF_VERSION);

      // وحدة القياس: متر
      this._w(9, '$INSUNITS'); this._w(70, 6); // 6 = meters

      // حدود الرسم
      this._w(9, '$EXTMIN');
      this._w(10, -2); this._w(20, -2); this._w(30, 0);
      this._w(9, '$EXTMAX');
      this._w(10, maxX + 5); this._w(20, maxY + 5); this._w(30, 0);

      // نقطة الأصل
      this._w(9, '$INSBASE');
      this._w(10, 0); this._w(20, 0); this._w(30, 0);

      // دقة الأبعاد
      this._w(9, '$LUPREC'); this._w(70, 2); // رقمان بعد الفاصلة
      this._w(9, '$DIMSCALE'); this._w(40, 1);
      this._w(9, '$DIMTXT'); this._w(40, 0.2);    // حجم نص الأبعاد
      this._w(9, '$DIMASZ'); this._w(40, 0.15);   // حجم سهم الأبعاد
      this._w(9, '$DIMDEC'); this._w(70, 2);

      // text style
      this._w(9, '$TEXTSTYLE'); this._w(7, 'Standard');
      this._w(9, '$TEXTSIZE'); this._w(40, 0.25);

      this._w(0, 'ENDSEC');
    }

    // ── TABLES ───────────────────────────────────────────────

    _writeTables() {
      this._w(0, 'SECTION');
      this._w(2, 'TABLES');

      // ── VPORT ──
      this._w(0, 'TABLE');
      this._w(2, 'VPORT');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTable');
      this._w(70, 1);
      this._w(0, 'VPORT');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbViewportTableRecord');
      this._w(2, '*Active');
      this._w(70, 0);
      const dim = this._schema.dimensions || {};
      this._w(12, (dim.total_width_m || 10) / 2);
      this._w(22, (dim.total_depth_m || 10) / 2);
      this._w(40, Math.max(dim.total_width_m || 20, dim.total_depth_m || 20) * 1.3);
      this._w(0, 'ENDTAB');

      // ── LTYPE ──
      this._w(0, 'TABLE');
      this._w(2, 'LTYPE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTable');
      this._w(70, 3);

      // ByBlock
      this._w(0, 'LTYPE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbLinetypeTableRecord');
      this._w(2, 'ByBlock'); this._w(70, 0); this._w(3, ''); this._w(72, 65); this._w(73, 0); this._w(40, 0);

      // ByLayer
      this._w(0, 'LTYPE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbLinetypeTableRecord');
      this._w(2, 'ByLayer'); this._w(70, 0); this._w(3, ''); this._w(72, 65); this._w(73, 0); this._w(40, 0);

      // CONTINUOUS
      this._w(0, 'LTYPE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbLinetypeTableRecord');
      this._w(2, 'CONTINUOUS'); this._w(70, 0); this._w(3, 'Solid line'); this._w(72, 65); this._w(73, 0); this._w(40, 0);

      // DASHED
      this._w(0, 'LTYPE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbLinetypeTableRecord');
      this._w(2, 'DASHED'); this._w(70, 0); this._w(3, 'Dashed'); this._w(72, 65); this._w(73, 2); this._w(40, 0.6);
      this._w(49, 0.4); this._w(74, 0);
      this._w(49, -0.2); this._w(74, 0);

      this._w(0, 'ENDTAB');

      // ── LAYER ──
      this._w(0, 'TABLE');
      this._w(2, 'LAYER');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTable');
      this._w(70, LAYERS.length + 1);

      // Layer 0
      this._w(0, 'LAYER');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbLayerTableRecord');
      this._w(2, '0'); this._w(70, 0); this._w(62, 7); this._w(6, 'CONTINUOUS');

      for (const layer of LAYERS) {
        this._w(0, 'LAYER');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbSymbolTableRecord');
        this._w(100, 'AcDbLayerTableRecord');
        this._w(2, layer.name);
        this._w(70, 0);
        this._w(62, layer.color);
        this._w(6, layer.ltype);
        this._w(370, layer.lweight);
      }
      this._w(0, 'ENDTAB');

      // ── STYLE ──
      this._w(0, 'TABLE');
      this._w(2, 'STYLE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTable');
      this._w(70, 1);

      this._w(0, 'STYLE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbSymbolTableRecord');
      this._w(100, 'AcDbTextStyleTableRecord');
      this._w(2, 'Standard');
      this._w(70, 0); this._w(40, 0); this._w(41, 1); this._w(50, 0); this._w(71, 0);
      this._w(42, 0.25); this._w(3, 'arial.ttf'); this._w(4, '');

      this._w(0, 'ENDTAB');

      this._w(0, 'ENDSEC');
    }

    // ── BLOCKS ───────────────────────────────────────────────

    _writeBlocks() {
      this._w(0, 'SECTION');
      this._w(2, 'BLOCKS');

      // *Model_Space
      this._w(0, 'BLOCK');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, '0');
      this._w(100, 'AcDbBlockBegin');
      this._w(2, '*Model_Space');
      this._w(70, 0);
      this._w(10, 0); this._w(20, 0); this._w(30, 0);
      this._w(0, 'ENDBLK');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, '0');
      this._w(100, 'AcDbBlockEnd');

      // *Paper_Space
      this._w(0, 'BLOCK');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, '0');
      this._w(100, 'AcDbBlockBegin');
      this._w(2, '*Paper_Space');
      this._w(70, 0);
      this._w(10, 0); this._w(20, 0); this._w(30, 0);
      this._w(0, 'ENDBLK');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, '0');
      this._w(100, 'AcDbBlockEnd');

      this._w(0, 'ENDSEC');
    }

    // ── ENTITIES ─────────────────────────────────────────────

    _writeEntities() {
      this._w(0, 'SECTION');
      this._w(2, 'ENTITIES');

      const floor = this._schema.floors[0];

      // جدران
      for (const wall of (floor.walls || [])) {
        this._addWall(wall);
      }

      // أبواب
      for (const door of (floor.doors || [])) {
        const wall = (floor.walls || []).find(w => w.id === door.wall_id);
        if (wall) this._addDoor(door, wall);
      }

      // شبابيك
      for (const win of (floor.windows || [])) {
        const wall = (floor.walls || []).find(w => w.id === win.wall_id);
        if (wall) this._addWindow(win, wall);
      }

      // أعمدة
      for (const col of (floor.columns || [])) {
        this._addColumn(col);
      }

      // أسماء الغرف
      for (const room of (floor.rooms || [])) {
        this._addRoomLabel(room);
      }

      // خطوط القياس على الجدران الخارجية
      this._addAllDimensions(floor);

      // Title block
      this._addTitleBlock();

      this._w(0, 'ENDSEC');
    }

    /** جدار كـ LWPOLYLINE مستطيل بسماكة */
    _addWall(wall) {
      if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) return;
      const t = (wall.thickness_m || 0.2) / 2;
      const isExt = wall.is_external !== false;
      const layer = isExt ? 'WALLS' : 'WALLS_INT';

      const sx = wall.start[0], sy = wall.start[1];
      const ex = wall.end[0], ey = wall.end[1];
      const len = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
      if (len < 0.01) return;

      // متجه عمودي على الجدار
      const nx = -(ey - sy) / len * t;
      const ny = (ex - sx) / len * t;

      // 4 زوايا المستطيل
      const pts = [
        [sx + nx, sy + ny], [ex + nx, ey + ny],
        [ex - nx, ey - ny], [sx - nx, sy - ny],
      ];

      this._w(0, 'LWPOLYLINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, layer);
      this._w(100, 'AcDbPolyline');
      this._w(90, 4);
      this._w(70, 1); // مغلق
      for (const p of pts) {
        this._w(10, p[0].toFixed(4));
        this._w(20, p[1].toFixed(4));
      }
    }

    /** باب: خط + قوس فتح */
    _addDoor(door, wall) {
      const sx = wall.start[0], sy = wall.start[1];
      const ex = wall.end[0], ey = wall.end[1];
      const len = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
      const pos = door.position_ratio || 0.5;
      const dw = door.width_m || 0.9;

      // مركز الباب على الجدار
      const cx = sx + (ex - sx) * pos;
      const cy = sy + (ey - sy) * pos;

      // اتجاه الجدار
      const angle = Math.atan2(ey - sy, ex - sx);
      const perpAngle = angle + Math.PI / 2;

      // فتحة الباب (خطين بريك في الجدار)
      const halfW = dw / 2;
      const p1x = cx - Math.cos(angle) * halfW;
      const p1y = cy - Math.sin(angle) * halfW;
      const p2x = cx + Math.cos(angle) * halfW;
      const p2y = cy + Math.sin(angle) * halfW;

      // خط الباب
      this._w(0, 'LINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'DOORS');
      this._w(100, 'AcDbLine');
      this._w(10, p1x.toFixed(4)); this._w(20, p1y.toFixed(4)); this._w(30, 0);
      this._w(11, p2x.toFixed(4)); this._w(21, p2y.toFixed(4)); this._w(31, 0);

      // قوس فتح الباب (90°)
      const startAngleDeg = (angle * 180 / Math.PI);
      const endAngleDeg = startAngleDeg + 90;

      this._w(0, 'ARC');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'DOORS');
      this._w(100, 'AcDbCircle');
      this._w(10, p1x.toFixed(4)); this._w(20, p1y.toFixed(4)); this._w(30, 0);
      this._w(40, dw.toFixed(4));
      this._w(100, 'AcDbArc');
      this._w(50, startAngleDeg.toFixed(2)); // بداية
      this._w(51, endAngleDeg.toFixed(2));   // نهاية
    }

    /** شباك: خطين متوازيين */
    _addWindow(win, wall) {
      const sx = wall.start[0], sy = wall.start[1];
      const ex = wall.end[0], ey = wall.end[1];
      const len = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
      const pos = win.position_ratio || 0.5;
      const ww = win.width_m || 1.2;
      const t = (wall.thickness_m || 0.2) / 2;

      const angle = Math.atan2(ey - sy, ex - sx);
      const cx = sx + (ex - sx) * pos;
      const cy = sy + (ey - sy) * pos;

      const halfW = ww / 2;
      const dx = Math.cos(angle) * halfW;
      const dy = Math.sin(angle) * halfW;
      const nx = -Math.sin(angle) * t * 0.8;
      const ny = Math.cos(angle) * t * 0.8;

      // خط خارجي
      this._w(0, 'LINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'WINDOWS');
      this._w(100, 'AcDbLine');
      this._w(10, (cx - dx + nx).toFixed(4)); this._w(20, (cy - dy + ny).toFixed(4)); this._w(30, 0);
      this._w(11, (cx + dx + nx).toFixed(4)); this._w(21, (cy + dy + ny).toFixed(4)); this._w(31, 0);

      // خط داخلي
      this._w(0, 'LINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'WINDOWS');
      this._w(100, 'AcDbLine');
      this._w(10, (cx - dx - nx).toFixed(4)); this._w(20, (cy - dy - ny).toFixed(4)); this._w(30, 0);
      this._w(11, (cx + dx - nx).toFixed(4)); this._w(21, (cy + dy - ny).toFixed(4)); this._w(31, 0);

      // خطي الإغلاق
      for (const sign of [-1, 1]) {
        this._w(0, 'LINE');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbEntity');
        this._w(8, 'WINDOWS');
        this._w(100, 'AcDbLine');
        this._w(10, (cx + sign * dx + nx).toFixed(4)); this._w(20, (cy + sign * dy + ny).toFixed(4)); this._w(30, 0);
        this._w(11, (cx + sign * dx - nx).toFixed(4)); this._w(21, (cy + sign * dy - ny).toFixed(4)); this._w(31, 0);
      }
    }

    /** عمود كـ LWPOLYLINE مغلق */
    _addColumn(col) {
      if (!Array.isArray(col.position)) return;
      const cx = col.position[0], cy = col.position[1];
      const hw = (col.width_m || 0.4) / 2;
      const hd = (col.depth_m || 0.4) / 2;

      if (col.type === 'circular') {
        this._w(0, 'CIRCLE');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbEntity');
        this._w(8, 'COLUMNS');
        this._w(100, 'AcDbCircle');
        this._w(10, cx.toFixed(4)); this._w(20, cy.toFixed(4)); this._w(30, 0);
        this._w(40, hw.toFixed(4));
      } else {
        this._w(0, 'LWPOLYLINE');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbEntity');
        this._w(8, 'COLUMNS');
        this._w(100, 'AcDbPolyline');
        this._w(90, 4); this._w(70, 1);
        const pts = [
          [cx - hw, cy - hd], [cx + hw, cy - hd],
          [cx + hw, cy + hd], [cx - hw, cy + hd],
        ];
        for (const p of pts) {
          this._w(10, p[0].toFixed(4)); this._w(20, p[1].toFixed(4));
        }

        // X داخل العمود (رمز إنشائي)
        for (const diag of [[[cx-hw,cy-hd],[cx+hw,cy+hd]], [[cx+hw,cy-hd],[cx-hw,cy+hd]]]) {
          this._w(0, 'LINE');
          this._w(5, this._nextHandle());
          this._w(100, 'AcDbEntity');
          this._w(8, 'COLUMNS');
          this._w(100, 'AcDbLine');
          this._w(10, diag[0][0].toFixed(4)); this._w(20, diag[0][1].toFixed(4)); this._w(30, 0);
          this._w(11, diag[1][0].toFixed(4)); this._w(21, diag[1][1].toFixed(4)); this._w(31, 0);
        }
      }
    }

    /** اسم غرفة كـ MTEXT */
    _addRoomLabel(room) {
      if (!Array.isArray(room.polygon) || room.polygon.length < 3) return;
      let cx = 0, cy = 0;
      for (const p of room.polygon) { cx += p[0]; cy += p[1]; }
      cx /= room.polygon.length;
      cy /= room.polygon.length;

      // اسم عربي
      this._w(0, 'MTEXT');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'ROOMS');
      this._w(100, 'AcDbMText');
      this._w(10, cx.toFixed(4));
      this._w(20, cy.toFixed(4));
      this._w(30, 0);
      this._w(40, 0.25); // حجم النص
      this._w(41, 3);    // عرض النص
      this._w(71, 5);    // محاذاة وسط
      this._w(1, (room.name || '') + '\\P' + (room.name_en || '') + '\\P' + (room.area_m2 || 0).toFixed(1) + ' m\\U+00B2');
    }

    /** خطوط أبعاد على الجدران الخارجية */
    _addAllDimensions(floor) {
      const extWalls = (floor.walls || []).filter(w => w.is_external !== false);
      if (extWalls.length === 0) return;

      // حدود المبنى
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const w of extWalls) {
        if (!Array.isArray(w.start) || !Array.isArray(w.end)) continue;
        minX = Math.min(minX, w.start[0], w.end[0]);
        maxX = Math.max(maxX, w.start[0], w.end[0]);
        minY = Math.min(minY, w.start[1], w.end[1]);
        maxY = Math.max(maxY, w.start[1], w.end[1]);
      }
      if (!isFinite(minX)) return;

      const offset = 1.5;

      // بُعد عرضي (أسفل)
      this._addLinearDimension(minX, maxY + offset, maxX, maxY + offset, maxY + offset + 0.5);

      // بُعد طولي (يسار)
      this._addLinearDimension(minX - offset, minY, minX - offset, maxY, minX - offset - 0.5, true);

      // أبعاد كل جدار خارجي
      for (const w of extWalls) {
        if (!Array.isArray(w.start) || !Array.isArray(w.end)) continue;
        const len = Math.sqrt((w.end[0]-w.start[0])**2 + (w.end[1]-w.start[1])**2);
        if (len < 0.5) continue;

        const mx = (w.start[0] + w.end[0]) / 2;
        const my = (w.start[1] + w.end[1]) / 2;

        // TEXT مع الطول
        this._w(0, 'TEXT');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbEntity');
        this._w(8, 'DIMENSIONS');
        this._w(100, 'AcDbText');
        this._w(10, mx.toFixed(4));
        this._w(20, (my - 0.4).toFixed(4));
        this._w(30, 0);
        this._w(40, 0.15);
        this._w(1, len.toFixed(2));
        this._w(72, 1); // محاذاة وسط
        this._w(11, mx.toFixed(4));
        this._w(21, (my - 0.4).toFixed(4));
        this._w(31, 0);
      }
    }

    /** إضافة بُعد خطي */
    _addLinearDimension(x1, y1, x2, y2, dimLineY, vertical) {
      // خط رئيسي
      this._w(0, 'LINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'DIMENSIONS');
      this._w(100, 'AcDbLine');
      this._w(10, x1.toFixed(4)); this._w(20, y1.toFixed(4)); this._w(30, 0);
      this._w(11, x2.toFixed(4)); this._w(21, y2.toFixed(4)); this._w(31, 0);

      // القيمة
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;

      this._w(0, 'MTEXT');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'DIMENSIONS');
      this._w(100, 'AcDbMText');
      this._w(10, mx.toFixed(4));
      this._w(20, (my + (vertical ? 0 : 0.3)).toFixed(4));
      this._w(30, 0);
      this._w(40, 0.2);
      this._w(71, 5);
      this._w(1, dist.toFixed(2) + ' m');
    }

    /** إطار العنوان (Title Block) */
    _addTitleBlock() {
      const project = this._schema.project || {};
      const dim = this._schema.dimensions || {};
      const maxX = dim.total_width_m || 20;

      const tbX = -3;
      const tbY = -4;

      // مستطيل
      this._w(0, 'LWPOLYLINE');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbEntity');
      this._w(8, 'TITLEBLOCK');
      this._w(100, 'AcDbPolyline');
      this._w(90, 4); this._w(70, 1);
      this._w(10, tbX); this._w(20, tbY);
      this._w(10, (tbX + maxX + 8)); this._w(20, tbY);
      this._w(10, (tbX + maxX + 8)); this._w(20, (tbY - 2.5));
      this._w(10, tbX); this._w(20, (tbY - 2.5));

      // نصوص
      const texts = [
        { x: tbX + 0.3, y: tbY - 0.5, size: 0.4, text: 'QatarSpec Pro' },
        { x: tbX + 0.3, y: tbY - 1.2, size: 0.25, text: project.name || 'مشروع' },
        { x: tbX + 0.3, y: tbY - 1.8, size: 0.2, text: (project.engineer || 'مهندس') + ' | ' + (project.date || new Date().toISOString().split('T')[0]) },
        { x: tbX + maxX + 5, y: tbY - 0.8, size: 0.2, text: 'QCS 2024 | Ashghal RDM 2023' },
        { x: tbX + maxX + 5, y: tbY - 1.5, size: 0.15, text: 'qatar-standers.vercel.app' },
      ];

      for (const t of texts) {
        this._w(0, 'TEXT');
        this._w(5, this._nextHandle());
        this._w(100, 'AcDbEntity');
        this._w(8, 'TITLEBLOCK');
        this._w(100, 'AcDbText');
        this._w(10, t.x.toFixed(4)); this._w(20, t.y.toFixed(4)); this._w(30, 0);
        this._w(40, t.size);
        this._w(1, t.text);
      }
    }

    // ── OBJECTS ───────────────────────────────────────────────

    _writeObjects() {
      this._w(0, 'SECTION');
      this._w(2, 'OBJECTS');
      this._w(0, 'DICTIONARY');
      this._w(5, this._nextHandle());
      this._w(100, 'AcDbDictionary');
      this._w(0, 'ENDSEC');
    }

    // ── EOF ──────────────────────────────────────────────────

    _writeEOF() {
      this._w(0, 'EOF');
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.DXFExporter = DXFExporter;

  console.info('[QS] DXFExporter v1.0 loaded');

})();
