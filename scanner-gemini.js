window.ScannerGemini = (function() {
  'use strict';

  const ENDPOINT = '/api/vision-proxy';

  // ── البرومت الهندسي الدقيق ────────────────────────────────
  const SYSTEM_PROMPT = `أنت مساعد هندسي متخصص في تحليل صور المباني وفق معايير QCS 2024.
مهمتك: تحليل الصورة واستخراج أبعاد الغرفة بدقة.

قواعد صارمة:
1. أعد JSON فقط — لا نص قبله ولا بعده
2. استخدم المرجع المرئي في الصورة (باب=2.1م، نافذة=1.2م) لحساب النسب
3. إذا لم تستطع تحديد بُعد، ضع null وليس رقماً مخترعاً
4. الدقة المتوقعة ±15سم — وضح ذلك في confidence

JSON المطلوب:
{
  "name": "اسم الغرفة بالعربية",
  "length": 0.0,
  "width": 0.0,
  "height": 0.0,
  "doors": [{"w": 0.9, "h": 2.1}],
  "windows": [{"w": 1.2, "h": 1.0}],
  "confidence": 0.0,
  "qcs_min_area": 0.0,
  "qcs_ref": "QCS 2024 — Part 3, Section X.X",
  "notes": "ملاحظات إن وجدت"
}

أسماء الغرف المعتمدة: غرفة المعيشة، غرفة النوم الرئيسية، غرفة النوم، المطبخ، الحمام، دورة المياه، الردهة، الممر، غرفة الغسيل، المخزن، الغرفة الخارجية`;

  // ── إرسال للتحليل ─────────────────────────────────────────
  async function analyze(base64Image) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          prompt: SYSTEM_PROMPT
        })
      });

      if (res.status === 429) {
        const retry = res.headers.get('Retry-After') || 60;
        window.QS3D.log('⏳ Rate limit — انتظر ' + retry + ' ثانية');
        return null;
      }

      if (!res.ok) {
        window.QS3D.log('❌ API خطأ: ' + res.status);
        return null;
      }

      const data = await res.json();
      const text = (data.text || '').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);

      // التحقق من صحة البيانات
      if (!parsed.length || !parsed.width || !parsed.height) {
        window.QS3D.log('⚠️ Gemini: بيانات غير مكتملة للغرفة');
        return null;
      }

      // إضافة المساحة الدنيا QCS إذا لم تُحدد
      if (!parsed.qcs_min_area) {
        parsed.qcs_min_area = getQCSMinArea(parsed.name);
      }

      return parsed;

    } catch (err) {
      window.QS3D.log('❌ تحليل Gemini: ' + err.message.slice(0, 60));
      return null;
    }
  }

  // ── الحدود الدنيا للمساحة حسب QCS 2024 ──────────────────
  function getQCSMinArea(roomName) {
    const limits = {
      'غرفة المعيشة':         20.0,
      'غرفة النوم الرئيسية':  12.0,
      'غرفة النوم':            9.0,
      'المطبخ':                 8.0,
      'الحمام':                 4.5,
      'دورة المياه':            1.8,
      'الردهة':                 0.0,
      'الممر':                  0.0
    };
    return limits[roomName] || 0;
  }

  return { analyze, getQCSMinArea };
})();
