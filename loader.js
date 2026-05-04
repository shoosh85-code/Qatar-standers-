// QatarSpec Pro — Smart Loader v4.0 (Phase 8)
// data_content.js (1MB) مُزالة من التحميل المسبق — كل المحتوى موجود في chunk files
// الـ chunks تُحمَّل on-demand عبر _loadContentChunk() في inline-scripts.js
// data_content.js تبقى كـ fallback طارئ فقط (يُحمَّلها _loadContentChunk إذا لم يجد chunk)
(function(){
  var VER = '?v=8';

  function load(src, id){
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    if(id) s.id = id;
    document.head.appendChild(s);
  }

  // data_calcs.js يُحمَّل sync في index.html بعد inline-scripts.js — لا حاجة لتحميل async هنا
  // (التحميل المزدوج كان يسبب race condition: QS.openDetail is not a function)

  // 2. data_content_manifest.js — load soon (small ~7KB, needed for chunk routing)
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, {timeout:600});
  } else {
    setTimeout(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, 300);
  }

  // ❌ تم حذف التحميل المسبق لـ data_content.js (1MB):
  // جميع الـ 98 key موجودة في chunk files (roads/utilities/structural/geotech/extra/phase4/tools)
  // الـ chunks تُحمَّل on-demand فقط عند طلب المستخدم → توفير 1MB في كل تحميل للصفحة
})();
