// QatarSpec Pro — Drawing Analyzer + Inspector Module
// Extracted from inline-scripts.js (Phase 5 Refactoring)
(function() {
  'use strict';

let _daImageData = null;
let _daDrawingType = 'structural';

  // ── Drawing Analyzer ──────────────────────────────────

function selectDaType(type, el) {
  _daDrawingType = type;
  // إزالة التحديد من كل الأزرار
  document.querySelectorAll('.da-type-btn').forEach(function(btn) {
    btn.style.border = '2px dashed rgba(201,168,76,.2)';
    btn.style.background = 'rgba(201,168,76,.03)';
  });
  // تحديد الزر المضغوط
  let colors = {
    structural: 'rgba(201,168,76',
    road:       'rgba(52,152,219',
    itp:        'rgba(46,204,113',
    shop:       'rgba(155,89,182'
  };
  let c = colors[type] || colors.structural;
  el.style.border = '2px solid ' + c + ',.6)';
  el.style.background = c + ',.12)';
}


function handleDaUpload(input) {
  let file = input.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showToast('❌ الملف كبير جداً — الحد 10MB'); return; }

  let reader = new FileReader();
  reader.onload = function(e) {
    // للـ PDF نحفظ كـ data URL ونعرض أيقونة بديلاً
    _daImageData = e.target.result;
    let isPdf = file.type === 'application/pdf';
    const previewWrap = document.getElementById('da-preview-wrap');
    const previewImg = document.getElementById('da-preview-img');
    const fileName = document.getElementById('da-file-name');
    if (previewWrap) previewWrap.style.display = 'block';
    if (fileName) fileName.textContent = '📎 ' + file.name + ' (' + (file.size/1024).toFixed(0) + ' KB)';
    if (previewImg) {
      if (isPdf) {
        previewImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" rx="10" fill="%23222"/><text x="100" y="55" text-anchor="middle" fill="%23C9A84C" font-size="32">📄</text></svg>';
      } else {
        previewImg.src = _daImageData;
      }
    }
    // تحديث zone
    const zone = document.getElementById('da-upload-zone');
    if (zone) zone.style.borderColor = 'rgba(201,168,76,.6)';
    showToast('✅ تم رفع المخطط — اضغط تحليل');
  };
  reader.readAsDataURL(file);
}


window.daHandleDrop = function(e) {
  e.preventDefault();
  var zone = document.getElementById('da-upload-area');
  if (zone) zone.style.borderColor = 'rgba(52,152,219,0.4)';
  var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) { var dt = new DataTransfer(); dt.items.add(file); var inp = document.getElementById('da-file'); if(inp){inp.files = dt.files; handleDaUpload(inp);} }
};


function getDaSystemPrompt(type, notes) {
  const base = 'أنت مهندس متخصص في قراءة وتحليل المخططات الإنشائية في دولة قطر، خبير في QCS 2024.\n'
    + (notes ? 'ملاحظات المهندس: ' + notes + '\n' : '')
    + '\nافحص المخطط المرفق وقدم تقريراً مهنياً دقيقاً يشمل:\n\n';

  const prompts = {
    structural:
      base
      + '١. **نوع المخطط:** تحديد دقيق (قاعدة، عمود، جسر، بلاطة، جدار...)\n'
      + '٢. **المعلومات المقروءة:** Grade الخرسانة، أقطار الحديد، التباعد، أبعاد العناصر\n'
      + '٣. **فحص Cover:**\n'
      + '   - هل الغطاء المعروض مطابق لـ QCS 2024 Part 5, Section 3?\n'
      + '   - Cover مطلوب: أساسات 75mm، خارجي 40mm، داخلي 25mm\n'
      + '٤. **فحص تباعد التسليح:**\n'
      + '   - هل Spacing يتوافق مع QCS 2024 S5 P3 Cl.3.3?\n'
      + '   - Max spacing ≤3×h أو 400mm أيهما أصغر\n'
      + '٥. **فحص Lap Zones:**\n'
      + '   - هل Lap Length صحيح؟ Tension: 40d Compression: 35d\n'
      + '   - هل الـ Laps مُفصَّلة بعيداً عن نقاط الإجهاد الأقصى؟\n'
      + '٦. **تعارضات أو ملاحظات تقنية**\n'
      + '٧. **قائمة checkpoints للمفتش في الموقع** (5 نقاط عملية)\n'
      + '\nاذكر دائماً: المرجع = QCS 2024, Part X, Clause X.X\nالرد بالعربية.',

    road:
      base
      + '١. **نوع المقطع:** تصنيف الطريق (Primary · Secondary · Local) وعدد الحارات\n'
      + '٢. **أسماك الطبقات المقروءة:** Subgrade · Subbase · Base · Binder · Wearing\n'
      + '٣. **فحص أسماك الطبقات مقابل QCS 2024 S6 P3 Table 3:1:**\n'
      + '   - هل Wearing Course = 50mm؟\n'
      + '   - هل Binder Course مناسب لتصنيف الطريق؟\n'
      + '   - هل Subbase ≥ 150mm؟\n'
      + '٤. **فحص Crossfall والانحدار:**\n'
      + '   - Carriageway: 2.5% ± 0.5%\n'
      + '   - Superelevation per MMUP Road Design Manual\n'
      + '٥. **فحص عروض الحارات والأرصفة** مقابل MMUP\n'
      + '٦. **ملاحظات المسافات الجانبية** (Clearances)\n'
      + '٧. **قائمة checkpoints للمفتش** (5 نقاط)\n'
      + '\nالمرجع = QCS 2024 S6 + MMUP Road Design Manual. الرد بالعربية.',

    itp:
      base
      + '١. **نشاط الـ ITP:** تحديد العمل (طرق · مرافق · خرسانة · غيره)\n'
      + '٢. **استخراج Hold Points (HP) تلقائياً:**\n'
      + '   - اذكر كل Hold Point بالرقم والوصف والـ clause\n'
      + '٣. **استخراج Witness Points (W):**\n'
      + '   - اذكر كل Witness Point بالوصف\n'
      + '٤. **الاختبارات المطلوبة:** مع معيار القبول والتكرار\n'
      + '٥. **المستندات المطلوبة للغلق:** Certificates · Test Reports · RFI\n'
      + '٦. **هل الـ ITP مكتمل؟** أي بنود ناقصة؟\n'
      + '٧. **تسلسل الأنشطة:** هل منطقي ومتسلسل؟\n'
      + '\nالمرجع = QCS 2024 + Ashghal ITP Requirements. الرد بالعربية.',

    shop:
      base
      + '١. **نوع الـ Shop Drawing:** (Structural · MEP · Architectural · Civil)\n'
      + '٢. **المعلومات الأساسية:** Project · Drawing No · Revision · Scale\n'
      + '٣. **مقارنة مع QCS 2024:**\n'
      + '   - هل المواد المحددة مطابقة لـ QCS؟\n'
      + '   - هل الأبعاد والمقاسات ضمن الحدود المسموحة؟\n'
      + '   - هل أنواع الوصلات والتفاصيل مقبولة؟\n'
      + '٤. **تعارضات مع المواصفات أو مخططات أخرى**\n'
      + '٥. **بنود تحتاج Engineer Approval**\n'
      + '٦. **توصية:** مقبول / مقبول مع تعليقات / مرفوض + الأسباب\n'
      + '٧. **قائمة checkpoints للمفتش** (5 نقاط)\n'
      + '\nالمرجع = QCS 2024 + relevant British Standards. الرد بالعربية.'
  };
  return prompts[type] || prompts.structural;
}


function formatDaResult(text, type) {
  const colors = {
    structural: { main: 'var(--gold)', bg: 'rgba(201,168,76,.08)', border: 'rgba(201,168,76,.25)' },
    road:       { main: '#3498db',     bg: 'rgba(52,152,219,.08)', border: 'rgba(52,152,219,.25)' },
    itp:        { main: '#2ecc71',     bg: 'rgba(46,204,113,.08)', border: 'rgba(46,204,113,.25)' },
    shop:       { main: '#9b59b6',     bg: 'rgba(155,89,182,.08)', border: 'rgba(155,89,182,.25)' }
  };
  let col = colors[type] || colors.structural;
  const typeNames = { structural:'مخطط إنشائي', road:'مقطع طريق', itp:'نموذج ITP', shop:'Shop Drawing' };

  // تحويل النص إلى HTML: Bold، Hold Points بالأحمر
  // [SEC] XSS Fix — escape raw AI text before any HTML transformation
  const _escHtml = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const safeText = _escHtml(text);
  // الآن نطبق transformations على النص المُعقَّم فقط
  const html = safeText
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:' + col.main + '">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:var(--text2)">$1</em>')
    .replace(/(Hold Point|HP-|🔴)/g, '<span style="color:#e74c3c;font-weight:700">$1</span>')
    .replace(/(✅)/g, '<span style="color:#2ecc71">$1</span>')
    .replace(/(❌)/g, '<span style="color:#e74c3c">$1</span>')
    .replace(/(⚠️)/g, '<span style="color:#f39c12">$1</span>')
    .replace(/QCS 2024[^<\n]*/g, '<span style="color:' + col.main + ';font-size:11px;font-weight:700">$&</span>')
    .replace(/\n/g, '<br>');

  return '<div style="background:' + col.bg + ';border:1px solid ' + col.border + ';border-radius:14px;padding:16px;margin-bottom:10px">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid ' + col.border + '">'
    + '<div style="display:flex;align-items:center;gap:8px">'
    + '<div style="background:' + col.main + ';color:#000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:800;letter-spacing:1px">DRAWING ANALYSIS</div>'
    + '<span style="font-size:12px;color:' + col.main + ';font-weight:700">' + (typeNames[type]||type) + '</span>'
    + '</div>'
    + '<button onclick="copyDaResult()" style="background:var(--dark4);border:1px solid var(--border);border-radius:7px;padding:5px 12px;font-size:11px;color:var(--text2);cursor:pointer">نسخ</button>'
    + '</div>'
    + '<div style="font-size:13px;line-height:2;color:var(--text)">' + html + '</div>'
    + '<div style="margin-top:12px;padding-top:10px;border-top:1px solid ' + col.border + ';font-size:11px;color:var(--text3)">'
    + '📖 المرجع: QCS 2024 | هذا التحليل مساعد — راجع المهندس المختص للقرار النهائي</div>'
    + '</div>';
}


function copyDaResult() {
  let el = document.getElementById('da-result');
  if (el) navigator.clipboard.writeText(el.innerText).then(function(){ showToast('✅ تم نسخ التقرير'); });
}


function generateDaFallback(type) {
  let checklists = {
    structural: {
      title: 'مخطط إنشائي — Checklist الفحص الميداني',
      items: [
        '✅ Cover Bottom: ≥75mm (أساسات) / ≥40mm (خارجي) / ≥25mm (داخلي) — QCS S5 P3',
        '✅ Rebar Spacing: ≤3×h أو ≤400mm أيهما أصغر — QCS S5 P3 Cl.3.3',
        '✅ Lap Length: 40d (Tension) / 35d (Compression) بعيداً عن نقاط الإجهاد',
        '✅ Bar Diameter: مطابق لجدول الحديد المعتمد (Mill Certificate موجود)',
        '✅ Stirrups/Links: 135° hooks — ليس 90° — QCS S5 P3',
        '🔴 HP: RFI مفتوح وموقّع قبل أي صب — QCS S5 P4 Cl.4.1'
      ]
    },
    road: {
      title: 'مقطع طريق — Checklist الفحص الميداني',
      items: [
        '✅ Wearing Course: 50mm (T1-T3) / 50mm+BC للحركة الثقيلة — QCS S6 P3',
        '✅ Binder Course: 60-160mm حسب Traffic Designation — QCS S6 P3 Table 3:1',
        '✅ Base Course: 150-250mm — CBR ≥80% — QCS S6 P3',
        '✅ Subbase: 150-350mm — CBR ≥25% — QCS S6 P3',
        '✅ Crossfall: 2.5% ± 0.3% (QCS 2024 S6) — NCR عند انحراف > ±0.5% — قياس 3m Straightedge',
        '🔴 HP: Level Survey ±10mm before next layer — Ashghal ITP'
      ]
    },
    itp: {
      title: 'نموذج ITP — Hold Points المستخرجة',
      items: [
        '🔴 HP-01: Pre-activity — Material Approval + Method Statement',
        '🔴 HP-02: During — Critical inspection point (per activity)',
        '🔴 HP-03: Testing — Test results reviewed before proceeding',
        '⚠️ W-01: Witness — Engineer present during inspection',
        '⚠️ W-02: Witness — Sampling & testing witnessed',
        '📋 Review: Record Books + Test Reports + Photos — before closure'
      ]
    },
    shop: {
      title: 'Shop Drawing — نقاط الفحص',
      items: [
        '✅ Drawing Number + Revision + Scale — مكتملة وصحيحة',
        '✅ Materials: مطابقة لـ QCS 2024 + Approved Materials List',
        '✅ Dimensions: ضمن Tolerance المسموحة (per element type)',
        '✅ Details: تفاصيل الوصلات والـ Embedments موضحة',
        '⚠️ Clash Check: لا تعارض مع MEP / Structural drawings',
        '🔴 Action: Stamp + Engineer Approval قبل التنفيذ'
      ]
    }
  };

  let cl = checklists[type] || checklists.structural;
  const col = { structural:'rgba(201,168,76', road:'rgba(52,152,219', itp:'rgba(46,204,113', shop:'rgba(155,89,182' };
  const c = (col[type] || col.structural);

  return '<div style="background:' + c + ',.08);border:1px solid ' + c + ',.25);border-radius:14px;padding:16px">'
    + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">'
    + '<span style="font-size:18px">⚠️</span>'
    + '<span style="color:var(--gold);font-weight:700;font-size:13px">تحليل محلي (Offline Mode)</span>'
    + '</div>'
    + '<div style="font-weight:700;color:var(--text);margin-bottom:10px">' + cl.title + '</div>'
    + cl.items.map(function(i){ return '<div style="font-size:12px;color:var(--text2);padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">' + i + '</div>'; }).join('')
    + '<div style="margin-top:12px;font-size:11px;color:var(--text3)">⚡ للتحليل الكامل بالذكاء الاصطناعي — تأكد من الاتصال بالإنترنت</div>'
    + '</div>';
}


  // ── Inspector ──────────────────────────────────────────

function showExecStep(prefix, step) {
  for(let i=1;i<=4;i++){
    const el = document.getElementById(prefix+'-step-'+i);
    if(el) el.style.display=(i===step)?'block':'none';
  }
}


function inspectorLoadImage(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    _inspectorImageData = e.target.result;
    const img = document.getElementById('inspector-img');
    const preview = document.getElementById('inspector-preview');
    const form = document.getElementById('inspector-form');
    if (img) img.src = _inspectorImageData;
    if (preview) preview.style.display = 'block';
    if (form) form.style.display = 'block';
    document.getElementById('inspector-result').style.display = 'none';
    showToast('✅ تم تحميل الصورة — اختر نوع الفحص');
  };
  reader.readAsDataURL(file);
}


function generateLocalAnalysis(workType, phase, specific) {
  const checklists = {
    roads_subgrade: {
      items: ['مستوى السطح ±10mm','دمك ≥95% MDD','CBR ≥8%','MC = OMC±2%','لا مواد عضوية أو Sabkha'],
      qcs: 'QCS 2024 S6 P3 Table 6.3',
      equipment: 'Nuclear Gauge + DCP + Survey'
    },
    roads_asphalt: {
      items: ['Delivery temp — DBM ≥140°C / WC ≥145°C (QCS 2024 S8)','Tack Coat 0.15-0.35 L/m² broken','Layer thickness ±6mm','Core Density ≥97% TMD','IRI ≤2.5 (Conv) / ≤0.9 (PMB)','Marshall ≥8.0 kN (Conv) / ≥10.0 kN (PMB)'],
      qcs: 'QCS 2024 S6 P5',
      equipment: 'Thermometer + 3m Straightedge + NDG'
    },
    struct_rebar: {
      items: ['Cover: 75mm (foundation) / 40mm (external) / 25mm (internal)','Spacing per drawing','Lap Length: 40d (tension) / 50d (seismic)','Spacers كل 1m','Embedded items in place','Cleanliness — no rust/oil/mud'],
      qcs: 'QCS 2024 S5 P4 / BS 4449',
      equipment: 'Cover Meter + Tape + Drawing'
    },
    struct_concrete: {
      items: ['Temp ≤32°C at placement','Slump within ±25mm of target','Delivery time ≤90min (60 summer)','6 cubes per 50m³','Free fall ≤1.5m','Vibration every 450mm'],
      qcs: 'QCS 2024 S5 P4',
      equipment: 'Slump Cone + Thermometer + Cube Moulds'
    },
    util_pipe: {
      items: ['Bedding 150mm ≥90% MDD','Pipe per design level ±10mm','Joints checked 100%','Thrust blocks at bends >11.25°','Marker Tape correct color 300mm above pipe'],
      qcs: 'QCS 2024 S8 + KAHRAMAA',
      equipment: 'Level + Tape + Fusion Machine'
    },
    util_excavation: {
      items: ['Width DN+600mm min','Shoring >1.2m depth','Dewatering if GWT high','Barricade ≥1.5m from edge','PPE 100%'],
      qcs: 'QCS 2024 P1 S8.4',
      equipment: 'Excavator + Shoring + Dewatering'
    }
  };
  
  const cl = checklists[workType] || checklists['roads_asphalt'];
  const phaseNames = {before:'قبل التنفيذ',during:'أثناء التنفيذ',after:'بعد التنفيذ',defect:'عيب مكتشف'};
  
  let report = '<div style="background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:8px;padding:10px;margin-bottom:12px">';
  report += '<strong style="color:var(--gold)">⚠️ تحليل محلي (Offline)</strong> — للتحليل الكامل بالذكاء الاصطناعي يحتاج اتصال بالإنترنت';
  report += '</div>';
  
  report += '<h4 style="color:var(--gold2)">📋 قائمة الفحص — ' + (phaseNames[phase]||phase) + '</h4>';
  report += '<div style="font-size:12px;line-height:2">';
  cl.items.forEach(function(item) {
    report += '<div onclick="this.innerHTML=this.innerHTML.startsWith(\'☐\')?this.innerHTML.replace(\'☐\',\'✅\'):this.innerHTML.replace(\'✅\',\'☐\')" style="cursor:pointer;padding:6px 10px;background:var(--dark3);border:1px solid var(--border);border-radius:6px;margin:3px 0">☐ ' + item + '</div>';
  });
  report += '</div>';
  
  report += '<div style="margin-top:12px;padding:10px;background:var(--dark3);border:1px solid var(--border);border-radius:8px">';
  report += '<div style="font-size:11px;color:var(--text3)">📖 المرجع: <strong style="color:var(--gold)">' + cl.qcs + '</strong></div>';
  report += '<div style="font-size:11px;color:var(--text3);margin-top:4px">🔧 المعدات: ' + cl.equipment + '</div>';
  report += '</div>';
  
  if (specific) {
    report += '<div style="margin-top:10px;padding:8px;background:rgba(52,152,219,.06);border:1px solid rgba(52,152,219,.15);border-radius:8px;font-size:11px;color:#3498db">';
    report += '🔍 فحص محدد: ' + specific;
    report += '</div>';
  }
  
  return report;
}


function showInspectorResult(content) {
  const result = document.getElementById('inspector-result');
  let report = document.getElementById('inspector-report');
  if (result) result.style.display = 'block';
  // [XSS Fix S5] AI output يمر عبر renderMarkdownSafe قبل innerHTML
  if (report) report.innerHTML = renderMarkdownSafe(content);
}


function shareInspectorReport() {
  const report = document.getElementById('inspector-report');
  if (!report) return;
  let text = 'تقرير المفتش الذكي — QatarSpec Pro\n' + report.textContent.substring(0, 500);
  const url = 'https://wa.me/?text=' + encodeURIComponent(text);
  window.open(url, '_blank');
}


function inspectorToNCR() {
  const workType = document.getElementById('insp-work-type');
  const specific = document.getElementById('insp-specific');
  const location = document.getElementById('insp-location');

  openDetail('ashghal_forms');
  if(window._inspNcrTimer)clearTimeout(window._inspNcrTimer);
  window._inspNcrTimer=setTimeout(function() {
    window._inspNcrTimer=null;
    switchForm('ncr');
    const desc = document.getElementById('ncr-desc');
    const loc = document.getElementById('ncr-loc');
    if (desc && specific) desc.value = (specific.value || '') + ' — مكتشف بالمفتش الذكي';
    if (loc  && location) loc.value  = location.value || '';
    autoFillNCR();
    showToast('✅ تم نقل البيانات لنموذج NCR');
  }, 450);
}


  // Expose to window
  window.selectDaType = selectDaType;
  window.handleDaUpload = handleDaUpload;
  window.getDaSystemPrompt = getDaSystemPrompt;
  window.formatDaResult = formatDaResult;
  window.copyDaResult = copyDaResult;
  window.generateDaFallback = generateDaFallback;
  window.showExecStep = showExecStep;
  window.inspectorLoadImage = inspectorLoadImage;
  window.generateLocalAnalysis = generateLocalAnalysis;
  window.showInspectorResult = showInspectorResult;
  window.shareInspectorReport = shareInspectorReport;
  window.inspectorToNCR = inspectorToNCR;
})();
