// QatarSpec Pro — Smart Loader v5.0 (Performance Upgrade)
// chunks load on-demand via _loadContentChunk() in inline-scripts.js
// This file: loads manifest + manages smart background prefetch
(function(){
  'use strict';
  var VER = '?v=10';

  function load(src, id){
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    if(id) s.id = id;
    document.head.appendChild(s);
  }

  // 1. Load manifest (small ~8KB)
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, {timeout:600});
  } else {
    setTimeout(function(){ load('data_content_manifest.js' + VER, 'qs-manifest'); }, 300);
  }

  // 2. Smart prefetch — top-3 chunks after page is interactive
  window.addEventListener('load', function(){
    setTimeout(function(){
      ['data_content_roads.js','data_content_utilities.js','data_content_extra.js'].forEach(function(f, i){
        setTimeout(function(){
          var lk = document.createElement('link');
          lk.rel = 'prefetch';
          lk.href = f + VER;
          lk.as = 'script';
          document.head.appendChild(lk);
        }, i * 1000);
      });
    }, 4000);
  });
})();
