/**
 * QatarSpec Pro — Server-Side PDF Export
 * المرحلة 10 | توليد PDF بـ PDFKit (server-side)
 * QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024
 */

import PDFDocument from 'pdfkit';
import { rateLimit, applyRateLimitHeaders } from './rate-limit.js';

// ألوان العلامة التجارية
const BRAND = {
  maroon: '#7A1515',
  gold:   '#C9A84C',
  dark:   '#1a1a1a',
  grey:   '#666666',
  white:  '#FFFFFF',
};

export default async function handler(request, response) {
  // POST فقط
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed — POST فقط' });
  }

  // ── Rate Limiting (Protocol 6) ──
  const isPro = request.headers['x-qs-pro'] === '1' || request.cookies?.qs_pro === '1';
  const tier = isPro ? 'pro' : 'free';
  const rl = await rateLimit(request, tier, 'ai-proxy');
  applyRateLimitHeaders(response, rl);
  if (!rl.allowed) {
    return response.status(429).json({
      error: 'Too many requests — حاول بعد قليل',
      retryAfter: rl.retryAfter
    });
  }

  try {
    const {
      title    = 'QatarSpec Report',
      content  = '',
      project  = '',
      engineer = '',
      date     = new Date().toLocaleDateString('en-GB'),
      section  = '',
      qcsRef   = '',
    } = request.body || {};

    // إنشاء الـ PDF Document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title:   title,
        Author:  'QatarSpec Pro',
        Subject: 'QCS 2024 Engineering Reference',
        Creator: 'qatar-standers.vercel.app',
      },
    });

    // ═══════════════════════════════════════
    // Header — خلفية حمراء + نص ذهبي
    // ═══════════════════════════════════════
    doc.rect(0, 0, 612, 65).fill(BRAND.maroon);

    doc.fillColor(BRAND.gold)
       .fontSize(22)
       .font('Helvetica-Bold')
       .text('QatarSpec Pro', 50, 18, { align: 'left' });

    doc.fillColor(BRAND.white)
       .fontSize(9)
       .font('Helvetica')
       .text('QCS 2024 Engineering Reference | qatar-standers.vercel.app', 50, 46, { align: 'left' });

    // ═══════════════════════════════════════
    // العنوان الرئيسي
    // ═══════════════════════════════════════
    doc.fillColor(BRAND.maroon)
       .fontSize(16)
       .font('Helvetica-Bold')
       .text(title, 50, 85, { align: 'right', width: 512 });

    // خط فاصل ذهبي
    doc.moveTo(50, 108).lineTo(562, 108).strokeColor(BRAND.gold).lineWidth(1.5).stroke();

    // ═══════════════════════════════════════
    // بيانات المشروع (Meta Table)
    // ═══════════════════════════════════════
    let yPos = 118;
    doc.fillColor(BRAND.dark).fontSize(9).font('Helvetica');

    const metaItems = [
      project  && ['Project / المشروع:', project],
      engineer && ['Engineer / المهندس:', engineer],
      date     && ['Date / التاريخ:', date],
      section  && ['Section / القسم:', section],
      qcsRef   && ['QCS Reference:', qcsRef],
    ].filter(Boolean);

    metaItems.forEach(([label, value]) => {
      doc.font('Helvetica-Bold').text(label, 50, yPos, { continued: true, width: 160 });
      doc.font('Helvetica').text(` ${value}`, { align: 'left' });
      yPos += 14;
    });

    if (metaItems.length > 0) {
      yPos += 6;
      doc.moveTo(50, yPos).lineTo(562, yPos).strokeColor('#DDDDDD').lineWidth(0.5).stroke();
      yPos += 12;
    }

    // ═══════════════════════════════════════
    // المحتوى الرئيسي
    // ═══════════════════════════════════════
    // تنظيف HTML tags
    const cleanContent = content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<li>/gi, '• ')
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    doc.fillColor(BRAND.dark)
       .fontSize(10)
       .font('Helvetica')
       .text(cleanContent, 50, yPos, {
         width: 512,
         align: 'justify',
         lineGap: 4,
       });

    // ═══════════════════════════════════════
    // Footer — أسفل كل صفحة
    // ═══════════════════════════════════════
    const pageCount = doc.bufferedPageRange().count || 1;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.rect(0, 810, 612, 32).fill(BRAND.maroon);
      doc.fillColor(BRAND.gold)
         .fontSize(7)
         .font('Helvetica')
         .text(
           `QatarSpec Pro — QCS 2024  |  qatar-standers.vercel.app  |  Page ${i + 1}`,
           50, 818, { align: 'center', width: 512 }
         );
    }

    // ═══════════════════════════════════════
    // إرسال الـ PDF
    // ═══════════════════════════════════════
    const safeTitle = title.replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '').replace(/\s+/g, '-');
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename="QatarSpec-${safeTitle}.pdf"`);
    response.setHeader('Cache-Control', 'no-cache');

    doc.pipe(response);
    doc.end();

  } catch (err) {
    console.error('export-pdf error:', err);
    response.status(500).json({
      error: 'PDF generation failed',
      detail: err.message,
    });
  }
}
