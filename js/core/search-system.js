// ===== SMART SEARCH — QCS 2024 =====
const QCS_MAP = [
  { keywords: ['general','specification','requirement','عام','مواصفات'], parts: [1] },
  { keywords: ['geotech','soil','borehole','spt','investigation','جسات','soil investigation','geotechnical','كبريتات','sulphate','بورهول','sabkha','سبخة','ملوحة','تربة ملحية','مياه جوفية','groundwater','dewatering','ضخ مياه'], parts: [2] },
  { keywords: ['earthwork','excavation','fill','compaction','setting out','subgrade','سابجريد','تربة طبيعية','ردم','حفر','proctor','cbr','atterberg','كومباكشن'], parts: [3] },
  { keywords: ['concrete','rebar','formwork','precast','curing','mix design','slump','cube','مكعب','صب','تسليح','tensile','lap','cover','كفر','غطاء','اساسات','foundation','خوازيق','piles','pile','raft','لبشة','bearing','شدات','striking','قالب','سقالة','خلطة'], parts: [4] },
  { keywords: ['steel','metal','welding','bolting','structural steel'], parts: [5] },
  { keywords: ['masonry','block','brick','mortar','بناء','طوب'], parts: [6] },
  { keywords: ['waterproofing','damp proofing','tanking','عزل'], parts: [7] },
  { keywords: ['road','asphalt','paving','subgrade','subbase','binder','wearing','طرق','طريق','رصف','اسفلت','اسفالت','marshall','bitumen','بيتومين','جمف','jmf','كور','core','prime coat','tack coat','بريم','تاك','cutback','كتباك','سابيس','بيس كورس','crossfall','straightedge','skid','psv','grading','جرادينج'], parts: [8] },
  { keywords: ['external','landscape','paving external','خارجي'], parts: [9] },
  { keywords: ['roof','roofing','cladding','sheet','سقف'], parts: [10] },
  { keywords: ['window','door','curtain wall','glazing','نوافذ','أبواب'], parts: [11] },
  { keywords: ['finish','plaster','paint','floor','tile','تشطيب','دهان','بلاط'], parts: [12] },
  { keywords: ['furniture','equipment','fixture','أثاث'], parts: [13] },
  { keywords: ['electrical','cable','lighting','power','kahramaa','كهرباء'], parts: [14] },
  { keywords: ['mechanical','hvac','duct','ventilation','ac','تكييف'], parts: [15] },
  { keywords: ['plumbing','drainage','sewer','water supply','مياه الشرب','hdpe','pressure test','hydrostatic','chlorination','تعقيم','كلور','مواسير مياه','صرف صحي','foul sewer','air test','cctv','manhole','انحدار','غرفة تفتيش','بوري','uPVC','صرف سطحي','storm water','gully','مياه امطار','بالوعة','مياه معالجة','treated water','بنفسجي','ري','مرافق','utilities','شبكة','ماسورة','pipeline'], parts: [16] },
  { keywords: ['fire','sprinkler','alarm','extinguisher','qcdd','حريق','اطفاء','هيدرانت','انذار'], parts: [17] },
  { keywords: ['lift','escalator','conveyor','مصعد'], parts: [18] },
];

function getRelevantParts(query) {
  const q = query.toLowerCase();
  for (const entry of QCS_MAP) {
    if (entry.keywords.some(k => q.includes(k.toLowerCase()))) return entry.parts.slice(0,3);
  }
  return [1];
}

function setLoadingSteps(steps, activeIndex) {
  const html = steps.map((s, i) => {
    const done = i < activeIndex, active = i === activeIndex;
    const icon = done ? '✅' : active ? '<div class="spinner" style="width:14px;height:14px;border:2px solid rgba(201,168,76,0.2);border-top:2px solid var(--gold);border-radius:50%;animation:spin .8s linear infinite;display:inline-block;vertical-align:middle;"></div>' : '⏳';
    const color = done ? '#4CAF50' : active ? 'var(--gold)' : 'var(--text3)';
    return `<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:${color};margin:4px 0;">${icon} ${s}</div>`;
  }).join('');
  document.getElementById('aiAnswerText').innerHTML = `<div style="display:flex;flex-direction:column;gap:2px;">${html}</div>`;
}

function quickSearch(q) { document.getElementById('searchInput').value = q; doSearch(); }

function buildQCSPrompt(query, partNum) {
  return 'أنت خبير QCS 2024. السؤال: ' + query + '\n\nأجب مباشرة مع: ١) القيمة الدقيقة ٢) المرجع من QCS 2024 Part ' + partNum + ' ٣) أي استثناءات. أجب بالعربية بإيجاز.';
}

/**
 * البحث الذكي في QCS 2024 باستخدام Anthropic API
 * يحدد الجزء الأنسب (getRelevantParts) ثم يبني prompt (buildQCSPrompt)
 * يستخدم fetchGeminiAPI مع AbortController و15s timeout
 * Fallback: رسالة خطأ واضحة مع أسباب محتملة
 * @see fetchGeminiAPI - دالة الـ API المركزية مع timeout
 */
async function doSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  // ── MONETIZATION: Daily Search Limit ──
  if (!isProUser() && !canSearch()) {
    showUpgradePrompt(
      'search',
      '🔍',
      'استنفدت بحوثاتك اليومية',
      'الخطة المجانية تشمل ' + FREE_DAILY_LIMIT + ' بحث ذكي يومياً. اشترك في Pro للحصول على بحث غير محدود.'
    );
    return;
  }

  const isProxyMode = !window.location.hostname.includes('localhost');
  if (!isProxyMode) { openKeyModal(); return; } // local dev: show modal

  const box = document.getElementById('aiAnswerBox');
  const textEl = document.getElementById('aiAnswerText');
  const refEl = document.getElementById('aiRefText');
  const sourceEl = document.getElementById('aiSource');

  box.classList.add('show');
  box.scrollIntoView({ behavior:'smooth', block:'nearest' });

  const steps = [
    '🔍 البحث في QCS 2024 الرسمي (18,000+ صفحة)',
    'معالجة الإجابة',
    'تجهيز النتيجة'
  ];

  setLoadingSteps(steps, 0);
  sourceEl.textContent = 'QCS 2024 — جاري البحث...';

  try {
    const parts = getRelevantParts(query);
    const partNum = parts[0];
    const partsLabel = parts.join(', ');
    sourceEl.textContent = `QCS 2024 — Part ${partsLabel}`;
    setLoadingSteps(steps, 1);

    // ── Real QCS 2024 data from Supabase ──
    let qcsContext = '';
    try {
      const qcsRes = await fetch('/api/qcs-search', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        ...(getProToken() ? { 'Authorization': 'Bearer ' + getProToken() } : {})
      },
        body: JSON.stringify({ query: query, limit: 6 })
      });
      if (qcsRes.ok) {
          qsTrack('AI Search', { tier: getProToken() ? 'pro' : 'free' });
        const qcsData = await qcsRes.json();
        if (qcsData.results && qcsData.results.length > 0) {
          window._lastSearchMethod = qcsData.method || 'fts';
          qcsContext = '\n\n=== نصوص من QCS 2024 الرسمي ===\n' +
            qcsData.results.map(function(r, i) {
              return '[' + (i+1) + '] ' + (r.source||'QCS 2024') + ' | ' + (r.section||'') + ' | صفحة ' + (r.page||'') + ':\n' + (r.content||'').slice(0, 450);
            }).join('\n\n');
        }
      }
    } catch(e) { console.log('QCS search:', e.message); }

    const response = await fetchGeminiAPI({
        model: 'gemini-2.0-flash',
        max_tokens: 2000,
        system: `أنت مرجع هندسي رسمي لـ Qatar Construction Specifications (QCS 2024) — المواصفات القطرية للإنشاءات الإصدار الرابع.

هيكل QCS 2024:
• Part 1 (Section 1): متطلبات عامة وإدارة المشروع
• Part 2: إدارة الموقع والسلامة والصحة المهنية
• Part 3: أعمال التربة والحفر والردم والخوازيق
• Part 4: الخرسانة والأعمال الإنشائية الخرسانية
• Part 5: الهياكل الفولاذية والمعدنية
• Part 6: الطرق والرصف والأسفلت وكود الطريق
• Part 7: أعمال الصرف الصحي والصرف السطحي
• Part 8: أعمال المياه والشبكات
• Part 9: الكهرباء والإضاءة والاتصالات
• Part 10-12: الميكانيكا والتكييف والحريق والسلامة

قواعد الإجابة:
1. ابدأ مباشرة بالإجابة — لا مقدمات ولا تحيات
2. اذكر دائماً: القيمة الدقيقة | Part رقم | Section | Clause | الجدول إن وُجد
3. أضف الاستثناءات والشروط الخاصة إن وُجدت
4. إذا كانت المعلومات غير متوفرة في السياق، وضّح ذلك بدلاً من التخمين
5. الأولوية للنصوص الواردة في سياق Supabase أدناه
6. في نهاية كل إجابة أضف: **📌 المراجع:** ثم اذكر QCS Part + Section + Clause لكل معلومة
7. استخدم هذا التنسيق للاستشهاد: [QCS S6 P5 — Cl.3.2] أو [KAHRAMAA WR-001]
8. إذا وجدت تعارضاً بين مصدرين، نبّه المستخدم بوضوح` + qcsContext,
        messages: [{ role: 'user', content: query }]
    });

    // ── Track search usage ──
    if (!isProUser()) { incrementSearch(); updateSearchCounterBar(); }

    setLoadingSteps(steps, 2);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || err.error || `خطأ ${response.status}`);
    }

    const data = await response.json();
    const answer = (data.content && data.content[0] && data.content[0].text) || 'لم أجد إجابة.';

    // [SEC-FIX #2] safeRender — DOM construction بدون innerHTML
    safeRender(textEl, answer);
    // Show search method badge
    const methodBadge = window._lastSearchMethod === 'vector'
      ? ' | 🧠 بحث ذكي (Vector)'
      : window._lastSearchMethod === 'fts' ? ' | 🔤 بحث نصي (FTS)' : '';
    refEl.textContent = `📖 المرجع: QCS 2024 — Part ${partsLabel}${methodBadge} | راجع المواصفة الأصلية للتأكد`;
    sourceEl.textContent = `QCS 2024 — Part ${partsLabel}`;

  } catch (err) {
    const msg = err.message || 'خطأ غير معروف';
    if (msg.includes('401') || msg.includes('key') || msg.includes('auth')) {
      safeRender(textEl, '❌ **مشكلة في الـ API Key** — اضغط على "إعداد AI" في الأعلى وتأكد من صحة الـ Key.');
      updateKeyStatus(false);
    } else if (msg.includes('429')) {
      safeRender(textEl, '⏳ **تجاوزت حد الطلبات** — انتظر دقيقة واحدة ثم أعد المحاولة.');
    } else {
      safeRender(textEl, '❌ **خطأ:** ' + msg);
    }
    refEl.textContent = '';
  }
}

function copyAnswer() {
  const text = document.getElementById('aiAnswerText').innerText;
  navigator.clipboard.writeText(text).then(() => showToast('✅ تم نسخ الإجابة'));
}

// ===== CARD FILTER (Live Search) =====
function filterCards(query) {
  const q = query.trim().toLowerCase();
  const cards = document.querySelectorAll('.cat-card');
  const clearBtn = document.getElementById('cardFilterClear');
  const countEl = document.getElementById('cardFilterCount');
  const groups = document.querySelectorAll('.section-group');

  clearBtn.style.display = q ? 'block' : 'none';

  let visible = 0;
  cards.forEach(card => {
    const name = (card.querySelector('.cat-name') || card).textContent.toLowerCase();
    const desc = (card.querySelector('.cat-desc') || card).textContent.toLowerCase();
    const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
    const match = !q || name.includes(q) || desc.includes(q) || keywords.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  // show/hide group headers based on whether they have visible cards
  groups.forEach(group => {
    const anyVisible = [...group.querySelectorAll('.cat-card')].some(c => c.style.display !== 'none');
    group.style.display = anyVisible ? '' : 'none';
  });

  if (q) {
    countEl.style.display = 'block';
    countEl.textContent = visible > 0 ? `✅ ${visible} نتيجة للبحث عن "${query}"` : `❌ لا توجد نتائج لـ "${query}"`;
  } else {
    countEl.style.display = 'none';
    groups.forEach(g => g.style.display = '');
  }
}

function clearCardFilter() {
  document.getElementById('cardFilterInput').value = '';
  filterCards('');
}

