window.ScannerGemini = (function() {
  'use strict';

  const ENDPOINT = '/api/vision-proxy';

  // ── البرومت الهندسي المطوّر v2 ─────────────────────────────
  const SYSTEM_PROMPT = `أنت مساعد هندسي خبير في تحليل صور المباني وفق QCS 2024.

مهمتك: تحليل الصورة واستخراج أبعاد وتفاصيل الغرفة بأقصى دقة ممكنة.

استراتيجية القياس:
1. ابحث عن مرجع معروف الحجم: باب معياري (0.9×2.1م)، نافذة (1.2×1.0م)، بلاطة أرضية (0.6×0.6م أو 0.3×0.3م)، مفتاح كهرباء (ارتفاع 1.2م من الأرض)، مقبس (0.3م من الأرض)
2. قِس النسب بين المرجع وأبعاد الغرفة
3. إذا شاهدت زاويتين أو أكثر فحدد الأبعاد بدقة أعلى
4. لا تخترع أرقاماً — إذا لم تستطع التحديد ضع null

أعد JSON فقط — لا نص قبله ولا بعده:
{
  "name": "اسم عربي للغرفة",
  "name_en": "English room name",
  "length": 0.0,
  "width": 0.0,
  "height": 0.0,
  "h": 0.0,
  "doors": [{"w": 0.9, "h": 2.1, "wall": "north"}],
  "windows": [{"w": 1.2, "h": 1.0, "sill_height": 0.9, "wall": "east"}],
  "floor_material": "بلاط سيراميك / رخام / خرسانة / ...",
  "wall_material": "دهان / سيراميك / حجر / ...",
  "ceiling_type": "جبس بورد / خرسانة مكشوفة / ...",
  "features": ["مكيف سبليت", "إضاءة مخفية", "..."],
  "confidence": 0.0,
  "qcs_min_area": 0.0,
  "qcs_ref": "QCS 2024 — Part X, Section X.X",
  "notes": "ملاحظات",
  "measurement_refs": "وصف المرجع المستخدم للقياس"
}

أسماء الغرف: غرفة المعيشة، غرفة النوم الرئيسية، غرفة النوم، المطبخ، الحمام، دورة المياه، الردهة، الممر، غرفة الغسيل، المخزن، غرفة الخادمة، المجلس، المكتب، الصالة، الدرج، السطح، الكراج، الحديقة`;

  // ── تحليل صورة واحدة ──────────────────────────────────────
  async function analyze(base64Image, extraContext) {
    try {
      var prompt = SYSTEM_PROMPT;
      if (extraContext) prompt += '\n\nسياق إضافي: ' + extraContext;

      var res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, prompt: prompt })
      });

      if (res.status === 429) {
        var retry = res.headers.get('Retry-After') || 60;
        window.QS3D.log('⏳ Rate limit — انتظر ' + retry + ' ثانية');
        return null;
      }

      if (!res.ok) {
        window.QS3D.log('❌ API خطأ: ' + res.status);
        return null;
      }

      var data = await res.json();
      var text = (data.text || '').replace(/```json|```/g, '').trim();
      var parsed = JSON.parse(text);

      // التحقق الأساسي
      if (!parsed.length || !parsed.width) {
        window.QS3D.log('⚠️ لم يستطع AI تحديد الأبعاد — جرب زاوية أخرى');
        return null;
      }

      // ضمان حقل h (يستخدمه المجسم)
      parsed.h = parsed.height || parsed.h || 2.8;
      parsed.height = parsed.h;

      // الحد الأدنى QCS
      if (!parsed.qcs_min_area) {
        parsed.qcs_min_area = getQCSMinArea(parsed.name);
      }

      return parsed;
    } catch (err) {
      window.QS3D.log('❌ تحليل AI: ' + err.message.slice(0, 80));
      return null;
    }
  }

  // ── تحليل مجموعة صور (batch) ───────────────────────────────
  async function analyzeBatch(imageFiles, onProgress) {
    var results = [];
    for (var i = 0; i < imageFiles.length; i++) {
      if (onProgress) onProgress(i + 1, imageFiles.length);
      window.QS3D.log('🔍 تحليل صورة ' + (i + 1) + '/' + imageFiles.length + '...');

      var base64 = await fileToBase64(imageFiles[i]);
      var context = 'صورة ' + (i + 1) + ' من ' + imageFiles.length + '. ';
      if (results.length > 0) {
        context += 'غرف سابقة: ' + results.map(function(r) { return r.name; }).join('، ');
        context += '. حاول تحديد غرفة مختلفة عن السابقة إن أمكن.';
      }

      var result = await analyze(base64, context);
      if (result) {
        // تجنب تكرار نفس الغرفة
        var dup = results.find(function(r) { return r.name === result.name; });
        if (dup) {
          // تحديث الغرفة الموجودة إذا كانت الدقة أعلى
          if (result.confidence > dup.confidence) {
            var idx = results.indexOf(dup);
            results[idx] = result;
            window.QS3D.log('🔄 تحديث: ' + result.name + ' (دقة أعلى: ' + Math.round(result.confidence * 100) + '%)');
          }
        } else {
          results.push(result);
          window.QS3D.log('✅ ' + result.name + ': ' + result.length + '×' + result.width + 'م');
        }
      }

      // تأخير بسيط لتجنب rate limit
      if (i < imageFiles.length - 1) {
        await new Promise(function(r) { setTimeout(r, 1500); });
      }
    }
    return results;
  }

  // ── استخراج frames من فيديو ─────────────────────────────────
  async function extractVideoFrames(videoFile, maxFrames) {
    maxFrames = maxFrames || 8;
    return new Promise(function(resolve, reject) {
      var video = document.createElement('video');
      video.muted = true;
      video.preload = 'auto';

      video.onloadedmetadata = function() {
        var duration = video.duration;
        var interval = duration / (maxFrames + 1);
        var frames = [];
        var currentFrame = 0;

        video.onseeked = function() {
          var canvas = document.createElement('canvas');
          canvas.width = Math.min(video.videoWidth, 1280);
          canvas.height = Math.min(video.videoHeight, 720);
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(function(blob) {
            frames.push(new File([blob], 'frame_' + currentFrame + '.jpg', { type: 'image/jpeg' }));
            currentFrame++;

            if (currentFrame >= maxFrames) {
              URL.revokeObjectURL(video.src);
              resolve(frames);
            } else {
              video.currentTime = interval * (currentFrame + 1);
            }
          }, 'image/jpeg', 0.85);
        };

        video.currentTime = interval;
      };

      video.onerror = function() {
        reject(new Error('فشل قراءة الفيديو'));
      };

      video.src = URL.createObjectURL(videoFile);
    });
  }

  // ── helpers ────────────────────────────────────────────────
  function fileToBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result.split(',')[1]); };
      reader.onerror = function() { reject(new Error('فشل قراءة الملف')); };
      reader.readAsDataURL(file);
    });
  }

  function getQCSMinArea(roomName) {
    var limits = {
      'غرفة المعيشة': 20.0, 'غرفة النوم الرئيسية': 12.0,
      'غرفة النوم': 9.0, 'المطبخ': 8.0, 'الحمام': 4.5,
      'دورة المياه': 1.8, 'المجلس': 16.0, 'المكتب': 9.0,
      'غرفة الخادمة': 6.0, 'الصالة': 15.0, 'الكراج': 15.0
    };
    return limits[roomName] || 0;
  }

  return { analyze: analyze, analyzeBatch: analyzeBatch, extractVideoFrames: extractVideoFrames, getQCSMinArea: getQCSMinArea };
})();
