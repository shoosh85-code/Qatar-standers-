/* === js/bilingual-fix.js === */
/**
 * QatarSpec Pro — Bilingual Content Enforcement v2.0
 * يفحص كل الكروت ويصلح التضارب اللغوي تلقائياً
 * القاعدة: AR = عربي 100% | EN = إنجليزي 100%
 * المصطلحات الهندسية في AR: عربي + (إنجليزي بين قوسين)
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  // ═══════════════════════════════════════════════════════════
  // قاعدة بيانات المحتوى — كل قسم بلغتين
  // ═══════════════════════════════════════════════════════════
  var contentDB = {

    // ── الطرق ──────────────────────────────────────────────
    roads: {
      ar: {
        title: 'أعمال الطرق — QCS 2024 §S8',
        summary: 'مواصفات تنفيذ الطرق في قطر: طبقات الرصف، نسب الدمك، درجات الحرارة، واختبارات الجودة.',
        definitions: {
          'طبقة التربة الطبيعية (Subgrade)':
            'الطبقة الطبيعية أو المعبأة أسفل هيكل الرصف — CBR ≥ 8% — دمك ≥ 95% Modified Proctor — QCS 2024 §S8-P2-Cl.2.3',
          'طبقة ما تحت الأساس (Subbase)':
            'طبقة حبيبية غير مربوطة لتوزيع الأحمال — CBR ≥ 30% — دمك ≥ 95% Modified Proctor — QCS 2024 §S8-P3-Cl.3.2',
          'طبقة الأساس (Road Base)':
            'طبقة حبيبية عالية الجودة — CBR ≥ 80% — دمك ≥ 98% Modified Proctor — QCS 2024 §S8-P3-Cl.3.3',
          'طبقة الربط (DBM)':
            'خلطة إسفلتية كثيفة الحبيبات — درجة فرد ≥ 140°C — دمك ≥ 96% Gmm — QCS 2024 §S8-P4-Cl.4.5',
          'الطبقة السطحية (Wearing Course)':
            'الطبقة النهائية للرصيف — درجة فرد ≥ 145°C — دمك ≥ 98% Gmm — PMB إلزامي — QCS 2024 §S8-P4-Cl.4.6',
          'طلاء التمهيد (Prime Coat)':
            'طلاء البيتومين على طبقة الأساس — MC-30 أو MC-70 — يُمنع فرش الإسفلت بدونه — QCS 2024 §S8-P4-Cl.4.2',
          'طلاء اللصق (Tack Coat)':
            'طلاء بيتوميني بين طبقتي إسفلت — CSS-1 أو SS-1K — QCS 2024 §S8-P4-Cl.4.3',
          'علامات الطرق (Road Marking)':
            'دهانات عاكسة — Thermoplastic أو Cold Plastic — Reflectivity ≥ 200 mcd/m²/lux — QCS 2024 §S8-P5-Cl.5.2'
        }
      },
      en: {
        title: 'Road Works — QCS 2024 §S8',
        summary: 'Road construction specifications in Qatar: pavement layers, compaction ratios, temperatures, and QA tests.',
        definitions: {
          'Subgrade':
            'Natural or compacted layer beneath pavement — CBR ≥ 8% — Compaction ≥ 95% Modified Proctor — QCS 2024 §S8-P2-Cl.2.3',
          'Subbase':
            'Unbound granular layer for load distribution — CBR ≥ 30% — Compaction ≥ 95% Modified Proctor — QCS 2024 §S8-P3-Cl.3.2',
          'Road Base':
            'High-quality granular layer — CBR ≥ 80% — Compaction ≥ 98% Modified Proctor — QCS 2024 §S8-P3-Cl.3.3',
          'DBM (Binder Course)':
            'Dense bituminous macadam — Laying temp ≥ 140°C — Compaction ≥ 96% Gmm — QCS 2024 §S8-P4-Cl.4.5',
          'Wearing Course':
            'Final pavement layer — Laying temp ≥ 145°C — Compaction ≥ 98% Gmm — PMB mandatory — QCS 2024 §S8-P4-Cl.4.6',
          'Prime Coat':
            'Diluted bitumen on Road Base — MC-30 or MC-70 — Asphalt laying prohibited without it — QCS 2024 §S8-P4-Cl.4.2',
          'Tack Coat':
            'Light bitumen spray between layers — CSS-1 or SS-1K — QCS 2024 §S8-P4-Cl.4.3',
          'Road Marking':
            'Reflective paints — Thermoplastic or Cold Plastic — Reflectivity ≥ 200 mcd/m²/lux — QCS 2024 §S8-P5-Cl.5.2'
        }
      }
    },

    // ── المرافق ─────────────────────────────────────────────
    utilities: {
      ar: {
        title: 'شبكات المرافق — QCS 2024 §S20',
        summary: 'مواصفات شبكات المياه والصرف الصحي وتصريف الأمطار والـ TSE في قطر.',
        definitions: {
          'خطوط المياه الصالحة (Water Potable)':
            'HDPE PN16 أو حديد زهر DI Class K9 — اختبار ضغط 1.5×PN/ساعتين — تعقيم ≥ 50 ppm — KAHRAMAA 2024 §W3',
          'شبكة الصرف الصحي (Foul Sewer)':
            'uPVC SN8 أو GRP — فحص CCTV بعد التركيب — اختبار تسرب Air/Water — QCS 2024 §S20-P3-Cl.3.4',
          'شبكة تصريف الأمطار (Storm Drainage)':
            'RCP Class III أو HDPE — ميل ≥ 0.5% — Ashghal RDM 2023 §SD-2',
          'خطوط المياه المعالجة (TSE)':
            'HDPE PN10 لون بنفسجي — منفصلة عن المياه الصالحة — QCS 2024 §S20-P4-Cl.4.1',
          'المنهولات (Manholes)':
            'خرسانة مسبقة الصنع Ø1000-1500mm — غطاء حديدي D400 BS EN 124 — QCS 2024 §S20-P3-Cl.3.6',
          'غرف التفتيش (Inspection Chambers)':
            'uPVC Ø450mm للأعماق ≤1.5م — خرسانة مسبقة للأعماق >1.5م — غطاء C250 — QCS 2024 §S20-P3-Cl.3.8'
        }
      },
      en: {
        title: 'Utility Networks — QCS 2024 §S20',
        summary: 'Water, foul sewer, storm drainage, and TSE network specifications in Qatar.',
        definitions: {
          'Water (Potable)':
            'HDPE PN16 or DI Class K9 — Test at 1.5×PN for 2hr — Disinfection ≥ 50 ppm — KAHRAMAA 2024 §W3',
          'Foul Sewer':
            'uPVC SN8 or GRP — CCTV after installation — Air/Water leakage test — QCS 2024 §S20-P3-Cl.3.4',
          'Storm Drainage':
            'RCP Class III or HDPE — Gradient ≥ 0.5% — Ashghal RDM 2023 §SD-2',
          'TSE (Treated Sewage Effluent)':
            'HDPE PN10 purple colour — Segregated from potable water — QCS 2024 §S20-P4-Cl.4.1',
          'Manholes':
            'Precast concrete Ø1000-1500mm — D400 iron cover BS EN 124 — QCS 2024 §S20-P3-Cl.3.6',
          'Inspection Chambers':
            'uPVC Ø450mm for depths ≤1.5m — Precast for >1.5m — C250 cover — QCS 2024 §S20-P3-Cl.3.8'
        }
      }
    },

    // ── الإنشاء ─────────────────────────────────────────────
    structural: {
      ar: {
        title: 'الكود الإنشائي — QCS 2024 §S5',
        summary: 'مواصفات الخرسانة المسلحة: درجات الخرسانة، الغطاء، المعالجة، الاختبارات، ومعايير BS EN 1992.',
        definitions: {
          'درجات الخرسانة (Concrete Grades)':
            'C25 للأعمال العامة — C32 للأعمدة — C40 للجسور — C50+ للمسبق الإجهاد — QCS 2024 §S5-P4-Cl.4.2',
          'الغطاء الخرساني (Concrete Cover)':
            'بلاطة 25مم — عمود/كمرة 30مم — أساس 50مم — بيئة بحرية XS 50مم — QCS 2024 §S5-P4-Cl.4.7',
          'المعالجة (Curing)':
            '7 أيام للخرسانة العادية — 10 أيام مع GGBS/PFA — Burlap مبلل + بوليثين — الطقس الحار: ماء بارد + ثلج ≤10% — QCS 2024 §S5-P4-Cl.4.12',
          'وصلات التسليح (Lap Splice)':
            'شد: max(40φ, 300مم) — ضغط: max(30φ, 200مم) — QCS 2024 §S5-P5-Cl.5.4',
          'اختبار الهبوط (Slump Test)':
            'عادي 75-125مم — مضخة 100-150مم — يُرفض إذا تجاوز الحد — QCS 2024 §S5-P4-Cl.4.4',
          'اختبار المكعبات (Cube Test)':
            'عينة كل 50م³ أو يومياً — 3 مكعبات (7d/28d) — قبول عند fcu ≥ الدرجة — QCS 2024 §S5-P4-Cl.4.5'
        }
      },
      en: {
        title: 'Structural Code — QCS 2024 §S5',
        summary: 'Reinforced concrete specs: grades, cover, curing, tests, and BS EN 1992 standards.',
        definitions: {
          'Concrete Grades':
            'C25 general — C32 columns — C40 beams — C50+ prestressed — QCS 2024 §S5-P4-Cl.4.2',
          'Concrete Cover':
            'Slab 25mm — Beam/Column 30mm — Foundation 50mm — XS exposure 50mm — QCS 2024 §S5-P4-Cl.4.7',
          'Curing':
            'Min 7 days normal — 10 days with GGBS/PFA — Wet burlap + polythene — Hot weather: cold water + ice ≤10% — QCS 2024 §S5-P4-Cl.4.12',
          'Lap Splice':
            'Tension: max(40φ, 300mm) — Compression: max(30φ, 200mm) — QCS 2024 §S5-P5-Cl.5.4',
          'Slump Test':
            'Normal 75-125mm — Pumped 100-150mm — Reject if exceeded — QCS 2024 §S5-P4-Cl.4.4',
          'Cube Test':
            'Sample every 50m³ or daily — 3 cubes (7d/28d) — Pass when fcu ≥ grade — QCS 2024 §S5-P4-Cl.4.5'
        }
      }
    },

    // ── الجسات ──────────────────────────────────────────────
    geotechnical: {
      ar: {
        title: 'الجسات والتربة — QCS 2024 §S3',
        summary: 'مواصفات الجسات: حفر الآبار، اختبار SPT، عينات التربة، وتحليل المختبر.',
        definitions: {
          'حفر الجسات (Borehole Drilling)':
            'عمق ≥ 50م — Core recovery ≥ 85% — RQD log إلزامي — BS EN ISO 22476',
          'اختبار الاختراق القياسي (SPT)':
            'مطرقة 63.5 كجم / سقوط 760مم — Auto-trip مُفضَّل — كل 1.5م — ASTM D1586',
          'عينات أنبوب شيلبي (Shelby Tube)':
            'عينات undisturbed — Ø75mm thin-wall — مُختومة بالشمع — مختبر خلال 48 ساعة — ASTM D1587',
          'اختبار الاختراق الديناميكي (DCP)':
            'تقدير CBR ميداني — CBR = 292/DCP^1.12 — كل 500م² — ASTM D6951'
        }
      },
      en: {
        title: 'Geotechnical Investigation — QCS 2024 §S3',
        summary: 'Borehole drilling, SPT testing, soil sampling, and lab analysis in Qatar.',
        definitions: {
          'Borehole Drilling':
            'Depth ≥ 50m — Core recovery ≥ 85% — RQD log mandatory — BS EN ISO 22476',
          'SPT (Standard Penetration Test)':
            '63.5 kg hammer / 760mm drop — Auto-trip preferred — Every 1.5m — ASTM D1586',
          'Shelby Tube':
            'Undisturbed samples — Ø75mm thin-wall — Sealed + waxed — Lab within 48hr — ASTM D1587',
          'DCP (Dynamic Cone Penetrometer)':
            'In-situ CBR estimation — CBR = 292/DCP^1.12 — Every 500m² — ASTM D6951'
        }
      }
    },

    // ── المباني ─────────────────────────────────────────────
    buildings: {
      ar: {
        title: 'المباني والأبراج — QCS 2024 §S5 + MMUP',
        summary: 'مواصفات تنفيذ المباني والأبراج في قطر: الأنظمة الإنشائية، MEP، الحماية من الحريق.',
        definitions: {
          'النظام الإنشائي (Structural System)':
            'Core + Outrigger للأبراج فوق 20 طابق — QCS 2024 §S5-P6',
          'ضخ الخرسانة (Concrete Pumping)':
            'Boom 52م+ — Slump 150-180مم — QCS 2024 §S5-P4',
          'الحماية من الحريق (Fire Safety)':
            'Sprinkler NFPA 13 — Fire Alarm NFPA 72 — موافقة QCDD — QCS 2024 §S21-P5',
          'المصاعد (Elevators)':
            'سرعة 1.0-2.5 م/ث — سعة 630-1600 كجم — BS EN 81 — QCS 2024 §S21-P6',
          'الواجهات (Facade)':
            'Curtain Wall أو Unitized System — حمل الرياح 1.4 كN/m² — QCS 2024 §S5-P9'
        }
      },
      en: {
        title: 'Buildings & Towers — QCS 2024 §S5 + MMUP',
        summary: 'Building and high-rise tower specifications in Qatar: structural systems, MEP, fire protection.',
        definitions: {
          'Structural System':
            'Core + Outrigger for towers above 20 floors — QCS 2024 §S5-P6',
          'Concrete Pumping':
            'Boom 52m+ — Slump 150-180mm — QCS 2024 §S5-P4',
          'Fire Safety':
            'Sprinkler NFPA 13 — Fire Alarm NFPA 72 — QCDD approval — QCS 2024 §S21-P5',
          'Elevators':
            'Speed 1.0-2.5 m/s — Capacity 630-1600 kg — BS EN 81 — QCS 2024 §S21-P6',
          'Facade':
            'Curtain Wall or Unitized System — Wind load 1.4 kN/m² — QCS 2024 §S5-P9'
        }
      }
    },

    // ── المعدات ─────────────────────────────────────────────
    equipment: {
      ar: {
        title: 'معدات المشاريع — QCS 2024',
        summary: 'مواصفات معدات مشاريع البناء والطرق في قطر.',
        definitions: {
          'الجريدر (Motor Grader)':
            'تسوية Subgrade/Subbase — Blade 3.7-4.3م — مستوى ±10مم — QCS 2024 §S8-P2',
          'الرولر الاهتزازي (Vibratory Roller)':
            'دمك الطبقات الحبيبية — 10-12 طن — ≥ 95% MDD للـ Subgrade — QCS 2024 §S8-P3',
          'فارش الإسفلت (Asphalt Paver)':
            'فرد الإسفلت — سرعة 3-5 م/د — سُمك design ±6مم — QCS 2024 §S8-P4',
          'جهاز الكثافة النووي (NDG)':
            'قياس الكثافة ميدانياً — معايرة كل 6 أشهر — Standard Count يومي — ASTM D2950',
          'مضخة الخرسانة (Concrete Pump)':
            'Boom 36-52م — Slump 100-150مم للضخ — QCS 2024 §S5-P4'
        }
      },
      en: {
        title: 'Project Equipment — QCS 2024',
        summary: 'Equipment specifications for construction and road projects in Qatar.',
        definitions: {
          'Motor Grader':
            'Subgrade/Subbase trimming — Blade 3.7-4.3m — Level ±10mm — QCS 2024 §S8-P2',
          'Vibratory Roller':
            'Granular layer compaction — 10-12 tonnes — ≥ 95% MDD Subgrade — QCS 2024 §S8-P3',
          'Asphalt Paver':
            'Asphalt laying — Speed 3-5 m/min — Thickness ±6mm — QCS 2024 §S8-P4',
          'Nuclear Density Gauge (NDG)':
            'In-situ density — Calibrate every 6 months — Daily Standard Count — ASTM D2950',
          'Concrete Pump':
            'Boom 36-52m — Slump 100-150mm for pumping — QCS 2024 §S5-P4'
        }
      }
    },

    // ── MEP ─────────────────────────────────────────────────
    mep: {
      ar: {
        title: 'معايير MEP — قطر 2024',
        summary: 'أنظمة ميكانيكية وكهربائية وسباكة في قطر: KAHRAMAA 2024، QCS 2024 §S21، NFPA.',
        definitions: {
          'الكهرباء المنخفضة (LV Electricity)':
            '415/240V 50Hz — IP44 داخلي / IP55 خارجي — RCD ≤ 30mA — KAHRAMAA 2024 §E-4',
          'السباكة الداخلية (Plumbing)':
            'HDPE PN16 أو PPR PN20 — WRAS approved — ضغط تشغيل ≤ 10 بار — QCS 2024 §S21-P2',
          'الإطفاء (Fire Fighting)':
            'Sprinkler NFPA 13 — Fire Alarm NFPA 72 — اعتماد QCDD — QCS 2024 §S21-P5',
          'الصرف الداخلي (Internal Drainage)':
            'uPVC أو Cast Iron — ميل ≥ 1:40 — Rodding Access كل 12م — QCS 2024 §S21-P3'
        }
      },
      en: {
        title: 'MEP Standards Qatar 2024',
        summary: 'Mechanical, electrical, and plumbing systems in Qatar: KAHRAMAA 2024, QCS 2024 §S21, NFPA.',
        definitions: {
          'LV Electricity':
            '415/240V 50Hz — IP44 internal / IP55 external — RCD ≤ 30mA — KAHRAMAA 2024 §E-4',
          'Plumbing':
            'HDPE PN16 or PPR PN20 — WRAS approved — Operating pressure ≤ 10 bar — QCS 2024 §S21-P2',
          'Fire Fighting':
            'Sprinkler NFPA 13 — Fire Alarm NFPA 72 — QCDD approved — QCS 2024 §S21-P5',
          'Internal Drainage':
            'uPVC or Cast Iron — Gradient ≥ 1:40 — Rodding Access every 12m — QCS 2024 §S21-P3'
        }
      }
    }
  };

  // ═══════════════════════════════════════════════════════════
  // الدوال الرئيسية
  // ═══════════════════════════════════════════════════════════
  window.QS.bilingual = {

    contentDB: contentDB,

    // تطبيق محتوى قسم محدد على كرت
    fixCardContent: function(cardElement, sectionKey) {
      var lang = document.documentElement.lang || 'ar';
      var data = contentDB[sectionKey];
      if (!data) return;

      // استخدام محتوى اللغة الصحيحة فقط
      var content = data[lang] || data.ar;

      // تحديث العنوان
      var titleEl = cardElement.querySelector('.cat-name, h3');
      if (titleEl && content.title) {
        titleEl.textContent = content.title;
        titleEl.setAttribute('data-' + lang, content.title);
      }

      // إضافة الملخص إذا لم يكن موجوداً
      if (content.summary) {
        var summaryEl = cardElement.querySelector('.card-summary');
        if (!summaryEl) {
          summaryEl = document.createElement('div');
          summaryEl.className = 'card-summary';
          var descEl = cardElement.querySelector('.cat-desc, .card-bullets');
          if (descEl) descEl.parentNode.insertBefore(summaryEl, descEl);
        }
        summaryEl.innerHTML =
          '<p style="font-size:12px;color:var(--text2);line-height:1.7;margin-bottom:10px;' +
          'padding:8px 12px;background:rgba(201,168,76,0.05);border-' +
          (lang === 'ar' ? 'right' : 'left') + ':3px solid var(--gold);border-radius:0 8px 8px 0;">' +
          content.summary + '</p>';
      }

      // تحديث نقاط التعريف — نفس لغة الواجهة
      var bullets = cardElement.querySelectorAll('.card-bullets span, .cat-desc span');
      var defKeys = Object.keys(content.definitions);

      bullets.forEach(function(bullet, index) {
        if (defKeys[index]) {
          var key = defKeys[index];
          var def = content.definitions[key];
          bullet.innerHTML = '📌 <strong>' + key + ':</strong> ' + def;
          bullet.setAttribute('data-' + lang, bullet.innerHTML);
          bullet.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
          bullet.style.textAlign = lang === 'ar' ? 'right' : 'left';
          bullet.style.fontFamily = lang === 'ar'
            ? "'Tajawal', 'Cairo', sans-serif"
            : "'Segoe UI', sans-serif";
        }
      });
    },

    // فحص وإصلاح كل الكروت عبر data-ar / data-en
    enforce: function() {
      var lang = document.documentElement.lang || 'ar';
      var cards = document.querySelectorAll('.cat-card');

      cards.forEach(function(card) {
        // الاسم
        var nameEl = card.querySelector('.cat-name');
        if (nameEl) {
          var val = nameEl.getAttribute('data-' + lang);
          if (val) nameEl.textContent = val;
        }

        // البادج
        var badgeEl = card.querySelector('.cat-badge');
        if (badgeEl) {
          var bval = badgeEl.getAttribute('data-' + lang);
          if (bval) badgeEl.textContent = bval;
        }

        // النقاط
        var bullets = card.querySelectorAll('.card-bullets span, .cat-desc span');
        bullets.forEach(function(span) {
          var sval = span.getAttribute('data-' + lang);
          if (sval) {
            span.innerHTML = sval;
            span.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
            span.style.textAlign = lang === 'ar' ? 'right' : 'left';
          }
        });

        // العداد
        var countEl = card.querySelector('.cat-count');
        if (countEl) {
          var cval = countEl.getAttribute('data-' + lang);
          if (cval) countEl.textContent = cval;
        }
      });

      console.log('[QS-Bilingual] Enforced lang=' + lang + ' on ' + cards.length + ' cards');
    },

    // يُستدعى عند تبديل اللغة
    onLanguageChange: function(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.enforce();
    }
  };

  // تشغيل تلقائي عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', function() {
    window.QS.bilingual.enforce();
  });

  // مراقبة تغيير اللغة على html element
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'lang') {
        window.QS.bilingual.enforce();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  console.log('[QS-Bilingual] v2.0 initialized — AR=عربي | EN=English');
})();

/* === js/bilingual-radical-fix.js === */
/**
 * QatarSpec Pro — Bilingual Radical Fix v1.0
 * =============================================
 * يحل مشكلة النسخة الإنجليزية بشكل جذري:
 * - يكتشف كل قسم يحتوي lang-content-ar بدون lang-content-en
 * - ينشئ lang-content-en تلقائياً بترجمة احترافية
 * - يعمل على كل الأقسام الحالية والمستقبلية
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // قاموس الترجمة الشامل — Arabic → English
  // ═══════════════════════════════════════════════════════════════
  var TR = {
    // ── رؤوس الجداول ─────────────────────────────────────────
    'المرجع': 'Reference',
    'البند': 'Item',
    'المتطلب': 'Requirement',
    'المعيار': 'Standard',
    'الاختبار': 'Test',
    'التكرار': 'Frequency',
    'المواصفة': 'Specification',
    'الاستخدام': 'Usage',
    'الشرط': 'Condition',
    'الجهة': 'Party',
    'المادة': 'Material',
    'القيمة': 'Value',
    'التوثيق': 'Documentation',
    'معيار القبول': 'Acceptance Criterion',
    'النوع': 'Type',
    'النشاط': 'Activity',
    'المرحلة': 'Phase',
    'السجل': 'Record',
    'الإجراء': 'Procedure',
    'العنصر': 'Element',
    'المعدة': 'Equipment',
    'الحالة': 'Status',
    'الوصف': 'Description',
    'الملاحظة': 'Remark',
    'الطبقة': 'Layer',
    'الوثيقة': 'Document',
    'طريقة الاختبار': 'Test Method',
    'التوقيت': 'Timing',
    'التردد': 'Frequency',
    'تعريف المرحلة': 'Phase Definition',
    'الخاصية': 'Property',
    'التفصيل': 'Detail',
    'الطريقة': 'Method',
    'الدرجة': 'Grade',
    'المسؤول': 'Responsible',
    'الهدف': 'Objective',
    'التصنيف': 'Classification',
    'درجة الحرارة': 'Temperature',
    'السرعة': 'Speed',
    'القطر': 'Diameter',
    'اللون': 'Colour',
    'الطول': 'Length',
    'الموقع': 'Location',
    'الشرح': 'Explanation',
    'التعريف': 'Definition',
    'الاختبارات': 'Tests',
    'الجهاز': 'Device',
    'المعيار QCS': 'QCS Standard',
    'نوع الطريق': 'Road Type',
    'نوع المادة': 'Material Type',
    'تصنيف الطريق': 'Road Classification',
    'سماكة الطبقة': 'Layer Thickness',
    'ضغط الاختبار': 'Test Pressure',
    'مدة الاختبار': 'Test Duration',
    'درجة الدمك': 'Compaction Degree',
    'درجة الConcrete': 'Concrete Grade',
    'نموذج Ashghal:': 'Ashghal Form:',

    // ── عناوين الأقسام ────────────────────────────────────────
    'مراحل التنفيذ — الترتيب الإلزامي': 'Execution Phases — Mandatory Sequence',
    'مراحل التنفيذ': 'Execution Phases',
    'المواد — Materials': 'Materials',
    'تصميم الخلطة — Mix Design': 'Mix Design',
    'التنفيذ والوصلات': 'Execution & Joints',
    'ضبط الجودة والاختبارات': 'Quality Control & Testing',
    'المواد غير المقبولة': 'Unacceptable Materials',
    'نقاط Fail فورية': 'Immediate Fail Points',
    'نقاط Hold الإلزامية': 'Mandatory Hold Points',
    'نقاط Witness': 'Witness Points',
    'المرحلة 1: التحضير والحفر': 'Phase 1: Preparation & Excavation',
    'المرحلة 2: التركيب': 'Phase 2: Installation',
    'المرحلة 3: اختبار الضغط الهيدروستاتيكي': 'Phase 3: Hydrostatic Pressure Test',
    'المرحلة 4: التعقيم والتطهير': 'Phase 4: Disinfection & Sterilisation',
    'المرحلة 5: التسليم': 'Phase 5: Handover',
    'المرحلة 1': 'Phase 1',
    'المرحلة 2': 'Phase 2',
    'المرحلة 3': 'Phase 3',
    'المرحلة 4': 'Phase 4',
    'المرحلة 5': 'Phase 5',
    'المرحلة 6': 'Phase 6',
    'المرحلة 7': 'Phase 7',
    'نظرة عامة': 'Overview',
    'التشطيبات': 'Finishing Works',
    'التسليم': 'Handover',
    'الإنتاج والفرش': 'Production & Laying',
    'الجوانت والدمك': 'Joints & Compaction',

    // ── مصطلحات أعمال الطرق ───────────────────────────────────
    'طبقة التربة الطبيعية': 'Natural Subgrade Layer',
    'التربة الطبيعية أو المحسّنة': 'Natural or Improved Soil',
    'المواد الحبيبية': 'Granular Materials',
    'الدمك': 'Compaction',
    'مواد الردم': 'Backfill Materials',
    'رمل نظيف': 'Clean Sand',
    'طبقة التحضير': 'Subgrade Preparation',
    'طبقة الأساس': 'Road Base Layer',
    'الطبقة الحبيبية': 'Granular Layer',
    'طبقة الربط': 'Binder Course',
    'الطبقة النهائية': 'Wearing Course',
    'طبقة التسوية': 'Levelling Course',
    'الإسفلت': 'Asphalt',
    'البيتومين': 'Bitumen',
    'الخلطة الإسفلتية': 'Asphalt Mix',
    'درجة الفرد': 'Laying Temperature',
    'فرد الإسفلت': 'Asphalt Laying',
    'درجة الحرارة عند الفرد': 'Laying Temperature',
    'الانبساط الحراري': 'Thermal Expansion',
    'المحور الأفقي': 'Horizontal Axis',
    'ميل عرضي': 'Crossfall',
    'الرفع الفائق': 'Superelevation',

    // ── مصطلحات شبكات المرافق ────────────────────────────────
    'شبكة مياه الشرب': 'Potable Water Network',
    'مياه الشرب': 'Potable Water',
    'شبكة الصرف الصحي': 'Foul Sewer Network',
    'الصرف الصحي': 'Foul Sewer',
    'شبكة الصرف السطحي': 'Storm Drainage Network',
    'الصرف السطحي': 'Storm Drainage',
    'مياه الأمطار': 'Stormwater',
    'شبكة المياه المعالجة': 'Treated Sewage Effluent (TSE) Network',
    'المياه المعالجة': 'Treated Sewage Effluent (TSE)',
    'الخندق': 'Trench',
    'عرض الخندق': 'Trench Width',
    'عمق الخندق': 'Trench Depth',
    'طبقة الفراش': 'Bedding Layer',
    'الردم': 'Backfill',
    'ردم الخندق': 'Trench Backfill',
    'الشريط التحذيري': 'Warning Tape',
    'اختبار الضغط': 'Pressure Test',
    'اختبار التسرب': 'Leakage Test',
    'اختبار الهواء': 'Air Test',
    'تعقيم الشبكة': 'Network Disinfection',
    'التعقيم': 'Disinfection / Sterilisation',
    'نسبة الكلور': 'Chlorine Concentration',
    'التطهير': 'Sterilisation',
    'كاميرا CCTV': 'CCTV Camera Inspection',
    'فحص CCTV': 'CCTV Inspection',
    'وصلة التمدد': 'Expansion Joint',
    'وصلة الأنبوب': 'Pipe Joint',
    'الوصلة': 'Joint',
    'لحام البولي إيثيلين': 'PE Welding / Fusion',
    'لحام الإندماج': 'Fusion Welding',
    'وحدة الدمج الحراري': 'Butt Fusion Machine',
    'التوصيل الكهربائي': 'Electrofusion',
    'سرعة التدفق': 'Flow Velocity',
    'التدفق': 'Flow',
    'الإنحدار': 'Gradient / Slope',
    'الميل': 'Gradient',
    'صندوق التفتيش': 'Inspection Chamber / Manhole',
    'فتحة التفتيش': 'Manhole',
    'بلاعة': 'Gully',
    'غرفة الصمام': 'Valve Chamber',

    // ── مصطلحات الخرسانة والإنشاء ───────────────────────────
    'الخرسانة': 'Concrete',
    'خرسانة مسلحة': 'Reinforced Concrete',
    'خرسانة عادية': 'Plain Concrete',
    'خرسانة التسوية': 'Blinding Concrete',
    'الغطاء الخرساني': 'Concrete Cover',
    'الغطاء': 'Cover',
    'التسليح': 'Reinforcement',
    'حديد التسليح': 'Reinforcement Steel',
    'قضبان التسليح': 'Reinforcement Bars / Rebar',
    'الكانات': 'Stirrups / Links',
    'طول الوصل': 'Lap Splice Length',
    'المعالجة': 'Curing',
    'الصب': 'Casting / Pouring',
    'الدمك الاهتزازي': 'Vibration Compaction',
    'المهماز': 'Internal Vibrator',
    'قالب الصب': 'Formwork',
    'الشدة الخشبية': 'Timber Formwork',
    'مكعبات الخرسانة': 'Concrete Cubes',
    'اختبار المكعبات': 'Cube Crushing Test',
    'اختبار الهبوط': 'Slump Test',
    'درجة الخرسانة': 'Concrete Grade',
    'الخوازيق': 'Piles',
    'الخازوق': 'Pile',
    'حفر الأساسات': 'Foundation Excavation',
    'الحفر': 'Excavation',
    'دعم الحفر': 'Excavation Support / Shoring',
    'سحب المياه الجوفية': 'Dewatering',
    'منسوب المياه الجوفية': 'Groundwater Level',
    'الأساسات السطحية': 'Shallow Foundations',
    'اللبشة': 'Raft Foundation',
    'القدم': 'Pad Footing',
    'الشريط الأساسي': 'Strip Footing',
    'الحمل الميت': 'Dead Load',
    'الحمل الحي': 'Live Load',
    'قدرة التحمل': 'Bearing Capacity',
    'قدرة التحمل المسموح بها': 'Allowable Bearing Capacity',

    // ── مصطلحات الاختبارات ───────────────────────────────────
    'كل دفعة': 'Per Batch',
    'كل 50m': 'Every 50m',
    'كل Section': 'Per Section',
    'كل 500m³': 'Per 500m³',
    'كل 500m²': 'Per 500m²',
    'كل 1000m²': 'Per 1000m²',
    'كل 2000m²': 'Per 2000m²',
    'كل 50m³': 'Per 50m³',
    'كل 1000m³': 'Per 1000m³',
    'كل 500م²': 'Per 500m²',
    'كل 25m': 'Every 25m',
    'كل وصلة': 'Per Joint',
    'كل أساس': 'Per Foundation',
    'كل Gully': 'Per Gully',
    'كل Pipe Run': 'Per Pipe Run',
    'كل حمولة': 'Per Load',
    'كل 25 طن': 'Per 25 tonnes',
    '100% بصري': '100% Visual',
    '100% كل الخوازيق': '100% All Piles',
    '100% كل ماسورة': '100% All Pipes',
    'مستمر': 'Continuous',
    'قياس مباشر': 'Direct Measurement',
    'بصري': 'Visual',
    '1 Set / 50m³': '1 Set / 50m³',
    '3 عينات/25t': '3 samples/25t',
    'اختبار إلزامي': 'Mandatory Test',
    'قبول مشروط': 'Conditional Acceptance',
    'رفض فوري': 'Immediate Rejection',
    'إيقاف فوري': 'Immediate Stop',

    // ── مصطلحات عامة ─────────────────────────────────────────
    'قبل الحفر': 'Before Excavation',
    'بعد التركيب': 'After Installation',
    'قبل الصب': 'Before Casting',
    'بعد الصب': 'After Casting',
    'قبل التسليم': 'Before Handover',
    'بعد الدمك': 'After Compaction',
    'عند التسليم': 'At Handover',
    'حسب التصميم': 'As Per Design',
    'مطابق': 'Compliant',
    'غير مطابق': 'Non-Compliant',
    'مقبول': 'Acceptable',
    'مرفوض': 'Rejected',
    'إلزامي': 'Mandatory',
    'اختياري': 'Optional',
    'مستمر': 'Continuous',
    'يومياً': 'Daily',
    'أسبوعياً': 'Weekly',
    'شهرياً': 'Monthly',
    'موافقة المهندس': 'Engineer\'s Approval',
    'موافقة إلزامية': 'Mandatory Approval',
    'وثيقة مطلوبة': 'Required Document',
    'التوثيق المطلوب': 'Required Documentation',
    'المسؤول الميداني': 'Field Engineer',
    'مهندس الموقع': 'Site Engineer',
    'مراقب الجودة': 'QC Inspector',
    'المقاول': 'Contractor',
    'المشاور': 'Consultant',
    'المالك': 'Client / Owner',
    'المهندس': 'Engineer',
    'اضغط للحساب': 'Click to Calculate',
    'احسب': 'Calculate',
    'النتيجة': 'Result',
    'إدخال البيانات': 'Data Input',
    'البيانات': 'Data',
    'الموقع': 'Site / Location',
    'التاريخ': 'Date',
    'رقم العقد': 'Contract No.',
    'اسم المشروع': 'Project Name',
    'مياه الشرب فوق دائماً': 'Potable water always above',
    'طباعة': 'Print',
    'تصدير': 'Export',
    'حفظ': 'Save',
    'إرسال': 'Submit',
    'تنزيل': 'Download',
    'رفع فيديو': 'Upload Video',
    'رفع ملف': 'Upload File',
    'ارفع فيديو MP4/MOV — يُحفظ طوال الجلسة': 'Upload MP4/MOV video — saved for the session',
    'اضغط \"رفع فيديو\" لتحميل MP4 / MOV': 'Click "Upload Video" to load MP4 / MOV',

    // ── عبارات تحذيرية ───────────────────────────────────────
    'تنبيه:': 'Note:',
    'تحذير:': 'Warning:',
    'ملاحظة:': 'Note:',
    'هام:': 'Important:',
    'إلزامي:': 'Mandatory:',
    'ممنوع:': 'Prohibited:',
    'هذا الدليل مرجعي فقط': 'This guide is for reference only',
    'تحقق دائماً من المخططات الرسمية ووثائق العقد': 'Always verify against official drawings and contract documents',
    'المرجع الأساسي:': 'Primary Reference:',
    'يُحظر استخدام الآتي': 'The following are prohibited',
    'فشل فوري إذا': 'Immediate Fail if',
    'موقف وقف إلزامي': 'Mandatory Hold Point',
    'نقطة مشاهدة': 'Witness Point',
    'بدون موافقة مهندس': 'Without Engineer\'s Approval',
    'بدون استثناء': 'Without Exception',
    'أصلي': 'Original',

    // ── مصطلحات المستندات والنماذج ──────────────────────────
    'طلب المعلومات': 'Request for Information (RFI)',
    'تقرير عدم المطابقة': 'Non-Conformance Report (NCR)',
    'طريقة التنفيذ': 'Method Statement (MOS)',
    'خطة الفحص والاختبار': 'Inspection & Test Plan (ITP)',
    'التقرير اليومي': 'Daily Progress Report (DPR)',
    'سجل الجودة': 'Quality Record',
    'خطة الجودة': 'Quality Plan',
    'موافقة المادة': 'Material Approval Request (MAR)',
    'نموذج': 'Form',
    'النماذج': 'Forms',
    'سجل سريع': 'Quick Log',

    // ── مصطلحات الحاسبات والأدوات ───────────────────────────
    'حاسبة': 'Calculator',
    'حاسبة المواصفات': 'Specifications Calculator',
    'أدخل قيمة الاختبار': 'Enter Test Value',
    'اختر الاختبار': 'Select Test',
    'اختر المادة': 'Select Material',
    'نتيجة الاختبار': 'Test Result',
    'مطابق QCS': 'Compliant with QCS',
    'لا يطابق QCS': 'Non-Compliant with QCS',
    'مرجع QCS:': 'QCS Reference:',
    'حد القبول:': 'Acceptance Limit:',
    'القيمة المُدخلة:': 'Input Value:',
    'الناتج:': 'Result:',

    // ── وحدات القياس ─────────────────────────────────────────
    'ساعة': 'hour',
    'ساعتين': '2 hours',
    'دقيقة': 'minute',
    'أيام': 'days',
    'يوم': 'day',
    'أسبوع': 'week',
    'شهر': 'month',
    'سنة': 'year',
    'متر': 'metre',
    'سنتيمتر': 'centimetre',
    'ملليمتر': 'millimetre',
    'كيلومتر': 'kilometre',
    'طن': 'tonne',
    'كيلوجرام': 'kilogram',
    'لتر': 'litre',
    'متر مكعب': 'cubic metre',
    'متر مربع': 'square metre',
    'درجة مئوية': '°C',
    'بار': 'bar',
    'نيوتن': 'Newton',
    'كيلوباسكال': 'kPa',
    'ميجاباسكال': 'MPa',

    // ── جمل كاملة من محتوى الـ modals ────────────────────────
    'فيديو شرح طبقة Subgrade': 'Subgrade Layer Explanation Video',
    'ارفع فيديو MP4/MOV لشرح طبقة الـ Subgrade': 'Upload MP4/MOV video explaining the Subgrade layer',
    'تعريف Subgrade — QCS S6 P3 Cl. 3.1': 'Subgrade Definition — QCS S6 P3 Cl. 3.1',
    'Subgrade هي الطبقة الطبيعية أو المحسّنة من التربة التي تُشكّل قاعدة الرصيف مباشرة. تُمثّل الطبقة الأساسية لكل طبقات الرصيف فوقها وجودتها تحدد سماكة التصميم وتكلفة المشروع بالكامل.':
      'Subgrade is the natural or improved soil layer forming the immediate foundation of the pavement structure. It is the base layer for all overlying pavement layers; its quality determines design thickness and overall project cost.',
    'المواد غير المقبولة — QCS S6 P3 Cl. 3.3': 'Unacceptable Materials — QCS S6 P3 Cl. 3.3',
    'يُحظر استخدام الآتي في طبقة الـ Subgrade:': 'The following are prohibited in the Subgrade layer:',
    'Peat أو التربة العضوية': 'Peat or Organic Soil',
    'مواد متجمدة': 'Frozen Materials',
    'مواد ملوثة أو ضارة (Deleterious Materials)': 'Contaminated or deleterious materials',
    'مواد تحتوي SO₃ > 0.5% بدون موافقة مهندس ومعالجة': 'Materials with SO₃ > 0.5% without Engineer approval and treatment',
    'مواد تحتوي Chloride > 0.6% بدون موافقة': 'Materials with Chloride > 0.6% without approval',
    'تربة CBR < 8% (عادية) أو < 8% (Sabkha) بدون معالجة معتمدة': 'Soil with CBR < 8% (general) or < 8% (Sabkha) without approved treatment',
    'أي مادة بحجم يتجاوز 75mm': 'Any material exceeding 75mm in size',
    'جدول 3:1 — مواصفات مادة الـ Fill Subgrade — QCS 2024 / Section 6 / Part 3 / Page 8': 'Table 3:1 — Fill Subgrade Material Specifications — QCS 2024 / Section 6 / Part 3 / Page 8',
    'المصدر: QCS 2024 — Section 6 Part 3 Table 3:1 — Page 8 — كما هو في المواصفات القطرية بالضبط': 'Source: QCS 2024 — Section 6 Part 3 Table 3:1 — Page 8 — exact as in Qatar specifications',
    'التدرج الحبيبي': 'Particle Grading',
    'حد السيولة': 'Liquid Limit',
    'مؤشر اللدونة': 'Plasticity Index',
    'الانكماش الخطي': 'Linear Shrinkage',
    'المحتوى العضوي': 'Organic Content',
    'الكبريتات الذائبة': 'Water-Soluble Sulphate',
    'إجمالي الكلوريدات': 'Total Chloride Content',
    'أقصى كثافة جافة': 'Maximum Dry Density',
    'يُحدد من اختبار Standard Proctor': 'Determined from Standard Proctor test',
    'يُعتمد كمرجع للدمك الميداني': 'Used as reference for field compaction',
    'محتوى الرطوبة أثناء الدمك': 'Moisture Content during Compaction',
    'Optimum Moisture Content من اختبار Proctor': 'Optimum Moisture Content from Proctor test',
    'الكثافة الحقلية': 'Field Density',
    'لكل طبقة مدموكة ≤ 200mm': 'per compacted layer ≤ 200mm',
    'General Fill — تربة عادية': 'General Fill — Normal Soil',
    'عند دمك ≥ 95% MDD — Std. Proctor': 'at compaction ≥ 95% MDD — Std. Proctor',
    'Sabkha — تربة ملحية': 'Sabkha — Saline Soil',
    'بموافقة المهندس — عند 95% MDD': 'with Engineer approval — at 95% MDD',
    'سماكة الطبقة': 'Layer Thickness',
    '≤ 200mm مدموك (General)': '≤ 200mm compacted (General)',
    '≤ 150mm مدموك (Sabkha)': '≤ 150mm compacted (Sabkha)',
    'دقة المنسوب': 'Level Accuracy',
    'من المنسوب التصميمي': 'from design level',
    'الانحدار العرضي': 'Crossfall',
    'لضمان التصريف السطحي الصحيح': 'to ensure proper surface drainage',
    'ملاحظات QCS S6 P3 Cl. 3.3.2 الجوهرية:': 'Key Notes — QCS S6 P3 Cl. 3.3.2:',
    'اختبار Proctor يُجرى لكل نوع تربة قبل البدء — يُحدد MDD و OMC': 'Proctor test performed per soil type before commencement — determines MDD and OMC',
    'Nuclear Gauge مسموح للمراقبة اليومية فقط — Sand Cone هو المرجع الرسمي للقبول': 'Nuclear Gauge permitted for daily monitoring only — Sand Cone is the official acceptance reference',
    'أي نتيجة كثافة < 95% MDD → إعادة دمك فورية + إعادة اختبار': 'Any density result < 95% MDD → immediate re-compaction + re-testing',
    'Subgrade لا يُقبَّل ولا تُبدأ الـ Subbase قبل HP رسمي من الاستشاري': 'Subgrade shall not be accepted and Subbase shall not commence without formal HP approval from the Consultant',
    'Hold Points الإلزامية': 'Mandatory Hold Points',
    'الشرط': 'Condition',
    'التوثيق المطلوب': 'Required Documentation',
    'اعتماد تقرير الجسات + تصنيف التربة قبل أي حفر': 'Approval of geotechnical investigation report + soil classification before any excavation',
    'إزالة المواد غير المقبولة وتأكيد الاستبدال': 'Removal of unacceptable materials and confirmation of replacement',
    'Proctor MDD + OMC معتمد قبل بدء الدمك': 'Proctor MDD + OMC approved before commencement of compaction',
    'Field Density ≥ 95% MDD + CBR ≥ 8%/8% مكتملان ومعتمدان': 'Field Density ≥ 95% MDD + CBR ≥ 8%/8% complete and approved',
    'Level Survey ± 10mm معتمد من الاستشاري': 'Level Survey ± 10mm approved by Consultant',
    'مكتملة + موقّعة': 'Complete + Signed',
    'كل نقطة عالية + نهاية الخطوط': 'At each high point + end of lines',
    'كل Valve + كل تقاطع + كل 100m': 'At each Valve + each intersection + every 100m',
    '24 ساعة مملوء (لتشبع المفاصل)': '24 hours filled (for joint absorption)',
    'رفع الضغط تدريجياً': 'Increase pressure gradually',
    'أو تربة عضوية': 'or Organic Soil',
    '5 دقيقة': '5 minutes',
    '30 دقيقة': '30 minutes',
    '1 اختبار': '1 test',
    '3 عينات': '3 samples',
    'كل 2000m²': 'per 2,000m²',
    'حسب نوع الصب': 'Per casting type',
    'أو عند تغيير المصدر': 'or when source changes',
    '100% من الخوازيق': '100% of Piles',
    'كل 500m² أو 50m³': 'Per 500m² or 50m³',
    '≥ 4.5 MPa @ 28 يوم': '≥ 4.5 MPa @ 28 days',
    'مياه الشرب فوق دائماً': 'Potable water always above',
    'آخر تحديث: 2024': 'Last Updated: 2024',
    'طباعة': 'Print',
    '📋 نظرة عامة': '📋 Overview',
    '📐 المواصفات العامة': '📐 General Specifications',
    '1.0 — وثائق ما قبل التنفيذ': '1.0 — Pre-Execution Documents',
    '1.0 النطاق والمواد': '1.0 Scope & Materials',
    '1.0 المعدات': '1.0 Equipment',
    '1.3 المعدات والآليات': '1.3 Equipment & Machinery',
    '1.4 المواد': '1.4 Materials',
    '1 - الجسات': '1 - Geotechnical Investigation',
    '1 / اتجاه': '1 / direction',
    '1-2 / اتجاه': '1-2 / direction',
    'بدون تشقق': 'Without cracking',
    '✅ إلزامي': '✅ Mandatory',
    '(مراقبة — ليس قبول)': '(Monitoring — not acceptance)',
    '(القبول الرسمي QCS S5)': '(Official Acceptance per QCS S5)',
    '(منسوب الرصف)': '(Pavement Level)',
    '(جانت طولي)': '(Longitudinal Joint)',
    '(جانت عرضي)': '(Transverse Joint)',
    '(بار)': '(bar)',
    '% بالوزن الجاف للتربة': '% by dry weight of soil',
    '% بالوزن الجاف — LOI Method': '% by dry weight — LOI Method',
    '% المركبات الثقيلة': '% Heavy Vehicles',
    '0.5% (تربة)': '0.5% (soil)',
    '0.5% في التربة': '0.5% in soil',
    '0.5m أسفل Founding Level دائماً': '0.5m below Founding Level always',
    '0–300mm فوق الماسورة': '0–300mm above pipe',
    '1.2m (قد يختلف حسب التربة)': '1.2m (may vary by soil type)',
    '1.2m head فوق أعلى نقطة، 30 دقيقة': '1.2m head above highest point, 30 minutes',
    '1.2m إلزامي)': '1.2m mandatory)',
    '1.2m تحتاج Confined Space Permit': '1.2m requires Confined Space Permit',
    '1.2m يوقف العمل بدون Shoring Design': '1.2m stops work without Shoring Design',
    '1.2m — Dewatering إذا وُجدت مياه جوفية': '1.2m — Dewatering if groundwater present',
    '1.2m — Timber أو Sheet Pile': '1.2m — Timber or Sheet Pile',
    '1.5 × MWP (بار)': '1.5 × MWP (bar)',
    '1.5 × PN التصميمي': '1.5 × Design PN',
    '1.5 × PN لمدة ساعتين': '1.5 × PN for 2 hours',
    '1.5×PN لمدة 2hr — هبوط ≤ 0.02 bar': '1.5×PN for 2hr — drop ≤ 0.02 bar',
    'ساعتان': '2 hours',
    'دقيقتان': '2 minutes',
    'حسب قوة التدفق': 'Per flow capacity',
    'عدد الطوابق': 'Number of floors',
    'صالح ≤ 12 شهر': 'Valid ≤ 12 months',
    'مطلوب — صالح ≤ 12 شهر': 'Required — Valid ≤ 12 months',
    'كل 30 دقيقة (Pressure Chart)': 'Every 30 minutes (Pressure Chart)',
    'طول القسم المختبَر': 'Tested Section Length',
    'Gauge Calibration Certificate': 'Gauge Calibration Certificate',
    'Pre-soak قبل الاختبار': 'Pre-soak before test',
    'ملء الخط ببطء من أدنى نقطة': 'Fill line slowly from lowest point',
    'تهوية الهواء من كل ARV': 'Purge air from each ARV',
    'Pre-soak 24 ساعة': 'Pre-soak 24 hours',
    'رفع الضغط تدريجياً (≤ 0.5 بار/دقيقة)': 'Raise pressure gradually (≤ 0.5 bar/min)',
    'حتى ضغط الاختبار': 'up to test pressure',
    'تسجيل القراءات كل 30 دقيقة': 'Record readings every 30 minutes',
    'إذا هبط الضغط': 'If pressure drops',
    'البحث عن مصدر التسرب': 'Locate leakage source',
    'أُوقف فوراً': 'Stop immediately',
    'ملاحظات هامة:': 'Important Notes:',
  };

  // ═══════════════════════════════════════════════════════════════
  // دالة الترجمة الذكية — تترجم نص مع الحفاظ على الكودات التقنية
  // ═══════════════════════════════════════════════════════════════
  function translateText(text) {
    if (!text || !text.trim()) return text;

    // إذا لا يحتوي على عربي → لا تغيير
    if (!/[\u0600-\u06FF]/.test(text)) return text;

    var result = text;

    // الترجمة بالعبارات الكاملة أولاً (الأطول أولاً)
    var sortedKeys = Object.keys(TR).sort(function(a, b) { return b.length - a.length; });
    sortedKeys.forEach(function(ar) {
      if (result.indexOf(ar) !== -1) {
        result = result.split(ar).join(TR[ar]);
      }
    });

    return result;
  }

  // ═══════════════════════════════════════════════════════════════
  // ترجمة كل Text Nodes في عنصر HTML
  // ═══════════════════════════════════════════════════════════════
  function translateDOMNode(node) {
    if (node.nodeType === 3) { // Text node
      var original = node.textContent;
      var translated = translateText(original);
      if (translated !== original) {
        node.textContent = translated;
      }
    } else if (node.nodeType === 1) {
      // Skip script/style
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

      // ترجمة الـ attributes
      ['placeholder', 'title', 'alt', 'aria-label'].forEach(function(attr) {
        if (node.hasAttribute(attr)) {
          node.setAttribute(attr, translateText(node.getAttribute(attr)));
        }
      });

      // ترجمة الأبناء
      node.childNodes.forEach(function(child) {
        translateDOMNode(child);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // إنشاء lang-content-en من lang-content-ar
  // ═══════════════════════════════════════════════════════════════
  function createEnFromAr(arDiv) {
    // استنساخ كامل للـ AR div
    var enDiv = arDiv.cloneNode(true);
    enDiv.className = 'lang-content-en';

    // تحديث IDs لتجنب التكرار
    enDiv.querySelectorAll('[id]').forEach(function(el) {
      el.id = el.id + '-en';
    });

    // تحديث data-player و data-ph
    enDiv.querySelectorAll('[data-player]').forEach(function(el) {
      el.setAttribute('data-player', el.getAttribute('data-player') + '-en');
    });
    enDiv.querySelectorAll('[data-ph]').forEach(function(el) {
      el.setAttribute('data-ph', el.getAttribute('data-ph') + '-en');
    });

    // ترجمة كل النصوص
    translateDOMNode(enDiv);

    return enDiv;
  }

  // ═══════════════════════════════════════════════════════════════
  // الدالة الجذرية — تُضاف بعد كل openDetail / dmContent تحديث
  // ═══════════════════════════════════════════════════════════════
  function patchMissingEnContent(container) {
    if (!container) return;

    var arDivs = container.querySelectorAll('.lang-content-ar');
    if (!arDivs.length) return;

    arDivs.forEach(function(arDiv) {
      var parent = arDiv.parentNode;
      var existingEn = parent.querySelector('.lang-content-en');

      // الحالة 1: لا يوجد lang-content-en → أنشئه
      if (!existingEn) {
        var enDiv = createEnFromAr(arDiv);
        parent.insertBefore(enDiv, arDiv.nextSibling);
        return;
      }

      // الحالة 2: يوجد lang-content-en لكنه أقل من 50% من AR
      // يعني: نسخة ملخصة مختلفة — استبدلها بنسخة مطابقة مترجمة
      var arLen = arDiv.innerHTML.length;
      var enLen = existingEn.innerHTML.length;

      if ((enLen / arLen) < 0.5) {
        var freshEn = createEnFromAr(arDiv);
        parent.replaceChild(freshEn, existingEn);
      }
    });

    wrapUnlabelledContent(container);

    var lang = window.currentLang || localStorage.getItem('qsp_lang') || 'ar';
    applyLang(container, lang);
  }

  // ═══════════════════════════════════════════════════════════════
  // لف المحتوى غير المُصنَّف في lang wrappers
  // ═══════════════════════════════════════════════════════════════
  function wrapUnlabelledContent(container) {
    // إذا كان المحتوى لا يحتوي على lang-content-ar أصلاً
    var arDivs = container.querySelectorAll('.lang-content-ar');
    var enDivs = container.querySelectorAll('.lang-content-en');
    if (arDivs.length === 0 && enDivs.length === 0) {
      // المحتوى كله بلا تصنيف — يعمل في كلا اللغتين (لا نغير)
      // لكن نضمن ظهوره دائماً
      container.style.display = 'block';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // تطبيق اللغة على المحتوى
  // ═══════════════════════════════════════════════════════════════
  function applyLang(container, lang) {
    var isEn = (lang === 'en');
    container.querySelectorAll('.lang-content-ar').forEach(function(el) {
      el.style.display = isEn ? 'none' : 'block';
    });
    container.querySelectorAll('.lang-content-en').forEach(function(el) {
      el.style.display = isEn ? 'block' : 'none';
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // Hook على openDetail — بعد تحميل المحتوى
  // ═══════════════════════════════════════════════════════════════
  function hookOpenDetail() {
    var originalOpenDetail = window.QS && window.QS.openDetail;
    if (!originalOpenDetail) return false;

    window.QS.openDetail = function(key, opts) {
      // استدعاء الأصلي
      originalOpenDetail.call(this, key, opts);

      // بعد تأخير قصير لضمان اكتمال التحميل
      setTimeout(function() {
        var dmContent = document.getElementById('dmContent');
        if (dmContent) {
          patchMissingEnContent(dmContent);
        }
        // أيضاً: تحديث الـ panels
        document.querySelectorAll('.dm-panel-content, .panel-content, [data-panel-content]').forEach(function(panel) {
          patchMissingEnContent(panel);
        });
      }, 50);
    };
    return true;
  }

  // ═══════════════════════════════════════════════════════════════
  // Hook على setLang — لتطبيق التحديثات الجديدة
  // ═══════════════════════════════════════════════════════════════
  function hookSetLang() {
    var originalSetLang = window.setLang;
    if (!originalSetLang) return false;

    window.setLang = function(lang) {
      // أولاً: أضف EN المفقود في كل المحتوى المفتوح
      var dmContent = document.getElementById('dmContent');
      if (dmContent) patchMissingEnContent(dmContent);

      // ثم: استدعاء الأصلي
      originalSetLang.call(this, lang);
    };
    return true;
  }

  // ═══════════════════════════════════════════════════════════════
  // مراقب DOM — يلتقط أي محتوى جديد يُضاف
  // ═══════════════════════════════════════════════════════════════
  function startObserver() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              // إذا أُضيف محتوى يحتوي lang-content-ar
              if (node.querySelector && node.querySelector('.lang-content-ar')) {
                setTimeout(function() {
                  patchMissingEnContent(node);
                }, 30);
              }
              // إذا كان هو نفسه lang-content-ar
              if (node.classList && node.classList.contains('lang-content-ar')) {
                setTimeout(function() {
                  patchMissingEnContent(node.parentNode);
                }, 30);
              }
            }
          });
        }
      });
    });

    var dmContent = document.getElementById('dmContent');
    if (dmContent) {
      observer.observe(dmContent, { childList: true, subtree: true });
    }

    // مراقبة الـ body كذلك
    observer.observe(document.body, { childList: true, subtree: false });

    return observer;
  }

  // ═══════════════════════════════════════════════════════════════
  // تشغيل كل شيء
  // ═══════════════════════════════════════════════════════════════
  function init() {
    var hooked1 = hookOpenDetail();
    var hooked2 = hookSetLang();
    startObserver();

    // تطبيق فوري على أي محتوى موجود
    var dmContent = document.getElementById('dmContent');
    if (dmContent) patchMissingEnContent(dmContent);

    // تصدير للاستخدام اليدوي
    window.QS = window.QS || {};
    window.QS.bilingualPatch = {
      patchContainer: patchMissingEnContent,
      translateText: translateText,
      applyLang: applyLang,
      dictionary: TR,
    };

    console.log('[QatarSpec] Bilingual Radical Fix loaded ✅ | Hooks: openDetail=' + hooked1 + ' setLang=' + hooked2);
  }

  // انتظر حتى يُحمَّل كل شيء
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 200); // بعد تحميل inline-scripts.js
    });
  } else {
    setTimeout(init, 200);
  }

})();
