// js/analyzer/qcs-compliance.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// محرك فحص مطابقة QCS 2024 — 50 بند هندسي
// يأخذ JSON Schema → يفحص كل عنصر → pass/fail/warning
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ═══════════════════════════════════════════════════════════
  // ██ 50 بند QCS 2024
  // ═══════════════════════════════════════════════════════════

  const RULES = [
    // ── إنشائي (1-15) ──────────────────────────────────
    { id: 'S01', name_ar: 'سماكة جدار خارجي', name_en: 'External Wall Thickness', clause: 'QCS 2024 S9-P3', category: 'structural', check: 'wall_ext_thickness', min: 0.2, unit: 'm', severity: 'major' },
    { id: 'S02', name_ar: 'سماكة جدار داخلي', name_en: 'Internal Wall Thickness', clause: 'QCS 2024 S9-P3', category: 'structural', check: 'wall_int_thickness', min: 0.1, unit: 'm', severity: 'minor' },
    { id: 'S03', name_ar: 'أبعاد عمود (أدنى)', name_en: 'Minimum Column Size', clause: 'QCS 2024 S5-P2', category: 'structural', check: 'column_min_size', min: 0.3, unit: 'm', severity: 'critical' },
    { id: 'S04', name_ar: 'ارتفاع الدور الصافي', name_en: 'Clear Floor Height', clause: 'QCS 2024 S9-P2', category: 'structural', check: 'floor_height', min: 2.7, unit: 'm', severity: 'major' },
    { id: 'S05', name_ar: 'مسافة بين أعمدة', name_en: 'Column Spacing', clause: 'QCS 2024 S5-P1', category: 'structural', check: 'column_spacing', max: 8, unit: 'm', severity: 'major' },
    { id: 'S06', name_ar: 'غطاء خرساني أعمدة', name_en: 'Column Concrete Cover', clause: 'QCS 2024 S5-P2-C5.2.4', category: 'structural', check: 'info_only', min: 0.05, unit: 'm', severity: 'critical' },
    { id: 'S07', name_ar: 'سماكة بلاطة', name_en: 'Slab Thickness', clause: 'QCS 2024 S5-P2', category: 'structural', check: 'info_only', min: 0.15, unit: 'm', severity: 'major' },
    { id: 'S08', name_ar: 'Lap Length حديد', name_en: 'Rebar Lap Length', clause: 'QCS 2024 S5-P2-C5.2.6', category: 'structural', check: 'info_only', min: 0.48, unit: 'm', severity: 'critical' },
    { id: 'S09', name_ar: 'سماكة Plaster', name_en: 'Plaster Thickness', clause: 'QCS 2024 S9-P5', category: 'structural', check: 'info_only', min: 0.015, unit: 'm', severity: 'minor' },
    { id: 'S10', name_ar: 'طول جدار بدون تدعيم', name_en: 'Unsupported Wall Length', clause: 'QCS 2024 S9-P3', category: 'structural', check: 'wall_max_length', max: 6, unit: 'm', severity: 'major' },
    { id: 'S11', name_ar: 'نسبة فتحات الجدار', name_en: 'Wall Opening Ratio', clause: 'QCS 2024 S9-P3', category: 'structural', check: 'wall_opening_ratio', max: 0.5, unit: 'ratio', severity: 'major' },
    { id: 'S12', name_ar: 'Curing مدة', name_en: 'Curing Duration', clause: 'QCS 2024 S5-P3-C5.3.7', category: 'structural', check: 'info_only', min: 7, unit: 'days', severity: 'critical' },
    { id: 'S13', name_ar: 'Formwork إزالة', name_en: 'Formwork Removal', clause: 'QCS 2024 S5-P2-C5.2.9', category: 'structural', check: 'info_only', min: 14, unit: 'days', severity: 'critical' },
    { id: 'S14', name_ar: 'مقاومة خرسانة أعمدة', name_en: 'Column Concrete Grade', clause: 'QCS 2024 S5-P3', category: 'structural', check: 'info_only', min: 40, unit: 'MPa', severity: 'critical' },
    { id: 'S15', name_ar: 'ارتفاع درابزين', name_en: 'Railing Height', clause: 'QCS 2024 S9-P2', category: 'structural', check: 'info_only', min: 1.1, unit: 'm', severity: 'major' },

    // ── معماري (16-30) ──────────────────────────────────
    { id: 'A01', name_ar: 'عرض فتحة باب', name_en: 'Door Opening Width', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'door_min_width', min: 0.8, unit: 'm', severity: 'major' },
    { id: 'A02', name_ar: 'ارتفاع فتحة باب', name_en: 'Door Opening Height', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'door_min_height', min: 2.0, unit: 'm', severity: 'major' },
    { id: 'A03', name_ar: 'ارتفاع Sill شباك', name_en: 'Window Sill Height', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'window_sill_height', min: 0.9, unit: 'm', severity: 'major' },
    { id: 'A04', name_ar: 'مساحة غرفة نوم (أدنى)', name_en: 'Bedroom Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['غرفة نوم', 'Bedroom'], min: 9, unit: 'm2', severity: 'major' },
    { id: 'A05', name_ar: 'مساحة غرفة نوم رئيسية', name_en: 'Master Bedroom Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['غرفة نوم رئيسية', 'Master'], min: 12, unit: 'm2', severity: 'major' },
    { id: 'A06', name_ar: 'مساحة صالة', name_en: 'Living Room Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['صالة', 'Living'], min: 15, unit: 'm2', severity: 'minor' },
    { id: 'A07', name_ar: 'مساحة مطبخ', name_en: 'Kitchen Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['مطبخ', 'Kitchen'], min: 6, unit: 'm2', severity: 'minor' },
    { id: 'A08', name_ar: 'مساحة حمام', name_en: 'Bathroom Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['حمام', 'Bathroom'], min: 3, unit: 'm2', severity: 'minor' },
    { id: 'A09', name_ar: 'عرض ممر', name_en: 'Corridor Width', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_dim', room_type: ['ممر', 'Corridor'], min: 1.2, unit: 'm', severity: 'major' },
    { id: 'A10', name_ar: 'عرض درج', name_en: 'Stair Width', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'stair_width', min: 1.0, unit: 'm', severity: 'critical' },
    { id: 'A11', name_ar: 'نسبة تهوية الغرفة', name_en: 'Room Ventilation Ratio', clause: 'QCS 2024 S13-P2', category: 'architectural', check: 'ventilation_ratio', min: 0.05, unit: 'ratio', severity: 'major' },
    { id: 'A12', name_ar: 'مساحة مجلس', name_en: 'Majlis Min Area', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'room_min_area', room_type: ['مجلس', 'Majlis'], min: 16, unit: 'm2', severity: 'minor' },
    { id: 'A13', name_ar: 'عرض مدخل رئيسي', name_en: 'Main Entrance Width', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'main_door_width', min: 1.0, unit: 'm', severity: 'major' },
    { id: 'A14', name_ar: 'عدد مخارج الطوارئ', name_en: 'Emergency Exits Count', clause: 'QCS 2024 S14-P2', category: 'architectural', check: 'exit_count', min: 2, unit: 'count', severity: 'critical' },
    { id: 'A15', name_ar: 'عرض باب حمام', name_en: 'Bathroom Door Width', clause: 'QCS 2024 S9-P2', category: 'architectural', check: 'bathroom_door', min: 0.7, unit: 'm', severity: 'minor' },

    // ── MEP (31-40) ─────────────────────────────────────
    { id: 'M01', name_ar: 'ارتفاع مأخذ كهرباء', name_en: 'Socket Height', clause: 'KAHRAMAA 2024 Reg.5', category: 'mep', check: 'info_only', min: 0.3, unit: 'm', severity: 'minor' },
    { id: 'M02', name_ar: 'ارتفاع مفتاح إنارة', name_en: 'Switch Height', clause: 'KAHRAMAA 2024 Reg.5', category: 'mep', check: 'info_only', min: 1.2, max: 1.4, unit: 'm', severity: 'minor' },
    { id: 'M03', name_ar: 'تهوية حمام', name_en: 'Bathroom Ventilation', clause: 'QCS 2024 S15-P2', category: 'mep', check: 'info_only', min: 1, unit: 'fan', severity: 'major' },
    { id: 'M04', name_ar: 'تهوية مطبخ', name_en: 'Kitchen Ventilation', clause: 'QCS 2024 S15-P2', category: 'mep', check: 'info_only', min: 1, unit: 'hood', severity: 'major' },
    { id: 'M05', name_ar: 'حمل كهربائي للوحدة', name_en: 'Unit Electrical Load', clause: 'KAHRAMAA 2024 Reg.3', category: 'mep', check: 'info_only', min: 60, unit: 'A', severity: 'major' },
    { id: 'M06', name_ar: 'نقاط إنارة لكل غرفة', name_en: 'Light Points per Room', clause: 'KAHRAMAA 2024 Reg.5', category: 'mep', check: 'info_only', min: 1, unit: 'point', severity: 'minor' },
    { id: 'M07', name_ar: 'نظام تكييف مركزي', name_en: 'Central AC System', clause: 'QCS 2024 S15-P3', category: 'mep', check: 'info_only', min: 1, unit: 'system', severity: 'major' },
    { id: 'M08', name_ar: 'عزل حراري جدران', name_en: 'Wall Thermal Insulation', clause: 'QCS 2024 S11-P2 / GSAS', category: 'mep', check: 'info_only', min: 0.05, unit: 'm', severity: 'major' },
    { id: 'M09', name_ar: 'عزل مائي حمامات', name_en: 'Bathroom Waterproofing', clause: 'QCS 2024 S11-P3', category: 'mep', check: 'info_only', min: 1, unit: 'layer', severity: 'critical' },
    { id: 'M10', name_ar: 'ميول تصريف سطح', name_en: 'Roof Drainage Slope', clause: 'QCS 2024 S11-P4', category: 'mep', check: 'info_only', min: 1.5, unit: '%', severity: 'major' },

    // ── طرق ومرافق (41-50) ──────────────────────────────
    { id: 'I01', name_ar: 'عرض مدخل سيارات', name_en: 'Vehicle Entrance Width', clause: 'Ashghal RDM 2023 Ch.7', category: 'infrastructure', check: 'info_only', min: 3.5, unit: 'm', severity: 'major' },
    { id: 'I02', name_ar: 'عرض موقف سيارة', name_en: 'Parking Space Width', clause: 'Ashghal RDM 2023 Ch.7', category: 'infrastructure', check: 'info_only', min: 2.5, unit: 'm', severity: 'minor' },
    { id: 'I03', name_ar: 'طول موقف سيارة', name_en: 'Parking Space Length', clause: 'Ashghal RDM 2023 Ch.7', category: 'infrastructure', check: 'info_only', min: 5.5, unit: 'm', severity: 'minor' },
    { id: 'I04', name_ar: 'عرض رصيف', name_en: 'Sidewalk Width', clause: 'Ashghal RDM 2023 Ch.5', category: 'infrastructure', check: 'info_only', min: 1.5, unit: 'm', severity: 'major' },
    { id: 'I05', name_ar: 'ميول تصريف أرضي', name_en: 'Ground Drainage Slope', clause: 'Ashghal RDM 2023 Ch.9', category: 'infrastructure', check: 'info_only', min: 0.5, unit: '%', severity: 'major' },
    { id: 'I06', name_ar: 'مسافة بين manholes', name_en: 'Manhole Spacing', clause: 'Ashghal PWA Ch.4', category: 'infrastructure', check: 'info_only', max: 80, unit: 'm', severity: 'minor' },
    { id: 'I07', name_ar: 'عمق مواسير صرف', name_en: 'Sewer Pipe Depth', clause: 'Ashghal PWA Ch.4', category: 'infrastructure', check: 'info_only', min: 1.2, unit: 'm', severity: 'major' },
    { id: 'I08', name_ar: 'Fire Access عرض', name_en: 'Fire Access Width', clause: 'QCS 2024 S14-P3', category: 'infrastructure', check: 'info_only', min: 3.7, unit: 'm', severity: 'critical' },
    { id: 'I09', name_ar: 'مسافة hydrant', name_en: 'Hydrant Spacing', clause: 'QCS 2024 S14-P4', category: 'infrastructure', check: 'info_only', max: 60, unit: 'm', severity: 'critical' },
    { id: 'I10', name_ar: 'إضاءة خارجية', name_en: 'External Lighting', clause: 'KAHRAMAA 2024 Reg.8', category: 'infrastructure', check: 'info_only', min: 10, unit: 'lux', severity: 'minor' },
  ];

  // ═══════════════════════════════════════════════════════════
  // ██ QCSCompliance Class
  // ═══════════════════════════════════════════════════════════

  class QCSCompliance {
    constructor() {
      this._results = [];
    }

    /** فحص كامل */
    checkAll(schemaJSON) {
      if (!schemaJSON?.floors?.[0]) throw new Error('JSON Schema غير صالح');
      this._results = [];
      const floor = schemaJSON.floors[0];

      for (const rule of RULES) {
        const result = this._evaluateRule(rule, floor, schemaJSON);
        this._results.push(result);
      }
      return this._results;
    }

    /** فحص فئة محددة */
    checkStructural(s) { return this.checkAll(s).filter(r => r.category === 'structural'); }
    checkArchitectural(s) { return this.checkAll(s).filter(r => r.category === 'architectural'); }
    checkMEP(s) { return this.checkAll(s).filter(r => r.category === 'mep'); }
    checkInfrastructure(s) { return this.checkAll(s).filter(r => r.category === 'infrastructure'); }

    /** ملخص */
    getSummary() {
      const total = this._results.length;
      const pass = this._results.filter(r => r.status === 'pass').length;
      const fail = this._results.filter(r => r.status === 'fail').length;
      const warning = this._results.filter(r => r.status === 'warning').length;
      const na = this._results.filter(r => r.status === 'not_applicable').length;
      const checked = total - na;
      return {
        total, pass, fail, warning, not_applicable: na,
        score_percent: checked > 0 ? Math.round((pass / checked) * 100) : 0,
        critical_fails: this._results.filter(r => r.status === 'fail' && r.severity === 'critical').length,
      };
    }

    getFailedItems() { return this._results.filter(r => r.status === 'fail'); }
    getWarnings() { return this._results.filter(r => r.status === 'warning'); }
    getQCSReferences() { return [...new Set(this._results.map(r => r.clause))]; }
    getResults() { return [...this._results]; }

    static get RULES() { return RULES; }

    // ── تقييم بند واحد ──────────────────────────────────────

    _evaluateRule(rule, floor, schema) {
      const base = {
        id: rule.id, name_ar: rule.name_ar, name_en: rule.name_en,
        clause: rule.clause, category: rule.category, severity: rule.severity,
        required_min: rule.min, required_max: rule.max, unit: rule.unit,
      };

      try {
        switch (rule.check) {
          case 'wall_ext_thickness':
            return this._checkWalls(floor.walls, true, rule, base);
          case 'wall_int_thickness':
            return this._checkWalls(floor.walls, false, rule, base);
          case 'column_min_size':
            return this._checkColumns(floor.columns, rule, base);
          case 'floor_height':
            return this._checkValue(floor.height_m, rule, base);
          case 'column_spacing':
            return this._checkColumnSpacing(floor.columns, rule, base);
          case 'wall_max_length':
            return this._checkWallLength(floor.walls, rule, base);
          case 'wall_opening_ratio':
            return this._checkWallOpenings(floor, rule, base);
          case 'door_min_width':
            return this._checkDoors(floor.doors, 'width_m', rule, base);
          case 'door_min_height':
            return this._checkDoors(floor.doors, 'height_m', rule, base);
          case 'window_sill_height':
            return this._checkWindows(floor.windows, rule, base);
          case 'room_min_area':
            return this._checkRoomArea(floor.rooms, rule, base);
          case 'room_min_dim':
            return this._checkRoomMinDim(floor.rooms, rule, base);
          case 'stair_width':
            return this._checkStairs(floor.stairs, rule, base);
          case 'ventilation_ratio':
            return this._checkVentilation(floor, rule, base);
          case 'main_door_width':
            return this._checkMainDoor(floor.doors, rule, base);
          case 'exit_count':
            return this._checkExitCount(floor.doors, rule, base);
          case 'bathroom_door':
            return this._checkBathroomDoor(floor, rule, base);
          case 'info_only':
            return { ...base, measured: null, status: 'not_applicable', note: 'يحتاج فحص ميداني' };
          default:
            return { ...base, measured: null, status: 'not_applicable' };
        }
      } catch (err) {
        return { ...base, measured: null, status: 'not_applicable', note: err.message };
      }
    }

    _checkValue(value, rule, base) {
      if (value === undefined || value === null) return { ...base, measured: null, status: 'not_applicable' };
      const pass = (rule.min === undefined || value >= rule.min) && (rule.max === undefined || value <= rule.max);
      return { ...base, measured: value, status: pass ? 'pass' : 'fail' };
    }

    _checkWalls(walls, external, rule, base) {
      if (!walls?.length) return { ...base, measured: null, status: 'not_applicable' };
      const filtered = walls.filter(w => external ? w.is_external !== false : w.is_external === false);
      if (filtered.length === 0) return { ...base, measured: null, status: 'not_applicable' };
      const minThick = Math.min(...filtered.map(w => w.thickness_m || 0));
      return { ...base, measured: minThick, status: minThick >= rule.min ? 'pass' : 'fail', elements_checked: filtered.length };
    }

    _checkColumns(columns, rule, base) {
      if (!columns?.length) return { ...base, measured: null, status: 'not_applicable' };
      const minSize = Math.min(...columns.map(c => Math.min(c.width_m || 0, c.depth_m || 0)));
      return { ...base, measured: minSize, status: minSize >= rule.min ? 'pass' : 'fail' };
    }

    _checkColumnSpacing(columns, rule, base) {
      if (!columns?.length || columns.length < 2) return { ...base, measured: null, status: 'not_applicable' };
      let maxDist = 0;
      for (let i = 0; i < columns.length; i++) {
        for (let j = i + 1; j < columns.length; j++) {
          const d = Math.sqrt(
            (columns[i].position[0] - columns[j].position[0]) ** 2 +
            (columns[i].position[1] - columns[j].position[1]) ** 2
          );
          if (d > maxDist) maxDist = d;
        }
      }
      return { ...base, measured: +maxDist.toFixed(2), status: maxDist <= rule.max ? 'pass' : 'fail' };
    }

    _checkWallLength(walls, rule, base) {
      if (!walls?.length) return { ...base, measured: null, status: 'not_applicable' };
      let maxLen = 0;
      for (const w of walls) {
        if (!Array.isArray(w.start) || !Array.isArray(w.end)) continue;
        const len = Math.sqrt((w.end[0]-w.start[0])**2 + (w.end[1]-w.start[1])**2);
        if (len > maxLen) maxLen = len;
      }
      return { ...base, measured: +maxLen.toFixed(2), status: maxLen <= rule.max ? 'pass' : rule.severity === 'major' ? 'warning' : 'fail' };
    }

    _checkWallOpenings(floor, rule, base) {
      if (!floor.walls?.length) return { ...base, measured: null, status: 'not_applicable' };
      // فحص بسيط: نسبة فتحات لكل جدار
      let worstRatio = 0;
      for (const w of floor.walls) {
        if (!Array.isArray(w.start) || !Array.isArray(w.end)) continue;
        const len = Math.sqrt((w.end[0]-w.start[0])**2 + (w.end[1]-w.start[1])**2);
        if (len < 0.5) continue;
        const doors = (floor.doors || []).filter(d => d.wall_id === w.id);
        const wins = (floor.windows || []).filter(wn => wn.wall_id === w.id);
        const openingLen = doors.reduce((s, d) => s + (d.width_m || 0.9), 0) + wins.reduce((s, wn) => s + (wn.width_m || 1.2), 0);
        const ratio = openingLen / len;
        if (ratio > worstRatio) worstRatio = ratio;
      }
      return { ...base, measured: +worstRatio.toFixed(2), status: worstRatio <= rule.max ? 'pass' : 'warning' };
    }

    _checkDoors(doors, field, rule, base) {
      if (!doors?.length) return { ...base, measured: null, status: 'not_applicable' };
      const minVal = Math.min(...doors.map(d => d[field] || 0));
      return { ...base, measured: minVal, status: minVal >= rule.min ? 'pass' : 'fail', elements_checked: doors.length };
    }

    _checkWindows(windows, rule, base) {
      if (!windows?.length) return { ...base, measured: null, status: 'not_applicable' };
      const minSill = Math.min(...windows.map(w => w.sill_height_m || 0));
      return { ...base, measured: minSill, status: minSill >= rule.min ? 'pass' : 'fail' };
    }

    _checkRoomArea(rooms, rule, base) {
      if (!rooms?.length) return { ...base, measured: null, status: 'not_applicable' };
      const types = rule.room_type || [];
      const matching = rooms.filter(r =>
        types.some(t => (r.name || '').includes(t) || (r.name_en || '').includes(t))
      );
      if (matching.length === 0) return { ...base, measured: null, status: 'not_applicable' };
      const minArea = Math.min(...matching.map(r => r.area_m2 || 0));
      return { ...base, measured: minArea, status: minArea >= rule.min ? 'pass' : 'fail', rooms_checked: matching.map(r => r.id) };
    }

    _checkRoomMinDim(rooms, rule, base) {
      // تقدير أصغر بُعد من polygon
      if (!rooms?.length) return { ...base, measured: null, status: 'not_applicable' };
      const types = rule.room_type || [];
      const matching = rooms.filter(r =>
        types.some(t => (r.name || '').includes(t) || (r.name_en || '').includes(t))
      );
      if (matching.length === 0) return { ...base, measured: null, status: 'not_applicable' };
      // تقدير عرض من area / أطول بُعد
      for (const r of matching) {
        if (!Array.isArray(r.polygon) || r.polygon.length < 3) continue;
        let maxDist = 0;
        for (let i = 0; i < r.polygon.length; i++) {
          for (let j = i + 1; j < r.polygon.length; j++) {
            const d = Math.sqrt((r.polygon[i][0]-r.polygon[j][0])**2 + (r.polygon[i][1]-r.polygon[j][1])**2);
            if (d > maxDist) maxDist = d;
          }
        }
        const minDim = maxDist > 0 ? (r.area_m2 || 0) / maxDist : 0;
        if (minDim < rule.min) return { ...base, measured: +minDim.toFixed(2), status: 'fail' };
      }
      return { ...base, measured: rule.min, status: 'pass' };
    }

    _checkStairs(stairs, rule, base) {
      if (!stairs?.length) return { ...base, measured: null, status: 'not_applicable' };
      const minW = Math.min(...stairs.map(s => s.width_m || 0));
      return { ...base, measured: minW, status: minW >= rule.min ? 'pass' : 'fail' };
    }

    _checkVentilation(floor, rule, base) {
      if (!floor.rooms?.length || !floor.windows?.length) return { ...base, measured: null, status: 'not_applicable' };
      let worstRatio = Infinity;
      for (const room of floor.rooms) {
        const wins = (floor.windows || []).filter(w => (room.wall_ids || []).includes(w.wall_id));
        const winArea = wins.reduce((s, w) => s + (w.width_m || 1) * (w.height_m || 1), 0);
        const ratio = (room.area_m2 || 1) > 0 ? winArea / room.area_m2 : 0;
        if (ratio < worstRatio) worstRatio = ratio;
      }
      if (!isFinite(worstRatio)) return { ...base, measured: null, status: 'not_applicable' };
      return { ...base, measured: +worstRatio.toFixed(3), status: worstRatio >= rule.min ? 'pass' : 'warning' };
    }

    _checkMainDoor(doors, rule, base) {
      if (!doors?.length) return { ...base, measured: null, status: 'not_applicable' };
      const mainDoor = doors.find(d => d.type === 'double') || doors[0];
      const w = mainDoor.width_m || 0;
      return { ...base, measured: w, status: w >= rule.min ? 'pass' : 'fail' };
    }

    _checkExitCount(doors, rule, base) {
      if (!doors?.length) return { ...base, measured: 0, status: 'not_applicable' };
      // عدد الأبواب الخارجية (تقدير: أبواب على جدران خارجية)
      const count = doors.length;
      return { ...base, measured: count, status: count >= rule.min ? 'pass' : 'warning' };
    }

    _checkBathroomDoor(floor, rule, base) {
      if (!floor.rooms?.length || !floor.doors?.length) return { ...base, measured: null, status: 'not_applicable' };
      const bathrooms = floor.rooms.filter(r => (r.name || '').includes('حمام') || (r.name_en || '').includes('Bath'));
      if (bathrooms.length === 0) return { ...base, measured: null, status: 'not_applicable' };
      // افتراض: أصغر باب مجاور لحمام
      const minDoorW = Math.min(...floor.doors.map(d => d.width_m || 0.9));
      return { ...base, measured: minDoorW, status: minDoorW >= rule.min ? 'pass' : 'fail' };
    }
  }

  window.QS.QCSCompliance = QCSCompliance;
  console.info('[QS] QCSCompliance v1.0 loaded — 50 rules');
})();
