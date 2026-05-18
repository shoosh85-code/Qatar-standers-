// QatarSpec Pro — Document Upload & Analysis Module
// Extracted from inline-scripts.js (Phase 5)
(function() {
  "use strict";


function handleFiles(e) { processFiles(Array.from(e.target.files)); }
function handleDragOver(e) { e.preventDefault(); document.getElementById('uploadZone').classList.add('drag-over'); }


function handleDragOver(e) { e.preventDefault(); document.getElementById('uploadZone').classList.add('drag-over'); }
function handleDragLeave(e) { document.getElementById('uploadZone').classList.remove('drag-over'); }


function handleDragLeave(e) { document.getElementById('uploadZone').classList.remove('drag-over'); }
function handleDrop(e) { e.preventDefault(); document.getElementById('uploadZone').classList.remove('drag-over'); processFiles(Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')); }


function handleDrop(e) { e.preventDefault(); document.getElementById('uploadZone').classList.remove('drag-over'); processFiles(Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')); }
function processFiles(files) {
  files.forEach(file => {
    if (file.type !== 'application/pdf') return;
    const id = Date.now() + Math.random();
    uploadedFiles.push({ id, file, name: file.name, size: file.size });
    renderFileItem(id, file.name, file.size, 'loading');
    // ربط زر العرض بالملف الفعلي
    const item = document.querySelector(`[data-file-id="${id}"] .pdf-view-btn`);
    if (item) item.addEventListener('click', function() {
      if (typeof QS !== 'undefined' && QS.openPDFViewer) QS.openPDFViewer(file);
    });
    setTimeout(() => {
      document.querySelector(`[data-file-id="${id}"] .file-status`).textContent = 'جاهز ✓';
      document.querySelector(`[data-file-id="${id}"] .file-status`).className = 'file-status ready';
      showToast(`✅ تم رفع: ${file.name}`);
    }
, 2000);
  });
}


function processFiles(files) {
  files.forEach(file => {
    if (file.type !== 'application/pdf') return;
    const id = Date.now() + Math.random();
    uploadedFiles.push({ id, file, name: file.name, size: file.size });
    renderFileItem(id, file.name, file.size, 'loading');
    // ربط زر العرض بالملف الفعلي
    const item = document.querySelector(`[data-file-id="${id}"] .pdf-view-btn`);
    if (item) item.addEventListener('click', function() {
      if (typeof QS !== 'undefined' && QS.openPDFViewer) QS.openPDFViewer(file);
    });
    setTimeout(() => {
      document.querySelector(`[data-file-id="${id}"] .file-status`).textContent = 'جاهز ✓';
      document.querySelector(`[data-file-id="${id}"] .file-status`).className = 'file-status ready';
      showToast(`✅ تم رفع: ${file.name}`);
    }
, 2000);
  });
}


function renderFileItem(id, name, size, status) {
  const list = document.getElementById('filesList');
  const div = document.createElement('div');
  div.className = 'file-item';
  div.setAttribute('data-file-id', id);
  const safeName = name.length > 30 ? name.slice(0,30)+'...' : name;
  div.innerHTML = `<span class="file-icon">📄</span><div class="file-info"><div class="file-name"></div><div class="file-size">${(size/1024/1024).toFixed(1)} MB</div></div><span class="file-status ${status}">${status === 'loading' ? 'جاري الرفع...' : 'جاهز ✓'}</span><button class="pdf-view-btn" aria-label="عرض PDF" style="background:var(--dark4,#2a2a3e);border:1px solid var(--gold,#c9a84c);border-radius:6px;padding:3px 10px;color:var(--gold,#c9a84c);font-size:11px;cursor:pointer;margin-right:6px;">👁️ عرض</button>`;
  div.querySelector('.file-name').textContent = safeName;
  // ربط زر العرض بالملف الفعلي — يُضاف لاحقاً في processFiles
  list.appendChild(div);
}


function handleDocUpload(input, type) {
  const files = Array.from(input.files);
  docUploaded[type] = docUploaded[type].concat(files);
  
  const listId = 'doc-files-list';
  let listEl = document.getElementById(listId);
  if (!listEl) listEl = document.getElementById('doc-files-list-en');
  
  const allFiles = [];
  Object.keys(docUploaded).forEach(function(t) {
    docUploaded[t].forEach(function(f) {
      allFiles.push({ name: f.name, type: t, size: (f.size/1024).toFixed(0) });
    });
  });
  
  let html = allFiles.map(function(f) {
    const icons = { specs:'📋', drawings:'📐', boq:'📊', gi:'🔬' };
    return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(255,255,255,0.05);border-radius:6px;margin:4px 0;font-size:12px;">' +
      '<span>' + (icons[f.type]||'📄') + '</span>' +
      '<span style="flex:1;color:var(--text1);">' + sanitizeText(f.name) + '</span>' +
      '<span style="color:var(--text3);">' + f.size + ' KB</span>' +
      '</div>';
  }).join('');
  
  if (listEl) listEl.innerHTML = html;
  
  // Show analysis panel if files uploaded
  let panel = document.getElementById('doc-analysis-panel');
  if (panel && allFiles.length > 0) panel.style.display = 'block';
}


function runDocAnalysis() {
  // ── MONETIZATION: Pro Feature ──
  if (!isProUser()) {
    showUpgradePrompt('doc_analyzer','🤖','محلل المستندات الذكي — Pro فقط','تحليل المواصفات والعقود وملفات PDF باستخدام الذكاء الاصطناعي متاح للمشتركين في Pro فقط.');
    return;
  }
  const resultEl = document.getElementById('doc-ai-result') || document.getElementById('doc-ai-result-en');
  if (!resultEl) return;
  
  const totalFiles = Object.values(docUploaded).reduce(function(s,a){ return s + a.length; }, 0);
  if (totalFiles === 0) {
    resultEl.innerHTML = '<div style="color:#e74c3c;padding:10px;font-size:13px;">⚠️ Please upload at least one document first</div>';
    return;
  }
  
  const projType = document.getElementById('doc-project-type') ? 
    document.getElementById('doc-project-type').value :
    document.getElementById('doc-project-type-en').value;
  
  const doITP = (document.getElementById('da-itp') || document.getElementById('da-itp-en')).checked;
  const doTests = (document.getElementById('da-tests') || document.getElementById('da-tests-en')).checked;
  const doQty = (document.getElementById('da-qty') || document.getElementById('da-qty-en')).checked;
  
  resultEl.innerHTML = '<div style="padding:12px;text-align:center;"><div style="font-size:24px;margin-bottom:8px;">⚡</div><div style="color:var(--gold);font-size:13px;">Analyzing ' + totalFiles + ' document(s)...</div></div>';
  
  // Build analysis prompt
  const fileNames = Object.entries(docUploaded).map(function(e) {
    return e[1].map(function(f){ return e[0] + ': ' + f.name; });
  }).flat().join(', ');
  
  const prompt = 'You are QatarSpec Pro AI assistant. A user has uploaded the following project documents: ' + fileNames + 
    '. Project type: ' + projType + '. Based on QCS 2024 and standard Qatar construction practice, provide: ' +
    (doITP ? '1. Key ITP hold points and witness points for this project type. ' : '') +
    (doTests ? '2. Critical testing requirements and frequencies. ' : '') +
    (doQty ? '3. Key quantity thresholds that trigger additional testing. ' : '') +
    'Be specific, practical, and reference QCS 2024 sections. Keep response concise and structured.';
  
  fetchGeminiAPI({
    model: 'gemini-2.0-flash',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  }).then(function(r){ return r.json(); })
  .then(function(data) {
    let text = data.content && data.content[0] ? data.content[0].text : 'Analysis complete. Upload documents to get specific guidance.';
    resultEl.innerHTML = '<div style="background:var(--dark4);border-radius:10px;padding:14px;">' +
      '<div style="color:var(--gold);font-weight:700;margin-bottom:8px;font-size:13px;">🤖 AI Analysis Results</div>' +
      '<div style="font-size:12px;color:var(--text1);line-height:1.7;white-space:pre-wrap;">' + renderMarkdownSafe(text) + '</div>' +
      '</div>';
  }).catch(function() {
    // Fallback analysis based on project type
    let analysis = getProjectAnalysis(projType, doITP, doTests);
    resultEl.innerHTML = '<div style="background:var(--dark4);border-radius:10px;padding:14px;">' +
      '<div style="color:var(--gold);font-weight:700;margin-bottom:8px;font-size:13px;">📋 Project Analysis — ' + sanitizeText(projType.toUpperCase()) + '</div>' +
      '<div style="font-size:12px;color:var(--text1);line-height:1.7;">' + renderMarkdownSafe(analysis) + '</div>' +
      '</div>';
  });
}


function getProjectAnalysis(type, doITP, doTests) {
  const analyses = {
    roads: '<strong>Road Project — Key Hold Points:</strong><br>1. Subgrade CBR approved before Subbase<br>2. Subbase compaction 98% MDD before Base Course<br>3. Base Course CBR 80% + level ±8mm before Prime Coat<br>4. JMF approval before asphalt production<br>5. Trial section approved before full production<br>6. IRI ≤0.9 m/km for PMB WC before handover',
    utilities: '<strong>Utilities Project — Key Hold Points:</strong><br>1. Material Approval (MAR) before pipe delivery<br>2. Joint inspection before backfill<br>3. Pressure test 1.5×PN for water pipes<br>4. Air test 100mm WG for sewer<br>5. CCTV 100% Grade ≤2<br>6. Water quality: Coliform=0, Turbidity ≤1 NTU',
    building: '<strong>Building Project — Key Hold Points:</strong><br>1. Founding level geotechnical approval<br>2. Rebar inspection before every pour<br>3. 28-day cube ≥fcu before striking formwork<br>4. Cover check after striking<br>5. Waterproofing inspection before backfill',
    mixed: '<strong>Mixed Project — All Key Hold Points:</strong><br>Roads: CBR levels → JMF → Trial Section → IRI<br>Utilities: MAR → Joint check → Pressure test → CCTV<br>Structural: Founding → Rebar → Cube results'
  };
  return analyses[type] || analyses.mixed;
}


  // Expose to window
  window.handleFiles = handleFiles;
  window.handleDragOver = handleDragOver;
  window.handleDragLeave = handleDragLeave;
  window.handleDrop = handleDrop;
  window.processFiles = processFiles;
  window.renderFileItem = renderFileItem;
  window.handleDocUpload = handleDocUpload;
  window.runDocAnalysis = runDocAnalysis;
  window.getProjectAnalysis = getProjectAnalysis;
})();
