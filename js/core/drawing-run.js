// QatarSpec Pro — Drawing Analysis & Inspector Runner
(function() {
  "use strict";


async function runDrawingAnalysis() {
  // ── Free users: 3 analyses/day ──
  if (!isProUser()) {
    var daKey = 'qs_da_count_' + new Date().toISOString().slice(0,10);
    var daCount = parseInt(sessionStorage.getItem(daKey) || '0');
    if (daCount >= 3) {
      showUpgradePrompt('drawing_analyzer','📐','وصلت الحد اليومي — 3 تحليلات/يوم','اشترك في Pro لتحليلات غير محدودة للمخططات.');
      return;
    }
    sessionStorage.setItem(daKey, String(daCount + 1));
  }
  if (!_daImageData) { showToast('❌ ارفع مخططاً أولاً'); return; }

  const notes = (document.getElementById('da-notes') || {}).value || '';
  let loading = document.getElementById('da-loading');
  let result = document.getElementById('da-result');
  let btn = document.getElementById('da-analyze-btn');

  loading.style.display = 'block';
  result.innerHTML = '';
  if (btn) { btn.style.opacity = '0.5'; btn.disabled = true; }

  let systemPrompt = getDaSystemPrompt(_daDrawingType, notes);

  try {
    const isPdf = _daImageData.startsWith('data:application/pdf');
    let messages;

    // استخراج البيانات حسب النوع (PDF أو صورة)
    let daBase64, daMimeType;
    if (isPdf) {
      daBase64 = _daImageData.split(',')[1];
      daMimeType = 'application/pdf';
    } else {
      daBase64 = _daImageData.split(',')[1];
      daMimeType = _daImageData.split(';')[0].split(':')[1];
    }

    // استخدام vision-proxy مباشرة (Gemini Vision API)
    let response = await fetch('/api/vision-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'analyzer',
          image: daBase64,
          mimeType: daMimeType || 'image/jpeg',
          userMessage: systemPrompt
        })
    });

    let data = await response.json();

    if (data.result) {
      result.innerHTML = formatDaResult(data.result, _daDrawingType);
      qsTrack('Vision Analysis', { tier: typeof getProToken === 'function' && getProToken() ? 'pro' : 'free' });
    } else if (data.error) {
      result.innerHTML = generateDaFallback(_daDrawingType);
      showToast('⚠️ تم استخدام التحليل المحلي');
    } else {
      result.innerHTML = generateDaFallback(_daDrawingType);
    }
  } catch(e) {
    // Fallback محلي إذا لم يعمل الـ API
    result.innerHTML = generateDaFallback(_daDrawingType);
    showToast('⚠️ تحليل محلي — تحقق من الاتصال للتحليل الكامل');
  }

  loading.style.display = 'none';
  if (btn) { btn.style.opacity = '1'; btn.disabled = false; }
}


async function runInspector() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('inspector','🔍','المفتش الذكي بالصور — Pro فقط','فحص الأعمال الميدانية بالصور ومطابقتها مع QCS 2024 متاح للمشتركين في Pro فقط.');
    return;
  }
  let workType = document.getElementById('insp-work-type').value;
  const phase = document.getElementById('insp-phase').value;
  let specific = document.getElementById('insp-specific').value;
  
  if (!_inspectorImageData) { showToast('❌ ارفع صورة أولاً'); return; }
  if (!workType) { showToast('❌ اختر نوع العمل'); return; }
  
  const loading = document.getElementById('inspector-loading');
  const btn = document.getElementById('insp-analyze-btn');
  loading.style.display = 'block';
  btn.style.opacity = '0.5';
  btn.disabled = true;
  
  let phaseNames = {before:'قبل التنفيذ',during:'أثناء التنفيذ',after:'بعد التنفيذ',defect:'عيب مكتشف'};
  const workNames = {
    roads_subgrade:'Subgrade',roads_subbase:'Subbase',roads_base:'Base Course',
    roads_prime:'Prime Coat',roads_asphalt:'Asphalt',
    struct_rebar:'تسليح',struct_formwork:'شدة',struct_concrete:'صب خرسانة',struct_curing:'معالجة',
    util_excavation:'حفريات',util_pipe:'مواسير',util_backfill:'ردم',util_manhole:'غرف تفتيش',
    geo_borehole:'جسات',geo_sabkha:'سبخة'
  };
  
  const systemPrompt = 'أنت مهندس مدني متخصص في مراقبة الجودة بدولة قطر، خبير في QCS 2024.\n'
    + 'نوع العمل: ' + (workNames[workType]||workType) + '\n'
    + 'المرحلة: ' + (phaseNames[phase]||phase) + '\n'
    + (specific ? 'الفحص المطلوب: ' + specific + '\n' : '')
    + '\nافحص الصورة وقدم:\n'
    + '١. تحديد ما تراه بدقة\n'
    + '٢. تقييم المطابقة: Pass ✅ أو Fail ❌ أو Warning ⚠️ مع بند QCS\n'
    + '٣. المشاكل + الإجراء التصحيحي + المرجع QCS 2024 Part/Clause\n'
    + '٤. نقاط تحقق مرئي + ما يحتاج فحص إضافي\n'
    + '٥. توصية نهائية: هل يمكن المتابعة؟\n'
    + 'الرد بالعربية. كن دقيقاً — لا تخمن.';
  
  try {
    // استخدام vision-proxy مباشرة (Gemini Vision API)
    const base64 = _inspectorImageData.split(',')[1];
    const mimeType = _inspectorImageData.split(';')[0].split(':')[1];
    
    const response = await fetch('/api/vision-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'inspector',
          image: base64,
          mimeType: mimeType || 'image/jpeg',
          userMessage: systemPrompt
        })
    });
    
    if (response.ok) {
      const data = await response.json();
      const answer = data.result || 'لم يتمكن من التحليل';
      showInspectorResult(answer);
    } else {
      // Fallback: local analysis based on work type
      showInspectorResult(generateLocalAnalysis(workType, phase, specific));
    }
  } catch(e) {
    // Offline fallback
    showInspectorResult(generateLocalAnalysis(workType, phase, specific));
  }
  
  loading.style.display = 'none';
  btn.style.opacity = '1';
  btn.disabled = false;
}


function resetInspector() {
  _inspectorImageData = null;
  document.getElementById('inspector-preview').style.display = 'none';
  document.getElementById('inspector-form').style.display = 'none';
  document.getElementById('inspector-result').style.display = 'none';
  document.getElementById('inspector-img').src = '';
  document.getElementById('insp-work-type').value = '';
  document.getElementById('insp-specific').value = '';
  document.getElementById('insp-location').value = '';
  showToast('🔄 جاهز لفحص جديد');
}


  window.runDrawingAnalysis = runDrawingAnalysis;
  window.runInspector = runInspector;
  window.resetInspector = resetInspector;
})();
