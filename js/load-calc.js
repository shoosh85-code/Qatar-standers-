// js/load-calc.js — QatarSpec Pro
// نُقل من index.html لإزالة الحاجة لـ unsafe-inline في inline script blocks
// Dynamic loader — تحميل ملفات الحاسبات عند الحاجة

async function loadCalc(type) {
  if (!window['_' + type + 'Loaded']) {
    await import('/js/calcs/' + type + '.js?v=1');
    window['_' + type + 'Loaded'] = true;
  }
}
