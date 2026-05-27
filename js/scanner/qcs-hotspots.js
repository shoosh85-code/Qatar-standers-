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
