/**
 * QatarSpec Pro — مولّد التقرير الهندسي PDF
 * ينتج تقريراً احترافياً شاملاً من نتائج التحليل
 * @version 3.0
 */

'use strict';

window.QS = window.QS || {};

window.QS.ReportGenerator = class ReportGenerator {
  constructor(schemaJSON, complianceResults = [], screenshots = []) {
    this.schema = schemaJSON || {};
    this.compliance = complianceResults;
    this.screenshots = screenshots; // base64 PNGs
    this.reportId = `QSP-${Date.now()}`;
    this.generatedAt = new Date();
  }

  // ══════════════════════════════════════════
  // توليد HTML
  // ══════════════════════════════════════════

  async generate() {
    const css = this._css();
    const body = [
      this._coverPage(),
      this._executiveSummary(),
      this._floorPlanPage(),
      this._threeDPage(),
      this._complianceTable(),
      this._roomsTable(),
      this._dimensionsTable(),
      this._recommendations(),
      this._disclaimer()
    ].join('\n');

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>تقرير QatarSpec Pro — ${this.schema.project?.name || 'مشروع'}</title>
${css}
</head>
<body>
${body}
</body>
</html>`;
  }

  async downloadPDF() {
    const html = await this.generate();
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }

  // ══════════════════════════════════════════
  // الصفحات
  // ══════════════════════════════════════════

  _coverPage() {
    const project = this.schema.project || {};
    return `
<div class="page cover-page">
  <div class="cover-header">
    <div class="logo-area">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="12" fill="#1a1a2e"/>
        <text x="40" y="30" text-anchor="middle" fill="#c8961a" font-size="12" font-weight="bold">QatarSpec</text>
        <text x="40" y="48" text-anchor="middle" fill="#fff" font-size="20">⚙</text>
        <text x="40" y="65" text-anchor="middle" fill="#c8961a" font-size="11">PRO</text>
      </svg>
    </div>
    <h1 class="cover-title">تقرير تحليل المخطط المعماري</h1>
    <p class="cover-subtitle">وفق معايير QCS 2024 — Ashghal</p>
  </div>

  <div class="cover-info">
    <table class="info-table">
      <tr><th>اسم المشروع</th><td>${project.name || 'غير محدد'}</td></tr>
      <tr><th>اسم المهندس</th><td>${project.engineer || 'غير محدد'}</td></tr>
      <tr><th>التاريخ</th><td>${project.date || this.generatedAt.toLocaleDateString('ar-QA')}</td></tr>
      <tr><th>رقم التقرير</th><td>${this.reportId}</td></tr>
      <tr><th>إصدار QCS</th><td>QCS 2024 — الإصدار الخامس</td></tr>
      <tr><th>جهة الإصدار</th><td>Ashghal — وزارة المواصلات والاتصالات</td></tr>
    </table>
  </div>

  <div class="cover-footer">
    <p>Qatar-standers.vercel.app | QatarSpec Pro v3.0</p>
    <p>هذا التقرير مولَّد تلقائياً بالذكاء الاصطناعي لأغراض المراجعة المبدئية</p>
  </div>
</div>`;
  }

  _executiveSummary() {
    const summary = this._getSummary();
    const score = summary.score_percent;
    const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
    const label = score >= 80 ? 'مطابق' : score >= 60 ? 'يحتاج مراجعة' : 'غير مطابق';

    return `
<div class="page">
  <div class="page-header"><span>ملخص تنفيذي</span><span class="report-id">${this.reportId}</span></div>

  <h2 class="section-title">الملخص التنفيذي</h2>

  <div class="summary-grid">
    <div class="summary-card" style="border-color:${color}">
      <div class="summary-big" style="color:${color}">${score.toFixed(0)}%</div>
      <div class="summary-label">نسبة المطابقة</div>
      <div class="summary-badge" style="background:${color}">${label}</div>
    </div>
    <div class="summary-card">
      <div class="summary-big" style="color:#22c55e">${summary.pass}</div>
      <div class="summary-label">بند مطابق ✓</div>
    </div>
    <div class="summary-card">
      <div class="summary-big" style="color:#ef4444">${summary.fail}</div>
      <div class="summary-label">بند فاشل ✗</div>
    </div>
    <div class="summary-card">
      <div class="summary-big" style="color:#f59e0b">${summary.warning}</div>
      <div class="summary-label">تحذير ⚠</div>
    </div>
  </div>

  <!-- Chart SVG -->
  <div style="text-align:center; margin:20px 0;">
    ${this._pieSVG(summary.pass, summary.fail, summary.warning, summary.total)}
  </div>

  <!-- أهم الملاحظات -->
  <h3>أهم الملاحظات:</h3>
  <ol class="observations-list">
    ${this._getTopFailures(3).map(f => `
      <li>
        <strong>${f.name_ar || f.name_en}</strong> —
        <span style="color:#ef4444">${f.message || 'لا يستوفي الحد المطلوب'}</span>
        <small style="color:#888"> [${f.clause || ''}]</small>
      </li>
    `).join('')}
    ${this._getTopFailures(3).length === 0 ? '<li style="color:#22c55e">✓ لا يوجد بنود حرجة</li>' : ''}
  </ol>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>1</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _floorPlanPage() {
    const floors = this.schema.floors || [];
    const floor0 = floors[0] || {};
    const dims = this.schema.dimensions || {};

    return `
<div class="page">
  <div class="page-header"><span>المسقط الأفقي</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">المسقط الأفقي — الدور الأرضي</h2>

  <div style="text-align:center; border:1px solid #2a2a4e; padding:16px; border-radius:8px; margin:16px 0; background:#0d0d1a;">
    ${this._floorPlanSVG(floor0, dims)}
  </div>

  <div class="dims-summary">
    <span>العرض الكلي: <strong>${dims.total_width_m || '—'} م</strong></span>
    <span>العمق الكلي: <strong>${dims.total_depth_m || '—'} م</strong></span>
    <span>المساحة الكلية: <strong>${dims.total_area_m2 || '—'} م²</strong></span>
    <span>عدد الغرف: <strong>${floor0.rooms?.length || 0}</strong></span>
  </div>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>2</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _threeDPage() {
    return `
<div class="page">
  <div class="page-header"><span>المجسم ثلاثي الأبعاد</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">المجسم ثلاثي الأبعاد</h2>

  <div class="screenshots-grid">
    ${this.screenshots.length > 0 ? this.screenshots.slice(0, 3).map((src, i) => `
      <div class="screenshot-item">
        <img src="${src}" alt="زاوية ${i+1}" style="width:100%;border-radius:6px;"/>
        <div class="screenshot-label">${['منظور احترافي','واجهة أمامية','مسقط أفقي'][i]}</div>
      </div>
    `).join('') : `
      <div style="grid-column:1/-1;text-align:center;padding:60px;color:#666;border:2px dashed #333;border-radius:8px;">
        <div style="font-size:48px;">🏗</div>
        <p>لقطات المجسم ثلاثي الأبعاد تُضاف عند فتح صفحة التحليل</p>
        <p style="font-size:12px;color:#888">شغّل العارض ثلاثي الأبعاد وسيظهر هنا تلقائياً</p>
      </div>
    `}
  </div>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>3</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _complianceTable() {
    const categories = {
      structural: { label: 'إنشائي', items: [] },
      architectural: { label: 'معماري', items: [] },
      mep: { label: 'MEP', items: [] },
      infrastructure: { label: 'بنية تحتية', items: [] }
    };

    for (const item of this.compliance) {
      const cat = categories[item.category] || categories.structural;
      cat.items.push(item);
    }

    const tables = Object.values(categories).filter(c => c.items.length > 0).map(cat => `
      <h3 style="color:#c8961a;margin:20px 0 8px;">${cat.label}</h3>
      <table class="compliance-table">
        <thead>
          <tr>
            <th>البند</th>
            <th>المرجع QCS</th>
            <th>المطلوب</th>
            <th>المقاس</th>
            <th>النتيجة</th>
          </tr>
        </thead>
        <tbody>
          ${cat.items.map(item => `
            <tr class="row-${item.status || 'na'}">
              <td>${item.name_ar || item.name_en || '—'}</td>
              <td style="font-size:11px;color:#888;">${item.clause || '—'}</td>
              <td>${this._formatLimit(item)}</td>
              <td>${item.measured !== undefined ? `${item.measured} ${item.unit || ''}` : '—'}</td>
              <td><span class="badge-${item.status || 'na'}">${this._statusLabel(item.status)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `).join('');

    return `
<div class="page">
  <div class="page-header"><span>جدول بنود الفحص</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">جدول بنود فحص QCS 2024</h2>
  ${tables || '<p style="color:#888;text-align:center;padding:40px;">لم يتم تشغيل فحص المطابقة بعد</p>'}
  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>4-7</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _roomsTable() {
    const floors = this.schema.floors || [];
    const rooms = floors.flatMap(f => f.rooms || []);

    return `
<div class="page">
  <div class="page-header"><span>جدول الغرف</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">جدول الغرف والمساحات</h2>

  <table class="compliance-table">
    <thead>
      <tr>
        <th>#</th>
        <th>اسم الغرفة</th>
        <th>Room Name</th>
        <th>المساحة م²</th>
        <th>الأبعاد التقريبية</th>
        <th>ملاحظات</th>
      </tr>
    </thead>
    <tbody>
      ${rooms.map((r, i) => {
        const area = r.area_m2 || 0;
        const side = Math.sqrt(area).toFixed(1);
        return `
        <tr class="${i % 2 ? 'row-alt' : ''}">
          <td>${i + 1}</td>
          <td><strong>${r.name || '—'}</strong></td>
          <td>${r.name_en || '—'}</td>
          <td>${area}</td>
          <td>~${side} × ${side} م</td>
          <td>${area < 9 ? '<span style="color:#f59e0b">⚠ مساحة صغيرة</span>' : '✓'}</td>
        </tr>`;
      }).join('')}
    </tbody>
    <tfoot>
      <tr style="background:#1a1a2e;font-weight:bold;">
        <td colspan="3">الإجمالي</td>
        <td>${rooms.reduce((s, r) => s + (r.area_m2 || 0), 0).toFixed(1)}</td>
        <td colspan="2"></td>
      </tr>
    </tfoot>
  </table>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>8-9</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _dimensionsTable() {
    const dims = this.schema.dimensions || {};
    const rows = [
      { desc: 'العرض الكلي للمبنى', value: dims.total_width_m, unit: 'م' },
      { desc: 'العمق الكلي للمبنى', value: dims.total_depth_m, unit: 'م' },
      { desc: 'إجمالي المساحة المبنية', value: dims.total_area_m2, unit: 'م²' },
      { desc: 'ارتفاع الدور الأرضي', value: this.schema.floors?.[0]?.height_m, unit: 'م' },
      { desc: 'عدد الأدوار', value: this.schema.floors?.length, unit: 'دور' }
    ];

    return `
<div class="page">
  <div class="page-header"><span>جدول الأبعاد</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">جدول الأبعاد والقياسات</h2>

  <table class="compliance-table">
    <thead><tr><th>الوصف</th><th>القيمة</th><th>الوحدة</th></tr></thead>
    <tbody>
      ${rows.map((r, i) => `
        <tr class="${i % 2 ? 'row-alt' : ''}">
          <td>${r.desc}</td>
          <td><strong>${r.value ?? '—'}</strong></td>
          <td>${r.unit}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>10</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _recommendations() {
    const failed = this.compliance.filter(c => c.status === 'fail');

    return `
<div class="page">
  <div class="page-header"><span>الملاحظات والتوصيات</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">الملاحظات والتوصيات</h2>

  ${failed.length === 0 ? `
    <div style="text-align:center;padding:40px;color:#22c55e;font-size:18px;">
      ✅ جميع البنود المفحوصة مطابقة لمعايير QCS 2024
    </div>
  ` : failed.map((f, i) => `
    <div class="recommendation-card">
      <div class="rec-header">
        <span class="rec-num">${i + 1}</span>
        <strong>${f.name_ar || f.name_en}</strong>
        <span class="badge-fail">✗ فشل</span>
      </div>
      <div class="rec-body">
        <p><strong>المرجع:</strong> ${f.clause || '—'}</p>
        <p><strong>المطلوب:</strong> ${this._formatLimit(f)}</p>
        <p><strong>المقاس:</strong> ${f.measured !== undefined ? `${f.measured} ${f.unit || ''}` : 'غير متوفر'}</p>
        <p><strong>التوصية:</strong> ${f.recommendation || 'راجع القسم المعني في QCS 2024 وعدّل التصميم وفقاً للحد المطلوب'}</p>
      </div>
    </div>
  `).join('')}

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>11-12</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  _disclaimer() {
    return `
<div class="page">
  <div class="page-header"><span>إخلاء المسؤولية</span><span class="report-id">${this.reportId}</span></div>
  <h2 class="section-title">إخلاء المسؤولية</h2>

  <div class="disclaimer-box">
    <h3>⚠️ تنبيه مهم</h3>
    <p>هذا التقرير مبني على تحليل رقمي بالذكاء الاصطناعي للمخططات والصور المقدمة. دقة النتائج تعتمد على جودة المدخلات.</p>
    <p>لا يُغني هذا التقرير عن المراجعة الهندسية المتخصصة من مهندس معتمد ومرخص في دولة قطر.</p>
    <p>جميع المراجع مستمدة من وثيقة <strong>QCS 2024 — Qatar Construction Specifications</strong> الصادرة عن <strong>Ashghal (وزارة المواصلات والاتصالات)</strong>.</p>
    <p>في حال وجود تعارض بين هذا التقرير ووثيقة QCS الرسمية، تُقدَّم الوثيقة الرسمية.</p>
  </div>

  <div style="margin-top:40px; display:flex; justify-content:space-between; align-items:flex-end;">
    <div>
      <p style="color:#888;font-size:12px;">تاريخ الإصدار: ${this.generatedAt.toLocaleDateString('ar-QA')}</p>
      <p style="color:#888;font-size:12px;">رقم التقرير: ${this.reportId}</p>
    </div>
    <div style="text-align:center;">
      <div style="border-top:2px solid #c8961a; width:200px; padding-top:8px;">
        <p style="color:#c8961a;font-size:13px;">توقيع رقمي — QatarSpec Pro</p>
      </div>
    </div>
  </div>

  <div class="page-footer"><span>QCS 2024 | Ashghal</span><span>13</span><span>qatar-standers.vercel.app</span></div>
</div>`;
  }

  // ══════════════════════════════════════════
  // SVG المخطط الأفقي
  // ══════════════════════════════════════════

  _floorPlanSVG(floor, dims) {
    const W = dims.total_width_m || 10;
    const D = dims.total_depth_m || 8;
    const scale = 40; // بكسل لكل متر
    const svgW = W * scale + 80;
    const svgH = D * scale + 80;
    const ox = 40; // offset
    const oy = 40;

    const walls = (floor.walls || []).map(w => {
      const x1 = ox + w.start[0] * scale;
      const y1 = oy + w.start[1] * scale;
      const x2 = ox + w.end[0] * scale;
      const y2 = oy + w.end[1] * scale;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c8961a" stroke-width="${Math.max(2, (w.thickness_m||0.2)*scale)}"/>`;
    });

    const rooms = (floor.rooms || []).map(r => {
      if (!r.polygon || r.polygon.length < 3) return '';
      const pts = r.polygon.map(p => `${ox + p[0]*scale},${oy + p[1]*scale}`).join(' ');
      const cx = ox + r.polygon.reduce((s, p) => s + p[0], 0) / r.polygon.length * scale;
      const cy = oy + r.polygon.reduce((s, p) => s + p[1], 0) / r.polygon.length * scale;
      return `
        <polygon points="${pts}" fill="rgba(200,150,26,0.08)" stroke="#c8961a" stroke-width="1"/>
        <text x="${cx}" y="${cy}" text-anchor="middle" fill="#c8961a" font-size="11" font-family="Arial">${r.name}</text>
        <text x="${cx}" y="${cy+14}" text-anchor="middle" fill="#888" font-size="10" font-family="Arial">${r.area_m2}م²</text>
      `;
    });

    // أبعاد خارجية
    const dimW = `<line x1="${ox}" y1="${oy + D*scale + 20}" x2="${ox + W*scale}" y2="${oy + D*scale + 20}" stroke="#888" stroke-width="1"/><text x="${ox + W*scale/2}" y="${oy + D*scale + 34}" text-anchor="middle" fill="#888" font-size="11" font-family="Arial">${W}م</text>`;
    const dimH = `<line x1="${ox - 20}" y1="${oy}" x2="${ox - 20}" y2="${oy + D*scale}" stroke="#888" stroke-width="1"/><text x="${ox - 30}" y="${oy + D*scale/2}" text-anchor="middle" fill="#888" font-size="11" transform="rotate(-90,${ox-30},${oy+D*scale/2})" font-family="Arial">${D}م</text>`;

    return `<svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;max-height:400px;">
      <rect width="${svgW}" height="${svgH}" fill="#0d0d1a"/>
      ${rooms.join('')}
      ${walls.join('')}
      ${dimW}
      ${dimH}
    </svg>`;
  }

  // ══════════════════════════════════════════
  // Chart دائري
  // ══════════════════════════════════════════

  _pieSVG(pass, fail, warn, total) {
    if (total === 0) return '<p style="color:#888">لا توجد بيانات</p>';

    const cx = 100, cy = 100, r = 80;
    let angle = -Math.PI / 2;
    const slices = [
      { val: pass, color: '#22c55e', label: 'مطابق' },
      { val: fail, color: '#ef4444', label: 'فاشل' },
      { val: warn, color: '#f59e0b', label: 'تحذير' }
    ];

    const paths = slices.map(s => {
      const ratio = s.val / total;
      const startAngle = angle;
      angle += ratio * 2 * Math.PI;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(angle);
      const y2 = cy + r * Math.sin(angle);
      const large = ratio > 0.5 ? 1 : 0;
      return ratio > 0 ? `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z" fill="${s.color}"/>` : '';
    });

    const legend = slices.map((s, i) => `
      <rect x="220" y="${60 + i * 30}" width="16" height="16" fill="${s.color}" rx="3"/>
      <text x="242" y="${73 + i * 30}" fill="#ccc" font-size="13" font-family="Arial">${s.label}: ${s.val}</text>
    `);

    return `<svg width="360" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="200" fill="transparent"/>
      ${paths.join('')}
      <circle cx="${cx}" cy="${cy}" r="35" fill="#0d0d1a"/>
      <text x="${cx}" y="${cy - 8}" text-anchor="middle" fill="#c8961a" font-size="18" font-weight="bold" font-family="Arial">${(pass/total*100).toFixed(0)}%</text>
      <text x="${cx}" y="${cy + 10}" text-anchor="middle" fill="#888" font-size="11" font-family="Arial">مطابقة</text>
      ${legend.join('')}
    </svg>`;
  }

  // ══════════════════════════════════════════
  // مساعدات
  // ══════════════════════════════════════════

  _getSummary() {
    const total = this.compliance.length;
    const pass = this.compliance.filter(c => c.status === 'pass').length;
    const fail = this.compliance.filter(c => c.status === 'fail').length;
    const warning = this.compliance.filter(c => c.status === 'warning').length;
    const score_percent = total > 0 ? (pass / total) * 100 : 0;
    return { total, pass, fail, warning, score_percent };
  }

  _getTopFailures(n) {
    return this.compliance.filter(c => c.status === 'fail').slice(0, n);
  }

  _formatLimit(item) {
    if (item.min !== undefined && item.max !== undefined) return `${item.min}–${item.max} ${item.unit || ''}`;
    if (item.min !== undefined) return `≥ ${item.min} ${item.unit || ''}`;
    if (item.max !== undefined) return `≤ ${item.max} ${item.unit || ''}`;
    return '—';
  }

  _statusLabel(status) {
    return { pass: 'مطابق ✓', fail: 'فاشل ✗', warning: 'تحذير ⚠', not_applicable: 'لا ينطبق' }[status] || '—';
  }

  // ══════════════════════════════════════════
  // CSS
  // ══════════════════════════════════════════

  _css() {
    return `<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Tajawal', Arial, sans-serif; background: #0a0a1a; color: #e0e0e0; direction: rtl; }
.page { background: #12121f; min-height: 297mm; padding: 20mm; margin: 0 auto 20px; max-width: 210mm; position: relative; border: 1px solid #1a1a2e; page-break-after: always; }
.page-header { display: flex; justify-content: space-between; color: #888; font-size: 11px; border-bottom: 1px solid #c8961a; padding-bottom: 8px; margin-bottom: 20px; }
.page-footer { position: absolute; bottom: 12mm; left: 20mm; right: 20mm; display: flex; justify-content: space-between; color: #666; font-size: 10px; border-top: 1px solid #2a2a4e; padding-top: 6px; }
.report-id { color: #c8961a; font-size: 10px; }
.section-title { color: #c8961a; font-size: 18px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #1a1a2e; }

/* غلاف */
.cover-page { text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
.logo-area { margin-bottom: 10px; }
.cover-title { font-size: 28px; color: #c8961a; font-weight: bold; }
.cover-subtitle { font-size: 16px; color: #888; }
.cover-footer { color: #555; font-size: 12px; }
.info-table { border-collapse: collapse; width: 100%; max-width: 400px; }
.info-table th, .info-table td { padding: 10px 14px; border: 1px solid #2a2a4e; text-align: right; }
.info-table th { background: #1a1a2e; color: #c8961a; font-weight: bold; }

/* ملخص */
.summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
.summary-card { background: #1a1a2e; border: 1px solid #2a2a4e; border-radius: 10px; padding: 16px; text-align: center; }
.summary-big { font-size: 36px; font-weight: bold; }
.summary-label { color: #888; font-size: 13px; margin-top: 6px; }
.summary-badge { display: inline-block; color: #fff; border-radius: 6px; padding: 3px 10px; font-size: 12px; margin-top: 8px; }

/* جداول */
.compliance-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
.compliance-table th { background: #1a1a2e; color: #c8961a; padding: 8px 10px; text-align: right; border: 1px solid #2a2a4e; }
.compliance-table td { padding: 7px 10px; border: 1px solid #1a1a2e; }
.row-pass { background: rgba(34,197,94,0.05); }
.row-fail { background: rgba(239,68,68,0.08); }
.row-warning { background: rgba(245,158,11,0.06); }
.row-alt { background: #0d0d1a; }

.badge-pass { background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.badge-fail { background: #ef4444; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.badge-warning { background: #f59e0b; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.badge-na { background: #555; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }

/* أبعاد */
.dims-summary { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin: 12px 0; color: #aaa; font-size: 14px; }
.dims-summary strong { color: #c8961a; }

/* توصيات */
.recommendation-card { background: #1a1a2e; border: 1px solid #ef4444; border-radius: 8px; margin: 12px 0; overflow: hidden; }
.rec-header { background: rgba(239,68,68,0.1); padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.rec-num { background: #ef4444; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
.rec-body { padding: 12px 14px; line-height: 1.8; font-size: 13px; }
.rec-body p { margin-bottom: 4px; }

/* لقطات */
.screenshots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0; }
.screenshot-label { text-align: center; color: #888; font-size: 11px; margin-top: 6px; }

/* إخلاء */
.disclaimer-box { background: rgba(200,150,26,0.05); border: 1px solid #c8961a; border-radius: 8px; padding: 20px; line-height: 2; }
.disclaimer-box h3 { color: #c8961a; margin-bottom: 12px; }
.disclaimer-box p { margin-bottom: 8px; color: #ccc; }
.observations-list { padding-right: 20px; line-height: 2; }
.observations-list li { margin-bottom: 6px; }

@media print {
  body { background: white; color: black; }
  .page { background: white; border: none; margin: 0; min-height: auto; page-break-after: always; }
  .page-header, .page-footer { color: #555; }
  .section-title, .cover-title { color: #8a6010; }
  .compliance-table th { background: #f0f0f0; color: #333; }
}
</style>`;
  }
};
