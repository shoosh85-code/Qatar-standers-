// QatarSpec Pro — Smart Loader v3.0 (Phase 7)
// Loads data_calcs.js immediately (async), manifest on idle, content on idle
(function(){
  var VER = '?v=7';

  function load(src, id){
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    if(id) s.id = id;
    document.head.appendChild(s);
  }

  // 1. data_calcs.js — immediate (critical: calculators & QS namespace)
  load('data_calcs.js?v=430', 'qs-calcs');

  // 2. data_content_manifest.js — load soon (small ~6KB, needed for chunk routing)
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, {timeout:600});
  } else {
    setTimeout(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, 300);
  }

  // 3. data_content.js — load on idle (large file, not immediately needed)
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ load('data_content.js' + VER, 'qs-content'); }, {timeout:1500});
  } else {
    setTimeout(function(){ load('data_content.js' + VER, 'qs-content'); }, 1200);
  }
})();
