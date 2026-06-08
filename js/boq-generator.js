window.QS = window.QS || {};

window.QS.boqGenerator = {

  generate(bp) {
    const rows = this.buildRows(bp);
    const html = this.renderTable(rows, bp);
    this.showBOQModal(html, rows, bp);
  },

  buildRows(bp) {
    const rows = [];
    let itemNo = 1;

    // من المساحات والأحجام
    if (bp.areas?.length) {
      bp.areas.forEach(a => {
        if (a.volume > 0) {
          rows.push({
            item: itemNo++,
            description_ar: `خرسانة — ${a.label}`,
            description_en: `Concrete — ${a.label}`,
            qty: a.volume,
            unit: 'm³',
            qcs_ref: 'QCS 2024 Part 5 Sec 7',
            type: 'concrete'
          });
        }
        if (a.area > 0) {
          rows.push({
            item: itemNo++,
            description_ar: `مساحة — ${a.label}`,
            description_en: `Area — ${a.label}`,
            qty: a.area,
            unit: 'm²',
            qcs_ref: 'QCS 2024 Part 5',
            type: 'area'
          });
        }
      });
    }

    // من العناصر الإنشائية
    if (bp.structural_elements?.length) {
      bp.structural_elements.forEach(el => {
        const vol = ((el.width || 0) * (el.depth || 0) * (el.length || 0) * (el.count || 1));
        if (vol > 0) {
          rows.push({
            item: itemNo++,
            description_ar: `${this.translateType(el.type)} ${el.id || ''} — خرسانة`,
            description_en: `${el.type} ${el.id || ''} — Concrete`,
            qty: Math.round(vol * 100) / 100,
            unit: 'm³',
            qcs_ref: 'QCS 2024 Part 5 Sec 7',
            type: 'concrete'
          });

          // تسليح تقديري 100kg/m³
          rows.push({
            item: itemNo++,
            description_ar: `${this.translateType(el.type)} ${el.id || ''} — حديد تسليح (تقديري)`,
            description_en: `${el.type} ${el.id || ''} — Rebar (estimated)`,
            qty: Math.round(vol * 100),
            unit: 'kg',
            qcs_ref: 'QCS 2024 Part 5 Sec 7 Cl 7.8',
            type: 'rebar',
            note: 'تقديري 100kg/m³ — يجب مراجعة مخططات التسليح'
          });
        }
      });
    }

    // من المواد
    if (bp.materials?.length) {
      bp.materials.forEach(m => {
        if (m.type === 'tiles' || m.type === 'بلاط') {
          const area = bp.areas?.reduce((sum, a) => sum + (a.area || 0), 0) || 0;
          if (area > 0) {
            rows.push({
              item: itemNo++,
              description_ar: `بلاط — ${m.location || m.grade || ''}`,
              description_en: `Tiles — ${m.location || m.grade || ''}`,
              qty: Math.round(area * 1.05 * 100) / 100,
              unit: 'm²',
              qcs_ref: 'QCS 2024 Part 5',
              type: 'tiles',
              note: 'يشمل 5% هدر'
            });
          }
        }
      });
    }

    return rows;
  },

  translateType(type) {
    const map = {
      column: 'عمود', beam: 'كمرة', slab: 'بلاطة',
      wall: 'جدار', footing: 'قاعدة', staircase: 'درج'
    };
    return map[type] || type;
  },

  renderTable(rows, bp) {
    if (!rows.length) return '<p style="text-align:center;color:var(--color-text-secondary)">لم يتم استخراج كميات كافية من المخطط</p>';

    const projectName = bp.project?.name || 'مشروع QatarSpec';
    const today = new Date().toLocaleDateString('ar-QA');

    return `
      <div class="boq-header" dir="rtl">
        <div class="boq-logo">QatarSpec Pro</div>
        <div class="boq-meta">
          <strong>${projectName}</strong><br>
          <span>جدول الكميات — ${today}</span><br>
          <span>المرجع: QCS 2024 | أشغال قطر</span>
        </div>
      </div>
      <table class="boq-table" dir="rtl">
        <thead>
          <tr>
            <th>#</th>
            <th>الوصف</th>
            <th>Description</th>
            <th>الكمية</th>
            <th>الوحدة</th>
            <th>مرجع QCS</th>
            <th>ملاحظة</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr class="boq-row-${r.type}">
              <td>${r.item}</td>
              <td>${r.description_ar}</td>
              <td>${r.description_en}</td>
              <td><strong>${r.qty}</strong></td>
              <td>${r.unit}</td>
              <td><small>${r.qcs_ref}</small></td>
              <td><small>${r.note || ''}</small></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div class="boq-disclaimer">
        ⚠️ هذا الجدول استرشادي. يجب مراجعة المهندس المختص والتحقق من QCS 2024 قبل التطبيق.
      </div>`;
  },

  showBOQModal(html, rows, bp) {
    let modal = document.getElementById('boq-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'boq-modal';
      modal.className = 'boq-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="boq-modal-content" dir="rtl">
        <div class="boq-modal-toolbar">
          <span>جدول الكميات</span>
          <div class="boq-modal-actions">
            <button onclick="window.QS.boqGenerator.exportExcel()" class="boq-btn">
              <i class="ti ti-file-spreadsheet"></i> Excel
            </button>
            <button onclick="window.QS.boqGenerator.exportPDF()" class="boq-btn">
              <i class="ti ti-file-type-pdf"></i> PDF
            </button>
            <button onclick="document.getElementById('boq-modal').hidden=true" class="boq-btn-close">
              <i class="ti ti-x"></i>
            </button>
          </div>
        </div>
        <div class="boq-modal-body">${html}</div>
      </div>`;

    modal.hidden = false;
    this._lastRows = rows;
    this._lastBP = bp;
  },

  exportExcel() {
    if (!this._lastRows?.length) return;
    const bp = this._lastBP;

    const headers = ['#', 'الوصف', 'Description', 'الكمية', 'الوحدة', 'مرجع QCS', 'ملاحظة'];
    const csvRows = [
      [`QatarSpec Pro — جدول الكميات`],
      [`المشروع: ${bp.project?.name || ''}`],
      [`التاريخ: ${new Date().toLocaleDateString('ar-QA')}`],
      [],
      headers,
      ...this._lastRows.map(r => [
        r.item, r.description_ar, r.description_en,
        r.qty, r.unit, r.qcs_ref, r.note || ''
      ])
    ];

    const csv = csvRows.map(row =>
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOQ_${bp.project?.name || 'QatarSpec'}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    window.QS.showToast('تم تصدير Excel بنجاح', 'success');
  },

  exportPDF() {
    const body = document.querySelector('.boq-modal-body');
    if (!body) return;
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html dir="rtl"><head>
      <meta charset="UTF-8">
      <title>BOQ — QatarSpec Pro</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; direction: rtl; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: right; }
        th { background: #1a5276; color: white; }
        .boq-disclaimer { margin-top: 16px; font-size: 11px; color: #888; }
        .boq-header { margin-bottom: 12px; }
        @media print { button { display: none; } }
      </style>
    </head><body>${body.innerHTML}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  }
};
