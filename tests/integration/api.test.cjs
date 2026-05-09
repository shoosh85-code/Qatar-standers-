#!/usr/bin/env node
// QatarSpec Pro — Integration Tests: API Endpoints
// Tests API file structure, CORS headers, and handler contracts
// Run: node tests/integration/api.test.cjs

const fs = require('fs');
const path = require('path');

let passed = 0, failed = 0, errors = [];

function test(name, fn) {
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      result.then(() => {
        console.log(`  ✅ ${name}`);
        passed++;
      }).catch(e => {
        console.log(`  ❌ ${name}: ${e.message}`);
        errors.push(name + ': ' + e.message);
        failed++;
      });
    } else {
      console.log(`  ✅ ${name}`);
      passed++;
    }
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    errors.push(name + ': ' + e.message);
    failed++;
  }
}

function assert(ok, msg) {
  if (!ok) throw new Error(msg);
}

function readAPI(name) {
  return fs.readFileSync(path.join('api', name), 'utf-8');
}

console.log('\n══════════════════════════════════════════');
console.log('  QatarSpec Pro — Integration Tests');
console.log('══════════════════════════════════════════\n');

// ─────────────────────────────────────────────
// 1. /api/verify-pro
// ─────────────────────────────────────────────
console.log('📋 /api/verify-pro');

test('verify-pro.js موجود', () => {
  assert(fs.existsSync('api/verify-pro.js'), 'verify-pro.js غير موجود');
});

test('verify-pro: Edge Runtime محدد', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes("runtime: 'edge'"), 'Edge runtime غير موجود');
});

test('verify-pro: CORS headers معرّفة', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes('Access-Control-Allow-Origin'), 'CORS Origin مفقود');
  assert(src.includes('Access-Control-Allow-Methods'), 'CORS Methods مفقود');
  assert(src.includes('Access-Control-Allow-Credentials'), 'CORS Credentials مفقود');
});

test('verify-pro: POST + GET + OPTIONS مدعومة', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes("'POST, GET, OPTIONS'"), 'Methods غير مكتملة');
});

test('verify-pro: JWT signing موجود', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes('signJWT'), 'signJWT مفقود');
  assert(src.includes('verifyJWT'), 'verifyJWT مفقود');
});

test('verify-pro: httpOnly cookie (لا localStorage)', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes('httpOnly'), 'httpOnly cookie مفقود');
  // تجاهل التعليقات — localStorage ممنوع في الكود الفعلي فقط
  const codeOnly = src.split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
  assert(!codeOnly.includes('localStorage'), 'localStorage غير مسموح في كود API');
});

test('verify-pro: PRO_CODES من env vars', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes('process.env.PROMO_CODES') || src.includes('process.env.PRO_CODES'),
    'PRO_CODES يجب أن يأتي من env vars');
});

test('verify-pro: تصدير default handler', () => {
  const src = readAPI('verify-pro.js');
  assert(src.includes('export default'), 'export default مفقود');
});

// ─────────────────────────────────────────────
// 2. /api/ai-proxy
// ─────────────────────────────────────────────
console.log('\n📋 /api/ai-proxy');

test('ai-proxy.js موجود', () => {
  assert(fs.existsSync('api/ai-proxy.js'), 'ai-proxy.js غير موجود');
});

test('ai-proxy: Edge Runtime محدد', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes("runtime: 'edge'"), 'Edge runtime مفقود');
});

test('ai-proxy: Rate Limiting موجود', () => {
  const src = readAPI('ai-proxy.js');
  assert(
    src.includes('rate') || src.includes('Rate') || src.includes('RATE'),
    'Rate limiting مفقود'
  );
});

test('ai-proxy: CORS headers معرّفة', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes('Access-Control-Allow-Origin'), 'CORS Origin مفقود');
});

test('ai-proxy: Gemini API (لا Anthropic)', () => {
  const src = readAPI('ai-proxy.js');
  assert(
    src.includes('gemini') || src.includes('Gemini') || src.includes('generativelanguage.googleapis'),
    'Gemini API غير موجود'
  );
  assert(!src.includes('anthropic.com'), 'لا يجب استخدام Anthropic API');
  assert(!src.includes('ANTHROPIC_API_KEY'), 'لا يجب استخدام Anthropic API Key');
});

test('ai-proxy: JWT token validation', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes('verifyPro') || src.includes('verifyJWT') || src.includes('qs_pro'),
    'JWT validation مفقود');
});

test('ai-proxy: OPTIONS preflight handler', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes("'OPTIONS'") || src.includes('"OPTIONS"'), 'OPTIONS handler مفقود');
});

test('ai-proxy: POST فقط (لا GET للحماية)', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes("'POST'") || src.includes('"POST"'), 'POST method مفقود');
});

test('ai-proxy: تصدير default handler', () => {
  const src = readAPI('ai-proxy.js');
  assert(src.includes('export default'), 'export default مفقود');
});

// ─────────────────────────────────────────────
// 3. /api/qcs-search
// ─────────────────────────────────────────────
console.log('\n📋 /api/qcs-search');

test('qcs-search.js موجود', () => {
  assert(fs.existsSync('api/qcs-search.js'), 'qcs-search.js غير موجود');
});

test('qcs-search: Edge Runtime محدد', () => {
  const src = readAPI('qcs-search.js');
  assert(src.includes("runtime: 'edge'"), 'Edge runtime مفقود');
});

test('qcs-search: CORS headers معرّفة', () => {
  const src = readAPI('qcs-search.js');
  assert(src.includes('Access-Control-Allow-Origin'), 'CORS Origin مفقود');
  assert(src.includes('Vary'), 'Vary header مفقود');
});

test('qcs-search: Supabase integration', () => {
  const src = readAPI('qcs-search.js');
  assert(
    src.includes('supabase') || src.includes('SUPABASE'),
    'Supabase integration مفقود'
  );
});

test('qcs-search: POST method فقط', () => {
  const src = readAPI('qcs-search.js');
  assert(src.includes("'POST'") || src.includes('"POST"'), 'POST method مفقود');
  assert(src.includes('POST only') || src.includes('405'), '405 error handler مفقود');
});

test('qcs-search: JSON response helper', () => {
  const src = readAPI('qcs-search.js');
  assert(src.includes('application/json'), 'Content-Type JSON مفقود');
});

test('qcs-search: تصدير default handler', () => {
  const src = readAPI('qcs-search.js');
  assert(src.includes('export default'), 'export default مفقود');
});

// ─────────────────────────────────────────────
// 4. /api/health (bonus)
// ─────────────────────────────────────────────
console.log('\n📋 /api/health');

test('health.js موجود', () => {
  assert(fs.existsSync('api/health.js'), 'health.js غير موجود');
});

test('health: JSON response', () => {
  const src = readAPI('health.js');
  assert(src.includes('json') || src.includes('JSON'), 'health يجب أن يرجع JSON');
});

// ─────────────────────────────────────────────
// 5. Security: لا API Keys في الملفات
// ─────────────────────────────────────────────
console.log('\n🔒 Security Checks');

const API_FILES = fs.readdirSync('api').filter(f => f.endsWith('.js'));

test('لا hardcoded API keys في ملفات API', () => {
  const KEY_PATTERN = /sk-[A-Za-z0-9]{20,}|AIza[A-Za-z0-9]{30,}(?!\.)/;
  for (const file of API_FILES) {
    const src = readAPI(file);
    // Skip the pattern itself in the test file
    const lines = src.split('\n').filter(l => !l.trim().startsWith('//'));
    for (const line of lines) {
      if (KEY_PATTERN.test(line)) {
        throw new Error(`${file} يحتوي على API key مكشوف`);
      }
    }
  }
});

test('جميع API endpoints تستخدم process.env للـ secrets', () => {
  const SENSITIVE_APIS = ['verify-pro.js', 'ai-proxy.js', 'qcs-search.js'];
  for (const file of SENSITIVE_APIS) {
    const src = readAPI(file);
    assert(src.includes('process.env.'), `${file} لا يستخدم process.env`);
  }
});

test('لا localStorage في ملفات API', () => {
  for (const file of API_FILES) {
    const src = readAPI(file);
    // تجاهل التعليقات — localStorage ممنوع في الكود الفعلي
    const codeOnly = src.split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
    assert(!codeOnly.includes('localStorage'), `${file} يستخدم localStorage بشكل غير آمن`);
  }
});

// ─────────────────────────────────────────────
// 6. vercel.json routing
// ─────────────────────────────────────────────
console.log('\n⚙️  Vercel Configuration');

test('vercel.json موجود', () => {
  assert(fs.existsSync('vercel.json'), 'vercel.json غير موجود');
});

test('vercel.json صالح JSON', () => {
  const raw = fs.readFileSync('vercel.json', 'utf-8');
  const cfg = JSON.parse(raw);
  assert(typeof cfg === 'object', 'vercel.json ليس object');
});

// ─────────────────────────────────────────────
// 7. Rate Limit Architecture
// ─────────────────────────────────────────────
console.log('\n⚡ Rate Limit Architecture');

// اختبار: rate-limit.js لا يستخدم setInterval (Edge incompatible)
test('rate-limit has no setInterval', () => {
  const src = fs.readFileSync('lib/rate-limit.js', 'utf-8');
  assert(!src.includes('setInterval'), 'setInterval غير مسموح في Edge runtime');
});

// اختبار: كل API file تستورد من lib/rate-limit.js
test('api files use shared rate-limit', () => {
  const apiFiles = ['api/qcs-search.js', 'api/verify-pro.js', 'api/vision-proxy.js'];
  for (const f of apiFiles) {
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf-8');
    // يجب أن تستورد من lib/ أو لا تحتوي "new Map()" للـ rate limit
    const hasLocalMap = src.includes("const _rl = new Map()");
    assert(!hasLocalMap, `${f} يحتوي rate limit محلي — يجب استخدام lib/rate-limit.js`);
  }
});

// اختبار: GEMINI_API_KEY (وليس GEMINI_KEY) في كل API files
test('api files use GEMINI_API_KEY not GEMINI_KEY', () => {
  const apiFiles = fs.readdirSync('api').filter(f => f.endsWith('.js'));
  for (const f of apiFiles) {
    const src = fs.readFileSync(`api/${f}`, 'utf-8');
    assert(!src.includes('process.env.GEMINI_KEY'),
      `${f} يستخدم GEMINI_KEY القديم — يجب GEMINI_API_KEY`);
  }
});

// اختبار: لا يوجد @vercel/kv في endpoint files (deprecated)
// ملاحظة: api/rate-limit.js مستثنى — هو نفسه ملف rate-limit utility
test('no @vercel/kv usage', () => {
  const apiJsFiles = fs.readdirSync('api')
    .filter(f => f.endsWith('.js') && fs.statSync(`api/${f}`).isFile()
      && f !== 'rate-limit.js') // rate-limit utility files مستثناة
    .map(f => `api/${f}`);
  const files = ['lib/rate-limit.js', ...apiJsFiles];
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf-8');
    assert(!src.includes('@vercel/kv'), `${f} يستخدم @vercel/kv المنتهي الصلاحية`);
  }
});

// اختبار: كل Edge function تحتوي export const config = { runtime: 'edge' }
test('edge functions declare runtime', () => {
  const edgeFns = ['api/ai-proxy.js', 'api/qcs-search.js', 'api/verify-pro.js', 'api/vision-proxy.js'];
  for (const f of edgeFns) {
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf-8');
    assert(src.includes("runtime: 'edge'"), `${f} يجب أن يُعلن Edge runtime`);
  }
});

// ─────────────────────────────────────────────
// النتيجة
// ─────────────────────────────────────────────
setTimeout(() => {
  console.log('\n══════════════════════════════════════════');
  if (failed === 0) {
    console.log(`✅ RESULT: ${passed} passed, ${failed} failed`);
  } else {
    console.log(`❌ RESULT: ${passed} passed, ${failed} failed`);
    console.log('\nErrors:');
    errors.forEach(e => console.log('  •', e));
    process.exit(1);
  }
  console.log('══════════════════════════════════════════\n');
}, 100);

// ══════════════════════════════════════════════════════════════
// ROUND 2 TESTS — تغطية المشاكل المكتشفة في التقرير الثاني
// ══════════════════════════════════════════════════════════════
let passed2 = 0, failed2 = 0;
const test2 = (name, fn) => {
  try { fn(); console.log('  ✅', name); passed2++; }
  catch(e) { console.error('  ❌', name, '\n    ', e.message); failed2++; }
};

console.log('\n⚡ Round 2: Architecture & Security Tests');

test2('api/rate-limit.js: no @vercel/kv', () => {
  const src = fs.readFileSync('api/rate-limit.js', 'utf-8');
  assert(!src.includes('@vercel/kv'), 'api/rate-limit.js لا يزال يستخدم @vercel/kv المنتهي الصلاحية');
});

test2('api/rate-limit.js: uses UPSTASH_REDIS_REST_URL', () => {
  const src = fs.readFileSync('api/rate-limit.js', 'utf-8');
  assert(src.includes('UPSTASH_REDIS_REST_URL'), 'api/rate-limit.js يجب أن يستخدم UPSTASH_REDIS_REST_URL');
});

test2('ai-proxy.js: no KV_REST_API_URL', () => {
  const src = fs.readFileSync('api/ai-proxy.js', 'utf-8');
  assert(!src.includes('KV_REST_API_URL'), 'ai-proxy.js لا يزال يستخدم KV_REST_API_URL القديم');
});

test2('api/rate-limit.js: exports all required functions', () => {
  const src = fs.readFileSync('api/rate-limit.js', 'utf-8');
  ['checkRateLimit','getIp','applyRateLimitHeaders','rateLimit','rateLimitHeaders','withRateLimit']
    .forEach(fn => assert(src.includes(fn), `api/rate-limit.js لا يُصدّر ${fn}`));
});

test2('middleware/rateLimit.js: removed (dead code)', () => {
  assert(!fs.existsSync('middleware/rateLimit.js'), 'middleware/rateLimit.js لا يزال موجوداً — يجب حذفه');
});

test2('supabase-proxy: ALLOWED_OPERATIONS includes get_user_by_token', () => {
  const src = fs.readFileSync('api/supabase-proxy.js', 'utf-8');
  assert(src.includes('get_user_by_token'), 'supabase-proxy ALLOWED_OPERATIONS لا تشمل get_user_by_token');
});

test2('security-cleanup: checks for service_role key leak', () => {
  const src = fs.readFileSync('js/security-cleanup.js', 'utf-8');
  assert(src.includes('service_role'), 'security-cleanup لا يفحص service_role key leak');
});

test2('lib/security-headers.js: no unsafe-inline in script-src', () => {
  const src = fs.readFileSync('lib/security-headers.js', 'utf-8');
  const lines = src.split('\n').filter(l => l.includes('script-src'));
  lines.forEach(l => assert(!l.includes("'unsafe-inline'"), 'lib/security-headers.js CSP تحتوي unsafe-inline في script-src'));
});

test2('.env.example: all required vars present', () => {
  const src = fs.readFileSync('.env.example', 'utf-8');
  ['GEMINI_API_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','JWT_SECRET','NEXT_PUBLIC_SUPABASE_URL','TAP_SECRET_KEY']
    .forEach(v => assert(src.includes(v), `.env.example يفتقد ${v}`));
});

test2('vercel.json: no unsafe-inline in script-src', () => {
  const v = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
  (v.headers || []).forEach(block => {
    (block.headers || []).forEach(h => {
      if (h.key === 'Content-Security-Policy') {
        const scriptSrc = h.value.split('script-src')[1]?.split(';')[0] || '';
        assert(!scriptSrc.includes("'unsafe-inline'"), "vercel.json CSP تحتوي 'unsafe-inline' في script-src");
      }
    });
  });
});

test2('index.html: no bare inline scripts', () => {
  const src = fs.readFileSync('index.html', 'utf-8');
  const inlineScripts = (src.match(/<script>/g) || []).length;
  assert(inlineScripts === 0, `index.html يحتوي ${inlineScripts} inline script(s) بدون src`);
});

console.log(`\n${'═'.repeat(44)}`);
console.log(failed2 === 0
  ? `✅ Round 2: ${passed2} passed, 0 failed`
  : `❌ Round 2: ${passed2} passed, ${failed2} FAILED`);
console.log('═'.repeat(44));
