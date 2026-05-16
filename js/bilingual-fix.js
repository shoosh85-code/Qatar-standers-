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
