// api/test-supabase.js — v2: single keyword search
export const config = { runtime: 'edge' };
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req) {
  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return Response.json({ error: 'Supabase env vars missing' }, { headers: CORS });

  const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };

  // بحث بكلمة واحدة فقط لكل module
  const searches = {
    ncr_crack:    'crack',
    ncr_defect:   'defect',
    mar_cement:   'cement',
    mar_approval: 'approval',
    tests_cube:   'cube',
    tests_compressive: 'compressive',
    pour_temperature: 'temperature',
    pour_placing: 'placing',
    dwr_daily:    'daily',
    road_asphalt: 'asphalt',
    road_pavement:'pavement',
    steel_rebar:  'rebar',
    steel_reinforcement: 'reinforcement',
    water_supply: 'pipeline',
    drainage:     'drainage',
  };

  const moduleHits = {};
  for (const [label, term] of Object.entries(searches)) {
    const r = await fetch(
      `${url}/rest/v1/qcs_chunks?content=ilike.*${term}*&select=source_file,page_num&limit=3&order=page_num.asc`,
      { headers }
    );
    if (r.ok) {
      const d = await r.json();
      // اعرض فقط اسم الـ Part (بدون "Copy of QCS 2024 Full _")
      moduleHits[label] = (Array.isArray(d) ? d : []).map(c => {
        const part = (c.source_file || '').match(/Part\d+/)?.[0] || c.source_file;
        return `${part} p.${c.page_num}`;
      });
    }
  }

  return Response.json({ moduleHits }, { headers: CORS });
}
