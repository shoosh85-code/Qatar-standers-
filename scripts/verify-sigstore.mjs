#!/usr/bin/env node
// scripts/verify-sigstore.mjs
// QatarSpec Pro — التحقق من توقيعات sigstore محلياً
// الاستخدام: node scripts/verify-sigstore.mjs

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, readFileSync } from 'fs';

const run = promisify(exec);

console.log('=== QatarSpec Pro — Sigstore Verification ===\n');

// ─── 1. التحقق من وجود sigstore CLI ──────────────────────────────────────
async function checkSigstore() {
  try {
    const { stdout } = await run('sigstore --version');
    console.log('✅ sigstore CLI:', stdout.trim());
    return true;
  } catch {
    console.log('❌ sigstore CLI غير مثبت');
    console.log('   الحل: npm install -g @sigstore/cli');
    return false;
  }
}

// ─── 2. التحقق من bundle موجود ────────────────────────────────────────────
async function checkBundle() {
  const bundlePath = 'build-manifest.json.sigstore';
  const manifestPath = 'build-manifest.json';

  if (!existsSync(bundlePath)) {
    console.log('❌ build-manifest.json.sigstore غير موجود');
    console.log('   الحل: شغّل GitHub Actions أولاً');
    return false;
  }

  if (!existsSync(manifestPath)) {
    console.log('❌ build-manifest.json غير موجود');
    return false;
  }

  // اقرأ الـ bundle
  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  console.log('✅ Bundle موجود');
  console.log('   Commit:', manifest.commit);
  console.log('   Timestamp:', manifest.timestamp);
  console.log('   Actor:', manifest.actor);

  return true;
}

// ─── 3. التحقق الكامل ─────────────────────────────────────────────────────
async function verify() {
  try {
    const { stdout, stderr } = await run(
      'sigstore verify artifact build-manifest.json ' +
      '--bundle build-manifest.json.sigstore ' +
      '--certificate-identity-regexp "https://github.com/shoosh85-code/Qatar-standers-" ' +
      '--certificate-oidc-issuer https://token.actions.githubusercontent.com'
    );

    console.log('\n✅ التحقق ناجح — Supply chain آمن');
    if (stdout) console.log(stdout);
    return true;
  } catch (error) {
    console.log('\n❌ فشل التحقق:');
    console.log(error.stderr || error.message);
    return false;
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const hasSigstore = await checkSigstore();
  if (!hasSigstore) process.exit(1);

  const hasBundle = await checkBundle();
  if (!hasBundle) process.exit(1);

  console.log('\n=== التحقق من التوقيع ===');
  const verified = await verify();

  process.exit(verified ? 0 : 1);
}

main().catch(console.error);
