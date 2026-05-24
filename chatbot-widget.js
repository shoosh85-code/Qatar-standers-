/**
 * QatarSpec Pro — Support Chatbot Widget
 * أضف هذا الملف في نهاية كل صفحة HTML قبل </body>
 * <script src="/chatbot-widget.js"></script>
 */

(function () {
  'use strict';

  // ──────────────── CONFIG ────────────────
  const CFG = {
    apiEndpoint: '/api/chatbot',
    maxHistory: 20,        // عدد رسائل محفوظة في السياق
    typingDelay: 600,      // ms قبل ظهور typing indicator
    welcomeDelay: 1200,    // ms قبل ظهور رسالة الترحيب
    colors: {
      maroon: '#7A1515',
      maroonDark: '#5a0e0e',
      gold: '#C9A84C',
      goldLight: '#e8c86a',
      goldPale: '#f5e9c8',
    }
  };

  // ──────────────── STATE ────────────────
  let isOpen = false;
  let isTyping = false;
  let messageHistory = [];
  let hasGreeted = false;
  let unreadCount = 0;

  // ──────────────── DETECT LANGUAGE ────────────────
  function detectLang(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
  }

  // ──────────────── QUICK REPLIES ────────────────
  const QUICK_REPLIES = [
    { ar: 'كيف أبحث في QCS 2024؟',         en: 'How to search QCS 2024?' },
    { ar: 'ما الفرق بين Free و Pro؟',        en: 'Free vs Pro difference?' },
    { ar: 'كيف أستخدم المفتش الذكي؟',        en: 'How to use AI Inspector?' },
    { ar: 'كيف أُنشئ ITP؟',                  en: 'How to create an ITP?' },
    { ar: 'كيف أُصدّر تقرير PDF؟',           en: 'How to export PDF report?' },
    { ar: 'كيف أثبّت التطبيق offline؟',      en: 'How to install app offline?' },
  ];

  // ──────────────── STYLES ────────────────
  const STYLES = `
    #qs-chat-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 58px;
      height: 58px;
      background: linear-gradient(135deg, #7A1515, #9e2020);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(122,21,21,0.45);
      z-index: 9998;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: 2.5px solid #C9A84C;
    }
    #qs-chat-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(122,21,21,0.55);
    }
    #qs-chat-btn svg { transition: transform 0.3s ease; }
    #qs-chat-btn.open svg { transform: rotate(90deg); }

    #qs-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      background: #C9A84C;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 900;
      color: #5a0e0e;
      border: 2px solid #fff;
    }
    #qs-badge.show { display: flex; }

    #qs-chat-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 360px;
      height: 520px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 48px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      z-index: 9999;
      overflow: hidden;
      transform: scale(0.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 1px solid rgba(201,168,76,0.3);
    }
    #qs-chat-window.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* Header */
    #qs-chat-header {
      background: linear-gradient(135deg, #5a0e0e, #7A1515);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #qs-chat-avatar {
      width: 38px;
      height: 38px;
      background: rgba(201,168,76,0.2);
      border: 2px solid #C9A84C;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 900;
      color: #C9A84C;
      flex-shrink: 0;
    }
    #qs-chat-info { flex: 1; }
    #qs-chat-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #e8c86a;
      line-height: 1.2;
    }
    #qs-chat-status {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }
    .qs-status-dot {
      width: 7px;
      height: 7px;
      background: #4ade80;
      border-radius: 50%;
      animation: qs-pulse 2s infinite;
    }
    @keyframes qs-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    #qs-close-btn {
      background: rgba(255,255,255,0.1);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.7);
      font-size: 16px;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    #qs-close-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }

    /* Messages */
    #qs-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #fdf8f0;
    }
    #qs-messages::-webkit-scrollbar { width: 4px; }
    #qs-messages::-webkit-scrollbar-track { background: transparent; }
    #qs-messages::-webkit-scrollbar-thumb { background: #ede8e0; border-radius: 4px; }

    .qs-msg {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      max-width: 88%;
    }
    .qs-msg.bot { align-self: flex-start; flex-direction: row; }
    .qs-msg.user { align-self: flex-end; flex-direction: row-reverse; }

    .qs-msg-avatar {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #7A1515, #9e2020);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 900;
      color: #C9A84C;
      flex-shrink: 0;
    }

    .qs-bubble {
      padding: 10px 13px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.65;
      max-width: 100%;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    .qs-msg.bot .qs-bubble {
      background: #fff;
      color: #1a1410;
      border-radius: 14px 14px 14px 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      font-family: 'Cairo', sans-serif;
    }
    .qs-msg.user .qs-bubble {
      background: linear-gradient(135deg, #7A1515, #9e2020);
      color: #fff;
      border-radius: 14px 14px 4px 14px;
      font-family: 'Cairo', sans-serif;
    }

    .qs-time {
      font-size: 9.5px;
      color: #b0a898;
      margin-top: 3px;
      align-self: flex-end;
    }
    .qs-msg.user .qs-time { text-align: right; }

    /* Typing indicator */
    .qs-typing-dots {
      display: flex;
      gap: 4px;
      padding: 12px 14px;
    }
    .qs-typing-dots span {
      width: 7px;
      height: 7px;
      background: #C9A84C;
      border-radius: 50%;
      animation: qs-bounce 1.2s infinite;
    }
    .qs-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .qs-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes qs-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }

    /* Quick replies */
    #qs-quick-replies {
      padding: 8px 12px 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      background: #fdf8f0;
      border-top: 1px solid #ede8e0;
      flex-shrink: 0;
    }
    .qs-quick-btn {
      background: #fff;
      border: 1.5px solid #C9A84C;
      color: #5a0e0e;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-family: 'Cairo', sans-serif;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .qs-quick-btn:hover {
      background: #C9A84C;
      color: #fff;
    }

    /* Input area */
    #qs-input-area {
      padding: 10px 12px;
      border-top: 1px solid #ede8e0;
      display: flex;
      gap: 8px;
      align-items: flex-end;
      background: #fff;
      flex-shrink: 0;
    }
    #qs-input {
      flex: 1;
      border: 1.5px solid #ede8e0;
      border-radius: 22px;
      padding: 9px 14px;
      font-family: 'Cairo', sans-serif;
      font-size: 13px;
      outline: none;
      resize: none;
      max-height: 80px;
      min-height: 38px;
      line-height: 1.5;
      color: #1a1410;
      background: #fdf8f0;
      transition: border-color 0.2s;
    }
    #qs-input:focus { border-color: #C9A84C; }
    #qs-input::placeholder { color: #b0a898; }

    #qs-send-btn {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #7A1515, #9e2020);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s, opacity 0.15s;
    }
    #qs-send-btn:hover { transform: scale(1.08); }
    #qs-send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    /* Rate limit message */
    .qs-rate-msg {
      text-align: center;
      padding: 8px 12px;
      background: #fff5f5;
      border: 1px solid #ffbdbd;
      border-radius: 8px;
      font-size: 12px;
      color: #c0392b;
      font-family: 'Cairo', sans-serif;
    }

    /* Pro badge in bubble */
    .qs-pro-tag {
      display: inline-block;
      background: #C9A84C;
      color: #5a0e0e;
      font-size: 9px;
      font-weight: 700;
      font-family: 'Montserrat', sans-serif;
      padding: 1px 6px;
      border-radius: 10px;
      letter-spacing: 0.5px;
      vertical-align: middle;
    }

    /* Mobile responsive */
    @media (max-width: 420px) {
      #qs-chat-window {
        right: 8px;
        left: 8px;
        width: auto;
        bottom: 84px;
        height: 480px;
      }
      #qs-chat-btn { right: 16px; bottom: 16px; }
    }
  `;

  // ──────────────── INJECT STYLES ────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // ──────────────── BUILD HTML ────────────────
  function buildWidget() {
    // Floating button
    const btn = document.createElement('div');
    btn.id = 'qs-chat-btn';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'فتح المساعد الذكي');
    btn.innerHTML = `
      <div id="qs-badge"></div>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              fill="#C9A84C"/>
        <circle cx="8" cy="11" r="1.2" fill="#5a0e0e"/>
        <circle cx="12" cy="11" r="1.2" fill="#5a0e0e"/>
        <circle cx="16" cy="11" r="1.2" fill="#5a0e0e"/>
      </svg>`;

    // Chat window
    const win = document.createElement('div');
    win.id = 'qs-chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'QS Assistant');
    win.innerHTML = `
      <div id="qs-chat-header">
        <div id="qs-chat-avatar">QS</div>
        <div id="qs-chat-info">
          <div id="qs-chat-name">QS Assistant</div>
          <div id="qs-chat-status">
            <span class="qs-status-dot"></span>
            <span id="qs-status-text">متصل الآن</span>
          </div>
        </div>
        <button id="qs-close-btn" aria-label="إغلاق">✕</button>
      </div>

      <div id="qs-messages"></div>

      <div id="qs-quick-replies"></div>

      <div id="qs-input-area">
        <textarea id="qs-input"
          placeholder="اكتب سؤالك..."
          rows="1"
          maxlength="500"
          autocomplete="off"
          dir="auto"
        ></textarea>
        <button id="qs-send-btn" aria-label="إرسال">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="#C9A84C" stroke-width="2.2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>`;

    document.body.appendChild(btn);
    document.body.appendChild(win);
    return { btn, win };
  }

  // ──────────────── HELPERS ────────────────
  function getTime() {
    return new Date().toLocaleTimeString('ar-QA', { hour: '2-digit', minute: '2-digit' });
  }

  function scrollBottom() {
    const msgs = document.getElementById('qs-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  }

  // ──────────────── ADD MESSAGE ────────────────
  function addMessage(content, role = 'bot') {
    const msgs = document.getElementById('qs-messages');
    const wrap = document.createElement('div');
    wrap.className = `qs-msg ${role}`;

    const lang = detectLang(content);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (role === 'bot') {
      wrap.innerHTML = `
        <div class="qs-msg-avatar">QS</div>
        <div>
          <div class="qs-bubble" dir="${dir}">${escapeHTML(content)}</div>
          <div class="qs-time">${getTime()}</div>
        </div>`;
    } else {
      wrap.innerHTML = `
        <div>
          <div class="qs-bubble" dir="${dir}">${escapeHTML(content)}</div>
          <div class="qs-time">${getTime()}</div>
        </div>`;
    }

    msgs.appendChild(wrap);
    scrollBottom();

    // Count unread if window is closed
    if (!isOpen && role === 'bot') {
      unreadCount++;
      updateBadge();
    }
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\n/g, '<br>');
  }

  // ──────────────── TYPING INDICATOR ────────────────
  function showTyping() {
    removeTyping();
    const msgs = document.getElementById('qs-messages');
    const el = document.createElement('div');
    el.id = 'qs-typing';
    el.className = 'qs-msg bot';
    el.innerHTML = `
      <div class="qs-msg-avatar">QS</div>
      <div class="qs-bubble" style="padding:0">
        <div class="qs-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    msgs.appendChild(el);
    scrollBottom();
  }

  function removeTyping() {
    const el = document.getElementById('qs-typing');
    if (el) el.remove();
  }

  // ──────────────── BADGE ────────────────
  function updateBadge() {
    const badge = document.getElementById('qs-badge');
    if (!badge) return;
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  }

  // ──────────────── QUICK REPLIES ────────────────
  function renderQuickReplies(lang = 'ar') {
    const container = document.getElementById('qs-quick-replies');
    if (!container) return;
    container.innerHTML = '';

    if (messageHistory.length > 2) return; // إخفاء بعد المحادثة

    QUICK_REPLIES.slice(0, 4).forEach(qr => {
      const btn = document.createElement('button');
      btn.className = 'qs-quick-btn';
      btn.textContent = lang === 'ar' ? qr.ar : qr.en;
      btn.onclick = () => sendMessage(btn.textContent);
      container.appendChild(btn);
    });
  }

  // ──────────────── SEND MESSAGE ────────────────
  async function sendMessage(text) {
    text = text?.trim();
    if (!text || isTyping) return;

    const input = document.getElementById('qs-input');
    const sendBtn = document.getElementById('qs-send-btn');
    if (input) { input.value = ''; autoResize(input); }

    // Hide quick replies
    const qr = document.getElementById('qs-quick-replies');
    if (qr) qr.innerHTML = '';

    // Add user message
    addMessage(text, 'user');
    messageHistory.push({ role: 'user', content: text });
    if (messageHistory.length > CFG.maxHistory) {
      messageHistory = messageHistory.slice(-CFG.maxHistory);
    }

    isTyping = true;
    if (sendBtn) sendBtn.disabled = true;

    // ═══════════════════════════════════════════════════════════
    // QATARSPEC KNOWLEDGE ENGINE — 50+ entries, score-based matching
    // ═══════════════════════════════════════════════════════════
    var _q = text.toLowerCase();
    var _KB = [
      // ── APP FEATURES ──────────────────────────────────────
      { k: ['مفتش','inspector','فحص صور','site photo','كشف عيوب','defect'], w: 5,
        r: '🔍 **المفتش الذكي (AI Site Inspector) — Pro:**\n\n**ما هو؟** أداة AI تحلل صور الموقع وتكشف مخالفات QCS 2024.\n\n**كيف تستخدمه:**\n1. افتح كرت "المفتش الذكي" من الأدوات الذكية\n2. التقط صورة من الموقع أو ارفع صورة\n3. AI يكشف: تشققات، تعشيش، نزيف إسفلتي، هبوط، تقشّر\n4. تقرير فوري بالعربي مع مرجع QCS دقيق\n\n⚠️ متاح لمشتركي Pro فقط (99 QAR/شهر)' },

      { k: ['محلل وثائق','محلل مستند','analyzer','تحليل عقد','تحليل مواصفة','document analy'], w: 5,
        r: '📄 **محلل الوثائق الذكي (AI Analyzer) — Pro:**\n\n**ما هو؟** أداة AI تقرأ ملفات PDF (عقود، مواصفات) وتحللها.\n\n**كيف تستخدمه:**\n1. افتح كرت "محلل الوثائق الذكي"\n2. ارفع ملف PDF (حتى 50MB)\n3. AI يستخرج البنود والمتطلبات\n4. يقارنها مع QCS 2024 ويكشف التعارضات\n\n⚠️ متاح لمشتركي Pro فقط' },

      { k: ['محلل مخطط','drawing analy','تحليل رسم','رسومات','shop drawing','مراجعة مخطط'], w: 5,
        r: '📐 **محلل المخططات الذكي (AI Drawing Analyzer) — Pro:**\n\n**ما هو؟** أداة AI تراجع الرسومات الهندسية.\n\n**كيف تستخدمه:**\n1. افتح كرت "محلل المخططات الذكي"\n2. ارفع صورة أو PDF للمخطط\n3. AI يراجع: أبعاد، تفاصيل تسليح، مقاطع طرق\n4. تقرير توافق مع QCS 2024\n\n⚠️ متاح لمشتركي Pro فقط' },

      { k: ['itp','خطة فحص','inspection test','نقاط فحص','hold point','witness'], w: 5,
        r: '📋 **إنشاء ITP (Inspection & Test Plan):**\n\n**3 طرق متاحة:**\n\n1️⃣ **مولّد المستندات الشامل (Pro):**\nافتح الكرت → اختر ITP → Wizard 5 خطوات → جاهز!\n\n2️⃣ **مولّد MOS/ITP (Pro):**\nيولّد ITP مع 9 مراحل QCS 2024 + نقاط H/W/R/M\n\n3️⃣ **نماذج Ashghal (مجاني):**\nافتح "نماذج Ashghal" → تاب ITP → املأ البيانات\n\n**نقاط الفحص:**\n• H = Hold Point (إلزامي — لا تكمل بدون موافقة)\n• W = Witness Point (حضور مرغوب)\n• R = Review (مراجعة وثائق)\n• M = Monitor (متابعة)' },

      { k: ['مولد مستند','doc generator','wizard','توليد'], w: 5,
        r: '📝 **مولّد المستندات الشامل (Pro):**\n\n**ما هو؟** Wizard ذكي يولّد مستندات هندسية.\n\n**المستندات المتاحة:**\n• Method Statement (طريقة تنفيذ)\n• ITP (خطة فحص واختبار)\n• NCR (تقرير عدم مطابقة)\n• DPR (تقرير يومي)\n\n**كيف تستخدمه:**\n1. افتح كرت "مولّد المستندات الشامل"\n2. اختر نوع المستند\n3. 5 خطوات → مستند جاهز بمراجع QCS 2024\n4. تصدير Word / PDF / طباعة' },

      { k: ['method statement','طريقة تنفيذ','طريقة عمل','mos','منهجية'], w: 5,
        r: '📋 **مولّد طريقة التنفيذ (Method Statement):**\n\n**مجاني!** افتح كرت "مولّد طريقة التنفيذ"\n\n**يشمل:**\n• 12 نوع نشاط (خرسانة/أسفلت/حفر/ردم/تسليح/عزل...)\n• النطاق · المعدات · الجودة · السلامة\n• مرجع QCS 2024 في كل بند\n• طباعة بتنسيق Ashghal فوراً\n\n**كيف:**\n1. افتح الكرت\n2. اختر نوع النشاط\n3. أدخل تفاصيل المشروع\n4. AI يولّد الوثيقة كاملة' },

      { k: ['rfi','طلب معلومات','request for info'], w: 5,
        r: '📨 **نموذج RFI (Request for Information):**\n\nافتح كرت "نماذج Ashghal" → تاب RFI\n\n**الحقول:**\nرقم RFI · المشروع · المقاول · التاريخ · الموقع · QCS Clause · النشاط · نقطة الفحص\n\n**المميزات:**\n• ترقيم تلقائي\n• نسخ للواتساب بضغطة واحدة\n• تصدير PDF بتنسيق Ashghal' },

      { k: ['dpr','تقرير يومي','daily progress','daily report','سجل يومي'], w: 5,
        r: '📊 **نموذج DPR (Daily Progress Report):**\n\nافتح كرت "نماذج Ashghal" → تاب DPR\n\n**يشمل:**\n• بيانات المشروع والتاريخ والطقس\n• العمالة والمعدات\n• الإنجاز اليومي\n• المشاكل والملاحظات\n• نسخ للواتساب أو تصدير PDF' },

      { k: ['ncr','مخالف','عدم مطابق','non conform','تقرير مخالف'], w: 5,
        r: '🔴 **NCR (Non-Conformance Report):**\n\n**نموذج NCR:** افتح "نماذج Ashghal" → تاب NCR\n• وصف المخالفة · السبب الجذري · الإجراء التصحيحي\n• ترقيم تلقائي · تصدير PDF\n\n**قاعدة بيانات NCR الشاملة:** 1500+ تقرير\n• 9 تخصصات: صرف · مياه · TSE · حفر · خرسانة · تشطيب · سباكة · كهرباء\n• بحث فوري · ثنائي اللغة\n• افتح كرت "قاعدة بيانات NCR الشاملة"' },

      { k: ['نماذج','forms','نموذج','ashghal form'], w: 4,
        r: '📋 **نماذج Ashghal الرسمية (مجاني):**\n\nافتح كرت "نماذج Ashghal" — 4 نماذج:\n\n• **RFI** — طلب معلومات/فحص\n• **NCR** — تقرير عدم مطابقة\n• **DPR** — تقرير تقدم يومي\n• **ITP** — خطة فحص واختبار\n\nكل نموذج: ترقيم تلقائي + نسخ واتساب + تصدير PDF' },

      { k: ['حاسب','حاسبات','calculator','calc','pass fail','اختبار'], w: 4,
        r: '🧮 **الحاسبات الهندسية (8 حاسبات):**\n\n1. **حاسبة المواصفات** — 50+ اختبار Pass/Fail فوري\n2. **حاسبة المباني** — خرسانة + حديد + طابوق + بلاط\n3. **ESAL Calculator** — حمولة المرور التصميمية\n4. **Mix Design Validator** — فحص تدرج الركام والفراغات\n5. **Pipe Sizing** — أقطار المواسير + Manning\n6. **Rebar Cover** — غطاء خرساني + طول الوصل\n7. **Superpave Mix** — PG Grade + VMA + VFA\n8. **Marshall Mix** — ثبات + انسياب + Gmm\n\nافتح قسم "مركز التصميم والحاسبات" من الرئيسية' },

      { k: ['مشروع','project','مشاريع','لوحة مشاريع','project hub'], w: 4,
        r: '📊 **لوحة المشاريع (Project Hub):**\n\n**كيف تفتحها:** اضغط "📊 مشاريعي" في الأعلى\n\n**الميزات:**\n• إنشاء مشاريع متعددة\n• التقارير اليومية لكل مشروع\n• طلبات الفحص (IR)\n• اعتماد المواد\n• سجل NCR\n• صور الموقع\n• BOQ\n• شهادات الدفع IPC\n\n**تسجيل الدخول:** بالإيميل عبر Supabase Auth' },

      { k: ['boq','تسعير','كميات','bill of quantities','pricer'], w: 5,
        r: '💰 **تسعير BOQ (Bill of Quantities):**\n\nافتح "💰 تسعير BOQ" من الأعلى\n\n**الميزات:**\n• إدخال بنود الكميات\n• أسعار الوحدة\n• حساب تلقائي للإجمالي\n• تصدير Excel بتنسيق Ashghal' },

      { k: ['تصدير','export','طباعة','print','تحميل','download'], w: 4,
        r: '📥 **التصدير والطباعة:**\n\n**من أي قسم مفتوح:**\n• 🔴 PDF — تصدير احترافي بهيدر QatarSpec + QCS\n• 🔵 DOC — Word قابل للتعديل\n• 🖨️ طباعة — مباشرة من المتصفح\n• 🔗 مشاركة — نسخ رابط القسم\n\n**ملاحظة:** التصدير متاح لمشتركي Pro\nالمستخدم المجاني يمكنه الطباعة والنسخ' },

      { k: ['بحث','search','بحث ذكي','ai search','rag'], w: 4,
        r: '🔍 **البحث الذكي (AI Search):**\n\n**كيف تستخدمه:**\n1. اكتب سؤالك في شريط البحث بالأعلى\n2. أو اضغط على اقتراحات البحث السريع\n3. AI يبحث في QCS 2024 الفعلي (RAG)\n4. النتيجة مع Part/Section/Clause دقيق\n\n**حدود البحث:**\n• Free: 5 بحث/يوم\n• Pro: غير محدود\n\n**يدعم:** عربي + إنجليزي + رفع PDF' },

      { k: ['معدات','equipment','آليات','machinery','grader','roller','paver','excavator'], w: 4,
        r: '🚜 **معدات المشاريع (66 معدة):**\n\n4 أقسام:\n• **معدات الطرق** (8): Grader, Roller, Paver, NDG...\n• **معدات المرافق** (16): Excavator, Fusion, CCTV...\n• **معدات الإنشاء** (14): Pump, Mixer, Vibrator...\n• **معدات الجسات** (19): Rig, SPT, Shelby...\n\nكل معدة: الوصف + المواصفات + معيار QCS/ASTM\nافتح الكروت في قسم "مركز المعدات"' },

      { k: ['execution hub','تنفيذ ميداني','pour card','بطاقة صب','mar','اعتماد مواد'], w: 5,
        r: '🏗️ **لوحة التنفيذ الميداني:**\n\nافتح كرت "لوحة التنفيذ الميداني"\n\n**الأدوات:**\n• بطاقة صب الخرسانة (Pour Card)\n• موافقة مواد (MAR)\n• NCR مخالفة\n• متابعة اختبارات Pass/Fail\n• سجل يومي DWR\n• مساعد AI ميداني' },

      { k: ['work acceptance','استلام أعمال','قبول أعمال','فحص استلام'], w: 5,
        r: '✅ **استلام الأعمال (Work Acceptance):**\n\nصفحة متخصصة لفحص واستلام 13 نوع عمل حسب QCS 2024:\nأعمال ترابية · أساسات · خرسانة · طرق · مرافق · تشطيبات...\n\n**كيف:** افتح work-acceptance.html\nاختر نوع العمل → Checklist تفاعلي → Pass/Fail → تصدير PDF/Word' },

      { k: ['tools','أدوات ai','أدوات مهندس','freecad','python','bim'], w: 4,
        r: '🤖 **أدوات AI للمهندسين:**\n\nافتح كرت "أدوات AI للمهندسين"\n\n**يشمل:**\n• CAD + FEM + BIM مفتوحة المصدر (FreeCAD, CalculiX, OpenFOAM)\n• مكتبات Python للهندسة\n• روابط المواصفات القطرية الرسمية\n• أدوات تحليل إنشائي' },

      { k: ['payment','دفع','شهادة دفع','ipc','retention','cash flow','s-curve'], w: 5,
        r: '💰 **شهادات الدفع والتدفق النقدي (Pro):**\n\nافتح كرت "شهادات الدفع والتدفق النقدي"\n\n• **IPC** — شهادة الدفع المؤقت (FIDIC Clause 14)\n• **Retention** — حساب الاحتجاز 10% + الإفراج\n• **Cash Flow** — منحنى S + تدفق نقدي شهري' },

      { k: ['schedule','جدول زمني','gantt','primavera','برنامج زمني','critical path'], w: 5,
        r: '📅 **البرنامج الزمني (Pro):**\n\nافتح كرت "البرنامج الزمني للمشروع"\n\n• مخطط جانت تفاعلي\n• المسار الحرج (CPM) + Float\n• منحنى S مربوط بالتدفق النقدي\n• تصدير بصيغة Primavera' },

      // ── CONTENT SECTIONS ──────────────────────────────────
      { k: ['طرق','road','asphalt','اسفلت','رصف','pavement','subgrade','subbase','wearing'], w: 4,
        r: '🛣️ **أعمال الطرق — QCS 2024 §S8:**\n\nافتح كرت "أعمال الطرق"\n\n**الطبقات:**\n• Subgrade (تربة طبيعية) — CBR ≥ 8% · دمك ≥ 95%\n• Subbase — CBR ≥ 30% · دمك ≥ 95%\n• Road Base — CBR ≥ 80% · دمك ≥ 98%\n• DBM (طبقة ربط) — فرد ≥ 140°C · دمك ≥ 96% Gmm\n• Wearing Course — فرد ≥ 145°C · دمك ≥ 98% Gmm' },

      { k: ['مرافق','utilit','مياه','sewer','صرف','ماء','pipe','أنابيب','مواسير','kahramaa'], w: 4,
        r: '🔧 **شبكات المرافق — QCS 2024 §S20:**\n\nافتح كرت "شبكات المرافق"\n\n• **مياه شرب:** HDPE PN16 أو DI K9 · اختبار 1.5×PN · تعقيم ≥50ppm\n• **صرف صحي:** uPVC SN8 أو GRP · CCTV بعد التركيب\n• **تصريف أمطار:** RCP Class III · ميل ≥ 0.5%\n• **TSE (معالجة):** HDPE PN10 بنفسجي · منفصلة عن الشرب' },

      { k: ['خرسان','concrete','صب','cover','غطاء','curing','معالج','slump','هبوط','cube','مكعب'], w: 4,
        r: '🏗️ **الخرسانة — QCS 2024 §S5:**\n\nافتح كرت "مرجع الخرسانة السريع"\n\n• **الدرجات:** C15 بلايندنج · C25 أساسات · C32 أعمدة · C40 جسور\n• **الغطاء:** Slab 25mm · Beam 30mm · Foundation 50mm\n• **المعالجة:** ≥ 7 أيام رطوبة مستمرة\n• **Slump:** عادي 75-125mm · مضخة 100-150mm\n• **مكعبات:** عينة كل 50m³ · 3 مكعبات (7d/28d)' },

      { k: ['تسليح','rebar','حديد','وصل','lap','splice','كان','stirrup'], w: 4,
        r: '🔩 **حديد التسليح — QCS 2024 §S5:**\n\n• **طول الوصل (Lap):** شدّ ≥ 40φ أو 300mm · ضغط ≥ 30φ أو 200mm\n• **الغطاء:** Slab 25mm · Beam/Column 30mm · Foundation 50mm\n• **الكانات (Stirrups):** مغلقة بزاوية 135°\n• **المعيار:** BS 4449 · QCS 2024 §S5-P5\n\nاستخدم "حاسبة الحديد والتسليح" للحساب الفوري!' },

      { k: ['أساس','foundation','خازوق','pile','raft','لبشة','pad','شريط','strip','bearing','تحمل'], w: 4,
        r: '⚓ **الأساسات — QCS 2024 §S5-P7:**\n\nافتح كرت "الأساسات"\n\n• **معزول/شريطي:** قدرة تحمّل ≥ 150 kPa · غطاء ≥ 50mm\n• **لبشة (Raft):** سُمك ≥ 500mm للمباني متعددة الطوابق\n• **خوازيق:** SLT: ≥ 1% · PDA: ≥ 5% · PIT: 100% عند الشك\n• **Shoring:** Sheet Pile إذا عمق > 1.2m\n• **Dewatering:** ≥ 500mm أسفل Formation Level' },

      { k: ['مساح','survey','setting out','ضبط','محور','منسوب','level','total station'], w: 4,
        r: '📐 **المساحة وضبط المحاور — QCS §S1:**\n\nافتح كرت "المساحة وضبط المحاور"\n\n• دقة أفقية ± 10mm\n• منسوب ± 6mm/10m\n• انحراف خازوق ± 75mm أفقي · ± 25mm رأسي\n• FIDIC Cl.4.7 — موافقة المهندس إلزامية' },

      { k: ['mep','كهرباء','electric','ميكانيك','mechanical','حريق','fire','تكييف','hvac','plumbing','صحي','سباك'], w: 4,
        r: '⚡ **معايير MEP — QCS 2024 §S21:**\n\nافتح كرت "معايير MEP"\n\n• **كهرباء LV:** 415/240V 50Hz · RCD ≤30mA · KAHRAMAA 2024\n• **سباكة:** HDPE PN16 أو PPR PN20 · WRAS approved\n• **إطفاء:** NFPA 13 (Sprinkler) · NFPA 72 (Alarm) · QCDD\n• **صرف داخلي:** uPVC أو Cast Iron · ميل ≥ 1:40' },

      { k: ['mmup','تنظيم','بناء','setback','إطار','coverage','نسبة بناء','far','parking','مواقف'], w: 4,
        r: '🏢 **اشتراطات MMUP 2024:**\n\nافتح كرت "اشتراطات MMUP"\n\n• **Setback:** أمامي ≥ 6m · جانبي ≥ 1.5-3m · خلفي ≥ 3m\n• **Coverage:** سكني ≤ 60% · تجاري ≤ 70%\n• **FAR:** سكني 1.5-3.0 · تجاري 3.0-6.0\n• **مواقف:** سكني 1/وحدة · مكتبي 1/50m² · تجاري 1/30m²' },

      { k: ['rdm','qhdm','تصميم طرق','design speed','سرعة تصميم','lane width','عرض حارة','row','حق طريق'], w: 4,
        r: '🛣️ **Ashghal RDM / QHDM 2019:**\n\nافتح كرت "Ashghal RDM"\n\n• **ROW:** Expressway 80-120m · Primary 40-60m\n• **سرعة تصميمية:** Expressway 120 · Primary 80 · Local 40-50 km/h\n• **عرض الحارة:** Expressway 3.75m · Primary 3.5m · Local 3.0m\n• **Superelevation:** حد أقصى 6% في قطر' },

      { k: ['تغيير','changes','2014','مقارن','فرق بين','difference','تحديث qcs'], w: 4,
        r: '📊 **تغييرات QCS 2014 → 2024:**\n\nافتح كرت "QCS 2014 vs 2024"\n\n• §S5: درجة خرسانة بحرية C30→C40 · غطاء XS 40→50mm\n• §S8: دمك WC 97%→98% · إضافة Superpave\n• §S20: إضافة TSE كشبكة مستقلة · HDPE PN10→PN16\n• §S21: قسم MEP جديد كلياً' },

      { k: ['علامات','markings','ثيرموبلاستيك','thermoplastic','لافت','sign','مطب','speed bump'], w: 4,
        r: '🚦 **علامات الطرق واللوحات المرورية:**\n\nافتح كرت "علامات الطرق"\n\n• Thermoplastic سُمك ≥ 2.5mm\n• Retroreflectivity حسب MUTCD\n• لافتات + مواقف باصات + مطبات' },

      { k: ['وصل منزل','house connect','منزلي','manhole','منهول','bedding','فراش','بايب'], w: 4,
        r: '🏠 **الوصلات المنزلية:**\n\nافتح كرت "الوصلات المنزلية"\n\n• وصلات المياه والصرف المنزلية\n• أنواع المنهولات وأعماقها\n• فراش المواسير (Pipe Bedding)\n• اختبارات الضغط والتسرب\n\nالمرجع: QCS §S20-P3 + KAHRAMAA' },

      { k: ['مبان','بناء','tower','برج','سكن','residential','highrise'], w: 3,
        r: '🏢 **الأبراج والمباني — QCS §S5 + QCDD:**\n\nافتح كرت "الأبراج والمباني السكنية"\n\n8 أقسام شاملة: التصميم · الأساسات · الخرسانة · الطابوق · MEP · التشطيبات · التسليم · المواد\n\nمن التصميم للتسليم مع مراجع QCS + QCDD + KAHRAMAA' },

      // ── BUSINESS & PRICING ────────────────────────────────
      { k: ['free','pro','فرق','مجاني','مدفوع','اشتراك','سعر','price','باقة','خطة','ترقي','upgrade','تكلف','كم'], w: 3,
        r: '🆓 **Free (مجاني للأبد):**\n• 5 بحث ذكي/يوم\n• 111+ قسم مرجعي كامل\n• الحاسبات الأساسية\n• نماذج RFI/NCR/DPR/ITP\n• مولّد طريقة التنفيذ\n• لوحة التنفيذ الميداني\n\n⭐ **Pro (99 QAR/شهر أو 799/سنة):**\n• بحث ذكي غير محدود\n• تصدير PDF + Word + Excel احترافي\n• المفتش الذكي بالصور\n• محلل الوثائق والمخططات\n• مولّد المستندات الشامل (Wizard)\n• شهادات الدفع + البرنامج الزمني\n• دعم فني أولوية\n\n💡 الباقة المجانية مفيدة جداً!\nPro توفر أكثر من ساعتين أسبوعياً وتستحق 99 QAR.' },

      { k: ['دفع','payment','visa','بطاقة','تحويل','ooredoo','qnb'], w: 4,
        r: '💳 **طرق الدفع:**\n\n• بطاقات ائتمان (Visa/Mastercard)\n• تحويل بنكي\n• Ooredoo Pay\n• QNB\n\nاضغط "⭐ ارقَ لـ Pro" → اختر شهري (99 QAR) أو سنوي (799 QAR)\n\n✅ ضمان استرداد 7 أيام' },

      // ── GENERAL & HELP ────────────────────────────────────
      { k: ['ما هو','what is','عن التطبيق','about','تعريف','وش هذا','مربوط','قطري','متصل','connected','ربط'], w: 3,
        r: '✅ **نعم! QatarSpec Pro مربوط بالكامل بالمواصفات القطرية:**\n\n📖 **QCS 2024** — الكود القطري للبناء (111+ قسم)\n🛣️ **Ashghal RDM/QHDM** — تصميم الطرق\n⚡ **KAHRAMAA 2024** — الكهرباء والماء\n🏢 **MMUP** — اشتراطات البناء\n📐 **FIDIC / BS / ASTM** — المعايير الدولية\n\n**كيف يعمل:**\n• كل قسم مرجعه QCS Part/Section/Clause\n• البحث الذكي يبحث في نص QCS 2024 الفعلي\n• الحاسبات تعطي Pass/Fail حسب QCS\n• المولّدات تُضيف مراجع QCS تلقائياً\n\n🏗️ أكبر مرجع رقمي — 111+ قسم + 8 حاسبات + AI\n🇶🇦 مصمم خصيصاً لمهندسي ومقاولي قطر' },

      { k: ['offline','بدون انترنت','بدون اتصال','pwa','تثبيت','install'], w: 4,
        r: '📲 **العمل Offline + تثبيت:**\n\n**التثبيت كتطبيق:**\nعلى الموبايل: اضغط "📲 ثبّت التطبيق" إذا ظهر، أو من قائمة المتصفح → "أضف للشاشة الرئيسية"\n\n**Offline:**\nالمحتوى الثابت (111+ قسم) يعمل بدون إنترنت بعد أول زيارة.\nالبحث الذكي والأدوات AI تحتاج إنترنت.' },

      { k: ['لغة','language','english','عربي','انجليزي','تبديل'], w: 4,
        r: '🌐 **تبديل اللغة:**\n\nاضغط زر "عربي / EN" في أعلى يمين الصفحة.\n\nكل المحتوى متاح بالعربية والإنجليزية — يتبدل فوراً.' },

      { k: ['مشكل','خطأ','error','bug','لا يعمل','not working','مساعد','help','دعم','support'], w: 3,
        r: '🛠️ **الدعم الفني:**\n\n**حلول سريعة:**\n• أعد تحميل الصفحة (Pull to refresh)\n• جرّب متصفح Incognito\n• تأكد من اتصال الإنترنت\n\n**تواصل معنا:**\n• 📧 info@qatarspec.com\n• 💬 WhatsApp\n\n**ملاحظة:** البحث الذكي يحتاج إنترنت. باقي المحتوى يعمل Offline.' },

      { k: ['gemini','api key','مفتاح','ai key','إعداد ai'], w: 5,
        r: '🔑 **إعداد AI:**\n\n**لا تحتاج مفتاح!** التطبيق يعمل تلقائياً عبر السيرفر.\n\nزر "إعداد AI" في الأعلى هو للمطورين فقط (تطوير محلي).\n\nإذا البحث الذكي لا يعمل: تأكد من اتصال الإنترنت وحاول مرة أخرى.' },

      { k: ['crossfall','ميل عرضي','superelevation','رفع فائق','ssd','مسافة رؤية','sight distance'], w: 4,
        r: '📐 **معايير تصميم الطرق — QHDM 2019:**\n\nافتح كرت "معايير تصميم الطرق"\n\n• **Crossfall:** Asphalt 2.5% ± 0.3%\n• **Superelevation:** حد أقصى 6%\n• **SSD:** V=80→160m · V=120→285m\n\nالمرجع: QHDM 4th Ed. 2019 + QCS §S8-P4' },

      { k: ['compaction','دمك','mdd','cbr','proctor','density','كثاف'], w: 4,
        r: '🔨 **الدمك — QCS 2024 §S8:**\n\n• **Subgrade:** ≥ 95% MDD · CBR ≥ 8%\n• **Subbase:** ≥ 95% MDD · CBR ≥ 30%\n• **Road Base:** ≥ 98% MDD · CBR ≥ 80%\n• **WC:** ≥ 98% Gmm\n• **الاختبار:** NDG أو Sand Cone كل 500m²\n\nاستخدم "حاسبة المواصفات" للحكم Pass/Fail!' },

      { k: ['cctv','كاميرا','تلفزيون','فحص داخلي'], w: 4,
        r: '📹 **فحص CCTV — QCS §S20 + BS EN 13508:**\n\n• إلزامي بعد تركيب خطوط الصرف\n• سرعة الكاميرا ≤ 0.1 m/s\n• Grade ≤ 2 مقبول\n• يوثّق في تقرير مع Chainage + Screenshots\n\nالمعدة مشروحة في كرت "معدات المرافق"' },

      { k: ['test','فحص','اختبار ضغط','pressure test','leak','تسرب','chlorin','تعقيم','disinfect'], w: 3,
        r: '🧪 **اختبارات الشبكات — QCS §S20 + KAHRAMAA:**\n\n• **ضغط مياه:** 1.5×PN لمدة 2 ساعة · هبوط ≤ 0.1 bar\n• **تسرب صرف:** Air Test أو Water Test\n• **تعقيم:** كلور ≥ 50ppm · ثم غسل حتى < 0.5ppm\n• **CCTV:** إلزامي بعد تركيب خطوط الصرف\n\nاستخدم "حاسبة المواصفات" للحكم Pass/Fail!' },

      // ── GREETINGS & THANKS ────────────────────────────────
      { k: ['شكرا','thanks','thank','ممتاز','رائع','great','عظيم','حلو','جميل','احسنت','bravo','nice','good','cool'], w: 2,
        r: '😊 العفو! سعيد بمساعدتك.\n\nلا تتردد بالسؤال في أي وقت — أنا هنا 24/7! 💪\n\nهل تحتاج مساعدة في شيء آخر؟' },

      { k: ['مرحبا','hello','hi','هلا','السلام','اهلا','صباح','مساء','هاي','hey','سلام'], w: 2,
        r: 'مرحباً! 👋 أنا QS Assistant — مساعدك في QatarSpec Pro.\n\n**يمكنني مساعدتك في:**\n• شرح أي ميزة في التطبيق\n• كيفية إنشاء ITP / NCR / Method Statement\n• معلومات عن QCS 2024\n• الفرق بين Free و Pro\n• حل مشاكل تقنية\n\nاسأل أي سؤال! 🚀' },

      { k: ['باي','bye','مع السلامة','وداع','see you','خلاص'], w: 2,
        r: 'مع السلامة! 👋\n\nسعدت بمساعدتك. ارجع في أي وقت — التطبيق والشات بوت متاحين 24/7.\n\n🇶🇦 بالتوفيق في مشروعك!' }
    ];

    // ── SCORE-BASED MATCHING ──
    var _bestMatch = null, _bestScore = 0;
    for (var _i = 0; _i < _KB.length; _i++) {
      var _entry = _KB[_i];
      var _hits = 0;
      for (var _j = 0; _j < _entry.k.length; _j++) {
        if (_q.includes(_entry.k[_j])) _hits++;
      }
      if (_hits > 0) {
        var _score = _hits * (_entry.w || 1);
        if (_score > _bestScore) {
          _bestScore = _score;
          _bestMatch = _entry;
        }
      }
    }
    if (_bestMatch) {
      addMessage(_bestMatch.r, 'bot');
      messageHistory.push({ role: 'assistant', content: _bestMatch.r });
      isTyping = false;
      if (sendBtn) sendBtn.disabled = false;
      if (input) input.focus();
      return;
    }

    setTimeout(showTyping, CFG.typingDelay);

    try {
      const res = await fetch(CFG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messageHistory })
      });

      removeTyping();

      if (res.status === 429) {
        const msgs = document.getElementById('qs-messages');
        const el = document.createElement('div');
        el.className = 'qs-rate-msg';
        el.textContent = 'لقد أرسلت الكثير من الرسائل. يرجى الانتظار قليلاً.';
        msgs.appendChild(el);
        scrollBottom();
        return;
      }

      const data = await res.json();
      const reply = data.reply || 'عذراً، حدث خطأ. حاول مرة أخرى.';
      addMessage(reply, 'bot');
      messageHistory.push({ role: 'assistant', content: reply });

    } catch (err) {
      removeTyping();
      addMessage('عذراً، لا يمكن الاتصال بالخادم. تأكد من اتصالك بالإنترنت.', 'bot');
    } finally {
      isTyping = false;
      if (sendBtn) sendBtn.disabled = false;
      if (input) input.focus();
    }
  }

  // ──────────────── WELCOME MESSAGE ────────────────
  function showWelcome() {
    if (hasGreeted) return;
    hasGreeted = true;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';

    if (lang === 'ar') {
      addMessage('مرحباً! 👋 أنا QS Assistant، مساعدك الذكي في QatarSpec Pro.\n\nكيف يمكنني مساعدتك اليوم؟', 'bot');
    } else {
      addMessage('Hello! 👋 I\'m QS Assistant, your smart guide for QatarSpec Pro.\n\nHow can I help you today?', 'bot');
    }

    setTimeout(() => renderQuickReplies(lang), 400);
  }

  // ──────────────── TOGGLE ────────────────
  function toggleChat() {
    const btn = document.getElementById('qs-chat-btn');
    const win = document.getElementById('qs-chat-window');

    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);

    if (isOpen) {
      unreadCount = 0;
      updateBadge();
      setTimeout(showWelcome, 200);
      setTimeout(() => {
        const input = document.getElementById('qs-input');
        if (input) input.focus();
      }, 300);
    }
  }

  // ──────────────── INIT ────────────────
  function init() {
    injectStyles();
    const { btn } = buildWidget();

    // Events
    btn.addEventListener('click', toggleChat);
    document.getElementById('qs-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChat();
    });

    // Send on button click
    document.getElementById('qs-send-btn').addEventListener('click', () => {
      const input = document.getElementById('qs-input');
      sendMessage(input.value);
    });

    // Send on Enter (Shift+Enter = new line)
    document.getElementById('qs-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = document.getElementById('qs-input');
        sendMessage(input.value);
      }
    });

    // Auto resize textarea
    document.getElementById('qs-input').addEventListener('input', function () {
      autoResize(this);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const win = document.getElementById('qs-chat-window');
      const btn = document.getElementById('qs-chat-btn');
      if (isOpen && !win.contains(e.target) && !btn.contains(e.target)) {
        toggleChat();
      }
    });

    // Show badge hint after 5 seconds if user hasn't opened
    setTimeout(() => {
      if (!isOpen && !hasGreeted) {
        unreadCount = 1;
        updateBadge();
      }
    }, 5000);
  }

  // ──────────────── LAUNCH ────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
