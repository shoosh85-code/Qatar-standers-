window.Scanner3D = (function() {
  'use strict';

  var scene, camera, renderer, animId;
  var wireframe = false, autoRotating = false, showDims = true;
  var sph = { th: 0.7, ph: 0.85, r: 18 };
  var isDragging = false, prevMouse = { x: 0, y: 0 };
  var initialized = false;
  var dimLabels = []; // مجموعة labels الأبعاد

  var WALL_COLOR   = 0xf5f0e8;
  var FLOOR_COLORS = [0xd4c5a0, 0xb8a88a, 0xc9b896, 0xa89878, 0xcdbfa6];
  var DOOR_COLOR   = 0x8B6914;
  var WINDOW_COLOR = 0x85b7eb;
  var CEIL_COLOR   = 0xfafaf8;
  var T = 0.15; // سماكة الجدار

  // ── تهيئة المحرك ──────────────────────────────────────────
  function init() {
    if (initialized) return;
    if (typeof THREE === 'undefined') { setTimeout(init, 300); return; }
    var cvs = document.getElementById('threeCanvas');
    var W = cvs.parentElement.clientWidth || 640;
    var H = Math.round(W * 0.6);
    cvs.width = W; cvs.height = H;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1e2e);
    scene.fog = new THREE.Fog(0x1a1e2e, 40, 80);

    camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 300);
    renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // إضاءة محسّنة
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(15, 25, 10);
    dl.castShadow = true;
    dl.shadow.mapSize.width = 1024;
    dl.shadow.mapSize.height = 1024;
    scene.add(dl);
    var fill = new THREE.DirectionalLight(0x8888ff, 0.2);
    fill.position.set(-10, 8, -5);
    scene.add(fill);

    // شبكة أرضية
    var grid = new THREE.GridHelper(60, 60, 0x2a2f45, 0x1f2338);
    grid.position.y = -0.01;
    scene.add(grid);

    positionCam();
    bindControls(cvs);
    animate();
    initialized = true;

    if (window.QS3D && window.QS3D.rooms.length) build(window.QS3D.rooms);
  }

  // ── بناء مجسم مكتمل بالقياسات ─────────────────────────────
  function build(rooms) {
    if (!scene) { init(); setTimeout(function() { build(rooms); }, 400); return; }
    clearMeshes();
    if (!rooms.length) return;

    // حساب التوزيع الذكي للغرف (L-shape أو خطي)
    var layout = computeLayout(rooms);

    layout.forEach(function(item, idx) {
      var r = item.room;
      var ox = item.x;
      var oz = item.z;
      var L = r.length;
      var W = r.width;
      var H = r.h || r.height || 2.8;
      var floorColor = FLOOR_COLORS[idx % FLOOR_COLORS.length];

      // ── الأرضية ────────────────────────────────────────
      var floorMat = new THREE.MeshLambertMaterial({ color: floorColor });
      var floor = new THREE.Mesh(new THREE.PlaneGeometry(L, W), floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(ox, 0.01, oz);
      floor.receiveShadow = true;
      scene.add(floor);

      // ── السقف ──────────────────────────────────────────
      var ceilMat = new THREE.MeshLambertMaterial({ color: CEIL_COLOR, side: THREE.DoubleSide });
      var ceil = new THREE.Mesh(new THREE.PlaneGeometry(L - T, W - T), ceilMat);
      ceil.rotation.x = Math.PI / 2;
      ceil.position.set(ox, H, oz);
      scene.add(ceil);

      // ── الجدران (4 جدران مع فتحات الأبواب والشبابيك) ──
      buildWall(ox, oz, L, W, H, 'north', r.doors, r.windows, idx);
      buildWall(ox, oz, L, W, H, 'south', r.doors, r.windows, idx);
      buildWall(ox, oz, L, W, H, 'east',  r.doors, r.windows, idx);
      buildWall(ox, oz, L, W, H, 'west',  r.doors, r.windows, idx);

      // ── labels الأبعاد ─────────────────────────────────
      if (showDims) {
        addDimLabel(r.length + 'م', ox, 0.05, oz - W/2 - 0.5, 0);
        addDimLabel(r.width + 'م', ox + L/2 + 0.5, 0.05, oz, Math.PI/2);
        addDimLabel(H + 'م', ox - L/2 - 0.4, H/2, oz - W/2, 0);
        // اسم الغرفة
        addDimLabel(r.name || 'غرفة', ox, 0.1, oz, 0, true);
      }
    });

    // ضبط الكاميرا
    var bounds = getBounds(layout);
    sph.r = Math.max(16, bounds.maxDim * 1.1);
    sph.th = 0.7;
    sph.ph = 0.85;
    positionCam();

    // تحديث الشبكة
    renderDimsGrid(rooms);
    renderFloorPlan(rooms, layout);
  }

  // ── بناء جدار واحد مع فتحات ──────────────────────────────
  function buildWall(ox, oz, L, W, H, side, doors, windows, roomIdx) {
    var wallMat = new THREE.MeshLambertMaterial({
      color: wireframe ? 0x534ab7 : WALL_COLOR,
      transparent: wireframe,
      opacity: wireframe ? 0.15 : 1,
      wireframe: wireframe
    });

    doors = doors || [];
    windows = windows || [];

    var wallX, wallZ, wallW, wallD, rotY;
    if (side === 'north') {
      wallX = ox; wallZ = oz - W/2; wallW = L; wallD = T; rotY = 0;
    } else if (side === 'south') {
      wallX = ox; wallZ = oz + W/2; wallW = L; wallD = T; rotY = 0;
    } else if (side === 'east') {
      wallX = ox + L/2; wallZ = oz; wallW = W; wallD = T; rotY = Math.PI/2;
    } else {
      wallX = ox - L/2; wallZ = oz; wallW = W; wallD = T; rotY = Math.PI/2;
    }

    // فتحات الأبواب والشبابيك على هذا الجدار
    var openings = [];

    // وضع باب على الجدار الأول (north) والشبابيك على الشرقي
    var doorWall = (roomIdx % 2 === 0) ? 'north' : 'south';
    var winWall = (roomIdx % 2 === 0) ? 'east' : 'west';

    if (side === doorWall) {
      doors.forEach(function(d, di) {
        var dw = d.w || 0.9;
        var dh = d.h || 2.1;
        var dPos = (di - (doors.length - 1) / 2) * (dw + 0.5);
        openings.push({ x: dPos, y: 0, w: dw, h: dh, type: 'door' });
      });
    }

    if (side === winWall) {
      windows.forEach(function(w, wi) {
        var ww = w.w || 1.2;
        var wh = w.h || 1.0;
        var sill = w.sill_height || 0.9;
        var wPos = (wi - (windows.length - 1) / 2) * (ww + 0.8);
        openings.push({ x: wPos, y: sill, w: ww, h: wh, type: 'window' });
      });
    }

    if (openings.length === 0) {
      // جدار كامل بدون فتحات
      var geo = new THREE.BoxGeometry(wallW, H, T);
      var mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(wallX, H/2, wallZ);
      if (side === 'east' || side === 'west') mesh.rotation.y = Math.PI/2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      addEdges(geo, mesh);
    } else {
      // جدار مع فتحات — نبنيه كأجزاء
      openings.forEach(function(op) {
        // القطعة فوق الفتحة
        var aboveH = H - op.y - op.h;
        if (aboveH > 0.05) {
          addWallPiece(wallX, wallZ, wallW, aboveH, T, op.y + op.h, side, wallMat);
        }
        // القطعة تحت الفتحة (للشبابيك)
        if (op.y > 0.05) {
          addWallPiece(wallX, wallZ, wallW, op.y, T, 0, side, wallMat);
        }
        // إضافة الباب أو الشباك
        if (op.type === 'door') {
          var doorMat = new THREE.MeshLambertMaterial({ color: DOOR_COLOR });
          var doorGeo = new THREE.BoxGeometry(op.w, op.h, T * 0.3);
          var doorMesh = new THREE.Mesh(doorGeo, doorMat);
          if (side === 'east' || side === 'west') {
            doorMesh.position.set(wallX, op.h/2, wallZ + op.x);
            doorMesh.rotation.y = Math.PI/2;
          } else {
            doorMesh.position.set(wallX + op.x, op.h/2, wallZ);
          }
          doorMesh.castShadow = true;
          scene.add(doorMesh);
        }
        if (op.type === 'window') {
          var winMat = new THREE.MeshLambertMaterial({ color: WINDOW_COLOR, transparent: true, opacity: 0.5 });
          var winGeo = new THREE.BoxGeometry(op.w, op.h, T * 0.15);
          var winMesh = new THREE.Mesh(winGeo, winMat);
          if (side === 'east' || side === 'west') {
            winMesh.position.set(wallX, op.y + op.h/2, wallZ + op.x);
            winMesh.rotation.y = Math.PI/2;
          } else {
            winMesh.position.set(wallX + op.x, op.y + op.h/2, wallZ);
          }
          scene.add(winMesh);
          // إطار الشباك
          var frameMat = new THREE.MeshLambertMaterial({ color: 0x666666 });
          var frameGeo = new THREE.BoxGeometry(op.w + 0.06, op.h + 0.06, T * 0.2);
          var frameMesh = new THREE.Mesh(frameGeo, frameMat);
          frameMesh.position.copy(winMesh.position);
          frameMesh.rotation.copy(winMesh.rotation);
          scene.add(frameMesh);
        }
      });
      // القطع الجانبية
      addWallPiece(wallX, wallZ, wallW, H, T, 0, side, wallMat);
    }
  }

  function addWallPiece(wx, wz, ww, h, d, yOff, side, mat) {
    // جدار كامل العرض بالارتفاع المحدد
    var geo = new THREE.BoxGeometry(ww, h, d);
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(wx, yOff + h/2, wz);
    if (side === 'east' || side === 'west') mesh.rotation.y = Math.PI/2;
    mesh.castShadow = true;
    scene.add(mesh);
  }

  function addEdges(geo, mesh) {
    if (wireframe) return;
    var edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.2 })
    );
    edges.position.copy(mesh.position);
    edges.rotation.copy(mesh.rotation);
    scene.add(edges);
  }

  // ── Labels ثلاثية الأبعاد ──────────────────────────────────
  function addDimLabel(text, x, y, z, rotY, isTitle) {
    var canvas = document.createElement('canvas');
    var size = isTitle ? 256 : 192;
    canvas.width = size; canvas.height = isTitle ? 64 : 40;
    var ctx = canvas.getContext('2d');

    if (isTitle) {
      ctx.fillStyle = 'rgba(83,74,183,0.85)';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, 8);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 22px Arial';
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, 6);
      ctx.fill();
      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 18px monospace';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width/2, canvas.height/2);

    var tex = new THREE.CanvasTexture(canvas);
    var spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    var sprite = new THREE.Sprite(spriteMat);
    var scale = isTitle ? 2.0 : 1.4;
    sprite.scale.set(scale, scale * (canvas.height / canvas.width), 1);
    sprite.position.set(x, y + 0.3, z);
    scene.add(sprite);
    dimLabels.push(sprite);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // ── تخطيط الغرف ────────────────────────────────────────────
  function computeLayout(rooms) {
    var layout = [];
    var ox = 0, oz = 0;
    var row = 0;

    rooms.forEach(function(r, i) {
      var L = r.length || 4;
      var W = r.width || 3;

      // تخطيط L-shape: كل 3 غرف ننزل صف
      if (i > 0 && i % 3 === 0) {
        ox = 0;
        oz += (rooms[i-1].width || 3) + 0.3;
        row++;
      }

      layout.push({ room: r, x: ox, z: oz, row: row });
      ox += L + 0.3; // مسافة بين الغرف
    });

    // تمركز
    var minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    layout.forEach(function(item) {
      var hl = (item.room.length || 4) / 2;
      var hw = (item.room.width || 3) / 2;
      if (item.x - hl < minX) minX = item.x - hl;
      if (item.x + hl > maxX) maxX = item.x + hl;
      if (item.z - hw < minZ) minZ = item.z - hw;
      if (item.z + hw > maxZ) maxZ = item.z + hw;
    });
    var cx = (minX + maxX) / 2;
    var cz = (minZ + maxZ) / 2;
    layout.forEach(function(item) { item.x -= cx; item.z -= cz; });

    return layout;
  }

  function getBounds(layout) {
    var maxD = 0;
    layout.forEach(function(item) {
      var d = Math.max(
        Math.abs(item.x) + (item.room.length || 4),
        Math.abs(item.z) + (item.room.width || 3)
      );
      if (d > maxD) maxD = d;
    });
    return { maxDim: maxD };
  }

  // ── مسقط أفقي (Floor Plan) ────────────────────────────────
  function renderFloorPlan(rooms, layout) {
    var fpDiv = document.getElementById('floorPlan');
    if (!fpDiv) return;

    var scale = 30; // px per meter
    var padding = 20;

    var bounds = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity };
    layout.forEach(function(item) {
      var r = item.room;
      bounds.minX = Math.min(bounds.minX, item.x - r.length/2);
      bounds.maxX = Math.max(bounds.maxX, item.x + r.length/2);
      bounds.minZ = Math.min(bounds.minZ, item.z - r.width/2);
      bounds.maxZ = Math.max(bounds.maxZ, item.z + r.width/2);
    });

    var svgW = (bounds.maxX - bounds.minX) * scale + padding * 2;
    var svgH = (bounds.maxZ - bounds.minZ) * scale + padding * 2;

    var svg = '<svg width="100%" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="background:#1a1e2e;border-radius:8px">';

    layout.forEach(function(item, idx) {
      var r = item.room;
      var x = (item.x - r.length/2 - bounds.minX) * scale + padding;
      var y = (item.z - r.width/2 - bounds.minZ) * scale + padding;
      var w = r.length * scale;
      var h = r.width * scale;
      var colors = ['#534ab7','#1d9e75','#d85a30','#378add','#d4537e'];
      var c = colors[idx % colors.length];

      svg += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '" fill-opacity="0.15" stroke="' + c + '" stroke-width="2" rx="2"/>';
      // اسم الغرفة
      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 - 6) + '" fill="#fff" font-size="11" text-anchor="middle" font-family="Arial">' + (r.name || '') + '</text>';
      // الأبعاد
      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 + 10) + '" fill="#888" font-size="10" text-anchor="middle" font-family="monospace">' + r.length + '×' + r.width + 'م</text>';
      // المساحة
      var area = (r.length * r.width).toFixed(1);
      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 + 22) + '" fill="#00ff88" font-size="9" text-anchor="middle" font-family="monospace">' + area + ' م²</text>';
    });

    svg += '</svg>';
    fpDiv.innerHTML = svg;
    fpDiv.style.display = 'block';
  }

  // ── المتبقي من الكود القديم (محفوظ + محسّن) ────────────────
  function clearMeshes() {
    dimLabels = [];
    var keep = [];
    scene.children.forEach(function(c) {
      if (c.type === 'DirectionalLight' || c.type === 'AmbientLight' || c.type === 'GridHelper') {
        keep.push(c);
      }
    });
    scene.children = keep;
  }

  function positionCam() {
    if (!camera) return;
    camera.position.set(
      sph.r * Math.sin(sph.ph) * Math.sin(sph.th),
      sph.r * Math.cos(sph.ph),
      sph.r * Math.sin(sph.ph) * Math.cos(sph.th)
    );
    camera.lookAt(0, 1.5, 0);
  }

  function bindControls(cvs) {
    cvs.addEventListener('mousedown', function(e) { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', function() { isDragging = false; });
    window.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      sph.th -= (e.clientX - prevMouse.x) * 0.013;
      sph.ph = Math.max(0.15, Math.min(1.42, sph.ph + (e.clientY - prevMouse.y) * 0.013));
      prevMouse = { x: e.clientX, y: e.clientY };
      positionCam();
    });
    cvs.addEventListener('wheel', function(e) {
      sph.r = Math.max(4, Math.min(50, sph.r + e.deltaY * 0.03));
      positionCam();
    }, { passive: true });
    cvs.addEventListener('dblclick', resetCamera);
    var tp = { x: 0, y: 0 };
    cvs.addEventListener('touchstart', function(e) { tp = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
    cvs.addEventListener('touchmove', function(e) {
      sph.th -= (e.touches[0].clientX - tp.x) * 0.013;
      sph.ph = Math.max(0.15, Math.min(1.42, sph.ph + (e.touches[0].clientY - tp.y) * 0.013));
      tp = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      positionCam();
    }, { passive: true });
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    if (autoRotating) { sph.th += 0.005; positionCam(); }
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  function resetCamera() { sph = { th: 0.7, ph: 0.85, r: 18 }; positionCam(); }

  function toggleWireframe() {
    wireframe = !wireframe;
    var btn = document.getElementById('wfBtn');
    if (btn) btn.textContent = wireframe ? 'Solid' : 'Wireframe';
    if (window.QS3D && window.QS3D.rooms.length) build(window.QS3D.rooms);
  }

  function toggleAutoRotate() { autoRotating = !autoRotating; }

  function toggleFloorPlan() {
    sph.ph = sph.ph > 0.3 ? 0.15 : 0.85;
    positionCam();
  }

  function toggleDimLabels() {
    showDims = !showDims;
    dimLabels.forEach(function(s) { s.visible = showDims; });
  }

  // ── شبكة الأبعاد ─────────────────────────────────────────
  function renderDimsGrid(rooms) {
    var grid = document.getElementById('dimsGrid');
    if (!grid) return;
    var total = rooms.reduce(function(s, r) { return s + r.length * r.width; }, 0);
    grid.innerHTML = rooms.map(function(r) {
      var area = (r.length * r.width).toFixed(1);
      var qcsOk = parseFloat(area) >= (r.qcs_min_area || 0);
      var safeN = (r.name || '').replace(/</g, '&lt;');
      var safeMat = (r.floor_material || '').replace(/</g, '&lt;');
      return '<div class="dim-card">' +
        '<div class="dc-name">' + safeN + '</div>' +
        '<div class="dc-dims">' + r.length + 'م × ' + r.width + 'م × ' + (r.h || r.height || 2.8) + 'م</div>' +
        '<div class="dc-area">' + area + ' م²</div>' +
        (safeMat ? '<div class="dc-mat">' + safeMat + '</div>' : '') +
        '<div class="dc-badge ' + (qcsOk ? 'pass' : 'fail') + '">' + (qcsOk ? '✓ QCS' : '✗ دون الحد') + '</div>' +
      '</div>';
    }).join('') +
    '<div class="dim-card dim-total">' +
      '<div class="dc-name">إجمالي المشروع</div>' +
      '<div class="dc-area">' + total.toFixed(1) + ' م²</div>' +
      '<div class="dc-dims">' + rooms.length + ' غرفة</div>' +
    '</div>';
  }

  return {
    init: init, build: build, resetCamera: resetCamera,
    toggleWireframe: toggleWireframe, toggleAutoRotate: toggleAutoRotate,
    toggleFloorPlan: toggleFloorPlan, toggleDimLabels: toggleDimLabels
  };
})();
