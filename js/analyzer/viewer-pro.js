// js/analyzer/viewer-pro.js — QatarSpec Pro v2.0
// ═══════════════════════════════════════════════════════════════
// عارض 3D احترافي — محرك بصري موحد (builder + viewer في ملف واحد)
// يستقبل JSON Schema → يبني مجسم كامل مع تحكم بالطبقات
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── ألوان حسب نوع الغرفة ───────────────────────────────────
  const ROOM_COLORS = {
    'مجلس': 0xE8D8B8, 'صالة': 0xD8C8A8, 'غرفة نوم': 0xC8D8E0,
    'غرفة نوم رئيسية': 0xB8C8D8, 'مطبخ': 0xD4C4A0, 'حمام': 0xA8C8D4,
    'ممر': 0xD8D0C8, 'مدخل': 0xD0C8B8, 'شرفة': 0xC0D8B8,
    'مخزن': 0xB8B0A0, 'غرفة خادمة': 0xC8C0B0, 'مغسلة': 0xB0C0C8,
    'مكتب': 0xC8C8D8, 'غرفة اجتماعات': 0xC0C8D0, 'استقبال': 0xD0C8B0,
    'مكتب المدير': 0xC8D0D8, 'منطقة عمل مفتوحة': 0xD0D0C8,
    'قاعة اجتماعات': 0xC0C8D4, 'سيرفر + حمام': 0xB0B8C8,
    'مطبخ صغير': 0xC8C0B0, 'غرفة طعام': 0xD8D0B8,
    'مجلس نساء': 0xD8C8C8, 'مرآب': 0xA8A8A0,
    'default': 0xD4C4A8,
  };

  // ── مساعدات ────────────────────────────────────────────────
  function wallLen(s, e) {
    return Math.sqrt((e[0]-s[0])**2 + (e[1]-s[1])**2);
  }
  function wallAngle(s, e) {
    return Math.atan2(e[1]-s[1], e[0]-s[0]);
  }
  function ptAlong(s, e, r) {
    return [s[0]+(e[0]-s[0])*r, s[1]+(e[1]-s[1])*r];
  }

  // ═══════════════════════════════════════════════════════════
  // ██ ViewerPro Class
  // ═══════════════════════════════════════════════════════════

  class ViewerPro {
    constructor(containerId) {
      this._container = document.getElementById(containerId);
      if (!this._container) throw new Error('Container غير موجود: ' + containerId);
      this._scene = null;
      this._camera = null;
      this._renderer = null;
      this._controls = null;
      this._animId = null;
      this._groups = {};
      this._schema = null;
      this._layerPanel = null;
      this._disposed = false;
    }

    // ══════════════════════════════════════════════════════════
    // ██ API الرئيسي
    // ══════════════════════════════════════════════════════════

    buildAndRender(schemaJSON) {
      this.dispose();
      this._disposed = false;
      this._schema = this._repair(schemaJSON);

      const c = this._container;
      c.innerHTML = '';
      c.style.position = 'relative';

      const w = c.clientWidth || 800;
      const h = c.clientHeight || 600;

      // Renderer
      this._renderer = new THREE.WebGLRenderer({ antialias: true });
      this._renderer.setSize(w, h);
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this._renderer.shadowMap.enabled = true;
      this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (this._renderer.outputEncoding !== undefined)
        this._renderer.outputEncoding = THREE.sRGBEncoding;
      if (this._renderer.toneMapping !== undefined) {
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1.15;
      }
      c.appendChild(this._renderer.domElement);

      // Scene
      this._scene = new THREE.Scene();
      this._scene.background = new THREE.Color(0x1A1A2E);
      this._scene.fog = new THREE.FogExp2(0x1A1A2E, 0.008);

      // Camera
      const bounds = this._getBounds();
      const cx = (bounds.minX + bounds.maxX) / 2;
      const cz = (bounds.minY + bounds.maxY) / 2;
      const size = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, 5);

      this._camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
      this._camera.position.set(cx + size * 0.8, size * 0.9, cz + size * 0.8);

      // Controls
      if (THREE.OrbitControls) {
        this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
        this._controls.target.set(cx, 0, cz);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.08;
        this._controls.maxPolarAngle = Math.PI * 0.48;
        this._controls.minDistance = 2;
        this._controls.maxDistance = size * 5;
        this._controls.update();
      }

      // Lighting — مطابق للمثال
      this._addLighting(cx, cz, size);

      // Groups
      const groupNames = ['ground','floor','walls','doors','windows','columns','ceiling','labels'];
      for (const name of groupNames) {
        this._groups[name] = new THREE.Group();
        this._groups[name].name = name;
        this._scene.add(this._groups[name]);
      }

      // Build
      const floor = this._schema.floors[0];
      const H = floor.height_m || 3.0;

      this._buildGround(bounds, size);
      this._buildRoomFloors(floor);
      this._buildWalls(floor, H);
      this._buildDoors(floor, H);
      this._buildWindows(floor, H);
      this._buildColumns(floor, H);
      this._buildCeiling(floor, H, bounds);
      this._buildLabels(floor, H);

      // السقف مخفي افتراضياً
      this._groups.ceiling.visible = false;

      // Layer Panel UI
      this._createLayerPanel();
      this._createViewButtons(cx, cz, size);
      this._createHint();

      // Stats
      const stats = `${(floor.rooms||[]).length} غرفة · ${(floor.walls||[]).length} جدار · ${(floor.doors||[]).length} باب · ${(floor.windows||[]).length} شباك`;
      this._createStatsBar(stats, floor.label);

      // Animation
      this._animate();

      // Resize
      this._resizeHandler = () => {
        const nw = c.clientWidth, nh = c.clientHeight;
        if (nw && nh) {
          this._camera.aspect = nw / nh;
          this._camera.updateProjectionMatrix();
          this._renderer.setSize(nw, nh);
        }
      };
      window.addEventListener('resize', this._resizeHandler);

      console.info('[ViewerPro] بناء مكتمل:', stats);
    }

    // ══════════════════════════════════════════════════════════
    // ██ الإضاءة — ACES compatible
    // ══════════════════════════════════════════════════════════

    _addLighting(cx, cz, size) {
      const s = this._scene;
      s.add(new THREE.AmbientLight(0xC0C8E0, 0.5));
      s.add(new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.35));

      const sun = new THREE.DirectionalLight(0xFFF5E6, 1.0);
      sun.position.set(cx + size, size * 1.5, cz + size * 0.5);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      sun.shadow.camera.near = 0.5;
      sun.shadow.camera.far = size * 5;
      const ext = size * 1.5;
      sun.shadow.camera.left = -ext;
      sun.shadow.camera.right = ext;
      sun.shadow.camera.top = ext;
      sun.shadow.camera.bottom = -ext;
      sun.shadow.bias = -0.001;
      s.add(sun);

      const fill = new THREE.DirectionalLight(0x6090C0, 0.25);
      fill.position.set(cx - size, size * 0.5, cz - size);
      s.add(fill);
    }

    // ══════════════════════════════════════════════════════════
    // ██ البناء
    // ══════════════════════════════════════════════════════════

    _buildGround(bounds, size) {
      const gs = size * 4;
      const geo = new THREE.PlaneGeometry(gs, gs);
      const mat = new THREE.MeshStandardMaterial({ color: 0x2A2A3E, roughness: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -0.01;
      mesh.receiveShadow = true;
      this._groups.ground.add(mesh);

      const grid = new THREE.GridHelper(gs, Math.floor(gs / 0.5), 0x333355, 0x252540);
      grid.position.y = -0.005;
      grid.material.opacity = 0.4;
      grid.material.transparent = true;
      this._groups.ground.add(grid);
    }

    _buildRoomFloors(floor) {
      for (const room of (floor.rooms || [])) {
        const poly = room.polygon;
        if (!poly || poly.length < 3) continue;

        const shape = new THREE.Shape();
        shape.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) shape.lineTo(poly[i][0], poly[i][1]);
        shape.closePath();

        const color = ROOM_COLORS[room.name] || ROOM_COLORS['default'];
        const geo = new THREE.ShapeGeometry(shape);
        const mat = new THREE.MeshStandardMaterial({
          color, roughness: 0.55, metalness: 0.05, side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.002;
        mesh.receiveShadow = true;
        this._groups.floor.add(mesh);
      }
    }

    _buildWalls(floor, H) {
      for (const wall of (floor.walls || [])) {
        if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) continue;
        const len = wallLen(wall.start, wall.end);
        if (len < 0.05) continue;

        const angle = wallAngle(wall.start, wall.end);
        const thick = wall.thickness_m || 0.2;
        const h = wall.height_m || H;
        const isExt = wall.is_external !== false;

        const geo = new THREE.BoxGeometry(len, h, thick);
        const color = isExt ? 0xE8DCC8 : 0xF5F0E8;
        const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.02 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (wall.start[0] + wall.end[0]) / 2,
          h / 2,
          (wall.start[1] + wall.end[1]) / 2
        );
        mesh.rotation.y = -angle;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this._groups.walls.add(mesh);
      }
    }

    _buildDoors(floor, H) {
      for (const door of (floor.doors || [])) {
        const wall = (floor.walls || []).find(w => w.id === door.wall_id);
        if (!wall) continue;

        const angle = wallAngle(wall.start, wall.end);
        const pos = door.position_ratio || 0.5;
        const wp = ptAlong(wall.start, wall.end, pos);
        const dW = door.width_m || 0.9;
        const dH = door.height_m || 2.1;
        const thick = (wall.thickness_m || 0.2) + 0.02;

        // إطار
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x8B6940, roughness: 0.5, metalness: 0.1 });

        // عارضة علوية
        const topGeo = new THREE.BoxGeometry(dW + 0.08, 0.06, thick);
        const topM = new THREE.Mesh(topGeo, frameMat);
        topM.position.set(wp[0], dH, wp[1]);
        topM.rotation.y = -angle;
        topM.castShadow = true;
        this._groups.doors.add(topM);

        // عمودين جانبيين
        const sideGeo = new THREE.BoxGeometry(0.04, dH, thick);
        for (const sign of [-1, 1]) {
          const side = new THREE.Mesh(sideGeo, frameMat);
          side.position.set(
            wp[0] + Math.cos(angle) * sign * dW / 2,
            dH / 2,
            wp[1] + Math.sin(angle) * sign * dW / 2
          );
          side.rotation.y = -angle;
          side.castShadow = true;
          this._groups.doors.add(side);
        }

        // ورقة الباب — شبه شفافة
        const panelGeo = new THREE.BoxGeometry(dW * 0.92, dH - 0.04, 0.03);
        const panelMat = new THREE.MeshStandardMaterial({
          color: 0xA07850, roughness: 0.5, metalness: 0.05,
          transparent: true, opacity: 0.7
        });
        const panel = new THREE.Mesh(panelGeo, panelMat);
        panel.position.set(wp[0], dH / 2, wp[1]);
        panel.rotation.y = -angle + 0.3; // مفتوح قليلاً
        panel.castShadow = true;
        this._groups.doors.add(panel);
      }
    }

    _buildWindows(floor, H) {
      for (const win of (floor.windows || [])) {
        const wall = (floor.walls || []).find(w => w.id === win.wall_id);
        if (!wall) continue;

        const angle = wallAngle(wall.start, wall.end);
        const wp = ptAlong(wall.start, wall.end, win.position_ratio || 0.5);
        const wW = win.width_m || 1.2;
        const wH = win.height_m || 1.4;
        const sill = win.sill_height_m || 0.9;
        const thick = (wall.thickness_m || 0.2) + 0.02;

        // إطار ألومنيوم
        const frameGeo = new THREE.BoxGeometry(wW + 0.06, wH + 0.06, thick);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0xA0A0A0, roughness: 0.3, metalness: 0.5 });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.set(wp[0], sill + wH / 2, wp[1]);
        frame.rotation.y = -angle;
        this._groups.windows.add(frame);

        // زجاج
        const glassGeo = new THREE.PlaneGeometry(wW - 0.04, wH - 0.04);
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0x87CEEB, roughness: 0.05, metalness: 0.2,
          transparent: true, opacity: 0.35, side: THREE.DoubleSide
        });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(wp[0], sill + wH / 2, wp[1]);
        glass.rotation.y = -angle;
        this._groups.windows.add(glass);
      }
    }

    _buildColumns(floor, H) {
      for (const col of (floor.columns || [])) {
        if (!Array.isArray(col.position)) continue;
        const w = col.width_m || 0.4;
        const d = col.depth_m || w;
        const geo = col.type === 'circular'
          ? new THREE.CylinderGeometry(w / 2, w / 2, H, 16)
          : new THREE.BoxGeometry(w, H, d);
        const mat = new THREE.MeshStandardMaterial({ color: 0xC0B8A8, roughness: 0.4, metalness: 0.1 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(col.position[0], H / 2, col.position[1]);
        mesh.castShadow = true;
        this._groups.columns.add(mesh);
      }
    }

    _buildCeiling(floor, H, bounds) {
      const w = bounds.maxX - bounds.minX + 0.5;
      const d = bounds.maxY - bounds.minY + 0.5;
      const geo = new THREE.PlaneGeometry(w, d, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x6080A0, wireframe: true, transparent: true, opacity: 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set((bounds.minX + bounds.maxX) / 2, H, (bounds.minY + bounds.maxY) / 2);
      this._groups.ceiling.add(mesh);
    }

    _buildLabels(floor, H) {
      for (const room of (floor.rooms || [])) {
        const poly = room.polygon;
        if (!poly || poly.length < 3) continue;
        let cx = 0, cy = 0;
        poly.forEach(p => { cx += p[0]; cy += p[1]; });
        cx /= poly.length; cy /= poly.length;

        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 192;
        const ctx = canvas.getContext('2d');

        // خلفية شفافة داكنة
        ctx.fillStyle = 'rgba(26,26,46,0.8)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 492, 172, 12);
        ctx.fill();

        // اسم عربي
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 46px Arial, Tajawal, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(room.name || '', 256, 65);

        // اسم إنجليزي
        ctx.fillStyle = '#C8961A';
        ctx.font = '30px Arial, sans-serif';
        ctx.fillText(room.name_en || '', 256, 110);

        // مساحة
        ctx.fillStyle = '#8888AA';
        ctx.font = '26px Arial, sans-serif';
        ctx.fillText((room.area_m2 || '?') + ' م²', 256, 155);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(cx, H * 0.5, cy);
        sprite.scale.set(3, 1.2, 1);
        this._groups.labels.add(sprite);
      }
    }

    // ══════════════════════════════════════════════════════════
    // ██ UI — Layer Panel + View Buttons
    // ══════════════════════════════════════════════════════════

    _createLayerPanel() {
      const panel = document.createElement('div');
      panel.style.cssText = `
        position:absolute;top:12px;right:12px;background:rgba(15,15,26,0.92);
        backdrop-filter:blur(10px);border:1px solid #2a2a4a;border-radius:8px;
        padding:12px;min-width:145px;z-index:10;font-family:Tajawal,Arial,sans-serif;
      `;
      panel.innerHTML = '<div style="font-size:11px;font-weight:700;color:#8090a0;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">الطبقات</div>';

      const layers = [
        { key:'floor',   label:'🏗️ الأرضية',  color:'#D4C4A8', on:true },
        { key:'walls',   label:'🧱 الجدران',   color:'#E8DCC8', on:true },
        { key:'ceiling', label:'⬆️ السقف',    color:'#6080A0', on:false },
        { key:'doors',   label:'🚪 الأبواب',   color:'#8B6940', on:true },
        { key:'windows', label:'🪟 الشبابيك', color:'#87CEEB', on:true },
        { key:'columns', label:'🏛️ الأعمدة', color:'#C0B8A8', on:true },
        { key:'labels',  label:'🏷️ الأسماء',  color:'#FFFFFF', on:true },
      ];

      layers.forEach(l => {
        const btn = document.createElement('button');
        btn.style.cssText = `
          display:flex;align-items:center;gap:8px;width:100%;
          padding:6px 8px;margin-bottom:3px;border:none;border-radius:4px;
          background:${l.on ? 'rgba(60,100,160,0.25)' : 'transparent'};
          color:${l.on ? '#e0e0e0' : '#505060'};cursor:pointer;
          font-size:12px;text-align:right;direction:rtl;font-family:inherit;
          transition:all 0.15s;
        `;
        const dot = document.createElement('span');
        dot.style.cssText = `width:10px;height:10px;border-radius:2px;background:${l.on ? l.color : '#333'};border:1px solid #555;flex-shrink:0;`;
        btn.appendChild(dot);
        btn.appendChild(document.createTextNode(l.label));

        btn.addEventListener('click', () => {
          const g = this._groups[l.key];
          if (!g) return;
          g.visible = !g.visible;
          btn.style.background = g.visible ? 'rgba(60,100,160,0.25)' : 'transparent';
          btn.style.color = g.visible ? '#e0e0e0' : '#505060';
          dot.style.background = g.visible ? l.color : '#333';
        });
        panel.appendChild(btn);
      });

      this._container.appendChild(panel);
    }

    _createViewButtons(cx, cz, size) {
      const bar = document.createElement('div');
      bar.style.cssText = `
        position:absolute;top:12px;left:12px;display:flex;gap:6px;z-index:10;
        font-family:Tajawal,Arial,sans-serif;
      `;

      const views = [
        { label: '🎯 منظور', action: () => {
          this._camera.position.set(cx + size*0.8, size*0.9, cz + size*0.8);
          if(this._controls) { this._controls.target.set(cx,0,cz); this._controls.update(); }
        }},
        { label: '⬇️ مسقط', action: () => {
          this._camera.position.set(cx, size*2, cz);
          if(this._controls) { this._controls.target.set(cx,0,cz); this._controls.update(); }
        }},
      ];

      views.forEach(v => {
        const btn = document.createElement('button');
        btn.textContent = v.label;
        btn.style.cssText = `
          padding:6px 14px;font-size:12px;border:1px solid #3a3a5a;border-radius:6px;
          background:#1a1a2e;color:#e0e0e0;cursor:pointer;font-family:inherit;
          transition:background 0.15s;
        `;
        btn.addEventListener('click', v.action);
        btn.addEventListener('mouseenter', () => btn.style.background = '#3060a0');
        btn.addEventListener('mouseleave', () => btn.style.background = '#1a1a2e');
        bar.appendChild(btn);
      });

      this._container.appendChild(bar);
    }

    _createHint() {
      const hint = document.createElement('div');
      hint.style.cssText = `
        position:absolute;bottom:12px;left:12px;background:rgba(15,15,26,0.85);
        border-radius:6px;padding:8px 12px;font-size:11px;color:#6070a0;
        line-height:1.5;z-index:10;font-family:Tajawal,Arial,sans-serif;direction:ltr;
      `;
      hint.innerHTML = '🖱️ Left: Rotate · Right: Pan · Scroll: Zoom<br>📱 Touch: Rotate · Pinch: Zoom';
      this._container.appendChild(hint);
    }

    _createStatsBar(stats, label) {
      const bar = document.createElement('div');
      bar.style.cssText = `
        position:absolute;bottom:12px;right:12px;background:rgba(15,15,26,0.9);
        border:1px solid #2a2a4a;border-radius:6px;padding:8px 14px;z-index:10;
        font-family:Tajawal,Arial,sans-serif;direction:rtl;text-align:right;
      `;
      bar.innerHTML = `
        <div style="font-size:13px;font-weight:700;color:#60a0e0;">${label || 'مجسم ثلاثي الأبعاد'}</div>
        <div style="font-size:11px;color:#8090a0;margin-top:2px;">${stats}</div>
      `;
      this._container.appendChild(bar);
    }

    // ══════════════════════════════════════════════════════════
    // ██ Animation + Helpers
    // ══════════════════════════════════════════════════════════

    _animate() {
      if (this._disposed) return;
      this._animId = requestAnimationFrame(() => this._animate());
      if (this._controls) this._controls.update();
      if (this._renderer && this._scene && this._camera) {
        this._renderer.render(this._scene, this._camera);
      }
    }

    _getBounds() {
      const f = this._schema.floors[0];
      let minX=Infinity, maxX=-Infinity, minY=Infinity, maxY=-Infinity;
      for (const w of (f.walls||[])) {
        if(Array.isArray(w.start)){minX=Math.min(minX,w.start[0]);maxX=Math.max(maxX,w.start[0]);minY=Math.min(minY,w.start[1]);maxY=Math.max(maxY,w.start[1]);}
        if(Array.isArray(w.end)){minX=Math.min(minX,w.end[0]);maxX=Math.max(maxX,w.end[0]);minY=Math.min(minY,w.end[1]);maxY=Math.max(maxY,w.end[1]);}
      }
      for (const r of (f.rooms||[])) {
        for (const p of (r.polygon||[])) {
          if(Array.isArray(p)){minX=Math.min(minX,p[0]);maxX=Math.max(maxX,p[0]);minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);}
        }
      }
      if(!isFinite(minX)){minX=0;maxX=15;minY=0;maxY=12;}
      return {minX,maxX,minY,maxY};
    }

    _repair(schema) {
      if (!schema?.floors?.[0]) throw new Error('JSON Schema غير صالح');
      const f = schema.floors[0];
      f.walls = (f.walls||[]).filter(w => Array.isArray(w.start) && Array.isArray(w.end) && wallLen(w.start,w.end) > 0.05);
      f.doors = Array.isArray(f.doors) ? f.doors : [];
      f.windows = Array.isArray(f.windows) ? f.windows : [];
      f.columns = Array.isArray(f.columns) ? f.columns : [];
      f.rooms = (f.rooms||[]).filter(r => Array.isArray(r.polygon) && r.polygon.length >= 3);

      // Fallback: generate walls from rooms
      if (f.walls.length === 0 && f.rooms.length > 0) {
        const wallMap = new Map();
        let idx = 1;
        for (const room of f.rooms) {
          const poly = room.polygon;
          for (let i = 0; i < poly.length; i++) {
            const s = poly[i], e = poly[(i+1) % poly.length];
            const sk = s[0].toFixed(1)+','+s[1].toFixed(1);
            const ek = e[0].toFixed(1)+','+e[1].toFixed(1);
            const key = sk < ek ? sk+'→'+ek : ek+'→'+sk;
            if (wallMap.has(key)) { wallMap.get(key).is_external = false; wallMap.get(key).thickness_m = 0.15; }
            else {
              const w = {id:'WG'+idx++,start:[s[0],s[1]],end:[e[0],e[1]],height_m:f.height_m||3,thickness_m:0.2,is_external:true};
              wallMap.set(key,w); f.walls.push(w);
            }
          }
        }
      }

      // Fix door/window wall refs
      const wallIds = new Set(f.walls.map(w=>w.id));
      f.doors = f.doors.filter(d => wallIds.has(d.wall_id));
      f.windows = f.windows.filter(w => wallIds.has(w.wall_id));

      // Assign IDs
      f.walls.forEach((w,i) => { if(!w.id) w.id='W'+(i+1); });
      f.doors.forEach((d,i) => { if(!d.id) d.id='D'+(i+1); });
      f.windows.forEach((w,i) => { if(!w.id) w.id='WN'+(i+1); });
      f.rooms.forEach((r,i) => { if(!r.id) r.id='R'+(i+1); });

      return schema;
    }

    dispose() {
      this._disposed = true;
      if (this._animId) cancelAnimationFrame(this._animId);
      if (this._controls) this._controls.dispose();
      if (this._renderer) this._renderer.dispose();
      if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
      if (this._scene) {
        this._scene.traverse(obj => {
          if(obj.geometry) obj.geometry.dispose();
          if(obj.material) {
            if(Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose());
            else obj.material.dispose();
          }
        });
      }
      this._scene = null;
      this._groups = {};
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.ViewerPro = ViewerPro;
  console.info('[QS] ViewerPro v2.0 loaded — محرك بصري موحد');

})();
