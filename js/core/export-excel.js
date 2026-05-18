// QatarSpec Pro — Excel Export Module
(function() {
  "use strict";


async function loadXLSX(){if(window.XLSX)return window.XLSX;return new Promise(function(r,j){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=function(){r(window.XLSX)};s.onerror=function(){j(new Error('XLSX load failed'))};document.head.appendChild(s)})}



async function exportRFIExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
let today = new Date().toLocaleDateString('ar-QA');
let ws = X.utils.aoa_to_sheet([
['\uFEFFQatarSpec Pro — Request for Inspection (RFI)','','',''],
['المرجع: QCS 2024 | Ashghal QA/QC','','تاريخ الطباعة: '+today,''],
['','','',''],
['رقم RFI:',gv('rfi-num'),'رقم المشروع:',gv('rfi-proj')],
['رقم العقد:',gv('rfi-contract'),'المقاول:',gv('rfi-contractor')],
['Submitted By:',gv('rfi-from'),'Directed To:',gv('rfi-to')],
['تاريخ الإرسال:',gv('rfi-date'),'Required By Date:',gv('rfi-reqby')],
['','','',''],
['★ بيانات الموقع','','',''],
['الموقع:',gv('rfi-loc'),'Grid QNG:',gv('rfi-grid')],
['Chainage:',gv('rfi-ch'),'Layer No.:',gv('rfi-layer')],
['QCS Clause:',gv('rfi-clause'),'Drawing No.:',gv('rfi-dwg')],
['','','',''],
['النشاط:',gv('rfi-activity'),'نوع النقطة:',gv('rfi-point')],
['','','',''],
['موضوع RFI:',gv('rfi-subject'),'',''],
['','','',''],
['نتائج الاختبارات:',gv('rfi-results'),'',''],
['','','',''],
['المرفقات:',gv('rfi-attach'),'',''],
['','','',''],
['رد SC / Response:',gv('rfi-response'),'Status:',gv('rfi-status')],
['','','',''],
['توقيع مقدّم الطلب:','___________________','التاريخ:','___________'],
['توقيع SC / Consultant:','___________________','التاريخ:','___________'],
['قرار SC:','مقبول ☐    مرفوض ☐    Hold ☐','','']
]);
ws['!cols']=[{wch:22},{wch:42},{wch:20},{wch:32}];
ws['!merges']=[{s:{r:0,c:0},e:{r:0,c:3}},{s:{r:1,c:0},e:{r:1,c:1}},{s:{r:8,c:0},e:{r:8,c:3}},{s:{r:15,c:1},e:{r:15,c:3}},{s:{r:17,c:1},e:{r:17,c:3}},{s:{r:19,c:1},e:{r:19,c:3}},{s:{r:21,c:1},e:{r:21,c:3}}];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'RFI');
X.writeFile(wb,'RFI-'+gv('rfi-num','001')+'-'+Date.now()+'.xlsx');
showToast('✅ تم تصدير RFI Excel بكامل الحقول');
}


async function exportNCRExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
let today = new Date().toLocaleDateString('ar-QA');
const classMap = {'major':'🔴 Major','minor':'🟡 Minor','obs':'🔵 Observation'};
const statusMap = {'open':'🔴 Open','inprog':'🟡 In Progress','accepted':'🟢 Closed — Accepted','rejected':'🔴 Closed — Rejected','pending':'⏳ Pending'};
const ncrClass = classMap[gv('ncr-class')]||gv('ncr-class');
const ncrStatus = statusMap[gv('ncr-status')]||gv('ncr-status');
let ws = X.utils.aoa_to_sheet([
['\uFEFFQatarSpec Pro — Non-Conformance Report (NCR)','','','',''],
['ISO 9001 Cl.10.2 + Ashghal QA/QC | تاريخ الطباعة: '+today,'','','',''],
['','','','',''],
['رقم NCR:',gv('ncr-num'),'المشروع:',gv('ncr-proj'),''],
['رقم العقد:',gv('ncr-contract'),'المقاول:',gv('ncr-contractor'),''],
['تصنيف NCR:',ncrClass,'مصدر الاكتشاف:',gv('ncr-source'),''],
['تاريخ الاكتشاف:',gv('ncr-date'),'تاريخ الإغلاق المطلوب:',gv('ncr-target'),''],
['تاريخ الإغلاق الفعلي:',gv('ncr-closed-date'),'الحالة:',ncrStatus,''],
['','','','',''],
['الموقع + Chainage:',gv('ncr-loc'),'Drawing No.:',gv('ncr-dwg'),''],
['QCS Clause المُنتهك:',gv('ncr-clause'),'','',''],
['','','','',''],
['وصف عدم المطابقة:','','','',''],
[gv('ncr-desc'),'','','',''],
['','','','',''],
['Root Cause Analysis:','','','',''],
[gv('ncr-root'),'','','',''],
['','','','',''],
['الإجراء التصحيحي (Corrective):','','','',''],
[gv('ncr-corrective'),'','','',''],
['الإجراء الوقائي (Preventive):','','','',''],
[gv('ncr-preventive'),'','','',''],
['','','','',''],
['نتيجة إعادة الاختبار:',gv('ncr-retest'),'','',''],
['','','','',''],
['QC Engineer:',gv('ncr-qc-eng'),'SC / Consultant:',gv('ncr-sc'),'Client:'],
[gv('ncr-client'),'','','',''],
['','','','',''],
['التوقيع:','___________________','___________________','___________________','']
]);
ws['!cols']=[{wch:26},{wch:38},{wch:22},{wch:28},{wch:18}];
ws['!merges']=[
{s:{r:0,c:0},e:{r:0,c:4}},{s:{r:1,c:0},e:{r:1,c:4}},
{s:{r:10,c:1},e:{r:10,c:4}},
{s:{r:12,c:0},e:{r:12,c:4}},{s:{r:13,c:0},e:{r:13,c:4}},
{s:{r:15,c:0},e:{r:15,c:4}},{s:{r:16,c:0},e:{r:16,c:4}},
{s:{r:18,c:0},e:{r:18,c:4}},{s:{r:19,c:0},e:{r:19,c:4}},
{s:{r:20,c:0},e:{r:20,c:4}},{s:{r:21,c:0},e:{r:21,c:4}}
];
const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,'NCR');
// Summary sheet
let ws2 = X.utils.aoa_to_sheet([
['NCR Register — Quick View','','','',''],
['NCR No.','Classification','Location','Status','Target Close'],
[gv('ncr-num'),ncrClass,gv('ncr-loc'),ncrStatus,gv('ncr-target')]
]);
ws2['!cols']=[{wch:18},{wch:16},{wch:36},{wch:20},{wch:14}];
X.utils.book_append_sheet(wb,ws2,'NCR Register');
X.writeFile(wb,'NCR-'+gv('ncr-num','001')+'-'+Date.now()+'.xlsx');
showToast('✅ تم تصدير NCR Excel بكامل الحقول');
}


async function exportITPExcel(){
try{const X=await loadXLSX()}catch(e){showToast('❌ يحتاج إنترنت');return}
const today = new Date().toLocaleDateString('ar-QA');
const projectName = (document.getElementById('itp-project-name')||{}).value || '';
const itpNum = (document.getElementById('itp-number')||{}).value || '';
const engineer = (document.getElementById('itp-engineer')||{}).value || '';
const itpDate = (document.getElementById('itp-date')||{}).value || today;
let title = (document.getElementById('dmTitle')||{}).textContent || 'ITP';

// ── Collect ITP rows from table ──
let rows = [];
const hp_rows = [];
const wp_rows = [];
document.querySelectorAll('#print-area .dm-table tbody tr').forEach(function(tr){
  const cells = tr.querySelectorAll('td');
  if(cells.length >= 4){
    const row = Array.from(cells).map(function(c){ return c.textContent.trim(); });
    rows.push(row);
    const pointType = (row[7] || row[5] || '').toUpperCase();
    if(pointType.includes('H')) hp_rows.push(row);
    else if(pointType.includes('W')) wp_rows.push(row);
  }
});
if(!rows.length){ showToast('⚠️ لا بيانات ITP'); return; }

// ── Sheet 1: ITP Main ──
const headerRows = [
  ['\uFEFFQatarSpec Pro — Inspection & Test Plan (ITP)', '', '', '', '', '', '', '', '', ''],
  ['المشروع:', projectName, '', '', 'رقم ITP:', itpNum, '', '', '', ''],
  ['التاريخ:', itpDate, '', '', 'المهندس:', engineer, '', '', '', ''],
  ['المرجع:', 'QCS 2024', '', '', 'تاريخ الطباعة:', today, '', '', '', ''],
  [], // blank
  ['م', 'النشاط / Activity', 'مرجع QCS', 'معيار القبول', 'التكرار', 'طريقة الاختبار', 'Lab', 'QC', 'SC', 'النقطة']
];
const ws1 = X.utils.aoa_to_sheet(headerRows.concat(rows));
ws1['!cols'] = [
  {wch:5},  // م
  {wch:42}, // Activity
  {wch:18}, // QCS Ref
  {wch:38}, // Acceptance
  {wch:18}, // Frequency
  {wch:18}, // Method
  {wch:6},  // Lab
  {wch:6},  // QC
  {wch:6},  // SC
  {wch:12}  // Point
];
ws1['!merges'] = [
  {s:{r:0,c:0}, e:{r:0,c:9}}, // Title
  {s:{r:1,c:0}, e:{r:1,c:3}},
  {s:{r:1,c:4}, e:{r:1,c:9}},
  {s:{r:2,c:0}, e:{r:2,c:3}},
  {s:{r:2,c:4}, e:{r:2,c:9}},
];

// ── Sheet 2: Hold Points ──
const ws2 = X.utils.aoa_to_sheet([
  ['\uFEFFHold Points Summary — نقاط الإيقاق الإلزامية', '', '', ''],
  ['المشروع:', projectName, 'ITP No:', itpNum],
  [],
  ['م', 'النشاط', 'معيار القبول', 'النوع']
].concat(hp_rows.map(function(r){ return [r[0]||'', r[1]||'', r[3]||'', 'H']; })));
ws2['!cols'] = [{wch:6},{wch:45},{wch:40},{wch:8}];
ws2['!merges'] = [{s:{r:0,c:0},e:{r:0,c:3}}];

// ── Sheet 3: Witness Points ──
const ws3 = X.utils.aoa_to_sheet([
  ['\uFEFFWitness Points Summary — نقاط الشهود', '', '', ''],
  ['المشروع:', projectName, 'ITP No:', itpNum],
  [],
  ['م', 'النشاط', 'معيار القبول', 'النوع']
].concat(wp_rows.map(function(r){ return [r[0]||'', r[1]||'', r[3]||'', 'W']; })));
ws3['!cols'] = [{wch:6},{wch:45},{wch:40},{wch:8}];
ws3['!merges'] = [{s:{r:0,c:0},e:{r:0,c:3}}];

// ── Sheet 4: Summary Stats ──
const ws4 = X.utils.aoa_to_sheet([
  ['\uFEFFITP Statistics — إحصائيات خطة الفحص', ''],
  [],
  ['البيان', 'القيمة'],
  ['إجمالي بنود ITP',       rows.length],
  ['Hold Points (H)',       hp_rows.length],
  ['Witness Points (W)',    wp_rows.length],
  ['Review Points (R)',     rows.length - hp_rows.length - wp_rows.length],
  [],
  ['المشروع', projectName],
  ['رقم ITP',  itpNum],
  ['المهندس',  engineer],
  ['تاريخ ITP', itpDate],
  ['تاريخ التصدير', today],
  ['المرجع',   'QCS 2024 — QatarSpec Pro']
]);
ws4['!cols'] = [{wch:28},{wch:36}];
ws4['!merges'] = [{s:{r:0,c:0},e:{r:0,c:1}}];

let wb = X.utils.book_new();
X.utils.book_append_sheet(wb, ws1, 'ITP Main');
X.utils.book_append_sheet(wb, ws2, 'Hold Points');
X.utils.book_append_sheet(wb, ws3, 'Witness Points');
X.utils.book_append_sheet(wb, ws4, 'Summary');
X.writeFile(wb, 'ITP-' + (itpNum||'Export') + '-' + Date.now() + '.xlsx');
showToast('✅ تم تصدير ITP Excel — 4 أوراق');
}


  window.loadXLSX = loadXLSX;
  window.exportRFIExcel = exportRFIExcel;
  window.exportNCRExcel = exportNCRExcel;
  window.exportITPExcel = exportITPExcel;
})();
