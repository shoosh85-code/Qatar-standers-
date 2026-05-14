/**
 * QatarSpec Pro — Video Persistence System v1.0
 * الملف: js/core/video-system.js
 *
 * المشكلة المحلولة: openDetail/goBack يستخدم innerHTML = d.content
 * مما يدمر عناصر <video> في DOM
 * الحل: تخزين File objects في Map + IndexedDB للاستمرارية بين refreshes
 *
 * المصدر: مُستخرج من inline-scripts.js (الأسطر 350-545)
 *
 * الدوال العامة (window):
 * - loadLocalVideo, createVideoPlayer
 * - restoreAllVideoUI, restoreVideoUI (legacy aliases)
 *
 * الدوال الخاصة (داخل IIFE):
 * - _openIDB, _saveVideoToIDB, _loadAllVideosFromIDB
 * - _deleteVideoFromIDB, _applyVideoToDOM, _restoreVideosAfterDOMRebuild
 */

(function () {
  'use strict';

  // ─── Storage: Map يخزن ملفات الفيديو المحلية في الذاكرة ───────
  var _videoFiles = new Map(); // key: input element ID → value: { file, url, name, size }

  // ─── IndexedDB: استمرارية الفيديو بين refreshes ───────────────
  var _IDB_NAME  = 'QatarSpecVideoDB';
  var _IDB_STORE = 'videos';
  var _idb       = null;

  function _openIDB() {
    return new Promise(function (resolve, reject) {
      if (_idb) return resolve(_idb);
      var req = indexedDB.open(_IDB_NAME, 1);
      req.onupgradeneeded = function (e) {
        e.target.result.createObjectStore(_IDB_STORE, { keyPath: 'inputId' });
      };
      req.onsuccess = function (e) { _idb = e.target.result; resolve(_idb); };
      req.onerror   = function (e) { reject(e.target.error); };
    });
  }

  function _saveVideoToIDB(inputId, file) {
    _openIDB().then(function (db) {
      var tx = db.transaction(_IDB_STORE, 'readwrite');
      tx.objectStore(_IDB_STORE).put({ inputId: inputId, file: file, name: file.name, size: file.size });
    }).catch(function (err) { console.warn('IDB save error:', err); });
  }

  function _loadAllVideosFromIDB() {
    _openIDB().then(function (db) {
      var tx  = db.transaction(_IDB_STORE, 'readonly');
      var req = tx.objectStore(_IDB_STORE).getAll();
      req.onsuccess = function (e) {
        var records = e.target.result || [];
        records.forEach(function (rec) {
          var url = URL.createObjectURL(rec.file);
          _videoFiles.set(rec.inputId, { file: rec.file, url: url, name: rec.name, size: rec.size });
        });
        if (records.length > 0) _restoreVideosAfterDOMRebuild();
      };
    }).catch(function (err) { console.warn('IDB load error:', err); });
  }

  function _deleteVideoFromIDB(inputId) {
    _openIDB().then(function (db) {
      var tx = db.transaction(_IDB_STORE, 'readwrite');
      tx.objectStore(_IDB_STORE).delete(inputId);
    }).catch(function (err) { console.warn('IDB delete error:', err); });
  }

  // تحميل الفيديوهات المحفوظة عند بدء التطبيق
  document.addEventListener('DOMContentLoaded', function () {
    _loadAllVideosFromIDB();
  });

  // ─── _applyVideoToDOM: إدراج الفيديو فعلياً في DOM ─────────────
  function _applyVideoToDOM(inputId, playerId, phId, url, name, size) {
    var container = document.getElementById(playerId);
    var ph        = document.getElementById(phId);
    if (!container) return;

    if (typeof container._vidCleanup === 'function') container._vidCleanup();
    container.innerHTML = '';

    var maxH  = container.dataset ? (container.dataset.maxh || '280px') : '280px';
    var video = document.createElement('video');
    video.controls = true;
    video.setAttribute('playsinline', '');
    video.style.cssText = 'width:100%;max-height:' + maxH + ';background:#000;display:block;border-radius:8px;';
    video.src = url;
    container.appendChild(video);
    container.style.display = 'block';
    video.load();

    container._vidCleanup = function () {
      video.pause();
      video.src = '';
      video.remove();
      container._vidCleanup = null;
      container.style.display = 'none';
    };

    if (ph) ph.style.display = 'none';

    // Badge اسم الملف
    var badgeId = 'vbadge-' + playerId;
    if (!document.getElementById(badgeId) && container.parentNode) {
      var badge = document.createElement('div');
      badge.id = badgeId;
      badge.style.cssText = 'font-size:10px;color:#2ecc71;padding:3px 12px;background:rgba(46,204,113,0.1);border-top:1px solid rgba(46,204,113,0.2);border-radius:0 0 8px 8px;';
      badge.textContent = '\u2705 ' + name + ' (' + (size / 1024 / 1024).toFixed(1) + ' MB)';
      container.parentNode.appendChild(badge);
    }
  }

  // ─── _restoreVideosAfterDOMRebuild: إعادة ربط الفيديو بعد DOM rebuild ──
  /**
   * يُستدعى بعد openDetail/goBack لأن innerHTML يمسح عناصر video
   */
  function _restoreVideosAfterDOMRebuild() {
    if (_videoFiles.size === 0) return;
    var inputs = document.querySelectorAll('input[type="file"][accept*="video"]');
    inputs.forEach(function (input) {
      var inputId = input.id;
      if (!inputId) return;
      var stored = _videoFiles.get(inputId);
      if (!stored) return;
      var playerId = input.getAttribute('data-player');
      var phId     = input.getAttribute('data-ph');
      if (!playerId) {
        playerId = inputId.replace('vid-', 'vid-player-');
        phId     = inputId.replace('vid-', 'vid-ph-');
      }
      _applyVideoToDOM(inputId, playerId, phId, stored.url, stored.name, stored.size);
      input.onchange = function () { window.loadLocalVideo(this, playerId, phId); };
    });
  }

  // ─── loadLocalVideo: يُحمّل فيديو محلي ويخزّنه ─────────────────
  /**
   * FIX v1.7.4: URL.createObjectURL بدل FileReader.readAsDataURL
   * السبب: أسرع + لا يحمّل الملف كاملاً في RAM + يدعم Seeking
   */
  window.loadLocalVideo = function loadLocalVideo(input, playerId, placeholderId) {
    var file = input.files[0];
    if (!file) return;
    var inputId = input.id || input.getAttribute('id');
    var ph = document.getElementById(placeholderId);
    if (ph) ph.innerHTML = '<div style="padding:12px;text-align:center;color:var(--gold);font-size:12px;">⏳ جاري تحميل الفيديو...</div>';

    var existing = _videoFiles.get(inputId);
    if (existing && existing.url && existing.url.startsWith('blob:')) {
      URL.revokeObjectURL(existing.url);
    }
    var url = URL.createObjectURL(file);
    _videoFiles.set(inputId, { file: file, url: url, name: file.name, size: file.size });
    _saveVideoToIDB(inputId, file);
    _applyVideoToDOM(inputId, playerId, placeholderId, url, file.name, file.size);
  };

  // ─── createVideoPlayer: ينشئ <video> ديناميكياً ─────────────────
  window.createVideoPlayer = function createVideoPlayer(containerId, src) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (typeof container._vidCleanup === 'function') container._vidCleanup();
    container.innerHTML = '';
    var maxH  = container.dataset.maxh || '280px';
    var video = document.createElement('video');
    video.controls = true;
    video.style.cssText = 'width:100%;max-height:' + maxH + ';background:#000;display:block;';
    video.src = src;
    container.appendChild(video);
    container.style.display = 'block';
    video.load();
    container._vidCleanup = function () {
      video.pause();
      if (src.startsWith('blob:')) URL.revokeObjectURL(src);
      video.src = '';
      video.remove();
      container._vidCleanup = null;
      container.style.display = 'none';
    };
  };

  // ─── Legacy aliases ────────────────────────────────────────────
  window.restoreAllVideoUI = function restoreAllVideoUI() { _restoreVideosAfterDOMRebuild(); };
  window.restoreVideoUI    = function restoreVideoUI()    { _restoreVideosAfterDOMRebuild(); };

  // نُصدِّر _restoreVideosAfterDOMRebuild لأن inline-scripts.js يستدعيها مباشرة
  window._restoreVideosAfterDOMRebuild = _restoreVideosAfterDOMRebuild;

})();
