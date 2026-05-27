// js/scanner/qcs-hotspots.js — QatarSpec Pro
// بيانات Hotspots مرتبطة ببنود QCS 2024 + منطق الفحص الديناميكي
// المرجع: QCS 2024 Parts 1-16 | Ashghal RDM 2023 | KAHRAMAA 2024

window.QS = window.QS || {};

QS.HotspotEngine = (() => {

  // ===== قاعدة بيانات بنود QCS 2024 القابلة للفحص =====
  const QCS_SPECS = {
    // --- Part 5: Concrete ---
    concrete_cover_column: {
      id: 'concrete_cover_column',
      part: 'QCS 2024 Part 5',
      section: 'Section 16',
      clause: '16.3.2',
      title: 'غطاء خرساني — أعمدة',
      description: 'الحد الأدنى لغطاء التسليح في الأعمدة المعرضة للبيئة القطرية',
      limit: 50,
      unit: 'mm',
      tolerance: 5,
      category: 'concrete',
      severity: 'critical',
    },
    concrete_cover_beam: {
      id: 'concrete_cover_beam',
      part: 'QCS 2024 Part 5',
      section: 'Section 16',
      clause: '16.3.1',
      title: 'غطاء خرساني — كمرات',
      limit: 40,
      unit: 'mm',
      tolerance: 5,
      category: 'concrete',
      severity: 'critical',
    },
    concrete_cover_slab: {
      id: 'concrete_cover_slab',
      part: 'QCS 2024 Part 5',
      section: 'Section 16',
      clause: '16.3.3',
      title: 'غطاء خرساني — بلاطات',
      limit: 25,
      unit: 'mm',
      tolerance: 5,
      category: 'concrete',
      severity: 'major',
    },
    slab_thickness: {
      id: 'slab_thickness',
      part: 'QCS 2024 Part 5',
      section: 'Section 9',
      clause: '9.4.1',
      title: 'سماكة البلاطة',
      limit: 150,
      unit: 'mm',
      tolerance: 10,
      category: 'concrete',
      severity: 'major',
    },

    // --- Part 4: Roads (Ashghal RDM 2023) ---
    road_width_local: {
      id: 'road_width_local',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 3',
      clause: 'Table 3.2',
      title: 'عرض الطريق — محلي',
      limit: 7000,
      unit: 'mm',
      tolerance: 50,
      category: 'roads',
      severity: 'critical',
    },
    curb_height: {
      id: 'curb_height',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 6',
      clause: '6.4.3',
      title: 'ارتفاع الرصيف (Curb)',
      limit: 150,
      unit: 'mm',
      tolerance: 10,
      category: 'roads',
      severity: 'major',
    },
    sidewalk_width: {
      id: 'sidewalk_width',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 6',
      clause: '6.5.1',
      title: 'عرض الرصيف',
      limit: 2000,
      unit: 'mm',
      tolerance: 50,
      category: 'roads',
      severity: 'major',
    },

    // --- Part 8: Waterproofing ---
    waterproof_thickness: {
      id: 'waterproof_thickness',
      part: 'QCS 2024 Part 8',
      section: 'Section 4',
      clause: '4.2.1',
      title: 'سماكة طبقة العزل المائي',
      limit: 4,
      unit: 'mm',
      tolerance: 0.5,
      category: 'waterproofing',
      severity: 'major',
    },

    // --- Part 7: Masonry ---
    wall_plumb_tolerance: {
      id: 'wall_plumb_tolerance',
      part: 'QCS 2024 Part 7',
      section: 'Section 3',
      clause: '3.4.2',
      title: 'انحراف الجدار عن الرأسي',
      limit: 10,
      unit: 'mm',
      tolerance: 2,
      category: 'masonry',
      severity: 'major',
      direction: 'max', // يجب أن يكون أقل من الحد
    },
    mortar_joint_thickness: {
      id: 'mortar_joint_thickness',
      part: 'QCS 2024 Part 7',
      section: 'Section 3',
      clause: '3.3.1',
      title: 'سماكة مونة المباني',
      limit: 10,
      unit: 'mm',
      tolerance: 3,
      category: 'masonry',
      severity: 'minor',
    },

    // --- KAHRAMAA ---
    cable_duct_depth: {
      id: 'cable_duct_depth',
      part: 'KAHRAMAA 2024',
      section: 'Section 5',
      clause: '5.3.4',
      title: 'عمق مواسير الكابلات الكهربائية',
      limit: 750,
      unit: 'mm',
      tolerance: 50,
      category: 'mep',
      severity: 'critical',
    },

    // --- عام ---
    floor_level_tolerance: {
      id: 'floor_level_tolerance',
      part: 'QCS 2024 Part 5',
      section: 'Section 9',
      clause: '9.6.2',
      title: 'انحراف مستوى الأرضية',
      limit: 15,
      unit: 'mm',
      tolerance: 3,
      category: 'concrete',
      severity: 'major',
      direction: 'max',
    },
    door_opening_width: {
      id: 'door_opening_width',
      part: 'MMUP Building Regulations',
      section: 'Article 42',
      clause: '42.3',
      title: 'عرض فتحة الباب (إمكانية الوصول)',
      limit: 900,
      unit: 'mm',
      tolerance: 10,
      category: 'accessibility',
      severity: 'critical',
    },

    // --- Part 6: Structural Steel (QCS 2024) ---
    steel_weld_size: {
      id: 'steel_weld_size',
      part: 'QCS 2024 Part 6',
      section: 'Section 5',
      clause: '5.4.2',
      title: 'حجم اللحام (Fillet Weld)',
      description: 'الحد الأدنى لحجم لحام الزاوية في الهياكل الفولاذية',
      limit: 6,
      unit: 'mm',
      tolerance: 1,
      direction: 'min',
      category: 'steel',
      severity: 'critical',
    },
    steel_bolt_spacing: {
      id: 'steel_bolt_spacing',
      part: 'QCS 2024 Part 6',
      section: 'Section 4',
      clause: '4.6.1',
      title: 'مسافة المسامير الفولاذية',
      description: 'الحد الأدنى للمسافة بين مراكز المسامير',
      limit: 75,
      unit: 'mm',
      tolerance: 5,
      direction: 'min',
      category: 'steel',
      severity: 'major',
    },
    steel_column_plumb: {
      id: 'steel_column_plumb',
      part: 'QCS 2024 Part 6',
      section: 'Section 8',
      clause: '8.3.1',
      title: 'شاقولية العمود الفولاذي',
      description: 'الحد الأقصى للانحراف عن الشاقول',
      limit: 5,
      unit: 'mm',
      tolerance: 2,
      direction: 'max',
      category: 'steel',
      severity: 'critical',
    },

    // --- Part 9: Finishes (QCS 2024) ---
    tile_lippage: {
      id: 'tile_lippage',
      part: 'QCS 2024 Part 9',
      section: 'Section 3',
      clause: '3.5.2',
      title: 'تباين مستوى البلاط (Lippage)',
      description: 'الحد الأقصى للفرق في المستوى بين بلاطتين متجاورتين',
      limit: 1,
      unit: 'mm',
      tolerance: 0.5,
      direction: 'max',
      category: 'finishes',
      severity: 'minor',
    },
    paint_thickness: {
      id: 'paint_thickness',
      part: 'QCS 2024 Part 9',
      section: 'Section 7',
      clause: '7.4.1',
      title: 'سماكة طبقة الطلاء الواقي',
      description: 'الحد الأدنى لسماكة الطلاء (DFT) في البيئة القطرية',
      limit: 250,
      unit: 'μm',
      tolerance: 25,
      direction: 'min',
      category: 'finishes',
      severity: 'major',
    },
    plaster_thickness: {
      id: 'plaster_thickness',
      part: 'QCS 2024 Part 9',
      section: 'Section 2',
      clause: '2.3.4',
      title: 'سماكة الياسمين/البياض',
      description: 'النطاق المقبول لسماكة طبقة البياض الداخلي',
      limit: 20,
      unit: 'mm',
      tolerance: 3,
      category: 'finishes',
      severity: 'minor',
    },

    // --- Part 11: Drainage — Ashghal RDM 2023 ---
    pipe_slope_min: {
      id: 'pipe_slope_min',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 7',
      clause: '7.2.3',
      title: 'ميل أنبوب الصرف الصحي (الحد الأدنى)',
      description: 'الحد الأدنى لميل أنابيب الصرف لضمان الجريان الذاتي',
      limit: 1.0,
      unit: '%',
      tolerance: 0.1,
      direction: 'min',
      category: 'drainage',
      severity: 'critical',
    },
    manhole_spacing: {
      id: 'manhole_spacing',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 8',
      clause: '8.4.1',
      title: 'المسافة بين غرف التفتيش',
      description: 'الحد الأقصى للمسافة بين Manholes في شبكة الصرف',
      limit: 120,
      unit: 'm',
      tolerance: 10,
      direction: 'max',
      category: 'drainage',
      severity: 'major',
    },
    catch_basin_depth: {
      id: 'catch_basin_depth',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 9',
      clause: '9.3.2',
      title: 'عمق حوض التجميع (Catch Basin)',
      description: 'الحد الأدنى لعمق أحواض تجميع مياه الأمطار',
      limit: 900,
      unit: 'mm',
      tolerance: 50,
      direction: 'min',
      category: 'drainage',
      severity: 'major',
    },

    // --- Part 12: Landscaping (MMUP) ---
    tree_setback: {
      id: 'tree_setback',
      part: 'MMUP Landscape Guidelines',
      section: 'Chapter 4',
      clause: '4.2.1',
      title: 'إبعاد الشجرة عن الحدود',
      description: 'الحد الأدنى للمسافة بين الشجرة والحد أو المبنى',
      limit: 2000,
      unit: 'mm',
      tolerance: 200,
      direction: 'min',
      category: 'landscaping',
      severity: 'minor',
    },
    irrigation_coverage: {
      id: 'irrigation_coverage',
      part: 'MMUP Landscape Guidelines',
      section: 'Chapter 6',
      clause: '6.5.2',
      title: 'تغطية نظام الري (%)',
      description: 'الحد الأدنى لنسبة تغطية نظام الري للمساحات الخضراء',
      limit: 95,
      unit: '%',
      tolerance: 3,
      direction: 'min',
      category: 'landscaping',
      severity: 'major',
    },
    topsoil_depth: {
      id: 'topsoil_depth',
      part: 'MMUP Landscape Guidelines',
      section: 'Chapter 3',
      clause: '3.4.1',
      title: 'عمق التربة السطحية الزراعية',
      description: 'الحد الأدنى لعمق التربة الزراعية في المناطق المزروعة',
      limit: 300,
      unit: 'mm',
      tolerance: 30,
      direction: 'min',
      category: 'landscaping',
      severity: 'major',
    },

    // --- KAHRAMAA Additional Specs ---
    duct_bank_spacing: {
      id: 'duct_bank_spacing',
      part: 'KAHRAMAA 2024',
      section: 'Section 4',
      clause: '4.8.2',
      title: 'مسافة Duct Bank عن المرافق الأخرى',
      description: 'الحد الأدنى للمسافة بين Duct Bank الكهرباء والمرافق الأخرى',
      limit: 300,
      unit: 'mm',
      tolerance: 50,
      direction: 'min',
      category: 'mep',
      severity: 'critical',
    },
    transformer_clearance: {
      id: 'transformer_clearance',
      part: 'KAHRAMAA 2024',
      section: 'Section 6',
      clause: '6.3.1',
      title: 'مسافة أمان المحول الكهربائي',
      description: 'الحد الأدنى للمسافة بين المحول والمبنى أو الحدود',
      limit: 3000,
      unit: 'mm',
      tolerance: 200,
      direction: 'min',
      category: 'mep',
      severity: 'critical',
    },
    earthing_resistance: {
      id: 'earthing_resistance',
      part: 'KAHRAMAA 2024',
      section: 'Section 7',
      clause: '7.2.4',
      title: 'مقاومة منظومة التأريض',
      description: 'الحد الأقصى لمقاومة التأريض للمنشآت الكهربائية',
      limit: 1,
      unit: 'Ω',
      tolerance: 0.1,
      direction: 'max',
      category: 'mep',
      severity: 'critical',
    },

    // --- Roads: Ashghal RDM 2023 Additional ---
    road_cross_fall: {
      id: 'road_cross_fall',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 4',
      clause: '4.3.2',
      title: 'ميل الطريق العرضي',
      description: 'ميل الكارب العرضي لتصريف مياه الأمطار',
      limit: 2.5,
      unit: '%',
      tolerance: 0.3,
      category: 'roads',
      severity: 'major',
    },
    road_iri: {
      id: 'road_iri',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 6',
      clause: '6.8.1',
      title: 'مؤشر خشونة الطريق (IRI)',
      description: 'الحد الأقصى لمعامل الخشونة الدولي للطرق الحضرية',
      limit: 3.5,
      unit: 'm/km',
      tolerance: 0.5,
      direction: 'max',
      category: 'roads',
      severity: 'major',
      note: 'راجع Ashghal RDM الجدول 6-3 مباشرة للطرق السريعة',
    },
    pavement_rutting: {
      id: 'pavement_rutting',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 6',
      clause: '6.5.3',
      title: 'عمق التخدد في الرصيف (Rutting)',
      description: 'الحد الأقصى لعمق التخدد في طبقة الأسفلت',
      limit: 10,
      unit: 'mm',
      tolerance: 2,
      direction: 'max',
      category: 'roads',
      severity: 'critical',
    },

    // --- Waterproofing Additional ---
    waterproofing_lap: {
      id: 'waterproofing_lap',
      part: 'QCS 2024 Part 8',
      section: 'Section 4',
      clause: '4.3.1',
      title: 'تداخل طبقات العزل المائي',
      description: 'الحد الأدنى للتداخل بين ألواح العزل المائي',
      limit: 150,
      unit: 'mm',
      tolerance: 15,
      direction: 'min',
      category: 'waterproofing',
      severity: 'critical',
    },
    waterproofing_upturn: {
      id: 'waterproofing_upturn',
      part: 'QCS 2024 Part 8',
      section: 'Section 4',
      clause: '4.4.2',
      title: 'ارتفاع نهاية العزل (Upturn)',
      description: 'الحد الأدنى لارتفاع رفع طبقة العزل على الجدران',
      limit: 200,
      unit: 'mm',
      tolerance: 20,
      direction: 'min',
      category: 'waterproofing',
      severity: 'major',
    },

    // --- Masonry Additional ---
    masonry_joint_thickness: {
      id: 'masonry_joint_thickness',
      part: 'QCS 2024 Part 7',
      section: 'Section 3',
      clause: '3.2.4',
      title: 'سماكة درز الملاط في البناء',
      description: 'النطاق المقبول لسماكة درز الملاط الأفقي',
      limit: 10,
      unit: 'mm',
      tolerance: 3,
      category: 'masonry',
      severity: 'minor',
    },
    masonry_wall_plumb: {
      id: 'masonry_wall_plumb',
      part: 'QCS 2024 Part 7',
      section: 'Section 5',
      clause: '5.3.1',
      title: 'شاقولية الجدار المبني',
      description: 'الحد الأقصى للانحراف عن الشاقول لكل 3م ارتفاع',
      limit: 5,
      unit: 'mm',
      tolerance: 2,
      direction: 'max',
      category: 'masonry',
      severity: 'major',
    },

    // --- Concrete Additional (QCS 2024 Part 5) ---
    concrete_slump: {
      id: 'concrete_slump',
      part: 'QCS 2024 Part 5',
      section: 'Section 6',
      clause: '6.4.3',
      title: 'هبوط الخرسانة (Slump)',
      description: 'حدود هبوط الخرسانة المضخوخة في البيئة القطرية',
      limit: 180,
      unit: 'mm',
      tolerance: 25,
      direction: 'max',
      category: 'concrete',
      severity: 'major',
    },
    concrete_compressive_strength: {
      id: 'concrete_compressive_strength',
      part: 'QCS 2024 Part 5',
      section: 'Section 7',
      clause: '7.2.1',
      title: 'مقاومة الانضغاط — خرسانة هيكلية',
      description: 'الحد الأدنى لمقاومة الانضغاط بعد 28 يوم',
      limit: 40,
      unit: 'MPa',
      tolerance: 2,
      direction: 'min',
      category: 'concrete',
      severity: 'critical',
    },
    rebar_spacing: {
      id: 'rebar_spacing',
      part: 'QCS 2024 Part 5',
      section: 'Section 14',
      clause: '14.3.2',
      title: 'مسافة التسليح الحديدي',
      description: 'الحد الأقصى للمسافة بين قضبان التسليح في البلاطات',
      limit: 300,
      unit: 'mm',
      tolerance: 20,
      direction: 'max',
      category: 'concrete',
      severity: 'major',
    },

    // --- MEP: HVAC (QCS 2024 Part 14) ---
    duct_clearance: {
      id: 'duct_clearance',
      part: 'QCS 2024 Part 14',
      section: 'Section 5',
      clause: '5.6.2',
      title: 'فراغ صيانة المجرى الهوائي',
      description: 'الحد الأدنى للمسافة بين المجرى الهوائي والسقف أو الجدار',
      limit: 300,
      unit: 'mm',
      tolerance: 50,
      direction: 'min',
      category: 'mep',
      severity: 'minor',
    },
    pipe_insulation_thickness: {
      id: 'pipe_insulation_thickness',
      part: 'QCS 2024 Part 14',
      section: 'Section 8',
      clause: '8.3.1',
      title: 'سماكة عزل أنابيب التكييف',
      description: 'الحد الأدنى لسماكة العزل الحراري لأنابيب المياه الباردة',
      limit: 32,
      unit: 'mm',
      tolerance: 3,
      direction: 'min',
      category: 'mep',
      severity: 'major',
    },

    // --- Roads: Pavement Layers ---
    base_course_compaction: {
      id: 'base_course_compaction',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 5',
      clause: '5.4.1',
      title: 'نسبة دمك طبقة الأساس',
      description: 'الحد الأدنى لنسبة الدمك بالنسبة لـ Modified Proctor',
      limit: 98,
      unit: '%',
      tolerance: 1,
      direction: 'min',
      category: 'roads',
      severity: 'critical',
    },
    asphalt_thickness: {
      id: 'asphalt_thickness',
      part: 'Ashghal RDM 2023',
      section: 'Chapter 5',
      clause: '5.6.2',
      title: 'سماكة طبقة الأسفلت (Wearing Course)',
      description: 'الحد الأدنى لسماكة طبقة التآكل في الطرق الحضرية',
      limit: 50,
      unit: 'mm',
      tolerance: 5,
      direction: 'min',
      category: 'roads',
      severity: 'critical',
    },
  };

  // ===== فحص قيمة ضد المواصفات =====
  function checkValue(specId, measuredValue) {
    const spec = QCS_SPECS[specId];
    if (!spec) return null;

    const isMaxLimit = spec.direction === 'max';
    let status, deviation;

    if (isMaxLimit) {
      // يجب أن يكون أقل من الحد (مثل: انحراف الجدار)
      deviation = measuredValue - spec.limit;
      if (measuredValue <= spec.limit) {
        status = 'pass';
      } else if (measuredValue <= spec.limit + spec.tolerance) {
        status = 'warning';
      } else {
        status = 'fail';
      }
    } else {
      // يجب أن يكون أكبر من أو يساوي الحد (مثل: الغطاء الخرساني)
      deviation = measuredValue - spec.limit;
      if (measuredValue >= spec.limit) {
        status = 'pass';
      } else if (measuredValue >= spec.limit - spec.tolerance) {
        status = 'warning';
      } else {
        status = 'fail';
      }
    }

    return {
      ...spec,
      measured: measuredValue,
      deviation: +deviation.toFixed(1),
      status,
    };
  }

  // ===== إنشاء بيانات Hotspot جاهزة للـ Viewer =====
  function createHotspot(position, specId, measuredValue) {
    const result = checkValue(specId, measuredValue);
    if (!result) {
      console.warn(`[QCS] SpecId غير موجود: ${specId}`);
      return null;
    }
    return {
      position, // {x, y, z}
      qcsData: result,
    };
  }

  // ===== مجموعات جاهزة لسيناريوهات شائعة =====
  const PRESET_SCENARIOS = {
    // فحص منشأة خرسانية
    concrete_structure: [
      { specId: 'concrete_cover_column', label: 'غطاء عمود A1', defaultMeasured: 45 },
      { specId: 'concrete_cover_beam',   label: 'غطاء كمرة B2',  defaultMeasured: 42 },
      { specId: 'slab_thickness',        label: 'سماكة البلاطة',  defaultMeasured: 155 },
      { specId: 'floor_level_tolerance', label: 'مستوى الأرضية', defaultMeasured: 12 },
    ],
    // فحص طريق
    road_inspection: [
      { specId: 'road_width_local', label: 'عرض الطريق', defaultMeasured: 6850 },
      { specId: 'curb_height',      label: 'ارتفاع الرصيف', defaultMeasured: 148 },
      { specId: 'sidewalk_width',   label: 'عرض الرصيف', defaultMeasured: 2100 },
    ],
    // فحص جدار
    wall_inspection: [
      { specId: 'wall_plumb_tolerance', label: 'انحراف الجدار',     defaultMeasured: 8 },
      { specId: 'mortar_joint_thickness', label: 'سماكة المونة',    defaultMeasured: 11 },
      { specId: 'waterproof_thickness', label: 'سماكة العزل المائي', defaultMeasured: 3.5 },
    ],
  };

  // ===== قائمة المواصفات للعرض في الـ UI =====
  function getSpecsList(category = null) {
    return Object.values(QCS_SPECS)
      .filter(s => !category || s.category === category)
      .map(s => ({
        id:          s.id,
        title:       s.title,
        part:        s.part,
        clause:      s.clause,
        limit:       s.limit,
        unit:        s.unit,
        category:    s.category,
        severity:    s.severity,
      }));
  }

  // ===== تحليل كامل للموقع =====
  function analyzeScene(hotspotsData) {
    const results = hotspotsData.map(h => h.qcsData).filter(Boolean);
    return {
      total:    results.length,
      pass:     results.filter(r => r.status === 'pass').length,
      fail:     results.filter(r => r.status === 'fail').length,
      warning:  results.filter(r => r.status === 'warning').length,
      critical: results.filter(r => r.status === 'fail' && r.severity === 'critical').length,
      score:    results.length
        ? Math.round((results.filter(r => r.status === 'pass').length / results.length) * 100)
        : 0,
      details: results,
    };
  }

  return {
    QCS_SPECS,
    checkValue,
    createHotspot,
    PRESET_SCENARIOS,
    getSpecsList,
    analyzeScene,
  };
})();
