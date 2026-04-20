// api/search.js — QatarSpec Pro
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8',
};

const QCS_DATA = [
  { id: 'S01-001', section: 'QCS Section 01', topic: 'متطلبات عامة', question: 'ما هي متطلبات التوثيق في مرحلة ما قبل البناء؟', answer: 'وفقاً لـ QCS Section 01, البند 1.2.1، يجب تقديم خطة إدارة المشروع، وبرنامج زمني تفصيلي، وخطة ضمان الجودة قبل البدء بأي أعمال إنشائية.', keywords: ['توثيق', 'ما قبل البناء', 'متطلبات', 'خطة', 'ضمان الجودة'] },
  { id: 'S01-002', section: 'QCS Section 01', topic: 'ضمان الجودة', question: 'ما هي اشتراطات خطة ضمان الجودة QA/QC؟', answer: 'وفقاً لـ QCS Section 01, البند 1.5.2، يجب أن تشمل خطة الجودة: إجراءات الفحص والاختبار، سجلات المواد، وتقارير عدم المطابقة (NCR).', keywords: ['جودة', 'QA', 'QC', 'ضمان الجودة', 'NCR', 'فحص', 'اختبار'] },
  { id: 'S01-003', section: 'QCS Section 01', topic: 'إدارة المشروع', question: 'ما هو البرنامج الزمني المطلوب للمشاريع؟', answer: 'وفقاً لـ QCS Section 01, البند 1.3.1، يجب تقديم البرنامج الزمني بصيغة Gantt Chart أو CPM خلال 14 يوم من استلام أمر البدء.', keywords: ['برنامج زمني', 'جانت', 'CPM', 'إدارة مشروع', 'أمر البدء'] },
  { id: 'S01-004', section: 'QCS Section 01', topic: 'سلامة الموقع', question: 'ما هي اشتراطات السلامة في الموقع؟', answer: 'وفقاً لـ QCS Section 01, البند 1.8.1، يجب توفير مدير سلامة معتمد في المشاريع التي تزيد قيمتها عن 5 مليون ريال قطري، وتقديم خطة HSE شاملة.', keywords: ['سلامة', 'HSE', 'موقع', 'أمان', 'حماية'] },
  { id: 'S01-005', section: 'QCS Section 01', topic: 'متطلبات بيئية', question: 'ما هي الاشتراطات البيئية العامة في مشاريع البناء بقطر؟', answer: 'وفقاً لـ QCS Section 01, البند 1.9.3، يجب الحصول على تقييم الأثر البيئي (EIA) للمشاريع الكبرى.', keywords: ['بيئة', 'EIA', 'أثر بيئي', 'وزارة البيئة', 'لوائح'] },
  { id: 'S05-001', section: 'QCS Section 05', topic: 'الغطاء الخرساني', question: 'ما هو الغطاء الخرساني للأساسات؟', answer: 'وفقاً لـ QCS Section 05, البند 5.3.2، الغطاء الخرساني للأساسات المباشرة على التربة لا يقل عن 75 مم.', keywords: ['غطاء خرساني', 'concrete cover', 'أساسات', 'تسليح', 'cover'] },
  { id: 'S05-002', section: 'QCS Section 05', topic: 'مقاومة الضغط', question: 'ما هي أدنى مقاومة ضغط للخرسانة الإنشائية؟', answer: 'وفقاً لـ QCS Section 05, البند 5.2.1، الحد الأدنى لمقاومة الضغط المكعبي C25 (25 MPa)، وC30 في البيئات المعرضة للكبريتات.', keywords: ['مقاومة ضغط', 'خرسانة', 'fcu', 'MPa', 'C25', 'C30'] },
  { id: 'S05-003', section: 'QCS Section 05', topic: 'نسبة الماء للإسمنت', question: 'ما هي أقصى نسبة ماء/إسمنت للخرسانة؟', answer: 'وفقاً لـ QCS Section 05, البند 5.2.3، أقصى نسبة ماء/إسمنت للخرسانة العادية 0.55، وفي البيئات الكيميائية الشديدة 0.40.', keywords: ['نسبة ماء', 'w/c ratio', 'إسمنت', 'water cement', 'خرسانة'] },
  { id: 'S05-004', section: 'QCS Section 05', topic: 'الهبوط', question: 'ما هو الهبوط المسموح به للخرسانة؟', answer: 'وفقاً لـ QCS Section 05, البند 5.4.1، الهبوط المسموح به: 25-75 مم للخرسانة العادية، و75-125 مم للخرسانة المدمجة بالاهتزاز.', keywords: ['هبوط', 'slump', 'قابلية التشغيل', 'workability', 'صب'] },
  { id: 'S05-005', section: 'QCS Section 05', topic: 'المعالجة', question: 'ما هي فترة معالجة الخرسانة المطلوبة؟', answer: 'وفقاً لـ QCS Section 05, البند 5.7.2، يجب معالجة الخرسانة لمدة لا تقل عن 7 أيام للإسمنت البورتلاندي العادي.', keywords: ['معالجة', 'curing', 'خرسانة', 'أيام', 'إسمنت'] },
  { id: 'S05-006', section: 'QCS Section 05', topic: 'الصب في الحرارة', question: 'ما هي اشتراطات صب الخرسانة في الجو الحار؟', answer: 'وفقاً لـ QCS Section 05, البند 5.5.3، يجب ألا تتجاوز حرارة الخرسانة عند الصب 35°م.', keywords: ['حرارة', 'جو حار', 'hot weather', 'صب', 'درجة حرارة'] },
  { id: 'S05-007', section: 'QCS Section 05', topic: 'الفولاذ التسليحي', question: 'ما هي مواصفات حديد التسليح في قطر؟', answer: 'وفقاً لـ QCS Section 05, البند 5.8.1، يجب أن يكون حديد التسليح مطابقاً لمواصفة BS 4449 الدرجة 500B.', keywords: ['حديد تسليح', 'rebar', 'BS 4449', 'steel', 'فولاذ', '500B'] },
  { id: 'S05-008', section: 'QCS Section 05', topic: 'اختبارات الخرسانة', question: 'كم عدد عينات الخرسانة المطلوبة؟', answer: 'وفقاً لـ QCS Section 05, البند 5.6.2، يجب أخذ عينة لكل 50 م³ من الخرسانة أو كل يوم صب. كل عينة تشمل 6 مكعبات.', keywords: ['عينات', 'مكعبات', 'اختبار', 'cube test', 'خرسانة'] },
  { id: 'S05-009', section: 'QCS Section 05', topic: 'حماية الخرسانة', question: 'ما هي اشتراطات الخرسانة في البيئة الكيميائية؟', answer: 'وفقاً لـ QCS Section 05, البند 5.2.5، في المناطق ذات الكبريتات العالية يجب استخدام إسمنت مقاوم للكبريتات (SRPC).', keywords: ['كبريتات', 'sulfate', 'SRPC', 'بيئة كيميائية', 'حماية'] },
  { id: 'S05-010', section: 'QCS Section 05', topic: 'القوالب', question: 'ما هي اشتراطات قوالب الخرسانة وتفكيكها؟', answer: 'وفقاً لـ QCS Section 05, البند 5.9.1، لا يُفكك الشدة الجانبي للأعمدة قبل 24 ساعة، وسقف البلاطات لا يُفكك قبل 14 يوماً.', keywords: ['قوالب', 'شدة', 'formwork', 'تفكيك', 'stripping', 'أعمدة', 'بلاطات'] },
  { id: 'S06-001', section: 'QCS Section 06', topic: 'الدمك Subbase', question: 'نسب الدمك للـ Subbase', answer: 'وفقاً لـ QCS Section 06, البند 6.4.1، نسبة الدمك للطبقة الأساسية لا تقل عن 98% MDD.', keywords: ['دمك', 'subbase', 'compaction', 'MDD', 'proctor', 'طبقة أساسية'] },
  { id: 'S06-002', section: 'QCS Section 06', topic: 'اشتراطات الأسفلت', question: 'اشتراطات الإسفلت في قطر', answer: 'وفقاً لـ QCS Section 06, البند 6.6.2، طبقة الأسفلت الرابطة لا تقل عن 60 مم، والطبقة السطحية لا تقل عن 40 مم.', keywords: ['إسفلت', 'asphalt', 'binder course', 'wearing course', 'طريق', 'رصف'] },
  { id: 'S06-003', section: 'QCS Section 06', topic: 'الطبقة الأساسية', question: 'ما هي اشتراطات طبقة الـ Road Base؟', answer: 'وفقاً لـ QCS Section 06, البند 6.3.2، نسبة دمك الطبقة الأساسية لا تقل عن 100% MDD، وقيمة CBR لا تقل عن 80%.', keywords: ['road base', 'طبقة أساسية', 'CBR', 'دمك', 'base course'] },
  { id: 'S06-004', section: 'QCS Section 06', topic: 'درجة حرارة الأسفلت', question: 'ما هي درجة حرارة فرد الأسفلت؟', answer: 'وفقاً لـ QCS Section 06, البند 6.6.5، يجب فرد خلطة الأسفلت عند لا تقل عن 130°م، ودمكها عند لا تقل عن 110°م.', keywords: ['درجة حرارة', 'أسفلت', 'فرد', 'دمك', 'temperature', 'laying'] },
  { id: 'S06-005', section: 'QCS Section 06', topic: 'الاستقرارية المارشال', question: 'ما هي قيمة الاستقرارية المارشال المطلوبة؟', answer: 'وفقاً لـ QCS Section 06, البند 6.5.3، قيمة Marshall Stability لطبقة Wearing Course لا تقل عن 8.5 kN.', keywords: ['مارشال', 'marshall', 'stability', 'استقرارية', 'أسفلت'] },
  { id: 'S06-006', section: 'QCS Section 06', topic: 'الحواجز والأرصفة', question: 'ما هي أبعاد الرصيف القياسية في قطر؟', answer: 'وفقاً لـ QCS Section 06, البند 6.9.1، العرض الأدنى للرصيف 2.5 م، والارتفاع القياسي لـ Jersey Barrier 810 مم.', keywords: ['رصيف', 'sidewalk', 'حاجز', 'Jersey', 'أبعاد', 'طريق'] },
  { id: 'S06-007', section: 'QCS Section 06', topic: 'الدراسة الجيوتقنية', question: 'ما هي اشتراطات التربة تحت الطريق؟', answer: 'وفقاً لـ QCS Section 06, البند 6.2.1، تربة الطريق (Subgrade) بنسبة دمك لا تقل عن 95% MDD وقيمة CBR لا تقل عن 5%.', keywords: ['تربة', 'subgrade', 'CBR', 'طريق', 'geotechnical', 'جيوتقني'] },
  { id: 'S08-001', section: 'QCS Section 08', topic: 'أنابيب المياه', question: 'ما هي أعماق دفن أنابيب المياه؟', answer: 'وفقاً لـ QCS Section 08, البند 8.3.1، الحد الأدنى لعمق الدفن لأنابيب مياه الشرب 900 مم.', keywords: ['أنابيب مياه', 'عمق دفن', 'water pipe', 'burial depth', 'مياه شرب'] },
  { id: 'S08-002', section: 'QCS Section 08', topic: 'الكابلات الكهربائية', question: 'ما هو عمق دفن الكابلات الكهربائية؟', answer: 'وفقاً لـ QCS Section 08, البند 8.5.2، عمق دفن كابلات الضغط المنخفض لا يقل عن 600 مم، والضغط العالي لا يقل عن 900 مم.', keywords: ['كابلات', 'كهرباء', 'دفن', 'burial', 'electrical', 'ضغط عالي', 'ضغط منخفض'] },
  { id: 'S08-003', section: 'QCS Section 08', topic: 'الفواصل بين المرافق', question: 'ما هي الفواصل المطلوبة بين شبكات المرافق؟', answer: 'وفقاً لـ QCS Section 08, البند 8.2.1، الفاصل الأدنى: 300 مم بين مياه وصرف، 500 مم بين مياه وكهرباء، 1000 مم بين غاز وكهرباء.', keywords: ['فواصل', 'separation', 'مرافق', 'utilities', 'مياه', 'صرف', 'كهرباء', 'غاز'] },
  { id: 'S08-004', section: 'QCS Section 08', topic: 'غرف التفتيش', question: 'ما هي أبعاد غرف التفتيش للمرافق؟', answer: 'وفقاً لـ QCS Section 08, البند 8.4.3، الحد الأدنى لأبعاد غرفة التفتيش 1200×1200 مم، وارتفاعها لا يقل عن 2000 مم.', keywords: ['غرفة تفتيش', 'manhole', 'chamber', 'أبعاد', 'utility'] },
  { id: 'S08-005', section: 'QCS Section 08', topic: 'أنابيب الغاز', question: 'ما هي اشتراطات أنابيب الغاز الطبيعي؟', answer: 'وفقاً لـ QCS Section 08, البند 8.6.1، تُستخدم أنابيب PE100 بضغط 4 bar، بعمق دفن لا يقل عن 750 مم.', keywords: ['غاز', 'gas', 'PE100', 'أنابيب', 'شريط تحذيري'] },
  { id: 'S08-006', section: 'QCS Section 08', topic: 'اختبار ضغط الأنابيب', question: 'كيف يتم اختبار ضغط شبكات المياه؟', answer: 'وفقاً لـ QCS Section 08, البند 8.3.4، يُجرى اختبار الضغط لمدة 24 ساعة بضغط لا يقل عن 1.5 مرة ضغط التشغيل.', keywords: ['اختبار ضغط', 'hydrostatic', 'pressure test', 'مياه', 'شبكة'] },
  { id: 'S09-001', section: 'QCS Section 09', topic: 'أنابيب الصرف الصحي', question: 'ما هي أنواع أنابيب الصرف الصحي المسموح بها؟', answer: 'وفقاً لـ QCS Section 09, البند 9.2.1، الأنابيب المعتمدة: UPVC (BS 4660) للأقطار 100-300 مم، وGRP للأقطار الأكبر.', keywords: ['صرف صحي', 'أنابيب', 'UPVC', 'GRP', 'VCP', 'sewage'] },
  { id: 'S09-002', section: 'QCS Section 09', topic: 'انحدار الصرف', question: 'ما هو أدنى انحدار لأنابيب الصرف الصحي؟', answer: 'وفقاً لـ QCS Section 09, البند 9.3.2، الحد الأدنى للانحدار: 1:80 للأنابيب 150 مم، و1:150 للأنابيب 225 مم، و1:300 للأنابيب 300 مم فأكثر.', keywords: ['انحدار', 'gradient', 'slope', 'صرف صحي', 'أنابيب'] },
  { id: 'S09-003', section: 'QCS Section 09', topic: 'أغطية المناهل', question: 'ما هي اشتراطات أغطية المناهل؟', answer: 'وفقاً لـ QCS Section 09, البند 9.5.1، أغطية المناهل من الحديد الزهر، درجة D400 في الطرق، وB125 في المشاة، مطابقة لـ BS EN 124.', keywords: ['غطاء منهل', 'manhole cover', 'حديد زهر', 'D400', 'B125'] },
  { id: 'S09-004', section: 'QCS Section 09', topic: 'مضخات الصرف', question: 'ما هي اشتراطات محطات ضخ الصرف الصحي؟', answer: 'وفقاً لـ QCS Section 09, البند 9.7.2، يجب توفير مضختين على الأقل (تشغيل + احتياط) في محطات الضخ.', keywords: ['مضخة', 'pump', 'محطة ضخ', 'pump station', 'صرف صحي', 'احتياط'] },
  { id: 'S09-005', section: 'QCS Section 09', topic: 'صرف الأمطار', question: 'ما هي اشتراطات شبكة صرف مياه الأمطار؟', answer: 'وفقاً لـ QCS Section 09, البند 9.9.1، يُصمم نظام صرف الأمطار لاستيعاب هطول مطري بمعدل تكرار 10 سنوات.', keywords: ['أمطار', 'storm water', 'stormwater', 'صرف', 'هطول مطري'] },
  { id: 'S09-006', section: 'QCS Section 09', topic: 'اختبار إحكام الأنابيب', question: 'كيف يتم اختبار إحكام أنابيب الصرف الصحي؟', answer: 'وفقاً لـ QCS Section 09, البند 9.4.3، معدل التسرب المسموح به لا يتجاوز 0.1 ليتر/مم قطر/كم/ساعة.', keywords: ['اختبار', 'إحكام', 'تسرب', 'infiltration', 'water tightness', 'صرف'] },
  { id: 'S15-001', section: 'QCS Section 15', topic: 'أنظمة التكييف', question: 'ما هي اشتراطات أنظمة HVAC في قطر؟', answer: 'وفقاً لـ QCS Section 15, البند 15.2.1، يجب تصميم أنظمة التكييف وفق ASHRAE 90.1، مع درجة حرارة تصميم 46°م جافة، 30°م رطبة.', keywords: ['تكييف', 'HVAC', 'ASHRAE', 'cooling', 'درجة حرارة', 'تصميم'] },
  { id: 'S15-002', section: 'QCS Section 15', topic: 'أنظمة الإطفاء', question: 'ما هي اشتراطات نظام رشاشات الإطفاء؟', answer: 'وفقاً لـ QCS Section 15, البند 15.8.2، يجب تصميم أنظمة الرشاشات وفق NFPA 13، وتغطية كل رشاش مساحة لا تتجاوز 9 م².', keywords: ['إطفاء', 'رشاشات', 'sprinkler', 'NFPA 13', 'fire suppression', 'حريق'] },
  { id: 'S15-003', section: 'QCS Section 15', topic: 'السباكة الداخلية', question: 'ما هي اشتراطات السباكة الداخلية؟', answer: 'وفقاً لـ QCS Section 15, البند 15.5.1، يجب توفير فتحات التهوية لجميع أجهزة الصرف، وقطر الأنبوب الرئيسي لا يقل عن 100 مم.', keywords: ['سباكة', 'plumbing', 'صرف داخلي', 'vent pipe', 'تهوية', 'أنابيب'] },
  { id: 'S15-004', section: 'QCS Section 15', topic: 'ضغط الماء', question: 'ما هو ضغط مياه الشرب في المباني؟', answer: 'وفقاً لـ QCS Section 15, البند 15.4.2، الحد الأدنى 1 bar عند أبعد نقطة، والحد الأقصى 5 bar.', keywords: ['ضغط ماء', 'water pressure', 'مباني', 'bar', 'kPa', 'مياه شرب'] },
  { id: 'S15-005', section: 'QCS Section 15', topic: 'العزل الحراري', question: 'ما هي اشتراطات العزل الحراري لأنابيب الميكانيكية؟', answer: 'وفقاً لـ QCS Section 15, البند 15.3.4، سماكة العزل لا تقل عن 25 مم للأنابيب حتى 50 مم قطر، و50 مم للأنابيب الأكبر.', keywords: ['عزل', 'insulation', 'أنابيب', 'حراري', 'thermal', 'تبريد', 'تدفئة'] },
  { id: 'S15-006', section: 'QCS Section 15', topic: 'تدفق الهواء', question: 'ما هو معدل تجديد الهواء المطلوب في المكاتب؟', answer: 'وفقاً لـ QCS Section 15, البند 15.2.5، معدل تجديد الهواء النقي في المكاتب: 10 ليتر/ثانية/شخص كحد أدنى.', keywords: ['هواء', 'تجديد هواء', 'ventilation', 'air change', 'ACH', 'مكاتب'] },
  { id: 'S15-007', section: 'QCS Section 15', topic: 'أنظمة LPG', question: 'ما هي اشتراطات أنظمة الغاز LPG في المباني؟', answer: 'وفقاً لـ QCS Section 15, البند 15.6.1، يُخزّن LPG في خزانات خارجية على بعد لا يقل عن 3 م من المبنى.', keywords: ['LPG', 'غاز', 'خزانات', 'gas cylinder', 'صمام أمان', 'كاشف غاز'] },
];

function searchKnowledgeBase(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/);
  const scored = QCS_DATA.map((item) => {
    let score = 0;
    const haystack = [item.question, item.answer, item.topic, item.section, ...(item.keywords || [])].join(' ').toLowerCase();
    if (haystack.includes(q)) score += 10;
    if (q.includes('section') || q.includes('قسم')) { const secNum = q.match(/\d+/)?.[0]; if (secNum && item.section.includes(secNum)) score += 5; }
    for (const kw of item.keywords || []) { if (q.includes(kw.toLowerCase())) score += 3; }
    for (const word of words) { if (word.length >= 2 && haystack.includes(word)) score += 1; }
    return { ...item, score };
  });
  return scored.filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 20);
}

export default async function handler(req, res) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'Invalid JSON' }); }

  const query = (body?.query || body?.q || '').trim();
  if (!query || query.length < 2) return res.status(400).json({ error: 'يرجى إدخال نص للبحث', results: [] });

  const results = searchKnowledgeBase(query);
  return res.status(200).json({ success: true, query, count: results.length, total_records: QCS_DATA.length, results: results.map(({ score, ...r }) => r) });
}
