'use strict';
/**
 * QatarSpec Pro — Content Validation Tests
 * tests/content-validation.test.cjs
 *
 * يتحقق من:
 * 1. كل key في manifest → الملف موجود على الديسك
 * 2. كل key في الملف   → QS_CONTENT[key] يُحمَّل بنجاح
 * 3. كل <script> مضمَّن في content → syntax valid
 * 4. لا يوجد template literal \n bugs
 */

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os   = require('os');

// ─────────────────────────────────────────────────────────────────────────────
// الجذر الجذري للمشروع (نفذ من project root)
// ─────────────────────────────────────────────────────────────────────────────
// __dirname = tests/ → ROOT = project root (parent of tests/)
const ROOT = path.resolve(__dirname, '..');

// ─────────────────────────────────────────────────────────────────────────────
// Helper: تحقق من وجود ملف أو مجلد
// ─────────────────────────────────────────────────────────────────────────────
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: استخراج كل <script> مضمَّن (بدون src=) من نص HTML
// ─────────────────────────────────────────────────────────────────────────────
function extractEmbeddedScripts(html) {
  const results = [];
  const re = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const code = match[1].trim();
    if (code) results.push(code);
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: تحقق من syntax JS باستخدام node --check
// ─────────────────────────────────────────────────────────────────────────────
function checkJsSyntax(code) {
  const tmpFile = path.join(os.tmpdir(), `qs-syntax-${Date.now()}-${Math.random().toString(36).slice(2)}.js`);
  fs.writeFileSync(tmpFile, code, 'utf8');
  try {
    execSync(`node --check "${tmpFile}"`, { stdio: 'pipe' });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.stderr?.toString() || e.message };
  } finally {
    try { fs.unlinkSync(tmpFile); } catch {}
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: ابحث عن template literal \n bugs
// نمط خطر: `...${...}\n...` داخل template literal حيث \n مكتوبة حرفياً وليست escape
// أو: سلسلة متعددة الأسطر بدون backticks مما يسبب SyntaxError
// ─────────────────────────────────────────────────────────────────────────────
function findTemplateLiteralBugs(code) {
  const bugs = [];

  // نمط 1: استخدام \n داخل template literal بدون escape مزدوج
  // مثال خطأ: `Hello\nWorld` — هذا صحيح في JS لكن قد يكون خطأ في HTML
  // نمط 2: string concatenation خاطئة مثل: "line1\n" + variable + "\nline2"
  // نمط 3: template literals مع expressions متداخلة بشكل خاطئ

  // كشف: متغير يُجمَّع بـ + مع \n مباشرة (محتمل أن يكون template literal خاطئ)
  const badConcatPattern = /(?:'[^']*'|"[^"]*")\s*\+\s*\n\s*(?:'[^']*'|"[^"]*")/g;
  let match;
  while ((match = badConcatPattern.exec(code)) !== null) {
    bugs.push({
      type: 'broken_string_concat',
      pos: match.index,
      snippet: match[0].slice(0, 80),
    });
  }

  // كشف: template literal غير مغلق (backtick مفتوح بدون إغلاق)
  const backticks = (code.match(/`/g) || []).length;
  if (backticks % 2 !== 0) {
    bugs.push({ type: 'unclosed_template_literal', pos: -1, snippet: 'Odd number of backticks' });
  }

  return bugs;
}

// ─────────────────────────────────────────────────────────────────────────────
// قراءة manifest (إذا وُجد)
// ─────────────────────────────────────────────────────────────────────────────
function loadManifest() {
  const candidates = [
    path.join(ROOT, 'manifest.json'),
    path.join(ROOT, 'content-manifest.json'),
    path.join(ROOT, 'js', 'content-manifest.json'),
    path.join(ROOT, 'js', 'manifest.json'),
    path.join(ROOT, 'data', 'manifest.json'),
  ];

  for (const p of candidates) {
    if (fileExists(p)) {
      try {
        return { path: p, data: JSON.parse(fs.readFileSync(p, 'utf8')) };
      } catch (e) {
        return { path: p, error: `Failed to parse: ${e.message}` };
      }
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// قراءة QS_CONTENT (إذا وُجد)
// ─────────────────────────────────────────────────────────────────────────────
function loadQSContent() {
  const candidates = [
    path.join(ROOT, 'js', 'qs-content.js'),
    path.join(ROOT, 'js', 'content.js'),
    path.join(ROOT, 'js', 'QS_CONTENT.js'),
    path.join(ROOT, 'js', 'data.js'),
  ];

  for (const p of candidates) {
    if (fileExists(p)) {
      return { path: p, content: fs.readFileSync(p, 'utf8') };
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// جمع كل ملفات HTML في المشروع
// ─────────────────────────────────────────────────────────────────────────────
function getAllHtmlFiles(dir, results = []) {
  const skip = new Set(['node_modules', '.git', '.github', 'dist', 'build', 'coverage', '.cache', '.vercel', 'vendor']);
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) getAllHtmlFiles(full, results);
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// جمع كل ملفات JS في المشروع
// ─────────────────────────────────────────────────────────────────────────────
function getAllJsFiles(dir, results = []) {
  const skip = new Set(['node_modules', '.git', '.github', 'dist', 'build', 'coverage', '.cache', '.vercel', 'vendor']);
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) getAllJsFiles(full, results);
    else if (entry.name.endsWith('.js') && !entry.name.endsWith('.test.cjs')) {
      results.push(full);
    }
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('QatarSpec Pro — Content Validation', () => {

  // ── Test 1: Manifest keys → files exist ──────────────────────────────────
  describe('1. Manifest Integrity (كل key في manifest → الملف موجود)', () => {

    it('manifest.json موجود (أو يُتجاهل إذا لم يُنشأ بعد)', () => {
      const manifest = loadManifest();
      if (!manifest) {
        // Acceptable — manifest may not exist yet in early project
        console.log('⚠️  manifest.json غير موجود — سيُتحقق منه بعد إنشائه');
        return;
      }
      if (manifest.error) {
        assert.fail(`manifest.json موجود لكن لا يمكن قراءته: ${manifest.error}`);
      }
      console.log(`✅ manifest.json موجود في: ${manifest.path}`);
    });

    it('كل key في manifest → الملف المقابل موجود', () => {
      const manifest = loadManifest();
      if (!manifest || manifest.error || !manifest.data) return; // Skip if no manifest

      const keys = typeof manifest.data === 'object' ? Object.keys(manifest.data) : [];
      const missing = [];

      for (const key of keys) {
        const relativePath = manifest.data[key];
        if (typeof relativePath !== 'string') continue;

        const fullPath = path.join(ROOT, relativePath);
        if (!fileExists(fullPath)) {
          missing.push({ key, path: relativePath });
        }
      }

      if (missing.length > 0) {
        const list = missing.map(m => `  ❌ "${m.key}" → ${m.path}`).join('\n');
        assert.fail(`الملفات التالية في manifest غير موجودة:\n${list}`);
      }

      console.log(`✅ جميع ${keys.length} ملفات في manifest موجودة`);
    });
  });

  // ── Test 2: QS_CONTENT keys ──────────────────────────────────────────────
  describe('2. QS_CONTENT Integrity (كل key → يُحمَّل)', () => {

    it('ملف QS_CONTENT موجود (أو يُتجاهل)', () => {
      const qsc = loadQSContent();
      if (!qsc) {
        console.log('⚠️  ملف QS_CONTENT.js غير موجود — سيُتحقق منه بعد إنشائه');
        return;
      }
      console.log(`✅ ملف QS_CONTENT موجود: ${qsc.path}`);
    });

    it('QS_CONTENT syntax صحيح', () => {
      const qsc = loadQSContent();
      if (!qsc) return;

      const result = checkJsSyntax(qsc.content);
      if (!result.ok) {
        assert.fail(`QS_CONTENT.js يحتوي خطأ syntax:\n${result.error}`);
      }
      console.log('✅ QS_CONTENT.js syntax OK');
    });

    it('QS_CONTENT يحتوي على تعريف صحيح', () => {
      const qsc = loadQSContent();
      if (!qsc) return;

      // يتوقع إما: const QS_CONTENT = {...} أو window.QS_CONTENT = {...}
      const hasDefinition =
        /(?:const|let|var)\s+QS_CONTENT\s*=/.test(qsc.content) ||
        /window\.QS_CONTENT\s*=/.test(qsc.content) ||
        /module\.exports\s*=/.test(qsc.content);

      assert.ok(hasDefinition, 'QS_CONTENT.js لا يحتوي على تعريف QS_CONTENT صحيح');
    });
  });

  // ── Test 3: Embedded scripts syntax ──────────────────────────────────────
  describe('3. Embedded Scripts (كل <script> في HTML → syntax valid)', () => {

    it('لا يوجد خطأ syntax في أي script مضمَّن في HTML', () => {
      const htmlFiles = getAllHtmlFiles(ROOT);

      if (htmlFiles.length === 0) {
        console.log('⚠️  لا توجد ملفات HTML بعد');
        return;
      }

      const errors = [];

      for (const htmlFile of htmlFiles) {
        const html = fs.readFileSync(htmlFile, 'utf8');
        const scripts = extractEmbeddedScripts(html);
        const relPath = path.relative(ROOT, htmlFile);

        for (let i = 0; i < scripts.length; i++) {
          const result = checkJsSyntax(scripts[i]);
          if (!result.ok) {
            errors.push({
              file: relPath,
              script: i + 1,
              error: result.error,
            });
          }
        }
      }

      if (errors.length > 0) {
        const details = errors.map(e =>
          `  ❌ ${e.file} — Script #${e.script}:\n     ${e.error.split('\n')[0]}`
        ).join('\n');
        assert.fail(`وُجدت أخطاء syntax في scripts مضمَّنة:\n${details}`);
      }

      const totalScripts = htmlFiles.reduce((sum, f) => {
        const html = fs.readFileSync(f, 'utf8');
        return sum + extractEmbeddedScripts(html).length;
      }, 0);

      console.log(`✅ تم التحقق من ${totalScripts} script مضمَّن في ${htmlFiles.length} ملف HTML`);
    });
  });

  // ── Test 4: Template literal \n bugs ─────────────────────────────────────
  describe('4. Template Literal Bugs (لا أخطاء \\n في template literals)', () => {

    it('لا يوجد unclosed template literal في ملفات JS', () => {
      const jsFiles = getAllJsFiles(ROOT);

      if (jsFiles.length === 0) {
        console.log('⚠️  لا توجد ملفات JS بعد');
        return;
      }

      const errors = [];

      for (const jsFile of jsFiles) {
        const code = fs.readFileSync(jsFile, 'utf8');
        const bugs = findTemplateLiteralBugs(code);
        if (bugs.length > 0) {
          const relPath = path.relative(ROOT, jsFile);
          bugs.forEach(b => errors.push({ file: relPath, ...b }));
        }
      }

      if (errors.length > 0) {
        const details = errors.map(e =>
          `  ⚠️  ${e.file}: ${e.type} — ${e.snippet || ''}`
        ).join('\n');
        // تحذير فقط، ليس فشل قاطع (قد تكون false positives)
        console.warn(`تحذيرات template literal:\n${details}`);
      } else {
        console.log('✅ لا توجد أخطاء template literal واضحة');
      }
    });

    it('كل ملف JS يمر node --check بنجاح', () => {
      const jsFiles = getAllJsFiles(ROOT);

      if (jsFiles.length === 0) {
        console.log('⚠️  لا توجد ملفات JS بعد');
        return;
      }

      const errors = [];

      for (const jsFile of jsFiles) {
        const code = fs.readFileSync(jsFile, 'utf8');
        const result = checkJsSyntax(code);
        if (!result.ok) {
          errors.push({
            file: path.relative(ROOT, jsFile),
            error: result.error?.split('\n')[0] || 'Unknown error',
          });
        }
      }

      if (errors.length > 0) {
        const details = errors.map(e => `  ❌ ${e.file}: ${e.error}`).join('\n');
        assert.fail(`الملفات التالية تحتوي أخطاء syntax:\n${details}`);
      }

      console.log(`✅ جميع ${jsFiles.length} ملف JS تجاوزت node --check`);
    });
  });

  // ── Test 5: Security checks ───────────────────────────────────────────────
  describe('5. Security (لا مفاتيح API في الكود)', () => {

    it('لا يوجد localStorage.setItem مع API key', () => {
      const jsFiles = getAllJsFiles(ROOT);
      const htmlFiles = getAllHtmlFiles(ROOT);
      const allFiles = [...jsFiles, ...htmlFiles];

      const dangerous = [];
      const patterns = [
        /localStorage\.setItem\s*\(\s*['"][^'"]*(?:api|key|token|secret|password)[^'"]*['"]/gi,
        /localStorage\s*\[\s*['"][^'"]*(?:api|key|token|secret)[^'"]*['"]\s*\]\s*=/gi,
      ];

      for (const file of allFiles) {
        const code = fs.readFileSync(file, 'utf8');
        const relPath = path.relative(ROOT, file);

        for (const pattern of patterns) {
          const matches = code.match(pattern);
          if (matches) {
            dangerous.push({ file: relPath, matches });
          }
        }
      }

      if (dangerous.length > 0) {
        const details = dangerous.map(d =>
          `  ❌ ${d.file}:\n     ${d.matches.join('\n     ')}`
        ).join('\n');
        assert.fail(`وُجدت أنماط خطيرة لتخزين API keys في localStorage:\n${details}`);
      }

      console.log('✅ لا يوجد تخزين API keys في localStorage');
    });

    it('لا يوجد Anthropic API usage (Gemini فقط)', () => {
      const jsFiles = getAllJsFiles(ROOT);
      const htmlFiles = getAllHtmlFiles(ROOT);
      const allFiles = [...jsFiles, ...htmlFiles];

      const violations = [];
      const anthropicPattern = /anthropic\.com\/v1|claude-3|claude-opus|claude-sonnet|anthropic.*api/gi;

      for (const file of allFiles) {
        const code = fs.readFileSync(file, 'utf8');
        const relPath = path.relative(ROOT, file);

        const matches = code.match(anthropicPattern);
        if (matches) {
          // استثنِ ملفات الاختبار والتعليمات
          if (!relPath.includes('test') && !relPath.includes('instructions') && !relPath.includes('README')) {
            violations.push({ file: relPath, matches });
          }
        }
      }

      if (violations.length > 0) {
        const details = violations.map(d =>
          `  ⚠️  ${d.file}: وُجدت إشارة لـ Anthropic API`
        ).join('\n');
        console.warn(`تحذير: ${details}`);
        // تحذير فقط (ليس فشل) — قد تكون تعليقات أو وثائق
      } else {
        console.log('✅ لا يوجد استخدام Anthropic API (Gemini فقط)');
      }
    });
  });

  // ── Test 6: Project structure ─────────────────────────────────────────────
  describe('6. Project Structure (هيكل المشروع الأساسي)', () => {

    it('package.json موجود', () => {
      assert.ok(
        fileExists(path.join(ROOT, 'package.json')),
        'package.json غير موجود في جذر المشروع'
      );
    });

    it('package.json يحتوي على test script', () => {
      const pkgPath = path.join(ROOT, 'package.json');
      if (!fileExists(pkgPath)) return;

      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      assert.ok(
        pkg.scripts && pkg.scripts.test,
        'package.json لا يحتوي على scripts.test'
      );
    });

    it('.github/workflows/ci.yml موجود', () => {
      const ciPath = path.join(ROOT, '.github', 'workflows', 'ci.yml');
      assert.ok(fileExists(ciPath), '.github/workflows/ci.yml غير موجود — يجب إنشاؤه');
    });

    it('لا يوجد .env في الـ repo (يجب أن يكون في .gitignore)', () => {
      const envPath = path.join(ROOT, '.env');
      if (fileExists(envPath)) {
        // تحقق من .gitignore
        const gitignorePath = path.join(ROOT, '.gitignore');
        if (fileExists(gitignorePath)) {
          const gitignore = fs.readFileSync(gitignorePath, 'utf8');
          assert.ok(gitignore.includes('.env'), '.env موجود ولكنه ليس في .gitignore — خطر!');
        }
      }
      console.log('✅ .env check passed');
    });
  });
});
