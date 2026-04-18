export const config = { runtime: 'nodejs' };

// ── Arabic → English term mapping ─────────────────────────────────────────────
// يُترجم المصطلحات العربية الشائعة إلى مكافئاتها الإنجليزية في QCS
const AR_EN_MAP = [
  // طرق
  [/خرسان[ةه]/g,          'concrete'],
  [/إسفلت|اسفلت|أسفلت/g,  'asphalt'],
  [/تسليح|حديد/g,          'rebar reinforcement'],
  [/سابجريد|سابجرايد/g,    'subgrade'],
  [/سابيس|سابيز/g,         'subbase'],
  [/طبق[ةه] أساس/g,        'base course'],
  [/بريم كوت|بريم/g,       'prime coat'],
  [/تاك كوت|تاك/g,         'tack coat'],
  [/بيندر/g,               'binder course'],
  [/ويرنج/g,               'wearing course'],
  [/طريق|طرق|رصف/g,        'road pavement'],
  [/جرادينج|تدرج/g,        'grading gradation'],
  [/ضغط|كومباكشن/g,        'compaction'],
  [/بروكتور/g,             'proctor'],
  [/سي بي آر|cbr/gi,       'CBR'],
  // خرسانة
  [/خلط[ةه]/g,             'mix design'],
  [/سلامب|هبوط/g,          'slump'],
  [/مكعب|مكاعيب/g,         'cube test'],
  [/معالج[ةه]|كيورنج/g,    'curing'],
  [/صب|سكب/g,              'pouring casting'],
  [/غطاء|كفر/g,            'cover concrete'],
  [/لاب لنث|وصل[ةه]/g,     'lap length splice'],
  [/شدات|قالب/g,           'formwork'],
  // أساسات
  [/أساسات|أساس/g,         'foundation'],
  [/خوازيق|خازوق/g,        'piles pile'],
  [/لبش[ةه]|رافت/g,        'raft'],
  [/تحمل التربة/g,         'bearing capacity'],
  // جيوتكنيك
  [/تربة/g,                'soil'],
  [/جسات|بورهول/g,         'borehole investigation SPT'],
  [/مياه جوفي[ةه]/g,       'groundwater'],
  [/كبريتات/g,             'sulphate'],
  [/سبخ[ةه]/g,             'sabkha'],
  // مياه وصرف
  [/مياه الشرب/g,          'water supply potable'],
  [/صرف صحي/g,             'foul sewer sewage'],
  [/صرف سطحي/g,            'storm water drainage'],
  [/مياه معالج[ةه]/g,      'treated reclaimed water'],
  [/غرف[ةه] تفتيش|منهول/g, 'manhole inspection'],
  [/اختبار ضغط/g,          'pressure test hydrostatic'],
  [/تعقيم|كلور/g,          'chlorination disinfection'],
  // حريق وكهرباء
  [/حريق|إطفاء/g,          'fire sprinkler'],
  [/إنذار|انذار/g,         'alarm detection'],
  [/هيدرانت/g,             'hydrant'],
  [/مرافق|شبكات/g,         'utilities services'],
  // عام
  [/اختبار|فحص/g,          'test inspection'],
  [/معيار|مواصف[ةه]/g,     'standard specification requirement'],
  [/جودة/g,                'quality control'],
  [/سماك[ةه]/g,            'thickness depth'],
  [/قطر/g,                 'diameter'],
  [/ميل|انحدار/g,          'slope gradient'],
];

function translateQuery(query) {
  let translated = query;
  for (const [pattern, replacement] of AR_EN_MAP) {
    translated = translated.replace(pattern, replacement);
  }
  // إذا ما تغيّر شيء (النص عربي بالكامل ومش موجود في الماب) — استخدم النص الأصلي
  return translated.trim();
}

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { query, limit = 8 } = req.body || {};
  if (!query || query.trim().length < 2)
    return res.status(400).json({ error: 'Query too short' });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY)
    return res.status(500).json({ error: 'Missing env vars: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY' });

  const originalQuery   = query.trim();
  const translatedQuery = translateQuery(originalQuery);

  // إذا الترجمة أنتجت نصاً مختلفاً — ابحث بالاثنين
  const isArabic        = /[\u0600-\u06FF]/.test(originalQuery);
  const searchTerms     = (isArabic && translatedQuery !== originalQuery)
    ? `${translatedQuery} ${originalQuery}`   // إنجليزي + عربي
    : originalQuery;

  try {
    const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_qcs`, {
      method: 'POST',
      headers: {
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        query_text:  searchTerms,
        max_results: Number(limit),
      }),
    });

    const text = await rpc.text();

    // إذا فشل الطلب بالنص المترجم — حاول بالنص الأصلي فقط
    if (!rpc.ok) {
      // محاولة ثانية بالنص الأصلي
      const rpc2 = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_qcs`, {
        method: 'POST',
        headers: {
          'apikey':        SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          query_text:  originalQuery,
          max_results: Number(limit),
        }),
      });
      const text2 = await rpc2.text();
      if (!rpc2.ok) return res.status(500).json({ error: text2 });
      const results2 = JSON.parse(text2);
      return res.status(200).json(formatResults(results2));
    }

    const results = JSON.parse(text);

    // إذا النتائج صفر والاستعلام عربي — حاول بالنص الأصلي فقط
    if (results.length === 0 && isArabic && translatedQuery !== originalQuery) {
      const rpc3 = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_qcs`, {
        method: 'POST',
        headers: {
          'apikey':        SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          query_text:  translatedQuery,
          max_results: Number(limit),
        }),
      });
      if (rpc3.ok) {
        const text3  = await rpc3.text();
        const res3   = JSON.parse(text3);
        if (res3.length > 0) return res.status(200).json(formatResults(res3));
      }
    }

    return res.status(200).json(formatResults(results));

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// ── Format helper ─────────────────────────────────────────────────────────────
function formatResults(results) {
  return {
    results: results.map(r => ({
      id:      r.id,
      content: r.content,
      source:  r.source_file,
      section: r.section_num
        ? `${r.section_num}${r.section_name ? ' — ' + r.section_name : ''}`
        : null,
      page:    r.page_num,
      score:   r.rank,
    })),
    count: results.length,
  };
}
