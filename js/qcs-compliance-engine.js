/**
 * QatarSpec Pro — QCS Compliance Engine v2.0
 * تغطية شاملة: §S5 (Concrete) + §S8 (Roads) + §S17 (Architecture) + §S20 (Drainage) + §S21 (KAHRAMAA)
 * 80+ قاعدة مُفصَّلة بالمراجع الدقيقة
 */

window.QCSEngine = (function() {
'use strict';

// ══════════════════════════════════════════════════════════════════
// §S5 — CONCRETE (خرسانة)
// ══════════════════════════════════════════════════════════════════
const S5_RULES = {

  // غطاء الخرسانة — QCS 2024 §S5-P4-C4 Table 5.3
  concrete_cover: {
    XC1: { slab: 20, beam: 25, column: 25, foundation: 30, wall: 20 },
    XC2: { slab: 25, beam: 30, column: 30, foundation: 35, wall: 25 },
    XC3: { slab: 30, beam: 35, column: 35, foundation: 40, wall: 30 },
    XC4: { slab: 35, beam: 40, column: 40, foundation: 45, wall: 35 },
    XS1: { slab: 35, beam: 40, column: 40, foundation: 45, wall: 35 },
    XS2: { slab: 40, beam: 45, column: 45, foundation: 50, wall: 40 },
    XS3: { slab: 45, beam: 50, column: 50, foundation: 55, wall: 45 },
    XD1: { slab: 30, beam: 35, column: 35, foundation: 40, wall: 30 },
    XD2: { slab: 35, beam: 40, column: 40, foundation: 45, wall: 35 },
    XD3: { slab: 40, beam: 45, column: 45, foundation: 50, wall: 40 },
    XF1: { slab: 25, beam: 30, column: 30, foundation: 35, wall: 25 },
    XF2: { slab: 30, beam: 35, column: 35, foundation: 40, wall: 30 },
  },

  // درجة الخرسانة — QCS 2024 §S5-P3-C2
  min_grade: {
    foundation_XC: 'C25/30',
    foundation_XS: 'C32/40',
    foundation_XD: 'C28/35',
    slab_general:  'C25/30',
    slab_XS:       'C32/40',
    beam_general:  'C25/30',
    column_general:'C28/35',
    column_XS:     'C35/45',
    road_pavement: 'C35/45',
  },

  // نسبة الماء/اسمنت — QCS 2024 §S5-P3-C3 Table 5.4
  max_wc_ratio: {
    XC1: 0.65, XC2: 0.60, XC3: 0.55, XC4: 0.50,
    XS1: 0.50, XS2: 0.45, XS3: 0.40,
    XD1: 0.55, XD2: 0.50, XD3: 0.45,
    XF1: 0.55, XF2: 0.50,
  },

  // الحد الأدنى للاسمنت — QCS 2024 §S5-P3-C3 Table 5.4 (kg/m³)
  min_cement: {
    XC1: 260, XC2: 280, XC3: 300, XC4: 320,
    XS1: 320, XS2: 340, XS3: 360,
    XD1: 300, XD2: 320, XD3: 340,
    XF1: 300, XF2: 320,
  },

  // قوة الضغط — QCS 2024 §S5-P5-C4 (MPa)
  min_compressive_strength: {
    C20_25: 20, C25_30: 25, C28_35: 28, C32_40: 32, C35_45: 35, C40_50: 40,
  },

  // قواعد التسليح — QCS 2024 §S5-P6
  reinforcement: {
    min_bar_spacing_mm: 75,          // §S5-P6-C4.3 — أدنى مسافة بين القضبان
    max_bar_spacing_slab_mm: 300,    // §S5-P6-C5.2
    min_lap_length_factor: 40,       // 40 × قطر القضيب
    min_anchorage_factor: 35,        // 35 × قطر
    cover_tolerance_mm: 10,          // §S5-P6-C3.2 — تفاوت مسموح
  },

  // شروط المعالجة — QCS 2024 §S5-P7
  curing: {
    min_days_XC: 7,
    min_days_XS: 10,
    min_days_XD: 7,
    min_temp_C: 5,                   // §S5-P7-C3.1
    max_temp_C: 35,                  // حد قطر الحار
  },
};

// ══════════════════════════════════════════════════════════════════
// §S8 — ROADS (طرق)
// ══════════════════════════════════════════════════════════════════
const S8_RULES = {

  // طبقات الرصف — Ashghal RDM 2023 + QCS 2024 §S8
  layers: {
    wearing: {
      min_thickness_mm: 40, max_thickness_mm: 50,
      compaction_min_pct: 97,        // % من Gmm
      air_voids_min: 3.0, air_voids_max: 5.0,
      vma_min_pct: 13.0,
      bitumen_content_min: 4.5, bitumen_content_max: 6.0,
      clause: 'QCS 2024 §S8-P4-C5.1',
    },
    binder: {
      min_thickness_mm: 60, max_thickness_mm: 80,
      compaction_min_pct: 96,
      air_voids_min: 3.0, air_voids_max: 5.0,
      clause: 'QCS 2024 §S8-P4-C5.2',
    },
    base: {
      min_thickness_mm: 100, max_thickness_mm: 200,
      compaction_min_pct: 98,        // % من MDD
      cbr_min: 80,
      clause: 'QCS 2024 §S8-P3-C5',
    },
    subbase: {
      min_thickness_mm: 150, max_thickness_mm: 300,
      compaction_min_pct: 95,
      cbr_min: 30,
      pi_max: 6,
      clause: 'QCS 2024 §S8-P2-C5',
    },
    subgrade: {
      compaction_min_pct: 90,
      cbr_min: 5,
      clause: 'QCS 2024 §S8-P1-C5',
    },
  },

  // معايير الركام — Gabbro QCS 2024 §S8-P4-C2
  aggregate: {
    la_abrasion_wearing_max: 25,     // % (Los Angeles)
    la_abrasion_base_max: 30,
    aiv_max: 25,                     // Aggregate Impact Value %
    psv_wearing_min: 55,             // Polished Stone Value
    water_absorption_max: 2.0,       // %
    flakiness_index_max: 25,         // %
    soundness_max: 12,               // % Na2SO4 (ASTM C88)
    clause: 'QCS 2024 §S8-P4-C2.1',
  },

  // البيتومين — BS EN 12591
  bitumen: {
    penetration_min: 40, penetration_max: 60, // dmm at 25°C
    softening_point_min: 48, softening_point_max: 58, // °C
    flash_point_min: 230,            // °C
    ductility_min_cm: 75,            // at 25°C
    viscosity_60_min: 160,           // Pa·s
    clause: 'QCS 2024 §S8-P4-C2.2 + BS EN 12591',
  },

  // Prime & Tack Coat — QCS 2024 §S8-P5
  prime_coat: {
    rate_min: 0.5, rate_max: 1.0,    // L/m²
    curing_min_hours: 24,
    clause: 'QCS 2024 §S8-P5-C4.2',
  },
  tack_coat: {
    rate_min: 0.15, rate_max: 0.35,  // L/m²
    rate_milled_min: 0.20, rate_milled_max: 0.40,
    clause: 'QCS 2024 §S8-P5-C4.3',
  },

  // Superpave — QCS 2024 §S8-P4 + AASHTO M 323
  superpave: {
    binder_grade: 'PG 70-10',        // Qatar climate
    ndesign_low_traffic: 50,         // < 3M ESALs
    ndesign_medium_traffic: 75,      // 3-10M ESALs
    ndesign_high_traffic: 100,       // > 10M ESALs
    air_voids_at_ndesign: 4.0,       // %
    dust_proportion_min: 0.6, dust_proportion_max: 1.2,
    clause: 'QCS 2024 §S8-P4 + AASHTO M 323',
  },

  // Ride Quality — Ashghal RDM
  ride_quality: {
    iri_arterial_max: 1.5,           // m/km
    iri_collector_max: 2.0,
    iri_local_max: 2.5,
    rut_depth_max_mm: 12,            // Rutting
    clause: 'Ashghal RDM 2023 — Road Performance Indicators',
  },
};

// ══════════════════════════════════════════════════════════════════
// §S17 — ARCHITECTURE / BUILDINGS (مباني)
// ══════════════════════════════════════════════════════════════════
const S17_RULES = {

  // مساحات الغرف — QCS 2024 §S17-P4-C2
  room_areas: {
    bedroom_main_min_m2: 12.0,
    bedroom_other_min_m2: 9.0,
    living_room_min_m2: 16.0,
    dining_room_min_m2: 10.0,
    kitchen_min_m2: 6.0,
    bathroom_min_m2: 3.0,
    corridor_min_width_m: 1.2,
    majlis_min_m2: 20.0,             // خاص بقطر
    maid_room_min_m2: 8.0,
    clause: 'QCS 2024 §S17-P4-C2',
  },

  // ارتفاعات — QCS 2024 §S17-P4-C3
  heights: {
    min_floor_height_m: 2.7,
    min_floor_height_basement_m: 2.4,
    min_floor_height_commercial_m: 3.0,
    parapet_min_height_m: 0.9,
    stair_handrail_min_m: 1.05,
    balcony_railing_min_m: 1.1,
    clause: 'QCS 2024 §S17-P4-C3',
  },

  // أبواب — QCS 2024 §S17-P8
  doors: {
    main_entrance_min_width_m: 1.0,
    bedroom_min_width_m: 0.9,
    bathroom_min_width_m: 0.8,
    accessibility_min_width_m: 0.9, // ذوو الاحتياجات
    fire_exit_min_width_m: 1.0,
    clause: 'QCS 2024 §S17-P8-C5',
  },

  // نوافذ / تهوية — QCS 2024 §S17-P5
  ventilation: {
    window_area_min_pct: 10,         // % من مساحة الغرفة
    ventilation_area_min_pct: 5,     // % من مساحة الغرفة
    bathroom_min_ventilation_m2: 0.15,
    kitchen_min_ventilation_m2: 0.2,
    clause: 'QCS 2024 §S17-P5-C3',
  },

  // السلامة من الحريق — QCS 2024 §S17-P6
  fire_safety: {
    max_travel_distance_m: 30,       // مسافة الهروب
    max_dead_end_m: 15,
    fire_door_min_rating_min: 60,    // دقيقة
    sprinkler_required_above_floors: 4,
    clause: 'QCS 2024 §S17-P6',
  },

  // مواقف السيارات — QCS 2024 §S17-P9
  parking: {
    villa_min_spaces: 2,
    apartment_1bed_min: 1,
    apartment_2bed_min: 1,
    apartment_3bed_min: 2,
    commercial_per_100m2: 2,
    parking_width_min_m: 2.5,
    parking_length_min_m: 5.0,
    accessible_pct: 2,               // % من إجمالي المواقف
    clause: 'QCS 2024 §S17-P9',
  },

  // الإرتدادات — MMUP Regulations
  setbacks: {
    front_min_m: 3.0,
    side_min_m: 1.5,
    rear_min_m: 3.0,
    high_rise_front_min_m: 6.0,
    clause: 'MMUP Building Regulations',
  },
};

// ══════════════════════════════════════════════════════════════════
// §S20 — DRAINAGE (صرف صحي وتصريف)
// ══════════════════════════════════════════════════════════════════
const S20_RULES = {

  // الأنابيب — QCS 2024 §S20-P3
  pipes: {
    min_diameter_sewer_mm: 150,
    min_diameter_storm_mm: 300,
    min_slope_150mm: 0.005,          // 1:200
    min_slope_225mm: 0.0033,         // 1:300
    min_slope_300mm: 0.0025,         // 1:400
    max_depth_without_manhole_m: 100,
    min_cover_road_mm: 900,
    min_cover_footpath_mm: 600,
    clause: 'QCS 2024 §S20-P3',
  },

  // أحواض التفتيش — QCS 2024 §S20-P4
  manholes: {
    max_spacing_m: 100,
    min_internal_dia_mm: 1200,
    min_cover_class: 'D400',         // كنف تحمّل
    benching_required: true,
    clause: 'QCS 2024 §S20-P4',
  },

  // اختبارات — QCS 2024 §S20-P7
  testing: {
    air_test_min_pressure_bar: 0.035,
    air_test_duration_min: 5,
    water_test_head_m: 1.5,
    water_test_duration_min: 30,
    cctv_required_min_dia_mm: 300,
    clause: 'QCS 2024 §S20-P7',
  },
};

// ══════════════════════════════════════════════════════════════════
// §S21 — KAHRAMAA (كهرباء وماء)
// ══════════════════════════════════════════════════════════════════
const S21_RULES = {

  // الكهرباء — KAHRAMAA 2024
  electrical: {
    min_cable_cover_road_mm: 600,
    min_cable_cover_footpath_mm: 450,
    min_duct_size_lv_mm: 100,
    min_duct_size_mv_mm: 150,
    transformer_clearance_m: 1.0,
    consumer_unit_height_min_m: 1.2,
    consumer_unit_height_max_m: 1.8,
    clause: 'KAHRAMAA Distribution Standards 2024',
  },

  // الماء — KAHRAMAA 2024
  water: {
    min_pipe_cover_road_mm: 900,
    min_pipe_cover_footpath_mm: 600,
    min_pressure_bar: 1.0,
    max_pressure_bar: 8.0,
    min_flow_residential_lps: 0.5,
    max_velocity_ms: 1.5,
    disinfection_chlorine_min_ppm: 0.2,
    disinfection_chlorine_max_ppm: 0.5,
    clause: 'KAHRAMAA Water Standards 2024',
  },

  // الاشتراطات العامة
  general: {
    building_permit_required: true,
    noc_required_projects: ['road_crossing', 'near_transmission', 'underground_work'],
    clause: 'KAHRAMAA Technical Requirements 2024',
  },
};

// ══════════════════════════════════════════════════════════════════
// COMPLIANCE CHECKER — الفاحص الرئيسي
// ══════════════════════════════════════════════════════════════════
function check(params) {
  const violations = [];
  const passes = [];

  // ── S5: Concrete Cover ──────────────────────────────────────────
  if (params.exposure_class && params.element_type && params.actual_cover_mm !== undefined) {
    const expRules = S5_RULES.concrete_cover[params.exposure_class];
    if (expRules) {
      const required = expRules[params.element_type] || expRules.slab;
      const actual = params.actual_cover_mm;
      const tol = S5_RULES.reinforcement.cover_tolerance_mm;
      const result = {
        id: 'S5-COVER',
        category: 'خرسانة',
        param: 'غطاء الخرسانة (Concrete Cover)',
        required: required + 'mm',
        actual: actual + 'mm',
        clause: 'QCS 2024 §S5-P4-C4 Table 5.3',
        element: params.element_type,
      };
      if (actual < required - tol) {
        violations.push({ ...result, severity: 'critical',
          title_ar: `غطاء الخرسانة ناقص — ${params.element_type} في بيئة ${params.exposure_class}`,
          corrective: `زيادة الغطاء إلى ${required}mm على الأقل` });
      } else if (actual < required) {
        violations.push({ ...result, severity: 'warning',
          title_ar: `غطاء الخرسانة في حدود التفاوت — ${params.element_type}`,
          corrective: `التحقق من دقة القياس والتأكد من عدم الانتقاص عن ${required}mm` });
      } else {
        passes.push({ ...result, status: 'pass', title_ar: `غطاء الخرسانة مطابق — ${params.element_type}` });
      }
    }
  }

  // ── S5: W/C Ratio ───────────────────────────────────────────────
  if (params.exposure_class && params.wc_ratio !== undefined) {
    const maxWC = S5_RULES.max_wc_ratio[params.exposure_class];
    if (maxWC) {
      const result = {
        id: 'S5-WC', category: 'خرسانة',
        param: 'نسبة الماء/الاسمنت (W/C Ratio)',
        required: '≤ ' + maxWC, actual: params.wc_ratio.toFixed(2),
        clause: 'QCS 2024 §S5-P3-C3 Table 5.4',
      };
      if (params.wc_ratio > maxWC) {
        violations.push({ ...result, severity: 'critical',
          title_ar: `نسبة الماء/الاسمنت تتجاوز الحد الأقصى لبيئة ${params.exposure_class}`,
          corrective: `تخفيض نسبة W/C إلى ${maxWC} أو أقل` });
      } else {
        passes.push({ ...result, status: 'pass', title_ar: 'نسبة الماء/الاسمنت مطابقة' });
      }
    }
  }

  // ── S5: Cement Content ──────────────────────────────────────────
  if (params.exposure_class && params.cement_content_kg !== undefined) {
    const minCement = S5_RULES.min_cement[params.exposure_class];
    if (minCement) {
      const result = {
        id: 'S5-CEMENT', category: 'خرسانة',
        param: 'محتوى الاسمنت (Cement Content)',
        required: '≥ ' + minCement + ' kg/m³', actual: params.cement_content_kg + ' kg/m³',
        clause: 'QCS 2024 §S5-P3-C3 Table 5.4',
      };
      if (params.cement_content_kg < minCement) {
        violations.push({ ...result, severity: 'critical',
          title_ar: `محتوى الاسمنت أقل من الحد الأدنى لبيئة ${params.exposure_class}`,
          corrective: `رفع محتوى الاسمنت إلى ${minCement} kg/m³` });
      } else {
        passes.push({ ...result, status: 'pass', title_ar: 'محتوى الاسمنت مطابق' });
      }
    }
  }

  // ── S8: Wearing Layer Compaction ────────────────────────────────
  if (params.layer === 'wearing' && params.compaction_pct !== undefined) {
    const rule = S8_RULES.layers.wearing;
    const result = {
      id: 'S8-WEAR-COMP', category: 'طرق',
      param: 'درجة الدمك — طبقة الوجه (Wearing Layer Compaction)',
      required: '≥ ' + rule.compaction_min_pct + '% Gmm',
      actual: params.compaction_pct + '% Gmm',
      clause: rule.clause,
    };
    if (params.compaction_pct < rule.compaction_min_pct) {
      violations.push({ ...result, severity: 'critical',
        title_ar: 'درجة الدمك أقل من الحد الأدنى — طبقة الوجه',
        corrective: `إعادة الدمك حتى الوصول إلى ${rule.compaction_min_pct}% من Gmm` });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'درجة دمك طبقة الوجه مطابقة' });
    }
  }

  // ── S8: Base Compaction ─────────────────────────────────────────
  if (params.layer === 'base' && params.compaction_pct !== undefined) {
    const rule = S8_RULES.layers.base;
    if (params.compaction_pct < rule.compaction_min_pct) {
      violations.push({
        id: 'S8-BASE-COMP', severity: 'critical', category: 'طرق',
        param: 'درجة الدمك — طبقة الأساس',
        required: '≥ ' + rule.compaction_min_pct + '% MDD',
        actual: params.compaction_pct + '% MDD',
        clause: rule.clause,
        title_ar: 'درجة الدمك أقل من الحد الأدنى — طبقة الأساس',
        corrective: `إعادة الدمك حتى ${rule.compaction_min_pct}% من MDD`,
      });
    }
  }

  // ── S8: Air Voids ───────────────────────────────────────────────
  if (params.air_voids_pct !== undefined) {
    const rule = S8_RULES.layers.wearing;
    const result = {
      id: 'S8-AIR-VOIDS', category: 'طرق',
      param: 'الفراغات الهوائية (Air Voids)',
      required: `${rule.air_voids_min}% – ${rule.air_voids_max}%`,
      actual: params.air_voids_pct + '%',
      clause: 'QCS 2024 §S8-P4 Table 8.5',
    };
    if (params.air_voids_pct < rule.air_voids_min || params.air_voids_pct > rule.air_voids_max) {
      violations.push({ ...result, severity: 'warning',
        title_ar: `الفراغات الهوائية خارج النطاق المطلوب (${rule.air_voids_min}-${rule.air_voids_max}%)`,
        corrective: 'مراجعة تصميم الخلطة أو درجة الحرارة أثناء الرصف' });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'الفراغات الهوائية مطابقة' });
    }
  }

  // ── S8: Bitumen Penetration ─────────────────────────────────────
  if (params.bitumen_penetration !== undefined) {
    const rule = S8_RULES.bitumen;
    const result = {
      id: 'S8-PEN', category: 'طرق',
      param: 'نفاذية البيتومين (Penetration 25°C)',
      required: `${rule.penetration_min} – ${rule.penetration_max} dmm`,
      actual: params.bitumen_penetration + ' dmm',
      clause: rule.clause,
    };
    if (params.bitumen_penetration < rule.penetration_min || params.bitumen_penetration > rule.penetration_max) {
      violations.push({ ...result, severity: 'critical',
        title_ar: 'نفاذية البيتومين خارج مواصفات 40-60 pen grade',
        corrective: 'استبدال البيتومين بدرجة 40/60 حسب QCS 2024' });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'نفاذية البيتومين مطابقة' });
    }
  }

  // ── S17: Room Height ────────────────────────────────────────────
  if (params.room_height_m !== undefined) {
    const minH = params.is_basement ? S17_RULES.heights.min_floor_height_basement_m : S17_RULES.heights.min_floor_height_m;
    const result = {
      id: 'S17-HEIGHT', category: 'معماري',
      param: 'ارتفاع الغرفة الصافي (Clear Floor Height)',
      required: '≥ ' + minH + 'm',
      actual: params.room_height_m + 'm',
      clause: S17_RULES.heights.clause,
    };
    if (params.room_height_m < minH) {
      violations.push({ ...result, severity: 'warning',
        title_ar: `ارتفاع الغرفة أقل من الحد الأدنى ${minH}m`,
        corrective: 'مراجعة تصميم السقف المستعار أو رفع مستوى السقف الفعلي' });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'ارتفاع الغرفة مطابق' });
    }
  }

  // ── S17: Room Area ──────────────────────────────────────────────
  if (params.room_type && params.room_area_m2 !== undefined) {
    const areaRules = S17_RULES.room_areas;
    const minArea = areaRules[params.room_type + '_min_m2'];
    if (minArea !== undefined) {
      const result = {
        id: 'S17-AREA-' + params.room_type.toUpperCase(), category: 'معماري',
        param: `مساحة ${params.room_type} (Room Area)`,
        required: '≥ ' + minArea + ' m²',
        actual: params.room_area_m2.toFixed(1) + ' m²',
        clause: areaRules.clause,
      };
      if (params.room_area_m2 < minArea) {
        violations.push({ ...result, severity: 'warning',
          title_ar: `مساحة الغرفة أقل من الحد الأدنى ${minArea}m²`,
          corrective: `توسيع الغرفة لتصل إلى ${minArea}m² على الأقل` });
      } else {
        passes.push({ ...result, status: 'pass', title_ar: 'مساحة الغرفة مطابقة' });
      }
    }
  }

  // ── S17: Door Width ─────────────────────────────────────────────
  if (params.door_type && params.door_width_m !== undefined) {
    const doorRules = S17_RULES.doors;
    const minWidth = doorRules[params.door_type + '_min_width_m'] || doorRules.bedroom_min_width_m;
    const result = {
      id: 'S17-DOOR', category: 'معماري',
      param: `عرض الباب (Door Width) — ${params.door_type}`,
      required: '≥ ' + minWidth + 'm',
      actual: params.door_width_m + 'm',
      clause: doorRules.clause,
    };
    if (params.door_width_m < minWidth) {
      violations.push({ ...result, severity: params.door_type === 'fire_exit' ? 'critical' : 'info',
        title_ar: `عرض الباب أقل من الحد الأدنى — ${params.door_type}`,
        corrective: `توسيع فتحة الباب إلى ${minWidth}m` });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: `عرض الباب مطابق — ${params.door_type}` });
    }
  }

  // ── S17: Fire Exit Distance ─────────────────────────────────────
  if (params.travel_distance_m !== undefined) {
    const maxDist = S17_RULES.fire_safety.max_travel_distance_m;
    const result = {
      id: 'S17-FIRE', category: 'سلامة',
      param: 'مسافة الهروب (Travel Distance to Exit)',
      required: '≤ ' + maxDist + 'm',
      actual: params.travel_distance_m + 'm',
      clause: S17_RULES.fire_safety.clause,
    };
    if (params.travel_distance_m > maxDist) {
      violations.push({ ...result, severity: 'critical',
        title_ar: 'مسافة الهروب تتجاوز الحد الأقصى 30m',
        corrective: 'إضافة مخرج طوارئ إضافي أو إعادة تصميم المسار' });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'مسافة الهروب مطابقة' });
    }
  }

  // ── S17: Parapet Height ─────────────────────────────────────────
  if (params.parapet_height_m !== undefined) {
    const minH = S17_RULES.heights.parapet_min_height_m;
    if (params.parapet_height_m < minH) {
      violations.push({
        id: 'S17-PARAPET', severity: 'critical', category: 'سلامة',
        param: 'ارتفاع الدرابزين/البرجوله (Parapet Height)',
        required: '≥ ' + minH + 'm', actual: params.parapet_height_m + 'm',
        clause: S17_RULES.heights.clause,
        title_ar: `ارتفاع الدرابزين ${params.parapet_height_m}m أقل من الحد الأدنى ${minH}m`,
        corrective: `رفع ارتفاع الدرابزين إلى ${minH}m على الأقل`,
      });
    }
  }

  // ── S20: Pipe Slope ─────────────────────────────────────────────
  if (params.pipe_diameter_mm && params.pipe_slope !== undefined) {
    const d = params.pipe_diameter_mm;
    let minSlope;
    if (d <= 150) minSlope = S20_RULES.pipes.min_slope_150mm;
    else if (d <= 225) minSlope = S20_RULES.pipes.min_slope_225mm;
    else minSlope = S20_RULES.pipes.min_slope_300mm;

    const result = {
      id: 'S20-SLOPE', category: 'صرف صحي',
      param: `ميل الأنبوب ${d}mm (Pipe Gradient)`,
      required: '≥ ' + minSlope.toFixed(4),
      actual: params.pipe_slope.toFixed(4),
      clause: S20_RULES.pipes.clause,
    };
    if (params.pipe_slope < minSlope) {
      violations.push({ ...result, severity: 'critical',
        title_ar: `ميل الأنبوب ${d}mm أقل من الحد الأدنى`,
        corrective: `تعديل الميل إلى ${minSlope.toFixed(4)} على الأقل` });
    } else {
      passes.push({ ...result, status: 'pass', title_ar: 'ميل الأنبوب مطابق' });
    }
  }

  // ── S20: Manhole Spacing ────────────────────────────────────────
  if (params.manhole_spacing_m !== undefined) {
    const maxS = S20_RULES.manholes.max_spacing_m;
    if (params.manhole_spacing_m > maxS) {
      violations.push({
        id: 'S20-MH', severity: 'warning', category: 'صرف صحي',
        param: 'المسافة بين أحواض التفتيش (Manhole Spacing)',
        required: '≤ ' + maxS + 'm', actual: params.manhole_spacing_m + 'm',
        clause: S20_RULES.manholes.clause,
        title_ar: `المسافة بين أحواض التفتيش تتجاوز ${maxS}m`,
        corrective: `إضافة حوض تفتيش إضافي لتقليل المسافة إلى ${maxS}m`,
      });
    }
  }

  // ── S21: KAHRAMAA Cable Cover ───────────────────────────────────
  if (params.cable_type && params.cable_cover_mm !== undefined) {
    const minCover = params.is_road
      ? S21_RULES.electrical.min_cable_cover_road_mm
      : S21_RULES.electrical.min_cable_cover_footpath_mm;
    if (params.cable_cover_mm < minCover) {
      violations.push({
        id: 'S21-CABLE', severity: 'critical', category: 'KAHRAMAA',
        param: `غطاء الكابل الكهربائي (Cable Cover)`,
        required: '≥ ' + minCover + 'mm', actual: params.cable_cover_mm + 'mm',
        clause: S21_RULES.electrical.clause,
        title_ar: `غطاء الكابل الكهربائي أقل من الحد الأدنى KAHRAMAA`,
        corrective: `زيادة الغطاء إلى ${minCover}mm`,
      });
    }
  }

  // ── S21: Water Pressure ─────────────────────────────────────────
  if (params.water_pressure_bar !== undefined) {
    const min = S21_RULES.water.min_pressure_bar;
    const max = S21_RULES.water.max_pressure_bar;
    if (params.water_pressure_bar < min || params.water_pressure_bar > max) {
      violations.push({
        id: 'S21-WATER-P', severity: 'warning', category: 'KAHRAMAA',
        param: 'ضغط المياه (Water Pressure)',
        required: `${min} – ${max} bar`, actual: params.water_pressure_bar + ' bar',
        clause: S21_RULES.water.clause,
        title_ar: 'ضغط المياه خارج النطاق المطلوب KAHRAMAA',
        corrective: 'مراجعة نظام الضغط وتركيب PRV إذا لزم',
      });
    }
  }

  return {
    violations,
    passes,
    total: violations.length + passes.length,
    pass_count: passes.length,
    fail_count: violations.length,
    critical_count: violations.filter(v => v.severity === 'critical').length,
    warning_count: violations.filter(v => v.severity === 'warning').length,
    score_pct: violations.length + passes.length > 0
      ? Math.round((passes.length / (violations.length + passes.length)) * 100)
      : 100,
  };
}

// ══════════════════════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════════════════════
return {
  check,
  rules: { S5: S5_RULES, S8: S8_RULES, S17: S17_RULES, S20: S20_RULES, S21: S21_RULES },

  // Batch check — يفحص عدة بنود دفعة واحدة
  batchCheck(paramsArray) {
    const all = { violations: [], passes: [], total: 0, pass_count: 0, fail_count: 0, critical_count: 0, warning_count: 0 };
    paramsArray.forEach(p => {
      const r = check(p);
      all.violations.push(...r.violations);
      all.passes.push(...r.passes);
      all.total += r.total;
      all.pass_count += r.pass_count;
      all.fail_count += r.fail_count;
      all.critical_count += r.critical_count;
      all.warning_count += r.warning_count;
    });
    all.score_pct = all.total > 0 ? Math.round((all.pass_count / all.total) * 100) : 100;
    return all;
  },

  // Quick check لـ analyzer-v2 — يفحص schema من AI
  checkFromSchema(schema, exposureClass) {
    const params = [];
    const expClass = exposureClass || 'XC2';

    // فحص سماكة الجدران
    (schema.walls || []).forEach(w => {
      params.push({
        exposure_class: expClass,
        element_type: w.is_external ? 'wall' : 'wall',
        actual_cover_mm: (w.thickness || 0.2) * 1000,
      });
    });

    // فحص ارتفاع الغرف
    if (schema.floor_height_m) {
      params.push({ room_height_m: schema.floor_height_m });
    }

    // فحص مساحات الغرف
    (schema.rooms || []).forEach(r => {
      if (r.area_m2 && r.name_en) {
        const type = r.name_en.toLowerCase().includes('living') ? 'living_room'
          : r.name_en.toLowerCase().includes('bed') ? 'bedroom_other'
          : r.name_en.toLowerCase().includes('kitchen') ? 'kitchen'
          : r.name_en.toLowerCase().includes('bath') ? 'bathroom'
          : null;
        if (type) params.push({ room_type: type, room_area_m2: r.area_m2 });
      }
    });

    // فحص الأبواب
    (schema.doors || []).forEach(d => {
      params.push({ door_type: 'bedroom', door_width_m: d.width || 0.9 });
    });

    return this.batchCheck(params);
  },

  // Helper: رسائل QCS بالعربية
  getSeverityLabel(severity) {
    return { critical: '🔴 حرج', warning: '🟡 تحذير', info: '🔵 معلومة' }[severity] || severity;
  },

  version: '2.0.0',
  coverage: ['QCS 2024 §S5', 'QCS 2024 §S8', 'QCS 2024 §S17', 'QCS 2024 §S20', 'KAHRAMAA 2024 §S21', 'Ashghal RDM 2023', 'MMUP'],
};

})();
