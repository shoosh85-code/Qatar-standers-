// js/viewer/scene.js — QatarSpec Pro
// عارض ثلاثي الأبعاد — Three.js + قياس + QCS Hotspots

const QS = window.QS || {};

QS.Viewer = (() => {
  // ===== المتغيرات الأساسية =====
  let scene, camera, renderer, controls;
  let currentModel = null;
  let measurePoints   = [];
  let measureSpheres  = [];
  let measureLines    = [];
  let hotspots        = [];
  let clippingPlane   = null;
  let isClipping      = false;
  const raycaster     = new THREE.Raycaster();
  const mouse         = new THREE.Vector2();
  let measureMode     = false;
  let containerId     = null;

  // ===== تهيئة المشهد =====
  function init(id) {
    containerId = id;
    const container = document.getElementById(id);
    if (!container) return false;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.FogExp2(0x1a1a2e, 0.015);

    // Camera
    camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.001,
      2000
    );
    camera.position.set(0, 2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    _setupLighting();

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0x444466, 0x333355);
    scene.add(grid);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.1;
    controls.maxDistance = 500;

    // أحداث
    renderer.domElement.addEventListener('dblclick', _onMeasureClick);
    renderer.domElement.addEventListener('mousemove', _onHoverHotspot);
    window.addEventListener('resize', _onResize);

    _animate();
    return true;
  }

  function _setupLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff8e7, 1.2); // ضوء قطر الدافئ
    sun.position.set(8, 15, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.width  = 2048;
    sun.shadow.mapSize.height = 2048;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xaaccff, 0.3);
    fill.position.set(-5, 5, -5);
    scene.add(fill);

    const hemi = new THREE.HemisphereLight(0x88aaff, 0xaa8844, 0.4);
    scene.add(hemi);
  }

  // ===== تحميل GLB =====
  function loadGLB(url, onProgress) {
    return new Promise((resolve, reject) => {
      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

      const loader = new THREE.GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      // حذف النموذج السابق
      if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
      }

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.traverse(child => {
            if (child.isMesh) {
              child.castShadow    = true;
              child.receiveShadow = true;
            }
          });

          // مركزة تلقائية
          const box    = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          model.position.sub(center);

          // ضبط الكاميرا على الـ bounding box
          const maxDim = Math.max(size.x, size.y, size.z);
          camera.position.set(0, maxDim * 0.8, maxDim * 1.8);
          controls.target.set(0, 0, 0);
          controls.update();

          scene.add(model);
          currentModel = model;

          resolve({
            model,
            dimensions: {
              width:  +size.x.toFixed(3),
              height: +size.y.toFixed(3),
              depth:  +size.z.toFixed(3),
              unit:   'm',
            },
          });
        },
        (xhr) => {
          if (xhr.total > 0) {
            onProgress?.(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        reject
      );
    });
  }

  // ===== وضع القياس =====
  function toggleMeasureMode(enabled) {
    measureMode = enabled;
    renderer.domElement.style.cursor = enabled ? 'crosshair' : 'default';
    if (!enabled) clearMeasurements();
  }

  function _onMeasureClick(event) {
    if (!measureMode || !currentModel) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =  ((event.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((event.clientY - rect.top)  / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(currentModel, true);
    if (hits.length === 0) return;

    const point = hits[0].point.clone();
    measurePoints.push(point);

    // نقطة مرئية حمراء
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.015),
      new THREE.MeshBasicMaterial({ color: 0xff3344, depthTest: false })
    );
    sphere.position.copy(point);
    sphere.renderOrder = 999;
    scene.add(sphere);
    measureSpheres.push(sphere);

    if (measurePoints.length === 2) {
      const [p1, p2] = measurePoints;
      const distM = p1.distanceTo(p2);

      // خط القياس
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({ color: 0xffdd00, depthTest: false });
      const line = new THREE.Line(geo, mat);
      line.renderOrder = 999;
      scene.add(line);
      measureLines.push(line);

      document.dispatchEvent(new CustomEvent('qs:measure', {
        detail: {
          distanceM:  +distM.toFixed(4),
          distanceCm: +(distM * 100).toFixed(1),
          distanceMm: +(distM * 1000).toFixed(0),
          p1: { x: +p1.x.toFixed(3), y: +p1.y.toFixed(3), z: +p1.z.toFixed(3) },
          p2: { x: +p2.x.toFixed(3), y: +p2.y.toFixed(3), z: +p2.z.toFixed(3) },
        },
      }));

      // إعادة تهيئة للقياس التالي
      measurePoints = [];
    }
  }

  function clearMeasurements() {
    [...measureSpheres, ...measureLines].forEach(o => scene.remove(o));
    measureSpheres = [];
    measureLines   = [];
    measurePoints  = [];
  }

  // ===== QCS Hotspots =====
  function addHotspot(position, qcsData) {
    // {position: {x,y,z}, qcsData: {part, section, clause, title, limit, unit, status}}
    const geo = new THREE.SphereGeometry(0.04);
    const color = qcsData.status === 'pass' ? 0x00dd66 :
                  qcsData.status === 'fail' ? 0xff2222 : 0xffaa00;
    const mat = new THREE.MeshBasicMaterial({ color, depthTest: false });
    const sphere = new THREE.Mesh(geo, mat);
    sphere.position.set(position.x, position.y, position.z);
    sphere.renderOrder = 998;
    sphere.userData = { isHotspot: true, qcsData };
    scene.add(sphere);
    hotspots.push(sphere);
    return sphere;
  }

  function _onHoverHotspot(event) {
    if (!currentModel) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =  ((event.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((event.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(hotspots);
    if (hits.length > 0) {
      const data = hits[0].object.userData.qcsData;
      document.dispatchEvent(new CustomEvent('qs:hotspot-hover', { detail: data }));
      renderer.domElement.style.cursor = 'pointer';
    } else {
      renderer.domElement.style.cursor = measureMode ? 'crosshair' : 'default';
    }
  }

  function clearHotspots() {
    hotspots.forEach(h => scene.remove(h));
    hotspots = [];
  }

  // ===== Clipping Plane =====
  function setClippingHeight(heightNormalized) {
    // heightNormalized: 0.0 → 1.0 (من أسفل للأعلى)
    if (!currentModel) return;
    const box  = new THREE.Box3().setFromObject(currentModel);
    const minY = box.min.y;
    const maxY = box.max.y;
    const clipY = minY + (maxY - minY) * (1 - heightNormalized);

    clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), clipY);
    renderer.clippingPlanes = [clippingPlane];
    isClipping = true;
  }

  function clearClipping() {
    renderer.clippingPlanes = [];
    clippingPlane = null;
    isClipping = false;
  }

  // ===== وضع X-Ray =====
  function setXRayMode(enabled) {
    if (!currentModel) return;
    currentModel.traverse(child => {
      if (child.isMesh) {
        child.material.transparent = enabled;
        child.material.opacity     = enabled ? 0.25 : 1.0;
        child.material.depthWrite  = !enabled;
      }
    });
  }

  // ===== Screenshot =====
  function takeScreenshot() {
    renderer.render(scene, camera);
    return renderer.domElement.toDataURL('image/png');
  }

  // ===== Resize =====
  function _onResize() {
    const container = document.getElementById(containerId);
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  // ===== Animation Loop =====
  function _animate() {
    requestAnimationFrame(_animate);
    controls?.update();
    renderer?.render(scene, camera);
  }

  // ===== Dispose =====
  function dispose() {
    renderer?.dispose();
    window.removeEventListener('resize', _onResize);
  }

  return {
    init,
    loadGLB,
    toggleMeasureMode,
    clearMeasurements,
    addHotspot,
    clearHotspots,
    setClippingHeight,
    clearClipping,
    setXRayMode,
    takeScreenshot,
    dispose,
  };
})();

window.QS = QS;
