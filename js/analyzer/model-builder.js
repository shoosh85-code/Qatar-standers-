// js/analyzer/model-builder.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// مولّد مجسم ثلاثي الأبعاد من JSON Schema
// يستقبل ناتج FloorplanAnalyzer → يبني مشهد Three.js كامل
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── ألوان معمارية واقعية — QatarSpec Architectural Theme ────
  const COLORS = {
    // جدران — حجر رملي قطري دافئ
    extWall:     0xD4B896, // حجر رملي خارجي
    extWallDark: 0xBFA07A, // حجر رملي داكن (ظل)
    intWall:     0xF2EBE0, // جبس داخلي أبيض دافئ
    intWallDark: 0xE0D5C5, // جبس داكن قليلاً

    // أرضيات
    floor:       0xC8B89A, // بورسلان بيج
    floorTile1:  0xD4C4A8, // بلاطة فاتحة
    floorTile2:  0xB8A890, // بلاطة داكنة

    // سقف
    ceiling:     0xF0EDE8, // أبيض كريمي
    ceilingCornice: 0xE8E0D0, // كرنيش

    // أبواب — خشب دافئ
    door:        0x8B6B45, // خشب داكن
    doorLeaf:    0x7A5C3A, // لوح الباب
    doorFrame:   0x6B4E2A, // إطار خشبي

    // نوافذ — ألومنيوم حديث
    glass:       0x9EC5D8, // زجاج معتدل
    glassDark:   0x6B9FB8, // زجاج داكن
    windowFrame: 0x8C8C8C, // ألومنيوم رمادي
    windowSill:  0xC8C0B0, // حافة نافذة حجرية

    // أعمدة وهيكل
    column:      0xD0C8B8, // خرسانة فاتحة
    beam:        0xB8B0A0, // عتبة خرسانية

    // خارجي
    ground:      0x8B7355, // تراب/رمل قطري
    groundPath:  0xAA9878, // ممشى
    sky:         0x87AABF, // سماء نهارية

    // UI
    label:       0xFFFFFF,
    dimLine:     0xFF6B35,
    highlight:   0xFFD700,
    passGreen:   0x22C55E,
    failRed:     0xEF4444,
    warnOrange:  0xF59E0B,
    roofColor:   0xC4956A, // سطح مائل طيني
    roofEdge:    0xA07850, // حافة سطح
    parapet:     0xD4B896, // برجوله/حاجز سطح
  };

  // ── مساعدات ────────────────────────────────────────────────

  /** طول جدار بين نقطتين */
  function wallLength(start, end) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** زاوية الجدار (radians) */
  function wallAngle(start, end) {
    return Math.atan2(end[1] - start[1], end[0] - start[0]);
  }

  /** مركز بين نقطتين */
  function midpoint(start, end) {
    return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
  }

  /** إنشاء material احترافي */
  function mat(color, opts = {}) {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: opts.roughness !== undefined ? opts.roughness : 0.72,
      metalness: opts.metalness !== undefined ? opts.metalness : 0.04,
      transparent: !!opts.transparent || (opts.opacity !== undefined && opts.opacity < 1),
      opacity: opts.opacity !== undefined ? opts.opacity : 1,
      side: opts.side || THREE.FrontSide,
      envMapIntensity: opts.envMapIntensity !== undefined ? opts.envMapIntensity : 0.3,
    });
    return m;
  }

  /** material جدار خارجي — حجر رملي مع تفاصيل */
  function wallMatExt() {
    return new THREE.MeshStandardMaterial({
      color: COLORS.extWall,
      roughness: 0.82,
      metalness: 0.02,
      bumpScale: 0.3,
    });
  }

  /** material جدار داخلي — جبس أبيض */
  function wallMatInt() {
    return new THREE.MeshStandardMaterial({
      color: COLORS.intWall,
      roughness: 0.65,
      metalness: 0.0,
    });
  }

  /** material زجاج نافذة — شبه شفاف واقعي */
  function glassMat() {
    return new THREE.MeshPhysicalMaterial({
      color: COLORS.glass,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      reflectivity: 0.8,
    });
  }

  // ═══════════════════════════════════════════════════════════
  // ██ ModelBuilder Class
  // ═══════════════════════════════════════════════════════════

  class ModelBuilder {
    constructor(containerId) {
      this._containerId = containerId;
      this._scene = null;
      this._groups = {
        walls: null, doors: null, windows: null,
        columns: null, floor: null, ceiling: null,
        labels: null, dimensions: null, ground: null,
      };
      this._meshMap = {};        // id → mesh (للتمييز)
      this._roomCenters = {};    // roomId → {x,y,z}
      this._ceilingVisible = false;
      this._labelsVisible = true;
      this._dimensionsVisible = true;
    }

    /** بناء المشهد كاملاً من JSON Schema */
    buildFromJSON(schemaJSON) {
      if (!schemaJSON?.floors?.[0]) {
        throw new Error('JSON Schema غير صالح — floors مفقود');
      }

      // ═══ إصلاح تلقائي للبيانات ═══
      this._autoRepairSchema(schemaJSON);

      // مشهد جديد
      this._scene = new THREE.Scene();
      this._scene.background = new THREE.Color(COLORS.sky);
      // gradient sky simulation
      const skyGeo = new THREE.SphereGeometry(200, 32, 32);
      const skyMat = new THREE.MeshBasicMaterial({
        color: 0x87AABF, side: THREE.BackSide,
      });
      const skySphere = new THREE.Mesh(skyGeo, skyMat);
      this._scene.add(skySphere);

      // مجموعات
      for (const key of Object.keys(this._groups)) {
        this._groups[key] = new THREE.Group();
        this._groups[key].name = key;
        this._scene.add(this._groups[key]);
      }

      // إضاءة
      this._addLighting();

      const floor = schemaJSON.floors[0];
      const h = floor.height_m || 3.0;

      // ═══ FALLBACK: توليد جدران من الغرف إذا لم تُحدد ═══
      if ((!floor.walls || floor.walls.length === 0) && floor.rooms && floor.rooms.length > 0) {
        console.info('[ModelBuilder] لا جدران — توليد تلقائي من الغرف');
        floor.walls = this._generateWallsFromRooms(floor.rooms, h);
      }

      // ── بناء العناصر ──
      this._buildRoomFloors(floor);  // أرضيات ملونة لكل غرفة
      this._buildFloor(floor);
      this._buildCeiling(floor, h);
      this._buildWalls(floor, h);
      this._buildDoors(floor, h);
      this._buildWindows(floor, h);
      this._buildColumns(floor, h);
      this._buildRoomLabels(floor, h);
      this._buildDimensionLines(floor, schemaJSON.dimensions);
      this._buildGround(schemaJSON.dimensions);

      // السقف مخفي افتراضياً
      this._groups.ceiling.visible = this._ceilingVisible;

      // ═══ إحصائيات للتصحيح ═══
      const stats = {
        walls: (floor.walls || []).length,
        doors: (floor.doors || []).length,
        windows: (floor.windows || []).length,
        rooms: (floor.rooms || []).length,
        columns: (floor.columns || []).length,
      };
      console.info('[ModelBuilder] بناء مكتمل:', stats);

      return this._scene;
    }

    // ═══════════════════════════════════════════════════════════
    // ██ إصلاح تلقائي — يُصلح المشاكل الشائعة من Gemini
    // ═══════════════════════════════════════════════════════════

    _autoRepairSchema(schema) {
      for (const floor of (schema.floors || [])) {
        // إصلاح الجدران
        floor.walls = (floor.walls || []).filter(w => {
          if (!Array.isArray(w.start) || !Array.isArray(w.end)) return false;
          if (w.start.some(v => isNaN(v)) || w.end.some(v => isNaN(v))) return false;
          if (wallLength(w.start, w.end) < 0.05) return false;
          return true;
        });

        // إصلاح الأبواب — حذف التي wall_id غير موجود
        const wallIds = new Set((floor.walls || []).map(w => w.id));
        floor.doors = (floor.doors || []).filter(d => wallIds.has(d.wall_id));
        floor.windows = (floor.windows || []).filter(w => wallIds.has(w.wall_id));

        // إصلاح الغرف — polygon يجب >= 3 نقاط
        floor.rooms = (floor.rooms || []).filter(r =>
          Array.isArray(r.polygon) && r.polygon.length >= 3 &&
          r.polygon.every(p => Array.isArray(p) && p.length >= 2 && !isNaN(p[0]) && !isNaN(p[1]))
        );

        // إصلاح الأعمدة
        floor.columns = (floor.columns || []).filter(c =>
          Array.isArray(c.position) && c.position.length >= 2 &&
          !isNaN(c.position[0]) && !isNaN(c.position[1])
        );

        // إعطاء IDs إذا مفقودة
        floor.walls.forEach((w, i) => { if (!w.id) w.id = 'W' + (i + 1); });
        floor.doors.forEach((d, i) => { if (!d.id) d.id = 'D' + (i + 1); });
        floor.windows.forEach((w, i) => { if (!w.id) w.id = 'WN' + (i + 1); });
        floor.rooms.forEach((r, i) => { if (!r.id) r.id = 'R' + (i + 1); });
        floor.columns.forEach((c, i) => { if (!c.id) c.id = 'C' + (i + 1); });
      }

      // إصلاح dimensions
      if (!schema.dimensions) {
        const f = schema.floors[0];
        const b = this._calcBoundsFromAll(f);
        schema.dimensions = {
          total_width_m: b.maxX - b.minX,
          total_depth_m: b.maxY - b.minY,
          total_area_m2: (b.maxX - b.minX) * (b.maxY - b.minY),
          unit: 'm'
        };
      }
    }

    // ═══════════════════════════════════════════════════════════
    // ██ FALLBACK: توليد جدران من حدود الغرف
    // ═══════════════════════════════════════════════════════════

    _generateWallsFromRooms(rooms, height) {
      const wallMap = new Map(); // منع التكرار
      const walls = [];
      let wIdx = 1;

      for (const room of rooms) {
        const poly = room.polygon;
        if (!poly || poly.length < 3) continue;

        for (let i = 0; i < poly.length; i++) {
          const start = poly[i];
          const end = poly[(i + 1) % poly.length];

          // مفتاح فريد (مُرتّب لمنع التكرار)
          const key = this._wallKey(start, end);
          if (wallMap.has(key)) {
            // جدار مشترك = داخلي
            const existing = wallMap.get(key);
            existing.is_external = false;
            existing.thickness_m = 0.15;
            continue;
          }

          const wall = {
            id: 'WG' + wIdx++,
            start: [start[0], start[1]],
            end: [end[0], end[1]],
            height_m: height,
            thickness_m: 0.2,
            material: 'block',
            is_external: true, // افتراض خارجي حتى يثبت العكس
          };
          wallMap.set(key, wall);
          walls.push(wall);
        }
      }

      console.info('[ModelBuilder] تم توليد', walls.length, 'جدار من', rooms.length, 'غرفة');
      return walls;
    }

    /** مفتاح فريد لجدار (مرتب) */
    _wallKey(a, b) {
      const ax = a[0].toFixed(2), ay = a[1].toFixed(2);
      const bx = b[0].toFixed(2), by = b[1].toFixed(2);
      return ax + ',' + ay < bx + ',' + by
        ? ax + ',' + ay + '→' + bx + ',' + by
        : bx + ',' + by + '→' + ax + ',' + ay;
    }

    /** حساب حدود من كل العناصر (جدران + غرف) */
    _calcBoundsFromAll(floor) {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const w of (floor.walls || [])) {
        if (Array.isArray(w.start)) { minX = Math.min(minX, w.start[0]); maxX = Math.max(maxX, w.start[0]); minY = Math.min(minY, w.start[1]); maxY = Math.max(maxY, w.start[1]); }
        if (Array.isArray(w.end))   { minX = Math.min(minX, w.end[0]); maxX = Math.max(maxX, w.end[0]); minY = Math.min(minY, w.end[1]); maxY = Math.max(maxY, w.end[1]); }
      }
      for (const r of (floor.rooms || [])) {
        for (const p of (r.polygon || [])) {
          minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
          minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
        }
      }
      if (!isFinite(minX)) { minX = 0; maxX = 10; minY = 0; maxY = 10; }
      return { minX, maxX, minY, maxY };
    }

    // ═══════════════════════════════════════════════════════════
    // ██ أرضيات ملونة لكل غرفة (حسب النوع)
    // ═══════════════════════════════════════════════════════════

    _buildRoomFloors(floor) {
      // ألوان حسب نوع الغرفة
      const typeColors = {
        'مجلس': 0xE8D8B8, 'صالة': 0xD8C8A8, 'غرفة نوم': 0xC8D8E0, 'غرفة نوم رئيسية': 0xB8C8D8,
        'مطبخ': 0xD4C4A0, 'حمام': 0xA8C8D4, 'ممر': 0xD8D0C8, 'مدخل': 0xD0C8B8,
        'شرفة': 0xC0D8B8, 'مخزن': 0xB8B0A0, 'غرفة خادمة': 0xC8C0B0, 'مغسلة': 0xB0C0C8,
        'مكتب': 0xC8C8D8, 'غرفة اجتماعات': 0xC0C8D0, 'استقبال': 0xD0C8B0,
        'غرفة طعام': 0xD8D0B8, 'مجلس نساء': 0xD8C8C8, 'مرآب': 0xA8A8A0,
        'default': 0xD4C4A8,
      };

      for (const room of (floor.rooms || [])) {
        if (!Array.isArray(room.polygon) || room.polygon.length < 3) continue;

        const shape = new THREE.Shape();
        shape.moveTo(room.polygon[0][0], room.polygon[0][1]);
        for (let i = 1; i < room.polygon.length; i++) {
          shape.lineTo(room.polygon[i][0], room.polygon[i][1]);
        }
        shape.closePath();

        const roomColor = typeColors[room.name] || typeColors['default'];
        const geo = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geo, mat(roomColor, { roughness: 0.55, side: THREE.DoubleSide }));
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.003;
        mesh.receiveShadow = true;
        mesh.name = room.id + '_roomfloor';
        this._groups.floor.add(mesh);
      }
    }

    // ── الإضاءة ──────────────────────────────────────────────

    _addLighting() {
      // ضباب خفيف للعمق والجو
      this._scene.fog = new THREE.Fog(0xB8CDD8, 40, 120);

      // إضاءة محيطة — دافئة كضوء قطر
      const ambient = new THREE.AmbientLight(0xFFEDD8, 0.7);
      this._scene.add(ambient);

      // شمس رئيسية — زاوية الضحى (10 صباحاً)
      const sun = new THREE.DirectionalLight(0xFFF8E7, 1.8);
      sun.position.set(25, 45, 20);
      sun.castShadow = true;
      sun.shadow.camera.near = 0.5;
      sun.shadow.camera.far = 150;
      sun.shadow.camera.left = -50;
      sun.shadow.camera.right = 50;
      sun.shadow.camera.top = 50;
      sun.shadow.camera.bottom = -50;
      sun.shadow.mapSize.width = 4096;
      sun.shadow.mapSize.height = 4096;
      sun.shadow.bias = -0.0005;
      sun.shadow.normalBias = 0.02;
      this._scene.add(sun);

      // ضوء تعبئة — من الجانب المظلل
      const fill = new THREE.DirectionalLight(0xD0E8FF, 0.45);
      fill.position.set(-15, 10, -15);
      this._scene.add(fill);

      // نصف كروي — سماء زرقاء + أرض رملية
      const hemi = new THREE.HemisphereLight(0x87AABF, 0xC4A86C, 0.55);
      this._scene.add(hemi);

      // إضاءة نقطية داخلية (محاكاة تكييف/إضاءة داخلية)
      const interior = new THREE.PointLight(0xFFEDD0, 0.8, 12);
      interior.position.set(0, 2.5, 0);
      interior.castShadow = false;
      this._scene.add(interior);
    }

    // ── الأرضية ──────────────────────────────────────────────

    _buildFloor(floor) {
      const bounds = this._calcBounds(floor.walls);
      const cx = (bounds.minX + bounds.maxX) / 2;
      const cz = (bounds.minY + bounds.maxY) / 2;
      const w = bounds.maxX - bounds.minX + 0.5;
      const d = bounds.maxY - bounds.minY + 0.5;

      // أرضية بورسلان بيج احترافي
      const geo = new THREE.PlaneGeometry(w, d, Math.ceil(w), Math.ceil(d));
      const material = new THREE.MeshStandardMaterial({
        color: COLORS.floor, roughness: 0.45, metalness: 0.08,
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(cx, 0, cz);
      mesh.receiveShadow = true;
      mesh.name = 'floor';
      this._groups.floor.add(mesh);

      // شبكة بلاط 60cm — واقعية
      const tileSize = 0.6;
      const cols = Math.ceil(w / tileSize) + 1;
      const rows = Math.ceil(d / tileSize) + 1;
      const gridHelper = new THREE.GridHelper(
        Math.max(w, d) + 2, Math.round(Math.max(w, d) / tileSize) * 2,
        0xB8A880, 0xD4C4A8
      );
      gridHelper.position.set(cx, 0.002, cz);
      gridHelper.material.opacity = 0.5;
      gridHelper.material.transparent = true;
      this._groups.floor.add(gridHelper);

      // محيط خارجي — أرضية رملية قطرية
      const groundSize = Math.max(w, d) + 16;
      const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize);
      const groundMat = new THREE.MeshStandardMaterial({
        color: COLORS.ground, roughness: 0.92, metalness: 0.01,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(cx, -0.01, cz);
      ground.receiveShadow = true;
      ground.name = 'ground_ext';
      this._groups.floor.add(ground);

      // ممشى دائري حول المبنى
      const pathGeo = new THREE.RingGeometry(
        Math.max(w, d) / 2 + 0.3,
        Math.max(w, d) / 2 + 1.8,
        64
      );
      const pathMat = new THREE.MeshStandardMaterial({
        color: COLORS.groundPath, roughness: 0.8, metalness: 0.0, side: THREE.DoubleSide
      });
      const pathMesh = new THREE.Mesh(pathGeo, pathMat);
      pathMesh.rotation.x = -Math.PI / 2;
      pathMesh.position.set(cx, 0.001, cz);
      pathMesh.receiveShadow = true;
      this._groups.floor.add(pathMesh);
    }

    // ── السقف ────────────────────────────────────────────────

    _buildCeiling(floor, height) {
      const bounds = this._calcBounds(floor.walls);
      const cx = (bounds.minX + bounds.maxX) / 2;
      const cz = (bounds.minY + bounds.maxY) / 2;
      const w = bounds.maxX - bounds.minX + 0.4;
      const d = bounds.maxY - bounds.minY + 0.4;

      // سقف داخلي — جبس أبيض
      const geo = new THREE.PlaneGeometry(w, d);
      const material = new THREE.MeshStandardMaterial({
        color: COLORS.ceiling, roughness: 0.7, metalness: 0.0, side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(cx, height, cz);
      mesh.receiveShadow = true;
      mesh.name = 'ceiling';
      this._groups.ceiling.add(mesh);

      // سطح خارجي — طيني/رملي
      const roofGeo = new THREE.PlaneGeometry(w + 0.4, d + 0.4);
      const roofMat = new THREE.MeshStandardMaterial({
        color: COLORS.roofColor, roughness: 0.88, metalness: 0.0
      });
      const roofMesh = new THREE.Mesh(roofGeo, roofMat);
      roofMesh.rotation.x = -Math.PI / 2;
      roofMesh.position.set(cx, height + 0.18, cz);
      roofMesh.receiveShadow = true;
      roofMesh.castShadow = true;
      this._groups.ceiling.add(roofMesh);

      // سقف منحدر خفيف (Hip Roof) — مناسب للمناخ القطري
      const roofH = Math.min(w, d) * 0.12; // انحدار خفيف
      const ridgeGeo = new THREE.ConeGeometry(
        Math.max(w, d) * 0.72, roofH + 0.2, 4
      );
      ridgeGeo.rotateY(Math.PI / 4);
      const ridgeMat = new THREE.MeshStandardMaterial({
        color: COLORS.roofColor, roughness: 0.85, metalness: 0.02
      });
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(cx, height + 0.18 + (roofH / 2), cz);
      ridge.castShadow = true;
      ridge.receiveShadow = true;
      this._groups.ceiling.add(ridge);

      // برجوله (Parapet) حول السطح — طابع خليجي
      const parapetH = 0.9;
      const parapetThick = 0.2;
      const extWalls = [
        { s: [bounds.minX, bounds.minY], e: [bounds.maxX, bounds.minY] },
        { s: [bounds.maxX, bounds.minY], e: [bounds.maxX, bounds.maxY] },
        { s: [bounds.maxX, bounds.maxY], e: [bounds.minX, bounds.maxY] },
        { s: [bounds.minX, bounds.maxY], e: [bounds.minX, bounds.minY] },
      ];
      const parapetMat = new THREE.MeshStandardMaterial({
        color: COLORS.parapet, roughness: 0.78, metalness: 0.02
      });
      for (const wall of extWalls) {
        const len = wallLength(wall.s, wall.e);
        const angle = wallAngle(wall.s, wall.e);
        const mid = midpoint(wall.s, wall.e);
        const pGeo = new THREE.BoxGeometry(len, parapetH, parapetThick + 0.05);
        const pMesh = new THREE.Mesh(pGeo, parapetMat);
        pMesh.position.set(mid[0], height + parapetH / 2, mid[1]);
        pMesh.rotation.y = -angle;
        pMesh.castShadow = true;
        pMesh.receiveShadow = true;
        this._groups.ceiling.add(pMesh);
      }
    }

    // ── الجدران ──────────────────────────────────────────────

    _buildWalls(floor, height) {
      for (const wall of (floor.walls || [])) {
        if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) continue;

        const len = wallLength(wall.start, wall.end);
        if (len < 0.01) continue;

        const angle = wallAngle(wall.start, wall.end);
        const thick = wall.thickness_m || 0.2;
        const h = wall.height_m || height;
        const isExt = wall.is_external !== false;

        // جمع الأبواب والشبابيك على هذا الجدار
        const openings = this._getOpeningsOnWall(wall.id, floor);

        if (openings.length === 0) {
          // جدار كامل بدون فتحات
          const mesh = this._createWallMesh(len, h, thick, isExt);
          this._positionWall(mesh, wall.start, wall.end, h);
          mesh.name = wall.id;
          this._meshMap[wall.id] = mesh;
          this._groups.walls.add(mesh);
        } else {
          // جدار مع فتحات — نقسمه لشرائح
          this._buildWallWithOpenings(wall, openings, h, thick, isExt);
        }
      }
    }

    /** إنشاء mesh جدار بتفاصيل معمارية */
    _createWallMesh(length, height, thickness, isExternal) {
      const geo = new THREE.BoxGeometry(length, height, thickness);
      const wallMat = isExternal ? wallMatExt() : wallMatInt();
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // كرنيش سفلي (baseboard) للجدران الداخلية
      if (!isExternal && height > 2) {
        const baseGeo = new THREE.BoxGeometry(length, 0.12, thickness + 0.04);
        const baseMesh = new THREE.Mesh(baseGeo, mat(0xD4C4A8, { roughness: 0.6 }));
        baseMesh.position.y = -(height / 2) + 0.06;
        baseMesh.castShadow = false;
        mesh.add(baseMesh);
      }

      // كرنيش علوي للجدران الخارجية
      if (isExternal && height > 2) {
        const topGeo = new THREE.BoxGeometry(length + 0.06, 0.18, thickness + 0.06);
        const topMesh = new THREE.Mesh(topGeo, mat(COLORS.extWallDark, { roughness: 0.7 }));
        topMesh.position.y = (height / 2) - 0.09;
        mesh.add(topMesh);
      }

      return mesh;
    }

    /** وضع الجدار في المكان الصحيح */
    _positionWall(mesh, start, end, height) {
      const mid = midpoint(start, end);
      const angle = wallAngle(start, end);
      mesh.position.set(mid[0], height / 2, mid[1]);
      mesh.rotation.y = -angle;
    }

    /** جمع الفتحات (أبواب + شبابيك) على جدار معين */
    _getOpeningsOnWall(wallId, floor) {
      const openings = [];
      for (const d of (floor.doors || [])) {
        if (d.wall_id === wallId) {
          openings.push({ type: 'door', data: d, pos: d.position_ratio || 0.5 });
        }
      }
      for (const w of (floor.windows || [])) {
        if (w.wall_id === wallId) {
          openings.push({ type: 'window', data: w, pos: w.position_ratio || 0.5 });
        }
      }
      openings.sort((a, b) => a.pos - b.pos);
      return openings;
    }

    /** بناء جدار مع فتحات (أبواب/شبابيك) */
    _buildWallWithOpenings(wall, openings, height, thickness, isExternal) {
      const totalLen = wallLength(wall.start, wall.end);
      const angle = wallAngle(wall.start, wall.end);
      const color = isExternal ? COLORS.extWall : COLORS.intWall;

      // لكل فتحة: أضف جزء جدار قبلها + الفتحة + جزء فوقها
      let currentPos = 0; // نسبة على طول الجدار

      for (const opening of openings) {
        const oWidth = opening.data.width_m || 0.9;
        const oHeight = opening.data.height_m || 2.1;
        const oPos = opening.pos; // 0-1
        const oPosM = oPos * totalLen; // بالمتر
        const oStart = oPosM - oWidth / 2;
        const oEnd = oPosM + oWidth / 2;

        // ────── الجزء قبل الفتحة ──────
        const beforeLen = oStart - currentPos * totalLen;
        if (beforeLen > 0.02) {
          const seg = this._createWallMesh(beforeLen, height, thickness, isExternal);
          const segMid = (currentPos * totalLen + oStart) / 2;
          const segWorldPos = this._pointAlongWall(wall.start, wall.end, segMid / totalLen);
          seg.position.set(segWorldPos[0], height / 2, segWorldPos[1]);
          seg.rotation.y = -angle;
          this._groups.walls.add(seg);
        }

        // ────── الجزء فوق الفتحة (lintel) ──────
        let sillHeight = 0;
        if (opening.type === 'window') {
          sillHeight = opening.data.sill_height_m || 0.9;
          // جزء تحت الشباك
          if (sillHeight > 0.05) {
            const sill = this._createWallMesh(oWidth, sillHeight, thickness, isExternal);
            const sillPos = this._pointAlongWall(wall.start, wall.end, oPos);
            sill.position.set(sillPos[0], sillHeight / 2, sillPos[1]);
            sill.rotation.y = -angle;
            this._groups.walls.add(sill);
          }
        }

        const topOfOpening = sillHeight + oHeight;
        const lintelHeight = height - topOfOpening;
        if (lintelHeight > 0.05) {
          const lintel = this._createWallMesh(oWidth, lintelHeight, thickness, isExternal);
          const lintelPos = this._pointAlongWall(wall.start, wall.end, oPos);
          lintel.position.set(lintelPos[0], topOfOpening + lintelHeight / 2, lintelPos[1]);
          lintel.rotation.y = -angle;
          this._groups.walls.add(lintel);
        }

        currentPos = oEnd / totalLen;
      }

      // ────── الجزء بعد آخر فتحة ──────
      const afterLen = totalLen - currentPos * totalLen;
      if (afterLen > 0.02) {
        const seg = this._createWallMesh(afterLen, height, thickness, isExternal);
        const segMid = (currentPos * totalLen + totalLen) / 2;
        const segWorldPos = this._pointAlongWall(wall.start, wall.end, segMid / totalLen);
        seg.position.set(segWorldPos[0], height / 2, segWorldPos[1]);
        seg.rotation.y = -angle;
        this._groups.walls.add(seg);
      }

      // تسجيل mesh مرجعي (أول segment) للتمييز
      if (this._groups.walls.children.length > 0) {
        this._meshMap[wall.id] = this._groups.walls.children[this._groups.walls.children.length - 1];
      }
    }

    /** نقطة على طول الجدار (نسبة 0-1) */
    _pointAlongWall(start, end, ratio) {
      return [
        start[0] + (end[0] - start[0]) * ratio,
        start[1] + (end[1] - start[1]) * ratio,
      ];
    }

    // ── الأبواب ──────────────────────────────────────────────

    _buildDoors(floor, height) {
      for (const door of (floor.doors || [])) {
        const wall = (floor.walls || []).find(w => w.id === door.wall_id);
        if (!wall) continue;

        const wLen = wallLength(wall.start, wall.end);
        const angle = wallAngle(wall.start, wall.end);
        const pos = door.position_ratio || 0.5;
        const worldPos = this._pointAlongWall(wall.start, wall.end, pos);
        const dW = door.width_m || 0.9;
        const dH = door.height_m || 2.1;
        const thick = (wall.thickness_m || 0.2) + 0.02;

        // إطار الباب
        const frameGeo = new THREE.BoxGeometry(dW + 0.08, dH + 0.04, thick + 0.04);
        const frame = new THREE.Mesh(frameGeo, mat(COLORS.doorFrame));
        frame.position.set(worldPos[0], dH / 2, worldPos[1]);
        frame.rotation.y = -angle;
        frame.name = door.id + '_frame';
        this._groups.doors.add(frame);

        // ورقة الباب (مفتوحة 30 درجة — شفافة قليلاً)
        const leafGeo = new THREE.BoxGeometry(dW - 0.04, dH - 0.04, 0.04);
        const leaf = new THREE.Mesh(leafGeo, mat(COLORS.door, { roughness: 0.5, opacity: 0.75, transparent: true }));
        // pivot من الحافة
        leafGeo.translate(dW / 2 - 0.02, 0, 0);
        leaf.position.set(
          worldPos[0] - Math.cos(angle) * dW / 2,
          dH / 2,
          worldPos[1] + Math.sin(angle) * dW / 2
        );
        leaf.rotation.y = -angle + Math.PI * 0.17; // مفتوح 30°
        leaf.castShadow = true;
        leaf.name = door.id;
        this._meshMap[door.id] = leaf;
        this._groups.doors.add(leaf);
      }
    }

    // ── الشبابيك ─────────────────────────────────────────────

    _buildWindows(floor, height) {
      for (const win of (floor.windows || [])) {
        const wall = (floor.walls || []).find(w => w.id === win.wall_id);
        if (!wall) continue;

        const angle = wallAngle(wall.start, wall.end);
        const pos = win.position_ratio || 0.5;
        const worldPos = this._pointAlongWall(wall.start, wall.end, pos);
        const wW = win.width_m || 1.2;
        const wH = win.height_m || 1.5;
        const sill = win.sill_height_m || 0.9;
        const thick = (wall.thickness_m || 0.2);

        // إطار ألومنيوم
        const frameGeo = new THREE.BoxGeometry(wW + 0.06, wH + 0.06, thick + 0.02);
        const frame = new THREE.Mesh(frameGeo, mat(COLORS.windowFrame, { metalness: 0.4, roughness: 0.3 }));
        frame.position.set(worldPos[0], sill + wH / 2, worldPos[1]);
        frame.rotation.y = -angle;
        frame.name = win.id + '_frame';
        this._groups.windows.add(frame);

        // زجاج شفاف
        const glassGeo = new THREE.PlaneGeometry(wW - 0.06, wH - 0.06);
        const glass = new THREE.Mesh(glassGeo, glassMat());
        glass.position.set(worldPos[0], sill + wH / 2, worldPos[1]);
        glass.rotation.y = -angle;
        glass.name = win.id;
        this._meshMap[win.id] = glass;
        this._groups.windows.add(glass);
      }
    }

    // ── الأعمدة ──────────────────────────────────────────────

    _buildColumns(floor, height) {
      for (const col of (floor.columns || [])) {
        if (!Array.isArray(col.position)) continue;
        const w = col.width_m || 0.4;
        const d = col.depth_m || 0.4;
        const h = height;

        let geo;
        if (col.type === 'circular') {
          geo = new THREE.CylinderGeometry(w / 2, w / 2, h, 16);
        } else {
          geo = new THREE.BoxGeometry(w, h, d);
        }

        const mesh = new THREE.Mesh(geo, mat(COLORS.column, { roughness: 0.7 }));
        mesh.position.set(col.position[0], h / 2, col.position[1]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.name = col.id;
        this._meshMap[col.id] = mesh;
        this._groups.columns.add(mesh);
      }
    }

    // ── أسماء الغرف (عربي + إنجليزي) ─────────────────────────

    _buildRoomLabels(floor, height) {
      for (const room of (floor.rooms || [])) {
        if (!Array.isArray(room.polygon) || room.polygon.length < 3) continue;

        // مركز الغرفة
        let cx = 0, cy = 0;
        for (const p of room.polygon) { cx += p[0]; cy += p[1]; }
        cx /= room.polygon.length;
        cy /= room.polygon.length;
        this._roomCenters[room.id] = { x: cx, y: height * 0.6, z: cy };

        // sprite نصي
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // خلفية شفافة داكنة
        ctx.fillStyle = 'rgba(26, 26, 46, 0.75)';
        this._roundRect(ctx, 20, 20, 472, 216, 16);
        ctx.fill();

        // اسم عربي
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 52px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(room.name || '', 256, 75);

        // اسم إنجليزي
        ctx.fillStyle = '#C8961A';
        ctx.font = '32px Arial, sans-serif';
        ctx.fillText(room.name_en || '', 256, 130);

        // مساحة
        ctx.fillStyle = '#AAAAAA';
        ctx.font = '28px Arial, sans-serif';
        ctx.fillText((room.area_m2 || 0) + ' م²', 256, 185);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(cx, height * 0.6, cy);
        sprite.scale.set(3, 1.5, 1);
        sprite.name = room.id + '_label';
        this._groups.labels.add(sprite);

        // تلوين أرضية الغرفة (شفاف خفيف)
        const shape = new THREE.Shape();
        shape.moveTo(room.polygon[0][0] - cx, room.polygon[0][1] - cy);
        for (let i = 1; i < room.polygon.length; i++) {
          shape.lineTo(room.polygon[i][0] - cx, room.polygon[i][1] - cy);
        }
        shape.closePath();
        const shapeGeo = new THREE.ShapeGeometry(shape);
        const shapeMesh = new THREE.Mesh(shapeGeo, mat(COLORS.highlight, {
          opacity: 0.0, transparent: true, side: THREE.DoubleSide
        }));
        shapeMesh.rotation.x = -Math.PI / 2;
        shapeMesh.position.set(cx, 0.005, cy);
        shapeMesh.name = room.id + '_area';
        this._meshMap[room.id + '_area'] = shapeMesh;
        this._groups.floor.add(shapeMesh);
      }
    }

    /** رسم مستطيل مدور */
    _roundRect(ctx, x, y, w, h, r) {
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

    // ── خطوط القياس (Dimension Lines) ─────────────────────────

    _buildDimensionLines(floor, dimensions) {
      const extWalls = (floor.walls || []).filter(w => w.is_external !== false);
      if (extWalls.length === 0) return;

      const bounds = this._calcBounds(floor.walls);
      const offset = 1.5; // بُعد خط القياس عن المبنى

      // العرض الكلي (أسفل)
      this._addDimLine(
        [bounds.minX, 0, bounds.maxY + offset],
        [bounds.maxX, 0, bounds.maxY + offset],
        dimensions?.total_width_m || (bounds.maxX - bounds.minX)
      );

      // العمق الكلي (يسار)
      this._addDimLine(
        [bounds.minX - offset, 0, bounds.minY],
        [bounds.minX - offset, 0, bounds.maxY],
        dimensions?.total_depth_m || (bounds.maxY - bounds.minY)
      );
    }

    /** إضافة خط قياس واحد */
    _addDimLine(start, end, value) {
      const points = [
        new THREE.Vector3(start[0], start[1] + 0.1, start[2]),
        new THREE.Vector3(end[0], end[1] + 0.1, end[2]),
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: COLORS.dimLine, linewidth: 2 });
      const line = new THREE.Line(lineGeo, lineMat);
      this._groups.dimensions.add(line);

      // خطوط نهاية (ticks)
      for (const p of [start, end]) {
        const isHorizontal = Math.abs(start[0] - end[0]) > Math.abs(start[2] - end[2]);
        const tickPts = isHorizontal
          ? [new THREE.Vector3(p[0], 0.1, p[2] - 0.3), new THREE.Vector3(p[0], 0.1, p[2] + 0.3)]
          : [new THREE.Vector3(p[0] - 0.3, 0.1, p[2]), new THREE.Vector3(p[0] + 0.3, 0.1, p[2])];
        const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts);
        const tick = new THREE.Line(tickGeo, lineMat);
        this._groups.dimensions.add(tick);
      }

      // نص القيمة
      const mid = [(start[0] + end[0]) / 2, 0.3, (start[2] + end[2]) / 2];
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 96;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(255, 107, 53, 0.85)';
      this._roundRect(ctx, 4, 4, 248, 88, 10);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(2) + ' م', 128, 48);

      const texture = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
      sprite.position.set(mid[0], mid[1], mid[2]);
      sprite.scale.set(2, 0.75, 1);
      this._groups.dimensions.add(sprite);
    }

    // ── الأرضية المحيطة ──────────────────────────────────────

    _buildGround(dimensions) {
      const size = Math.max(
        (dimensions?.total_width_m || 20) * 3,
        (dimensions?.total_depth_m || 20) * 3,
        60
      );
      const geo = new THREE.PlaneGeometry(size, size);
      const mesh = new THREE.Mesh(geo, mat(COLORS.ground, { roughness: 0.9 }));
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -0.01;
      mesh.receiveShadow = true;
      this._groups.ground.add(mesh);
    }

    // ── حسابات الحدود ────────────────────────────────────────

    _calcBounds(walls) {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const w of (walls || [])) {
        if (Array.isArray(w.start) && Array.isArray(w.end)) {
          minX = Math.min(minX, w.start[0], w.end[0]);
          maxX = Math.max(maxX, w.start[0], w.end[0]);
          minY = Math.min(minY, w.start[1], w.end[1]);
          maxY = Math.max(maxY, w.start[1], w.end[1]);
        }
      }
      if (!isFinite(minX)) { minX = 0; maxX = 10; minY = 0; maxY = 10; }
      return { minX, maxX, minY, maxY };
    }

    // ═══════════════════════════════════════════════════════════
    // ██ API العام
    // ═══════════════════════════════════════════════════════════

    /** الحصول على المشهد */
    getScene() { return this._scene; }

    /** إظهار/إخفاء السقف */
    toggleCeiling() {
      this._ceilingVisible = !this._ceilingVisible;
      if (this._groups.ceiling) this._groups.ceiling.visible = this._ceilingVisible;
      return this._ceilingVisible;
    }

    /** إظهار/إخفاء أسماء الغرف */
    toggleLabels() {
      this._labelsVisible = !this._labelsVisible;
      if (this._groups.labels) this._groups.labels.visible = this._labelsVisible;
      return this._labelsVisible;
    }

    /** إظهار/إخفاء خطوط القياس */
    toggleDimensions() {
      this._dimensionsVisible = !this._dimensionsVisible;
      if (this._groups.dimensions) this._groups.dimensions.visible = this._dimensionsVisible;
      return this._dimensionsVisible;
    }

    /** تمييز غرفة معينة */
    highlightRoom(roomId, color) {
      const areaMesh = this._meshMap[roomId + '_area'];
      if (areaMesh) {
        areaMesh.material.opacity = 0.25;
        areaMesh.material.color.setHex(color || COLORS.highlight);
      }
    }

    /** إزالة تمييز غرفة */
    unhighlightRoom(roomId) {
      const areaMesh = this._meshMap[roomId + '_area'];
      if (areaMesh) {
        areaMesh.material.opacity = 0.0;
      }
    }

    /** تمييز جدار (pass/fail/warning) */
    highlightWall(wallId, status) {
      const mesh = this._meshMap[wallId];
      if (!mesh) return;
      const colorMap = { pass: COLORS.passGreen, fail: COLORS.failRed, warning: COLORS.warnOrange };
      mesh.material.color.setHex(colorMap[status] || COLORS.highlight);
      mesh.material.emissive = new THREE.Color(colorMap[status] || COLORS.highlight);
      mesh.material.emissiveIntensity = 0.3;
    }

    /** إعادة لون جدار */
    resetWallColor(wallId) {
      const mesh = this._meshMap[wallId];
      if (!mesh) return;
      const wall = mesh._wallData;
      mesh.material.color.setHex(wall?.is_external !== false ? COLORS.extWall : COLORS.intWall);
      mesh.material.emissiveIntensity = 0;
    }

    /** مركز غرفة (للكاميرا) */
    getRoomCenter(roomId) {
      return this._roomCenters[roomId] || null;
    }

    /** كل مراكز الغرف */
    getAllRoomCenters() {
      return { ...this._roomCenters };
    }

    /** حدود المبنى (للكاميرا) */
    getBuildingBounds() {
      if (!this._scene) return null;
      const box = new THREE.Box3().setFromObject(this._groups.walls);
      return { min: box.min, max: box.max, center: box.getCenter(new THREE.Vector3()) };
    }

    /** تصدير كـ GLB */
    async exportGLB() {
      if (!this._scene) throw new Error('لا يوجد مشهد');

      return new Promise((resolve, reject) => {
        if (typeof THREE.GLTFExporter === 'undefined') {
          reject(new Error('GLTFExporter غير محمّل — أضف السكريبت'));
          return;
        }
        const exporter = new THREE.GLTFExporter();
        exporter.parse(this._scene, (buffer) => {
          const blob = new Blob([buffer], { type: 'application/octet-stream' });
          resolve(blob);
        }, { binary: true });
      });
    }

    /** تنظيف الذاكرة */
    dispose() {
      if (!this._scene) return;

      this._scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      this._scene = null;
      this._groups = {};
      this._meshMap = {};
      this._roomCenters = {};
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.ModelBuilder = ModelBuilder;

  console.info('[QS] ModelBuilder v1.1 loaded — auto-repair + fallback walls');

})();
