// api/test-supabase.js — اكتشاف الـ Parts المتاحة في qcs_chunks
export const config = { runtime: 'edge' };
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req) {
  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return Response.json({ error: 'Supabase env vars missing' }, { headers: CORS });

  const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };

  // 1. قائمة كل source_file مع عدد الـ chunks
  const r1 = await fetch(
    `${url}/rest/v1/qcs_chunks?select=source_file&order=source_file.asc`,
    { headers: { ...headers, 'Range': '0-0', 'Prefer': 'count=exact' } }
  );

  const r2 = await fetch(
    `${url}/rest/v1/rpc/get_source_files`,
    { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: '{}' }
  );

  // fallback: ILIKE per part
  const parts = ['Part1','Part2','Part3','Part4','Part5','Part6','Part7','Part8',
                  'Part9','Part10','Part11','Part12','Part13','Part14','Part15',
                  'Part16','Part17','Part18','Part19','Part20'];
  const found = {};
  for (const p of parts) {
    const r = await fetch(
      `${url}/rest/v1/qcs_chunks?source_file=ilike.*${p}*&select=id&limit=1`,
      { headers }
    );
    if (r.ok) {
      const d = await r.json();
      if (Array.isArray(d) && d.length > 0) found[p] = true;
    }
  }

  // 2. بحث عن كلمات مفتاحية لكل module
  const searches = {
    ncr_crack:    'crack repair defect',
    mar_cement:   'cement approval submittal',
    tests_cube:   'compressive strength cube',
    pour_temp:    'temperature placing fresh',
    dwr_report:   'daily work report',
    road_asphalt: 'asphalt bitumen pavement',
    steel_rebar:  'reinforcement steel bar',
  };
  const moduleHits = {};
  for (const [label, term] of Object.entries(searches)) {
    const r = await fetch(
      `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(term)}*&select=source_file,page_num&limit=3&order=page_num.asc`,
      { headers }
    );
    if (r.ok) {
      const d = await r.json();
      moduleHits[label] = (Array.isArray(d) ? d : []).map(c => `${c.source_file} p.${c.page_num}`);
    }
  }

  return Response.json({ partsFound: Object.keys(found), moduleHits }, { headers: CORS });
}
