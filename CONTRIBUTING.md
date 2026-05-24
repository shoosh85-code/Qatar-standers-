# المساهمة في QatarSpec Pro

شكراً لاهتمامك بالمساهمة! QatarSpec Pro يخدم مهندسي قطر والعاملين في مشاريع البنية التحتية.

## كيف تساهم

### تصحيح بيانات QCS
إذا وجدت خطأ في أرقام QCS 2024:
1. افتح Issue بعنوان `[QCS-FIX] §S[رقم] - وصف الخطأ`
2. اذكر: الرقم الخاطئ + الرقم الصحيح + رقم الصفحة في QCS 2024

### إضافة محتوى جديد
1. Fork الـ repo
2. أنشئ branch: `feature/add-[اسم-الميزة]`
3. التزم بـ Vanilla JS — لا frameworks
4. أضف مرجع QCS لكل رقم هندسي
5. افتح Pull Request

### قواعد الكود
- Vanilla JS فقط (لا React/Vue/Angular)
- تعليقات بالعربية للمنطق المعقد
- `const/let` فقط — لا `var`
- Sanitize كل user input قبل innerHTML
- `window.QS` namespace للـ public functions

## معايير QCS
كل رقم هندسي يجب أن يكون:
✅ مستند لـ QCS 2024 بـ `§Part-Section-Clause`
✅ محدد بـ ±tolerance حيث ينطبق
✅ مُراجع من مهندس ميداني
❌ لا تخترع أرقاماً — قل "غير موجود في المستند"

## بنية المشروع
```
/api          — Vercel Serverless Functions (Node.js)
/js           — Frontend JavaScript (Vanilla)
/lib          — Shared utilities (rate-limit, retry, security)
/css          — Stylesheets
/partials     — HTML partials (injected by partials-loader.js)
/legal        — Legal pages (terms, privacy)
/data_content*.js — QCS reference data
```

## تواصل
- Issues للأخطاء والاقتراحات
- Email: support@qatarspec.app
