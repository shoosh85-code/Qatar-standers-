// ═══════════════════════════════════════════════════════════════
// الفجوات 3+4+5+6: إضافات scanner-3d.js — QatarSpec Pro
// أضف هذه الدوال داخل window.Scanner3D
// المرجع: QCS 2024 | QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────┐
// │  الفجوة 3: أداة القياس التفاعلي                           │
// │  أضف بعد دالة bindControls الموجودة                        │
// └─────────────────────────────────────────────────────────────┘

var measureMode   = false;
var measurePoints = [];      // نقطتان [Vector3, Vector3]
var measureLine   = null;    // خط Three.js
var measureLabel  = null;    // div ثابت فوق الكانفاس

function toggleMeasureMode() {
  measureMode = !measureMode;
  measurePoints = [];
  if (!measureMode) {
    removeMeasureLine();
    hideMeasureLabel();
  }
  var cvs = document.getElementById('threeCanvas');
  cvs.style.cursor = measureMode ? 'crosshair' : 'grab';
  var btn = document.getElementById('btnMeasure');
  if (btn) btn.textContent = measureMode ? '🔴 إلغاء القياس' : '📏 قياس المسافة';

  if (measureMode) {
    cvs.addEventListener('click', onMeasureClick);
  } else {
    cvs.removeEventListener('click', onMeasureClick);
  }
}

function onMeasureClick(event) {
  if (!measureMode || !scene || !camera || !renderer) return;

  var cvs   = document.getElementById('threeCanvas');
  var rect  = cvs.getBoundingClientRect();
  var mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width)  * 2 - 1,
   -((event.clientY - rect.top)  / rect.height) * 2 + 1
  );

  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  var meshes = [];
  scene.traverse(function(obj) {
    if (obj.isMesh) meshes.push(obj);
  });
  var intersects = raycaster.intersectObjects(meshes, false);
  if (!intersects.length) return;

  var point = intersects[0].point.clone();
  measurePoints.push(point);

  addMeasurePoint(point);

  if (measurePoints.length === 2) {
    var dist = measurePoints[0].distanceTo(measurePoints[1]);
    drawMeasureLine(measurePoints[0], measurePoints[1]);
    showMeasureLabel(dist, measurePoints[0], measurePoints[1]);
    setTimeout(function() {
      measurePoints = [];
      removeMeasureLine();
      hideMeasureLabel();
    }, 4000);
  }
}

function addMeasurePoint(point) {
  var geo = new THREE.SphereGeometry(0.08, 12, 12);
  var mat = new THREE.MeshBasicMaterial({ color: 0xff6644 });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(point);
  mesh.userData._measureMarker = true;
  scene.add(mesh);
  setTimeout(function() { scene.remove(mesh); }, 5000);
}

function drawMeasureLine(p1, p2) {
  removeMeasureLine();
  var geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
  var mat = new THREE.LineBasicMaterial({ color: 0xff6644, linewidth: 2 });
  measureLine = new THREE.Line(geo, mat);
  scene.add(measureLine);
}

function removeMeasureLine() {
  if (measureLine) { scene.remove(measureLine); measureLine = null; }
}

function showMeasureLabel(distanceM, p1, p2) {
  hideMeasureLabel();
  measureLabel = document.createElement('div');
  measureLabel.id = 'measureLabelOverlay';
  measureLabel.style.cssText = [
    'position:absolute', 'background:rgba(0,0,0,0.85)',
    'color:#ff6644', 'padding:8px 14px', 'border-radius:8px',
    'font:bold 14px monospace', 'pointer-events:none',
    'z-index:200', 'direction:rtl', 'border:1px solid #ff6644',
    'white-space:nowrap'
  ].join(';');

  var distCm  = (distanceM * 100).toFixed(1);
  var qcsNote = distanceM >= 0.05
    ? '✓ فوق الحد الأدنى QCS'
    : '⚠ أقل من 5 سم — راجع QCS 2024';
  measureLabel.innerHTML =
    '📏 المسافة: <b>' + distCm + ' سم</b> (' + distanceM.toFixed(3) + ' م)<br>' +
    '<small style="color:#a3e635">' + qcsNote + '</small>';

  var mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  var screenPos = mid.clone().project(camera);
  var cvs  = document.getElementById('threeCanvas');
  var rect = cvs.getBoundingClientRect();
  var sx = (screenPos.x + 1) / 2 * rect.width  + rect.left;
  var sy = -(screenPos.y - 1) / 2 * rect.height + rect.top;
  measureLabel.style.left = sx + 'px';
  measureLabel.style.top  = (sy - 50) + 'px';
  document.body.appendChild(measureLabel);
}

function hideMeasureLabel() {
  var old = document.getElementById('measureLabelOverlay');
  if (old) old.remove();
  measureLabel = null;
}


// ┌─────────────────────────────────────────────────────────────┐
// │  الفجوة 4: Clipping Planes                                 │
// │  أضف بعد دالة init                                         │
// └─────────────────────────────────────────────────────────────┘

var clippingEnabled = false;
var clippingPlane   = new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.8);

function toggleClipping() {
  clippingEnabled = !clippingEnabled;
  renderer.clippingPlanes = clippingEnabled ? [clippingPlane] : [];
  renderer.localClippingEnabled = clippingEnabled;
  var btn = document.getElementById('btnClip');
  if (btn) btn.textContent = clippingEnabled ? '✂ إلغاء القطع' : '✂ قطع أفقي';
}

function setClipHeight(heightM) {
  clippingPlane.constant = parseFloat(heightM);
  var label = document.getElementById('clipHeightLabel');
  if (label) label.textContent = 'ارتفاع القطع: ' + heightM + ' م';
}


// ┌─────────────────────────────────────────────────────────────┐
// │  الفجوة 5: QCS Hotspots التفاعلية                         │
// └─────────────────────────────────────────────────────────────┘

var hotspots = [];

var QCS_HOTSPOT_TEMPLATES = {
  concrete_cover: {
    label: 'غطاء خرساني',
    qcs: 'QCS 2024 — Part 8, Sec 8.2.4',
    requirement: '≥ 50mm للأعضاء الخارجية / ≥ 25mm للداخلية',
    color: 0xf59e0b,
    icon: '🔶'
  },
  door_clearance: {
    label: 'فراغ الباب',
    qcs: 'QCS 2024 — Part 3, Sec 3.4.2',
    requirement: 'عرض صافٍ ≥ 900mm | ارتفاع ≥ 2100mm',
    color: 0x06b6d4,
    icon: '🚪'
  },
  corridor_width: {
    label: 'عرض الممر',
    qcs: 'QCS 2024 — Part 3, Sec 3.5.1',
    requirement: '≥ 1200mm للممرات الرئيسية',
    color: 0x8b5cf6,
    icon: '↔️'
  },
  ceiling_height: {
    label: 'ارتفاع السقف',
    qcs: 'QCS 2024 — Part 3, Sec 3.3.1',
    requirement: '≥ 2600mm للغرف المعيشية',
    color: 0x10b981,
    icon: '⬆️'
  },
  stair_riser: {
    label: 'ارتفاع الدرجة',
    qcs: 'QCS 2024 — Part 3, Sec 3.6.3',
    requirement: '≤ 190mm ارتفاع | ≥ 250mm عمق',
    color: 0xef4444,
    icon: '🔺'
  }
};

function addHotspot(position, templateKey, customData) {
  var tpl = QCS_HOTSPOT_TEMPLATES[templateKey] || QCS_HOTSPOT_TEMPLATES.concrete_cover;
  var data = Object.assign({}, tpl, customData);

  var geo  = new THREE.SphereGeometry(0.15, 16, 16);
  var mat  = new THREE.MeshBasicMaterial({ color: data.color });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(position);
  mesh.userData._hotspot    = data;
  mesh.userData._isHotspot  = true;
  scene.add(mesh);
  hotspots.push(mesh);

  // نبض للتمييز
  var pulseScale = 1;
  var growing = true;
  function pulse() {
    if (!mesh.parent) return;
    pulseScale += growing ? 0.015 : -0.015;
    if (pulseScale > 1.3) growing = false;
    if (pulseScale < 0.9) growing = true;
    mesh.scale.setScalar(pulseScale);
    requestAnimationFrame(pulse);
  }
  pulse();

  return mesh;
}

function placeDefaultHotspots(rooms) {
  hotspots.forEach(h => scene.remove(h));
  hotspots = [];

  rooms.forEach(function(room, rIdx) {
    var baseX = (rIdx % 3) * 8 - 8;
    var baseZ = Math.floor(rIdx / 3) * 8 - 8;

    addHotspot(
      new THREE.Vector3(baseX, room.height || 2.8, baseZ),
      'ceiling_height',
      { measuredValue: (room.height || 2.8) + 'م', roomName: room.name }
    );

    if (room.doors && room.doors.length > 0) {
      addHotspot(
        new THREE.Vector3(baseX + room.length / 2, 1.1, baseZ),
        'door_clearance',
        { measuredValue: room.doors[0].w + '×' + room.doors[0].h + 'م', roomName: room.name }
      );
    }
  });
}

function initHotspotRaycasting() {
  var cvs = document.getElementById('threeCanvas');
  cvs.addEventListener('click', function(event) {
    if (measureMode) return;
    var rect  = cvs.getBoundingClientRect();
    var mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width)  * 2 - 1,
     -((event.clientY - rect.top)  / rect.height) * 2 + 1
    );
    var rc = new THREE.Raycaster();
    rc.setFromCamera(mouse, camera);
    var hits = rc.intersectObjects(hotspots, false);
    if (hits.length) {
      showHotspotPopup(hits[0].object.userData._hotspot, event.clientX, event.clientY);
    }
  });
}

function showHotspotPopup(data, x, y) {
  var old = document.getElementById('hotspotPopup');
  if (old) old.remove();

  var popup = document.createElement('div');
  popup.id = 'hotspotPopup';
  var colorHex = '#' + (data.color || 0x8b5cf6).toString(16).padStart(6, '0');
  popup.style.cssText = [
    'position:fixed', 'background:#1a1a2e', 'color:#e2e8f0',
    'border:1px solid ' + colorHex,
    'border-radius:10px', 'padding:14px 16px', 'max-width:280px',
    'font-size:0.82rem', 'z-index:999', 'direction:rtl',
    'box-shadow:0 8px 32px rgba(0,0,0,0.6)',
    'left:' + Math.min(x, window.innerWidth - 300) + 'px',
    'top:'  + Math.min(y, window.innerHeight - 180) + 'px'
  ].join(';');

  popup.innerHTML =
    '<div style="font-weight:bold;font-size:0.95rem;margin-bottom:8px;">' +
      (data.icon || '📍') + ' ' + (data.label || '') + '</div>' +
    '<div style="color:#a5b4fc;font-size:0.78rem;margin-bottom:6px;">' +
      '📋 ' + (data.qcs || '') + '</div>' +
    '<div style="color:#86efac;margin-bottom:6px;">✅ المتطلب: ' +
      (data.requirement || '') + '</div>' +
    (data.measuredValue
      ? '<div style="color:#fde68a;">📏 القيمة المقاسة: ' + data.measuredValue + '</div>'
      : '') +
    (data.roomName
      ? '<div style="color:#94a3b8;font-size:0.75rem;margin-top:6px;">🏠 ' + data.roomName + '</div>'
      : '') +
    '<button onclick="document.getElementById(\'hotspotPopup\').remove()" style="' +
      'margin-top:10px;background:#374151;color:#e2e8f0;border:none;' +
      'padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.78rem;">✕ إغلاق</button>';

  document.body.appendChild(popup);
  setTimeout(function() {
    var p = document.getElementById('hotspotPopup');
    if (p) p.remove();
  }, 6000);
}

// ── أضف في نهاية دالة build(rooms) الموجودة ──────────────────
// if (typeof placeDefaultHotspots === 'function') {
//   placeDefaultHotspots(rooms);
// }
// if (!window._hotspotRaycastInit) {
//   initHotspotRaycasting();
//   window._hotspotRaycastInit = true;
// }


// ┌─────────────────────────────────────────────────────────────┐
// │  الفجوة 6: وضع X-Ray                                       │
// └─────────────────────────────────────────────────────────────┘

var xrayMode = false;

function toggleXRay() {
  xrayMode = !xrayMode;
  scene.traverse(function(obj) {
    if (!obj.isMesh) return;
    if (obj.userData._isHotspot || obj.userData._measureMarker) return;
    if (obj.userData._isFloor) return;

    obj.material.transparent = xrayMode;
    obj.material.opacity      = xrayMode ? 0.22 : 1.0;
    obj.material.depthWrite   = !xrayMode;
    obj.material.side         = xrayMode ? THREE.DoubleSide : THREE.FrontSide;
  });

  var btn = document.getElementById('btnXRay');
  if (btn) {
    btn.textContent    = xrayMode ? '👁 إلغاء X-Ray' : '🔬 وضع X-Ray';
    btn.style.borderColor = xrayMode ? '#ef4444' : '#06b6d4';
    btn.style.color       = xrayMode ? '#ef4444' : '#06b6d4';
  }
}


// ═══════════════════════════════════════════════════════════════
// إضافات scanner.html — أزرار أدوات الـ Viewer
// ═══════════════════════════════════════════════════════════════
/*
<!-- الفجوة 3: زر القياس -->
<button id="btnMeasure" onclick="window.Scanner3D.toggleMeasureMode()" style="
  background:#1e1b4b; color:#ff6644; border:1px solid #ff6644;
  padding:6px 12px; border-radius:6px; font-size:0.8rem; cursor:pointer;
">📏 قياس المسافة</button>

<!-- الفجوة 4: Clipping Controls -->
<div id="clippingControls" style="display:flex; align-items:center; gap:8px; direction:rtl;">
  <button id="btnClip" onclick="window.Scanner3D.toggleClipping()" style="
    background:#1e1b4b; color:#06b6d4; border:1px solid #06b6d4;
    padding:6px 10px; border-radius:6px; font-size:0.8rem; cursor:pointer;
  ">✂ قطع أفقي</button>
  <input type="range" id="clipSlider" min="0" max="5" step="0.1" value="2.8"
    oninput="window.Scanner3D.setClipHeight(this.value)"
    style="width:100px; accent-color:#06b6d4;">
  <span id="clipHeightLabel" style="font-size:0.75rem; color:#64748b;">ارتفاع القطع: 2.8 م</span>
</div>

<!-- الفجوة 6: زر X-Ray -->
<button id="btnXRay" onclick="window.Scanner3D.toggleXRay()" style="
  background:#1e1b4b; color:#06b6d4; border:1px solid #06b6d4;
  padding:6px 10px; border-radius:6px; font-size:0.8rem; cursor:pointer;
">🔬 وضع X-Ray</button>
*/

// ── تصدير الدوال الجديدة للـ namespace العام ─────────────────
// أضف هذه السطور داخل return { ... } في window.Scanner3D:
/*
  toggleMeasureMode,
  toggleClipping,
  setClipHeight,
  addHotspot,
  placeDefaultHotspots,
  showHotspotPopup,
  toggleXRay,
*/
