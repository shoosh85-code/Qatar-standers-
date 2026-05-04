// QatarSpec Pro — Supabase Real Search Integration
// قاعدة بيانات: qcs_chunks | 18,000+ chunk من QCS 2024

// المفاتيح محذوفة من client-side — تُدار بالكامل في api/supabase-proxy.js

const SECTION_MAP = {
  "road-works":      { section_num: "06", label: "أعمال الطرق" },
  "utilities":       { section_num: "08", label: "شبكات المرافق" },
  "road-design":     { section_num: "06", label: "معايير تصميم الطرق" },
  "excavation":      { section_num: "03", label: "التدعيم والحفريات" },
  "fire-safety":     { section_num: "23", label: "الحريق والسلامة" },
  "kahramaa":        { section_num: "09", label: "KAHRAMAA Standards" },
  "structural-code": { section_num: "05", label: "الكود الإنشائي" },
  "soil-investigation":{ section_num: "03", label: "الجسات والتربة" },
  "pile-testing":    { section_num: "04", label: "اختبار الخوازيق" },
  "sabkha":          { section_num: "03", label: "معالجة السبخة" },
  "concrete-grades": { section_num: "05", label: "درجات الخرسانة" },
  "hot-weather":     { section_num: "05", label: "Hot Weather Concreting" },
  "health-safety":   { section_num: "11", label: "الصحة والسلامة" },
  "quality":         { section_num: "02", label: "ضمان الجودة" },
  "landscaping":     { section_num: "28", label: "التشجير" },
  "hvac":            { section_num: "22", label: "التكييف والتهوية" },
  "maintenance":     { section_num: "31", label: "الصيانة والتأهيل" },
  "testing":         { section_num: "30", label: "الاختبار والتشغيل" },
  "general":         { section_num: "01", label: "المتطلبات العامة" },
  "railways":        { section_num: "29", label: "السكك الحديدية" },
  "electrical":      { section_num: "21", label: "الأعمال الكهربائية" },
  "masonry":         { section_num: "13", label: "أعمال البناء" },
  "roofing":         { section_num: "14", label: "أعمال الأسقف" },
  "painting":        { section_num: "26", label: "الدهانات" },
  "finishes":        { section_num: "24", label: "تشطيبات المباني" },
  "plumbing":        { section_num: "19", label: "السباكة" },
  "steelwork":       { section_num: "16", label: "الهياكل الفولاذية" },
  "environmental":   { section_num: "32", label: "الإدارة البيئية" },
};

async function searchQCSSection(sectionNum, keyword = "", limit = 20) {
  // الطلب يذهب إلى server-side proxy — لا SUPABASE_KEY في client
  const r = await fetch("/api/supabase-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sectionNum, keyword, limit })
  });
  if (!r.ok) {
    if (r.status === 429) {
      const d = await r.json().catch(() => ({}));
      throw new Error(d.message || "طلبات كثيرة — حاول بعد دقيقة");
    }
    throw new Error("Supabase proxy: " + r.status);
  }
  return r.json();
}

function createModal() {
  if (document.getElementById("supa-modal")) return;
  const m = document.createElement("div");
  m.id = "supa-modal";
  m.style.cssText = "display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(5px);overflow-y:auto;padding:20px;box-sizing:border-box;";
  m.innerHTML = `<div style="background:#0f172a;border:1px solid #1e3a5f;border-radius:16px;max-width:860px;margin:0 auto;padding:24px;direction:rtl;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div><div id="supa-title" style="font-size:19px;font-weight:bold;color:#38bdf8;"></div><div style="font-size:11px;color:#475569;margin-top:2px;">QCS 2024 · Supabase · بيانات حقيقية</div></div>
      <button onclick="document.getElementById('supa-modal').style.display='none'" style="background:#1e293b;border:1px solid #334155;color:#94a3b8;border-radius:8px;padding:6px 16px;cursor:pointer;">✕ إغلاق</button>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:14px;">
      <input id="supa-kw" placeholder="ابحث داخل القسم..." style="flex:1;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 12px;color:#e2e8f0;font-size:13px;outline:none;direction:rtl;"/>
      <button onclick="doSearch()" style="background:#0ea5e9;color:#fff;border:none;border-radius:8px;padding:8px 18px;cursor:pointer;font-weight:bold;">🔍 بحث</button>
    </div>
    <div id="supa-stats" style="background:#1e293b;border-radius:8px;padding:8px 12px;font-size:11px;color:#94a3b8;margin-bottom:12px;"></div>
    <div id="supa-body" style="display:flex;flex-direction:column;gap:10px;"></div>
  </div>`;
  m.onclick = e => { if(e.target===m) m.style.display="none"; };
  document.body.appendChild(m);
}

let _currSection = "01";
async function openSection(key, title) {
  createModal();
  const map = SECTION_MAP[key] || { section_num: "01" };
  _currSection = map.section_num;
  document.getElementById("supa-title").textContent = title || map.label || "QCS 2024";
  document.getElementById("supa-body").innerHTML = '<div style="text-align:center;padding:40px;color:#64748b;font-size:15px;">⏳ جاري التحميل...</div>';
  document.getElementById("supa-stats").textContent = "";
  document.getElementById("supa-modal").style.display = "block";
  try {
    const rows = await searchQCSSection(_currSection, "", 20);
    renderRows(rows);
  } catch(e) {
    document.getElementById("supa-body").innerHTML = '<div style="color:#f87171;text-align:center;padding:20px;">❌ ' + (window.QS?.escapeHtml(e.message) || 'خطأ في الاتصال') + '</div>';
  }
}

async function doSearch() {
  const kw = document.getElementById("supa-kw").value;
  document.getElementById("supa-body").innerHTML = '<div style="text-align:center;padding:30px;color:#64748b;">🔍 جاري البحث...</div>';
  try { renderRows(await searchQCSSection(_currSection, kw, 20)); }
  catch(e) { document.getElementById("supa-body").innerHTML = '<div style="color:#f87171;padding:16px;">❌ ' + (window.QS?.escapeHtml(e.message) || 'خطأ في البحث') + '</div>'; }
}

function renderRows(rows) {
  const b = document.getElementById("supa-body");
  const s = document.getElementById("supa-stats");
  if (!rows || !rows.length) { b.innerHTML = '<div style="text-align:center;padding:40px;color:#64748b;">📭 لا توجد نتائج</div>'; return; }
  const parts = [...new Set(rows.map(r => r.part_name))].filter(Boolean);
  s.innerHTML = rows.length + " نتيجة · " + parts.length + " part · Section " + _currSection;
  b.innerHTML = rows.map(r => '<div style="background:#1e293b;border:1px solid #1e3a5f;border-radius:10px;padding:14px;border-right:3px solid #0ea5e9;"><div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span style="color:#38bdf8;font-size:11px;font-weight:bold;">' + (r.section_name||"QCS 2024") + (r.part_name ? ' · <span style="color:#64748b">'+r.part_name+'</span>' : "") + '</span><span style="color:#475569;font-size:10px;">Page '+r.page_num+'</span></div><div style="font-size:13px;line-height:1.75;color:#cbd5e1;">'+r.content+'</div></div>').join("");
}

function guessKey(title) {
  const t = (title||"").toLowerCase();
  if (t.includes("طريق")||t.includes("road")||t.includes("إسفلت")) return "road-works";
  if (t.includes("خرسانة")||t.includes("concrete")) return "structural-code";
  if (t.includes("خازوق")||t.includes("pile")||t.includes("أساس")) return "pile-testing";
  if (t.includes("تربة")||t.includes("جسة")||t.includes("soil")) return "soil-investigation";
  if (t.includes("كهرباء")||t.includes("electrical")||t.includes("kahramaa")) return "kahramaa";
  if (t.includes("حريق")||t.includes("fire")) return "fire-safety";
  if (t.includes("صرف")||t.includes("drainage")) return "utilities";
  if (t.includes("صحة")||t.includes("سلامة")||t.includes("safety")) return "health-safety";
  if (t.includes("تشجير")||t.includes("landscape")) return "landscaping";
  if (t.includes("تكييف")||t.includes("hvac")||t.includes("ventilation")) return "hvac";
  if (t.includes("جودة")||t.includes("quality")) return "quality";
  if (t.includes("سكك")||t.includes("rail")) return "railways";
  if (t.includes("سباكة")||t.includes("plumb")) return "plumbing";
  if (t.includes("دهان")||t.includes("paint")) return "painting";
  if (t.includes("بيئ")||t.includes("environ")) return "environmental";
  return "general";
}

window.openSection = openSection;
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-section]").forEach(el => {
    el.addEventListener("click", e => { e.preventDefault(); openSection(el.dataset.section, el.dataset.title); });
  });
  document.querySelectorAll("a[href='#'], .card-link, [onclick*='section']").forEach(el => {
    if (el.dataset.section) return;
    el.addEventListener("click", e => {
      e.preventDefault();
      const card = el.closest("li, div, section");
      const title = card?.querySelector("h1,h2,h3,h4,strong,b")?.textContent?.trim() || el.textContent?.trim() || "";
      openSection(guessKey(title), title);
    });
  });
  console.log("✅ QatarSpec Supabase loaded — 18,000+ QCS chunks ready!");
});