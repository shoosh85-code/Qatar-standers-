export const config = { runtime: 'nodejs' };

const AR_EN = {
  'خرسانة':'concrete','اسمنت':'cement','حديد':'steel rebar','تسليح':'reinforcement',
  'تغطية':'cover','غطاء':'cover','أساس':'foundation','جدار':'wall','سقف':'slab',
  'عمود':'column','كمر':'beam','حفر':'excavation','ردم':'backfill','تربة':'soil',
  'صرف صحي':'sewage drainage','مياه':'water','كهرباء':'electrical','مجاري':'sewer',
  'طريق':'road','رصيف':'pavement','اسفلت':'asphalt','بلاط':'tiles',
  'ضغط':'pressure','مقاومة':'compressive strength','ميلان':'slope','منسوب':'level',
  'سماكة':'thickness','عرض':'width','ارتفاع':'height','عمق':'depth',
  'طول':'length','قطر':'diameter','مساحة':'area','نسبة':'ratio',
  'فحص':'inspection','اختبار':'testing','جودة':'quality','ضبط جودة':'quality control',
  'نفاذية':'permeability','تمدد':'expansion','انكماش':'shrinkage','تشقق':'cracking',
  'تسرب':'leakage','عزل':'waterproofing insulation','حريق':'fire','أمان':'safety',
  'حماية':'protection','درجة':'grade','فئة':'class','تعرض':'exposure',
  'كهرماء':'kahramaa water','دفاع مدني':'civil defense fire','بلدية':'municipality',
  'cctv':'CCTV camera surveillance','كاميرا':'camera CCTV',
  'حد أدنى':'minimum','حد أقصى':'maximum','متطلبات':'requirements',
  'مواصفات':'specifications','اشتراطات':'requirements specifications',
};

function translateQuery(q) {
  let out = q;
  for (const [ar, en] of Object.entries(AR_EN))
    out = out.replace(new RegExp(ar, 'g'), en);
  return out;
}

function hasArabic(str) { return /[\u0600-\u06FF]/.test(str); }

// Deduplicate by content fingerprint (first 120 chars)
function deduplicate(results) {
  const seen = new Set();
  return results.filter(r => {
    const key = (r.content || '').trim().slice(0, 120);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { query, limit = 6 } = req.body || {};
  if (!query || query.trim().length < 2)
    return res.status(400).json({ error: 'Query too short' });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY)
    return res.status(500).json({ error: 'Missing Supabase env vars' });

  const q        = query.trim();
  const isArabic = hasArabic(q);
  const qEn      = isArabic ? translateQuery(q) : q;
  const combined = isArabic ? `${qEn} ${q}`.trim() : q;

  async function callRPC(queryText, maxResults) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_qcs`, {
      method : 'POST',
      headers: {
        'apikey'       : SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({ query_text: queryText, max_results: maxResults }),
    });
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
    return r.json();
  }

  let raw = [];
  try {
    // Strategy 1: combined query (translated + arabic)
    raw = await callRPC(combined, limit * 3); // fetch more then deduplicate
    if (!Array.isArray(raw) || raw.length === 0) {
      // Strategy 2: English only
      raw = await callRPC(qEn, limit * 3);
    }
    if (!Array.isArray(raw) || raw.length === 0) {
      // Strategy 3: original as-is
      raw = await callRPC(q, limit * 3);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message, results: [] });
  }

  // Normalize fields
  const normalized = (raw || []).map(r => ({
    id        : r.id,
    content   : r.content   || r.chunk_text || r.text        || '',
    source    : r.source_file || r.source   || r.file_name   || '',
    section   : r.section_num
                  ? `${r.section_num}${r.section_name ? ' — ' + r.section_name : ''}`
                  : (r.section || r.title || null),
    page      : r.page_num  || r.page       || null,
    similarity: r.similarity || r.score     || r.rank        || null,
  }));

  // Deduplicate + limit
  const results = deduplicate(normalized).slice(0, limit);

  return res.status(200).json({ results, count: results.length });
}
