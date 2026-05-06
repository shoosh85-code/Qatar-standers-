// api/tap-webhook.js — QatarSpec Pro v1.0
// TAP Payments Webhook Handler — إدارة الاشتراكات تلقائياً
// يُستدعى من TAP عند: دفع ناجح / فاشل / انتهاء اشتراك / استرداد
// Dashboard: https://businesses.tap.company → Webhooks → https://qatar-standers.vercel.app/api/tap-webhook

import { createClient } from '@supabase/supabase-js';
import { withSentry, captureException, captureMessage } from './_lib/sentry.js';
import { rateLimit, getIp } from './rate-limit.js';

// ─── Supabase Admin Client ────────────────────────────────────────────────
function getSupabase() {
  const url   = process.env.SUPABASE_URL;
  const key   = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service Role — server only
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
  const email    = charge.customer?.email;
  const plan     = charge.metadata?.plan || 'pro';
  const tapId    = charge.id;
  const amount   = charge.amount;
  const currency = charge.currency;

  if (!email) {
    captureMessage('TAP webhook: charge بدون email', 'warning', { extra: { tapId } });
    return;
  }

  // حساب تاريخ انتهاء الاشتراك
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (plan === 'enterprise' ? 365 : 30));

  // تحديث Supabase
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      email,
      plan,
      status: 'active',
      tap_charge_id: tapId,
      amount_qar: amount,
      currency,
      expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

  if (error) {
    captureException(new Error(error.message), {
      tags: { event: 'charge.succeeded' },
      extra: { email, tapId },
    });
    throw error;
  }

  captureMessage(`✅ اشتراك مُفعَّل: ${email} → ${plan}`, 'info', {
    extra: { tapId, amount, currency, expiresAt },
  });
}

async function handleChargeFailed(charge, supabase) {
  const email = charge.customer?.email;
  const tapId = charge.id;
  if (!email) return;

  // لا نُلغي اشتراكاً موجوداً بسبب محاولة فاشلة — نسجّل فقط
  await supabase
    .from('payment_attempts')
    .insert({
      email,
      tap_charge_id: tapId,
      status: 'failed',
      failure_reason: charge.response?.message || 'unknown',
      created_at: new Date().toISOString(),
    });

  captureMessage(`❌ دفع فاشل: ${email}`, 'warning', { extra: { tapId } });
}

async function handleSubscriptionCancelled(charge, supabase) {
  const email = charge.customer?.email;
  if (!email) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('email', email);

  captureMessage(`🔴 اشتراك ملغى: ${email}`, 'info');
}

async function handleRefund(charge, supabase) {
  const email = charge.customer?.email;
  const tapId = charge.id;
  if (!email) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('tap_charge_id', tapId);

  captureMessage(`↩️ استرداد: ${email}`, 'info', { extra: { tapId } });
}

// ─── Main Handler ─────────────────────────────────────────────────────────
async function handler(req, res) {
  const ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);

  // TAP يرسل POST فقط
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Rate limit — حماية من إغراق الـ webhook
  const ip = getIp(req);
  const rl = await rateLimit(req, 'free', 'tap-webhook');
  if (!rl.allowed) {
    return res.status(429).json({ error: 'Too Many Requests', retryAfter: rl.retryAfter });
  }

  // قراءة الـ raw body للتحقق من التوقيع
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString('utf8');

  // التحقق من توقيع TAP
  const valid = await verifyTapSignature(req, rawBody);
  if (!valid) {
    captureMessage('TAP webhook: توقيع غير صالح', 'error', { extra: { ip } });
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // تحليل الـ payload
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { object: charge, status } = event;

  try {
    const supabase = getSupabase();

    // توجيه الحدث للمعالج المناسب
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
        // حدث غير معروف — سجّل ولا تُرجع خطأ
        console.log('[TAP Webhook] حدث غير معالج:', status);
    }

    // TAP يتوقع 200 — أي رمز آخر يُعيد المحاولة
    return res.status(200).json({ received: true, status });

  } catch (error) {
    captureException(error, {
      tags: { event: status, endpoint: 'tap-webhook' },
    });
    // أرجع 200 لمنع TAP من إعادة المحاولة المتكررة
    // الخطأ مُسجَّل في Sentry
    return res.status(200).json({ received: true, error: 'processing_error' });
  }
}

export default withSentry(handler);
