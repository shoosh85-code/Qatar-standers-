// /api/tap-webhook.js — QatarSpec Pro v1.1 (promoted from _staging)
// TAP Payments Webhook Handler — إدارة الاشتراكات تلقائياً
// يُستدعى من TAP عند: دفع ناجح / فاشل / انتهاء اشتراك / استرداد
// Dashboard: https://businesses.tap.company → Webhooks → https://qatar-standers.vercel.app/api/tap-webhook
// v1.1: shared rate limiting + NEXT_PUBLIC_SUPABASE_URL consistent + immediate 200

import { createClient }                              from '@supabase/supabase-js';
import { withSentry, captureException, captureMessage } from '../lib/sentry.js';
import { checkRateLimit }                            from '../lib/rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey }     from '../lib/supabase.js';

// ─── Supabase Admin Client ────────────────────────────────────────────────
function getSupabase() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) throw new Error('SUPABASE_URL أو SUPABASE_SERVICE_ROLE_KEY غير موجود');
  return createClient(url, key);
}

// ─── التحقق من توقيع TAP Webhook ─────────────────────────────────────────
// TAP يرسل header: tap-signature = HMAC-SHA256(body, TAP_WEBHOOK_SECRET)
async function verifyTapSignature(req, rawBody) {
  const signature = req.headers['tap-signature'];
  const secret    = process.env.TAP_WEBHOOK_SECRET;

  if (!secret) {
    // في development — تخطَّ التحقق مع تحذير
    console.warn('[TAP Webhook] ⚠️ TAP_WEBHOOK_SECRET غير موجود — تخطي التحقق');
    return true;
  }

  if (!signature) return false;

  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const expected = Array.from(new Uint8Array(mac))
    .map(b => b.toString(16).padStart(2, '0')).join('');

  return signature === expected;
}

// ─── معالجة أحداث TAP ────────────────────────────────────────────────────
async function handleChargeSucceeded(charge, supabase) {
  const email    = charge.customer?.email?.address || charge.customer?.email;
  const plan     = charge.metadata?.plan || 'monthly';
  const tapId    = charge.id;
  const amount   = charge.amount;
  const currency = charge.currency;

  if (!email) {
    captureMessage('TAP webhook: charge بدون email', 'warning', { extra: { tapId } });
    return;
  }

  // حساب تاريخ انتهاء الاشتراك
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (plan === 'yearly' ? 365 : 30));

  // تحديث Supabase — subscriptions table
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      email,
      plan,
      is_pro:        true,
      status:        'active',
      tap_charge_id: tapId,
      amount_qar:    amount,
      currency,
      activated_at:  new Date().toISOString(),
      expires_at:    expiresAt.toISOString(),
      updated_at:    new Date().toISOString(),
    }, { onConflict: 'email' });

  if (error) {
    captureException(new Error(error.message), {
      tags:  { event: 'charge.succeeded' },
      extra: { email, tapId },
    });
    throw error;
  }

  captureMessage(`✅ اشتراك مُفعَّل: ${email} → ${plan}`, 'info', {
    extra: { tapId, amount, currency, expiresAt },
  });
}

async function handleChargeFailed(charge, supabase) {
  const email = charge.customer?.email?.address || charge.customer?.email;
  const tapId = charge.id;
  if (!email) return;

  // لا نُلغي اشتراكاً موجوداً بسبب محاولة فاشلة — نسجّل فقط
  await supabase
    .from('payment_attempts')
    .insert({
      email,
      tap_charge_id: tapId,
      status:        'failed',
      failure_reason: charge.response?.message || 'unknown',
      created_at:    new Date().toISOString(),
    });

  captureMessage(`❌ دفع فاشل: ${email}`, 'warning', { extra: { tapId } });
}

async function handleSubscriptionCancelled(charge, supabase) {
  const email = charge.customer?.email?.address || charge.customer?.email;
  if (!email) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled', is_pro: false, updated_at: new Date().toISOString() })
    .eq('email', email);

  captureMessage(`🔴 اشتراك ملغى: ${email}`, 'info');
}

async function handleRefund(charge, supabase) {
  const email = charge.customer?.email?.address || charge.customer?.email;
  const tapId = charge.id;
  if (!email) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'refunded', is_pro: false, updated_at: new Date().toISOString() })
    .eq('tap_charge_id', tapId);

  captureMessage(`↩️ استرداد: ${email}`, 'info', { extra: { tapId } });
}

// ─── Main Handler ─────────────────────────────────────────────────────────
async function handler(req, res) {
  const ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);

  // TAP يرسل POST فقط
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // ── Rate Limit — حماية من إغراق الـ webhook (PROTOCOL 6 — Upstash Redis) ──
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
           || req.socket?.remoteAddress || '0.0.0.0';
  const rl = await checkRateLimit(ip, '/api/ai-proxy', false);
  if (!rl.allowed) {
    // أرجع 200 لمنع TAP من إعادة المحاولة — لكن سجّل الـ rate limit
    console.warn('[tap-webhook] rate limited IP:', ip);
    return res.status(200).json({ received: true, note: 'rate_limited' });
  }

  // ── قراءة الـ raw body للتحقق من التوقيع ────────────────────────────────
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString('utf8');

  // ── التحقق من توقيع TAP ──────────────────────────────────────────────────
  const valid = await verifyTapSignature(req, rawBody);
  if (!valid) {
    captureMessage('TAP webhook: توقيع غير صالح', 'error', { extra: { ip } });
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // ── تحليل الـ payload ────────────────────────────────────────────────────
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { object: charge, status } = event;

  // ── إرجاع 200 فوراً — TAP يعيد المحاولة إذا لم يستلم 200 خلال 30s ──────
  // المعالجة تحدث بعد الـ response (fire-and-forget مع catch)
  res.status(200).json({ received: true, status });

  // ── معالجة الحدث ─────────────────────────────────────────────────────────
  try {
    const supabase = getSupabase();

    switch (status) {
      case 'CAPTURED':
        await handleChargeSucceeded(charge, supabase);
        break;
      case 'DECLINED':
      case 'FAILED':
      case 'CANCELLED':
        await handleChargeFailed(charge, supabase);
        break;
      case 'REFUNDED':
        await handleRefund(charge, supabase);
        break;
      case 'SUBSCRIPTION_CANCELLED':
        await handleSubscriptionCancelled(charge, supabase);
        break;
      default:
        console.log('[TAP Webhook] حدث غير معالج:', status);
    }
  } catch (error) {
    captureException(error, {
      tags:  { event: status, endpoint: 'tap-webhook' },
      extra: { ip },
    });
    // الـ response أُرسل بالفعل — الخطأ مُسجَّل في Sentry
  }
}

export default withSentry(handler);
