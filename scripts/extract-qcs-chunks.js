#!/usr/bin/env node
// scripts/extract-qcs-chunks.js — QatarSpec Pro B1
// يستخرج محتوى QCS 2024 من ملفات البيانات ويحوّله إلى chunks للـ pgvector
// تشغيل: node scripts/extract-qcs-chunks.js
// الناتج: data/qcs-chunks.json

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── خريطة الملفات والمعلومات ─────────────────────────────────────────────
const SOURCE_FILES = [
  {
    file: 'data/detail-structural.js',
    part: 'Part 5 — Structural Works',
    part_num: 5,
    topics: ['concrete', 'rebar', 'formwork', 'foundations', 'piles'],
  },
  {
    file: 'data/detail-roads.js',
    part: 'Part 6 — Roads & Paving',
    part_num: 6,
    topics: ['asphalt', 'bitumen', 'subbase', 'road_layers', 'drainage'],
  },
  {
    file: 'data/detail-utilities-ss.js',
    part: 'Part 9 — Utilities (Sewer & Stormwater)',
    part_num: 9,
    topics: ['sewer', 'stormwater', 'drainage', 'manholes'],
  },
  {
    file: 'data/detail-utilities-sw-tw.js',
    part: 'Part 8 — Water Supply & Treated Water',
    part_num: 8,
    topics: ['water_supply', 'treated_water', 'pipes', 'valves'],
  },
  {
    file: 'data/detail-utilities-ws.js',
    part: 'Part 8 — Water Supply',
    part_num: 8,
    topics: ['water_supply', 'pressure_test', 'chlorination'],
  },
  {
    file: 'data/detail-utilities-shared.js',
    part: 'Part 8/9 — Utilities Shared',
    part_num: 9,
    topics: ['utilities', 'testing', 'commissioning'],
  },
  {
    file: 'data/detail-geotech.js',
    part: 'Part 4 — Geotechnical Works',
    part_num: 4,
    topics: ['soil', 'excavation', 'fill', 'compaction', 'groundwater'],
  },
  {
    file: 'data/detail-main.js',
    part: 'QCS 2024 — General',
    part_num: 0,
    topics: ['general', 'site', 'quality', 'health_safety'],
  },
  {
    file: 'data/roads-data.js',
    part: 'Part 6 — Roads (Extended)',
    part_num: 6,
    topics: ['pavement_design', 'road_works', 'markings', 'signage'],
  },
  {
    file: 'data/utilities-data.js',
    part: 'Part 8/9 — Utilities (Extended)',
    part_num: 9,
    topics: ['utilities', 'pipe_laying', 'testing', 'backfill'],
  },
  {
    file: 'data/structural-data.js',
    part: 'Part 5 — Structural (Extended)',
    part_num: 5,
    topics: ['structural_design', 'concrete_mix', 'testing'],
  },
  {
    file: 'data/tools-data.js',
    part: 'QCS 2024 — Forms & Tools',
    part_num: 0,
    topics: ['rfi', 'ncr', 'itp', 'dpr', 'forms'],
  },
];

// ─── إزالة HTML من النص ───────────────────────────────────────────────────
function stripHtml(html) {
  if (!html) return '';
  return html
    // حذف السكريبتات والستايلات
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // التعامل مع الجداول — أضف مسافات
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>/gi, ' | ')
    .replace(/<\/th>/gi, ' | ')
    // القوائم
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // كل الـ tags الأخرى
    .replace(/<[^>]+>/g, '')
    // HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // تنظيف الفراغات الزائدة
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── تحديد QCS Part من محتوى النص ───────────────────────────────────────
function detectPartFromContent(text) {
  const t = text.toLowerCase();
  if (t.includes('qcs') && t.includes('part 5')) return 'Part 5 — Structural';
  if (t.includes('section 5')) return 'Part 5 — Structural';
  if (t.includes('section 6') || t.includes('part 6')) return 'Part 6 — Roads';
  if (t.includes('section 8') || t.includes('part 8')) return 'Part 8 — Water Supply';
  if (t.includes('section 9') || t.includes('part 9')) return 'Part 9 — Utilities';
  if (t.includes('part 4')) return 'Part 4 — Geotechnical';
  return null;
}

// ─── استخراج الـ chunks من ملف ────────────────────────────────────────────
function extractChunksFromFile(filePath, meta) {
  const fullPath = path.resolve(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  ملف غير موجود: ${filePath}`);
    return [];
  }

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const chunks = [];

  // نمط 1: { key: { title: '...', content: `...` } }
  // نمط 2: _qspMerge({ key: { title: '...', content: `...` } })
  // نمط 3: window.QS_CONTENT['key'] = { title: '...', content: `...` }
  // نمط 4: c["key"] = { title: '...', content: `...` }

  // Strategy: استخرج title + content من كل entry بـ regex
  // يبحث عن: `title: '...'` أو `title: "..."` متبوعاً بـ `content: \`...\``
  
  // استخراج كل الـ keys أولاً
  const keyPattern = /(?:["']([a-zA-Z_][a-zA-Z0-9_]*)["']\s*:|([a-zA-Z_][a-zA-Z0-9_]*)\s*:)\s*\{/g;
  
  // استخراج title + content كأزواج
  // البحث عن: title: 'X' ثم content: `Y`
  const entryPattern = /title\s*:\s*(?:'([^']*)'|"([^"]*)")\s*,\s*content\s*:\s*`([\s\S]*?)`\s*(?:,|\})/g;

  let match;
  let idx = 0;

  while ((match = entryPattern.exec(raw)) !== null) {
    const title   = (match[1] || match[2] || '').trim();
    const htmlContent = match[3] || '';

    if (!title || !htmlContent || htmlContent.length < 100) continue;

    const cleanText = stripHtml(htmlContent);
    if (cleanText.length < 80) continue;

    // قصّ إلى 2000 كلمة max (≈ 12000 char) للـ embedding
    const words = cleanText.split(/\s+/);
    const maxWords = 900; // ≈ 900 tokens
    
    // إذا كان النص طويل جداً، قسّمه إلى sub-chunks
    if (words.length > maxWords) {
      const numChunks = Math.ceil(words.length / maxWords);
      for (let i = 0; i < numChunks; i++) {
        const chunkWords = words.slice(i * maxWords, (i + 1) * maxWords);
        const chunkText  = chunkWords.join(' ').trim();
        if (chunkText.length < 80) continue;

        // تنظيف الـ title من الـ emoji
        const cleanTitle = title.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/[🎯📌🔧💧🧱🔩⚓🪵📋🛢️🧪🌊♻️🪣🔴🔑🚽]/g, '').trim();

        chunks.push({
          id: `${meta.part_num}_${idx++}`,
          content: chunkText,
          source_file: filePath,
          section_name: cleanTitle || `Section ${idx}`,
          part_name: meta.part,
          part_num: meta.part_num,
          topics: meta.topics,
          chunk_index: i,
          char_count: chunkText.length,
          word_count: chunkWords.length,
        });
      }
    } else {
      const cleanTitle = title.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/[🎯📌🔧💧🧱🔩⚓🪵📋🛢️🧪🌊♻️🪣🔴🔑🚽]/g, '').trim();

      // حاول تحديد الـ part من المحتوى
      const detectedPart = detectPartFromContent(cleanText);

      chunks.push({
        id: `${meta.part_num}_${idx++}`,
        content: cleanText,
        source_file: filePath,
        section_name: cleanTitle || `Section ${idx}`,
        part_name: detectedPart || meta.part,
        part_num: meta.part_num,
        topics: meta.topics,
        chunk_index: 0,
        char_count: cleanText.length,
        word_count: words.length,
      });
    }
  }

  return chunks;
}

// ─── الدالة الرئيسية ──────────────────────────────────────────────────────
function main() {
  console.log('🚀 بدء استخراج QCS chunks...\n');

  const allChunks = [];
  let totalFiles   = 0;
  let totalChunks  = 0;
  let skippedFiles = 0;

  for (const meta of SOURCE_FILES) {
    process.stdout.write(`📂 ${meta.file} ... `);
    const chunks = extractChunksFromFile(meta.file, meta);

    if (chunks.length === 0) {
      console.log('⚠️  لا توجد chunks');
      skippedFiles++;
      continue;
    }

    allChunks.push(...chunks);
    totalFiles++;
    totalChunks += chunks.length;
    console.log(`✅ ${chunks.length} chunk`);
  }

  // إزالة المكرر — بناءً على أول 200 حرف من المحتوى
  const seen = new Set();
  const deduped = allChunks.filter(c => {
    const key = c.content.slice(0, 200).trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // إعادة ترقيم الـ IDs بشكل نظيف
  const finalChunks = deduped.map((c, i) => ({ ...c, id: `qcs_${String(i + 1).padStart(4, '0')}` }));

  // إحصائيات
  const avgWords = Math.round(finalChunks.reduce((s, c) => s + c.word_count, 0) / finalChunks.length);
  const byPart   = {};
  finalChunks.forEach(c => {
    byPart[c.part_num] = (byPart[c.part_num] || 0) + 1;
  });

  // حفظ الناتج
  const outPath = path.resolve(__dirname, '..', 'data', 'qcs-chunks.json');
  fs.writeFileSync(outPath, JSON.stringify({
    meta: {
      generated_at: new Date().toISOString(),
      source: 'QCS 2024 + Ashghal RDM 2023',
      total_chunks: finalChunks.length,
      avg_words_per_chunk: avgWords,
      by_part: byPart,
      files_processed: totalFiles,
      files_skipped: skippedFiles,
      embedding_model: 'gemini text-embedding-004 (768 dims)',
      embedding_status: 'pending — run upload-chunks.js then generate-embeddings',
    },
    chunks: finalChunks,
  }, null, 2));

  console.log('\n═══════════════════════════════════════════');
  console.log(`✅ الناتج: data/qcs-chunks.json`);
  console.log(`   ملفات معالجة : ${totalFiles}`);
  console.log(`   ملفات مُهملة : ${skippedFiles}`);
  console.log(`   chunks قبل dedup: ${totalChunks}`);
  console.log(`   chunks بعد dedup : ${finalChunks.length}`);
  console.log(`   متوسط الكلمات   : ${avgWords} كلمة/chunk`);
  console.log('\n   التوزيع حسب Part:');
  Object.entries(byPart).sort((a, b) => a[0] - b[0]).forEach(([p, n]) => {
    console.log(`   Part ${p}: ${n} chunk`);
  });
  console.log('\n📋 الخطوة التالية:');
  console.log('   node scripts/upload-chunks.js   ← رفع إلى Supabase');
  console.log('═══════════════════════════════════════════\n');
}

main();
