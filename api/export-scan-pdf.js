// api/export-scan-pdf.js — QatarSpec Pro
// تصدير تقرير فحص الموقع ثلاثي الأبعاد كـ PDF
// PROTOCOL 6: Rate limited | Free: 2/min | Pro: 30/min

import { withRateLimit } from './rate-limit.js';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const {
    projectName   = 'موقع قطري',
    engineer      = 'مهندس',
    scanDate      = new Date().toLocaleDateString('ar-QA'),
    dimensions    = {},
    measurements  = [],
    hotspots      = [],
    screenshotB64 = null,
    scale_info    = null,
  } = body || {};

  // ===== فصل أنواع القياسات =====
  // دعم كلا الصيغتين: المصفوفة القديمة (distances فقط) والجديدة (object مع أنواع)
  let distances = [], areas = [], volumes = [], angles = [];

  if (Array.isArray(measurements)) {
    // صيغة قديمة: مصفوفة تحتوي على عناصر بنوع type مختلط أو distances فقط
    for (const m of measurements) {
      if (!m.type || m.type === 'distance') distances.push(m);
      else if (m.type === 'area')   areas.push(m);
      else if (m.type === 'volume') volumes.push(m);
      else if (m.type === 'angle')  angles.push(m);
    }
  } else if (measurements && typeof measurements === 'object') {
    // صيغة جديدة: { distances, areas, volumes, angles }
    distances = measurements.distances || [];
    areas     = measurements.areas     || [];
    volumes   = measurements.volumes   || [];
    angles    = measurements.angles    || [];
  }

  // بناء محتوى HTML للـ PDF
  const passCount = hotspots.filter(h => h.status === 'pass').length;
  const failCount = hotspots.filter(h => h.status === 'fail').length;
  const warnCount = hotspots.filter(h => h.status === 'warning').length;

  const hotspotsRows = hotspots.map(h => `
    <tr class="${h.status}">
      <td>${h.title || '—'}</td>
      <td>${h.part || '—'} / ${h.clause || '—'}</td>
      <td>${h.measured ?? '—'} ${h.unit || ''}</td>
      <td>${h.limit ?? '—'} ${h.unit || ''}</td>
      <td class="status-cell">
        ${h.status === 'pass' ? '✅ مطابق' : h.status === 'fail' ? '❌ غير مطابق' : '⚠️ تحذير'}
      </td>
    </tr>
  `).join('');

  const measureRows = distances.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || `مسافة ${i + 1}`}</td>
      <td>${m.distanceCm ?? (m.distanceM ? +(m.distanceM * 100).toFixed(1) : '—')} سم</td>
      <td>${m.distanceMm ?? (m.distanceM ? +(m.distanceM * 1000).toFixed(0) : '—')} مم</td>
    </tr>
  `).join('');

  const areaRows = areas.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || `مساحة ${i + 1}`}</td>
      <td>${m.area_m2 ?? '—'} م²</td>
      <td>${m.area_cm2 ?? '—'} سم²</td>
      <td>${m.perimeter_m ?? '—'} م</td>
    </tr>
  `).join('');

  const volumeRows = volumes.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || `حجم ${i + 1}`}</td>
      <td>${m.volume_m3 ?? '—'} م³</td>
      <td>${m.volume_liters ?? '—'} لتر</td>
      <td>${m.dimensions ? `${m.dimensions.width_mm}×${m.dimensions.height_mm}×${m.dimensions.depth_mm} مم` : '—'}</td>
    </tr>
  `).join('');

  const angleRows = angles.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || `زاوية ${i + 1}`}</td>
      <td>${m.degrees ?? '—'}°</td>
      <td>${m.supplement ?? '—'}°</td>
    </tr>
  `).join('');

  // معلومات معايرة المقياس
  const scaleInfoHtml = scale_info ? (() => {
    const methodLabels = {
      'a4_paper': '📄 ورقة A4 (210×297mm)',
      'manual':   `📐 مسافة يدوية: ${scale_info.distance_mm ?? '—'}mm${scale_info.label ? ` (${scale_info.label})` : ''}`,
      'gps':      `📍 GPS ±${scale_info.coordinates?.accuracy_m?.toFixed?.(0) ?? '?'}م`,
      'none':     '⚠️ بدون معايرة — تقديري فقط',
    };
    return `
      <div class="info-card" style="grid-column:span 3;">
        <label>طريقة المعايرة</label>
        <span style="font-size:13px;">${methodLabels[scale_info.type] || scale_info.type}</span>
        <div style="font-size:11px;color:#64748b;margin-top:4px;">دقة تقديرية: ${scale_info.accuracy_estimate || '—'}</div>
      </div>
    `;
  })() : '';

  const screenshotHtml = screenshotB64
    ? `<img src="${screenshotB64}" style="width:100%;max-height:300px;object-fit:contain;border:1px solid #ddd;border-radius:8px;" />`
    : `<div style="height:200px;background:#f0f4f8;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8;">لا توجد صورة للموقع</div>`;

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Arial', sans-serif; direction: rtl; color: #1e293b; font-size: 13px; }
  .header { background: #1a1a2e; color: white; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
  .header h1 { font-size: 20px; }
  .header .meta { font-size: 11px; opacity: 0.8; text-align: left; }
  .qcs-badge { background: #c8961a; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  .content { padding: 20px 24px; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: bold; color: #1a1a2e; border-bottom: 2px solid #c8961a; padding-bottom: 6px; margin-bottom: 12px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
  .info-card label { font-size: 10px; color: #64748b; display: block; margin-bottom: 4px; }
  .info-card span { font-size: 16px; font-weight: bold; color: #1a1a2e; }
  .summary-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .summary-card { border-radius: 8px; padding: 14px; text-align: center; }
  .summary-card.pass { background: #f0fdf4; border: 2px solid #22c55e; }
  .summary-card.fail { background: #fef2f2; border: 2px solid #ef4444; }
  .summary-card.warn { background: #fffbeb; border: 2px solid #f59e0b; }
  .summary-card .num { font-size: 28px; font-weight: bold; }
  .summary-card.pass .num { color: #16a34a; }
  .summary-card.fail .num { color: #dc2626; }
  .summary-card.warn .num { color: #d97706; }
  .summary-card label { font-size: 11px; color: #64748b; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #1a1a2e; color: white; padding: 8px 10px; text-align: right; }
  td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
  tr.pass td { background: #f0fdf4; }
  tr.fail td { background: #fef2f2; }
  tr.warning td { background: #fffbeb; }
  .status-cell { font-weight: bold; }
  .footer { margin-top: 24px; padding: 14px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  .disclaimer { background: #fffbeb; border: 1px solid #f59e0b; border-radius: 6px; padding: 10px 14px; font-size: 11px; color: #92400e; margin-top: 16px; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>🏗️ QatarSpec Pro — تقرير فحص الموقع</h1>
    <div style="margin-top:6px;font-size:12px;">المشروع: ${projectName} | المهندس: ${engineer}</div>
  </div>
  <div class="meta">
    <div class="qcs-badge">QCS 2024</div>
    <div style="margin-top:6px;">تاريخ الفحص: ${scanDate}</div>
    <div>رقم التقرير: QSP-${Date.now().toString(36).toUpperCase()}</div>
  </div>
</div>

<div class="content">

  <!-- صورة الموقع -->
  <div class="section">
    <div class="section-title">📷 النموذج ثلاثي الأبعاد</div>
    ${screenshotHtml}
  </div>

  <!-- الأبعاد -->
  <div class="section">
    <div class="section-title">📐 أبعاد الموقع (متر)</div>
    <div class="info-grid">
      <div class="info-card">
        <label>العرض</label>
        <span>${dimensions.width ?? '—'} م</span>
      </div>
      <div class="info-card">
        <label>الطول</label>
        <span>${dimensions.depth ?? '—'} م</span>
      </div>
      <div class="info-card">
        <label>الارتفاع</label>
        <span>${dimensions.height ?? '—'} م</span>
      </div>
    </div>
  </div>

  <!-- ملخص المطابقة -->
  <div class="section">
    <div class="section-title">📊 ملخص مطابقة QCS 2024</div>
    <div class="summary-grid">
      <div class="summary-card pass">
        <div class="num">${passCount}</div>
        <label>✅ بنود مطابقة</label>
      </div>
      <div class="summary-card fail">
        <div class="num">${failCount}</div>
        <label>❌ بنود غير مطابقة</label>
      </div>
      <div class="summary-card warn">
        <div class="num">${warnCount}</div>
        <label>⚠️ بنود تحتاج مراجعة</label>
      </div>
    </div>
  </div>

  <!-- جدول Hotspots -->
  ${hotspots.length > 0 ? `
  <div class="section">
    <div class="section-title">🔍 تفاصيل بنود الفحص</div>
    <table>
      <thead>
        <tr>
          <th>البند</th>
          <th>مرجع QCS</th>
          <th>القيمة المقاسة</th>
          <th>الحد المسموح</th>
          <th>النتيجة</th>
        </tr>
      </thead>
      <tbody>${hotspotsRows}</tbody>
    </table>
  </div>
  ` : ''}

  <!-- معايرة المقياس -->
  ${scale_info ? `
  <div class="section">
    <div class="section-title">📏 معايرة المقياس</div>
    <div class="info-grid">${scaleInfoHtml}</div>
  </div>
  ` : ''}

  <!-- جدول المسافات -->
  ${distances.length > 0 ? `
  <div class="section">
    <div class="section-title">📏 قياسات المسافة</div>
    <table>
      <thead>
        <tr><th>#</th><th>الوصف</th><th>المسافة (سم)</th><th>المسافة (مم)</th></tr>
      </thead>
      <tbody>${measureRows}</tbody>
    </table>
  </div>
  ` : ''}

  <!-- جدول المساحات -->
  ${areas.length > 0 ? `
  <div class="section">
    <div class="section-title">📐 قياسات المساحة</div>
    <table>
      <thead>
        <tr><th>#</th><th>الوصف</th><th>المساحة (م²)</th><th>المساحة (سم²)</th><th>المحيط (م)</th></tr>
      </thead>
      <tbody>${areaRows}</tbody>
    </table>
  </div>
  ` : ''}

  <!-- جدول الأحجام -->
  ${volumes.length > 0 ? `
  <div class="section">
    <div class="section-title">📦 قياسات الحجم</div>
    <table>
      <thead>
        <tr><th>#</th><th>الوصف</th><th>الحجم (م³)</th><th>الحجم (لتر)</th><th>الأبعاد (مم)</th></tr>
      </thead>
      <tbody>${volumeRows}</tbody>
    </table>
  </div>
  ` : ''}

  <!-- جدول الزوايا -->
  ${angles.length > 0 ? `
  <div class="section">
    <div class="section-title">📐 قياسات الزاوية</div>
    <table>
      <thead>
        <tr><th>#</th><th>الوصف</th><th>الزاوية</th><th>الزاوية المكملة</th></tr>
      </thead>
      <tbody>${angleRows}</tbody>
    </table>
  </div>
  ` : ''}

  <!-- إخلاء مسؤولية -->
  <div class="disclaimer">
    ⚠️ <strong>إخلاء مسؤولية:</strong> هذا التقرير مبني على مسح رقمي بالهاتف. للقرارات الهندسية الرسمية يجب الاستعانة بمساح معتمد وفق متطلبات Ashghal / MMUP القطرية.
    دقة القياس: ${scale_info?.accuracy_estimate || '±2-5 سم'}.
    <br>مرجع: QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP
  </div>

</div>

<div class="footer">
  <span>QatarSpec Pro — qatar-standers.vercel.app</span>
  <span>تم الإنشاء بواسطة QatarSpec Pro v3.2 | جميع الحقوق محفوظة</span>
</div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Report-Type', 'scan-inspection');
  return res.status(200).send(html);
}

export default withRateLimit(handler, '/api/export-scan-pdf');
