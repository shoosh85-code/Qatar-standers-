// QatarSpec Pro — QCS 2024 Full-Text Search
// Searches 18,465 chunks from real QCS 2024 PDFs stored in Supabase
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { query, limit = 5 } = req.body || {};
  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: 'Query too short' });
  }

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!URL || !KEY) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    // Clean query for FTS — remove Arabic diacritics, normalize spaces
    const cleanQuery = query.trim()
      .replace(/[\u064B-\u065F]/g, '') // remove Arabic diacritics
      .replace(/\s+/g, ' & ')          // AND between words for FTS
      .replace(/[^\u0600-\u06FFa-zA-Z0-9& ]/g, ''); // keep Arabic + Latin + &

    // Try FTS first
    let chunks = [];
    const ftsRes = await fetch(
      `${URL}/rest/v1/qcs_chunks?fts=fts.${encodeURIComponent(cleanQuery)}&select=id,source_file,section_name,part_name,page_num,content,char_count&limit=${limit}&order=char_count.desc`,
      { headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` } }
    );

    if (ftsRes.ok) {
      chunks = await ftsRes.json();
    }

    // Fallback: ILIKE search if FTS returns nothing
    if (!chunks.length) {
      const words = query.trim().split(/\s+/).slice(0, 3);
      const likeQuery = words.map(w => `content.ilike.*${w}*`).join(',');
      const likeRes = await fetch(
        `${URL}/rest/v1/qcs_chunks?or=(${likeQuery})&select=id,source_file,section_name,part_name,page_num,content,char_count&limit=${limit}&order=char_count.desc`,
        { headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` } }
      );
      if (likeRes.ok) chunks = await likeRes.json();
    }

    if (!chunks.length) {
      return res.status(200).json({ results: [], query, message: 'لم يتم العثور على نتائج في QCS 2024' });
    }

    // Format results
    const results = chunks.map(c => ({
      id: c.id,
      source: c.source_file?.replace('Copy of Copy of ', '').replace('Copy of ', ''),
      section: c.section_name,
      part: c.part_name,
      page: c.page_num,
      content: c.content,
      preview: c.content?.slice(0, 300) + (c.content?.length > 300 ? '...' : '')
    }));

    return res.status(200).json({ results, query, count: results.length });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
