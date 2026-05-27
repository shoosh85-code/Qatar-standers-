// api/scan-export.js
// يولد PDF احترافي بتنسيق QatarSpec Pro
// PROTOCOL 6: Rate limited | Free: 2/min | Pro: 20/min

import { withRateLimit } from './rate-limit.js';

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { rooms, project } = req.body;
  if (!rooms?.length) return res.status(400).json({ error: 'لا توجد بيانات' });

  const total = rooms.reduce((s,r) => s + r.length * r.width, 0).toFixed(1);
  const date  = new Date().toLocaleDateString('ar-QA');

  const html = `<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8">
<style>
  body { font-family: Arial; padding: 40px; direction: rtl; }
  .header { background: #534ab7; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
  .header h1 { margin: 0; font-size: 22px; }
  .header p  { margin: 5px 0 0; opacity: 0.85; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th { background: #534ab7; color: white; padding: 10px; text-align: right; font-size: 13px; }
  td { padding: 9px 10px; border-bottom: 1px solid #eee; font-size: 13px; }
  tr:nth-child(even) td { background: #f8f8f8; }
  .pass { color: #27500a; font-weight: bold; }
  .fail { color: #791f1f; font-weight: bold; }
  .footer { margin-top: 30px; padding: 14px; background: #faeeda; border-radius: 8px; font-size: 11px; color: #633806; line-height: 1.6; }
  .total { background: #eeedfe; font-weight: bold; }
</style></head><body>
<div class="header">
  <h1>QatarSpec Pro — تقرير المسح الثلاثي الأبعاد</h1>
  <p>التاريخ: ${date} | المرجع: QCS 2024 — Part 3, Section 4.2 | الموقع: qatar-standers.vercel.app</p>
</div>
<table>
  <tr>
    <th>الغرفة</th><th>الطول م</th><th>العرض م</th><th>الارتفاع م</th>
    <th>المساحة م²</th><th>أبواب</th><th>شبابيك</th><th>توافق QCS</th>
  </tr>
  ${rooms.map(r => {
    const area = (r.length * r.width).toFixed(1);
    const ok   = parseFloat(area) >= (r.qcs_min_area || 0);
    return `<tr>
      <td>${r.name}</td><td>${r.length}</td><td>${r.width}</td><td>${r.height}</td>
      <td><b>${area}</b></td><td>${r.doors.length}</td><td>${r.windows.length}</td>
      <td class="${ok ? 'pass' : 'fail'}">${ok ? '✓ محقق' : '✗ دون الحد'}</td>
    </tr>`;
  }).join('')}
  <tr class="total">
    <td colspan="4"><b>الإجمالي</b></td>
    <td><b>${total} م²</b></td>
    <td colspan="3">${rooms.length} غرفة</td>
  </tr>
</table>
<div class="footer">
  ⚠️ تنبيه: الأبعاد المستخرجة بتحليل الصور تقريبية (±10-15سم). يجب التحقق اليدوي من جميع القياسات قبل التسليم الرسمي لأي جهة حكومية أو مقاول. هذا التقرير للاستخدام الاسترشادي فقط.
  <br>QatarSpec Pro | QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024
</div>
</body></html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="qatarspec-3d-scan.html"');
  res.status(200).send(html);
}

export default withRateLimit(handler, '/api/scan-export');
