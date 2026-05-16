// POST /api/upload-chunks { admin_secret, batch_start, batch_size }
// Reads from data/qcs-chunks-full.json and uploads to Supabase qcs_chunks
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';
import { readFileSync } from 'fs';
import { join } from 'path';

let _cachedChunks = null;

function loadChunks() {
  if (_cachedChunks) return _cachedChunks;
  try {
    const raw = readFileSync(join(process.cwd(), 'data', 'qcs-chunks-full.json'), 'utf8');
    _cachedChunks = JSON.parse(raw).chunks;
  } catch (e) {
    _cachedChunks = [];
  }
  return _cachedChunks;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  if (body.admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const URL = getSupabaseUrl();
  const KEY = getSupabaseServiceKey();
  if (!URL || !KEY) return res.status(503).json({ error: 'Missing Supabase env vars' });

  const chunks = loadChunks();
  if (!chunks.length) return res.status(500).json({ error: 'No chunks found in data/qcs-chunks-full.json' });

  const batchStart = parseInt(body.batch_start || 0);
  const batchSize = parseInt(body.batch_size || 100);

  // Action: clear old data and start fresh
  if (body.action === 'reset') {
    const delRes = await fetch(`${URL}/rest/v1/qcs_chunks?id=gt.0`, {
      method: 'DELETE',
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}`, 'Prefer': 'return=minimal' }
    });
    return res.json({ action: 'reset', status: delRes.status, message: 'Old data cleared' });
  }

  // Action: status
  if (body.action === 'status') {
    const countRes = await fetch(`${URL}/rest/v1/qcs_chunks?select=id&limit=1`, {
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}`, 'Prefer': 'count=exact' }
    });
    const total = parseInt(countRes.headers.get('content-range')?.split('/')[1] || '0');
    return res.json({ total_in_db: total, total_in_file: chunks.length });
  }

  // Upload batch
  const batch = chunks.slice(batchStart, batchStart + batchSize);
  if (!batch.length) {
    return res.json({ message: 'All chunks uploaded!', total: chunks.length, uploaded: batchStart });
  }

  const rows = batch.map(c => ({
    content: (c.content || '').slice(0, 4000),
    source_file: c.source_file || 'QCS_2024_Full_.pdf',
    section_name: (c.section_name || '').slice(0, 200),
    part_name: (c.part_name || '').slice(0, 100),
    part_num: c.part_num || 0,
    chunk_index: c.chunk_index || 0,
    word_count: c.word_count || 0
  }));

  const uploadRes = await fetch(`${URL}/rest/v1/qcs_chunks`, {
    method: 'POST',
    headers: {
      'apikey': KEY,
      'Authorization': `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(rows)
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    return res.status(500).json({ error: `Supabase error ${uploadRes.status}: ${err.slice(0, 300)}` });
  }

  const nextStart = batchStart + batchSize;
  const remaining = Math.max(0, chunks.length - nextStart);

  return res.json({
    uploaded: batch.length,
    next_start: nextStart,
    remaining,
    total: chunks.length,
    message: remaining > 0 ? `${remaining} chunks remaining` : 'All chunks uploaded!'
  });
}
