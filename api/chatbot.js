// api/chatbot.js — QatarSpec Pro Support Chatbot
// Vercel Serverless Function

const RATE_LIMIT = new Map();

const SYSTEM_PROMPT = `أنت مساعد دعم فني ذكي لتطبيق QatarSpec Pro — المنصة الهندسية الرقمية الأولى في قطر.

## هويتك:
- اسمك: QS Assistant
- تخصصك: مساعدة المهندسين في استخدام QatarSpec Pro
- لغتك: تكتشف لغة المستخدم تلقائياً وترد بنفس اللغة (عربي أو إنجليزي)
- شخصيتك: محترف، ودود، موجز، دقيق

## ميزات QatarSpec Pro التي تعرفها:

### 1. البحث الذكي (AI Search)
- بحث RAG في QCS 2024 الرسمي
- بحث نصي وصوتي بالعربي والإنجليزي
- رفع PDF حتى 50MB وتحليله
- أزرار اقتراح سريعة للمواضيع الشائعة
- النتائج مربوطة بـ Part/Section/Clause رسمي

### 2. المفتش الذكي (AI Inspector) — Pro
- التقط صورة من الموقع → تقرير مطابقة QCS فوري
- يفحص: دمك، غطاء خرساني، تسليح، إسفلت، تركيبات
- متاح فقط لمستخدمي Pro

### 3. محلل الوثائق (AI Analyzer) — Pro
- رفع عقد أو مواصفة → استخراج البنود تلقائياً
- مقارنة مع QCS 2024 واكتشاف التعارضات
- متاح فقط لمستخدمي Pro

### 4. محلل المخططات (AI Drawing) — Pro
- رفع Shop Drawings أو مقاطع طرق
- مراجعة مطابقة QCS/FIDIC تلقائياً

### 5. مولّد MOS/ITP — Pro
- 12 نوع نشاط (خرسانة، إسفلت، حفر، خوازيق...)
- Method Statement + ITP في 30 ثانية
- نقاط H/W/R/M تلقائية
- تصدير Excel بتنسيق Ashghal الرسمي

### 6. النماذج الميدانية
- RFI: طلب معلومات رسمي مع تتبع الرد
- NCR: عدم مطابقة مع تتبع الإغلاق
- DPR: تقرير يومي للمشروع
- IR: طلب فحص رسمي
- MAR: اعتماد مواد
- توقيع رقمي مدمج في كل النماذج

### 7. مركز الحاسبات (50+ حاسبة)
- حاسبة المباني: خرسانة + حديد + طابوق + بلاط
- Pass/Fail: 50+ اختبار ميداني مع مرجع QCS
- ESAL: تصميم الطرق AASHTO 1993
- Mix Design: Superpave + Marshall
- أقطار المواسير: Manning + Hazen-Williams
- حاسبة الحديد والغطاء: BS 8666

### 8. مركز المعدات (66 معدة)
- طرق: 17 معدة (Grader, Roller, Paver, NDG...)
- مرافق: 16 معدة
- إنشاء: 14 معدة
- جسات: 19 معدة
- كل معدة بمواصفات التشغيل الكاملة

### 9. Project Hub (لوحة المشاريع)
- إنشاء وإدارة مشاريع متعددة
- طلبات فحص IR مع ربط ITP
- اعتماد مواد MAR
- سجل NCR مع تتبع
- صور موقع مع Geolocation
- شهادات دفع IPC (FIDIC)

### 10. BOQ Pricer
- 259 بند في 12 قسم
- قالب National Housing Loans القطري
- أسعار السوق القطري الحالية
- Contingency % قابل للتعديل
- تصدير PDF + طباعة

### 11. البرنامج الزمني
- Gantt Chart تفاعلي
- Critical Path Method
- S-Curve + تدفق نقدي

### 12. المرجع الثابت (111+ قسم)
- بنية تحتية وطرق: QCS §S8 + QHDM
- شبكات مرافق: QCS §S20 + KAHRAMAA
- إنشاء: QCS §S5 + BS EN 1992
- جيوتقني: أساسات + خوازيق
- MEP: NFPA + KAHRAMAA + ASHRAE
- MMUP: اشتراطات البناء والتخطيط

### 13. التصدير
- PDF: ترويسة رسمية + QCS reference + توقيع رقمي
- Excel: تنسيق Ashghal الرسمي
- Word: مستندات رسمية ثنائية اللغة

### خطط الاشتراك:
- Free: 5 بحثات/يوم + حاسبات أساسية + مرجع ثابت
- Pro: 99 QAR/شهر — كل الميزات بلا حدود
- Enterprise: تواصل مباشر

### التثبيت PWA:
- iOS: Safari → Share → Add to Home Screen
- Android: Chrome → Install App
- يعمل Offline بعد التثبيت

## قواعد الرد:
1. اكتشف لغة المستخدم وارد بنفسها
2. كن موجزاً ومفيداً — لا تطوّل بدون سبب
3. إذا الميزة تحتاج Pro، وضّح ذلك بلطف
4. إذا السؤال خارج نطاق التطبيق، قل ذلك بوضوح
5. اقترح الميزة المناسبة للسؤال دائماً
6. لا تخترع معلومات — قل "لا أعرف" إذا لزم`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // ═══════════════════════════════════════════════════════════
  // SERVER KNOWLEDGE ENGINE — runs FIRST, NO rate limit
  // ═══════════════════════════════════════════════════════════
  const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
  const KB = [
    { k: ['مفتش','inspector','فحص صور','defect','كشف عيوب'], w: 5, r: '🔍 **المفتش الذكي (AI Site Inspector) — Pro:**\n\nأداة AI تحلل صور الموقع وتكشف مخالفات QCS 2024.\n\n1. افتح كرت "المفتش الذكي"\n2. التقط/ارفع صورة\n3. AI يكشف: تشققات، تعشيش، نزيف، هبوط\n4. تقرير فوري + مرجع QCS\n\n⚠️ Pro فقط (99 QAR/شهر)' },
    { k: ['itp','خطة فحص','inspection test','hold point','witness'], w: 5, r: '📋 **إنشاء ITP:**\n\n1. **مولّد المستندات** (Pro) → Wizard 5 خطوات\n2. **مولّد MOS/ITP** (Pro) → 9 مراحل QCS 2024\n3. **نماذج Ashghal** (مجاني) → تاب ITP\n\nH=Hold Point · W=Witness · R=Review · M=Monitor' },
    { k: ['محلل وثائق','محلل مستند','analyzer','تحليل عقد','document analy'], w: 5, r: '📄 **محلل الوثائق (Pro):** ارفع PDF (عقد/مواصفة) → AI يستخرج البنود ويقارنها مع QCS 2024.' },
    { k: ['محلل مخطط','drawing analy','تحليل رسم','رسومات','shop drawing'], w: 5, r: '📐 **محلل المخططات (Pro):** ارفع مخطط → AI يراجع أبعاد وتفاصيل حسب QCS 2024.' },
    { k: ['مولد مستند','doc generator','wizard','توليد'], w: 5, r: '📝 **مولّد المستندات (Pro):** Method Statement / ITP / NCR / DPR — Wizard 5 خطوات بمراجع QCS.' },
    { k: ['method statement','طريقة تنفيذ','طريقة عمل','mos','منهجية'], w: 5, r: '📋 **مولّد طريقة التنفيذ (مجاني):**\n12 نوع نشاط · النطاق · المعدات · الجودة · السلامة · مرجع QCS.\nافتح كرت "مولّد طريقة التنفيذ"' },
    { k: ['rfi','طلب معلومات','request for info'], w: 5, r: '📨 **RFI:** افتح "نماذج Ashghal" → تاب RFI → ترقيم تلقائي + واتساب + PDF' },
    { k: ['dpr','تقرير يومي','daily progress','daily report'], w: 5, r: '📊 **DPR:** افتح "نماذج Ashghal" → تاب DPR → عمالة + معدات + إنجاز + ملاحظات' },
    { k: ['ncr','مخالف','عدم مطابق','non conform'], w: 5, r: '🔴 **NCR:**\n• نموذج: "نماذج Ashghal" → تاب NCR\n• قاعدة بيانات: 1500+ تقرير عبر 9 تخصصات\nافتح "قاعدة بيانات NCR الشاملة"' },
    { k: ['نماذج','forms','نموذج','ashghal form'], w: 4, r: '📋 **نماذج Ashghal (مجاني):** RFI + NCR + DPR + ITP — ترقيم تلقائي + واتساب + PDF' },
    { k: ['حاسب','حاسبات','calculator','calc'], w: 4, r: '🧮 **8 حاسبات:** مواصفات Pass/Fail · مباني · ESAL · Mix Design · Pipe Sizing · Rebar Cover · Superpave · Marshall\nافتح "مركز الحاسبات"' },
    { k: ['مشروع','project','مشاريع','project hub'], w: 4, r: '📊 **لوحة المشاريع:** اضغط "📊 مشاريعي" — تقارير · فحص · مواد · NCR · BOQ · صور · IPC' },
    { k: ['boq','تسعير','كميات','bill of quantities'], w: 5, r: '💰 **BOQ:** افتح "💰 تسعير BOQ" — بنود + أسعار + إجمالي + تصدير Excel' },
    { k: ['تصدير','export','طباعة','print','تحميل'], w: 4, r: '📥 **التصدير:** PDF/Word/Excel من أي قسم. اضغط أيقونات PDF/DOC بالأعلى. (Pro للتصدير · الطباعة مجانية)' },
    { k: ['بحث','search','بحث ذكي','ai search'], w: 4, r: '🔍 **البحث الذكي:** اكتب سؤالك بالعربي أو الإنجليزي → AI يبحث في QCS 2024 الفعلي.\nFree: 5/يوم · Pro: غير محدود' },
    { k: ['معدات','equipment','آليات','grader','roller','paver','excavator'], w: 4, r: '🚜 **66 معدة:** طرق (8) · مرافق (16) · إنشاء (14) · جسات (19). كل معدة بالمواصفات + QCS/ASTM' },
    { k: ['execution hub','تنفيذ ميداني','pour card','بطاقة صب','mar','اعتماد مواد'], w: 5, r: '🏗️ **لوحة التنفيذ:** Pour Card + MAR + NCR + Pass/Fail + DWR + مساعد AI ميداني' },
    { k: ['work acceptance','استلام أعمال','قبول أعمال'], w: 5, r: '✅ **استلام الأعمال:** 13 نوع عمل × Checklist تفاعلي → Pass/Fail → PDF/Word' },
    { k: ['payment','دفع شهاد','ipc','retention','cash flow','s-curve'], w: 5, r: '💰 **IPC + Cash Flow (Pro):** FIDIC Cl.14 · Retention 10% · منحنى S · تدفق نقدي شهري' },
    { k: ['schedule','جدول زمني','gantt','برنامج زمني','critical path'], w: 5, r: '📅 **البرنامج الزمني (Pro):** Gantt + CPM + Float + منحنى S + تصدير Primavera' },
    // Content
    { k: ['طرق','road','asphalt','اسفلت','رصف','pavement','subgrade','subbase'], w: 4, r: '🛣️ **الطرق §S8:** Subgrade ≥95% · Subbase ≥95% · Base ≥98% · WC ≥98% Gmm. افتح كرت "أعمال الطرق"' },
    { k: ['مرافق','utilit','مياه','sewer','صرف','pipe','أنابيب','kahramaa'], w: 4, r: '🔧 **المرافق §S20:** مياه HDPE PN16 · صرف uPVC SN8 · أمطار RCP III · TSE بنفسجي. افتح كرت "شبكات المرافق"' },
    { k: ['خرسان','concrete','صب','cover','غطاء','curing','معالج','slump','cube','مكعب'], w: 4, r: '🏗️ **الخرسانة §S5:** C25 أساسات · C32 أعمدة · غطاء 25-50mm · معالجة ≥7 أيام · مكعب كل 50m³' },
    { k: ['تسليح','rebar','حديد','وصل','lap','stirrup','كان'], w: 4, r: '🔩 **التسليح §S5:** Lap شدّ ≥40φ · ضغط ≥30φ · كانات مغلقة 135° · BS 4449' },
    { k: ['أساس','foundation','خازوق','pile','raft','لبشة'], w: 4, r: '⚓ **الأساسات §S5-P7:** معزول/شريطي/لبشة/خوازيق. غطاء ≥50mm. PIT 100% عند الشك.' },
    { k: ['mep','كهرباء','electric','ميكانيك','حريق','fire','تكييف','سباك'], w: 4, r: '⚡ **MEP §S21:** كهرباء LV 415/240V · سباكة HDPE/PPR · إطفاء NFPA 13/72 · KAHRAMAA + QCDD' },
    { k: ['mmup','setback','coverage','نسبة بناء','far','parking','مواقف'], w: 4, r: '🏢 **MMUP:** Setback أمامي ≥6m · Coverage سكني ≤60% · FAR 1.5-3.0 · مواقف 1/وحدة سكنية' },
    { k: ['compaction','دمك','mdd','cbr','proctor','density','كثاف'], w: 4, r: '🔨 **الدمك §S8:** Subgrade ≥95% CBR≥8 · Subbase ≥95% CBR≥30 · Base ≥98% CBR≥80. NDG كل 500m²' },
    { k: ['test','فحص','اختبار ضغط','pressure test','تعقيم','disinfect','chlorin'], w: 3, r: '🧪 **اختبارات:** ضغط مياه 1.5×PN/2hr · تسرب صرف Air/Water · تعقيم ≥50ppm · CCTV إلزامي' },
    // Business
    { k: ['free','pro','فرق','مجاني','مدفوع','اشتراك','سعر','price','باقة','ترقي','كم','تكلف'], w: 3, r: '🆓 **Free:** 5 بحث/يوم · 111+ قسم · حاسبات · نماذج · مولّد MOS\n\n⭐ **Pro (99 QAR/شهر):** بحث غير محدود · تصدير · مفتش ذكي · محلل وثائق/مخططات · مولّد مستندات · IPC · Gantt\n\n✅ ضمان 7 أيام' },
    { k: ['ما هو','what is','عن التطبيق','about','تعريف'], w: 3, r: '🏗️ **QatarSpec Pro:** أكبر مرجع رقمي للمواصفات في قطر. 111+ قسم QCS + Ashghal + KAHRAMAA + MMUP + 8 حاسبات + AI + نماذج.' },
    { k: ['offline','بدون انترنت','pwa','تثبيت','install'], w: 4, r: '📲 **Offline:** المحتوى الثابت يعمل بدون إنترنت بعد أول زيارة. البحث الذكي يحتاج إنترنت. ثبّت من قائمة المتصفح.' },
    { k: ['لغة','language','english','عربي','تبديل'], w: 4, r: '🌐 اضغط "عربي / EN" أعلى يمين الصفحة — كل المحتوى ثنائي اللغة.' },
    { k: ['مشكل','خطأ','error','لا يعمل','مساعد','help','دعم','support'], w: 3, r: '🛠️ **دعم:** أعد تحميل الصفحة · جرّب Incognito · تأكد من الإنترنت.\nتواصل: info@qatarspec.com أو WhatsApp' },
    // Greetings
    { k: ['شكرا','thanks','ممتاز','رائع','عظيم','حلو','جميل','bravo','nice','good'], w: 2, r: '😊 العفو! لا تتردد بالسؤال في أي وقت — أنا هنا 24/7! 💪' },
    { k: ['مرحبا','hello','hi','هلا','السلام','اهلا','صباح','مساء','سلام','hey'], w: 2, r: 'مرحباً! 👋 أنا QS Assistant. يمكنني مساعدتك في: شرح الميزات · إنشاء ITP/NCR · معلومات QCS · الفرق بين الباقات · حل مشاكل. اسأل أي شيء! 🚀' },
    { k: ['باي','bye','مع السلامة','وداع','see you'], w: 2, r: 'مع السلامة! 👋 ارجع في أي وقت. بالتوفيق في مشروعك! 🇶🇦' }
  ];
  
  let bestMatch = null, bestScore = 0;
  for (const entry of KB) {
    const hits = entry.k.filter(k => lastMsg.includes(k)).length;
    if (hits > 0) {
      const score = hits * (entry.w || 1);
      if (score > bestScore) { bestScore = score; bestMatch = entry; }
    }
  }
  if (bestMatch) return res.status(200).json({ reply: bestMatch.r });

  // ── Rate limit ONLY for Gemini API calls (KB responses are unlimited) ──
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 30;
  if (!RATE_LIMIT.has(ip)) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    const limit = RATE_LIMIT.get(ip);
    if (now > limit.resetAt) {
      RATE_LIMIT.set(ip, { count: 1, resetAt: now + windowMs });
    } else if (limit.count >= maxRequests) {
      return res.status(200).json({
        reply: '⏳ وصلت الحد الأقصى من أسئلة AI المتقدمة (30/ساعة).\n\nيمكنك السؤال عن أي ميزة في التطبيق وسأجيبك فوراً!\n\nجرّب: "المفتش الذكي" أو "ITP" أو "الحاسبات" أو "Free vs Pro"'
      });
    } else {
      limit.count++;
    }
  }
  if (RATE_LIMIT.size > 500) {
    for (const [key, val] of RATE_LIMIT.entries()) {
      if (now > val.resetAt) RATE_LIMIT.delete(key);
    }
  }

  // Build Gemini request
  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Chatbot error: GEMINI_API_KEY not set');
      return res.status(500).json({
        error: 'config_error',
        reply: 'عذراً، إعداد الخادم غير مكتمل. يرجى التواصل مع الدعم.'
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            topP: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      const errBody = await response.text().catch(() => 'no body');
      console.error('Chatbot Gemini error:', response.status, errBody.substring(0, 200));
      
      if (response.status === 429) {
        return res.status(200).json({
          reply: '⏳ الخادم مشغول حالياً بسبب كثرة الطلبات. حاول مرة أخرى بعد دقيقة.\n\nفي الأثناء، يمكنك تصفح الأقسام والحاسبات مباشرة من الصفحة الرئيسية — كلها تعمل بدون AI! 🚀'
        });
      }
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً، حدث خطأ. حاول مرة أخرى.';

    return res.status(200).json({ reply: text });

  } catch (err) {
    console.error('Chatbot error:', err.message || err);
    return res.status(500).json({
      error: 'server_error',
      reply: 'عذراً، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'
    });
  }
}
