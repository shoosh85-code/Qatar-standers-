/**
 * QatarSpec Pro — Forms Module
 * المرحلة 4 — استخراج دوال النماذج من inline-scripts.js
 * يعتمد على: ui-utils.js (gv, showToast)
 * النماذج: RFI | NCR | DPR | ITP | MS
 */
(function(w) {
'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== FORM SWITCHING & AUTO-FILL =====
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function switchForm(tab) {
  const forms = ['rfi','ncr','dpr','ms'];
  let colors = { rfi:'rgba(201,168,76,.15)', ncr:'rgba(231,76,60,.15)', dpr:'rgba(52,152,219,.15)', ms:'rgba(155,89,182,.15)' };
  const borders = { rfi:'rgba(201,168,76,.4)', ncr:'rgba(231,76,60,.4)', dpr:'rgba(52,152,219,.4)', ms:'rgba(155,89,182,.4)' };
  const texts = { rfi:'var(--gold2)', ncr:'#e74c3c', dpr:'#3498db', ms:'#9b59b6' };
  forms.forEach(function(f) {
    let el = document.getElementById('form-' + f);
    let btn = document.getElementById('ftab-' + f);
    if (el) el.style.display = f === tab ? 'block' : 'none';
    if (btn) {
      if (f === tab) {
        btn.style.background = colors[f]; btn.style.borderColor = borders[f]; btn.style.color = texts[f]; btn.style.fontWeight = '700';
      } else {
        btn.style.background = 'var(--dark4)'; btn.style.borderColor = 'var(--border)'; btn.style.color = 'var(--text2)'; btn.style.fontWeight = '400';
      }
    }
  });
}

function autoFillRFI() {
  let today = new Date();
  let yr = today.getFullYear();
  let seq = (Math.floor(Math.random() * 900) + 100);
  let el = document.getElementById('rfi-num');
  if (el && (!el.value || el.value === 'RFI-2024-001')) {
    el.value = 'RFI-' + yr + '-' + String(seq).padStart(3,'0');
  }
  let d = document.getElementById('rfi-date');
  if (d && !d.value) d.value = today.toISOString().split('T')[0];
  const rb = document.getElementById('rfi-reqby');
  if (rb && !rb.value) {
    const req = new Date(today); req.setDate(req.getDate() + 3);
    rb.value = req.toISOString().split('T')[0];
  }
  showToast('✅ تم توليد رقم RFI-' + yr + '-' + seq + ' والتواريخ');
}

function autoFillNCR() {
  let today = new Date();
  const yr = today.getFullYear();
  let proj = (document.getElementById('ncr-proj') && document.getElementById('ncr-proj').value) ? document.getElementById('ncr-proj').value.replace(/\s+/g,'').substring(0,6).toUpperCase() : 'PROJ';
  const seq = (Math.floor(Math.random() * 900) + 100);
  let el = document.getElementById('ncr-num');
  if (el) el.value = 'NCR-' + proj + '-' + yr + '-' + String(seq).padStart(3,'0');
  let d = document.getElementById('ncr-date');
  if (d && !d.value) d.value = today.toISOString().split('T')[0];
  let t = document.getElementById('ncr-target');
  if (t && !t.value) {
    const tgt = new Date(today); tgt.setDate(tgt.getDate() + 7);
    t.value = tgt.toISOString().split('T')[0];
  }
  showToast('✅ تم توليد رقم NCR-' + proj + '-' + yr + '-' + seq);
}

// ═══════════════════════════════════════════════════════════════
// PHASE 5 — MISSING CALC FUNCTIONS (sulphate already existed)
// ═══════════════════════════════════════════════════════════════



// ===== ITP PROJECT BAR =====
function toggleITPBar(show) {
  const bar = document.getElementById('itp-project-bar');
  if (bar) bar.style.display = show ? 'block' : 'none';
}

// ===== PDF EXPORT =====
// ═══════════════════════════════════════════════════════════════
// PHASE 7 — PROFESSIONAL EXPORT ENGINE
// ═══════════════════════════════════════════════════════════════

// --- Library loaders ---

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ===== PHOTO & COPY FUNCTIONS =====
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function handleSitePhoto(input){
let file = input.files[0];if(!file)return;
let url = URL.createObjectURL(file);
let img = document.getElementById('photo-img');
const box = document.getElementById('photo-preview-box');
const btns = document.getElementById('defect-buttons');
if(img)img.src=url;
if(box)box.style.display='block';
if(btns)btns.style.display='block';
showToast('✅ تم رفع الصورة — اختر نوع العيب');
}

function photoNCR(type){
let map = {
crack:{d:'تشققات في السطح — Cracking',c:'QCS P8 S6.2',r:'Insufficient compaction or thermal stress',a:'Mill + re-lay'},
honeycomb:{d:'تعشيش — Honeycombing',c:'QCS P14 S5.4.1',r:'Poor vibration or congested rebar',a:'Remove + re-cast or grout'},
bleeding:{d:'نزيف إسفلتي — Bleeding',c:'QCS P8 S6.3',r:'Excess bitumen content',a:'Review JMF AC%'},
rutting:{d:'تخدد — Rutting',c:'QCS P8 S5.7',r:'Insufficient compaction',a:'Core check + IRI + remediation'},
spalling:{d:'تقشّر خرساني — Spalling',c:'QCS P14 S5.4',r:'Inadequate cover or carbonation',a:'Repair + anti-carbonation'},
settlement:{d:'هبوط — Settlement',c:'QCS P7 S3.3',r:'Poor compaction or Sabkha',a:'Geotech investigation'}
};
const dd=map[type]||{d:'عيب ميداني',c:'',r:'',a:''};
const res = document.getElementById('photo-ncr-result');
if(res){
res.style.display='block';
res.innerHTML='<div style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);border-radius:10px;padding:14px;margin-top:10px">'
+'<div style="color:#e74c3c;font-weight:700;margin-bottom:8px">⚠️ '+dd.d+'</div>'
+'<div style="font-size:12px;color:var(--text2);line-height:1.8">QCS: <strong style="color:var(--gold)">'+dd.c+'</strong><br>Root Cause: '+dd.r+'<br>Action: '+dd.a+'</div>'
+'<button onclick="prefillNCR(\''+type+'\')" style="margin-top:10px;background:linear-gradient(135deg,var(--maroon),var(--maroon2));border:1px solid rgba(201,168,76,.3);border-radius:8px;padding:8px 16px;color:var(--gold2);font-family:Tajawal;font-weight:700;cursor:pointer">📝 فتح NCR تلقائي</button></div>';
}
}

function prefillNCR(type){
let map = {crack:{d:'تشققات مرئية في السطح',c:'QCS P8 S6.2'},honeycomb:{d:'تعشيش في الخرسانة',c:'QCS P14 S5.4.1'},bleeding:{d:'نزيف إسفلتي',c:'QCS P8 S6.3'},rutting:{d:'تخدد',c:'QCS P8 S5.7'},spalling:{d:'تقشّر خرساني',c:'QCS P14 S5.4'},settlement:{d:'هبوط أرضي',c:'QCS P7 S3.3'}};
const dd = map[type]||{};
openDetail('ashghal_forms');
if(window._ncrPrefillTimer)clearTimeout(window._ncrPrefillTimer);
window._ncrPrefillTimer=setTimeout(function(){
window._ncrPrefillTimer=null;
switchForm('ncr');
let d = document.getElementById('ncr-desc');if(d)d.value=dd.d||'';
let c = document.getElementById('ncr-clause');if(c)c.value=dd.c||'';
autoFillNCR();
showToast('✅ NCR مملوء تلقائياً');
},350);
}

// ===== COPY ITP TO CLIPBOARD =====
function copyITPtoClipboard(){
let pa = document.getElementById('print-area');if(!pa){showToast('❌ لا محتوى');return}
let title = document.getElementById('dmTitle').textContent;
let text = title+'\n'+'='.repeat(60)+'\n\n';
pa.querySelectorAll('table').forEach(function(t){
t.querySelectorAll('tr').forEach(function(r){
text+=Array.from(r.querySelectorAll('td,th')).map(function(c){return c.textContent.trim()}).join(' | ')+'\n';
});text+='\n';
});
text+='\nQCS 2024 — QatarSpec Pro';
navigator.clipboard.writeText(text).then(function(){showToast('✅ تم النسخ — الصق في Word')});
}


// ===== DPR EXCEL EXPORT =====
async function exportDPRExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
const parseRows = function(id){const el=document.getElementById(id);if(!el||!el.value)return[];return el.value.split('\n').filter(function(l){return l.trim()}).map(function(l){return l.split('|').map(function(c){return c.trim()})})};
let rows = [
['\uFEFFQatarSpec Pro — Daily Construction Report','','','',''],
['المشروع:',gv('dpr-proj'),'التاريخ:',gv('dpr-date'),'الطقس:'+gv('dpr-weather','')],
['المقاول:',gv('dpr-contractor','—'),'الموقع:',gv('dpr-loc','—'),'مراقب الموقع:'+gv('dpr-sc','')],
['','','','',''],
['=== العمالة ===','','','',''],
['الوصف','العدد','الساعات','الإجمالي','']
];
parseRows('dpr-manpower').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'',(parseInt(r[1])||0)*(parseInt(r[2])||8),''])});
rows.push(['','','','',''],['=== المعدات ===','','','',''],['المعدة','العدد','ساعات التشغيل','','']);
parseRows('dpr-equipment').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'','',''])});
rows.push(['','','','',''],['=== تقدم الإنجاز ===','','','',''],['النشاط','الكمية','الوحدة','النسبة','']);
parseRows('dpr-progress').forEach(function(r){rows.push([r[0]||'',r[1]||'',r[2]||'',r[3]||'',''])});
rows.push(['','','','',''],['ملاحظات:',gv('dpr-issues'),'','','']);
let ws = X.utils.aoa_to_sheet(rows);
ws['!cols']=[{wch:30},{wch:14},{wch:14},{wch:14},{wch:24}];
ws['!merges']=[{s:{r:0,c:0},e:{r:0,c:4}}];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'Daily Report');
X.writeFile(wb,'DPR-'+gv('dpr-date',Date.now())+'.xlsx');
showToast('✅ تم تصدير التقرير اليومي');
}

// ===== COPY TEXT FUNCTIONS =====
function copyRFIText(){
  var lines=[
    '📋 Request for Inspection — RFI',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رقم RFI: '+gv('rfi-num')+'  |  المشروع: '+gv('rfi-proj'),
    'المقاول: '+gv('rfi-contractor')+'  |  العقد: '+gv('rfi-contract'),
    'Submitted By: '+gv('rfi-from')+'  →  To: '+gv('rfi-to'),
    'تاريخ الإرسال: '+gv('rfi-date')+'  |  Required By: '+gv('rfi-reqby'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📍 الموقع: '+gv('rfi-loc')+'  |  Chainage: '+gv('rfi-ch'),
    'Grid QNG: '+gv('rfi-grid')+'  |  Layer: '+gv('rfi-layer'),
    'QCS Clause: '+gv('rfi-clause')+'  |  Drawing: '+gv('rfi-dwg'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'النشاط: '+gv('rfi-activity')+'  |  نوع النقطة: '+gv('rfi-point'),
    'الموضوع: '+gv('rfi-subject'),
    'نتائج الاختبارات: '+gv('rfi-results'),
    'المرفقات: '+gv('rfi-attach'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رد SC: '+gv('rfi-response')+'  |  Status: '+gv('rfi-status'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ RFI — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}

function copyNCRText(){
  var lines=[
    '⚠️ Non-Conformance Report — NCR',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'رقم NCR: '+gv('ncr-num')+'  |  المشروع: '+gv('ncr-proj'),
    'المقاول: '+gv('ncr-contractor')+'  |  العقد: '+gv('ncr-contract'),
    'تاريخ الاكتشاف: '+gv('ncr-date')+'  |  تاريخ الإغلاق: '+gv('ncr-target'),
    'التصنيف: '+gv('ncr-class')+'  |  المصدر: '+gv('ncr-source'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'الموقع: '+gv('ncr-loc')+'  |  QCS Clause: '+gv('ncr-clause'),
    'Drawing: '+gv('ncr-dwg'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'وصف عدم المطابقة:\n'+gv('ncr-desc'),
    'السبب الجذري:\n'+gv('ncr-root'),
    'الإجراء التصحيحي:\n'+gv('ncr-corrective'),
    'الإجراء الوقائي:\n'+gv('ncr-preventive'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'نتيجة إعادة الاختبار: '+gv('ncr-retest'),
    'حالة الإغلاق: '+gv('ncr-status'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ NCR — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}

function copyDPRText(){
  var lines=[
    '📊 Daily Progress Report — DPR',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'المشروع: '+gv('dpr-proj')+'  |  التاريخ: '+gv('dpr-date'),
    'المقاول: '+gv('dpr-contractor','—')+'  |  الموقع: '+gv('dpr-loc','—'),
    'مراقب الموقع: '+gv('dpr-sc','—')+'  |  الطقس: '+gv('dpr-weather',''),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '👷 العمالة:\n'+gv('dpr-manpower'),
    '━━━━━━━━━━━\n🚜 المعدات:\n'+gv('dpr-equipment'),
    '━━━━━━━━━━━\n📈 الإنجاز:\n'+gv('dpr-progress'),
    '━━━━━━━━━━━\n⚠️ مشاكل:\n'+gv('dpr-issues'),
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'QatarSpec Pro | qatar-standers.vercel.app'
  ];
  var txt=lines.join('\n');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){showToast('✅ تم نسخ DPR — الصقه في واتساب أو بريد إلكتروني');});
  } else {
    var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ تم النسخ');
  }
}


// ================================================================
// المرحلة ٩ — Drawing Analyzer Functions

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// تسجيل في window namespace
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  w.switchForm        = switchForm;
  w.autoFillRFI       = autoFillRFI;
  w.autoFillNCR       = autoFillNCR;
  w.toggleITPBar      = toggleITPBar;
  w.handleSitePhoto   = handleSitePhoto;
  w.photoNCR          = photoNCR;
  w.prefillNCR        = prefillNCR;
  w.copyITPtoClipboard = copyITPtoClipboard;
  w.copyRFIText       = copyRFIText;
  w.copyNCRText       = copyNCRText;
  w.copyDPRText       = copyDPRText;

})(window);
