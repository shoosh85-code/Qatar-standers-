// js/stepper.js — QatarSpec Pro Stepper System v1.0
// نظام Stepper تفاعلي حقيقي مع State Machine + Validation + Auto-save
// ═══════════════════════════════════════════════════════════════════

class QatarSpecStepper {
  constructor(containerId, steps, options = {}) {
    this.container = document.getElementById(containerId);
    this.steps = steps; // [{ title, content, validate }]
    this.currentStep = 0;
    this.data = {};
    this.completed = new Set();
    this.storageKey = options.storageKey || `stepper_${containerId}`;
    this.onCompleteCallback = options.onComplete || null;
    this.instanceName = options.instanceName || 'stepperInstance';

    // Touch/Swipe support للموبايل
    this._touchStartX = 0;
    this._touchEndX = 0;

    this.loadState();
    this.render();
    this._attachSwipe();
  }

  // ── State: تحميل من localStorage ──
  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const state = JSON.parse(saved);
        this.currentStep = state.currentStep || 0;
        this.data = state.data || {};
        this.completed = new Set(state.completed || []);
        // تصحيح: لا تتجاوز عدد الخطوات إذا تغيرت
        if (this.currentStep >= this.steps.length) this.currentStep = 0;
      }
    } catch (e) { /* تجاهل أخطاء JSON */ }
  }

  // ── State: حفظ في localStorage ──
  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        currentStep: this.currentStep,
        data: this.data,
        completed: Array.from(this.completed)
      }));
    } catch (e) { /* تجاهل أخطاء التخزين */ }
  }

  // ── Validation: التحقق من الخطوة الحالية ──
  validateCurrentStep() {
    const step = this.steps[this.currentStep];
    if (!step.validate) return true;
    return step.validate(this.data);
  }

  // ── Navigation: الخطوة التالية ──
  next() {
    if (!this.validateCurrentStep()) {
      if (typeof showToast === 'function') {
        showToast('❌ أكمل البيانات المطلوبة أولاً', 'warning');
      }
      // اهتزاز بصري للزر
      const btn = this.container.querySelector('.stepper-btn-next');
      if (btn) { btn.classList.add('shake'); setTimeout(() => btn.classList.remove('shake'), 500); }
      return false;
    }

    this.completed.add(this.currentStep);

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.saveState();
      this.render();
      this._attachSwipe();
      return true;
    }

    // الخطوة الأخيرة
    this.onComplete();
    return true;
  }

  // ── Navigation: الخطوة السابقة ──
  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
      this._attachSwipe();
    }
  }

  // ── Navigation: الانتقال لخطوة محددة ──
  goTo(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return false;

    // لا يمكن الانتقال لـ step لم يُكمل سابقه
    for (let i = 0; i < stepIndex; i++) {
      if (!this.completed.has(i)) {
        if (typeof showToast === 'function') {
          showToast('❌ أكمل الخطوات السابقة أولاً', 'warning');
        }
        return false;
      }
    }
    this.currentStep = stepIndex;
    this.render();
    this._attachSwipe();
    return true;
  }

  // ── Render: رسم الـ Stepper كاملاً ──
  render() {
    if (!this.container) return;

    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    const iName = this.instanceName;

    let html = `
      <div class="stepper-container" dir="rtl">

        <!-- Progress Bar -->
        <div class="stepper-progress" aria-label="التقدم: خطوة ${this.currentStep + 1} من ${this.steps.length}">
          <div class="stepper-progress-bar" style="width:${progress}%"></div>
          <div class="stepper-progress-label">${this.currentStep + 1} / ${this.steps.length}</div>
        </div>

        <!-- Step Indicators -->
        <div class="stepper-steps" role="tablist">
          ${this.steps.map((step, i) => {
            const isDone = this.completed.has(i);
            const isActive = i === this.currentStep;
            const canClick = isDone || i === this.currentStep;
            return `
            <div class="stepper-step ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}"
                 role="tab"
                 aria-selected="${isActive}"
                 aria-label="خطوة ${i + 1}: ${step.title}"
                 onclick="${canClick ? `window['${iName}'].goTo(${i})` : ''}"
                 style="${canClick ? 'cursor:pointer' : 'cursor:not-allowed'}">
              <div class="step-number">${isDone ? '✓' : i + 1}</div>
              <div class="step-title">${step.title}</div>
            </div>`;
          }).join('')}
        </div>

        <!-- Step Content -->
        <div class="stepper-content" role="tabpanel" id="${this.storageKey}-content">
          <div class="stepper-step-header">
            <span class="stepper-step-num">الخطوة ${this.currentStep + 1}</span>
            <span class="stepper-step-name">${this.steps[this.currentStep].title}</span>
          </div>
          ${this.steps[this.currentStep].content}
        </div>

        <!-- Actions -->
        <div class="stepper-actions">
          ${this.currentStep > 0
            ? `<button class="stepper-btn stepper-btn-prev" onclick="window['${iName}'].prev()">← السابق</button>`
            : '<div></div>'}

          <div class="stepper-step-dots">
            ${this.steps.map((_, i) => `
              <span class="stepper-dot ${i === this.currentStep ? 'active' : ''} ${this.completed.has(i) ? 'done' : ''}"></span>
            `).join('')}
          </div>

          ${this.currentStep < this.steps.length - 1
            ? `<button class="stepper-btn stepper-btn-next" onclick="window['${iName}'].next()">التالي →</button>`
            : `<button class="stepper-btn stepper-btn-finish" onclick="window['${iName}'].onComplete()">✅ إنهاء</button>`}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  // ── Completion ──
  onComplete() {
    this.completed.add(this.currentStep);
    this.saveState();
    if (typeof showToast === 'function') {
      showToast('🎉 تم إكمال جميع الخطوات بنجاح!', 'success');
    }
    if (this.onCompleteCallback) this.onCompleteCallback(this.data);
  }

  // ── Data Management ──
  setData(key, value) {
    this.data[key] = value;
    this.saveState();
  }

  getData(key) {
    return this.data[key];
  }

  // ── Reset ──
  reset() {
    this.currentStep = 0;
    this.data = {};
    this.completed = new Set();
    try { localStorage.removeItem(this.storageKey); } catch (e) {}
    this.render();
    this._attachSwipe();
  }

  // ── Cleanup ──
  destroy() {
    if (this.container) this.container.innerHTML = '';
    try { localStorage.removeItem(this.storageKey); } catch (e) {}
  }

  // ── Swipe Support (Mobile) ──
  _attachSwipe() {
    if (!this.container) return;
    const content = this.container.querySelector('.stepper-content');
    if (!content) return;

    content.addEventListener('touchstart', (e) => {
      this._touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    content.addEventListener('touchend', (e) => {
      this._touchEndX = e.changedTouches[0].screenX;
      const diff = this._touchStartX - this._touchEndX;
      // Swipe يسار → التالي | Swipe يمين → السابق
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
    }, { passive: true });
  }
}

// ═══════════════════════════════════════════════════════════════════
// CSS — يُضاف تلقائياً عند تحميل المكتبة
// ═══════════════════════════════════════════════════════════════════
(function injectStepperCSS() {
  if (document.getElementById('qatarspec-stepper-css')) return;
  const style = document.createElement('style');
  style.id = 'qatarspec-stepper-css';
  style.textContent = `
/* ── QatarSpec Stepper v1.0 ── */
.stepper-container {
  background: var(--dark3, #1a1a2e);
  border: 1px solid var(--border, rgba(201,168,76,0.2));
  border-radius: 16px;
  padding: 20px;
  font-family: 'Tajawal', 'Cairo', sans-serif;
}

/* Progress Bar */
.stepper-progress {
  position: relative;
  height: 6px;
  background: var(--dark5, #0d0d1a);
  border-radius: 3px;
  margin-bottom: 20px;
  overflow: visible;
}
.stepper-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--maroon, #5A0F0F), var(--gold, #C9A84C));
  border-radius: 3px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.stepper-progress-label {
  position: absolute;
  left: 50%;
  top: -22px;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--text3, #888);
  font-weight: 600;
}

/* Step Indicators */
.stepper-steps {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.stepper-steps::-webkit-scrollbar { display: none; }
.stepper-step {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  opacity: 0.45;
  transition: all 0.25s ease;
  white-space: nowrap;
  border: 1px solid transparent;
  flex-shrink: 0;
}
.stepper-step.active {
  opacity: 1;
  background: rgba(201,168,76,0.08);
  border-color: rgba(201,168,76,0.3);
}
.stepper-step.completed {
  opacity: 0.85;
}
.stepper-step.completed:hover { opacity: 1; }
.step-number {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--dark5, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--text3, #888);
  border: 1px solid var(--border, rgba(255,255,255,0.1));
  flex-shrink: 0;
  transition: all 0.25s;
}
.stepper-step.active .step-number {
  background: var(--gold, #C9A84C);
  color: #000;
  border-color: var(--gold, #C9A84C);
}
.stepper-step.completed .step-number {
  background: #2ecc71;
  color: #fff;
  border-color: #2ecc71;
}
.step-title {
  font-size: 12px;
  color: var(--text2, #aaa);
  font-weight: 600;
}
.stepper-step.active .step-title { color: var(--gold, #C9A84C); }

/* Content Area */
.stepper-content {
  min-height: 180px;
  margin-bottom: 16px;
  animation: stepperFadeIn 0.3s ease;
}
@keyframes stepperFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.stepper-step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
}
.stepper-step-num {
  background: rgba(201,168,76,0.12);
  color: var(--gold, #C9A84C);
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 700;
}
.stepper-step-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text, #fff);
}

/* Actions */
.stepper-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}
.stepper-btn {
  background: linear-gradient(135deg, var(--maroon, #5A0F0F), rgba(90,15,15,0.7));
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 10px;
  padding: 9px 22px;
  color: var(--gold, #C9A84C);
  font-family: 'Tajawal', 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.stepper-btn:hover {
  border-color: var(--gold, #C9A84C);
  background: rgba(201,168,76,0.15);
}
.stepper-btn-finish {
  background: linear-gradient(135deg, #1a5c2a, #2ecc71);
  border-color: #2ecc71;
  color: #fff;
}
.stepper-btn.shake {
  animation: stepperShake 0.4s ease;
}
@keyframes stepperShake {
  0%,100% { transform: translateX(0); }
  20%,60%  { transform: translateX(-6px); }
  40%,80%  { transform: translateX(6px); }
}

/* Dots */
.stepper-step-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}
.stepper-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dark5, #333);
  border: 1px solid var(--border, rgba(255,255,255,0.1));
  transition: all 0.2s;
}
.stepper-dot.active {
  background: var(--gold, #C9A84C);
  transform: scale(1.3);
}
.stepper-dot.done {
  background: #2ecc71;
}
  `;
  document.head.appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════════
// Export
// ═══════════════════════════════════════════════════════════════════
window.QatarSpecStepper = QatarSpecStepper;
