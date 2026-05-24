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

    // === CLIENT-SIDE FAQ — 3 tiers: specific → generic (2+ keys) → greetings ===
    var _q = text.toLowerCase();
    var _faqReply = null;
    // TIER 1: Specific features (1 keyword match)
    var _t1 = [
      { k: ['مفتش','inspector','فحص صور'],
        r: '🔍 **المفتش الذكي (AI Site Inspector) — Pro:**\n\n**ما هو؟** أداة AI تحلل صور الموقع وتكشف مخالفات QCS 2024.\n\n**كيف تستخدمه:**\n1. افتح كرت "المفتش الذكي" من الأدوات الذكية\n2. التقط صورة من الموقع أو ارفع صورة\n3. AI يكشف: تشققات، تعشيش، نزيف إسفلتي، هبوط\n4. تقرير فوري بالعربي مع مرجع QCS\n\n⚠️ متاح لمشتركي Pro (99 QAR/شهر)' },
      { k: ['محلل','analyzer','وثائق','مستندات','document'],
        r: '📄 **محلل الوثائق (AI Analyzer) — Pro:**\nارفع عقد أو مواصفة PDF → AI يستخرج البنود ويقارنها مع QCS 2024.\n\nافتح "محلل الوثائق الذكي" من الأدوات.' },
      { k: ['مولد','generator','method statement','طريقة تنفيذ','itp','خطة فحص'],
        r: '📋 **إنشاء ITP / Method Statement:**\n\n**طريقة 1 — مولّد المستندات الشامل (Pro):**\n1. افتح كرت "مولّد المستندات الشامل"\n2. اختر ITP من القائمة\n3. Wizard 5 خطوات → ITP جاهز بنقاط H/W/R/M\n\n**طريقة 2 — مولّد MOS/ITP (Pro):**\n1. افتح كرت "مولّد MOS / ITP"\n2. اختر نوع العمل (خرسانة/أسفلت/حفر...)\n3. 9 مراحل تنفيذ QCS 2024 تلقائياً\n\n**طريقة 3 — نماذج Ashghal (مجاني):**\n1. افتح كرت "نماذج Ashghal"\n2. اختر تاب ITP\n3. املأ البيانات → تصدير PDF/Word\n\nكل ITP يحتوي Hold Points + Witness Points حسب QCS 2024.' },
      { k: ['حاسب','حاسبات','calculator','calc'],
        r: '🧮 **الحاسبات:** مواصفات Pass/Fail · مباني · ESAL · Mix Design · Pipe Sizing · Rebar Cover · Superpave · Marshall\n\nافتح "مركز الحاسبات" من الصفحة الرئيسية.' },
      { k: ['ncr','مخالف','عدم مطابقة'],
        r: '🔴 **NCR Database:** 1500+ تقرير عبر 9 تخصصات.\nافتح "قاعدة بيانات NCR الشاملة" من الصفحة الرئيسية!' },
      { k: ['مشروع','project','مشاريع'],
        r: '📊 **لوحة المشاريع:** تقارير يومية · فحص · اعتماد مواد · NCR · BOQ.\nاضغط "📊 مشاريعي" في الأعلى.' },
      { k: ['مخطط','drawing','رسومات','shop drawing'],
        r: '📐 **محلل المخططات (AI Drawing Analyzer) — Pro:**\nارفع رسومات إنشائية أو مقاطع طرق → مراجعة QCS 2024 تلقائية.\n\nافتح "محلل المخططات الذكي" من الأدوات.' },
      { k: ['تصدير','export','pdf','word','excel'],
        r: '📥 **التصدير (Pro):**\n• PDF احترافي بهيدر QatarSpec + QCS\n• Word قابل للتعديل\n• Excel بتنسيق Ashghal\n\nاضغط أيقونات PDF/DOC في أعلى أي قسم مفتوح.' }
    ];
    _faqReply = _t1.find(function(f){ return f.k.some(function(k){ return _q.includes(k); }); });
    // TIER 2: Generic (needs 2+ keyword matches)
    if (!_faqReply) {
      var _t2 = [
        { k: ['free','pro','فرق','مجاني','مدفوع','اشتراك','سعر','price','باقة'],
          r: '🆓 **Free:** 5 بحث/يوم · 111+ قسم · حاسبات · نماذج\n\n⭐ **Pro (99 QAR/شهر):** بحث غير محدود · تصدير PDF/Word · المفتش الذكي · محلل المستندات · مولّد المستندات\n\n💡 Pro توفر أكثر من ساعتين أسبوعياً!' },
        { k: ['كيف','استخدم','how','use','ابدأ','start'],
          r: '🔍 **الاستخدام:**\n1. البحث الذكي — اكتب سؤالك\n2. الكروت — تصفح حسب التخصص\n3. الحاسبات — Pass/Fail فوري\n4. رفع PDF — تحليل بـ AI\n\nهل تسأل عن ميزة محددة؟ اذكر اسمها!' },
        { k: ['qcs','2024','مواصفات','كود'],
          r: '📖 **QCS 2024:** §S5 خرسانة · §S8 طرق · §S20 مرافق · §S21 MEP\n111+ قسم من QCS + Ashghal + KAHRAMAA + MMUP.' }
      ];
      _faqReply = _t2.find(function(f){ return f.k.filter(function(k){ return _q.includes(k); }).length >= 2; });
    }
    // TIER 3: Greetings (1 keyword)
    if (!_faqReply) {
      var _t3 = [
        { k: ['شكرا','thanks','ممتاز','رائع'], r: '😊 العفو! لا تتردد بالسؤال في أي وقت!' },
        { k: ['مرحبا','hello','hi','هلا','السلام','اهلا'], r: 'مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟' }
      ];
      _faqReply = _t3.find(function(f){ return f.k.some(function(k){ return _q.includes(k); }); });
    }
    if (_faqReply) {
      addMessage(_faqReply.r, 'bot');
      messageHistory.push({ role: 'assistant', content: _faqReply.r });
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
