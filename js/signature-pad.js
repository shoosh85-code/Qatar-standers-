// js/signature-pad.js — QatarSpec Pro
// نُقل من index.html — Digital Signature ITP
// التوقيع محفوظ في الذاكرة فقط — لا localStorage (قاعدة أمان المشروع)

(function() {
  'use strict';

  // التوقيع محفوظ في الذاكرة فقط — لا localStorage (قاعدة أمان المشروع)
  let _itpSignatureData = null;

  function _initSignaturePad() {
    const canvas = document.getElementById('signaturePad');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // إعدادات الرسم
    ctx.strokeStyle = '#c9a84c';
    ctx.lineWidth   = 2;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    let drawing     = false;

    // تحويل إحداثيات اللمس إلى canvas
    function _pos(e) {
      const r = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    }

    // Mouse events
    canvas.addEventListener('mousedown', function(e) {
      drawing = true;
      const p = _pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    });
    canvas.addEventListener('mousemove', function(e) {
      if (!drawing) return;
      const p = _pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    canvas.addEventListener('mouseup',    function() { drawing = false; });
    canvas.addEventListener('mouseleave', function() { drawing = false; });

    // Touch events (mobile)
    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      drawing = true;
      const p = _pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }, { passive: false });
    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (!drawing) return;
      const p = _pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }, { passive: false });
    canvas.addEventListener('touchend', function() { drawing = false; });
  }

  // مسح التوقيع
  window.clearSignature = function() {
    const canvas = document.getElementById('signaturePad');
    if (!canvas) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    _itpSignatureData = null;
    const msg = document.getElementById('sigSavedMsg');
    if (msg) msg.style.display = 'none';
  };

  // حفظ التوقيع في الذاكرة (لا localStorage)
  window.saveSignature = function() {
    const canvas = document.getElementById('signaturePad');
    if (!canvas) return;
    _itpSignatureData = canvas.toDataURL('image/png');
    const msg = document.getElementById('sigSavedMsg');
    if (msg) { msg.style.display = 'inline'; setTimeout(function() { msg.style.display = 'none'; }, 2000); }
    if (window.showToast) window.showToast('✅ تم حفظ التوقيع في الجلسة الحالية');
  };

  // قراءة التوقيع (للـ export)
  window.getITPSignature = function() { return _itpSignatureData; };

  // تهيئة بعد تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initSignaturePad);
  } else {
    _initSignaturePad();
  }

  // إعادة التهيئة عند فتح قسم ITP (في حال canvas لم يكن ظاهراً)
  document.addEventListener('click', function(e) {
    if (e.target && e.target.textContent && e.target.textContent.includes('توقيع')) {
      setTimeout(_initSignaturePad, 50);
    }
  });

})();
