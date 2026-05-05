// ── QS.initStepper — factory لإنشاء Stepper في أي container ──
window.QS = window.QS || {};
window.QS.stepperInstances = {};

window.QS.initStepper = function(containerId, steps, options) {
  // تنظيف أي instance سابق
  if (window.QS.stepperInstances[containerId]) {
    window.QS.stepperInstances[containerId].destroy();
  }
  const instance = new QatarSpecStepper(containerId, steps, {
    instanceName: 'QS.stepperInstances["' + containerId + '"]',
    ...options
  });
  window.QS.stepperInstances[containerId] = instance;
  // تسجيل global للـ onclick handlers في الـ render
  window['QS.stepperInstances["' + containerId + '"]'] = instance;
  return instance;
};

// ── QS.reorderSteps — إعادة ترتيب خطوات instance معين ──
window.QS.reorderSteps = function(containerId, oldIndex, newIndex) {
  const instance = QS.stepperInstances[containerId];
  if (!instance) return;
  const moved = instance.steps.splice(oldIndex, 1)[0];
  instance.steps.splice(newIndex, 0, moved);
  instance.render();
  instance._attachSwipe();
};

// يُستدعى من data_content_phase4.js عند فتح الكرت
window.QS.buildExecStepper = function(containerId, stepsData) {
  return new QatarSpecStepper(containerId, stepsData, {
    storageKey: 'exec_stepper_' + containerId,
    instanceName: 'QS.stepperInstances["' + containerId + '"]',
    onComplete: function(data) {
      if (typeof showToast === 'function') showToast('✅ اكتملت جميع الخطوات', 'success');
    }
  });
};
