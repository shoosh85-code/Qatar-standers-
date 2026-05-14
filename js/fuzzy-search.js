/**
 * QatarSpec Pro — Fuzzy Search System (Fuse.js v7.0.0)
 * يُحسّن بحث الكروت من includes() بسيط إلى بحث ذكي يتسامح مع الأخطاء الإملائية
 * يعمل على: #cardFilterInput → .cat-card elements
 * الدالة الأصلية filterCards() تبقى موجودة — هذا الملف يُحسّنها فقط
 */

(function () {
  'use strict';

  window.QS = window.QS || {};

  // ─── الحالة الداخلية ───────────────────────────────────────
  var _fuseIndex = null;       // Fuse instance
  var _cardItems = [];         // بيانات الكروت المُفهرسة
  var _initialized = false;
  var _currentLang = 'ar';     // اللغة النشطة

  // ─── القراءة الآمنة للغة الحالية ──────────────────────────
  function getCurrentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'ar';
  }

  // ─── بناء فهرس Fuse.js من DOM الكروت ─────────────────────
  function buildIndex() {
    if (typeof Fuse === 'undefined') {
      console.warn('[QS-Fuzzy] Fuse.js غير متاح — سيُستخدم البحث البسيط');
      return false;
    }

    var cards = document.querySelectorAll('.cat-card');
    if (!cards.length) return false;

    _cardItems = Array.from(cards).map(function (card) {
      var nameEl = card.querySelector('.cat-name');
      var descEl = card.querySelector('.cat-desc, .card-bullets');

      // عنوان بالعربي والإنجليزي من data attributes أو textContent
      var titleAr = (nameEl && nameEl.getAttribute('data-ar')) || (nameEl && nameEl.textContent) || '';
      var titleEn = (nameEl && nameEl.getAttribute('data-en')) || '';

      // وصف الكرت (النص الطويل)
      var descAr = descEl ? (descEl.getAttribute('data-ar') || descEl.textContent || '') : '';
      var descEn = descEl ? (descEl.getAttribute('data-en') || '') : '';

      // الكلمات المفتاحية من data-keywords
      var keywords = card.getAttribute('data-keywords') || '';

      // معرّف الكرت
      var param = card.getAttribute('data-param') || card.id || '';

      return {
        element: card,
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim(),
        descAr: descAr.substring(0, 300).trim(),   // نكتفي بأول 300 حرف
        descEn: descEn.substring(0, 300).trim(),
        keywords: keywords,
        param: param
      };
    });

    // إعداد Fuse بأوزان مناسبة
    _fuseIndex = new Fuse(_cardItems, {
      keys: [
        { name: 'titleAr',  weight: 0.40 },
        { name: 'titleEn',  weight: 0.30 },
        { name: 'keywords', weight: 0.20 },
        { name: 'descAr',   weight: 0.05 },
        { name: 'descEn',   weight: 0.05 }
      ],
      threshold: 0.40,          // تسامح عالٍ مع الأخطاء الإملائية
      distance: 120,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,     // لا يهم موقع الكلمة في النص
      findAllMatches: true
    });

    _initialized = true;
    console.log('[QS-Fuzzy] الفهرس جاهز — ' + _cardItems.length + ' كرت مُفهرس');
    return true;
  }

  // ─── Highlight النص المطابق ────────────────────────────────
  function highlightText(el, query) {
    if (!el || !query) return;
    var text = el.textContent;
    // بحث غير حساس لحالة الأحرف
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    if (regex.test(text)) {
      el.innerHTML = text.replace(regex, '<mark style="background:#7A1515;color:#fff;border-radius:3px;padding:0 2px;">$1</mark>');
    }
  }

  // ─── إزالة Highlight ──────────────────────────────────────
  function clearHighlights() {
    document.querySelectorAll('.cat-card mark').forEach(function (mark) {
      var parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  // ─── إخفاء/إظهار مجموعات الكروت ─────────────────────────
  function syncGroupVisibility() {
    document.querySelectorAll('.section-group').forEach(function (group) {
      var anyVisible = Array.from(group.querySelectorAll('.cat-card')).some(function (c) {
        return c.style.display !== 'none';
      });
      group.style.display = anyVisible ? '' : 'none';
    });
  }

  // ─── رسالة لا توجد نتائج ──────────────────────────────────
  function showNoResults(countEl, query, lang) {
    countEl.style.display = 'block';
    if (lang === 'en') {
      countEl.textContent = '❌ No results for "' + query + '" — try different keywords';
    } else {
      countEl.textContent = '❌ لا توجد نتائج لـ "' + query + '" — جرّب كلمات مختلفة';
    }
  }

  // ─── البحث الفعلي بـ Fuse.js ─────────────────────────────
  function fuzzyFilterCards(query) {
    var q = query.trim();
    var lang = getCurrentLang();
    var clearBtn = document.getElementById('cardFilterClear');
    var countEl  = document.getElementById('cardFilterCount');

    // أزل الـ highlights القديمة
    clearHighlights();

    if (!q) {
      // إعادة الكل لحالته
      if (clearBtn) clearBtn.style.display = 'none';
      if (countEl)  countEl.style.display  = 'none';
      document.querySelectorAll('.cat-card').forEach(function (c) {
        c.style.display = '';
      });
      document.querySelectorAll('.section-group').forEach(function (g) {
        g.style.display = '';
      });
      return;
    }

    if (clearBtn) clearBtn.style.display = 'block';

    // تأكد من وجود الفهرس
    if (!_initialized) buildIndex();

    // إذا Fuse غير متاح → البحث البسيط الاحتياطي
    if (!_fuseIndex) {
      fallbackFilter(q, lang, countEl);
      return;
    }

    var results = _fuseIndex.search(q);
    var matchedElements = new Set(results.map(function (r) { return r.item.element; }));
    var visible = 0;

    document.querySelectorAll('.cat-card').forEach(function (card) {
      if (matchedElements.has(card)) {
        card.style.display = '';
        visible++;
        // highlight العنوان فقط (لا نكسر الـ innerHTML المعقد للوصف)
        var nameEl = card.querySelector('.cat-name');
        if (nameEl) highlightText(nameEl, q);
      } else {
        card.style.display = 'none';
      }
    });

    syncGroupVisibility();

    // عرض عدد النتائج
    if (countEl) {
      countEl.style.display = 'block';
      if (visible === 0) {
        showNoResults(countEl, q, lang);
      } else {
        countEl.textContent = lang === 'en'
          ? '✅ ' + visible + ' result(s) for "' + query + '"'
          : '✅ ' + visible + ' نتيجة للبحث عن "' + query + '"';
      }
    }
  }

  // ─── بحث احتياطي بسيط (includes) إذا Fuse غير متاح ──────
  function fallbackFilter(q, lang, countEl) {
    var ql = q.toLowerCase();
    var visible = 0;
    document.querySelectorAll('.cat-card').forEach(function (card) {
      var nameEl = card.querySelector('.cat-name');
      var descEl = card.querySelector('.cat-desc, .card-bullets');
      var name  = nameEl ? nameEl.textContent.toLowerCase() : '';
      var desc  = descEl ? descEl.textContent.toLowerCase() : '';
      var kw    = (card.getAttribute('data-keywords') || '').toLowerCase();
      var match = name.includes(ql) || desc.includes(ql) || kw.includes(ql);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    syncGroupVisibility();
    if (countEl) {
      countEl.style.display = 'block';
      countEl.textContent = visible > 0
        ? '✅ ' + visible + ' نتيجة للبحث عن "' + q + '"'
        : '❌ لا توجد نتائج لـ "' + q + '" — جرّب كلمات مختلفة';
    }
  }

  // ─── تسجيل API العام ─────────────────────────────────────
  window.QS.fuzzySearch = {
    init: buildIndex,
    search: fuzzyFilterCards,
    rebuild: function () {
      _initialized = false;
      _fuseIndex = null;
      _cardItems = [];
      buildIndex();
    }
  };

  // ─── استبدال filterCards الأصلية بنسخة Fuse.js ──────────
  // نحفظ الأصلية أولاً
  var _originalFilterCards = window.filterCards;

  window.filterCards = function (query) {
    // إذا Fuse.js جاهز — استخدمه
    if (typeof Fuse !== 'undefined') {
      fuzzyFilterCards(query);
    } else if (typeof _originalFilterCards === 'function') {
      // احتياط: استخدم الأصلية
      _originalFilterCards(query);
    }
  };

  // ─── التهيئة بعد تحميل الصفحة ───────────────────────────
  function onReady() {
    // انتظر قليلاً لأن Fuse.js محمّل بـ defer
    setTimeout(function () {
      buildIndex();
    }, 800);

    // أعد بناء الفهرس إذا تغيّرت اللغة (MutationObserver على html lang)
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'lang') {
          _currentLang = getCurrentLang();
          // لا نحتاج rebuild الـ index — نفس الداتا، فقط عرض التعداد يتغير
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
