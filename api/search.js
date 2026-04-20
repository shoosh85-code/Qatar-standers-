// api/search.js
const ALLOWED_ORIGIN = 'https://qatar-standers.vercel.app';
const BODY_LIMIT = 50 * 1024;

function setCORS(req, res) {
  const origin = req.headers.origin;
  if (origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  setCORS(req, res);

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const cl = parseInt(req.headers['content-length'] || '0', 10);
  if (cl > BODY_LIMIT)
    return res.status(413).json({ error: 'الطلب كبير جداً', code: 'PAYLOAD_TOO_LARGE' });

  const { query, section, category } = req.body || {};

  if (!query || typeof query !== 'string' || query.trim().length < 2)
    return res.status(400).json({ error: 'الرجاء إدخال كلمة البحث', code: 'INVALID_INPUT' });

  const q = query.trim().toLowerCase();

  // ── Static QCS 2024 index ──────────────────────────────────────────────────
  const QCS_DATA = [
    {
      section: 'Section 05', part: 'Part 04', clause: '4.3.1',
      topic: 'concrete cover reinforcement',
      ar: 'الغطاء الخرساني للحديد',
      answer: 'الغطاء الخرساني: الأساسات الملامسة للتربة = 75mm، فوق Blinding = 50mm، الأعمدة والجدران = 35mm (بيئة معتدلة). (QCS 2024 — Section 05, Part 04, Clause 4.3.1)'
    },
    {
      section: 'Section 06', part: 'Part 02', clause: '2.4',
      topic: 'subbase compaction ratio proctor',
      ar: 'نسبة دمك السبيس subbase',
      answer: 'نسبة الدمك للـ Subbase: لا تقل عن 100% من Modified Proctor (AASHTO T-180). اختبار كل 500m² أو حسب تعليمات المهندس المشرف. (QCS 2024 — Section 06, Part 02, Clause 2.4)'
    },
    {
      section: 'Section 06', part: 'Part 02', clause: '2.3',
      topic: 'CBR subbase minimum value',
      ar: 'CBR للسبيس',
      answer: 'CBR minimum للـ Subbase: ≥ 25% عند 98% Modified Proctor. يُختبر وفق BS 1377 أو AASHTO T193. (QCS 2024 — Section 06, Clause 2.3)'
    },
    {
      section: 'Section 08', part: 'Part 03', clause: '3.2',
      topic: 'pressure test pipe water hydrostatic',
      ar: 'اختبار ضغط المواسير',
      answer: 'ضغط الاختبار = 1.5 × PN لمدة ساعتين. الهبوط المسموح: ≤ 0.5 bar. يُطبَّق على كل شبكة قبل الردم. (QCS 2024 — Section 08, Clause 3.2)'
    },
    {
      section: 'Section 05', part: 'Part 05', clause: '5.1',
      topic: 'hot weather concreting temperature cement ice',
      ar: 'صب الخرسانة في الحر',
      answer: 'درجة حرارة الخرسانة عند الصب: ≤ 32°C. استخدم الثلج أو الماء البارد. توقف الصب إذا تجاوزت درجة الهواء 40°C. (QCS 2024 — Section 05, Part 05, Clause 5.1)'
    },
    {
      section: 'Section 05', part: 'Part 03', clause: '3.1',
      topic: 'rebar lap splice length overlap',
      ar: 'طول وصل حديد التسليح',
      answer: 'طول الوصل الأدنى: 40× قطر الحديد للمناطق العادية، 50× للمناطق الزلزالية. لا يُسمح بأكثر من 50% من القضبان موصولة في مقطع واحد. (QCS 2024 — Section 05, Clause 3.1)'
    },
    {
      section: 'Section 06', part: 'Part 03', clause: '3.4',
      topic: 'asphalt laying temperature paving roller',
      ar: 'درجة حرارة فرد الإسفلت',
      answer: 'درجة فرد الإسفلت: 130–160°C. درجة الدمك لا تقل عن 110°C. عدد مرات الدمك: 6-8 مرات على الأقل بـ Roller. (QCS 2024 — Section 06, Part 03, Clause 3.4)'
    },
    {
      section: 'Section 06', part: 'Part 01', clause: '1.3',
      topic: 'subgrade compaction fill embankment',
      ar: 'دمك الساب جريد subgrade',
      answer: 'نسبة الدمك للـ Subgrade: ≥ 95% من Modified Proctor في الطبقة العليا (300mm). ≥ 90% للطبقات الأعمق. (QCS 2024 — Section 06, Part 01, Clause 1.3)'
    },
    {
      section: 'Section 05', part: 'Part 02', clause: '2.1',
      topic: 'concrete grade strength mix design',
      ar: 'درجات الخرسانة',
      answer: 'الحد الأدنى لقوة الخرسانة: الأساسات = C30، الأعمدة = C35، الجسور = C40. نسبة الماء للسمنت w/c: ≤ 0.45 لبيئة البحر. (QCS 2024 — Section 05, Part 02, Clause 2.1)'
    },
    {
      section: 'Section 05', part: 'Part 06', clause: '6.2',
      topic: 'pile load test static kentledge',
      ar: 'اختبار الخوازيق load test',
      answer: 'اختبار الحمل الساكن للخوازيق: 1.5× حمل التصميم. مدة الاختبار: 24 ساعة على الأقل. يُطبَّق على 1% من إجمالي الخوازيق أو خازوق واحد بالحد الأدنى. (QCS 2024 — Section 05, Clause 6.2)'
    },
  ];

  // ── Search logic ────────────────────────────────────────────────────────────
  const results = QCS_DATA.filter(item => {
    const searchIn = `${item.topic} ${item.ar} ${item.answer} ${item.section} ${item.clause}`.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 1);
    return words.some(word => searchIn.includes(word));
  });

  if (results.length > 0) {
    return res.status(200).json({
      results: results.slice(0, 3),
      total: results.length,
      query: query.trim(),
      source: 'QCS 2024 — Static Index',
    });
  }

  return res.status(200).json({
    results: [],
    total: 0,
    query: query.trim(),
    source: 'QCS 2024 — Static Index',
    message: `لم يُعثر على نتيجة لـ "${query.trim()}" في الفهرس السريع. جرّب كلمات مفتاحية مختلفة.`,
  });
}
