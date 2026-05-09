// lib/api-error.js — QatarSpec Pro v1.0
// موحّد API error responses — استخدم هذا في كل API handler

export const API_ERRORS = {
  RATE_LIMIT:   { status: 429, code: 'RATE_LIMIT',   ar: 'تجاوزت الحد المسموح' },
  UNAUTHORIZED: { status: 401, code: 'UNAUTHORIZED',  ar: 'يجب تسجيل الدخول' },
  FORBIDDEN:    { status: 403, code: 'FORBIDDEN',     ar: 'غير مصرّح بهذه العملية' },
  PRO_REQUIRED: { status: 403, code: 'PRO_REQUIRED',  ar: 'هذه الميزة للمشتركين Pro فقط' },
  BAD_REQUEST:  { status: 400, code: 'BAD_REQUEST',   ar: 'بيانات غير صحيحة' },
  NOT_FOUND:    { status: 404, code: 'NOT_FOUND',     ar: 'غير موجود' },
  SERVER_ERROR: { status: 500, code: 'SERVER_ERROR',  ar: 'خطأ داخلي في الخادم' },
  GEMINI_ERROR: { status: 502, code: 'GEMINI_ERROR',  ar: 'خطأ في خدمة الذكاء الاصطناعي' },
  DB_ERROR:     { status: 502, code: 'DB_ERROR',      ar: 'خطأ في قاعدة البيانات' },
};

// للـ Node.js handlers (req/res style)
export function sendError(res, type, extra = {}) {
  const err = API_ERRORS[type] || API_ERRORS.SERVER_ERROR;
  return res.status(err.status).json({ error: err.ar, code: err.code, ...extra });
}

// للـ Edge handlers (new Response style)
export function edgeError(type, extra = {}, cors = {}) {
  const err = API_ERRORS[type] || API_ERRORS.SERVER_ERROR;
  return new Response(
    JSON.stringify({ error: err.ar, code: err.code, ...extra }),
    { status: err.status, headers: { 'Content-Type': 'application/json', ...cors } }
  );
}
