#!/usr/bin/env node
// scripts/upload-chunks.js — QatarSpec Pro B1
// يرفع QCS chunks إلى Supabase (جدول qcs_chunks)
// تشغيل: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/upload-chunks.js
// أو:     node scripts/upload-chunks.js  (يقرأ من .env.local أو env vars)

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── قراءة env vars ────────────────────────────────────────────────────────
function loadEnv() {
  // حاول قراءة .env.local
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
  }
}
loadEnv();

const SUPA_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPA_URL || !SUPA_KEY) {
  console.error('❌ STOP: env vars مفقودة');
  console.error('   يجب تعيين: SUPABASE_URL + SUPABASE_SERVICE_KEY');
  console.error('   مثال: SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=eyJ... node scripts/upload-chunks.js');
  process.exit(1);
}

// ─── إنشاء الجدول إذا لم يكن موجوداً ─────────────────────────────────────
async function ensureTable() {
  // الجدول يُنشأ عبر setup-vectors.js API endpoint
  // هنا نتحقق فقط إنه موجود
  const r = await fetch(`${SUPA_URL}/rest/v1/qcs_chunks?limit=1`, {
    headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
  });

  if (r.status === 404 || r.status === 400) {
    console.log('⚠️  جدول qcs_chunks غير موجود — يجب تشغيل /api/setup-vectors أولاً');
    console.log('   curl -X POST https://qatar-standers.vercel.app/api/setup-vectors -H "Content-Type: application/json" -d \'{"admin_secret":"YOUR_SECRET"}\'');
    return false;
  }

  if (!r.ok) {
    const body = await r.text();
    console.error(`❌ خطأ في التحقق من الجدول: ${r.status} — ${body}`);
    return false;
  }

  console.log('✅ جدول qcs_chunks موجود');
  return true;
}

// ─── حذف البيانات القديمة (اختياري) ─────────────────────────────────────
async function clearExisting() {
  console.log('🗑️  حذف البيانات القديمة...');
  const r = await fetch(`${SUPA_URL}/rest/v1/qcs_chunks?id=gte.0`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`,
      'Prefer': 'return=minimal',
    }
  });
  if (r.ok) {
    console.log('   ✅ تم الحذف');
  } else {
    const body = await r.text();
    console.warn(`   ⚠️  لم يتم الحذف: ${r.status} — ${body.slice(0,200)}`);
  }
}

// ─── رفع batch ──────────────────────────────────────────────────────────
async function uploadBatch(batch) {
  // تحويل الـ chunks لصيغة Supabase
  const rows = batch.map(c => ({
    // id تلقائي من Supabase (bigint GENERATED ALWAYS AS IDENTITY)
    content:      c.content,
    source_file:  c.source_file,
    section_name: c.section_name,
    part_name:    c.part_name,
    part_num:     c.part_num,
    topics:       c.topics || [],
    chunk_index:  c.chunk_index || 0,
    word_count:   c.word_count,
    // embedding يُملأ لاحقاً بـ generate-embeddings
  }));

  const r = await fetch(`${SUPA_URL}/rest/v1/qcs_chunks`, {
    method: 'POST',
    headers: {
      'apikey':        SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!r.ok) {
    const body = await r.text();
    throw new Error(`Supabase error ${r.status}: ${body.slice(0, 300)}`);
  }

  return rows.length;
}

// ─── الدالة الرئيسية ──────────────────────────────────────────────────────
async function main() {
  console.log('🚀 بدء رفع QCS chunks إلى Supabase...\n');
  console.log(`   URL: ${SUPA_URL}`);

  // قراءة الـ chunks
  const chunksPath = path.resolve(__dirname, '..', 'data', 'qcs-chunks.json');
  if (!fs.existsSync(chunksPath)) {
    console.error('❌ data/qcs-chunks.json غير موجود — شغّل extract-qcs-chunks.js أولاً');
    process.exit(1);
  }

  const data   = JSON.parse(fs.readFileSync(chunksPath, 'utf-8'));
  const chunks = data.chunks;
  console.log(`\n📦 ${chunks.length} chunk للرفع (من ${data.meta.files_processed} ملف)\n`);

  // تحقق من الجدول
  const tableOk = await ensureTable();
  if (!tableOk) {
    console.error('\n❌ STOP: الجدول غير موجود — شغّل setup-vectors أولاً');
    process.exit(1);
  }

  // حذف البيانات القديمة
  await clearExisting();

  // رفع على batches
  const BATCH_SIZE = 50; // Supabase يقبل حتى 1000 لكن 50 أكثر أماناً
  let uploaded = 0;
  let failed   = 0;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch     = chunks.slice(i, i + BATCH_SIZE);
    const batchNum  = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);

    process.stdout.write(`   Batch ${batchNum}/${totalBatches} (${batch.length} chunks) ... `);

    try {
      const count = await uploadBatch(batch);
      uploaded += count;
      console.log(`✅`);
    } catch (err) {
      failed += batch.length;
      console.log(`❌ ${err.message}`);
    }

    // تأخير بسيط لتجنب rate limiting
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`✅ رُفع: ${uploaded} chunk`);
  if (failed > 0) console.log(`❌ فشل: ${failed} chunk`);
  console.log('\n📋 الخطوة التالية:');
  console.log('   POST /api/generate-embeddings { admin_secret, batch_size: 50, offset: 0 }');
  console.log('   كرّر بزيادة offset حتى تنتهي كل الـ chunks');
  console.log('═══════════════════════════════════════════\n');
}

main().catch(e => {
  console.error('\n❌ STOP:', e.message);
  process.exit(1);
});
