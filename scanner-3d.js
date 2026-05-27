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

  // ── تخطيط الغرف (ذكي + يدوي) ─────────────────────────────
  function computeLayout(rooms) {
    var layout = [];
    var hasGrid = rooms.some(function(r) { return r.grid_x !== undefined; });

    if (hasGrid) {
      // ترتيب من AI — استخدام grid_x, grid_y
      var maxGX = 0, maxGY = 0;
      rooms.forEach(function(r) {
        if ((r.grid_x || 0) > maxGX) maxGX = r.grid_x;
        if ((r.grid_y || 0) > maxGY) maxGY = r.grid_y;
      });

      // حساب مواقع بناءً على grid + أبعاد فعلية
      var colWidths = [];
      var rowHeights = [];
      for (var c = 0; c <= maxGX; c++) colWidths.push(0);
      for (var rr = 0; rr <= maxGY; rr++) rowHeights.push(0);

      rooms.forEach(function(r) {
        var gx = r.grid_x || 0;
        var gy = r.grid_y || 0;
        if (r.length > colWidths[gx]) colWidths[gx] = r.length;
        if (r.width > rowHeights[gy]) rowHeights[gy] = r.width;
      });

      // مواقع تراكمية
      var colX = [0];
      for (var ci = 1; ci <= maxGX; ci++) {
        colX.push(colX[ci-1] + colWidths[ci-1] + 0.3);
      }
      var rowZ = [0];
      for (var ri = 1; ri <= maxGY; ri++) {
        rowZ.push(rowZ[ri-1] + rowHeights[ri-1] + 0.3);
      }

      rooms.forEach(function(r, i) {
        var gx = r.grid_x || 0;
        var gy = r.grid_y || 0;
        layout.push({
          room: r,
          x: colX[gx] + colWidths[gx] / 2,
          z: rowZ[gy] + rowHeights[gy] / 2,
          row: gy
        });
      });
    } else if (rooms[0] && rooms[0]._manualX !== undefined) {
      // ترتيب يدوي
      rooms.forEach(function(r) {
        layout.push({ room: r, x: r._manualX || 0, z: r._manualZ || 0, row: 0 });
      });
    } else {
      // ترتيب افتراضي — L-shape
      var ox = 0, oz = 0, row = 0;
      rooms.forEach(function(r, i) {
        if (i > 0 && i % 3 === 0) {
          ox = 0;
          oz += (rooms[i-1].width || 3) + 0.3;
          row++;
        }
        layout.push({ room: r, x: ox, z: oz, row: row });
        ox += (r.length || 4) + 0.3;
      });
    }

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

  // ── مسقط أفقي تفاعلي (Floor Plan) مع سحب يدوي ─────────────
  function renderFloorPlan(rooms, layout) {
    var fpDiv = document.getElementById('floorPlan');
    if (!fpDiv) return;

    var scale = 30;
    var padding = 40;

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

    var svg = '<svg id="fpSvg" width="100%" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="background:#1a1e2e;border-radius:8px;cursor:default">';

    // خطوط الاتصال بين الغرف
    layout.forEach(function(item) {
      var r = item.room;
      if (!r.connects_to) return;
      var cx1 = (item.x - bounds.minX) * scale + padding;
      var cy1 = (item.z - bounds.minZ) * scale + padding;
      r.connects_to.forEach(function(targetName) {
        var target = layout.find(function(l) { return l.room.name === targetName; });
        if (!target) return;
        var cx2 = (target.x - bounds.minX) * scale + padding;
        var cy2 = (target.z - bounds.minZ) * scale + padding;
        svg += '<line x1="' + cx1 + '" y1="' + cy1 + '" x2="' + cx2 + '" y2="' + cy2 + '" stroke="#534ab7" stroke-width="2" stroke-dasharray="4 4" opacity="0.5"/>';
      });
    });

    // الغرف
    var colors = ['#534ab7','#1d9e75','#d85a30','#378add','#d4537e'];
    layout.forEach(function(item, idx) {
      var r = item.room;
      var x = (item.x - r.length/2 - bounds.minX) * scale + padding;
      var y = (item.z - r.width/2 - bounds.minZ) * scale + padding;
      var w = r.length * scale;
      var h = r.width * scale;
      var c = colors[idx % colors.length];
      var area = (r.length * r.width).toFixed(1);
      var qcsOk = parseFloat(area) >= (r.qcs_min_area || 0);

      svg += '<g class="fp-room" data-idx="' + idx + '" style="cursor:grab">';
      svg += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '" fill-opacity="0.2" stroke="' + c + '" stroke-width="2" rx="3"/>';

      // أبواب
      (r.doors || []).forEach(function(d) {
        var dw = (d.w || 0.9) * scale;
        svg += '<rect x="' + (x + w/2 - dw/2) + '" y="' + y + '" width="' + dw + '" height="4" fill="#8B6914" rx="1"/>';
      });

      // شبابيك
      (r.windows || []).forEach(function(win, wi) {
        var ww = (win.w || 1.2) * scale;
        var wy = y + 8 + wi * (ww + 4);
        svg += '<rect x="' + (x + w - 3) + '" y="' + wy + '" width="4" height="' + ww + '" fill="#85b7eb" rx="1"/>';
      });

      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 - 8) + '" fill="#fff" font-size="11" text-anchor="middle" font-family="Arial">' + (r.name || '') + '</text>';
      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 + 6) + '" fill="#aaa" font-size="10" text-anchor="middle" font-family="monospace">' + r.length + '×' + r.width + 'م</text>';
      svg += '<text x="' + (x + w/2) + '" y="' + (y + h/2 + 19) + '" fill="' + (qcsOk ? '#00ff88' : '#ff6666') + '" font-size="9" text-anchor="middle" font-family="monospace">' + area + ' م² ' + (qcsOk ? '✓' : '✗') + '</text>';
      svg += '</g>';

      // خطوط الأبعاد الخارجية
      // عرض (أفقي فوق)
      svg += '<line x1="' + x + '" y1="' + (y - 8) + '" x2="' + (x + w) + '" y2="' + (y - 8) + '" stroke="#666" stroke-width="0.5"/>';
      svg += '<text x="' + (x + w/2) + '" y="' + (y - 12) + '" fill="#888" font-size="9" text-anchor="middle" font-family="monospace">' + r.length + 'م</text>';
      // طول (عمودي يسار)
      svg += '<line x1="' + (x - 8) + '" y1="' + y + '" x2="' + (x - 8) + '" y2="' + (y + h) + '" stroke="#666" stroke-width="0.5"/>';
      svg += '<text x="' + (x - 12) + '" y="' + (y + h/2) + '" fill="#888" font-size="9" text-anchor="middle" font-family="monospace" transform="rotate(-90,' + (x - 12) + ',' + (y + h/2) + ')">' + r.width + 'م</text>';
    });

    // إجمالي
    var totalArea = rooms.reduce(function(s, r) { return s + r.length * r.width; }, 0).toFixed(1);
    svg += '<text x="' + (svgW/2) + '" y="' + (svgH - 8) + '" fill="#888" font-size="11" text-anchor="middle" font-family="Arial">إجمالي: ' + totalArea + ' م² — ' + rooms.length + ' غرفة</text>';

    svg += '</svg>';

    // زر إعادة الترتيب
    var editBar = '<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">' +
      '<button class="btn-sm" onclick="window.Scanner3D.rearrangeAI()">🤖 ترتيب ذكي</button>' +
      '<button class="btn-sm" onclick="window.Scanner3D.resetLayout()">↺ إعادة ضبط</button>' +
      '<span style="font-size:11px;color:#666;padding:4px">💡 اسحب الغرف لتعديل التخطيط يدوياً</span>' +
    '</div>';

    fpDiv.innerHTML = '<div class="fp-title">📐 المسقط الأفقي — Floor Plan</div>' + svg + editBar;
    fpDiv.style.display = 'block';

    // تفعيل السحب
    initFloorPlanDrag(layout, bounds, scale, padding);
  }

  // ── سحب الغرف في المسقط الأفقي ────────────────────────────
  function initFloorPlanDrag(layout, bounds, scale, padding) {
    var svgEl = document.getElementById('fpSvg');
    if (!svgEl) return;

    var dragging = null;
    var startX, startY, origRX, origRZ;

    svgEl.addEventListener('mousedown', function(e) {
      var room = e.target.closest('.fp-room');
      if (!room) return;
      var idx = parseInt(room.getAttribute('data-idx'));
      if (isNaN(idx)) return;
      dragging = { idx: idx, item: layout[idx] };
      startX = e.clientX;
      startY = e.clientY;
      origRX = dragging.item.x;
      origRZ = dragging.item.z;
      svgEl.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      var dx = (e.clientX - startX) / scale * (svgEl.viewBox.baseVal.width / svgEl.clientWidth);
      var dy = (e.clientY - startY) / scale * (svgEl.viewBox.baseVal.height / svgEl.clientHeight);
      dragging.item.room._manualX = origRX + dx;
      dragging.item.room._manualZ = origRZ + dy;
    });

    window.addEventListener('mouseup', function() {
      if (!dragging) return;
      dragging = null;
      svgEl.style.cursor = 'default';
      // إعادة بناء المجسم بالمواقع الجديدة
      if (window.QS3D && window.QS3D.rooms.length) {
        build(window.QS3D.rooms);
      }
    });
  }

  // ── إعادة ترتيب بالذكاء الاصطناعي ─────────────────────────
  async function rearrangeAI() {
    if (!window.QS3D || !window.QS3D.rooms.length) return;
    window.QS3D.log('🤖 جاري إعادة ترتيب الغرف معمارياً...');
    // مسح الترتيب اليدوي
    window.QS3D.rooms.forEach(function(r) {
      delete r._manualX;
      delete r._manualZ;
      delete r.grid_x;
      delete r.grid_y;
    });
    await window.ScannerGemini.arrangeRoomsArchitecturally(window.QS3D.rooms);
    build(window.QS3D.rooms);
  }

  function resetLayout() {
    if (!window.QS3D || !window.QS3D.rooms.length) return;
    window.QS3D.rooms.forEach(function(r) {
      delete r._manualX;
      delete r._manualZ;
      delete r.grid_x;
      delete r.grid_y;
    });
    build(window.QS3D.rooms);
    window.QS3D.log('↺ تم إعادة ضبط التخطيط');
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
    toggleFloorPlan: toggleFloorPlan, toggleDimLabels: toggleDimLabels,
    rearrangeAI: rearrangeAI, resetLayout: resetLayout
  };
})();
