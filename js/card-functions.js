// js/card-functions.js — External backup for card inline functions
// يضمن عمل daAnalyze/piInspect حتى إذا فشل تنفيذ inline scripts
// [لا تحذف — فقط أضف أو عدّل]

// ── Image compression (حد Vercel Edge = 4.5MB) ──────────────────────────
function _compressImage(base64Data, mimeType, maxSizeKB) {
  return new Promise(function(resolve) {
    if (!mimeType || !mimeType.startsWith('image/')) {
      resolve({ data: base64Data, type: mimeType }); return;
    }
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var w = img.width, h = img.height;
      var maxDim = 1600;
      if (w > maxDim || h > maxDim) {
        var ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio); h = Math.round(h * ratio);
      }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      var quality = 0.75;
      var result = canvas.toDataURL('image/jpeg', quality).split(',')[1];
      while (result.length > (maxSizeKB || 2000) * 1024 && quality > 0.3) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality).split(',')[1];
      }
      resolve({ data: result, type: 'image/jpeg' });
    };
    img.onerror = function() { resolve({ data: base64Data, type: mimeType }); };
    img.src = 'data:' + mimeType + ';base64,' + base64Data;
  });
}

// ── Safe JSON parse — يتعامل مع ردود غير JSON ──────────────────────────
async function _safeJsonParse(res) {
  var text = await res.text();
  try { return JSON.parse(text); }
  catch(e) { return { error: text.slice(0, 300) || ('HTTP ' + res.status) }; }
}

// ── Drawing Analyzer (script 0) ──
(function(){
  var _daFile = null;
  var _daType = '';
  var _daLastResult = '';

  window.daSetType = function(btn, type) {
    document.querySelectorAll('.da-type-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    _daType = type;
  };

  window.daHandleDrop = function(e) {
    e.preventDefault();
    document.getElementById('da-upload-area').style.borderColor = 'rgba(52,152,219,0.4)';
    var file = e.dataTransfer.files[0];
    if (file) daProcessFile(file);
  };

  window.daLoadFile = function(input) {
    if (input.files[0]) daProcessFile(input.files[0]);
  };

  function daProcessFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('حجم الملف كبير — الحد الأقصى 10MB');
      return;
    }
    // For PDF: convert to image representation via canvas isn't possible
    // So we treat PDF as image/jpeg if it has image content, or handle via text
    var mimeType = file.type || 'image/jpeg';

    var reader = new FileReader();
    reader.onload = function(e) {
      _daFile = { data: e.target.result.split(',')[1], type: mimeType, name: file.name };

      // Show preview for images
      if (mimeType.startsWith('image/')) {
        document.getElementById('da-img').src = e.target.result;
        document.getElementById('da-preview').style.display = 'block';
      } else {
        // PDF - show filename
        document.getElementById('da-preview').style.display = 'block';
        document.getElementById('da-img').style.display = 'none';
        document.getElementById('da-preview').innerHTML = '<div style="padding:12px;background:rgba(52,152,219,0.1);border-radius:8px;color:#3498db;font-weight:700">📄 ' + file.name + '</div>';
      }

      document.getElementById('da-placeholder').style.display = 'none';
      document.getElementById('da-btn').disabled = false;
      document.getElementById('da-btn').style.opacity = '1';
    };
    reader.readAsDataURL(file);
  }

  window.daAnalyze = async function() {
    if (!_daFile) { alert('الرجاء اختيار ملف أولاً'); return; }
    var btn = document.getElementById('da-btn');
    var question = document.getElementById('da-question').value.trim();

    var userMsg = 'حلل هذه الوثيقة الهندسية بشكل شامل وفق المواصفات القطرية QCS 2024.';
    if (_daType) userMsg += ' التحليل المطلوب: ' + _daType + '.';
    if (question) userMsg += ' سؤال محدد: ' + question;

    btn.disabled = true;
    document.getElementById('da-loading').style.display = 'block';
    document.getElementById('da-result').style.display = 'none';
    document.getElementById('da-actions').style.display = 'none';

    try {
      // [SEC v4.2] لا localStorage — httpOnly cookie يُرسَل تلقائياً عبر credentials:'include'
      var mimeType = _daFile.type;
      var imageData = _daFile.data;

      // ضغط الصورة لتجنب خطأ 413 (Request Entity Too Large)
      if (mimeType && mimeType.startsWith('image/')) {
        var compressed = await _compressImage(imageData, mimeType, 2000);
        imageData = compressed.data;
        mimeType = compressed.type;
      }

      var res = await fetch('/api/vision-proxy', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'analyzer',
          image: imageData,
          mimeType: mimeType,
          userMessage: userMsg
        })
      });

      var data = await _safeJsonParse(res);
      document.getElementById('da-loading').style.display = 'none';

      if (!res.ok || data.error) {
        document.getElementById('da-result').style.display = 'block';
        document.getElementById('da-result').innerHTML = '<div style="color:#e74c3c">❌ ' + (typeof QS !== 'undefined' && QS.escapeHtml ? QS.escapeHtml(data.error || 'خطأ في الاتصال') : (data.error || 'خطأ في الاتصال')) + '</div>';
      } else {
        _daLastResult = data.result;
        var html = daMarkdownToHTML(data.result);
        document.getElementById('da-result').style.display = 'block';
        document.getElementById('da-result').innerHTML = html;
        document.getElementById('da-actions').style.display = 'flex';
      }
    } catch(err) {
      document.getElementById('da-loading').style.display = 'none';
      document.getElementById('da-result').style.display = 'block';
      document.getElementById('da-result').innerHTML = '<div style="color:#e74c3c">❌ خطأ: ' + (typeof QS !== 'undefined' && QS.escapeHtml ? QS.escapeHtml(err.message) : err.message) + '</div>';
    } finally {
      btn.disabled = false;
    }
  };

  function daMarkdownToHTML(md) {
    return md
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/✅/g, '<span style="color:#2ecc71">✅</span>')
      .replace(/❌/g, '<span style="color:#e74c3c">❌</span>')
      .replace(/⚠️/g, '<span style="color:#f39c12">⚠️</span>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  window.daCopy = function() {
    navigator.clipboard.writeText(_daLastResult).then(function(){
      if(window.showToast) showToast('✅ تم نسخ التحليل');
    });
  };

  window.daReset = function() {
    _daFile = null;
    _daLastResult = '';
    document.getElementById('da-preview').style.display = 'none';
    document.getElementById('da-img').style.display = 'block';
    document.getElementById('da-img').src = '';
    document.getElementById('da-placeholder').style.display = 'block';
    document.getElementById('da-result').style.display = 'none';
    document.getElementById('da-actions').style.display = 'none';
    document.getElementById('da-btn').disabled = true;
    document.getElementById('da-btn').style.opacity = '0.5';
    document.getElementById('da-file').value = '';
    document.getElementById('da-question').value = '';
  };

  window.daPrint = function() {
    var w = window.open('', '_blank');
    w.document.write('<html><head><title>تحليل وثيقة QatarSpec</title><style>body{font-family:Arial,sans-serif;direction:rtl;padding:20px;max-width:800px;margin:0 auto}h2{color:#1a5276;border-bottom:2px solid #c9a84c;padding-bottom:4px}</style></head><body>');
    w.document.write('<h1 style="color:#7a1515">🇶🇦 QatarSpec Pro — تحليل وثيقة هندسية</h1>');
    w.document.write('<div style="color:#666;margin-bottom:20px">التاريخ: ' + new Date().toLocaleDateString('ar-QA') + ' | المرجع: QCS 2024</div>');
    w.document.write(document.getElementById('da-result').innerHTML);
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(function(){w.print();},800);
  };
})();

// ── Photo Inspector (script 0) ──
(function(){
  var _piImage = null;
  var _piFocus = '';
  var _piLastResult = '';

  window.piSetFocus = function(btn, focus) {
    document.querySelectorAll('.pi-focus-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    _piFocus = focus;
  };

  window.piHandleDrop = function(e) {
    e.preventDefault();
    document.getElementById('pi-upload-area').style.borderColor = 'rgba(46,204,113,0.4)';
    var file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) piProcessFile(file);
  };

  window.piLoadImage = function(input) {
    if (input.files[0]) piProcessFile(input.files[0]);
  };

  function piProcessFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('حجم الصورة كبير — الحد الأقصى 10MB');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      _piImage = { data: e.target.result.split(',')[1], type: file.type };
      document.getElementById('pi-img').src = e.target.result;
      document.getElementById('pi-preview').style.display = 'block';
      document.getElementById('pi-placeholder').style.display = 'none';
      document.getElementById('pi-btn').disabled = false;
      document.getElementById('pi-btn').style.opacity = '1';
    };
    reader.readAsDataURL(file);
  }

  window.piInspect = async function() {
    if (!_piImage) { alert('الرجاء اختيار صورة أولاً'); return; }
    var btn = document.getElementById('pi-btn');
    var instruction = document.getElementById('pi-instruction').value.trim();
    var userMsg = 'افحص هذه الصورة من موقع البناء وأعطني تقرير تفتيش شاملاً وفق QCS 2024.';
    if (_piFocus) userMsg += ' ركز على: ' + _piFocus + '.';
    if (instruction) userMsg += ' ملاحظة إضافية: ' + instruction;

    btn.disabled = true;
    document.getElementById('pi-loading').style.display = 'block';
    document.getElementById('pi-result').style.display = 'none';
    document.getElementById('pi-actions').style.display = 'none';

    try {
      // ضغط الصورة لتجنب خطأ 413
      var compressed = await _compressImage(_piImage.data, _piImage.type, 2000);

      var res = await fetch('/api/vision-proxy', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'inspector',
          image: compressed.data,
          mimeType: compressed.type,
          userMessage: userMsg
        })
      });

      var data = await _safeJsonParse(res);
      document.getElementById('pi-loading').style.display = 'none';

      if (!res.ok || data.error) {
        document.getElementById('pi-result').style.display = 'block';
        document.getElementById('pi-result').innerHTML = '<div style="color:#e74c3c">❌ ' + (typeof QS !== 'undefined' && QS.escapeHtml ? QS.escapeHtml(data.error || 'خطأ في الاتصال') : (data.error || 'خطأ في الاتصال')) + '</div>';
      } else {
        _piLastResult = data.result;
        var html = piMarkdownToHTML(data.result);
        document.getElementById('pi-result').style.display = 'block';
        document.getElementById('pi-result').innerHTML = html;
        document.getElementById('pi-actions').style.display = 'flex';
      }
    } catch(err) {
      document.getElementById('pi-loading').style.display = 'none';
      document.getElementById('pi-result').style.display = 'block';
      document.getElementById('pi-result').innerHTML = '<div style="color:#e74c3c">❌ خطأ في الاتصال: ' + (typeof QS !== 'undefined' && QS.escapeHtml ? QS.escapeHtml(err.message) : err.message) + '</div>';
    } finally {
      btn.disabled = false;
    }
  };

  function piMarkdownToHTML(md) {
    return md
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/✅/g, '<span style="color:#2ecc71">✅</span>')
      .replace(/❌/g, '<span style="color:#e74c3c">❌</span>')
      .replace(/⚠️/g, '<span style="color:#f39c12">⚠️</span>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  window.piCopy = function() {
    navigator.clipboard.writeText(_piLastResult).then(function(){
      if(window.showToast) showToast('✅ تم نسخ التقرير');
    });
  };

  window.piReset = function() {
    _piImage = null;
    _piLastResult = '';
    document.getElementById('pi-preview').style.display = 'none';
    document.getElementById('pi-placeholder').style.display = 'block';
    document.getElementById('pi-result').style.display = 'none';
    document.getElementById('pi-actions').style.display = 'none';
    document.getElementById('pi-btn').disabled = true;
    document.getElementById('pi-btn').style.opacity = '0.5';
    document.getElementById('pi-file').value = '';
    document.getElementById('pi-instruction').value = '';
  };

  window.piPrint = function() {
    var w = window.open('', '_blank');
    w.document.write('<html><head><title>تقرير فحص QatarSpec</title><style>body{font-family:Arial,sans-serif;direction:rtl;padding:20px;max-width:800px;margin:0 auto}h2{color:#1a5276;border-bottom:2px solid #c9a84c;padding-bottom:4px}li{margin:4px 0}.pass{color:green}.fail{color:red}</style></head><body>');
    w.document.write('<h1 style="color:#7a1515">🇶🇦 QatarSpec Pro — تقرير الفحص الميداني</h1>');
    w.document.write('<div style="color:#666;margin-bottom:20px">التاريخ: ' + new Date().toLocaleDateString('ar-QA') + ' | المرجع: QCS 2024</div>');
    w.document.write(document.getElementById('pi-result').innerHTML);
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(function(){w.print();}, 800);
  };
})();

