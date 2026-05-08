// api/mos-generator.js
// QatarSpec Pro — Method Statement Generator
// المراجع: QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024
// ⚠️ لا يُستخدم Parsons كمرجع

import { rateLimiter } from './rate-limit.js';

// ============================================================
// قواميس القوالب — Templates Dictionary
// ============================================================

const MOS_TEMPLATES = {

  // ─────────────────────────────────────────────
  // 1. ASPHALT WORKS — أعمال الأسفلت
  // ─────────────────────────────────────────────
  asphalt: {
    titleEn: 'Method Statement for Asphalt Works (PMB & Non-PMB Asphalt)',
    titleAr: 'طريقة تنفيذ أعمال الأسفلت (أسفلت معدّل بالبوليمر وغير معدّل)',
    qcsRef: 'QCS 2024 Section 6 Part 5',
    sections: {
      scope: {
        en: 'This method statement defines the procedures for asphalt paving works including PMB and Non-PMB asphalt layers, ensuring compliance with QCS 2024 Section 6 Part 5 and Ashghal RDM 2023.',
        ar: 'يحدد هذا البيان منهجية أعمال الرصف الأسفلتي بما في ذلك طبقات الأسفلت المعدّل وغير المعدّل، مع ضمان الامتثال لـ QCS 2024 القسم 6 الجزء 5 ومعايير أشغال RDM 2023.'
      },
      plant: [
        { item: 'Asphalt Paver (self-propelled)', spec: 'Capable of paving min. 3.0m width', qcs: 'QCS 2024 Cl. 5.5.2' },
        { item: 'Tandem Vibratory Roller', spec: 'Min. 10-12 tonnes static weight', qcs: 'QCS 2024 Cl. 5.5.3' },
        { item: 'Pneumatic Tyre Roller', spec: 'Min. 11-16 tonnes', qcs: 'QCS 2024 Cl. 5.5.3' },
        { item: 'Shuttle Buggy / Material Transfer Vehicle', spec: 'For PMB asphalt', qcs: 'QCS 2024 Cl. 5.2.5' },
        { item: 'Bitumen Spray Tanker', spec: 'Calibrated, temp controlled', qcs: 'QCS 2024 Cl. 5.3.2' },
        { item: 'Thermometers (contact + infrared)', spec: 'Calibrated, accuracy ±1°C', qcs: 'QCS 2024 Cl. 5.5.4' },
        { item: '3m Straight Edge', spec: 'For surface regularity check', qcs: 'QCS 2024 Cl. 5.7.2' },
        { item: 'Tipper Trucks', spec: 'Insulated covers mandatory', qcs: '' },
        { item: 'Water Bowser with pump', spec: '', qcs: '' },
        { item: 'TTM Equipment (TMA, signs)', spec: 'Per WZTMG / QCTM', qcs: 'Ashghal RDM 2023' },
      ],
      materials: [
        { item: 'Bitumen PMB (Polymer Modified)', spec: 'Table 5.5 QCS 2024', qcs: 'QCS 2024 Cl. 5.2.6' },
        { item: 'Bitumen Penetration Grade 60-70', spec: 'Table 5.4 QCS 2024', qcs: 'QCS 2024 Cl. 5.2.6' },
        { item: 'Coarse Aggregate (retained 4.75mm)', spec: 'Table 5.2 QCS 2024', qcs: 'QCS 2024 Cl. 5.2.4' },
        { item: 'Fine Aggregate (passing 4.75mm)', spec: 'Table 5.1 QCS 2024', qcs: 'QCS 2024 Cl. 5.2.2' },
        { item: 'Mineral Filler', spec: 'Max 75 micron', qcs: 'QCS 2024 Cl. 5.2.3' },
        { item: 'Prime Coat (MC-30 or equivalent)', spec: 'Ashghal approved', qcs: 'QCS 2024 Cl. 5.3.1' },
        { item: 'Tack Coat (CSS-1h or equivalent)', spec: 'Ashghal approved', qcs: 'QCS 2024 Cl. 5.3.2' },
      ],
      methodology: {
        steps: [
          {
            step: 1,
            titleEn: 'Preparation & Co-ordination',
            titleAr: 'التحضير والتنسيق',
            details: [
              'Obtain all necessary permits (Road Opening Permit from Ashghal/PWA)',
              'Submit and obtain approval for: IFC drawings, MOS, JMF, Material Approvals (MAR)',
              'Establish TTM (Temporary Traffic Management) as per approved scheme (WZTMG/QCTM)',
              'Confirm availability of asphalt plant and delivery schedule',
              'Pre-paving meeting with QC, HSE, and supervision consultant',
              'Check weather: min. surface temp 10°C, no rain forecast within 24hrs',
            ],
            qcsRef: 'QCS 2024 Cl. 5.5.1'
          },
          {
            step: 2,
            titleEn: 'Survey & Setting-Out',
            titleAr: 'المسح وضبط المحاور',
            details: [
              'Verify existing surface levels against design drawings',
              'Set out string lines / reference pins for paver guidance',
              'Check cross-falls, drainage gradients',
              'Survey and record existing surface defects',
            ],
            qcsRef: 'QCS 2024 Cl. 1.7 & IFC Drawings'
          },
          {
            step: 3,
            titleEn: 'Surface Preparation',
            titleAr: 'تحضير السطح',
            details: [
              'Clean surface using power broom and/or power blower — remove all debris, dust, mud',
              'Repair any potholes or failed areas before paving',
              'Check that underlying layer: compaction ≥ specified, level within tolerance',
              'Apply Prime Coat (for new unbound layers) at rate per QCS 2024 Table 5.9',
              'Apply Tack Coat (between bound layers) at rate per QCS 2024 Table 5.10',
              'Allow adequate curing time before paving',
            ],
            qcsRef: 'QCS 2024 Cl. 5.3.1 & 5.3.2'
          },
          {
            step: 4,
            titleEn: 'Asphalt Laying — Non-PMB',
            titleAr: 'فرد الأسفلت — غير معدّل',
            details: [
              'Check mix temperature at plant: 150–165°C (Non-PMB)',
              'Check temperature at point of delivery (before paver): min. 140°C',
              'Reject any load with temperature below minimum or showing segregation/oxidation',
              'Paver speed: 3–6 m/min (adjust to maintain continuous supply)',
              'Screed pre-heat to operating temperature before paving begins',
              'Longitudinal joint: offset min. 150mm from joints in layer below',
              'Transverse joint: perpendicular to direction of travel, cut back to solid material',
              'Layer thickness: as per approved JMF and design (typically 40–60mm per layer)',
            ],
            qcsRef: 'QCS 2024 Cl. 5.5.2 & Ashghal RDM 2023'
          },
          {
            step: 5,
            titleEn: 'Asphalt Laying — PMB (Polymer Modified Bitumen)',
            titleAr: 'فرد الأسفلت المعدّل بالبوليمر',
            details: [
              'Shuttle Buggy (MTV) mandatory for PMB wearing course to reduce thermal segregation',
              'Mix temperature at plant: 160–175°C (PMB)',
              'Temperature at paver: min. 155°C',
              'Compaction must be completed before temperature drops below 130°C',
              'Rolling pattern per approved Rolling Pattern DWG (submit to SC before work)',
              'Separate JMF required for each PMB mix type',
            ],
            qcsRef: 'QCS 2024 Cl. 5.2.5 & 5.5.2'
          },
          {
            step: 6,
            titleEn: 'Compaction (Rolling)',
            titleAr: 'الدمك (الحدل)',
            details: [
              'Rolling sequence: breakdown → intermediate → finish rolling',
              'Breakdown rolling: tandem vibratory roller (vibration ON) immediately behind paver',
              'Intermediate rolling: pneumatic tyre roller (PTR) — maintains temperature, improves density',
              'Finish rolling: tandem roller (vibration OFF) for surface texture',
              'Number of passes per approved Rolling Pattern (min. 4 passes each direction typical)',
              'Check compaction by nuclear density gauge — min. 97% of lab density (QCS Table 5.11)',
              'Do not roll when surface temperature < 100°C (Non-PMB) / 120°C (PMB)',
            ],
            qcsRef: 'QCS 2024 Cl. 5.5.3 & Table 5.11'
          },
          {
            step: 7,
            titleEn: 'Quality Control During Paving',
            titleAr: 'ضبط الجودة أثناء الفرد',
            details: [
              'Monitor mix temperature continuously — record every truck delivery',
              'Prepare and cure Marshall specimens (min. 6 cores per shift)',
              'Check surface regularity with 3m straight edge: max deviation 4mm under 3m (wearing)',
              'Check levels against design — tolerance ±6mm',
              'Submit Paving Plan before each day\'s work (include section, width, timing)',
              'Calibration certificates for all plant — valid before use',
            ],
            qcsRef: 'QCS 2024 Cl. 5.7.2 & ITP-Asphalt'
          },
          {
            step: 8,
            titleEn: 'Rectification (Non-Conformance)',
            titleAr: 'التصحيح (عدم المطابقة)',
            details: [
              'If compaction < minimum: additional passes (if temperature permits) or cut and replace',
              'If level out of tolerance: diamond grinding (if > required) or overlay (if < required)',
              'All NCRs to be raised through QMS system — no verbal approvals',
              'Rectification method requires SC approval before execution',
              'Reinspect and retest after any rectification work',
            ],
            qcsRef: 'QCS 2024 Cl. 5.8 & QMS Procedure'
          },
        ]
      },
      hse: {
        ppe: ['Safety helmet', 'Hi-vis vest (Class 3)', 'Safety boots (steel toe)', 'Heat-resistant gloves (near asphalt)', 'Eye protection', 'Face mask (during paving)', 'Sun protection (outdoor work Qatar)'],
        hazards: [
          { hazard: 'Burns from hot asphalt (>150°C)', control: 'Maintain safe distance, PPE, no open-toe shoes near paver', riskRating: 'High' },
          { hazard: 'Traffic collision in live road works', control: 'Full TTM per WZTMG, TMA mandatory, no work without permit', riskRating: 'High' },
          { hazard: 'Heat stress (Qatar summer)', control: 'Shaded rest areas, water every 20 min, buddy system, rotate workers', riskRating: 'High' },
          { hazard: 'Fumes from hot bitumen', control: 'PPE respiratory, work upwind where possible, monitoring', riskRating: 'Medium' },
          { hazard: 'Roller/paver collision with workers', control: 'Exclusion zones, spotters, banksmen, clear communication', riskRating: 'High' },
        ],
        emergency: 'In case of emergency: Call 999 (Qatar Emergency). Nearest hospital from site must be identified in pre-work briefing. First Aider on site mandatory for >20 workers.',
        environment: [
          'No spillage of bitumen or chemicals to drainage/ground — drip trays under plant',
          'Asphalt waste disposed at Ashghal-approved facility only',
          'Night work noise control per MMUP requirements',
          'Dust suppression by water bowser',
        ]
      },
      references: [
        { ref: 'QCS 2024 Section 6 Part 5', desc: 'Flexible Pavement — Asphalt' },
        { ref: 'Ashghal RDM 2023', desc: 'Road Design Manual — Pavement Design' },
        { ref: 'ASTM D5821', desc: 'Fractured Faces in Coarse Aggregate' },
        { ref: 'ASTM C136', desc: 'Sieve Analysis of Aggregates' },
        { ref: 'BS EN 12697-34', desc: 'Marshall Properties' },
        { ref: 'ASTM D2872', desc: 'RTFOT Aging Test' },
        { ref: 'QCS 2024 Section 1 Part 7', desc: 'Submittals & Document Control' },
        { ref: 'WZTMG', desc: 'Work Zone Traffic Management Guidelines — Qatar' },
      ]
    }
  },

  // ─────────────────────────────────────────────
  // 2. EARTHWORKS — أعمال الحفر والردم
  // ─────────────────────────────────────────────
  earthworks: {
    titleEn: 'Method Statement for Earthworks (Cut & Fill)',
    titleAr: 'طريقة تنفيذ أعمال الحفر والردم',
    qcsRef: 'QCS 2024 Section 4',
    sections: {
      scope: {
        en: 'This method statement covers all earthworks operations including excavation, filling, compaction, and proof rolling in accordance with QCS 2024 Section 4.',
        ar: 'يغطي هذا البيان جميع أعمال الحفر والردم والدمك وفق QCS 2024 القسم 4.'
      },
      methodology: {
        steps: [
          {
            step: 1,
            titleEn: 'Pre-Earthworks',
            titleAr: 'ما قبل أعمال الترابية',
            details: [
              'Identify and locate all underground utilities (KAHRAMAA, Woqod, Ooredoo, QatarGas) — obtain utility drawings',
              'Trial pit to confirm utility locations before bulk excavation',
              'Obtain excavation permit from relevant authority',
              'Establish survey control points — set out excavation limits',
              'Dewater if groundwater present (GWT < excavation depth)',
            ],
            qcsRef: 'QCS 2024 Cl. 4.1 & KAHRAMAA Safety Rules'
          },
          {
            step: 2,
            titleEn: 'Excavation / Cut',
            titleAr: 'الحفر',
            details: [
              'Excavate in controlled lifts — max. 2m per lift in cohesive soil',
              'Side slopes per geotechnical recommendations or QCS Table 4.1',
              'Protect excavation edges — trench boxes or shoring for depths > 1.2m',
              'Remove all unsuitable material (organics, contaminated soil, rock larger than 150mm for fill)',
              'Stockpile excavated material min. 1m from edge of excavation',
              'Wheel wash provided at site exit — no mud on public roads',
            ],
            qcsRef: 'QCS 2024 Cl. 4.3 & Geotechnical Report'
          },
          {
            step: 3,
            titleEn: 'Filling & Compaction',
            titleAr: 'الردم والدمك',
            details: [
              'Place fill in layers not exceeding 250mm compacted thickness',
              'Moisture condition fill to within ±2% of Optimum Moisture Content (OMC)',
              'Compact to min. 95% Modified Proctor (QCS 2024 Table 4.2)',
              'Minimum 3 passes per lift with compaction plant',
              'Compaction test (nuclear density gauge or sand replacement) per layer per 500m²',
              'No fill placement on frozen, waterlogged, or organic subgrade',
              'Use vibrating plate compactor within 300mm of structures/utilities',
            ],
            qcsRef: 'QCS 2024 Cl. 4.4 & Table 4.2'
          },
          {
            step: 4,
            titleEn: 'Proof Rolling',
            titleAr: 'الحدل الاختباري',
            details: [
              'Proof roll completed formation with loaded tipper truck (min. 10t rear axle)',
              'Observe for rutting > 25mm or pumping — areas failing must be reworked',
              'Proof rolling in presence of Supervision Consultant (Hold Point)',
              'Complete proof rolling record with GPS track and photos',
            ],
            qcsRef: 'QCS 2024 Cl. 4.5.3'
          },
        ]
      }
    }
  },

  // ─────────────────────────────────────────────
  // 3. DRAINAGE WORKS — أعمال الصرف الصحي/أمطار
  // ─────────────────────────────────────────────
  drainage: {
    titleEn: 'Method Statement for Drainage Works (Stormwater/Foul Drainage)',
    titleAr: 'طريقة تنفيذ أعمال الصرف (مياه الأمطار / الصرف الصحي)',
    qcsRef: 'QCS 2024 Section 8',
    sections: {
      scope: {
        en: 'Method statement for installation of drainage pipes, manholes, and appurtenances per QCS 2024 Section 8 and Ashghal drainage design standards.',
        ar: 'طريقة تنفيذ تركيب أنابيب الصرف وغرف التفتيش والملحقات وفق QCS 2024 القسم 8 ومعايير تصميم الصرف في أشغال.'
      },
      methodology: {
        steps: [
          {
            step: 1,
            titleEn: 'Trench Excavation',
            titleAr: 'حفر الخندق',
            details: [
              'Mark and confirm all utility crossings before excavation',
              'Excavate trench to design width (pipe OD + min. 300mm each side)',
              'Trench sides: vertical shoring for depths > 1.5m or unstable soil',
              'Keep trench dry — dewater if necessary (sump pump / wellpoint system)',
              'Grade trench bottom to design gradient (check with laser level)',
            ],
            qcsRef: 'QCS 2024 Cl. 8.3.1'
          },
          {
            step: 2,
            titleEn: 'Pipe Bedding & Laying',
            titleAr: 'وضع الفرشة وتركيب الأنابيب',
            details: [
              'Bedding class per design drawing (typically Class B — 100mm granular below pipe)',
              'Pipe jointing: rubber ring joints — clean and lubricate before assembly',
              'Laser-guide pipe laying to maintain design gradient (min. 1:500)',
              'Max. deviation from design: ±25mm horizontally, ±10mm vertically (QCS Cl. 8.3.5)',
              'Plugging pipe ends when work stops — no soil entry',
              'Manhole construction as per Ashghal approved drawing',
            ],
            qcsRef: 'QCS 2024 Cl. 8.3.2 – 8.3.5'
          },
          {
            step: 3,
            titleEn: 'Backfilling & Compaction',
            titleAr: 'الردم والدمك',
            details: [
              'Initial backfill: approved granular material to 300mm above crown — hand compact only',
              'Subsequent layers: 200mm lifts, plate compactor (no heavy plant over pipe until min. 600mm cover)',
              'Minimum compaction: 95% Standard Proctor',
              'Final layers under road: match road subgrade specification',
            ],
            qcsRef: 'QCS 2024 Cl. 8.4.1'
          },
          {
            step: 4,
            titleEn: 'Testing',
            titleAr: 'الاختبار',
            details: [
              'CCTV inspection of completed pipeline (mandatory per Ashghal requirements)',
              'Water pressure test / air test per QCS 2024 Cl. 8.5',
              'Manhole hydraulic test (water tightness)',
              'Deflection test (flexible pipes) — max. 5% deflection',
            ],
            qcsRef: 'QCS 2024 Cl. 8.5 & Ashghal drainage standards'
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────
  // 4. SUB-BASE / ROAD BASE — طبقة القاعدة
  // ─────────────────────────────────────────────
  subbase: {
    titleEn: 'Method Statement for Sub-base and Road Base Construction',
    titleAr: 'طريقة تنفيذ طبقة الإسناد وقاعدة الطريق',
    qcsRef: 'QCS 2024 Section 6 Part 4',
    sections: {
      scope: {
        en: 'Method statement for granular sub-base and road base layer construction per QCS 2024 Section 6 Part 4.',
        ar: 'طريقة تنفيذ طبقة الإسناد الحبيبي وقاعدة الطريق وفق QCS 2024 القسم 6 الجزء 4.'
      },
      methodology: {
        steps: [
          {
            step: 1, titleEn: 'Formation Acceptance', titleAr: 'قبول مستوى التأسيس',
            details: ['Proof roll subgrade — obtain SC approval (Hold Point)', 'Check levels within ±15mm of design', 'CBR test of subgrade min. 6% (QCS Table 4.1)'],
            qcsRef: 'QCS 2024 Cl. 6.4.1'
          },
          {
            step: 2, titleEn: 'Material Spreading', titleAr: 'فرد المواد',
            details: ['Spread in layers not exceeding 200mm loose thickness', 'Material: crushed rock, CBR ≥ 80% (sub-base), ≥ 120% (base)', 'No segregation — avoid dumping in single pile and spreading'],
            qcsRef: 'QCS 2024 Cl. 6.4.3 & Table 6.1'
          },
          {
            step: 3, titleEn: 'Compaction', titleAr: 'الدمك',
            details: ['Min. 98% Modified Proctor (QCS 2024)', 'Moisture within OMC ±2%', 'Nuclear density test every 500m² per layer', 'Minimum 4 passes vibratory roller'],
            qcsRef: 'QCS 2024 Cl. 6.4.4'
          },
          {
            step: 4, titleEn: 'Level & Regularity Check', titleAr: 'التسوية والانتظام',
            details: ['Finished level tolerance: ±10mm from design', '3m straight edge: max 12mm (sub-base), 8mm (base)', 'Cross-fall tolerance: ±0.5%'],
            qcsRef: 'QCS 2024 Cl. 6.4.5'
          }
        ]
      }
    }
  },

  // ─────────────────────────────────────────────
  // 5. CONCRETE WORKS — أعمال الخرسانة
  // ─────────────────────────────────────────────
  concrete: {
    titleEn: 'Method Statement for Concrete Works (Curbs, Sidewalks & Minor Structures)',
    titleAr: 'طريقة تنفيذ أعمال الخرسانة (حجارة الرصيف، الأرصفة والإنشاءات الصغيرة)',
    qcsRef: 'QCS 2024 Section 5',
    sections: {
      scope: { en: 'Concrete works including kerbs, sidewalks, manholes, and small structures per QCS 2024 Section 5.', ar: '' },
      methodology: {
        steps: [
          { step: 1, titleEn: 'Pre-Concrete Checks', titleAr: 'فحوصات ما قبل الصب',
            details: ['Formwork inspection — level, alignment, stability, release agent applied', 'Rebar inspection — spacing, cover, laps, ties per IFC drawing', 'Submit IR (Inspection Request) to SC — Hold Point before any concrete pour'],
            qcsRef: 'QCS 2024 Cl. 5.4.1' },
          { step: 2, titleEn: 'Concrete Supply & Delivery', titleAr: 'توريد وتوصيل الخرسانة',
            details: ['Approved mix design (MAR submitted and approved)', 'Slump test on every truck delivery — max. ±25mm of design slump', 'Temperature on delivery: max. 32°C in summer, min. 10°C in cold', 'Reject any truck exceeding 90min travel time or 300 drum revolutions'],
            qcsRef: 'QCS 2024 Cl. 5.3.4' },
          { step: 3, titleEn: 'Placing & Compaction', titleAr: 'الصب والدمك',
            details: ['Maximum drop height: 1.5m', 'Vibrate at 450mm centres (internal poker vibrator)', 'No re-vibrating after initial set', 'Place in layers max. 400mm'],
            qcsRef: 'QCS 2024 Cl. 5.4.3' },
          { step: 4, titleEn: 'Curing', titleAr: 'المعالجة',
            details: ['Start curing immediately after finishing — within 30 min in Qatar summer', 'Min. 7 days wet curing (hessian + polythene) or approved curing compound', 'Protect from direct sun — shading mandatory in summer months'],
            qcsRef: 'QCS 2024 Cl. 5.5.1' },
        ]
      }
    }
  },

  // ─────────────────────────────────────────────
  // 6. UNDERGROUND UTILITIES — مرافق تحت الأرض
  // ─────────────────────────────────────────────
  utilities: {
    titleEn: 'Method Statement for Underground Utilities Installation',
    titleAr: 'طريقة تنفيذ تركيب المرافق تحت الأرض',
    qcsRef: 'QCS 2024 Section 8 & KAHRAMAA Standards 2024',
    sections: {
      scope: { en: 'Installation of underground utilities including LV/MV power cables, telecom ducts, water mains, and gas lines per KAHRAMAA, QatarGas, and Ooredoo standards.', ar: '' },
      methodology: {
        steps: [
          { step: 1, titleEn: 'Utility Identification & NOC', titleAr: 'تحديد المرافق والتصاريح',
            details: ['Obtain NOC from all utility authorities before excavation: KAHRAMAA (electrical & water), QatarGas (gas), Ooredoo (telecom), Qatar Rail (if applicable)', 'Utility mapping using CAT scanner + suction excavation at crossings', 'Mark all utilities on ground with approved paint colors'],
            qcsRef: 'KAHRAMAA Safety Rules & QatarGas HSE' },
          { step: 2, titleEn: 'Duct/Cable Installation', titleAr: 'تركيب المواسير والكابلات',
            details: ['Minimum cover depths: LV cables 600mm, MV cables 1000mm, water 1000mm, gas 900mm (per KAHRAMAA)', 'Sand bedding for cables: 75mm below and above', 'Marker tape 300mm above all buried services', 'Pull boxes at max. 30m intervals for cable routes'],
            qcsRef: 'KAHRAMAA Installation Standards 2024 & QCS 2024 Cl. 8.6' },
          { step: 3, titleEn: 'Testing & Commissioning', titleAr: 'الاختبار والتشغيل',
            details: ['Cable: HV pressure test, insulation resistance test per KAHRAMAA', 'Water: pressure test 1.5× working pressure for 24hrs', 'Gas: strength test + tightness test per QatarGas procedures', 'All tests witnessed by utility authority engineer'],
            qcsRef: 'KAHRAMAA/QatarGas commissioning procedures' },
        ]
      }
    }
  }
};

// ============================================================
// ITP Templates — قوالب خطط الفحص والاختبار
// ============================================================

const ITP_TEMPLATES = {

  asphalt: {
    title: 'Inspection and Test Plan — Asphalt Testing',
    itpNo: 'ITP-[PROJECT]-ASPHALT-001',
    qcsRef: 'QCS 2024 Section 6 Part 5',
    activities: [
      // 1.0 PRE-CONSTRUCTION
      { sn: '1.0', type: 'header', title: 'Pre-Construction Documents' },
      {
        sn: '1.1', title: 'Shop Drawings', ref: 'QCS 2024 Sec.1 P7 Cl.7.10.1',
        acceptance: 'Complete per dimensions, design criteria, materials, connections',
        testMethod: 'Review of Document', frequency: 'Each submittal', owner: 'ENGM',
        lab: 'H', qc: 'H', sc: 'R', records: 'Approved shop drawings'
      },
      {
        sn: '1.2', title: 'Material Approvals (MAR)', ref: 'QCS 2024 Sec.1 P7 Cl.7.11.1.1',
        acceptance: 'Approved before delivery to site',
        testMethod: 'Review of Document', frequency: 'Each submittal', owner: 'PROC',
        lab: 'H', qc: 'H', sc: 'R', records: 'Approved MAR'
      },
      {
        sn: '1.3', title: 'Method Statement', ref: 'QCS 2024 Sec.1 P7 Cl.7.14.1.1',
        acceptance: 'Comply with QCS 2024 Section 11 Part 1',
        testMethod: 'Review of Document', frequency: 'Each submittal', owner: 'PRO.E',
        lab: 'H', qc: 'H', sc: 'R', records: 'Approved MOS'
      },
      {
        sn: '1.4', title: 'Job Mix Formula (JMF)', ref: 'QCS 2024 Sec.6 P5 Cl.5.1.4.1',
        acceptance: 'JMF with gradation, binder content, mixing/compaction temps, reference density',
        testMethod: 'Review of Document', frequency: 'Each submittal', owner: 'QC/Lab',
        lab: 'H', qc: 'H', sc: 'R', records: 'Approved JMF'
      },
      // 2.0 SAMPLING & TESTING
      { sn: '2.0', type: 'header', title: 'Sampling, Testing and Acceptance of Asphalt' },
      {
        sn: '2.1', title: 'Bitumen Properties — PMB (Polymer Modified)',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.2.6 Table 5.5',
        acceptance: 'Flash Point ≥230°C, Viscosity ≤135 Pa.s, G*/sinδ ≥1.00kPa @ 76°C, Solubility ≥99%',
        testMethod: 'ASTM D92 / D4402 / D7175 / D5546',
        frequency: '1 test per 450T', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      {
        sn: '2.2', title: 'Bitumen Properties — Pen Grade 60-70',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.2.6 Table 5.4',
        acceptance: 'Penetration 60-70 (0.1mm), Softening Point ≥46°C, Ductility ≥100cm, Solubility ≥99%',
        testMethod: 'ASTM D5 / D36 / D113 / D2042',
        frequency: '1 test per 450T (+ 1 per 75T)', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      {
        sn: '2.3', title: 'Fine Aggregates (passing 4.75mm sieve)',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.2.2 Table 5.1',
        acceptance: 'Plasticity Index ≤4%, Sand Equivalent ≥45%, Sulphate ≤0.5%, No clay lumps',
        testMethod: 'ASTM D4318 / D2419 / C88 / BS1377 P3 / C142',
        frequency: '1 test per 2000m³', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      {
        sn: '2.4', title: 'Coarse Aggregates (retained 4.75mm sieve)',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.2.4 Table 5.2',
        acceptance: 'One fractured face 100%, Two fractured faces 85%, Flat/Elongated ≤15%, LA Abrasion ≤30%, Water absorption ≤2%',
        testMethod: 'ASTM D5821 / D4791 / C131 / C535 / C127',
        frequency: '1 test per 2000m³', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      {
        sn: '2.5', title: 'Extraction & Gradation (from produced mix)',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.3.2 Table 5.7',
        acceptance: 'Gradation within JMF tolerances per QCS Table 5.7',
        testMethod: 'ASTM C136',
        frequency: 'Every JMF change + 1 test per day + 1 test per 2000m²', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      {
        sn: '2.6', title: 'Marshall Properties',
        ref: 'QCS 2024 Sec.6 P5 Cl.5.3.2 Table 5.8 & 5.9',
        acceptance: 'Stability ≥9.5kN, Flow 2-4mm, VMA 4-8%, VFA 50-75%, VIM 3-5%',
        testMethod: 'BS EN 12697-34 / CML Method 2-97',
        frequency: '1 test per day + 1 test per 300T', owner: 'QC/Laboratory',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Test Report'
      },
      // 3.0 DURING LAYING
      { sn: '3.0', type: 'header', title: 'During Asphalt Laying & Compaction' },
      {
        sn: '3.1', title: 'Mix Temperature (at paver)',
        ref: 'QCS 2024 Cl. 5.5.4 & Approved JMF',
        acceptance: 'Non-PMB: 140–165°C at paver. PMB: 155–175°C at paver. Reject < minimum.',
        testMethod: 'Contact/infrared thermometer (calibrated)',
        frequency: 'Every truck delivery + continuous during laying', owner: 'QCI',
        lab: '-', qc: 'S', sc: 'S', records: 'Temperature log'
      },
      {
        sn: '3.2', title: 'Compaction (In-situ Density)',
        ref: 'QCS 2024 Cl. 5.5.3 Table 5.11',
        acceptance: 'Min. 97% of lab reference density (nuclear gauge method)',
        testMethod: 'Nuclear Density Gauge (calibrated)',
        frequency: '1 test per 1000m² per layer (min. 5 random points)', owner: 'QCI',
        lab: 'H', qc: 'W', sc: 'R', records: 'Density record + IR'
      },
      {
        sn: '3.3', title: 'Core Testing (density from cores)',
        ref: 'QCS 2024 Cl. 5.7.1',
        acceptance: 'Min. 97% of lab reference density',
        testMethod: 'Core extraction → lab density test',
        frequency: '1 core per 2000m² (minimum 3 cores per area)', owner: 'QCI/Lab',
        lab: 'H', qc: 'W', sc: 'W', records: 'Core report + photos'
      },
      {
        sn: '3.4', title: 'Surface Regularity (straightedge)',
        ref: 'QCS 2024 Cl. 5.7.2',
        acceptance: 'Wearing course: max 4mm under 3m. Base course: max 8mm under 3m.',
        testMethod: '3m straightedge or rolling straightedge',
        frequency: 'Continuous during laying + systematic at completion', owner: 'QCI',
        lab: '-', qc: 'S', sc: 'R', records: 'Survey record'
      },
      {
        sn: '3.5', title: 'Layer Thickness',
        ref: 'QCS 2024 Cl. 5.7.1 & Design Drawing',
        acceptance: 'Within ±5mm of design thickness',
        testMethod: 'Core measurement or depth gauge during paving',
        frequency: '1 per 2000m² (from cores)', owner: 'QCI/Lab',
        lab: 'H', qc: 'W', sc: 'R', records: 'Core report'
      },
      {
        sn: '3.6', title: 'Surface Levels',
        ref: 'QCS 2024 Cl. 5.7.3 & Design Drawing',
        acceptance: 'Wearing: ±6mm. Base: ±10mm. Cross-fall ±0.3%.',
        testMethod: 'Digital level survey on 10m × 5m grid',
        frequency: 'After each layer completion', owner: 'SUR',
        lab: '-', qc: 'W', sc: 'W', records: 'Level survey report'
      },
    ]
  },

  subbase: {
    title: 'Inspection and Test Plan — Sub-base & Road Base',
    itpNo: 'ITP-[PROJECT]-SUBBASE-001',
    qcsRef: 'QCS 2024 Section 6 Part 4',
    activities: [
      { sn: '1.0', type: 'header', title: 'Pre-Construction Documents' },
      {
        sn: '1.1', title: 'Material Source Approval (Quarry)', ref: 'QCS 2024 Cl. 6.4.2',
        acceptance: 'Quarry approved, CBR ≥ 80% (subbase) / ≥120% (base)',
        testMethod: 'Review + Site Visit', frequency: 'Before commencement', owner: 'QC/Lab',
        lab: 'H', qc: 'H', sc: 'H', records: 'MAR + Quarry certificate'
      },
      { sn: '2.0', type: 'header', title: 'Material Testing' },
      {
        sn: '2.1', title: 'Grading (Particle Size Distribution)', ref: 'QCS 2024 Table 6.1',
        acceptance: 'Within QCS 2024 Table 6.1 grading envelope',
        testMethod: 'ASTM C136', frequency: 'Every 500m³', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + Lab report'
      },
      {
        sn: '2.2', title: 'Plasticity Index (PI)', ref: 'QCS 2024 Cl. 6.4.2',
        acceptance: 'PI ≤ 6 (subbase) / PI ≤ 4 (base)',
        testMethod: 'ASTM D4318', frequency: 'Every 500m³', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'R', records: 'Lab report'
      },
      {
        sn: '2.3', title: 'CBR (California Bearing Ratio)', ref: 'QCS 2024 Table 6.2',
        acceptance: 'CBR ≥ 80% @ 98% MDD (subbase) / ≥120% (base)',
        testMethod: 'ASTM D1883 (soaked)', frequency: 'Per material source change + every 3000m³', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'W', records: 'IR + CBR report'
      },
      {
        sn: '2.4', title: 'Compaction (OMC & MDD)', ref: 'QCS 2024 Cl. 6.4.4',
        acceptance: 'Establish OMC & MDD for moisture-density control',
        testMethod: 'ASTM D1557 (Modified Proctor)', frequency: 'Each material source', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'R', records: 'Proctor curve'
      },
      { sn: '3.0', type: 'header', title: 'During Construction' },
      {
        sn: '3.1', title: 'In-situ Compaction', ref: 'QCS 2024 Cl. 6.4.4 — min. 98% MDD',
        acceptance: '≥ 98% Modified Proctor Density at optimum moisture',
        testMethod: 'Nuclear density gauge or sand replacement (ASTM D1556)',
        frequency: '1 test per 500m² per layer', owner: 'QCI',
        lab: 'H', qc: 'W', sc: 'R', records: 'Density record + IR'
      },
      {
        sn: '3.2', title: 'Layer Thickness', ref: 'QCS 2024 & Design',
        acceptance: '≥ design thickness, max. 200mm per compacted layer',
        testMethod: 'Hole + ruler or level difference',
        frequency: '1 per 500m²', owner: 'QCI',
        lab: '-', qc: 'W', sc: 'R', records: 'Survey record'
      },
      {
        sn: '3.3', title: 'Surface Levels & Regularity', ref: 'QCS 2024 Cl. 6.4.5',
        acceptance: 'Level ±10mm (subbase) ±8mm (base). 3m straight edge: ≤12mm (subbase) ≤8mm (base)',
        testMethod: 'Digital level survey + 3m straight edge',
        frequency: 'At completion of each layer', owner: 'SUR',
        lab: '-', qc: 'W', sc: 'W', records: 'Level report'
      },
    ]
  },

  earthworks: {
    title: 'Inspection and Test Plan — Earthworks',
    itpNo: 'ITP-[PROJECT]-EARTH-001',
    qcsRef: 'QCS 2024 Section 4',
    activities: [
      { sn: '1.0', type: 'header', title: 'Subgrade Preparation' },
      {
        sn: '1.1', title: 'Proof Rolling Acceptance', ref: 'QCS 2024 Cl. 4.5.3',
        acceptance: 'No ruts > 25mm, no pumping or yielding under loaded truck (min. 10t rear axle)',
        testMethod: 'Proof rolling — visual observation + rut depth measurement',
        frequency: '100% of formation (each section)', owner: 'QCI',
        lab: '-', qc: 'H', sc: 'H', records: 'Proof rolling record + photos'
      },
      {
        sn: '1.2', title: 'Subgrade CBR', ref: 'QCS 2024 Table 4.1',
        acceptance: 'Min. CBR 6% (in-situ at 95% MDD)',
        testMethod: 'In-situ DCP or lab CBR (ASTM D1883)',
        frequency: '1 per 2500m²', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'W', records: 'CBR report'
      },
      { sn: '2.0', type: 'header', title: 'Fill Material & Compaction' },
      {
        sn: '2.1', title: 'Fill Material Approval', ref: 'QCS 2024 Cl. 4.4.1',
        acceptance: 'No organics, no rocks > 150mm, PI ≤ 12, no contamination',
        testMethod: 'Visual + lab screening (Atterberg, sieve, organic content)',
        frequency: 'Each borrow source + any change', owner: 'QC/Lab',
        lab: 'H', qc: 'H', sc: 'H', records: 'Material approval + lab report'
      },
      {
        sn: '2.2', title: 'Compaction (In-situ)', ref: 'QCS 2024 Cl. 4.4.2 Table 4.2',
        acceptance: '≥ 95% Modified Proctor (general fill) / ≥ 98% within 500mm of formation',
        testMethod: 'Nuclear density gauge (ASTM D6938) or sand replacement (ASTM D1556)',
        frequency: '1 per 500m² per 250mm compacted lift', owner: 'QCI',
        lab: 'H', qc: 'W', sc: 'R', records: 'Density record + IR'
      },
    ]
  },

  drainage: {
    title: 'Inspection and Test Plan — Drainage Works',
    itpNo: 'ITP-[PROJECT]-DRAIN-001',
    qcsRef: 'QCS 2024 Section 8',
    activities: [
      { sn: '1.0', type: 'header', title: 'Pre-Construction' },
      {
        sn: '1.1', title: 'Pipe Material Approval', ref: 'QCS 2024 Cl. 8.2',
        acceptance: 'BS EN 1401 (uPVC) / BS EN 295 (VC) — approved sample + test certificates',
        testMethod: 'Review of COC + sample testing', frequency: 'Each pipe supply', owner: 'QC/Lab',
        lab: 'H', qc: 'H', sc: 'R', records: 'MAR + test cert'
      },
      { sn: '2.0', type: 'header', title: 'Installation Checks' },
      {
        sn: '2.1', title: 'Pipe Gradient', ref: 'QCS 2024 Cl. 8.3.3 & Design',
        acceptance: 'Min. 1:500 (foul), min. 1:200 (storm) — actual ± 5mm from design',
        testMethod: 'Laser level check during laying',
        frequency: 'Every 25m + each manhole', owner: 'QCI',
        lab: '-', qc: 'W', sc: 'R', records: 'Survey record'
      },
      {
        sn: '2.2', title: 'Pipe Alignment', ref: 'QCS 2024 Cl. 8.3.5',
        acceptance: '± 25mm horizontal, ± 10mm vertical from design',
        testMethod: 'Survey', frequency: 'Every 25m', owner: 'SUR',
        lab: '-', qc: 'W', sc: 'R', records: 'As-built survey'
      },
      { sn: '3.0', type: 'header', title: 'Testing' },
      {
        sn: '3.1', title: 'CCTV Inspection', ref: 'Ashghal Drainage Standards',
        acceptance: 'No cracks, no deformation > 5%, proper jointing, no infiltration/exfiltration',
        testMethod: 'CCTV camera survey per pipe run',
        frequency: '100% of installed pipework', owner: 'PROC',
        lab: '-', qc: 'H', sc: 'H', records: 'CCTV report + video'
      },
      {
        sn: '3.2', title: 'Air Test (tightness)', ref: 'QCS 2024 Cl. 8.5 / BS EN 1610',
        acceptance: 'Max. air pressure drop 0.5kPa after 5min at 10kPa',
        testMethod: 'Air pressure test', frequency: 'Each pipe run between manholes', owner: 'QCI',
        lab: '-', qc: 'H', sc: 'H', records: 'Test record + IR'
      },
    ]
  },

  concrete: {
    title: 'Inspection and Test Plan — Concrete Works',
    itpNo: 'ITP-[PROJECT]-CONC-001',
    qcsRef: 'QCS 2024 Section 5',
    activities: [
      { sn: '1.0', type: 'header', title: 'Pre-Pour Checks' },
      {
        sn: '1.1', title: 'Formwork Inspection', ref: 'QCS 2024 Cl. 5.4.1',
        acceptance: 'Level ±3mm, plumb ±3mm per 3m, clean, release agent applied, no gaps',
        testMethod: 'Physical inspection + level check', frequency: 'Each pour', owner: 'QCI',
        lab: '-', qc: 'H', sc: 'H', records: 'IR + pre-pour checklist'
      },
      {
        sn: '1.2', title: 'Reinforcement Inspection', ref: 'QCS 2024 Cl. 5.4.2 & IFC Drawing',
        acceptance: 'Cover ±5mm, bar spacing ±20mm, all laps & ties as drawing',
        testMethod: 'Physical inspection + cover meter', frequency: 'Each pour', owner: 'QCI',
        lab: '-', qc: 'H', sc: 'H', records: 'IR + rebar checklist'
      },
      { sn: '2.0', type: 'header', title: 'Fresh Concrete' },
      {
        sn: '2.1', title: 'Slump / Workability', ref: 'QCS 2024 Cl. 5.3.4 & Approved Mix Design',
        acceptance: 'Within ±25mm of design slump (or as approved mix design)',
        testMethod: 'ASTM C143 (Slump test)', frequency: 'Every delivery truck', owner: 'QCI',
        lab: 'H', qc: 'W', sc: 'R', records: 'Delivery ticket + slump record'
      },
      {
        sn: '2.2', title: 'Temperature (fresh concrete)', ref: 'QCS 2024 Cl. 5.3.5',
        acceptance: '≤ 32°C on delivery (summer); ≥ 10°C (cold weather — unlikely Qatar)',
        testMethod: 'Calibrated thermometer', frequency: 'Every delivery', owner: 'QCI',
        lab: '-', qc: 'S', sc: 'R', records: 'Temperature log'
      },
      {
        sn: '2.3', title: 'Cube/Cylinder Samples', ref: 'QCS 2024 Cl. 5.6.1',
        acceptance: '28-day compressive strength ≥ specified fc (e.g. C30: ≥ 30 MPa)',
        testMethod: 'ASTM C39 / BS EN 12390-3',
        frequency: '3 cubes per 50m³ (min. 3 per day per mix)', owner: 'QC/Lab',
        lab: 'H', qc: 'W', sc: 'R', records: 'Cube test report'
      },
    ]
  }
};

// ============================================================
// MAIN HANDLER — المعالج الرئيسي
// ============================================================

export default async function handler(req, res) {
  // ── CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── RATE LIMITING
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const authHeader = req.headers.authorization;
  const tier = await getUserTier(authHeader); // 'free' | 'pro' | 'enterprise'

  const limits = { free: 3, pro: 20, enterprise: 60 };
  const allowed = await rateLimiter(ip, 'mos-generator', limits[tier]);
  if (!allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: tier === 'free'
        ? 'وصلت للحد الأقصى للطلبات. ترقَّ إلى Pro للحصول على 20 طلباً في الدقيقة'
        : 'Rate limit exceeded. Please try again in 1 minute.',
      retryAfter: 60
    });
  }

  // ── PARSE REQUEST
  const { type, projectInfo, phase, executionMethod, language } = req.body;

  // Input validation — تحقق من المدخلات
  if (!type || !['mos', 'itp', 'both'].includes(type)) {
    return res.status(400).json({ error: 'type must be: mos | itp | both' });
  }
  if (!phase || !MOS_TEMPLATES[phase]) {
    return res.status(400).json({
      error: `Phase not found. Available: ${Object.keys(MOS_TEMPLATES).join(', ')}`
    });
  }

  // Sanitize project info — تنظيف المدخلات
  const safe = (s) => String(s || '').replace(/<[^>]*>/g, '').slice(0, 200);
  const safeProject = {
    name: safe(projectInfo?.name),
    contractNo: safe(projectInfo?.contractNo),
    client: safe(projectInfo?.client),
    consultant: safe(projectInfo?.consultant),
    contractor: safe(projectInfo?.contractor),
    date: safe(projectInfo?.date),
  };

  const result = {};

  if (type === 'mos' || type === 'both') {
    result.mos = buildMOS(phase, safeProject, executionMethod, language);
  }
  if (type === 'itp' || type === 'both') {
    result.itp = buildITP(phase, safeProject, language);
  }

  // Log usage (للإحصاء — بدون بيانات شخصية)
  console.log(JSON.stringify({
    event: 'mos_itp_generated',
    phase,
    type,
    tier,
    ts: new Date().toISOString()
  }));

  return res.status(200).json({
    success: true,
    data: result,
    meta: {
      phase,
      qcsRef: MOS_TEMPLATES[phase]?.qcsRef,
      generatedAt: new Date().toISOString(),
      disclaimer: 'هذا القالب للمساعدة فقط — يجب مراجعة المهندس المختص والتحقق من QCS 2024'
    }
  });
}

// ============================================================
// BUILDERS
// ============================================================

function buildMOS(phase, projectInfo, executionMethod, language = 'ar') {
  const template = MOS_TEMPLATES[phase];
  if (!template) return null;

  // إضافة طريقة التنفيذ للـ methodology
  const methodology = { ...template.sections.methodology };
  if (executionMethod === 'manual' && phase === 'asphalt') {
    methodology.note = 'Manual laying only in restricted/inaccessible areas — min. 1m straight edge required. QCS 2024 Cl. 5.5.2(c)';
  }

  return {
    documentTitle: language === 'ar' ? template.titleAr : template.titleEn,
    documentNo: `[PROJECT_CODE]-CS-[CONTRACTOR_ABBR]-MT-[XXXXX]`,
    projectName: projectInfo.name,
    contractNo: projectInfo.contractNo,
    client: projectInfo.client,
    consultant: projectInfo.consultant || 'To be assigned',
    contractor: projectInfo.contractor,
    date: projectInfo.date || new Date().toLocaleDateString('en-GB'),
    qcsRef: template.qcsRef,
    sections: {
      scope: template.sections.scope,
      plant: template.sections.plant || [],
      materials: template.sections.materials || [],
      methodology: methodology,
      hse: template.sections.hse || null,
      references: template.sections.references || [],
    },
    revisionHistory: [
      { rev: 'A', date: projectInfo.date || new Date().toLocaleDateString('en-GB'), description: 'First issue for approval' }
    ]
  };
}

function buildITP(phase, projectInfo, language = 'ar') {
  const template = ITP_TEMPLATES[phase];
  if (!template) {
    // Fallback — return generic ITP structure if specific template not found
    return {
      documentTitle: `Inspection and Test Plan — ${phase}`,
      note: `Detailed ITP for ${phase} — use QCS 2024 relevant section as reference`,
      activities: []
    };
  }

  // Replace [PROJECT] placeholder
  const itpNo = template.itpNo.replace('[PROJECT]', (projectInfo.contractNo || 'PROJ').replace(/\//g, '-'));

  return {
    documentTitle: template.title,
    documentNo: itpNo,
    projectName: projectInfo.name,
    contractNo: projectInfo.contractNo,
    client: projectInfo.client,
    consultant: projectInfo.consultant || 'To be assigned',
    contractor: projectInfo.contractor,
    qcsRef: template.qcsRef,
    legend: {
      H: 'Hold Point — لا تكمل بدون موافقة المشرف',
      W: 'Witness Point — يُحضر القسم المعني',
      S: 'Surveillance — مراقبة عشوائية',
      R: 'Review — مراجعة السجلات',
      '-': 'Not applicable'
    },
    activities: template.activities,
    disclaimer: 'هذا الجدول مبني على QCS 2024 — يجب مراجعة الاشتراطات المحددة للمشروع مع المستشار',
  };
}

// ============================================================
// HELPERS
// ============================================================

async function getUserTier(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return 'free';
  try {
    const token = authHeader.split(' ')[1];
    // TODO: verify token from Supabase session
    // الآن نرجع 'free' كـ fallback آمن
    return 'free';
  } catch {
    return 'free';
  }
}
