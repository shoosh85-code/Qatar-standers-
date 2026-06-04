// js/smart-search.js — QatarSpec Pro RAG Search
// البحث الذكي الحقيقي: Supabase (qcs_chunks) → context → Gemini (SSE)
// يحل مشكلة: البحث كان يرسل لـ Gemini مباشرة بدون مرجع QCS
// الآن: يجلب نصوص QCS الفعلية أولاً ثم يبني الإجابة عليها

(function() {
  'use strict';

  // حدود البحث المجاني
  const FREE_DAILY_LIMIT = 5;
  const STORAGE_KEY = 'qs_search_count';

  // ── عداد البحث اليومي ────────────────────────────────────────────────────
  function getSearchCount() {
    try {
      const data = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
      const today = new Date().toDateString();
      if (data.date !== today) return 0;
      return data.count || 0;
    } catch { return 0; }
  }

  function incrementSearchCount() {
    const today = new Date().toDateString();
    const count = getSearchCount() + 1;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count }));
    updateCounterUI(count);
    return count;
  }

  function updateCounterUI(count) {
    const bar = document.getElementById('searchCounterBar');
    const text = document.getElementById('searchCounterText');
    if (bar) bar.style.display = 'flex';
    if (text) text.textContent = count + ' / ' + FREE_DAILY_LIMIT + ' بحث ذكي مستخدم اليوم';
  }

  // ── البحث الذكي الرئيسي (RAG) ───────────────────────────────────────────
  async function doSearch() {
    const input = document.getElementById('searchInput');
    const query = (input ? input.value.trim() : '');
    if (!query) {
      if (input) input.focus();
      return;
    }

    // فحص حد البحث المجاني
    // TODO: فحص Pro status من cookie
    const count = getSearchCount();
    if (count >= FREE_DAILY_LIMIT) {
      alert('⚠️ وصلت للحد اليومي المجاني (' + FREE_DAILY_LIMIT + ' بحث). ارقَ لـ Pro للبحث بلا حدود.');
      return;
    }

    // عرض صندوق الإجابة + حالة التحميل
    const box = document.getElementById('aiAnswerBox');
    const answerEl = document.getElementById('aiAnswerText');
    const refEl = document.getElementById('aiRefText');
    const sourceEl = document.getElementById('aiSource');
    const disclaimer = box ? box.querySelector('.ai-disclaimer') : null;

    if (box) box.classList.add('show');
    if (answerEl) answerEl.innerHTML = '<div class="loading-wrap"><div class="spinner"></div> جاري البحث في نصوص QCS 2024 الفعلية...</div>';
    if (refEl) refEl.textContent = '📖 يتم جلب المراجع...';

    // ── الخطوة 1: جلب نصوص QCS الحقيقية من Supabase ─────────────────────
    let qcsChunks = [];
    let searchMethod = 'none';
    try {
      const searchRes = await fetch('/api/qcs-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, limit: 10 })
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        qcsChunks = searchData.results || [];
        searchMethod = searchData.method || 'fts';
      }
    } catch (e) {
      console.warn('[smart-search] QCS search failed:', e.message);
    }

    // بناء سياق QCS الحقيقي
    let qcsContext = '';
    let sourceFiles = [];
    if (qcsChunks.length > 0) {
      qcsContext = qcsChunks.map(function(c, i) {
        if (c.source) sourceFiles.push(c.source);
        return '[مصدر QCS ' + (i + 1) + ': ' + (c.source || 'QCS 2024') +
               (c.section ? ' | ' + c.section : '') +
               (c.page ? ' | ص.' + c.page : '') +
               (c.similarity ? ' | تطابق ' + c.similarity : '') +
               ']\n' + (c.content || '').slice(0, 1500);
      }).join('\n\n');
    }

    // ── الخطوة 2: بناء System Prompt مع سياق QCS ────────────────────────
    var systemPrompt;
    if (qcsChunks.length > 0) {
      systemPrompt = 'أنت خبير مواصفات هندسية قطرية. لديك نصوص QCS 2024 الرسمية التالية كمرجع:\n\n' +
        qcsContext + '\n\n' +
        'التعليمات:\n' +
        'التعليمات:\n' +
        '1. أجب بتفصيل كامل بناءً على النصوص أعلاه — لا تخترع أرقاماً\n' +
        '2. اذكر رقم القسم والجزء والبند (Section/Part/Clause) لكل نقطة\n' +
        '3. اشرح كل متطلب مع السياق الكامل — لا تختصر\n' +
        '4. اذكر القيم العددية والحدود والمعايير المرجعية (BS/EN/ASTM)\n' +
        '5. استخدم جداول HTML (class="dm-table") للمقارنات والقيم\n' +
        '6. اذكر Pass/Fail criteria والحدود الدنيا والقصوى\n' +
        '7. أجب بالعربية مع المصطلحات التقنية بالإنجليزية\n' +
        '8. إذا المعلومة غير موجودة في النصوص، قل: "غير موجود في المصادر المتاحة"';
    } else {
      systemPrompt = 'أنت خبير مواصفات هندسية قطرية. لم أجد نصوص QCS مباشرة لهذا السؤال في قاعدة البيانات.\n' +
        'أجب بما تعرفه لكن وضّح بصراحة: "⚠️ هذه الإجابة من معرفة عامة وليست من نص QCS مباشر — يجب التحقق من الوثيقة الرسمية."\n' +
        'لا تخترع أرقام بنود أو قيم محددة إذا لم تكن متأكداً.';
    }

    // ── الخطوة 3: إرسال لـ Gemini مع SSE Streaming ─────────────────────
    try {
      const res = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: query }],
          system: systemPrompt,
          max_tokens: 6000
        })
      });

      if (!res.ok) {
        var errData = {};
        try { errData = await res.json(); } catch (_) {}
        if (res.status === 429) {
          // XSS Fix: escape retryAfter قبل إدراجه في HTML
          var safeRetry = parseInt(errData.retryAfter, 10) || 60;
          if (answerEl) answerEl.innerHTML = '<div style="color:#e74c3c;padding:16px;">⏳ تجاوزت حد الطلبات. حاول بعد ' + safeRetry + ' ثانية.</div>';
        } else {
          if (answerEl) answerEl.innerHTML = '<div style="color:#e74c3c;padding:16px;">❌ خطأ: ' + QS.escapeHtml(errData.error || 'خطأ في الخادم') + '</div>';
        }
        return;
      }

      // ── SSE Streaming ──────────────────────────────────────────────────
      incrementSearchCount();
      if (answerEl) answerEl.innerHTML = '';
      var fullAnswer = '';

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (!line.startsWith('data:')) continue;
          var jsonStr = line.slice(5).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            var parsed = JSON.parse(jsonStr);
            var text = parsed.text || '';
            if (text) {
              fullAnswer += text;
              // عرض مباشر مع markdown بسيط
              if (answerEl) answerEl.innerHTML = simpleMarkdown(fullAnswer);
            }
          } catch (_) { /* تجاهل */ }
        }
      }

      // ── تحديث المراجع والـ disclaimer ──────────────────────────────────
      var uniqueSources = [];
      for (var s = 0; s < sourceFiles.length; s++) {
        if (uniqueSources.indexOf(sourceFiles[s]) === -1) uniqueSources.push(sourceFiles[s]);
      }

      if (refEl) {
        refEl.textContent = qcsChunks.length > 0
          ? '📖 المراجع (' + qcsChunks.length + ' مصدر QCS — ' + searchMethod + '): ' + uniqueSources.slice(0, 4).join(' · ')
          : '⚠️ لم يتم العثور على مصادر QCS مباشرة لهذا السؤال';
      }

      if (sourceEl) {
        sourceEl.textContent = qcsChunks.length > 0
          ? 'من ' + qcsChunks.length + ' نص QCS حقيقي'
          : 'معرفة عامة — تحقق من QCS';
      }

      if (disclaimer) {
        disclaimer.innerHTML = qcsChunks.length > 0
          ? '✅ <strong>مصادر حقيقية:</strong> هذه الإجابة مبنية على <strong>' + qcsChunks.length + ' نصوص QCS 2024 فعلية</strong> من قاعدة البيانات (بحث ' + searchMethod + '). القرارات الهندسية الرسمية تتطلب مراجعة الوثيقة الأصلية.'
          : '⚠️ <strong>تنبيه:</strong> لم يتم العثور على نصوص QCS مباشرة لهذا السؤال. الإجابة من معرفة عامة — يجب التحقق من الوثيقة الرسمية QCS 2024.';
      }

      // حفظ الإجابة للنسخ
      window._lastAnswer = fullAnswer;

    } catch (err) {
      console.error('[smart-search] Error:', err.message);
      if (answerEl) answerEl.innerHTML = '<div style="color:#e74c3c;padding:16px;">❌ خطأ في الاتصال: ' + QS.escapeHtml(err.message) + '</div>';
    }
  }

  // ── quickSearch — البحث السريع من الـ tags ──────────────────────────────
  function quickSearch(text) {
    var input = document.getElementById('searchInput');
    if (input) input.value = text;
    doSearch();
  }

  // ── copyAnswer — نسخ الإجابة ───────────────────────────────────────────
  function copyAnswer() {
    var text = window._lastAnswer || '';
    if (!text) {
      var el = document.getElementById('aiAnswerText');
      text = el ? el.innerText : '';
    }
    if (!text) { alert('لا توجد إجابة لنسخها'); return; }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        alert('✅ تم نسخ الإجابة');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('✅ تم نسخ الإجابة');
  }

  // ── Markdown بسيط → HTML ───────────────────────────────────────────────
  function simpleMarkdown(text) {
    var html = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^### (.+)$/gm, '<h4 style="color:var(--gold);margin:12px 0 6px;">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 style="color:var(--gold);margin:16px 0 8px;">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 style="margin:16px 0 8px;">$1</h2>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      .replace(/\n{2,}/g, '<br><br>')
      .replace(/\n/g, '<br>');
    return (typeof DOMPurify !== 'undefined')
      ? DOMPurify.sanitize(html, { ALLOWED_TAGS: ['strong','em','code','h2','h3','h4','li','ul','ol','br','p','span'], ALLOWED_ATTR: ['style'] })
      : html;
  }

  // ── تسجيل في QS namespace ─────────────────────────────────────────────
  if (!window.QS) window.QS = {};
  window.QS.doSearch = doSearch;
  window.QS.quickSearch = quickSearch;
  window.QS.copyAnswer = copyAnswer;
  // للـ onclick بدون QS prefix
  window.doSearch = doSearch;
  window.quickSearch = quickSearch;

})();
