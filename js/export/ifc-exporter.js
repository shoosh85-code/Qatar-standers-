// js/export/ifc-exporter.js — QatarSpec Pro v1.0
// ═══════════════════════════════════════════════════════════════
// مصدّر IFC2x3 (STEP format) من JSON Schema
// ينتج ملف .ifc صالح يُفتح في Revit / ArchiCAD / BIM Vision
// ═══════════════════════════════════════════════════════════════

;(function() {
  'use strict';
  window.QS = window.QS || {};

  // ── ثوابت ──────────────────────────────────────────────────
  const IFC_SCHEMA = 'IFC2X3';
  const ORIGIN_LAT = 25.3; // الدوحة
  const ORIGIN_LON = 51.5;

  // ═══════════════════════════════════════════════════════════
  // ██ IFCExporter Class
  // ═══════════════════════════════════════════════════════════

  class IFCExporter {
    constructor() {
      this._schema = null;
      this._id = 0;
      this._lines = [];
      // مراجع مشتركة
      this._refs = {};
    }

    fromJSON(schemaJSON) {
      if (!schemaJSON?.floors?.[0]) throw new Error('JSON Schema غير صالح');
      this._schema = schemaJSON;
      return this;
    }

    generate() {
      if (!this._schema) throw new Error('استدعِ fromJSON أولاً');
      this._id = 0;
      this._lines = [];
      this._refs = {};

      const header = this._header();
      this._lines.push('DATA;');
      this._buildData();
      this._lines.push('ENDSEC;');

      return header + '\n' + this._lines.join('\n') + '\nEND-ISO-10303-21;\n';
    }

    download(filename) {
      const content = this.generate();
      const blob = new Blob([content], { type: 'application/x-step; charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'QatarSpec_Model.ifc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // ═══════════════════════════════════════════════════════════
    // ██ INTERNAL
    // ═══════════════════════════════════════════════════════════

    _next() { return ++this._id; }
    _ref(id) { return '#' + id; }

    _add(entity) {
      const id = this._next();
      this._lines.push(`#${id}=${entity};`);
      return id;
    }

    _guid() {
      // IFC GlobalId: 22 char base64
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';
      let result = '';
      for (let i = 0; i < 22; i++) {
        result += chars[Math.floor(Math.random() * 64)];
      }
      return result;
    }

    _str(s) { return "'" + (s || '').replace(/'/g, "''") + "'"; }
    _enum(s) { return '.' + s + '.'; }
    _real(n) { return (typeof n === 'number') ? n.toFixed(6) : '0.0'; }

    // ── HEADER ───────────────────────────────────────────────

    _header() {
      const proj = this._schema.project || {};
      const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
      return [
        'ISO-10303-21;',
        'HEADER;',
        `FILE_DESCRIPTION(('ViewDefinition [CoordinationView]'),'2;1');`,
        `FILE_NAME('QatarSpec_Model.ifc','${now}',('${proj.engineer || 'Engineer'}'),('QatarSpec Pro'),'IFC2x3','QatarSpec Pro v3.0','');`,
        `FILE_SCHEMA(('${IFC_SCHEMA}'));`,
        'ENDSEC;',
      ].join('\n');
    }

    // ── DATA ─────────────────────────────────────────────────

    _buildData() {
      // ── أساسيات هندسية ──
      const origin3D = this._add(`IFCCARTESIANPOINT((0.0,0.0,0.0))`);
      const dirZ = this._add(`IFCDIRECTION((0.0,0.0,1.0))`);
      const dirX = this._add(`IFCDIRECTION((1.0,0.0,0.0))`);
      const dirY = this._add(`IFCDIRECTION((0.0,1.0,0.0))`);
      const axis2d3d = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(origin3D)},${this._ref(dirZ)},${this._ref(dirX)})`);

      this._refs.origin3D = origin3D;
      this._refs.dirZ = dirZ;
      this._refs.dirX = dirX;
      this._refs.dirY = dirY;
      this._refs.axis3D = axis2d3d;

      // ── وحدات (متر) ──
      const lengthUnit = this._add(`IFCSIUNIT(*,${this._enum('LENGTHUNIT')},$,${this._enum('METRE')})`);
      const areaUnit = this._add(`IFCSIUNIT(*,${this._enum('AREAUNIT')},$,${this._enum('SQUARE_METRE')})`);
      const volUnit = this._add(`IFCSIUNIT(*,${this._enum('VOLUMEUNIT')},$,${this._enum('CUBIC_METRE')})`);
      const angleUnit = this._add(`IFCSIUNIT(*,${this._enum('PLANEANGLEUNIT')},$,${this._enum('RADIAN')})`);
      const unitAssign = this._add(`IFCUNITASSIGNMENT((${this._ref(lengthUnit)},${this._ref(areaUnit)},${this._ref(volUnit)},${this._ref(angleUnit)}))`);

      // ── Geometric Context ──
      const origin2D = this._add(`IFCCARTESIANPOINT((0.0,0.0))`);
      const dir2DX = this._add(`IFCDIRECTION((1.0,0.0))`);
      const dir2DY = this._add(`IFCDIRECTION((0.0,1.0))`);
      const worldCS = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(origin3D)},${this._ref(dirZ)},${this._ref(dirX)})`);
      const trueNorth = this._add(`IFCDIRECTION((0.0,1.0))`);
      const geomCtx = this._add(`IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.0E-5,${this._ref(worldCS)},${this._ref(trueNorth)})`);
      const bodyCtx = this._add(`IFCGEOMETRICREPRESENTATIONSUBCONTEXT('Body','Model',*,*,*,*,${this._ref(geomCtx)},$,${this._enum('MODEL_VIEW')},$)`);
      this._refs.geomCtx = geomCtx;
      this._refs.bodyCtx = bodyCtx;

      // ── Person + Organization ──
      const person = this._add(`IFCPERSON($,'${(this._schema.project?.engineer || 'Engineer').replace(/'/g,"''")}','QatarSpec',$,$,$,$,$)`);
      const org = this._add(`IFCORGANIZATION($,'QatarSpec Pro','qatar-standers.vercel.app',$,$)`);
      const personOrg = this._add(`IFCPERSONANDORGANIZATION(${this._ref(person)},${this._ref(org)},$)`);
      const app = this._add(`IFCAPPLICATION(${this._ref(org)},'3.0','QatarSpec Pro','QSP')`);
      const ownerHistory = this._add(`IFCOWNERHISTORY(${this._ref(personOrg)},${this._ref(app)},$,${this._enum('NOCHANGE')},$,$,$,${Math.floor(Date.now()/1000)})`);
      this._refs.ownerHistory = ownerHistory;

      // ── IfcProject ──
      const project = this._add(`IFCPROJECT('${this._guid()}',${this._ref(ownerHistory)},${this._str(this._schema.project?.name || 'QatarSpec Project')},$,$,$,$,(${this._ref(geomCtx)}),${this._ref(unitAssign)})`);
      this._refs.project = project;

      // ── IfcSite (قطر) ──
      const sitePlacement = this._add(`IFCLOCALPLACEMENT($,${this._ref(axis2d3d)})`);
      const site = this._add(`IFCSITE('${this._guid()}',${this._ref(ownerHistory)},${this._str('Qatar Site')},$,$,${this._ref(sitePlacement)},$,$,${this._enum('ELEMENT')},(25,18,0,0),(51,30,0,0),0.0,$,$)`);
      this._refs.site = site;

      // ── IfcBuilding ──
      const bldgPlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(sitePlacement)},${this._ref(axis2d3d)})`);
      const building = this._add(`IFCBUILDING('${this._guid()}',${this._ref(ownerHistory)},${this._str(this._schema.project?.name || 'Building')},$,$,${this._ref(bldgPlacement)},$,$,${this._enum('ELEMENT')},$,$,$)`);
      this._refs.building = building;

      // ── IfcBuildingStorey ──
      const floor = this._schema.floors[0];
      const storeyPlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(bldgPlacement)},${this._ref(axis2d3d)})`);
      const storey = this._add(`IFCBUILDINGSTOREY('${this._guid()}',${this._ref(ownerHistory)},${this._str(floor.label || 'Ground Floor')},$,$,${this._ref(storeyPlacement)},$,$,${this._enum('ELEMENT')},0.0)`);
      this._refs.storey = storey;
      this._refs.storeyPlacement = storeyPlacement;

      // ── العلاقات الهيكلية ──
      this._add(`IFCRELAGGREGATES('${this._guid()}',${this._ref(ownerHistory)},$,$,${this._ref(project)},(${this._ref(site)}))`);
      this._add(`IFCRELAGGREGATES('${this._guid()}',${this._ref(ownerHistory)},$,$,${this._ref(site)},(${this._ref(building)}))`);
      this._add(`IFCRELAGGREGATES('${this._guid()}',${this._ref(ownerHistory)},$,$,${this._ref(building)},(${this._ref(storey)}))`);

      // ── عناصر المبنى ──
      const elementRefs = [];

      // جدران
      for (const wall of (floor.walls || [])) {
        const ref = this._buildWall(wall, floor.height_m || 3.0);
        if (ref) elementRefs.push(ref);
      }

      // أعمدة
      for (const col of (floor.columns || [])) {
        const ref = this._buildColumn(col, floor.height_m || 3.0);
        if (ref) elementRefs.push(ref);
      }

      // بلاطة أرضية
      const slabRef = this._buildSlab(floor);
      if (slabRef) elementRefs.push(slabRef);

      // غرف (IfcSpace)
      const spaceRefs = [];
      for (const room of (floor.rooms || [])) {
        const ref = this._buildSpace(room, floor.height_m || 3.0);
        if (ref) spaceRefs.push(ref);
      }

      // ربط العناصر بالدور
      if (elementRefs.length > 0) {
        this._add(`IFCRELCONTAINEDINSPATIALSTRUCTURE('${this._guid()}',${this._ref(this._refs.ownerHistory)},$,$,(${elementRefs.map(r => this._ref(r)).join(',')}),${this._ref(storey)})`);
      }
      if (spaceRefs.length > 0) {
        this._add(`IFCRELAGGREGATES('${this._guid()}',${this._ref(this._refs.ownerHistory)},$,$,${this._ref(storey)},(${spaceRefs.map(r => this._ref(r)).join(',')}))`);
      }
    }

    // ── IfcWallStandardCase ──────────────────────────────────

    _buildWall(wall, height) {
      if (!Array.isArray(wall.start) || !Array.isArray(wall.end)) return null;
      const len = Math.sqrt((wall.end[0]-wall.start[0])**2 + (wall.end[1]-wall.start[1])**2);
      if (len < 0.01) return null;

      const thick = wall.thickness_m || 0.2;
      const h = wall.height_m || height;
      const angle = Math.atan2(wall.end[1] - wall.start[1], wall.end[0] - wall.start[0]);

      // موقع الجدار
      const ptStart = this._add(`IFCCARTESIANPOINT((${this._real(wall.start[0])},${this._real(wall.start[1])},0.0))`);
      const wallDir = this._add(`IFCDIRECTION((${this._real(Math.cos(angle))},${this._real(Math.sin(angle))},0.0))`);
      const wallAxis = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(ptStart)},${this._ref(this._refs.dirZ)},${this._ref(wallDir)})`);
      const wallPlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(this._refs.storeyPlacement)},${this._ref(wallAxis)})`);

      // شكل الجدار (Extrusion)
      const profilePts = [
        this._add(`IFCCARTESIANPOINT((0.0,${this._real(-thick/2)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(len)},${this._real(-thick/2)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(len)},${this._real(thick/2)}))`),
        this._add(`IFCCARTESIANPOINT((0.0,${this._real(thick/2)}))`),
      ];
      const polyline = this._add(`IFCPOLYLINE((${profilePts.map(p => this._ref(p)).join(',')},${this._ref(profilePts[0])}))`);
      const profile = this._add(`IFCARBITRARYCLOSEDPROFILEDEF(${this._enum('AREA')},$,${this._ref(polyline)})`);

      const extDir = this._add(`IFCDIRECTION((0.0,0.0,1.0))`);
      const origin2 = this._add(`IFCCARTESIANPOINT((0.0,0.0))`);
      const axis2 = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(this._refs.origin3D)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const solid = this._add(`IFCEXTRUDEDAREASOLID(${this._ref(profile)},${this._ref(axis2)},${this._ref(extDir)},${this._real(h)})`);

      const shapeRep = this._add(`IFCSHAPEREPRESENTATION(${this._ref(this._refs.bodyCtx)},'Body','SweptSolid',(${this._ref(solid)}))`);
      const prodShape = this._add(`IFCPRODUCTDEFINITIONSHAPE($,$,(${this._ref(shapeRep)}))`);

      // كيان الجدار
      const wallEntity = this._add(`IFCWALLSTANDARDCASE('${this._guid()}',${this._ref(this._refs.ownerHistory)},${this._str(wall.id)},$,$,${this._ref(wallPlacement)},${this._ref(prodShape)},$)`);

      // خصائص QCS
      this._addQCSProperties(wallEntity, wall.id, [
        { name: 'Wall Thickness', value: thick, unit: 'm' },
        { name: 'Wall Height', value: h, unit: 'm' },
        { name: 'Material', value: wall.material || 'block' },
        { name: 'Is External', value: wall.is_external !== false ? 'Yes' : 'No' },
        { name: 'QCS Reference', value: 'QCS 2024 Section 9 Part 3' },
      ]);

      return wallEntity;
    }

    // ── IfcColumn ────────────────────────────────────────────

    _buildColumn(col, height) {
      if (!Array.isArray(col.position)) return null;
      const w = col.width_m || 0.4;
      const d = col.depth_m || 0.4;
      const h = height;

      const pt = this._add(`IFCCARTESIANPOINT((${this._real(col.position[0])},${this._real(col.position[1])},0.0))`);
      const colAxis = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(pt)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const colPlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(this._refs.storeyPlacement)},${this._ref(colAxis)})`);

      // Profile
      const hw = w / 2, hd = d / 2;
      const pts = [
        this._add(`IFCCARTESIANPOINT((${this._real(-hw)},${this._real(-hd)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(hw)},${this._real(-hd)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(hw)},${this._real(hd)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(-hw)},${this._real(hd)}))`),
      ];
      const poly = this._add(`IFCPOLYLINE((${pts.map(p => this._ref(p)).join(',')},${this._ref(pts[0])}))`);
      const profile = this._add(`IFCARBITRARYCLOSEDPROFILEDEF(${this._enum('AREA')},$,${this._ref(poly)})`);

      const extDir = this._add(`IFCDIRECTION((0.0,0.0,1.0))`);
      const axis2 = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(this._refs.origin3D)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const solid = this._add(`IFCEXTRUDEDAREASOLID(${this._ref(profile)},${this._ref(axis2)},${this._ref(extDir)},${this._real(h)})`);

      const shapeRep = this._add(`IFCSHAPEREPRESENTATION(${this._ref(this._refs.bodyCtx)},'Body','SweptSolid',(${this._ref(solid)}))`);
      const prodShape = this._add(`IFCPRODUCTDEFINITIONSHAPE($,$,(${this._ref(shapeRep)}))`);

      const colEntity = this._add(`IFCCOLUMN('${this._guid()}',${this._ref(this._refs.ownerHistory)},${this._str(col.id)},$,$,${this._ref(colPlacement)},${this._ref(prodShape)},$)`);

      this._addQCSProperties(colEntity, col.id, [
        { name: 'Column Width', value: w, unit: 'm' },
        { name: 'Column Depth', value: d, unit: 'm' },
        { name: 'QCS Reference', value: 'QCS 2024 Section 5 Part 2' },
      ]);

      return colEntity;
    }

    // ── IfcSlab (أرضية) ─────────────────────────────────────

    _buildSlab(floor) {
      const walls = floor.walls || [];
      if (walls.length === 0) return null;

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const w of walls) {
        if (!Array.isArray(w.start) || !Array.isArray(w.end)) continue;
        minX = Math.min(minX, w.start[0], w.end[0]);
        maxX = Math.max(maxX, w.start[0], w.end[0]);
        minY = Math.min(minY, w.start[1], w.end[1]);
        maxY = Math.max(maxY, w.start[1], w.end[1]);
      }
      if (!isFinite(minX)) return null;

      const slabPlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(this._refs.storeyPlacement)},${this._ref(this._refs.axis3D)})`);

      const pts = [
        this._add(`IFCCARTESIANPOINT((${this._real(minX)},${this._real(minY)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(maxX)},${this._real(minY)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(maxX)},${this._real(maxY)}))`),
        this._add(`IFCCARTESIANPOINT((${this._real(minX)},${this._real(maxY)}))`),
      ];
      const poly = this._add(`IFCPOLYLINE((${pts.map(p => this._ref(p)).join(',')},${this._ref(pts[0])}))`);
      const profile = this._add(`IFCARBITRARYCLOSEDPROFILEDEF(${this._enum('AREA')},$,${this._ref(poly)})`);

      const extDir = this._add(`IFCDIRECTION((0.0,0.0,-1.0))`);
      const axis2 = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(this._refs.origin3D)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const solid = this._add(`IFCEXTRUDEDAREASOLID(${this._ref(profile)},${this._ref(axis2)},${this._ref(extDir)},0.200000)`);

      const shapeRep = this._add(`IFCSHAPEREPRESENTATION(${this._ref(this._refs.bodyCtx)},'Body','SweptSolid',(${this._ref(solid)}))`);
      const prodShape = this._add(`IFCPRODUCTDEFINITIONSHAPE($,$,(${this._ref(shapeRep)}))`);

      return this._add(`IFCSLAB('${this._guid()}',${this._ref(this._refs.ownerHistory)},'Floor Slab',$,$,${this._ref(slabPlacement)},${this._ref(prodShape)},$,${this._enum('FLOOR')})`);
    }

    // ── IfcSpace (غرفة) ──────────────────────────────────────

    _buildSpace(room, height) {
      if (!Array.isArray(room.polygon) || room.polygon.length < 3) return null;

      let cx = 0, cy = 0;
      for (const p of room.polygon) { cx += p[0]; cy += p[1]; }
      cx /= room.polygon.length;
      cy /= room.polygon.length;

      const pt = this._add(`IFCCARTESIANPOINT((${this._real(cx)},${this._real(cy)},0.0))`);
      const spaceAxis = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(pt)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const spacePlacement = this._add(`IFCLOCALPLACEMENT(${this._ref(this._refs.storeyPlacement)},${this._ref(spaceAxis)})`);

      // Profile من polygon
      const pts = room.polygon.map(p =>
        this._add(`IFCCARTESIANPOINT((${this._real(p[0] - cx)},${this._real(p[1] - cy)}))`)
      );
      const poly = this._add(`IFCPOLYLINE((${pts.map(p => this._ref(p)).join(',')},${this._ref(pts[0])}))`);
      const profile = this._add(`IFCARBITRARYCLOSEDPROFILEDEF(${this._enum('AREA')},$,${this._ref(poly)})`);

      const extDir = this._add(`IFCDIRECTION((0.0,0.0,1.0))`);
      const axis2 = this._add(`IFCAXIS2PLACEMENT3D(${this._ref(this._refs.origin3D)},${this._ref(this._refs.dirZ)},${this._ref(this._refs.dirX)})`);
      const solid = this._add(`IFCEXTRUDEDAREASOLID(${this._ref(profile)},${this._ref(axis2)},${this._ref(extDir)},${this._real(height)})`);

      const shapeRep = this._add(`IFCSHAPEREPRESENTATION(${this._ref(this._refs.bodyCtx)},'Body','SweptSolid',(${this._ref(solid)}))`);
      const prodShape = this._add(`IFCPRODUCTDEFINITIONSHAPE($,$,(${this._ref(shapeRep)}))`);

      const name = (room.name || '') + ' — ' + (room.name_en || '');
      const spaceEntity = this._add(`IFCSPACE('${this._guid()}',${this._ref(this._refs.ownerHistory)},${this._str(name)},$,$,${this._ref(spacePlacement)},${this._ref(prodShape)},$,${this._enum('ELEMENT')},${this._enum('INTERNAL')},$)`);

      // خصائص الغرفة
      this._addQCSProperties(spaceEntity, room.id, [
        { name: 'Room Name AR', value: room.name || '' },
        { name: 'Room Name EN', value: room.name_en || '' },
        { name: 'Area', value: room.area_m2 || 0, unit: 'm2' },
        { name: 'QCS Reference', value: 'QCS 2024 Section 9 Part 2' },
      ]);

      return spaceEntity;
    }

    // ── IfcPropertySet (QCS 2024) ────────────────────────────

    _addQCSProperties(elementRef, elementId, properties) {
      const propRefs = [];

      for (const prop of properties) {
        let propRef;
        if (typeof prop.value === 'number') {
          const nomVal = this._add(`IFCREAL(${this._real(prop.value)})`);
          propRef = this._add(`IFCPROPERTYSINGLEVALUE(${this._str(prop.name)},$,IFCREAL(${this._real(prop.value)}),$)`);
        } else {
          propRef = this._add(`IFCPROPERTYSINGLEVALUE(${this._str(prop.name)},$,IFCTEXT(${this._str(String(prop.value))}),$)`);
        }
        propRefs.push(propRef);
      }

      const pset = this._add(`IFCPROPERTYSET('${this._guid()}',${this._ref(this._refs.ownerHistory)},'QCS_2024_Compliance','QatarSpec Pro — QCS 2024 compliance data',(${propRefs.map(r => this._ref(r)).join(',')}))`);
      this._add(`IFCRELDEFINESBYPROPERTIES('${this._guid()}',${this._ref(this._refs.ownerHistory)},$,$,(${this._ref(elementRef)}),${this._ref(pset)})`);
    }
  }

  // ── تصدير ──────────────────────────────────────────────────
  window.QS.IFCExporter = IFCExporter;
  console.info('[QS] IFCExporter v1.0 loaded');

})();
