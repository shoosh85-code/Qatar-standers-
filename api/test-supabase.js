// api/test-supabase.js — v3: raw source_file names
export const config = { runtime: 'edge' };
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req) {
  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return Response.json({ error: 'Supabase env vars missing' }, { headers: CORS });

  const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };

  const searches = {
    crack: 'crack', cement: 'cement', cube: 'cube',
    temperature: 'temperature', asphalt: 'asphalt',
    reinforcement: 'reinforcement', drainage: 'drainage',
  };

  const results = {};
  for (const [label, term] of Object.entries(searches)) {
    const r = await fetch(
      `${url}/rest/v1/qcs_chunks?content=ilike.*${term}*&select=source_file,page_num,content&limit=2&order=page_num.asc`,
      { headers }
    );
    if (r.ok) {
      const d = await r.json();
      results[label] = (Array.isArray(d) ? d : []).map(c => ({
        file: c.source_file,          // الاسم الكامل
        page: c.page_num,
        preview: (c.content || '').slice(0, 80)
      }));
    }
  }

  return Response.json(results, { headers: CORS });
}
