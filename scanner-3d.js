window.Scanner3D = (function() {
  'use strict';

  let scene, camera, renderer, animId;
  let wireframe = false, autoRotating = false;
  let sph = { th: 0.7, ph: 1.05, r: 16 };
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let initialized = false;

  const COLORS = [0x534ab7, 0x1d9e75, 0xd85a30, 0xd4537e, 0x378add];
  const T = 0.12; // سماكة الجدار

  // ── تهيئة المحرك ──────────────────────────────────────────
  function init() {
    if (initialized) return;
    if (typeof THREE === 'undefined') {
      setTimeout(init, 300);
      return;
    }
    const cvs = document.getElementById('threeCanvas');
    const W = cvs.parentElement.clientWidth || 640;
    const H = Math.round(W * 0.55);
    cvs.width = W; cvs.height = H;

    scene    = new THREE.Scene();
    scene.background = new THREE.Color(0x080c14);
    camera   = new THREE.PerspectiveCamera(55, W/H, 0.1, 300);
    renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(10, 16, 8);
    scene.add(dl);
    scene.add(new THREE.GridHelper(60, 60, 0x1a1f3a, 0x1a1f3a));

    positionCam();
    bindControls(cvs);
    animate();
    initialized = true;

    if (window.QS3D.rooms.length) build(window.QS3D.rooms);
  }

  // ── بناء المجسم من بيانات الغرف ──────────────────────────
  function build(rooms) {
    if (!scene) { init(); setTimeout(() => build(rooms), 400); return; }
    clearMeshes();
    if (!rooms.length) return;

    let ox = 0;
    rooms.forEach((r, i) => {
      const col  = COLORS[i % COLORS.length];
      const mWall = mat(col, wireframe ? 0.07 : 0.3);
      const mFloor = new THREE.MeshLambertMaterial({ color: 0x111826 });
      const mDoor  = new THREE.MeshLambertMaterial({ color: 0xfac775, transparent: true, opacity: 0.85 });
      const mWin   = new THREE.MeshLambertMaterial({ color: 0x85b7eb, transparent: true, opacity: 0.75 });

      // الجدران الأربعة
      addBox(r.length, r.h||r.height, T,       mWall, ox,           (r.h||r.height)/2, -r.width/2);
      addBox(r.length, r.h||r.height, T,       mWall, ox,           (r.h||r.height)/2,  r.width/2);
      addBox(T, r.h||r.height, r.width,        mWall, ox-r.length/2, (r.h||r.height)/2, 0);
      addBox(T, r.h||r.height, r.width,        mWall, ox+r.length/2, (r.h||r.height)/2, 0);

      // الأرضية
      const fl = new THREE.Mesh(
        new THREE.PlaneGeometry(r.length - T, r.width - T), mFloor
      );
      fl.rotation.x = -Math.PI/2;
      fl.position.set(ox, 0.02, 0);
      scene.add(fl);

      // الأبواب
      (r.doors || []).forEach((d, di) => {
        addBox(d.w, d.h, T + 0.02, mDoor, ox + (di - 0.5) * 1.1, d.h/2, -r.width/2);
      });

      // الشبابيك
      (r.windows || []).forEach((w, wi) => {
        addBox(w.w, w.h, T + 0.02, mWin, ox - r.length/2, 1.35, -(wi - 0.3) * r.width * 0.45);
      });

      ox += r.length + 0.5;
    });

    // ضبط الكاميرا لتظهر المجسم كاملاً
    const totalW = rooms.reduce((s, r) => s + r.length + 0.5, 0);
    sph = { th: 0.7, ph: 1.05, r: Math.max(14, totalW * 0.85) };
    positionCam();

    // تحديث شبكة الأبعاد
    renderDimsGrid(rooms);
  }

  function addBox(W, H, D, mat, x, y, z) {
    const geo  = new THREE.BoxGeometry(W, H, D);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    if (!wireframe) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: mat.color, transparent: true, opacity: 0.55 })
      );
      edges.position.set(x, y, z);
      scene.add(edges);
    }
  }

  function mat(color, opacity) {
    return new THREE.MeshLambertMaterial({ color, transparent: true, opacity, wireframe });
  }

  function clearMeshes() {
    scene.children = scene.children.filter(c =>
      c.type === 'DirectionalLight' ||
      c.type === 'AmbientLight' ||
      c.type === 'GridHelper'
    );
  }

  // ── الكاميرا والتحكم ──────────────────────────────────────
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
    cvs.addEventListener('mousedown',  e => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      sph.th -= (e.clientX - prevMouse.x) * 0.013;
      sph.ph  = Math.max(0.15, Math.min(1.42, sph.ph + (e.clientY - prevMouse.y) * 0.013));
      prevMouse = { x: e.clientX, y: e.clientY };
      positionCam();
    });
    cvs.addEventListener('wheel', e => {
      sph.r = Math.max(4, Math.min(50, sph.r + e.deltaY * 0.03));
      positionCam();
    }, { passive: true });
    cvs.addEventListener('dblclick', resetCamera);
    // Touch
    let tp = { x: 0, y: 0 };
    cvs.addEventListener('touchstart', e => { tp = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
    cvs.addEventListener('touchmove', e => {
      sph.th -= (e.touches[0].clientX - tp.x) * 0.013;
      sph.ph  = Math.max(0.15, Math.min(1.42, sph.ph + (e.touches[0].clientY - tp.y) * 0.013));
      tp = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      positionCam();
    }, { passive: true });
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    if (autoRotating) { sph.th += 0.006; positionCam(); }
    renderer.render(scene, camera);
  }

  function resetCamera()       { sph = { th: 0.7, ph: 1.05, r: 16 }; positionCam(); }
  function toggleWireframe()   { wireframe = !wireframe; document.getElementById('wfBtn').textContent = wireframe ? 'Solid' : 'Wireframe'; if (window.QS3D.rooms.length) build(window.QS3D.rooms); }
  function toggleAutoRotate()  { autoRotating = !autoRotating; }
  function toggleFloorPlan()   { sph.ph = sph.ph > 0.3 ? 0.15 : 1.05; positionCam(); }

  // ── شبكة الأبعاد ─────────────────────────────────────────
  function renderDimsGrid(rooms) {
    const grid = document.getElementById('dimsGrid');
    if (!grid) return;
    const total = rooms.reduce((s, r) => s + r.length * r.width, 0);
    grid.innerHTML = rooms.map(r => {
      const area = (r.length * r.width).toFixed(1);
      const qcsOk = parseFloat(area) >= (r.qcs_min_area || 0);
      return `<div class="dim-card">
        <div class="dc-name">${r.name}</div>
        <div class="dc-dims">${r.length}م × ${r.width}م</div>
        <div class="dc-area">${area} م²</div>
        <div class="dc-badge ${qcsOk ? 'pass' : 'fail'}">${qcsOk ? '✓ QCS' : '✗ دون الحد'}</div>
      </div>`;
    }).join('') +
    `<div class="dim-card dim-total">
      <div class="dc-name">الإجمالي</div>
      <div class="dc-area">${total.toFixed(1)} م²</div>
      <div class="dc-dims">${rooms.length} غرفة</div>
    </div>`;
  }

  return { init, build, resetCamera, toggleWireframe, toggleAutoRotate, toggleFloorPlan };
})();
