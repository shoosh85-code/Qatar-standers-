// js/analyzer/viewer-3d.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// عارض ثلاثي الأبعاد احترافي مع أدوات قياس + أوضاع عرض
// يعمل مع ModelBuilder — يعرض المشهد ويضيف تفاعلية
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── ثوابت ──────────────────────────────────────────────────
  const SNAP_DIST = 0.3;        // مسافة snap بالمتر
  const LABEL_STYLE = 'bold 14px Arial';
  const MEASURE_COLOR = 0x00FF88;
  const SNAP_COLOR = 0x00FF00;
  const AREA_COLOR = 0x3388FF;
  const ANGLE_COLOR = 0xFFAA00;

  // ═══════════════════════════════════════════════════════════
  // ██ Viewer3D Class
  // ═══════════════════════════════════════════════════════════

  class Viewer3D {
    constructor(containerId, options = {}) {
      this._containerId = containerId;
      this._container = document.getElementById(containerId);
      if (!this._container) throw new Error('Container غير موجود: ' + containerId);

      this._scene = null;
      this._camera = null;
      this._renderer = null;
      this._controls = null;
      this._raycaster = new THREE.Raycaster();
      this._mouse = new THREE.Vector2();
      this._animId = null;

      // أوضاع
      this._viewMode = 'realistic'; // realistic|wireframe|xray|floorplan|section
      this._measureMode = null;      // null|distance|area|angle
      this._measurePoints = [];
      this._measureObjects = [];      // خطوط + labels + spheres
      this._measurements = [];        // نتائج محفوظة
      this._snapIndicator = null;

      // Clipping
      this._clipPlane = null;
      this._clipEnabled = false;

      // إعدادات
      this._bgColor = options.bgColor || 0xE8F4F8;
      this._showGrid = options.showGrid !== false;

      this._init();
      this._setupEvents();
    }

    // ── التهيئة ──────────────────────────────────────────────

    _init() {
      const w = this._container.clientWidth || 800;
      const h = this._container.clientHeight || 600;

      // Camera
      this._camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
      this._camera.position.set(15, 20, 15);
      this._camera.lookAt(0, 0, 0);

      // Renderer
      this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this._renderer.setSize(w, h);
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this._renderer.shadowMap.enabled = true;
      this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this._renderer.localClippingEnabled = true;
      this._container.appendChild(this._renderer.domElement);

      // Controls
      if (THREE.OrbitControls) {
        this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.08;
        this._controls.maxPolarAngle = Math.PI * 0.85;
        this._controls.minDistance = 1;
        this._controls.maxDistance = 100;
      }

      // Snap indicator
      const snapGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const snapMat = new THREE.MeshBasicMaterial({ color: SNAP_COLOR, transparent: true, opacity: 0.8 });
      this._snapIndicator = new THREE.Mesh(snapGeo, snapMat);
      this._snapIndicator.visible = false;

      // Clipping plane
      this._clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10);

      // Labels container (HTML overlay)
      this._labelDiv = document.createElement('div');
      this._labelDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;';
      this._container.style.position = 'relative';
      this._container.appendChild(this._labelDiv);

      // Animation loop
      this._animate();

      // Resize
      this._resizeHandler = () => this._onResize();
      window.addEventListener('resize', this._resizeHandler);
    }

    _animate() {
      this._animId = requestAnimationFrame(() => this._animate());
      if (this._controls) this._controls.update();
      if (this._scene) {
        this._renderer.render(this._scene, this._camera);
        this._updateLabels();
      }
    }

    _onResize() {
      const w = this._container.clientWidth;
      const h = this._container.clientHeight;
      if (w === 0 || h === 0) return;
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(w, h);
    }

    // ── الأحداث ──────────────────────────────────────────────

    _setupEvents() {
      const canvas = this._renderer.domElement;

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        this._mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this._mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (this._measureMode && this._scene) {
          this._updateSnap();
        }
      });

      canvas.addEventListener('click', (e) => {
        if (!this._measureMode || !this._scene) return;
        // حساب نقطة التقاطع
        const point = this._getIntersection();
        if (point) this._addMeasurePoint(point);
      });

      // Touch support
      canvas.addEventListener('touchend', (e) => {
        if (!this._measureMode || !this._scene || e.touches.length > 0) return;
        const touch = e.changedTouches[0];
        const rect = canvas.getBoundingClientRect();
        this._mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this._mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        const point = this._getIntersection();
        if (point) this._addMeasurePoint(point);
      });
    }

    // ── تحميل المشهد ─────────────────────────────────────────

    loadScene(threeScene) {
      this._scene = threeScene;
      this._scene.add(this._snapIndicator);

      // وضع الكاميرا تلقائياً
      const box = new THREE.Box3().setFromObject(this._scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      this._camera.position.set(
        center.x + maxDim * 0.8,
        maxDim * 1.2,
        center.z + maxDim * 0.8
      );
      this._camera.lookAt(center);
      if (this._controls) this._controls.target.copy(center);
    }

    // ── أوضاع العرض ──────────────────────────────────────────

    setViewMode(mode) {
      this._viewMode = mode;
      if (!this._scene) return;

      this._scene.traverse((obj) => {
        if (!obj.isMesh) return;
        const mat = obj.material;
        if (!mat) return;

        // حفظ المادة الأصلية
        if (!obj._origMaterial) {
          obj._origMaterial = mat.clone();
        }

        switch (mode) {
          case 'realistic':
            obj.material.copy(obj._origMaterial);
            obj.material.wireframe = false;
            obj.material.transparent = obj._origMaterial.transparent;
            obj.material.opacity = obj._origMaterial.opacity;
            obj.material.clippingPlanes = this._clipEnabled ? [this._clipPlane] : [];
            break;

          case 'wireframe':
            obj.material.wireframe = true;
            obj.material.transparent = false;
            obj.material.opacity = 1;
            break;

          case 'xray':
            obj.material.wireframe = false;
            obj.material.transparent = true;
            obj.material.opacity = 0.15;
            break;

          case 'floorplan':
            // مسقط أفقي من الأعلى
            this._setTopView();
            obj.material.wireframe = false;
            obj.material.transparent = obj._origMaterial.transparent;
            obj.material.opacity = obj._origMaterial.opacity;
            break;

          case 'section':
            this.enableClipping('y', 0.5);
            obj.material.copy(obj._origMaterial);
            obj.material.clippingPlanes = [this._clipPlane];
            break;
        }

        obj.material.needsUpdate = true;
      });
    }

    _setTopView() {
      if (!this._scene) return;
      const box = new THREE.Box3().setFromObject(this._scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z);

      this._camera.position.set(center.x, maxDim * 2, center.z);
      this._camera.lookAt(center.x, 0, center.z);
      if (this._controls) {
        this._controls.target.set(center.x, 0, center.z);
      }
    }

    // ── القياسات ─────────────────────────────────────────────

    startMeasureDistance() {
      this._measureMode = 'distance';
      this._measurePoints = [];
      this._container.style.cursor = 'crosshair';
    }

    startMeasureArea() {
      this._measureMode = 'area';
      this._measurePoints = [];
      this._container.style.cursor = 'crosshair';
    }

    startMeasureAngle() {
      this._measureMode = 'angle';
      this._measurePoints = [];
      this._container.style.cursor = 'crosshair';
    }

    stopMeasure() {
      this._measureMode = null;
      this._measurePoints = [];
      this._container.style.cursor = 'default';
      this._snapIndicator.visible = false;
    }

    /** نتائج القياسات المحفوظة */
    getMeasurements() {
      return [...this._measurements];
    }

    /** مسح كل القياسات */
    clearMeasurements() {
      for (const obj of this._measureObjects) {
        if (obj.parent) obj.parent.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      }
      this._measureObjects = [];
      this._measurements = [];
      this._measurePoints = [];
      this._labelDiv.innerHTML = '';
    }

    _getIntersection() {
      this._raycaster.setFromCamera(this._mouse, this._camera);
      const intersects = this._raycaster.intersectObjects(this._scene.children, true);

      for (const hit of intersects) {
        // تجاهل الـ snap indicator والـ measurement objects
        if (hit.object === this._snapIndicator) continue;
        if (hit.object._isMeasure) continue;
        return hit.point.clone();
      }
      return null;
    }

    _updateSnap() {
      const point = this._getIntersection();
      if (point) {
        this._snapIndicator.position.copy(point);
        this._snapIndicator.visible = true;
      } else {
        this._snapIndicator.visible = false;
      }
    }

    _addMeasurePoint(point) {
      // إضافة كرة في النقطة
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color: MEASURE_COLOR })
      );
      sphere.position.copy(point);
      sphere._isMeasure = true;
      this._scene.add(sphere);
      this._measureObjects.push(sphere);
      this._measurePoints.push(point);

      const mode = this._measureMode;
      const pts = this._measurePoints;

      // ── مسافة: نقطتين ──
      if (mode === 'distance' && pts.length === 2) {
        const dist = pts[0].distanceTo(pts[1]);
        this._drawLine(pts[0], pts[1], MEASURE_COLOR);
        this._addLabel3D(
          new THREE.Vector3().lerpVectors(pts[0], pts[1], 0.5).add(new THREE.Vector3(0, 0.3, 0)),
          dist.toFixed(2) + ' م',
          '#00FF88'
        );
        this._measurements.push({ type: 'distance', value: +dist.toFixed(3), unit: 'm', points: pts.map(p => [p.x, p.y, p.z]) });
        this._measurePoints = [];
      }

      // ── مساحة: 3+ نقاط (double-click أو نقطة قريبة من الأولى) ──
      if (mode === 'area' && pts.length >= 3) {
        const closeToFirst = pts[pts.length - 1].distanceTo(pts[0]) < SNAP_DIST * 2;
        if (closeToFirst || pts.length >= 10) {
          this._finishArea();
        } else {
          // ارسم خط مؤقت
          if (pts.length >= 2) {
            this._drawLine(pts[pts.length - 2], pts[pts.length - 1], AREA_COLOR);
          }
        }
      }

      // ── زاوية: 3 نقاط ──
      if (mode === 'angle' && pts.length === 3) {
        const v1 = new THREE.Vector3().subVectors(pts[0], pts[1]).normalize();
        const v2 = new THREE.Vector3().subVectors(pts[2], pts[1]).normalize();
        const angleRad = Math.acos(Math.max(-1, Math.min(1, v1.dot(v2))));
        const angleDeg = (angleRad * 180 / Math.PI);

        this._drawLine(pts[0], pts[1], ANGLE_COLOR);
        this._drawLine(pts[1], pts[2], ANGLE_COLOR);
        this._addLabel3D(
          pts[1].clone().add(new THREE.Vector3(0, 0.4, 0)),
          angleDeg.toFixed(1) + '°',
          '#FFAA00'
        );
        this._measurements.push({ type: 'angle', value: +angleDeg.toFixed(1), unit: 'deg', points: pts.map(p => [p.x, p.y, p.z]) });
        this._measurePoints = [];
      }
    }

    _finishArea() {
      const pts = this._measurePoints;
      // إغلاق الـ polygon
      this._drawLine(pts[pts.length - 1], pts[0], AREA_COLOR);

      // حساب المساحة (Shoelace formula على مستوى XZ)
      let area = 0;
      for (let i = 0; i < pts.length; i++) {
        const j = (i + 1) % pts.length;
        area += pts[i].x * pts[j].z;
        area -= pts[j].x * pts[i].z;
      }
      area = Math.abs(area) / 2;

      // تعبئة شفافة
      const shape = new THREE.Shape();
      shape.moveTo(pts[0].x, pts[0].z);
      for (let i = 1; i < pts.length; i++) {
        shape.lineTo(pts[i].x, pts[i].z);
      }
      shape.closePath();
      const shapeGeo = new THREE.ShapeGeometry(shape);
      const shapeMesh = new THREE.Mesh(shapeGeo, new THREE.MeshBasicMaterial({
        color: AREA_COLOR, transparent: true, opacity: 0.2, side: THREE.DoubleSide
      }));
      shapeMesh.rotation.x = -Math.PI / 2;
      shapeMesh.position.y = pts[0].y + 0.01;
      shapeMesh._isMeasure = true;
      this._scene.add(shapeMesh);
      this._measureObjects.push(shapeMesh);

      // label
      let cx = 0, cz = 0;
      for (const p of pts) { cx += p.x; cz += p.z; }
      cx /= pts.length; cz /= pts.length;
      this._addLabel3D(
        new THREE.Vector3(cx, pts[0].y + 0.5, cz),
        area.toFixed(2) + ' م²',
        '#3388FF'
      );

      this._measurements.push({ type: 'area', value: +area.toFixed(3), unit: 'm2', points: pts.map(p => [p.x, p.y, p.z]) });
      this._measurePoints = [];
    }

    _drawLine(p1, p2, color) {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({ color, linewidth: 2, depthTest: false });
      const line = new THREE.Line(geo, mat);
      line._isMeasure = true;
      line.renderOrder = 999;
      this._scene.add(line);
      this._measureObjects.push(line);
    }

    _addLabel3D(position, text, color) {
      // Canvas sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.beginPath();
      ctx.roundRect(2, 2, 252, 60, 8);
      ctx.fill();
      ctx.fillStyle = color || '#FFFFFF';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
      sprite.position.copy(position);
      sprite.scale.set(1.8, 0.45, 1);
      sprite._isMeasure = true;
      sprite.renderOrder = 1000;
      this._scene.add(sprite);
      this._measureObjects.push(sprite);
    }

    _updateLabels() {
      // يمكن إضافة HTML labels هنا لاحقاً إذا لزم
    }

    // ── Clipping ─────────────────────────────────────────────

    enableClipping(axis, position) {
      this._clipEnabled = true;
      const normals = {
        x: new THREE.Vector3(-1, 0, 0),
        y: new THREE.Vector3(0, -1, 0),
        z: new THREE.Vector3(0, 0, -1),
      };
      this._clipPlane.normal.copy(normals[axis] || normals.y);

      if (this._scene) {
        const box = new THREE.Box3().setFromObject(this._scene);
        const size = box.getSize(new THREE.Vector3());
        const min = axis === 'x' ? box.min.x : axis === 'z' ? box.min.z : box.min.y;
        const max = axis === 'x' ? box.max.x : axis === 'z' ? box.max.z : box.max.y;
        this._clipPlane.constant = min + (max - min) * (position || 0.5);
      }

      this._applyClipping();
    }

    disableClipping() {
      this._clipEnabled = false;
      this._applyClipping();
    }

    setClipPosition(value) {
      if (!this._scene || !this._clipEnabled) return;
      const box = new THREE.Box3().setFromObject(this._scene);
      const n = this._clipPlane.normal;
      let min, max;
      if (Math.abs(n.y) > 0.5) { min = box.min.y; max = box.max.y; }
      else if (Math.abs(n.x) > 0.5) { min = box.min.x; max = box.max.x; }
      else { min = box.min.z; max = box.max.z; }
      this._clipPlane.constant = min + (max - min) * Math.max(0, Math.min(1, value));
      this._applyClipping();
    }

    _applyClipping() {
      if (!this._scene) return;
      const planes = this._clipEnabled ? [this._clipPlane] : [];
      this._scene.traverse((obj) => {
        if (obj.isMesh && obj.material && !obj._isMeasure) {
          obj.material.clippingPlanes = planes;
          obj.material.needsUpdate = true;
        }
      });
    }

    // ── Navigation ───────────────────────────────────────────

    goHome() {
      if (!this._scene) return;
      const box = new THREE.Box3().setFromObject(this._scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      this._camera.position.set(center.x + maxDim * 0.8, maxDim * 1.2, center.z + maxDim * 0.8);
      this._camera.lookAt(center);
      if (this._controls) this._controls.target.copy(center);
    }

    focusRoom(roomId) {
      if (!window.QS.ModelBuilder) return;
      // يتوقع أن builder يعطينا مركز الغرفة
      // fallback: ابحث عن sprite بالاسم
      if (!this._scene) return;
      this._scene.traverse((obj) => {
        if (obj.name === roomId + '_label' && obj.isSprite) {
          const pos = obj.position.clone();
          this._camera.position.set(pos.x + 3, pos.y + 6, pos.z + 3);
          this._camera.lookAt(pos);
          if (this._controls) this._controls.target.copy(pos);
        }
      });
    }

    // ── Screenshots ──────────────────────────────────────────

    captureScreenshot(width, height) {
      if (!this._scene) return null;
      const w = width || this._container.clientWidth;
      const h = height || this._container.clientHeight;

      // Render مرة واحدة بالدقة المطلوبة
      this._renderer.setSize(w, h);
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
      this._renderer.render(this._scene, this._camera);

      const dataURL = this._renderer.domElement.toDataURL('image/png');

      // إرجاع الحجم الأصلي
      this._onResize();
      return dataURL;
    }

    // ── Dispose ──────────────────────────────────────────────

    dispose() {
      if (this._animId) cancelAnimationFrame(this._animId);
      window.removeEventListener('resize', this._resizeHandler);

      this.clearMeasurements();

      if (this._renderer) {
        this._renderer.dispose();
        if (this._renderer.domElement.parentNode) {
          this._renderer.domElement.parentNode.removeChild(this._renderer.domElement);
        }
      }
      if (this._labelDiv && this._labelDiv.parentNode) {
        this._labelDiv.parentNode.removeChild(this._labelDiv);
      }
      if (this._controls) this._controls.dispose();

      this._scene = null;
      this._camera = null;
      this._renderer = null;
      this._controls = null;
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.Viewer3D = Viewer3D;
  console.info('[QS] Viewer3D v1.0 loaded');

})();
