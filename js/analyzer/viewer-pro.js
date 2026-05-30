// js/analyzer/viewer-pro.js — QatarSpec Pro v3.0
// ═══════════════════════════════════════════════════════════════
// عارض 3D احترافي تنافسي — محرك بصري موحد
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  const RC = {
    'مجلس':0xE8D8B8,'صالة':0xD8C8A8,'غرفة نوم':0xC8D8E0,
    'غرفة نوم رئيسية':0xB8C8D8,'مطبخ':0xD4C4A0,'حمام':0xA8C8D4,
    'ممر':0xD8D0C8,'مدخل':0xD0C8B8,'شرفة':0xC0D8B8,'مخزن':0xB8B0A0,
    'مكتب':0xC8C8D8,'غرفة اجتماعات':0xC0C8D0,'استقبال':0xD0C8B0,
    'مكتب المدير':0xC8D0D8,'منطقة عمل':0xD0D0C8,'منطقة عمل مفتوحة':0xD0D0C8,
    'قاعة اجتماعات':0xC0C8D4,'سيرفر':0xB0B8C8,'سيرفر + حمام':0xB0B8C8,
    'مطبخ صغير':0xC8C0B0,'غرفة طعام':0xD8D0B8,'مجلس نساء':0xD8C8C8,
    'مرآب':0xA8A8A0,'غرفة خادمة':0xC8C0B0,'مغسلة':0xB0C0C8,
    'default':0xD4C4A8,
  };

  function wLen(s,e){return Math.sqrt((e[0]-s[0])**2+(e[1]-s[1])**2);}
  function wAng(s,e){return Math.atan2(e[1]-s[1],e[0]-s[0]);}
  function ptAt(s,e,r){return[s[0]+(e[0]-s[0])*r,s[1]+(e[1]-s[1])*r];}

  // ── إنشاء texture بلاط إجرائي ─────────────────────────────
  function makeTileTex(color, tileSize) {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');
    const col = '#' + color.toString(16).padStart(6, '0');
    ctx.fillStyle = col;
    ctx.fillRect(0, 0, 128, 128);
    // خطوط بلاط
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1;
    const ts = Math.round(128 / (tileSize || 2));
    for (let i = 0; i <= 128; i += ts) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 128); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(128, i); ctx.stroke();
    }
    // حبيبات خفيفة
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = `rgba(${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},0.015)`;
      ctx.fillRect(Math.random()*128, Math.random()*128, 2, 2);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // ── إنشاء texture جدار ─────────────────────────────────────
  function makeWallTex(isExt) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = isExt ? '#E8DCC8' : '#F0ECE4';
    ctx.fillRect(0, 0, 64, 64);
    // خطوط طوب خفيفة
    if (isExt) {
      ctx.strokeStyle = 'rgba(0,0,0,0.04)';
      ctx.lineWidth = 0.5;
      for (let y = 0; y < 64; y += 8) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(64, y); ctx.stroke();
        const off = (Math.floor(y/8) % 2) * 16;
        for (let x = off; x < 64; x += 32) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y+8); ctx.stroke();
        }
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // ═══════════════════════════════════════════════════════════
  class ViewerPro {
    constructor(containerId) {
      this._container = document.getElementById(containerId);
      if (!this._container) throw new Error('Container not found: ' + containerId);
      this._scene = null; this._camera = null; this._renderer = null;
      this._controls = null; this._animId = null; this._groups = {};
      this._schema = null; this._disposed = false;
      this._raycaster = new THREE.Raycaster();
      this._mouse = new THREE.Vector2();
      this._highlighted = null;
      this._roomMeshes = [];
      this._introAnim = { active: false, t: 0 };
    }

    buildAndRender(schemaJSON) {
      this.dispose();
      this._disposed = false;
      this._schema = this._repair(schemaJSON);

      const c = this._container;
      c.innerHTML = '';
      c.style.position = 'relative';
      c.style.cursor = 'grab';

      const w = c.clientWidth || 800;
      const h = c.clientHeight || 600;

      // Renderer
      const r = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      r.setSize(w, h);
      r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      r.shadowMap.enabled = true;
      r.shadowMap.type = THREE.PCFSoftShadowMap;
      try { r.outputEncoding = THREE.sRGBEncoding; } catch(_){}
      try { r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.2; } catch(_){}
      c.appendChild(r.domElement);
      this._renderer = r;

      // Scene
      this._scene = new THREE.Scene();
      this._scene.background = new THREE.Color(0x0C0C1E);
      this._scene.fog = new THREE.FogExp2(0x0C0C1E, 0.005);

      // Bounds & Camera
      const bounds = this._getBounds();
      const cx = (bounds.minX + bounds.maxX) / 2;
      const cz = (bounds.minY + bounds.maxY) / 2;
      const sz = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, 5);
      const fH = this._schema.floors[0].height_m || 3;

      this._camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 500);
      // بدء من بعيد ثم animate للقرب
      this._camera.position.set(cx + sz * 1.5, fH + sz * 1.0, cz + sz * 1.5);

      if (THREE.OrbitControls) {
        this._controls = new THREE.OrbitControls(this._camera, r.domElement);
        this._controls.target.set(cx, fH * 0.35, cz);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.06;
        this._controls.maxPolarAngle = Math.PI * 0.47;
        this._controls.minDistance = 3;
        this._controls.maxDistance = sz * 4;
        this._controls.update();
      }

      // Intro animation target
      this._introAnim = {
        active: true, t: 0,
        startPos: this._camera.position.clone(),
        endPos: new THREE.Vector3(cx + sz * 0.65, fH + sz * 0.4, cz + sz * 0.85),
      };

      // Lighting
      this._addLighting(cx, cz, sz, fH);

      // Groups
      ['ground','floor','walls','baseboards','doors','windows','columns','ceiling','labels','edges'].forEach(n => {
        this._groups[n] = new THREE.Group();
        this._groups[n].name = n;
        this._scene.add(this._groups[n]);
      });

      const floor = this._schema.floors[0];
      const H = floor.height_m || 3.0;

      this._buildGround(bounds, sz);
      this._buildRoomFloors(floor);
      this._buildWalls(floor, H);
      this._buildBaseboards(floor);
      this._buildDoors(floor, H);
      this._buildWindows(floor, H);
      this._buildColumns(floor, H);
      this._buildCeiling(floor, H, bounds);
      this._buildLabels(floor, H);
      this._buildEdgeLines(floor, H);

      this._groups.ceiling.visible = false;
      this._groups.edges.visible = true;

      // UI
      this._createLayerPanel();
      this._createViewButtons(cx, cz, sz, fH);
      this._createHint();
      this._createStatsBar(floor);

      // Events
      this._setupHover(c);
      this._animate();
      this._resizeHandler = () => {
        const nw = c.clientWidth, nh = c.clientHeight;
        if (nw && nh) { this._camera.aspect = nw / nh; this._camera.updateProjectionMatrix(); this._renderer.setSize(nw, nh); }
      };
      window.addEventListener('resize', this._resizeHandler);
    }

    // ══════════════ LIGHTING ══════════════
    _addLighting(cx, cz, sz, fH) {
      const s = this._scene;
      s.add(new THREE.AmbientLight(0xB8C0D8, 0.45));
      s.add(new THREE.HemisphereLight(0x8AB4F8, 0x806030, 0.35));

      const sun = new THREE.DirectionalLight(0xFFEDD4, 1.1);
      sun.position.set(cx + sz * 0.8, sz * 1.2 + fH, cz - sz * 0.3);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      const ext = sz * 1.2;
      sun.shadow.camera.left = -ext; sun.shadow.camera.right = ext;
      sun.shadow.camera.top = ext; sun.shadow.camera.bottom = -ext;
      sun.shadow.camera.near = 0.5; sun.shadow.camera.far = sz * 5;
      sun.shadow.bias = -0.0008;
      sun.shadow.normalBias = 0.02;
      s.add(sun);

      // إضاءة خلفية باردة
      const back = new THREE.DirectionalLight(0x4070B0, 0.3);
      back.position.set(cx - sz, fH * 2, cz + sz);
      s.add(back);

      // نقاط إضاءة داخلية دافئة
      const ptLight = new THREE.PointLight(0xFFE0B0, 0.15, sz * 2);
      ptLight.position.set(cx, fH * 0.7, cz);
      s.add(ptLight);
    }

    // ══════════════ BUILD ══════════════
    _buildGround(bounds, sz) {
      const gs = sz * 5;
      // أرضية متدرجة
      const geo = new THREE.PlaneGeometry(gs, gs, 1, 1);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1A1A30, roughness: 0.95, metalness: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2; mesh.position.y = -0.02;
      mesh.receiveShadow = true;
      this._groups.ground.add(mesh);

      const grid = new THREE.GridHelper(gs, Math.floor(gs), 0x252540, 0x1E1E35);
      grid.position.y = -0.01;
      grid.material.opacity = 0.5; grid.material.transparent = true;
      this._groups.ground.add(grid);
    }

    _buildRoomFloors(floor) {
      this._roomMeshes = [];
      for (const room of (floor.rooms || [])) {
        const poly = room.polygon;
        if (!poly || poly.length < 3) continue;

        const shape = new THREE.Shape();
        shape.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) shape.lineTo(poly[i][0], poly[i][1]);
        shape.closePath();

        const color = RC[room.name] || RC['default'];
        const tex = makeTileTex(color, 3);
        const w = Math.max(...poly.map(p=>p[0])) - Math.min(...poly.map(p=>p[0]));
        const d = Math.max(...poly.map(p=>p[1])) - Math.min(...poly.map(p=>p[1]));
        tex.repeat.set(w / 2, d / 2);

        const geo = new THREE.ShapeGeometry(shape);
        const mat = new THREE.MeshStandardMaterial({
          map: tex, roughness: 0.5, metalness: 0.03, side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.003;
        mesh.receiveShadow = true;
        mesh.userData = { roomId: room.id, roomName: room.name, area: room.area_m2 };
        this._groups.floor.add(mesh);
        this._roomMeshes.push(mesh);
      }
    }

    _buildWalls(floor, H) {
      for (const wall of (floor.walls || [])) {
        if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) continue;
        const len = wLen(wall.start, wall.end);
        if (len < 0.05) continue;

        const angle = wAng(wall.start, wall.end);
        const thick = wall.thickness_m || 0.2;
        const h = wall.height_m || H;
        const isExt = wall.is_external !== false;

        const tex = makeWallTex(isExt);
        tex.repeat.set(len / 2, h / 2);

        const geo = new THREE.BoxGeometry(len, h, thick);
        const mat = new THREE.MeshStandardMaterial({
          map: tex, roughness: 0.7, metalness: 0.02,
          color: isExt ? 0xF0E8D8 : 0xF8F4EE,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (wall.start[0] + wall.end[0]) / 2, h / 2,
          (wall.start[1] + wall.end[1]) / 2
        );
        mesh.rotation.y = -angle;
        mesh.castShadow = true; mesh.receiveShadow = true;
        this._groups.walls.add(mesh);
      }
    }

    _buildBaseboards(floor) {
      const bH = 0.08, bD = 0.01;
      const mat = new THREE.MeshStandardMaterial({ color: 0x3A3020, roughness: 0.6 });
      for (const wall of (floor.walls || [])) {
        if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) continue;
        const len = wLen(wall.start, wall.end);
        if (len < 0.1) continue;
        const angle = wAng(wall.start, wall.end);
        const thick = (wall.thickness_m || 0.2) + bD;

        const geo = new THREE.BoxGeometry(len, bH, thick);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (wall.start[0]+wall.end[0])/2, bH/2,
          (wall.start[1]+wall.end[1])/2
        );
        mesh.rotation.y = -angle;
        this._groups.baseboards.add(mesh);
      }
    }

    _buildDoors(floor, H) {
      for (const door of (floor.doors || [])) {
        const wall = (floor.walls || []).find(w => w.id === door.wall_id);
        if (!wall) continue;
        const angle = wAng(wall.start, wall.end);
        const wp = ptAt(wall.start, wall.end, door.position_ratio || 0.5);
        const dW = door.width_m || 0.9;
        const dH = door.height_m || 2.1;
        const thick = (wall.thickness_m || 0.2) + 0.02;

        // إطار خشبي
        const fMat = new THREE.MeshStandardMaterial({ color: 0x6B4420, roughness: 0.45, metalness: 0.05 });

        // عارضة علوية
        const tG = new THREE.BoxGeometry(dW + 0.1, 0.08, thick + 0.02);
        const tM = new THREE.Mesh(tG, fMat);
        tM.position.set(wp[0], dH + 0.04, wp[1]);
        tM.rotation.y = -angle; tM.castShadow = true;
        this._groups.doors.add(tM);

        // أعمدة جانبية
        const sG = new THREE.BoxGeometry(0.05, dH, thick + 0.02);
        [-1, 1].forEach(sign => {
          const m = new THREE.Mesh(sG, fMat);
          m.position.set(
            wp[0] + Math.cos(angle) * sign * (dW / 2 + 0.025),
            dH / 2, wp[1] + Math.sin(angle) * sign * (dW / 2 + 0.025)
          );
          m.rotation.y = -angle; m.castShadow = true;
          this._groups.doors.add(m);
        });

        // ورقة الباب
        const pG = new THREE.BoxGeometry(dW * 0.9, dH - 0.06, 0.035);
        const pMat = new THREE.MeshStandardMaterial({
          color: 0x9B6830, roughness: 0.45, metalness: 0.08,
          transparent: true, opacity: 0.8
        });
        const panel = new THREE.Mesh(pG, pMat);
        panel.position.set(wp[0], dH / 2, wp[1]);
        panel.rotation.y = -angle + 0.35;
        panel.castShadow = true;
        this._groups.doors.add(panel);

        // مقبض الباب
        const hG = new THREE.SphereGeometry(0.03, 8, 8);
        const hMat = new THREE.MeshStandardMaterial({ color: 0xC0A060, roughness: 0.2, metalness: 0.8 });
        const handle = new THREE.Mesh(hG, hMat);
        handle.position.set(
          wp[0] + Math.cos(-angle + 0.35) * dW * 0.35,
          dH * 0.45,
          wp[1] - Math.sin(-angle + 0.35) * dW * 0.35
        );
        this._groups.doors.add(handle);
      }
    }

    _buildWindows(floor, H) {
      for (const win of (floor.windows || [])) {
        const wall = (floor.walls || []).find(w => w.id === win.wall_id);
        if (!wall) continue;
        const angle = wAng(wall.start, wall.end);
        const wp = ptAt(wall.start, wall.end, win.position_ratio || 0.5);
        const wW = win.width_m || 1.2, wH = win.height_m || 1.4;
        const sill = win.sill_height_m || 0.9;
        const thick = (wall.thickness_m || 0.2) + 0.02;

        // إطار ألومنيوم
        const fMat = new THREE.MeshStandardMaterial({ color: 0x909090, roughness: 0.25, metalness: 0.6 });
        const fG = new THREE.BoxGeometry(wW + 0.06, wH + 0.06, thick);
        const frame = new THREE.Mesh(fG, fMat);
        frame.position.set(wp[0], sill + wH / 2, wp[1]);
        frame.rotation.y = -angle;
        this._groups.windows.add(frame);

        // صليب النافذة (mullion)
        const mMat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.3, metalness: 0.5 });
        // أفقي
        const mhG = new THREE.BoxGeometry(wW - 0.04, 0.025, thick * 0.3);
        const mh = new THREE.Mesh(mhG, mMat);
        mh.position.set(wp[0], sill + wH / 2, wp[1]);
        mh.rotation.y = -angle;
        this._groups.windows.add(mh);
        // عمودي
        const mvG = new THREE.BoxGeometry(0.025, wH - 0.04, thick * 0.3);
        const mv = new THREE.Mesh(mvG, mMat);
        mv.position.set(wp[0], sill + wH / 2, wp[1]);
        mv.rotation.y = -angle;
        this._groups.windows.add(mv);

        // زجاج
        const gG = new THREE.PlaneGeometry(wW - 0.06, wH - 0.06);
        const gMat = new THREE.MeshPhysicalMaterial({
          color: 0x88C8F0, roughness: 0.02, metalness: 0.1,
          transparent: true, opacity: 0.3,
          side: THREE.DoubleSide, envMapIntensity: 0.5
        });
        const glass = new THREE.Mesh(gG, gMat);
        glass.position.set(wp[0], sill + wH / 2, wp[1]);
        glass.rotation.y = -angle;
        this._groups.windows.add(glass);

        // حافة النافذة (sill)
        const slG = new THREE.BoxGeometry(wW + 0.12, 0.03, thick + 0.08);
        const slMat = new THREE.MeshStandardMaterial({ color: 0xC8C0B0, roughness: 0.5 });
        const sillM = new THREE.Mesh(slG, slMat);
        sillM.position.set(wp[0], sill - 0.015, wp[1]);
        sillM.rotation.y = -angle; sillM.castShadow = true;
        this._groups.windows.add(sillM);
      }
    }

    _buildColumns(floor, H) {
      for (const col of (floor.columns || [])) {
        if (!Array.isArray(col.position)) continue;
        const w = col.width_m || 0.4, d = col.depth_m || w;
        const geo = col.type === 'circular'
          ? new THREE.CylinderGeometry(w/2, w/2, H, 16)
          : new THREE.BoxGeometry(w, H, d);
        const mat = new THREE.MeshStandardMaterial({ color: 0xC0B8A8, roughness: 0.5, metalness: 0.05 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(col.position[0], H / 2, col.position[1]);
        mesh.castShadow = true; mesh.receiveShadow = true;
        this._groups.columns.add(mesh);
      }
    }

    _buildCeiling(floor, H, bounds) {
      const w = bounds.maxX - bounds.minX + 0.5;
      const d = bounds.maxY - bounds.minY + 0.5;
      const geo = new THREE.PlaneGeometry(w, d, 10, 10);
      const mat = new THREE.MeshBasicMaterial({ color: 0x5070A0, wireframe: true, transparent: true, opacity: 0.25 });
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
        canvas.width = 512; canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // خلفية مع ظل
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(12,12,30,0.85)';
        ctx.beginPath();
        ctx.roundRect(16, 8, 480, 184, 14);
        ctx.fill();
        ctx.shadowBlur = 0;

        // حافة ذهبية
        ctx.strokeStyle = 'rgba(200,150,26,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(16, 8, 480, 184, 14);
        ctx.stroke();

        // اسم عربي
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 44px Tajawal, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(room.name || '', 256, 62);

        // اسم إنجليزي
        ctx.fillStyle = '#C8961A';
        ctx.font = '28px Arial, sans-serif';
        ctx.fillText(room.name_en || '', 256, 108);

        // مساحة مع أيقونة
        ctx.fillStyle = '#7888A8';
        ctx.font = '24px Arial, sans-serif';
        ctx.fillText('📐 ' + (room.area_m2 || '?') + ' م²', 256, 155);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(cx, H * 0.55, cy);
        sprite.scale.set(3.2, 1.25, 1);
        this._groups.labels.add(sprite);
      }
    }

    _buildEdgeLines(floor, H) {
      const lineMat = new THREE.LineBasicMaterial({ color: 0x404060, transparent: true, opacity: 0.35 });
      for (const wall of (floor.walls || [])) {
        if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) continue;
        const s = wall.start, e = wall.end;
        // خط أسفل
        const pts = [new THREE.Vector3(s[0],0.01,s[1]), new THREE.Vector3(e[0],0.01,e[1])];
        this._groups.edges.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
        // خط أعلى
        const ptsT = [new THREE.Vector3(s[0],H,s[1]), new THREE.Vector3(e[0],H,e[1])];
        this._groups.edges.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsT), lineMat));
        // خطوط عمودية
        [s, e].forEach(p => {
          const ptsV = [new THREE.Vector3(p[0],0.01,p[1]), new THREE.Vector3(p[0],H,p[1])];
          this._groups.edges.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsV), lineMat));
        });
      }
    }

    // ══════════════ HOVER ══════════════
    _setupHover(container) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        this._mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this._mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      });
    }

    _updateHover() {
      if (!this._roomMeshes.length) return;
      this._raycaster.setFromCamera(this._mouse, this._camera);
      const hits = this._raycaster.intersectObjects(this._roomMeshes);
      // إعادة اللون السابق
      if (this._highlighted) {
        this._highlighted.material.emissive.setHex(0x000000);
        this._highlighted = null;
      }
      if (hits.length > 0) {
        const mesh = hits[0].object;
        mesh.material.emissive.setHex(0x222244);
        this._highlighted = mesh;
        this._container.style.cursor = 'pointer';
      } else {
        this._container.style.cursor = 'grab';
      }
    }

    // ══════════════ UI ══════════════
    _createLayerPanel() {
      const p = document.createElement('div');
      p.style.cssText = 'position:absolute;top:12px;right:12px;background:rgba(10,10,26,0.93);backdrop-filter:blur(12px);border:1px solid rgba(100,130,200,0.15);border-radius:10px;padding:14px;min-width:150px;z-index:10;font-family:Tajawal,Arial,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
      p.innerHTML = '<div style="font-size:11px;font-weight:700;color:#6080B0;margin-bottom:10px;letter-spacing:1.5px;">الطبقات</div>';

      const layers = [
        {key:'floor',label:'🏗️ الأرضية',color:'#D4C4A8',on:true},
        {key:'walls',label:'🧱 الجدران',color:'#E8DCC8',on:true},
        {key:'ceiling',label:'⬆️ السقف',color:'#5070A0',on:false},
        {key:'doors',label:'🚪 الأبواب',color:'#9B6830',on:true},
        {key:'windows',label:'🪟 الشبابيك',color:'#88C8F0',on:true},
        {key:'columns',label:'🏛️ الأعمدة',color:'#C0B8A8',on:true},
        {key:'labels',label:'🏷️ الأسماء',color:'#FFFFFF',on:true},
        {key:'edges',label:'📐 الحواف',color:'#404060',on:true},
        {key:'baseboards',label:'▬ القواعد',color:'#3A3020',on:true},
      ];

      layers.forEach(l => {
        const btn = document.createElement('button');
        btn.style.cssText = `display:flex;align-items:center;gap:8px;width:100%;padding:7px 10px;margin-bottom:4px;border:none;border-radius:6px;background:${l.on?'rgba(60,100,180,0.2)':'rgba(30,30,50,0.3)'};color:${l.on?'#d0d8e8':'#404060'};cursor:pointer;font-size:12px;text-align:right;direction:rtl;font-family:inherit;transition:all .2s;`;
        const dot = document.createElement('span');
        dot.style.cssText = `width:10px;height:10px;border-radius:3px;background:${l.on?l.color:'#252535'};border:1px solid rgba(255,255,255,0.1);flex-shrink:0;transition:all .2s;`;
        btn.appendChild(dot);
        btn.appendChild(document.createTextNode(l.label));
        btn.onmouseenter = () => { if(this._groups[l.key]?.visible) btn.style.background='rgba(60,100,180,0.35)'; };
        btn.onmouseleave = () => { btn.style.background = this._groups[l.key]?.visible ? 'rgba(60,100,180,0.2)' : 'rgba(30,30,50,0.3)'; };
        btn.onclick = () => {
          const g = this._groups[l.key]; if(!g) return;
          g.visible = !g.visible;
          btn.style.background = g.visible ? 'rgba(60,100,180,0.2)' : 'rgba(30,30,50,0.3)';
          btn.style.color = g.visible ? '#d0d8e8' : '#404060';
          dot.style.background = g.visible ? l.color : '#252535';
        };
        p.appendChild(btn);
      });
      this._container.appendChild(p);
    }

    _createViewButtons(cx, cz, sz, fH) {
      const bar = document.createElement('div');
      bar.style.cssText = 'position:absolute;top:12px;left:12px;display:flex;gap:6px;z-index:10;font-family:Tajawal,Arial,sans-serif;';
      [{label:'🎯 منظور',fn:()=>{
        this._camera.position.set(cx+sz*0.65,fH+sz*0.4,cz+sz*0.85);
        if(this._controls){this._controls.target.set(cx,fH*0.35,cz);this._controls.update();}
      }},{label:'⬇️ مسقط',fn:()=>{
        this._camera.position.set(cx,sz*2.5,cz+0.01);
        if(this._controls){this._controls.target.set(cx,0,cz);this._controls.update();}
      }}].forEach(v => {
        const b = document.createElement('button');
        b.textContent = v.label;
        b.style.cssText = 'padding:7px 16px;font-size:12px;border:1px solid rgba(100,130,200,0.2);border-radius:8px;background:rgba(10,10,26,0.9);color:#c0c8e0;cursor:pointer;font-family:inherit;transition:all .2s;backdrop-filter:blur(8px);box-shadow:0 4px 16px rgba(0,0,0,0.3);';
        b.onmouseenter=()=>b.style.background='rgba(48,96,160,0.6)';
        b.onmouseleave=()=>b.style.background='rgba(10,10,26,0.9)';
        b.onclick = v.fn;
        bar.appendChild(b);
      });
      this._container.appendChild(bar);
    }

    _createHint() {
      const h = document.createElement('div');
      h.style.cssText = 'position:absolute;bottom:12px;left:12px;background:rgba(10,10,26,0.88);border:1px solid rgba(100,130,200,0.1);border-radius:8px;padding:8px 14px;font-size:11px;color:#5060A0;line-height:1.6;z-index:10;font-family:monospace;direction:ltr;backdrop-filter:blur(8px);';
      h.innerHTML = '🖱️ Left: Rotate · Right: Pan · Scroll: Zoom<br>📱 Touch: Rotate · Pinch: Zoom';
      this._container.appendChild(h);
    }

    _createStatsBar(floor) {
      const rooms = (floor.rooms||[]).length;
      const walls = (floor.walls||[]).length;
      const doors = (floor.doors||[]).length;
      const wins = (floor.windows||[]).length;
      const b = document.createElement('div');
      b.style.cssText = 'position:absolute;bottom:12px;right:12px;background:rgba(10,10,26,0.92);border:1px solid rgba(200,150,26,0.2);border-radius:10px;padding:10px 16px;z-index:10;font-family:Tajawal,Arial,sans-serif;direction:rtl;text-align:right;backdrop-filter:blur(8px);box-shadow:0 4px 20px rgba(0,0,0,0.3);';
      b.innerHTML = `
        <div style="font-size:14px;font-weight:700;color:#C8961A;margin-bottom:3px;">${floor.label||'مجسم ثلاثي الأبعاد'}</div>
        <div style="font-size:11px;color:#6878A0;display:flex;gap:12px;flex-wrap:wrap;">
          <span>🏠 ${rooms} غرفة</span><span>🧱 ${walls} جدار</span>
          <span>🚪 ${doors} باب</span><span>🪟 ${wins} شباك</span>
        </div>`;
      this._container.appendChild(b);
    }

    // ══════════════ ANIMATION ══════════════
    _animate() {
      if (this._disposed) return;
      this._animId = requestAnimationFrame(() => this._animate());

      // Intro camera animation
      if (this._introAnim.active) {
        this._introAnim.t += 0.012;
        const t = Math.min(this._introAnim.t, 1);
        const ease = t < 0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
        this._camera.position.lerpVectors(this._introAnim.startPos, this._introAnim.endPos, ease);
        if (t >= 1) this._introAnim.active = false;
      }

      if (this._controls) this._controls.update();
      this._updateHover();
      if (this._renderer && this._scene && this._camera) {
        this._renderer.render(this._scene, this._camera);
      }
    }

    // ══════════════ HELPERS ══════════════
    _getBounds() {
      const f = this._schema.floors[0];
      let mnX=Infinity,mxX=-Infinity,mnY=Infinity,mxY=-Infinity;
      for(const w of(f.walls||[])){if(Array.isArray(w.start)){mnX=Math.min(mnX,w.start[0]);mxX=Math.max(mxX,w.start[0]);mnY=Math.min(mnY,w.start[1]);mxY=Math.max(mxY,w.start[1]);}if(Array.isArray(w.end)){mnX=Math.min(mnX,w.end[0]);mxX=Math.max(mxX,w.end[0]);mnY=Math.min(mnY,w.end[1]);mxY=Math.max(mxY,w.end[1]);}}
      for(const r of(f.rooms||[])){for(const p of(r.polygon||[])){if(Array.isArray(p)){mnX=Math.min(mnX,p[0]);mxX=Math.max(mxX,p[0]);mnY=Math.min(mnY,p[1]);mxY=Math.max(mxY,p[1]);}}}
      if(!isFinite(mnX)){mnX=0;mxX=15;mnY=0;mxY=12;}
      return{minX:mnX,maxX:mxX,minY:mnY,maxY:mxY};
    }

    _repair(schema) {
      if(!schema?.floors?.[0]) throw new Error('JSON Schema غير صالح');
      const f = schema.floors[0];
      f.walls=(f.walls||[]).filter(w=>Array.isArray(w.start)&&Array.isArray(w.end)&&wLen(w.start,w.end)>0.05);
      f.doors=Array.isArray(f.doors)?f.doors:[];
      f.windows=Array.isArray(f.windows)?f.windows:[];
      f.columns=Array.isArray(f.columns)?f.columns:[];
      f.rooms=(f.rooms||[]).filter(r=>Array.isArray(r.polygon)&&r.polygon.length>=3);
      if(f.walls.length===0&&f.rooms.length>0){
        const wm=new Map();let idx=1;
        for(const room of f.rooms){const poly=room.polygon;for(let i=0;i<poly.length;i++){
          const s=poly[i],e=poly[(i+1)%poly.length];
          const sk=s[0].toFixed(1)+','+s[1].toFixed(1),ek=e[0].toFixed(1)+','+e[1].toFixed(1);
          const key=sk<ek?sk+'→'+ek:ek+'→'+sk;
          if(wm.has(key)){wm.get(key).is_external=false;wm.get(key).thickness_m=0.15;}
          else{const w={id:'WG'+idx++,start:[s[0],s[1]],end:[e[0],e[1]],height_m:f.height_m||3,thickness_m:0.2,is_external:true};wm.set(key,w);f.walls.push(w);}
        }}
      }
      const wIds=new Set(f.walls.map(w=>w.id));
      f.doors=f.doors.filter(d=>wIds.has(d.wall_id));
      f.windows=f.windows.filter(w=>wIds.has(w.wall_id));
      f.walls.forEach((w,i)=>{if(!w.id)w.id='W'+(i+1);});
      f.doors.forEach((d,i)=>{if(!d.id)d.id='D'+(i+1);});
      f.windows.forEach((w,i)=>{if(!w.id)w.id='WN'+(i+1);});
      f.rooms.forEach((r,i)=>{if(!r.id)r.id='R'+(i+1);});
      return schema;
    }

    dispose() {
      this._disposed = true;
      if(this._animId) cancelAnimationFrame(this._animId);
      if(this._controls) this._controls.dispose();
      if(this._renderer) this._renderer.dispose();
      if(this._resizeHandler) window.removeEventListener('resize',this._resizeHandler);
      if(this._scene){this._scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});}
      this._scene=null;this._groups={};this._roomMeshes=[];
    }
  }

  window.QS.ViewerPro = ViewerPro;
  console.info('[QS] ViewerPro v3.0 — competitive 3D engine');
})();
