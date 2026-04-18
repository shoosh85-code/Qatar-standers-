export const config = { runtime: 'nodejs' };

// ── Arabic → English engineering term map ────────────────────────────────────
const AR_EN = {
  'خرسانة':'concrete','اسمنت':'cement','حديد':'steel','تسليح':'reinforcement',
  'تغطية':'cover','أساس':'foundation','جدار':'wall','سقف':'slab','عمود':'column',
  'كمر':'beam','حفر':'excavation','ردم':'backfill','تربة':'soil','صرف':'drainage',
  'صرف صحي':'sewage','مياه':'water','كهرباء':'electrical','مجاري':'sewer',
  'طريق':'road','رصيف':'pavement','اسفلت':'asphalt','بلاط':'tiles',
  'ضغط':'pressure','مقاومة':'strength','ميلان':'slope','منسوب':'level',
  'مواصفات':'specifications','اشتراطات':'requirements','حد':'limit','أدنى':'minimum',
  'أقصى':'maximum','سماكة':'thickness','عرض':'width','ارتفاع':'height',
  'عمق':'depth','طول':'length','قطر':'diameter','مساحة':'area',
  'موقع':'site','مشروع':'project','مقاول':'contractor','استشاري':'consultant',
  'فحص':'inspection','اختبار':'test','جودة':'quality','ضبط':'control',
  'ماء':'water','صلابة':'hardness','نفاذية':'permeability','تمدد':'expansion',
  'انكماش':'shrinkage','تشقق':'cracking','تسرب':'leakage','عزل':'insulation',
  'حريق':'fire','أمان':'safety','حماية':'protection','ردة':'reaction',
  'قيس':'measurement','نسبة':'ratio','معامل':'coefficient',
  'كهرماء':'kahramaa','دفاع مدني':'civil defense','بلدية':'municipality',
};

function translateQuery(q) {
  let out = q;
  for (const [ar, en] of Object.entries(AR_EN))
    out = out.replace(new RegExp(ar, 'g'), en);
  return out;
}

function hasArabic(str) { return /[\u0600-\u06FF]/.test(str); }

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

  // Build combined query: translated + original arabic keywords
  const combinedQuery = isArabic ? `${qEn} ${q}`.trim() : q;

  // ── Try Supabase RPC (up to 3 strategies) ─────────────────────────────────
  async function callRPC(queryText, maxResults) {
    const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_qcs`, {
      method : 'POST',
      headers: {
        'apikey'       : SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({ query_text: queryText, max_results: maxResults }),
    });
    if (!rpc.ok) {
      const msg = await rpc.text().catch(() => `HTTP ${rpc.status}`);
      throw new Error(`Supabase ${rpc.status}: ${msg}`);
    }
    return rpc.json();
  }

  let results = [];
  let strategyUsed = '';

  try {
    // Strategy 1: combined (translated + arabic)
    const r1 = await callRPC(combinedQuery, limit);
    if (Array.isArray(r1) && r1.length > 0) {
      results = r1; strategyUsed = 'combined';
    } else {
      // Strategy 2: English-only
      const r2 = await callRPC(qEn, limit);
      if (Array.isArray(r2) && r2.length > 0) {
        results = r2; strategyUsed = 'english';
      } else {
        // Strategy 3: original query as-is
        const r3 = await callRPC(q, limit);
        results = Array.isArray(r3) ? r3 : [];
        strategyUsed = 'original';
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message, results: [] });
  }

  // ── Normalize fields (handles different Supabase RPC return shapes) ────────
  const normalized = results.map(r => ({
    id        : r.id,
    content   : r.content   || r.chunk_text || r.text        || '',
    source    : r.source_file || r.source   || r.file_name   || '',
    section   : r.section_num
                ? `${r.section_num}${r.section_name ? ' — ' + r.section_name : ''}`
                : (r.section || r.title || null),
    page      : r.page_num  || r.page       || null,
    similarity: r.similarity || r.score     || r.rank        || null,
  }));

  return res.status(200).json({
    results : normalized,
    count   : normalized.length,
    strategy: strategyUsed,
    query_used: combinedQuery,
  });
}
