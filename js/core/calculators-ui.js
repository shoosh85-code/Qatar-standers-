/**
 * QatarSpec Pro — Calculators UI Module
 * المرحلة 4 — استخراج دوال الحاسبات من inline-scripts.js
 * يعتمد على: ui-utils.js (gv, showToast) + inline-scripts.js (loadXLSX)
 * المراجع: QCS 2024 | Ashghal RDM 2023 | AASHTO | ACI
 */
(function(w) {
'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper: اختصار getElementById (متاح من ui-utils.js)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const _gv = function(id, def) {
  const el = document.getElementById(id);
  if (!el) return def !== undefined ? def : '';
  return el.value !== undefined ? el.value : (el.textContent || def || '');
};

function calcESAL(){
const aadt = parseFloat(document.getElementById('esal-aadt').value);
const truck = parseFloat(document.getElementById('esal-truck').value)/100;
const growth = parseFloat(document.getElementById('esal-growth').value)/100;
const life = parseFloat(document.getElementById('esal-life').value)||20;
if(!aadt||!truck) return showToast('❌ أدخل AADT ونسبة الشاحنات');
const gf=((Math.pow(1+growth,life)-1)/growth);
const esal = aadt*truck*365*gf*0.5/1000000;
let cls,thick,bitumen;
if(esal<0.3){cls='T1';thick='50mm WC only';bitumen='60/70 Conv.';}
else if(esal<1){cls='T2';thick='50mm WC + 60mm BC';bitumen='60/70 Conv.';}
else if(esal<3){cls='T3';thick='50mm WC + 70mm BC';bitumen='60/70 أو PMB';}
else if(esal<10){cls='T4';thick='50mm WC + 80mm BC';bitumen='PMB مُوصى';}
else if(esal<30){cls='T5';thick='50mm WC + 2×70mm BC';bitumen='PMB إلزامي';}
else{cls='T6';thick='50mm WC + 2×80mm BC';bitumen='PMB إلزامي + تصميم خاص';}
showResult('esal-result',true,null,null,
'ESAL = <strong>'+esal.toFixed(2)+' مليون</strong><br>'
+'التصنيف: <strong style="color:var(--gold)">'+cls+'</strong><br>'
+'سماكة الرصيف: '+thick+'<br>'
+'البيتومين: '+bitumen+'<br>'
+'<small style="color:var(--text3)">Growth Factor: '+gf.toFixed(1)+' | Design Life: '+life+' سنة</small>');
}

// ===== MIX DESIGN VALIDATOR =====
function validateMixDesign(){
let grade = parseInt(document.getElementById('mix-grade').value);
let so3 = parseFloat(document.getElementById('mix-so3').value);
let cement = document.getElementById('mix-cement').value;
let wc = parseFloat(document.getElementById('mix-wc').value);
const cc = parseInt(document.getElementById('mix-cc').value);
let use = document.getElementById('mix-use').value;
const issues = [];let pass=true;
// Sulphate class check
if(so3>=0.5&&cement==='opc'){issues.push('❌ SO₃ ≥0.5% — OPC غير مقبول. استخدم SRPC أو GGBS≥50%');pass=false;}
if(so3>=1.0&&cement!=='srpc'){issues.push('❌ SO₃ >1.0% — SRPC إلزامي + Protective Coating');pass=false;}
// w/c ratio check
const maxWC = so3<0.2?0.55:so3<0.5?0.50:so3<1.0?0.45:0.40;
if(wc>maxWC){issues.push('❌ w/c = '+wc+' > max '+maxWC+' لتصنيف السلفات');pass=false;}
else{issues.push('✅ w/c = '+wc+' ≤ '+maxWC);}
// Cement content check
const minCC = so3<0.2?300:so3<0.5?320:so3<1.0?350:380;
if(cc<minCC){issues.push('❌ Cement = '+cc+' < min '+minCC+' kg/m³');pass=false;}
else{issues.push('✅ Cement = '+cc+' ≥ '+minCC+' kg/m³');}
// Grade check
const minGrade = so3<0.2?25:so3<0.5?30:so3<1.0?35:40;
if(grade<minGrade){issues.push('❌ Grade C'+grade+' < min C'+minGrade);pass=false;}
else{issues.push('✅ Grade C'+grade+' ≥ C'+minGrade);}
// Cover
const covers = {foundation:50,column_ext:40,slab_int:20,pile:75,retaining:50};
issues.push('📏 Cover المطلوب: '+covers[use]+'mm ('+use+')');
showResult('mix-result',pass,null,null,issues.join('<br>'));
}

// ===== PIPE SIZING CALCULATOR =====
function calcPipeSize(){
const type = document.getElementById('pipe-type').value;
const q = parseFloat(document.getElementById('pipe-q').value);
const slope = parseFloat(document.getElementById('pipe-slope').value)/100;
const pn = parseFloat(document.getElementById('pipe-pn').value);
if(!q){showToast('❌ أدخل تدفق التصميم Q');return;}
let result = '';
if(type==='water'){
// V = Q/A → A = Q/V → D = sqrt(4A/π)
// Target velocity 1.5 m/s
const v = 1.5;const a=q/1000/v;const d=Math.sqrt(4*a/Math.PI)*1000;
let dn = d<63?63:d<90?90:d<110?110:d<160?160:d<200?200:d<250?250:d<315?315:d<400?400:d<500?500:630;
const actualV = (q/1000)/(Math.PI*Math.pow(dn/2000,2));
let vOk = actualV>=0.3&&actualV<=3.0;
result='القطر المحسوب: '+d.toFixed(0)+'mm → <strong>DN'+dn+'</strong><br>';
result+='السرعة: '+actualV.toFixed(2)+' m/s '+(vOk?'✅ (0.3-3.0)':'❌ خارج النطاق')+'<br>';
if(pn) result+='Pressure Class: PN'+pn+' → SDR'+(pn<=10?'17':'11')+'<br>';
result+='المادة: HDPE PE100 أو DI (KAHRAMAA)';
}else{
// Manning: Q = (1/n)×A×R^(2/3)×S^(1/2)
if(!slope){showToast('❌ أدخل الانحدار');return;}
let n = type==='sewer'?0.013:0.012;
// Iterate to find D
let d = 100;
for(let iter=0;iter<50;iter++){
const r = d/4000;const a=Math.PI*Math.pow(d/2000,2);
const qCalc = 1000*(1/n)*a*Math.pow(r,2/3)*Math.pow(slope,0.5);
if(qCalc>=q) break;
d+=25;
}
const dn = d<150?150:d<200?200:d<250?250:d<300?300:d<400?400:d<500?500:d<600?600:d<800?800:d<1000?1000:1200;
const aFinal = Math.PI*Math.pow(dn/2000,2);const vFinal=(q/1000)/aFinal;
const vMin = 0.6;const vMax=type==='sewer'?3.0:4.5;
const vOk = vFinal>=vMin&&vFinal<=vMax;
result='القطر المحسوب: '+d.toFixed(0)+'mm → <strong>DN'+dn+'</strong><br>';
result+='السرعة: '+vFinal.toFixed(2)+' m/s '+(vOk?'✅':'❌')+' ('+vMin+'-'+vMax+')<br>';
result+='Manning n = '+n+'<br>';
result+='المادة: '+(type==='sewer'?'uPVC SN8 أو GRP':'GRP أو RC');
}
showResult('pipe-result',true,null,null,result);
}

// ================================================================
// NEW CALCULATORS — Phase 2
// ================================================================

// ===== Soundness MgSO4 =====
function calcSoundness(){
let val = parseFloat(document.getElementById('snd-val').value);
const layer = document.getElementById('snd-layer').value;
if(isNaN(val)) return showToast('❌ أدخل النتيجة');
let limit = layer==='bc'?12:18;
showResult('snd-result',val<=limit,val,limit,'Soundness (MgSO4): '+val+'% | الحد: ≤'+limit+'% | QCS 2024 S6 P4 Table 4:2');
}

// ===== Water Absorption =====
function calcAbsorption(){
const val = parseFloat(document.getElementById('abs-val').value);
const use = document.getElementById('abs-use').value;
if(isNaN(val)) return showToast('❌ أدخل النتيجة');
const limit = use==='asphalt'?2:3;
showResult('abs-result',val<=limit,val,limit,'Water Absorption: '+val+'% | الحد: ≤'+limit+'% | QCS 2024 S6 P4');
}

// ===== Moisture Content during compaction =====
function calcMoisture(){
const actual = parseFloat(document.getElementById('mc-actual').value);
const omc = parseFloat(document.getElementById('mc-omc').value);
if(isNaN(actual)||isNaN(omc)) return showToast('❌ أدخل كل البيانات');
const diff = Math.abs(actual-omc);
showResult('mc-result',diff<=2,diff.toFixed(1),2,'MC: '+actual+'% | OMC: '+omc+'% | الفرق: ±'+diff.toFixed(1)+'% | المسموح: OMC ±2% | QCS 2024 S6 P3');
}

// ===== Concrete Temperature at Placement =====
function calcConcreteTemp(){
let temp = parseFloat(document.getElementById('ct-val').value);
const ambient = parseFloat(document.getElementById('ct-ambient').value);
if(isNaN(temp)) return showToast('❌ أدخل درجة الحرارة');
const pass = temp<=32;
let detail = 'Concrete Temp: '+temp+'°C '+(pass?'✅':'❌')+' (≤32°C) | QCS 2024 S5';
if(ambient && ambient>40) detail+='<br>⚠️ Ambient '+ambient+'°C > 40°C — يجب إيقاف الصب!';
else if(ambient && ambient>35) detail+='<br>⚠️ Ambient '+ambient+'°C > 35°C — Hot Weather Protocol مطلوب';
if(!pass) detail+='<br>🧊 أضف ثلج — كل 10kg ice/m³ يخفض ~1°C';
showResult('ct-result',pass,temp,32,detail);
}

// ===== Subbase/Base Thickness Design =====
function calcThickness(){
const traffic = document.getElementById('th-traffic').value;
const cbr = parseFloat(document.getElementById('th-cbr').value);
if(!traffic||isNaN(cbr)) return showToast('❌ اختر Traffic + CBR');
const designs = {
'T1':{'wc':50,'bc':0,'base':150,'subbase':150},
'T2':{'wc':50,'bc':60,'base':150,'subbase':200},
'T3':{'wc':50,'bc':70,'base':200,'subbase':200},
'T4':{'wc':50,'bc':80,'base':200,'subbase':250},
'T5':{'wc':50,'bc':140,'base':200,'subbase':300},
'T6':{'wc':50,'bc':160,'base':250,'subbase':350}
};
let d = designs[traffic];
if(!d) return;
// Adjust subbase for CBR
const sAdj = cbr<5?'+100mm (Sabkha — معالجة مطلوبة)':cbr<10?'+50mm':cbr<15?'Standard':'-25mm (تربة جيدة)';
showResult('th-result',true,null,null,
'<strong style="color:var(--gold)">'+traffic+'</strong> | CBR: '+cbr+'%<br>'
+'<table class="dm-table" style="margin-top:8px"><tr><th>الطبقة</th><th>السماكة</th></tr>'
+'<tr><td>Wearing Course</td><td>'+d.wc+'mm</td></tr>'
+(d.bc?'<tr><td>Binder Course</td><td>'+d.bc+'mm</td></tr>':'')
+'<tr><td>Road Base</td><td>'+d.base+'mm</td></tr>'
+'<tr><td>Subbase</td><td>'+d.subbase+'mm '+sAdj+'</td></tr>'
+'</table>'
+'<div style="font-size:11px;color:var(--text3);margin-top:6px">QCS 2024 S6 P3 Table 3:1</div>');
}

// ===== Hot Weather Concrete Calculator =====
function calcHotWeather(){
const temp = parseFloat(document.getElementById('hw-temp').value);
const grade = document.getElementById('hw-grade').value;
const volume = parseFloat(document.getElementById('hw-vol').value)||1;
if(isNaN(temp)) return showToast('❌ أدخل درجة الحرارة');
let ice = 0; let transport=90; let curing=7; let protocol='';
if(temp<=30){protocol='عادي — لا إجراءات خاصة';transport=90;curing=7;ice=0;}
else if(temp<=35){protocol='⚠️ احتياطات Hot Weather';transport=75;curing=10;ice=Math.round(volume*30);}
else if(temp<=40){protocol='🔴 Hot Weather Protocol كامل';transport=60;curing=14;ice=Math.round(volume*60);}
else{protocol='⛔ إيقاف الصب — صب ليلي فقط';transport=45;curing=14;ice=Math.round(volume*80);}
showResult('hw-result',temp<=40,null,null,
'<strong>'+protocol+'</strong><br>'
+'<table class="dm-table" style="margin-top:8px"><tr><th>البند</th><th>القيمة</th></tr>'
+'<tr><td>درجة الحرارة</td><td>'+temp+'°C</td></tr>'
+'<tr><td>الثلج المطلوب (تقريبي)</td><td><strong>'+ice+' kg</strong> لكل '+volume+'m³</td></tr>'
+'<tr><td>أقصى زمن نقل</td><td>'+transport+' دقيقة (بدل 90)</td></tr>'
+'<tr><td>مدة Curing</td><td>'+curing+' يوم</td></tr>'
+'<tr><td>Concrete Temp Max</td><td>≤32°C عند الصب</td></tr>'
+'<tr><td>الصب الليلي</td><td>'+(temp>38?'مُوصى بشدة':'اختياري')+'</td></tr>'
+'</table>'
+'<div style="font-size:11px;color:var(--text3);margin-top:6px">QCS 2024 S5 P4 — Hot Weather Concreting</div>');
}

// ===== Sulphate Attack Risk Calculator =====
function calcSulphateRisk(){
const so3 = parseFloat(document.getElementById('sr-so3').value);
let cl = parseFloat(document.getElementById('sr-cl').value)||0;
const gwt = parseFloat(document.getElementById('sr-gwt').value)||5;
if(isNaN(so3)) return showToast('❌ أدخل SO₃%');
let cls,cement,wc,cover,extra;
if(so3<0.2){cls='DS-1';cement='OPC مقبول';wc='≤0.55';cover='50mm';extra='لا حماية إضافية';}
else if(so3<0.5){cls='DS-2';cement='SRPC أو OPC+GGBS≥50%';wc='≤0.50';cover='50mm';extra='مراقبة';}
else if(so3<1.0){cls='DS-3';cement='SRPC إلزامي';wc='≤0.45';cover='75mm';extra='Curing 14 يوم';}
else if(so3<2.0){cls='DS-4';cement='SRPC + GGBS';wc='≤0.40';cover='75mm';extra='Protective Coating إلزامي';}
else{cls='DS-5';cement='SRPC + GGBS + Coating + دراسة متخصصة';wc='≤0.35';cover='100mm';extra='تصميم خاص — استشاري كيميائي';}
const risk = gwt<2?'🔴 عالي (GWT سطحي)':gwt<5?'🟠 متوسط':'🟢 منخفض';
showResult('sr-result',so3<0.5,null,null,
'<strong style="color:var(--gold)">'+cls+'</strong> | SO₃: '+so3+'%'+(cl?' | Cl: '+cl+'%':'')+'<br>'
+'<table class="dm-table" style="margin-top:8px"><tr><th>البند</th><th>الاشتراط</th></tr>'
+'<tr><td>الإسمنت</td><td><strong>'+cement+'</strong></td></tr>'
+'<tr><td>Max w/c</td><td>'+wc+'</td></tr>'
+'<tr><td>Min Cover</td><td>'+cover+'</td></tr>'
+'<tr><td>حماية إضافية</td><td>'+extra+'</td></tr>'
+'<tr><td>خطر GWT</td><td>'+risk+' ('+gwt+'m)</td></tr>'
+'</table>'
+'<div style="font-size:11px;color:var(--text3);margin-top:6px">QCS 2024 S5 Table 5:3 + BS 8500</div>');
}

// ===== NCR QUICK LOGGER =====
let _quickNCRs = JSON.parse(localStorage.getItem('qsp_quick_ncrs') || '[]');

function addQuickNCR(){
const ncr = {
  id: Date.now(),
  date: new Date().toLocaleDateString('ar-QA'),
  loc: gv('ql-loc'), clause: gv('ql-clause'),
  desc: gv('ql-desc'), sev: gv('ql-sev','Major'),
  layer: gv('ql-layer')
};
if(!ncr.desc){showToast('❌ أدخل وصف NCR');return;}
_quickNCRs.push(ncr);
localStorage.setItem('qsp_quick_ncrs', JSON.stringify(_quickNCRs));
renderQuickNCRs();
['ql-loc','ql-desc','ql-clause','ql-layer'].forEach(function(id){const el=document.getElementById(id);if(el)el.value='';});
showToast('🔴 NCR #'+_quickNCRs.length+' مُسجَّل');
}

function renderQuickNCRs(){
let el = document.getElementById('ql-list');
if(!el)return;
if(!_quickNCRs.length){el.innerHTML='<p style="color:var(--text3);text-align:center">لا يوجد NCRs مُسجَّلة</p>';return;}
el.innerHTML='<div style="font-weight:700;color:var(--gold);margin-bottom:6px">📋 NCRs مُسجَّلة: '+_quickNCRs.length+'</div>'
+_quickNCRs.map(function(n,i){
return '<div style="background:var(--dark3);border:1px solid var(--border);border-radius:8px;padding:8px;margin:4px 0;display:flex;justify-content:space-between;align-items:center">'
+'<div><strong>#'+(i+1)+'</strong> '+sanitizeText(n.desc)+' <span style="color:var(--text3);font-size:10px">| '+sanitizeText(n.loc)+' | '+sanitizeText(n.clause)+'</span></div>'
+'<span style="font-size:10px;color:var(--text3)">'+n.date+'</span></div>';
}).join('');
}

function clearQuickNCRs(){
_quickNCRs=[];localStorage.removeItem('qsp_quick_ncrs');renderQuickNCRs();showToast('🗑️ تم مسح كل NCRs');
}

async function exportQuickNCRs(){
if(!_quickNCRs.length){showToast('⚠️ لا يوجد NCRs مُسجَّلة بعد');return;}
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return;}
const rows = [
['\uFEFFQatarSpec Pro — NCR Quick Log','','','','',''],
['التاريخ','الموقع','QCS Clause','الوصف','الخطورة','الطبقة']
];
_quickNCRs.forEach(function(n){rows.push([n.date,n.loc,n.clause,n.desc,n.sev,n.layer])});
const ws = X.utils.aoa_to_sheet(rows);
ws['!cols']=[{wch:12},{wch:24},{wch:18},{wch:40},{wch:12},{wch:18}];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'NCR Log');
X.writeFile(wb,'NCR-QuickLog-'+Date.now()+'.xlsx');
showToast('✅ تم تصدير '+_quickNCRs.length+' NCR');
}

// Show saved NCRs on section open


// ================================================================
// المرحلة ٩ — Drawing Analyzer Functions
// ================================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// تسجيل في window namespace (للتوافق مع onclick في HTML)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  w.calcESAL          = calcESAL;
  w.validateMixDesign = validateMixDesign;
  w.calcPipeSize      = calcPipeSize;
  w.calcSoundness     = calcSoundness;
  w.calcAbsorption    = calcAbsorption;
  w.calcMoisture      = calcMoisture;
  w.calcConcreteTemp  = calcConcreteTemp;
  w.calcThickness     = calcThickness;
  w.calcHotWeather    = calcHotWeather;
  w.calcSulphateRisk  = calcSulphateRisk;
  w.addQuickNCR       = addQuickNCR;
  w.renderQuickNCRs   = renderQuickNCRs;
  w.clearQuickNCRs    = clearQuickNCRs;
  w.exportQuickNCRs   = exportQuickNCRs;

})(window);
