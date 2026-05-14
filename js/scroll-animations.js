/**
 * QatarSpec Pro — Scroll Animations (AOS)
 * المكتبة: AOS v2.3.4 من cdnjs (محمّلة في index.html)
 * المبدأ: لا تُضاف أنيميشن على عناصر above-the-fold
 * الأنواع: fade-up للكروت, fade-in للعناوين, zoom-in للإحصائيات, fade-right للحاسبات
 */

(function () {
  'use strict';

  // ─── إضافة data-aos للعناصر قبل تهيئة AOS ───────────────────────────────────

  function addScrollAnimations() {
    // 1. عنوان قسم "الأقسام الرئيسية" — fade-in (تحت الـ fold بعد search)
    var sectionHead = document.querySelector('.content-section .section-head');
    if (sectionHead) {
      sectionHead.setAttribute('data-aos', 'fade-in');
      sectionHead.setAttribute('data-aos-duration', '500');
    }

    // 2. Section Groups — fade-up متدرج
    var groups = document.querySelectorAll('.section-group');
    groups.forEach(function (group, idx) {
      // تأخير متدرج: 0, 80, 160, 240 ...
      group.setAttribute('data-aos', 'fade-up');
      group.setAttribute('data-aos-duration', '600');
      group.setAttribute('data-aos-delay', String(idx * 80));
    });

    // 3. Cat Cards — fade-up مع تأخير داخل كل group
    var allGroups = document.querySelectorAll('.section-group');
    allGroups.forEach(function (group) {
      var cards = group.querySelectorAll('.cat-card');
      cards.forEach(function (card, cardIdx) {
        // تأخير مبني على ترتيب الكرت داخل المجموعة (0, 100, 200 ... max 400)
        var delay = Math.min(cardIdx * 80, 400);
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '500');
        card.setAttribute('data-aos-delay', String(delay));
        card.setAttribute('data-aos-once', 'true');
      });
    });

    // 4. أقسام الحاسبات (group-calc) — تستخدم fade-right لأن RTL
    var calcGroup = document.getElementById('group-calc');
    if (calcGroup) {
      // نعيد تعيين الكروت داخل group-calc بـ fade-right
      var calcCards = calcGroup.querySelectorAll('.cat-card');
      calcCards.forEach(function (card, idx) {
        card.setAttribute('data-aos', 'fade-right');
        card.setAttribute('data-aos-duration', '500');
        card.setAttribute('data-aos-delay', String(Math.min(idx * 80, 400)));
      });
    }

    // 5. Group Headers — fade-in
    var groupHeaders = document.querySelectorAll('.group-header');
    groupHeaders.forEach(function (header) {
      header.setAttribute('data-aos', 'fade-in');
      header.setAttribute('data-aos-duration', '400');
    });
  }

  // ─── تهيئة AOS ───────────────────────────────────────────────────────────────

  function initAOS() {
    if (typeof AOS === 'undefined') {
      // إذا لم تُحمّل المكتبة بعد، نجرب مرة ثانية بعد 500ms
      setTimeout(initAOS, 500);
      return;
    }

    // أضف الـ attributes قبل init
    addScrollAnimations();

    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,        // الأنيميشن يشتغل مرة واحدة فقط
      offset: 80,        // المسافة قبل بدء الأنيميشن
      disable: 'mobile'  // تعطيل على الموبايل لتحسين الأداء
    });

    // سجّل في namespace
    window.QS = window.QS || {};
    window.QS.animations = window.QS.animations || {};
    window.QS.animations.refreshAOS = function () {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    };
  }

  // ─── نقطة الدخول ─────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
  } else {
    // الـ DOM جاهز مسبقاً
    initAOS();
  }

  // إعادة تهيئة بعد تحميل الصفحة كاملاً (للتأكد من صحة الـ offset)
  window.addEventListener('load', function () {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

})();
