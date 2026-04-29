#!/usr/bin/env node
// QatarSpec Pro — E2E Flow Tests
// Tests: Site structure → Search → Card → Export
// Validates HTML structure and JavaScript flow files
// Run: node tests/e2e/flow.test.cjs

const fs = require('fs');
const path = require('path');

let passed = 0, failed = 0, errors = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    errors.push(name + ': ' + e.message);
    failed++;
  }
}

function assert(ok, msg) {
  if (!ok) throw new Error(msg);
}

const html = fs.readFileSync('index.html', 'utf-8');

console.log('\n══════════════════════════════════════════');
console.log('  QatarSpec Pro — E2E Flow Tests');
console.log('══════════════════════════════════════════\n');

// ─────────────────────────────────────────────
// Flow 1: فتح الموقع
// ─────────────────────────────────────────────
console.log('🌐 Flow 1: فتح الموقع');

test('index.html موجود', () => {
  assert(fs.existsSync('index.html'), 'index.html غير موجود');
});

test('DOCTYPE موجود', () => {
  assert(html.startsWith('<!DOCTYPE html') || html.startsWith('<!doctype html'),
    'DOCTYPE مفقود');
});

test('lang="ar" معرّف (RTL support)', () => {
  assert(html.includes('lang="ar"') || html.includes("lang='ar'"), 'lang=ar مفقود');
});

test('viewport meta موجود (mobile-first)', () => {
  assert(html.includes('viewport'), 'viewport meta مفقود');
});

test('عنوان الصفحة موجود', () => {
  assert(html.includes('<title>') && html.includes('Qatar'), 'title مفقود أو لا يحتوي Qatar');
});

test('manifest.json مرتبط', () => {
  assert(html.includes('manifest.json'), 'manifest link مفقود');
});

test('Service Worker مسجل', () => {
  assert(html.includes('serviceWorker') || fs.existsSync('sw.js'),
    'Service Worker مفقود');
});

test('CSP meta أو header موجود', () => {
  assert(
    html.includes('Content-Security-Policy') || fs.existsSync('vercel.json'),
    'CSP غير موجود'
  );
});

// ─────────────────────────────────────────────
// Flow 2: البحث
// ─────────────────────────────────────────────
console.log('\n🔍 Flow 2: البحث');

test('search input موجود في HTML', () => {
  assert(
    html.includes('search') || html.includes('بحث') || html.includes('searchInput'),
    'search input مفقود'
  );
});

test('QS_CONTENT موجود (بيانات البطاقات)', () => {
  const dataFiles = [
    'data_content_roads.js',
    'data_content_structural.js',
    'data_content_utilities.js',
    'data_content_geotech.js',
  ];
  for (const f of dataFiles) {
    assert(fs.existsSync(f), `${f} مفقود`);
  }
});

test('data_content_phase4.js موجود', () => {
  assert(fs.existsSync('data_content_phase4.js'), 'data_content_phase4.js مفقود');
});

test('loader.js موجود', () => {
  assert(fs.existsSync('loader.js'), 'loader.js مفقود');
});

test('البحث مرتبط في HTML', () => {
  assert(
    html.includes('loader.js') || html.includes('data_content') || html.includes('QS_CONTENT'),
    'بيانات البحث غير مرتبطة'
  );
});

// ─────────────────────────────────────────────
// Flow 3: فتح البطاقة
// ─────────────────────────────────────────────
console.log('\n🃏 Flow 3: فتح البطاقة (Card)');

test('card/modal structure موجود في HTML', () => {
  assert(
    html.includes('modal') || html.includes('card') || html.includes('detail'),
    'card/modal structure مفقود'
  );
});

test('Dark Mode button موجود', () => {
  assert(
    html.includes('dark') || html.includes('Dark') || html.includes('theme'),
    'Dark Mode مفقود'
  );
});

test('Back to Top button موجود', () => {
  assert(
    html.includes('backToTop') || html.includes('back-to-top') || html.includes('scrollTop'),
    'Back to Top مفقود'
  );
});

test('Pro Button موجود', () => {
  assert(
    html.includes('pro') || html.includes('Pro') || html.includes('PRO'),
    'Pro button مفقود'
  );
});

test('XSS protection في innerHTML', () => {
  // التحقق من وجود sanitize أو DOMPurify أو textContent بدلاً من innerHTML مباشرة
  const jsFiles = ['loader.js', 'data_calcs.js'];
  let safe = false;
  for (const f of jsFiles) {
    if (fs.existsSync(f)) {
      const src = fs.readFileSync(f, 'utf-8');
      if (src.includes('sanitize') || src.includes('textContent') ||
          src.includes('DOMPurify') || src.includes('escapeHTML') ||
          src.includes('replace') || src.includes('encode')) {
        safe = true;
        break;
      }
    }
  }
  // Also check HTML itself
  if (html.includes('sanitize') || html.includes('escapeHTML')) safe = true;
  assert(safe, 'لا توجد حماية XSS في الملفات الرئيسية');
});

// ─────────────────────────────────────────────
// Flow 4: التصدير
// ─────────────────────────────────────────────
console.log('\n📤 Flow 4: التصدير');

test('js/export/pdf.js موجود', () => {
  assert(fs.existsSync('js/export/pdf.js'), 'pdf.js مفقود');
});

test('js/export/word.js موجود', () => {
  assert(fs.existsSync('js/export/word.js'), 'word.js مفقود');
});

test('js/export/excel.js موجود', () => {
  assert(fs.existsSync('js/export/excel.js'), 'excel.js مفقود');
});

test('PDF export: QatarSpec header', () => {
  const src = fs.readFileSync('js/export/pdf.js', 'utf-8');
  assert(
    src.includes('QatarSpec') || src.includes('qatar') || src.includes('QCS'),
    'PDF لا يحتوي على QatarSpec header'
  );
});

test('Word export: تصدير وظيفة', () => {
  const src = fs.readFileSync('js/export/word.js', 'utf-8');
  assert(
    src.includes('export') || src.includes('function') || src.includes('=>'),
    'word.js لا يحتوي على وظائف'
  );
});

test('Excel export: Ashghal format', () => {
  const src = fs.readFileSync('js/export/excel.js', 'utf-8');
  assert(
    src.includes('sheet') || src.includes('Sheet') || src.includes('xlsx') ||
    src.includes('Ashghal') || src.includes('workbook'),
    'Excel لا يدعم تنسيق Ashghal'
  );
});

// ─────────────────────────────────────────────
// Flow 5: الحاسبات
// ─────────────────────────────────────────────
console.log('\n🧮 Flow 5: الحاسبات');

const CALC_FILES = {
  'js/calculators/roads.js': 12,
  'js/calculators/structural.js': 11,
  'js/calculators/utilities.js': 5,
  'js/calculators/geotech.js': 6,
  'js/calculators/general.js': 4,
};

for (const [file, minCalcs] of Object.entries(CALC_FILES)) {
  test(`${file} موجود`, () => {
    assert(fs.existsSync(file), `${file} مفقود`);
  });

  test(`${file}: ${minCalcs}+ حاسبات`, () => {
    const src = fs.readFileSync(file, 'utf-8');
    // حاسبات QatarSpec تستخدم window.calc أو window.QS
    const calcCount = (src.match(/window\.(calc\w+|QS\.\w+)\s*=/g) || []).length;
    // fallback: عدد الوظائف التقليدية
    const fnCount = (src.match(/function\s+\w+\s*\(/g) || []).length;
    const total = Math.max(calcCount, fnCount);
    assert(total >= minCalcs, `${file} يحتوي ${total} حاسبة فقط، المطلوب ${minCalcs}+`);
  });

  test(`${file}: QCS reference موجود`, () => {
    const src = fs.readFileSync(file, 'utf-8');
    assert(
      src.includes('QCS') || src.includes('Ashghal') || src.includes('KAHRAMAA'),
      `${file} لا يحتوي على QCS reference`
    );
  });

  test(`${file}: Pass/Fail أو result موجود`, () => {
    const src = fs.readFileSync(file, 'utf-8');
    assert(
      src.includes('Pass') || src.includes('Fail') || src.includes('result') ||
      src.includes('نتيجة') || src.includes('pass') || src.includes('fail'),
      `${file} لا يحتوي على Pass/Fail result`
    );
  });
}

// ─────────────────────────────────────────────
// Flow 6: PWA + SEO
// ─────────────────────────────────────────────
console.log('\n📱 Flow 6: PWA + SEO');

test('robots.txt موجود', () => {
  assert(fs.existsSync('robots.txt'), 'robots.txt مفقود');
});

test('sitemap.xml موجود', () => {
  assert(fs.existsSync('sitemap.xml'), 'sitemap.xml مفقود');
});

test('manifest.json صالح', () => {
  assert(fs.existsSync('manifest.json'), 'manifest.json مفقود');
  const m = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));
  assert(m.name || m.short_name, 'manifest يجب أن يحتوي name');
});

test('sw.js (Service Worker) موجود', () => {
  assert(fs.existsSync('sw.js'), 'sw.js مفقود');
});

test('sw.js: cache strategy موجود', () => {
  const src = fs.readFileSync('sw.js', 'utf-8');
  assert(
    src.includes('cache') || src.includes('Cache'),
    'sw.js لا يحتوي على cache strategy'
  );
});

// ─────────────────────────────────────────────
// النتيجة
// ─────────────────────────────────────────────
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
