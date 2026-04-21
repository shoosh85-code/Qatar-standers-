// QatarSpec Pro — Smart Loader v2.0
// Loads data_calcs.js immediately (async), then data_content.js on idle
(function(){
  function load(src){
    var s=document.createElement('script');
    s.src=src; s.async=true;
    document.head.appendChild(s);
  }
  load('data_calcs.js');
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ load('data_content.js'); });
  } else {
    setTimeout(function(){ load('data_content.js'); }, 1000);
  }
})();
