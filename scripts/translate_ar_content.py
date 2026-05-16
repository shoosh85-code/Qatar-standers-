#!/usr/bin/env python3
"""
QatarSpec Pro — سكريبت الترجمة الشامل v1.0
الهدف: ترجمة كل lang-content-ar من الإنجليزية إلى العربية
المصدر: lang-content-en (المحتوى الإنجليزي الصحيح)
الناتج: lang-content-ar (محتوى عربي كامل)
API: Gemini 1.5 Flash

الاستخدام:
    python3 translate_ar_content.py --key YOUR_GEMINI_API_KEY [--file roads] [--dry-run]

الملاحظات:
    - يحافظ على كل HTML tags تماماً
    - يحافظ على الأرقام والوحدات الهندسية
    - يحافظ على مصطلحات QCS / KAHRAMAA / Ashghal
    - يُترجم النصوص فقط (داخل tags)
"""

import re
import sys
import os
import time
import json
import argparse
import urllib.request
import urllib.error

# ═══════════════════════════════════════════════════════════
# CONFIG
# ═══════════════════════════════════════════════════════════

DATA_FILES = {
    'roads':      'data_content_roads.js',
    'utilities':  'data_content_utilities.js',
    'structural': 'data_content_structural.js',
    'geotech':    'data_content_geotech.js',
    'phase4':     'data_content_phase4.js',
    'extra':      'data_content_extra.js',
}

GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

SYSTEM_PROMPT = """أنت مترجم هندسي متخصص في مواصفات قطر (QCS 2024) وأشغال الطرق والبنية التحتية.

مهمتك: ترجمة HTML من الإنجليزية إلى العربية مع الحفاظ على:
1. كل HTML tags (<h3>, <table>, <tr>, <td>, <th>, <div>, <p>, <strong>, <span>) كما هي تماماً
2. كل attributes في الـ HTML (style, class, onclick, etc.)
3. الأرقام والوحدات الهندسية: CBR, MPa, kN, m/km, %, mm, etc.
4. المصطلحات التقنية الدولية: Marshall, Superpave, SGC, IRI, TMD, etc.
5. أكواد المواصفات: QCS 2024 §S8, AASHTO T315, ASTM D2172, etc.
6. الإيموجي كما هي
7. رموز JavaScript مثل: QS.openDetail('...')

قواعد الترجمة:
- ترجم النصوص العربية الواضحة فقط (المحتوى داخل tags)
- اترك المصطلحات التقنية بالإنجليزية إذا لم يكن لها مقابل عربي دقيق
- استخدم المصطلحات العربية الهندسية الصحيحة
- النص العربي يكون من اليمين لليسار

مثال:
الإدخال: <h3>Subgrade Compaction</h3>
الناتج: <h3>دمك طبقة الأساس (Subgrade)</h3>

مثال:
الإدخال: <td>Marshall Stability ≥ 8.0 kN</td>
الناتج: <td>صلابة مارشال ≥ 8.0 كيلونيوتن (kN)</td>

مثال:
الإدخال: <td>Air Voids Design</td>
الناتج: <td>الفراغات الهوائية (Air Voids)</td>

أرجع HTML المُترجَم فقط بدون أي تعليق أو شرح. لا تضع markdown. فقط HTML مباشرة."""


# ═══════════════════════════════════════════════════════════
# GEMINI API CALL
# ═══════════════════════════════════════════════════════════

def call_gemini(api_key: str, html_content: str, section_title: str = "") -> str:
    """Call Gemini API to translate HTML content to Arabic."""
    
    user_msg = f"""سياق القسم: {section_title}

ترجم HTML التالي من الإنجليزية إلى العربية:

{html_content}"""

    payload = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_msg}]
            }
        ],
        "generationConfig": {
            "temperature": 0.1,
            "maxOutputTokens": 8192,
        }
    }

    url = f"{GEMINI_URL}?key={api_key}"
    data = json.dumps(payload).encode('utf-8')
    
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            text = result['candidates'][0]['content']['parts'][0]['text']
            # Clean any markdown wrapping
            text = re.sub(r'^```html?\n?', '', text.strip())
            text = re.sub(r'\n?```$', '', text.strip())
            return text.strip()
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise Exception(f"Gemini API Error {e.code}: {error_body[:500]}")


# ═══════════════════════════════════════════════════════════
# CONTENT EXTRACTION
# ═══════════════════════════════════════════════════════════

def extract_sections_needing_translation(content: str):
    """
    Extract sections where lang-content-ar is English-dominant.
    Returns list of (start_idx, end_idx, ar_block, en_block, section_key)
    """
    results = []
    
    # Pattern: find c["key"] = { title: 'xxx', content: `...` }
    # Inside content: find pairs of lang-content-ar and lang-content-en
    
    # Split content by section definitions
    section_pattern = re.compile(
        r'c\["([^"]+)"\]\s*=\s*\{\s*title:\s*[\'"]([^\'"]*)[\'"],\s*content:\s*`(.*?)`\s*\}',
        re.DOTALL
    )
    
    for section_match in section_pattern.finditer(content):
        key = section_match.group(1)
        title = section_match.group(2)
        section_content = section_match.group(3)
        section_start = section_match.start()
        
        # Find lang-content-ar and lang-content-en pairs in this section
        ar_pattern = re.compile(
            r'(<div class="lang-content-ar">)(.*?)(</div>)\s*\n\s*(<div class="lang-content-en" style="display:none;">)(.*?)(</div>)',
            re.DOTALL
        )
        
        for pair_match in ar_pattern.finditer(section_content):
            ar_content = pair_match.group(2)
            en_content = pair_match.group(5)
            
            # Check if ar_content is English-dominant
            arabic_chars = len(re.findall(r'[\u0600-\u06FF]', ar_content))
            english_chars = len(re.findall(r'[a-zA-Z]', ar_content))
            total = arabic_chars + english_chars
            
            if total > 50 and (total == 0 or english_chars / total > 0.4):
                results.append({
                    'key': key,
                    'title': title,
                    'ar_content': ar_content,
                    'en_content': en_content,
                    'ar_original_block': pair_match.group(0),
                    'ar_prefix': pair_match.group(1),
                    'ar_suffix': pair_match.group(3),
                    'en_prefix': pair_match.group(4),
                    'en_suffix': pair_match.group(6),
                })
    
    return results


def is_english_dominant(html: str) -> bool:
    """Check if HTML block is mostly English text."""
    # Remove HTML tags
    text_only = re.sub(r'<[^>]+>', ' ', html)
    arabic = len(re.findall(r'[\u0600-\u06FF]', text_only))
    english = len(re.findall(r'[a-zA-Z]', text_only))
    total = arabic + english
    if total < 50:
        return False
    return english / total > 0.4


# ═══════════════════════════════════════════════════════════
# TRANSLATION PROCESSOR
# ═══════════════════════════════════════════════════════════

def process_file(filepath: str, api_key: str, dry_run: bool = False, 
                 section_filter: str = None, delay: float = 1.5):
    """
    Process a single data file: find English-dominant AR blocks, translate them.
    """
    print(f"\n{'='*60}")
    print(f"📂 Processing: {filepath}")
    print('='*60)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Extract sections needing translation
    sections = extract_sections_needing_translation(content)
    
    if not sections:
        print("✅ No sections need translation in this file.")
        return 0
    
    print(f"🔍 Found {len(sections)} sections needing translation")
    
    translated_count = 0
    
    for i, section in enumerate(sections):
        key = section['key']
        
        # Apply filter if specified
        if section_filter and section_filter not in key:
            continue
        
        print(f"\n[{i+1}/{len(sections)}] 🔄 Translating: {key}")
        print(f"    Title: {section['title'][:60]}")
        
        en_content = section['en_content']
        
        if dry_run:
            print(f"    [DRY RUN] Would translate {len(en_content)} chars")
            translated_count += 1
            continue
        
        try:
            # Call Gemini to translate
            arabic_html = call_gemini(api_key, en_content, section['title'])
            
            # Build replacement block
            old_block = section['ar_original_block']
            new_block = (
                section['ar_prefix'] + '\n' +
                arabic_html + '\n' +
                section['ar_suffix'] + '\n' +
                section['en_prefix'] +
                en_content +
                section['en_suffix']
            )
            
            # Replace in content
            if old_block in content:
                content = content.replace(old_block, new_block, 1)
                translated_count += 1
                print(f"    ✅ Translated ({len(arabic_html)} chars Arabic output)")
            else:
                print(f"    ⚠️  Could not locate block in file — skipping")
            
            # Rate limiting delay
            time.sleep(delay)
            
        except Exception as e:
            print(f"    ❌ ERROR: {e}")
            print(f"    → Skipping this section, continuing...")
            time.sleep(delay * 2)  # Extra delay on error
    
    # Write back if changes were made
    if not dry_run and content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n💾 Saved: {filepath} ({translated_count} sections translated)")
    elif dry_run:
        print(f"\n[DRY RUN] Would save {translated_count} translations")
    else:
        print(f"\n⚠️ No changes made to {filepath}")
    
    return translated_count


# ═══════════════════════════════════════════════════════════
# PROGRESS TRACKER
# ═══════════════════════════════════════════════════════════

class ProgressTracker:
    """Track translation progress across runs."""
    
    PROGRESS_FILE = '.translation_progress.json'
    
    @classmethod
    def load(cls):
        if os.path.exists(cls.PROGRESS_FILE):
            with open(cls.PROGRESS_FILE) as f:
                return json.load(f)
        return {'completed': [], 'failed': []}
    
    @classmethod
    def mark_done(cls, key: str):
        data = cls.load()
        if key not in data['completed']:
            data['completed'].append(key)
        with open(cls.PROGRESS_FILE, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    @classmethod
    def is_done(cls, key: str):
        return key in cls.load()['completed']
    
    @classmethod
    def status(cls):
        data = cls.load()
        print(f"\n📊 Progress: {len(data['completed'])} completed, {len(data['failed'])} failed")
        if data['completed']:
            print(f"   Last 5 done: {data['completed'][-5:]}")


# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description='QatarSpec Pro — Comprehensive Arabic Translation Script',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Test with dry-run (no API calls)
  python3 translate_ar_content.py --key YOUR_KEY --dry-run

  # Translate roads file only
  python3 translate_ar_content.py --key YOUR_KEY --file roads

  # Translate specific section
  python3 translate_ar_content.py --key YOUR_KEY --file roads --section superpave_mix

  # Translate ALL files (slow, ~2-3 hours)
  python3 translate_ar_content.py --key YOUR_KEY --all

  # Check progress
  python3 translate_ar_content.py --status
        """
    )
    
    parser.add_argument('--key', '-k', help='Gemini API key')
    parser.add_argument('--file', '-f', choices=list(DATA_FILES.keys()),
                       help='Process specific file only')
    parser.add_argument('--section', '-s', help='Filter by section key (partial match)')
    parser.add_argument('--all', '-a', action='store_true', help='Process all files')
    parser.add_argument('--dry-run', '-d', action='store_true', 
                       help='Show what would be translated without API calls')
    parser.add_argument('--delay', type=float, default=1.5,
                       help='Delay between API calls in seconds (default: 1.5)')
    parser.add_argument('--status', action='store_true', help='Show translation progress')
    
    args = parser.parse_args()
    
    if args.status:
        ProgressTracker.status()
        return
    
    if not args.key and not args.dry_run:
        print("❌ خطأ: يجب تحديد --key مع مفتاح Gemini API")
        print("   احصل على مفتاح من: https://aistudio.google.com/app/apikey")
        sys.exit(1)
    
    # Determine which files to process
    if args.all:
        files_to_process = list(DATA_FILES.keys())
    elif args.file:
        files_to_process = [args.file]
    else:
        # Default: ask user
        print("\n📂 الملفات المتاحة:")
        for k, v in DATA_FILES.items():
            print(f"   {k}: {v}")
        print("\n⚠️  حدد --file أو --all")
        print("   مثال: python3 translate_ar_content.py --key KEY --file roads")
        sys.exit(1)
    
    print(f"\n🚀 QatarSpec Pro — Arabic Translation Script v1.0")
    print(f"{'='*60}")
    print(f"Files: {files_to_process}")
    print(f"Section filter: {args.section or 'All'}")
    print(f"Dry run: {args.dry_run}")
    print(f"Delay: {args.delay}s")
    
    total_translated = 0
    
    for file_key in files_to_process:
        filepath = DATA_FILES[file_key]
        
        if not os.path.exists(filepath):
            print(f"\n❌ File not found: {filepath}")
            continue
        
        count = process_file(
            filepath=filepath,
            api_key=args.key or 'DRY_RUN',
            dry_run=args.dry_run,
            section_filter=args.section,
            delay=args.delay,
        )
        total_translated += count
    
    print(f"\n{'='*60}")
    print(f"🏁 COMPLETE: {total_translated} sections translated")
    
    if not args.dry_run and total_translated > 0:
        print(f"\n📝 الخطوة التالية:")
        print(f"   git add data_content_*.js")
        print(f"   git commit -m 'feat: Arabic translation for lang-content-ar sections'")
        print(f"   git push origin main")


if __name__ == '__main__':
    main()
