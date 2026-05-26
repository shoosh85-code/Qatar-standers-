/**
 * QatarSpec Pro — 360° Tour & 3D Viewer v1.0
 * جولة 360° بانورامية + عرض مجسمات GLB + Hotspots مربوطة بـ QCS 2024
 * لا تحذف — فقط أضف أو عدّل
 */
(function() {
  'use strict';

  // ═══ State ═══════════════════════════════════════════════════
  const state = {
    scenes: [],          // [{id, name, type:'pano'|'model', url, hotspots:[], thumb}]
    activeScene: null,
    hotspotMode: false,
    viewer: null,        // Pannellum instance
    pendingHotspot: null // {pitch, yaw} awaiting modal save
  };

  // مراجع QCS 2024 الشائعة للـ hotspots
  const QCS_REFS = [
    { value: '', label: '— بدون مرجع —' },
    { value: 'QCS 2024 — Part 3, Section 4.2', label: 'Part 3 §4.2 — الحد الأدنى لمساحة الغرف' },
    { value: 'QCS 2024 — Part 3, Section 5.1', label: 'Part 3 §5.1 — ارتفاع السقف الأدنى' },
    { value: 'QCS 2024 — Part 5, Section 3.3', label: 'Part 5 §3.3 — فتحات التهوية الطبيعية' },
    { value: 'QCS 2024 — Part 7, Section 2.1', label: 'Part 7 §2.1 — مواصفات التشطيبات' },
    { value: 'QCS 2024 — Part 8, Section 4.5', label: 'Part 8 §4.5 — أنظمة الإطفاء' },
    { value: 'QCS 2024 — Part 9, Section 3.2', label: 'Part 9 §3.2 — التمديدات الكهربائية' },
    { value: 'Ashghal RDM 2023 — Section 6', label: 'Ashghal RDM §6 — معايير الإنشاءات' },
    { value: 'KAHRAMAA 2024 — Reg. 12', label: 'KAHRAMAA §12 — متطلبات الكهرباء' },
    { value: 'custom', label: '✏️ إدخال يدوي' }
  ];

  // ═══ Initialization ═════════════════════════════════════════
  function init() {
    bindTabs();
    bindUploads();
    bindHotspotModal();
    log('✅ جاهز — ارفع صورة 360° أو ملف GLB');
  }

  // ═══ Tab Switching ══════════════════════════════════════════
  function bindTabs() {
    document.querySelectorAll('.tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');
        document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
        this.classList.add('active');
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ═══ Upload Handling ════════════════════════════════════════
  function bindUploads() {
    // بانوراما 360°
    const panoZone = document.getElementById('panoUploadZone');
    const panoInput = document.getElementById('panoInput');
    if (panoZone && panoInput) {
      panoZone.addEventListener('click', function() { panoInput.click(); });
      panoInput.addEventListener('change', function() { handlePanoUpload(this.files); });
      bindDragDrop(panoZone, handlePanoUpload);
    }

    // مجسم GLB
    const modelZone = document.getElementById('modelUploadZone');
    const modelInput = document.getElementById('modelInput');
    if (modelZone && modelInput) {
      modelZone.addEventListener('click', function() { modelInput.click(); });
      modelInput.addEventListener('change', function() { handleModelUpload(this.files); });
      bindDragDrop(modelZone, handleModelUpload);
    }
  }

  function bindDragDrop(zone, handler) {
    zone.addEventListener('dragover', function(e) {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', function() {
      zone.classList.remove('dragover');
    });
    zone.addEventListener('drop', function(e) {
      e.preventDefault();
      zone.classList.remove('dragover');
      handler(e.dataTransfer.files);
    });
  }

  // ═══ Panorama Upload ════════════════════════════════════════
  function handlePanoUpload(files) {
    if (!files || !files.length) return;
    const file = files[0];

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      log('❌ الملف يجب أن يكون صورة (JPEG, PNG)');
      return;
    }
    // التحقق من الحجم (max 30MB)
    if (file.size > 30 * 1024 * 1024) {
      log('❌ حجم الصورة أكبر من 30MB — حاول تقليل الجودة');
      return;
    }

    log('⏳ جاري تحميل: ' + file.name + ' (' + (file.size / 1024 / 1024).toFixed(1) + 'MB)');

    const url = URL.createObjectURL(file);

    // التحقق من أن الصورة equirectangular (نسبة 2:1 تقريباً)
    const img = new Image();
    img.onload = function() {
      const ratio = img.width / img.height;
      const isEquirect = ratio > 1.8 && ratio < 2.2;

      if (!isEquirect) {
        log('⚠️ الصورة ليست 360° (نسبة 2:1). ستُعرض كصورة عادية — للأفضل استخدم تطبيق 360° كاميرا');
      }

      const scene = {
        id: 'pano_' + Date.now(),
        name: file.name.replace(/\.[^.]+$/, ''),
        type: 'pano',
        url: url,
        hotspots: [],
        width: img.width,
        height: img.height
      };

      state.scenes.push(scene);
      activateScene(scene.id);
      renderSceneList();
      switchToTab('pano');
      log('✅ تم تحميل البانوراما — ' + img.width + '×' + img.height + 'px');
    };
    img.onerror = function() {
      log('❌ خطأ في قراءة الصورة');
    };
    img.src = url;
  }

  // ═══ Model Upload (GLB) ═════════════════════════════════════
  function handleModelUpload(files) {
    if (!files || !files.length) return;
    const file = files[0];
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext !== 'glb' && ext !== 'gltf') {
      log('❌ يدعم فقط ملفات GLB أو GLTF');
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      log('❌ حجم النموذج أكبر من 100MB');
      return;
    }

    log('⏳ جاري تحميل النموذج: ' + file.name + ' (' + (file.size / 1024 / 1024).toFixed(1) + 'MB)');

    const url = URL.createObjectURL(file);
    const scene = {
      id: 'model_' + Date.now(),
      name: file.name.replace(/\.[^.]+$/, ''),
      type: 'model',
      url: url,
      hotspots: []
    };

    state.scenes.push(scene);
    activateScene(scene.id);
    renderSceneList();
    switchToTab('model');
    log('✅ تم تحميل النموذج — استخدم الماوس للتدوير والتكبير');
  }

  // ═══ Scene Activation ═══════════════════════════════════════
  function activateScene(id) {
    const scene = state.scenes.find(function(s) { return s.id === id; });
    if (!scene) return;

    state.activeScene = scene;

    if (scene.type === 'pano') {
      initPannellum(scene);
      switchToTab('pano');
    } else {
      initModelViewer(scene);
      switchToTab('model');
    }

    renderSceneList();
    renderHotspotList();
  }

  // ═══ Pannellum ══════════════════════════════════════════════
  function initPannellum(scene) {
    // مسح المشاهد السابقة
    if (state.viewer) {
      try { state.viewer.destroy(); } catch(e) { /* تجاهل */ }
      state.viewer = null;
    }

    const container = document.getElementById('panorama');
    if (!container) return;
    container.innerHTML = '';

    // التحقق من تحميل Pannellum
    if (typeof pannellum === 'undefined') {
      log('❌ مكتبة Pannellum لم تتحمل — تحقق من الاتصال');
      return;
    }

    // بناء الـ hotspots
    var hotspots = scene.hotspots.map(function(hs) {
      return {
        pitch: hs.pitch,
        yaw: hs.yaw,
        type: 'info',
        text: hs.title + (hs.qcsRef ? ' — ' + hs.qcsRef : ''),
        cssClass: 'qs-hotspot'
      };
    });

    state.viewer = pannellum.viewer('panorama', {
      type: 'equirectangular',
      panorama: scene.url,
      autoLoad: true,
      autoRotate: -2,
      compass: true,
      hotSpots: hotspots,
      showControls: true,
      mouseZoom: true,
      draggable: true,
      keyboardZoom: true,
      friction: 0.15,
      minHfov: 30,
      maxHfov: 120,
      hfov: 100,
      strings: {
        loadingLabel: 'جاري التحميل...',
        bylineLabel: 'QatarSpec Pro',
        noPanoramaError: 'لا توجد صورة بانورامية',
        fileAccessError: 'خطأ في الوصول للملف'
      }
    });

    // إضافة hotspot عند النقر (إذا في وضع الإضافة)
    state.viewer.on('mousedown', function(event) {
      if (!state.hotspotMode) return;
      // استخراج الإحداثيات
      var coords = state.viewer.mouseEventToCoords(event);
      if (!coords) return;
      state.pendingHotspot = { pitch: coords[0], yaw: coords[1] };
      openHotspotModal();
    });

    document.getElementById('panoViewer').style.display = 'block';
    document.getElementById('panoUploadZone').style.display = 'none';
    document.getElementById('panoControls').style.display = 'flex';
  }

  // ═══ Model Viewer ═══════════════════════════════════════════
  function initModelViewer(scene) {
    var container = document.getElementById('modelViewerWrap');
    if (!container) return;

    // إزالة viewer قديم إن وجد
    var old = container.querySelector('model-viewer');
    if (old) old.remove();

    var mv = document.createElement('model-viewer');
    mv.setAttribute('src', scene.url);
    mv.setAttribute('alt', scene.name + ' — QatarSpec Pro 3D Model');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('auto-rotate', '');
    mv.setAttribute('shadow-intensity', '1');
    mv.setAttribute('environment-image', 'neutral');
    mv.setAttribute('exposure', '0.8');
    mv.setAttribute('ar', '');
    mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    mv.setAttribute('touch-action', 'pan-y');
    mv.style.width = '100%';
    mv.style.height = '100%';

    container.appendChild(mv);

    document.getElementById('modelViewerSection').style.display = 'block';
    document.getElementById('modelUploadZone').style.display = 'none';
    document.getElementById('modelControls').style.display = 'flex';
  }

  // ═══ Hotspot Management ═════════════════════════════════════
  function toggleHotspotMode() {
    state.hotspotMode = !state.hotspotMode;
    var indicator = document.getElementById('hotspotModeIndicator');
    var btn = document.getElementById('btnHotspotMode');

    if (state.hotspotMode) {
      indicator.classList.add('active');
      btn.textContent = '⏸ إيقاف وضع الإضافة';
      btn.classList.add('btn-danger');
      log('📍 وضع إضافة Hotspot — اضغط على أي نقطة في البانوراما');
    } else {
      indicator.classList.remove('active');
      btn.textContent = '📍 إضافة Hotspot';
      btn.classList.remove('btn-danger');
      log('📍 وضع الإضافة موقف');
    }
  }

  function bindHotspotModal() {
    // إغلاق بالنقر خارج
    var overlay = document.getElementById('hotspotModal');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeHotspotModal();
      });
    }
  }

  function openHotspotModal() {
    var modal = document.getElementById('hotspotModal');
    if (modal) modal.classList.add('active');

    // بناء قائمة مراجع QCS
    var select = document.getElementById('hsQcsRef');
    if (select && select.children.length <= 1) {
      select.innerHTML = '';
      QCS_REFS.forEach(function(ref) {
        var opt = document.createElement('option');
        opt.value = ref.value;
        opt.textContent = ref.label;
        select.appendChild(opt);
      });
    }

    // إظهار/إخفاء حقل يدوي
    if (select) {
      select.addEventListener('change', function() {
        var custom = document.getElementById('hsCustomRef');
        if (custom) custom.style.display = this.value === 'custom' ? 'block' : 'none';
      });
    }
  }

  function closeHotspotModal() {
    var modal = document.getElementById('hotspotModal');
    if (modal) modal.classList.remove('active');
    state.pendingHotspot = null;

    // تنظيف الحقول
    var title = document.getElementById('hsTitle');
    var desc = document.getElementById('hsDesc');
    var ref = document.getElementById('hsQcsRef');
    var custom = document.getElementById('hsCustomRef');
    if (title) title.value = '';
    if (desc) desc.value = '';
    if (ref) ref.value = '';
    if (custom) { custom.value = ''; custom.style.display = 'none'; }
  }

  function saveHotspot() {
    if (!state.pendingHotspot || !state.activeScene) return;

    var title = (document.getElementById('hsTitle').value || '').trim();
    if (!title) { log('⚠️ عنوان الـ Hotspot مطلوب'); return; }

    var refSelect = document.getElementById('hsQcsRef');
    var customRef = document.getElementById('hsCustomRef');
    var qcsRef = refSelect.value === 'custom' ? (customRef.value || '').trim() : refSelect.value;

    var hotspot = {
      id: 'hs_' + Date.now(),
      pitch: state.pendingHotspot.pitch,
      yaw: state.pendingHotspot.yaw,
      title: title,
      description: (document.getElementById('hsDesc').value || '').trim(),
      qcsRef: qcsRef
    };

    state.activeScene.hotspots.push(hotspot);

    // إضافة للـ Pannellum مباشرة
    if (state.viewer) {
      state.viewer.addHotSpot({
        pitch: hotspot.pitch,
        yaw: hotspot.yaw,
        type: 'info',
        text: hotspot.title + (hotspot.qcsRef ? ' — ' + hotspot.qcsRef : ''),
        cssClass: 'qs-hotspot'
      });
    }

    closeHotspotModal();
    renderHotspotList();
    log('✅ تم إضافة Hotspot: ' + hotspot.title);
  }

  function deleteHotspot(id) {
    if (!state.activeScene) return;
    state.activeScene.hotspots = state.activeScene.hotspots.filter(function(h) { return h.id !== id; });

    // إعادة بناء Pannellum مع hotspots محدثة
    if (state.activeScene.type === 'pano' && state.viewer) {
      initPannellum(state.activeScene);
    }

    renderHotspotList();
    log('🗑️ تم حذف الـ Hotspot');
  }

  function renderHotspotList() {
    var container = document.getElementById('hotspotList');
    if (!container || !state.activeScene) return;

    var hotspots = state.activeScene.hotspots;
    if (!hotspots.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">📍</div><p>لا توجد Hotspots — اضغط "إضافة Hotspot" ثم انقر على البانوراما</p></div>';
      return;
    }

    // تنظيف المدخلات لمنع XSS
    container.innerHTML = hotspots.map(function(h) {
      var safeTitle = escHtml(h.title);
      var safeRef = h.qcsRef ? escHtml(h.qcsRef) : '';
      var safeDesc = h.description ? escHtml(h.description) : '';
      return '<div class="hotspot-item">' +
        '<div class="hs-info">' +
          '<div class="hs-title">' + safeTitle + '</div>' +
          (safeRef ? '<div class="hs-ref"><span class="qcs-badge">' + safeRef + '</span></div>' : '') +
          (safeDesc ? '<div class="hs-ref">' + safeDesc + '</div>' : '') +
        '</div>' +
        '<button class="hs-del" onclick="window.QSTour.deleteHotspot(\'' + h.id + '\')" title="حذف">✕</button>' +
      '</div>';
    }).join('');
  }

  // ═══ Scene List ═════════════════════════════════════════════
  function renderSceneList() {
    var container = document.getElementById('sceneList');
    if (!container) return;

    if (!state.scenes.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">📂</div><p>لا توجد مشاهد — ارفع صورة 360° أو ملف GLB</p></div>';
      return;
    }

    container.innerHTML = state.scenes.map(function(s) {
      var isActive = state.activeScene && state.activeScene.id === s.id;
      var icon = s.type === 'pano' ? '🌐' : '📦';
      var safeName = escHtml(s.name);
      var hotspotCount = s.hotspots ? s.hotspots.length : 0;
      return '<div class="scene-card' + (isActive ? ' active' : '') + '" onclick="window.QSTour.activateScene(\'' + s.id + '\')">' +
        '<div style="font-size:24px;width:50px;text-align:center">' + icon + '</div>' +
        '<div class="scene-info">' +
          '<div class="scene-name">' + safeName + '</div>' +
          '<div class="scene-meta">' + (s.type === 'pano' ? 'بانوراما 360°' : 'مجسم GLB') + ' — ' + hotspotCount + ' hotspot</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // ═══ Export Tour Data ═══════════════════════════════════════
  function exportTourJSON() {
    if (!state.scenes.length) { log('⚠️ لا توجد مشاهد للتصدير'); return; }

    var exportData = {
      meta: {
        app: 'QatarSpec Pro',
        version: '1.0',
        date: new Date().toISOString(),
        site: 'qatar-standers.vercel.app',
        standard: 'QCS 2024'
      },
      scenes: state.scenes.map(function(s) {
        return {
          id: s.id,
          name: s.name,
          type: s.type,
          hotspots: s.hotspots.map(function(h) {
            return {
              title: h.title,
              description: h.description,
              qcsRef: h.qcsRef,
              pitch: h.pitch,
              yaw: h.yaw
            };
          })
        };
      })
    };

    var blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'qatarspec-tour-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 5000);
    log('✅ تم تصدير بيانات الجولة — ' + state.scenes.length + ' مشهد');
  }

  // ═══ Reset ══════════════════════════════════════════════════
  function resetPano() {
    if (!state.activeScene || state.activeScene.type !== 'pano') return;

    // حذف المشهد
    state.scenes = state.scenes.filter(function(s) { return s.id !== state.activeScene.id; });
    if (state.viewer) {
      try { state.viewer.destroy(); } catch(e) { /* تجاهل */ }
      state.viewer = null;
    }
    state.activeScene = null;
    state.hotspotMode = false;

    document.getElementById('panoViewer').style.display = 'none';
    document.getElementById('panoUploadZone').style.display = 'block';
    document.getElementById('panoControls').style.display = 'none';

    var indicator = document.getElementById('hotspotModeIndicator');
    if (indicator) indicator.classList.remove('active');

    renderSceneList();
    renderHotspotList();
    log('🗑️ تم مسح البانوراما');
  }

  function resetModel() {
    if (!state.activeScene || state.activeScene.type !== 'model') return;

    state.scenes = state.scenes.filter(function(s) { return s.id !== state.activeScene.id; });
    var container = document.getElementById('modelViewerWrap');
    if (container) {
      var mv = container.querySelector('model-viewer');
      if (mv) mv.remove();
    }
    state.activeScene = null;

    document.getElementById('modelViewerSection').style.display = 'none';
    document.getElementById('modelUploadZone').style.display = 'block';
    document.getElementById('modelControls').style.display = 'none';

    renderSceneList();
    log('🗑️ تم مسح النموذج');
  }

  // ═══ Demo Data ══════════════════════════════════════════════
  function loadDemo() {
    // بانوراما تجريبية من صورة عينة
    log('⏳ جاري تحميل البيانات التجريبية...');

    // إنشاء صورة equirectangular تجريبية (gradient بسيط)
    var canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    var ctx = canvas.getContext('2d');

    // سماء + أرض
    var skyGrad = ctx.createLinearGradient(0, 0, 0, 512);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 2048, 512);

    var groundGrad = ctx.createLinearGradient(0, 512, 0, 1024);
    groundGrad.addColorStop(0, '#8B7355');
    groundGrad.addColorStop(1, '#6B5B45');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, 512, 2048, 512);

    // رسم خطوط شبكة تمثل موقع إنشاء
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 2048; i += 128) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    }
    for (var j = 0; j < 1024; j += 128) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(2048, j); ctx.stroke();
    }

    // نص مركزي
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QatarSpec Pro — Demo 360°', 1024, 480);
    ctx.font = '24px Arial';
    ctx.fillText('موقع إنشاء تجريبي — Doha, Qatar', 1024, 520);

    // تحويل لـ blob
    canvas.toBlob(function(blob) {
      var url = URL.createObjectURL(blob);
      var scene = {
        id: 'demo_pano',
        name: 'موقع تجريبي — الدوحة',
        type: 'pano',
        url: url,
        hotspots: [
          { id: 'demo_hs1', pitch: -5, yaw: 30, title: 'نقطة فحص الخرسانة', description: 'مكان أخذ عينات المكعبات', qcsRef: 'QCS 2024 — Part 3, Section 4.2' },
          { id: 'demo_hs2', pitch: -10, yaw: -60, title: 'فتحة تهوية', description: 'يجب التحقق من المساحة الفعلية', qcsRef: 'QCS 2024 — Part 5, Section 3.3' },
          { id: 'demo_hs3', pitch: 15, yaw: 120, title: 'لوحة كهربائية', description: 'مطابقة لمتطلبات KAHRAMAA', qcsRef: 'KAHRAMAA 2024 — Reg. 12' }
        ],
        width: 2048,
        height: 1024
      };

      state.scenes.push(scene);
      activateScene(scene.id);
      renderSceneList();
      log('✅ تم تحميل البيانات التجريبية — 3 Hotspots مع مراجع QCS');
    }, 'image/jpeg', 0.85);
  }

  // ═══ Helpers ═════════════════════════════════════════════════
  function switchToTab(tabName) {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
    var tab = document.querySelector('.tab[data-tab="' + tabName + '"]');
    var panel = document.getElementById('panel-' + tabName);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');
  }

  function log(msg) {
    var el = document.getElementById('logBar');
    if (el) el.textContent = msg;
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // ═══ Public API ═════════════════════════════════════════════
  window.QSTour = {
    init: init,
    activateScene: activateScene,
    toggleHotspotMode: toggleHotspotMode,
    saveHotspot: saveHotspot,
    deleteHotspot: deleteHotspot,
    exportTourJSON: exportTourJSON,
    resetPano: resetPano,
    resetModel: resetModel,
    loadDemo: loadDemo
  };

  // تهيئة عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
