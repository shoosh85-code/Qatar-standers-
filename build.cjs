#!/usr/bin/env node
/**
 * QatarSpec Pro — Build Script
 * Minifies JS files using terser for production deployment.
 * Run: npm run build
 */
const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

const FILES_TO_MINIFY = [
  'inline-scripts.js',
  'js/core/ui-utils.js',
  'js/core/pro-system.js',
  'js/core/search-system.js',
  'js/core/calculators-ui.js',
  'js/core/forms.js',
  'js/core/doc-analyzer.js',
  'js/core/export-pdf.js',
  'js/core/video-system.js',
  'js/core/key-modal.js',
  'js/core/theme.js',
  'js/core/doc-upload.js',
  'js/core/translations.js',
  'js/ui-handlers.js',
  'loader.js',
];

const TERSER_OPTIONS = {
  compress: {
    drop_console: false, // keep console.warn for debugging
    passes: 2,
  },
  mangle: {
    reserved: [
      'QS', 'openDetail', 'goBack', 'showToast', 'isProUser',
      'sanitizeText', 'renderMarkdownSafe', 'safeRender',
      'filterCards', 'doSearch', 'exportToPDF', 'exportToWord',
      'bldCalc', 'bldTab', 'selectDaType', 'inspectorLoadImage',
    ]
  },
  output: {
    comments: false,
  }
};

async function build() {
  let totalOriginal = 0;
  let totalMinified = 0;
  let count = 0;

  for (const file of FILES_TO_MINIFY) {
    const inputPath = path.resolve(file);
    if (!fs.existsSync(inputPath)) {
      console.log(`  SKIP: ${file} (not found)`);
      continue;
    }

    const code = fs.readFileSync(inputPath, 'utf-8');
    const ext = path.extname(file);
    const outputPath = inputPath.replace(ext, '.min' + ext);

    try {
      const result = await minify(code, TERSER_OPTIONS);
      fs.writeFileSync(outputPath, result.code);
      
      const originalSize = Buffer.byteLength(code);
      const minifiedSize = Buffer.byteLength(result.code);
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      
      totalOriginal += originalSize;
      totalMinified += minifiedSize;
      count++;
      
      console.log(`  ✅ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(minifiedSize/1024).toFixed(1)}KB (-${savings}%)`);
    } catch (err) {
      console.log(`  ❌ ${file}: ${err.message.substring(0, 100)}`);
    }
  }

  console.log(`\n  TOTAL: ${(totalOriginal/1024).toFixed(1)}KB → ${(totalMinified/1024).toFixed(1)}KB (-${((1 - totalMinified/totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`  Files: ${count} minified`);
}

build().catch(console.error);
