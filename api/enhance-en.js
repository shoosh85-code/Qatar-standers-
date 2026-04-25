// enhance-en: Pull real English content from QCS 2024 PDFs in Supabase
// Uses vector search to find relevant English text, then Gemini to format it

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
  });

  const { section_key = 'unknown', ar_content = '' } = body;
  if (!ar_content || ar_content.length < 30) {
    return res.status(400).json({ error: 'No content' });
  }

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!SUPA_URL || !SUPA_KEY || !GEMINI_KEY) {
    return res.status(503).json({ error: 'Missing env vars' });
  }

  // Step 1: Extract key terms from section_key to search QCS PDFs
  const searchTerms = {
    'roads': 'road construction pavement asphalt subgrade compaction',
    'subgrade': 'subgrade formation compaction CBR density',
    'subbase': 'subbase granular Type B CBR compaction',
    'base': 'road base course aggregate compaction',
    'binder': 'binder course asphalt AC20 temperature density',
    'wearing': 'wearing course AC14 asphalt IRI smoothness temperature',
    'prime': 'prime coat tack coat bitumen application rate',
    'finishing': 'road finishing road markings kerb reinstatement',
    'handover': 'project handover as-built documentation defects',
    'utilities': 'utilities networks water supply sewer drainage',
    'water_supply_stages': 'water supply pipe laying pressure test chlorination',
    'sewer_stages': 'foul sewer pipe laying air test CCTV inspection',
    'structural': 'reinforced concrete structural works construction',
    'concrete_full': 'concrete mix design placing curing testing',
    'rebar_full': 'reinforcement steel bar fixing cover lap length',
    'geotech': 'geotechnical investigation borehole SPT soil testing',
    'itp_concrete': 'concrete inspection test plan ITP hold witness',
    'itp_structural': 'structural concrete ITP inspection plan',
    'marshall_mix': 'Marshall mix design stability flow air voids asphalt',
  };

  const query = searchTerms[section_key] || section_key.replace(/_/g, ' ') + ' QCS Qatar specifications';

  try {
    // Step 2: Search Supabase via FTS (keyword search — no embedding needed)
    let qcsChunks = [];
    const keyword = query.split(' ').slice(0, 2).join(' ');
    const ftsRes = await fetch(
      `${SUPA_URL}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(keyword)}*&select=content,source_file,section_name,page_num&limit=6&order=char_count.desc`,
      { 
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` },
        signal: AbortSignal.timeout(8000)
      }
    );
    if (ftsRes.ok) qcsChunks = await ftsRes.json();

    // Step 4: Build context from real QCS PDF text
    const qcsContext = qcsChunks.length > 0
      ? qcsChunks.map((c, i) =>
          `[QCS Source ${i+1}: ${(c.source_file||'').replace(/Copy of /g,'')} | ${c.section_name||''} | p.${c.page_num||'?'}]\n${(c.content||'').slice(0,600)}`
        ).join('\n\n')
      : '';

    // Step 5: Use Gemini to format QCS content into structured HTML
    const prompt = `You are formatting Qatar QCS 2024 content for an engineering reference app.

Section: "${section_key}"

Real QCS 2024 source text (English, from official PDFs):
${qcsContext || 'No direct QCS text found — use your QCS 2024 knowledge for this section.'}

Task: Create a well-structured HTML section in English that:
1. Uses the real QCS 2024 text above as primary source
2. Formats it as tables, numbered lists, and clear paragraphs
3. Highlights key values (Pass/Fail criteria, limits, tolerances)
4. References exact QCS Part/Section/Clause numbers
5. Adds Hold Points (HP) and Witness Points (WP) where applicable

Return ONLY the HTML content (no outer div wrapper). Use dm-table CSS class for tables.`;

    const genRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.1 }
        }),
        signal: AbortSignal.timeout(25000)
      }
    );

    const genData = await genRes.json();
    if (!genRes.ok) {
      return res.status(502).json({ error: genData?.error?.message, status: genRes.status });
    }

    const text = genData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log(`[enhance-en] ${section_key}: ${qcsChunks.length} QCS chunks found, ${text.length} chars generated`);

    return res.status(200).json({
      enhanced: text,
      key: section_key,
      qcs_chunks_used: qcsChunks.length,
      sources: qcsChunks.map(c => c.source_file).filter(Boolean).slice(0,3)
    });

  } catch(e) {
    console.error('[enhance-en]', e.message);
    return res.status(500).json({ error: e.message });
  }
}
