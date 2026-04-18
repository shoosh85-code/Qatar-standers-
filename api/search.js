export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query, limit = 8 } = req.body || {};
  if (!query || query.trim().length < 2)
    return res.status(400).json({ error: 'Query too short' });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY)
    return res.status(500).json({ error: 'Missing env vars' });

  try {
    const params = new URLSearchParams({
      select: 'id,content,source_file,section_num,section_name,page_num',
      limit: String(limit),
    });
    params.append('fts', `plfts.${query.trim()}`);

    const url = `${SUPABASE_URL}/rest/v1/qcs_chunks?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation',
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    const rows = JSON.parse(text);

    return res.status(200).json({
      results: rows.map(r => ({
        id: r.id,
        content: r.content,
        source: r.source_file,
        section: r.section_num ? `${r.section_num} — ${r.section_name || ''}` : null,
        page: r.page_num,
      })),
      count: rows.length,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
