/**
 * QatarSpec Pro — Project Schedule Generator v1.0
 * Gantt Chart (CSS Grid) + Critical Path Method (CPM)
 * بدون مكتبات خارجية — Vanilla JS فقط
 */
(function() {
  'use strict';
  window.QS = window.QS || {};

  window.QS.schedule = {

    /**
     * حساب CPM — Early Start, Late Start, Float, Critical Path
     * @param {Array} activities — [{id, name, duration, predecessors:[]}]
     * @returns {Array} activities مع ES, EF, LS, LF, Float, isCritical
     */
    calculateCPM: function(activities) {
      if (!activities || activities.length === 0) return [];

      // بناء خريطة الأنشطة
      var map = {};
      activities.forEach(function(a) {
        map[a.id] = Object.assign({}, a, {
          ES: 0, EF: 0, LS: 0, LF: 0, TF: 0, isCritical: false
        });
      });

      // Forward Pass — حساب ES و EF
      var sorted = this._topoSort(activities);
      sorted.forEach(function(id) {
        var act = map[id];
        var maxES = 0;
        if (act.predecessors && act.predecessors.length > 0) {
          act.predecessors.forEach(function(predId) {
            if (map[predId] && map[predId].EF > maxES) {
              maxES = map[predId].EF;
            }
          });
        }
        act.ES = maxES;
        act.EF = act.ES + act.duration;
      });

      // مدة المشروع الإجمالية
      var projectDuration = 0;
      Object.keys(map).forEach(function(id) {
        if (map[id].EF > projectDuration) projectDuration = map[id].EF;
      });

      // Backward Pass — حساب LS و LF
      var reverseSorted = sorted.slice().reverse();
      reverseSorted.forEach(function(id) {
        var act = map[id];
        // ابحث عن الأنشطة التي تعتمد على هذا النشاط
        var minLS = projectDuration;
        var hasSuccessor = false;
        Object.keys(map).forEach(function(otherId) {
          var other = map[otherId];
          if (other.predecessors && other.predecessors.indexOf(id) !== -1) {
            hasSuccessor = true;
            if (other.LS < minLS) minLS = other.LS;
          }
        });
        act.LF = hasSuccessor ? minLS : projectDuration;
        act.LS = act.LF - act.duration;
        act.TF = act.LS - act.ES;
        act.isCritical = act.TF === 0;
      });

      return {
        activities: Object.keys(map).map(function(id) { return map[id]; }),
        projectDuration: projectDuration
      };
    },

    /**
     * ترتيب طوبولوجي
     */
    _topoSort: function(activities) {
      var inDegree = {};
      var adj = {};
      activities.forEach(function(a) {
        inDegree[a.id] = 0;
        adj[a.id] = [];
      });
      activities.forEach(function(a) {
        if (a.predecessors) {
          a.predecessors.forEach(function(predId) {
            if (adj[predId]) {
              adj[predId].push(a.id);
              inDegree[a.id]++;
            }
          });
        }
      });
      var queue = [];
      Object.keys(inDegree).forEach(function(id) {
        if (inDegree[id] === 0) queue.push(id);
      });
      var result = [];
      while (queue.length > 0) {
        var node = queue.shift();
        result.push(node);
        adj[node].forEach(function(next) {
          inDegree[next]--;
          if (inDegree[next] === 0) queue.push(next);
        });
      }
      return result;
    },

    /**
     * عرض Gantt Chart بـ CSS Grid
     */
    renderGantt: function(cpmResult, containerId, lang) {
      lang = lang || 'ar';
      var isAr = lang === 'ar';
      var container = document.getElementById(containerId);
      if (!container) return;

      var acts = cpmResult.activities;
      var totalDur = cpmResult.projectDuration;
      if (totalDur === 0) totalDur = 1;

      var html = '<div style="overflow-x:auto;">';

      // رأس الأيام
      html += '<div style="display:grid;grid-template-columns:180px repeat(' + totalDur + ',1fr);gap:1px;margin-bottom:2px;">';
      html += '<div style="padding:6px;font-size:11px;font-weight:700;color:var(--gold);background:var(--dark3);border-radius:4px;">' + (isAr ? 'النشاط' : 'Activity') + '</div>';
      for (var d = 1; d <= totalDur; d++) {
        html += '<div style="padding:4px 2px;font-size:9px;text-align:center;color:var(--text3);background:var(--dark3);border-radius:2px;">' + d + '</div>';
      }
      html += '</div>';

      // صفوف الأنشطة
      acts.forEach(function(act) {
        html += '<div style="display:grid;grid-template-columns:180px repeat(' + totalDur + ',1fr);gap:1px;margin-bottom:1px;">';
        // اسم النشاط
        var nameColor = act.isCritical ? '#dc3545' : 'var(--text1)';
        var critIcon = act.isCritical ? '\u{1F534} ' : '';
        html += '<div style="padding:6px;font-size:11px;color:' + nameColor + ';background:var(--dark3);border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + act.name + '">' + critIcon + act.name + '</div>';

        // خلايا الشريط
        for (var c = 1; c <= totalDur; c++) {
          var inRange = c > act.ES && c <= act.EF;
          var inFloat = c > act.EF && c <= act.EF + act.TF;
          var bg = 'transparent';
          var border = '1px solid rgba(255,255,255,0.03)';
          if (inRange) {
            bg = act.isCritical ? 'rgba(220,53,69,0.7)' : 'rgba(40,167,69,0.6)';
            border = 'none';
          } else if (inFloat) {
            bg = 'rgba(201,168,76,0.15)';
          }
          html += '<div style="background:' + bg + ';border:' + border + ';border-radius:2px;min-height:24px;"></div>';
        }
        html += '</div>';
      });

      html += '</div>';

      // Legend
      html += '<div style="display:flex;gap:16px;margin-top:10px;font-size:11px;flex-wrap:wrap;">';
      html += '<span>\u{1F534} <span style="color:#dc3545;font-weight:700;">' + (isAr ? 'مسار حرج' : 'Critical Path') + '</span></span>';
      html += '<span>\u{1F7E2} <span style="color:#28a745;">' + (isAr ? 'غير حرج' : 'Non-Critical') + '</span></span>';
      html += '<span>\u{1F7E1} <span style="color:#c9a84c;">' + (isAr ? 'فائض (Float)' : 'Total Float') + '</span></span>';
      html += '</div>';

      container.innerHTML = html;
    },

    /**
     * عرض جدول CPM
     */
    renderCPMTable: function(cpmResult, lang) {
      lang = lang || 'ar';
      var isAr = lang === 'ar';
      var html = '<table class="dm-table" style="font-size:12px;">';
      html += '<tr><th>ID</th>';
      html += '<th>' + (isAr ? 'النشاط' : 'Activity') + '</th>';
      html += '<th>' + (isAr ? 'المدة' : 'Duration') + '</th>';
      html += '<th>ES</th><th>EF</th><th>LS</th><th>LF</th>';
      html += '<th>' + (isAr ? 'الفائض' : 'Float') + '</th>';
      html += '<th>' + (isAr ? 'حرج؟' : 'Critical?') + '</th></tr>';

      cpmResult.activities.forEach(function(a) {
        var rowStyle = a.isCritical ? 'background:rgba(220,53,69,0.1);' : '';
        html += '<tr style="' + rowStyle + '">';
        html += '<td>' + a.id + '</td>';
        html += '<td>' + a.name + '</td>';
        html += '<td>' + a.duration + '</td>';
        html += '<td>' + a.ES + '</td><td>' + a.EF + '</td>';
        html += '<td>' + a.LS + '</td><td>' + a.LF + '</td>';
        html += '<td>' + a.TF + '</td>';
        html += '<td>' + (a.isCritical ? '\u{1F534} ' + (isAr ? 'نعم' : 'Yes') : '\u{1F7E2} ' + (isAr ? 'لا' : 'No')) + '</td>';
        html += '</tr>';
      });

      html += '</table>';
      html += '<div style="margin-top:8px;font-size:12px;color:var(--gold);font-weight:700;">' +
        (isAr ? '\u{1F4C5} مدة المشروع الإجمالية: ' : '\u{1F4C5} Total Project Duration: ') +
        cpmResult.projectDuration + (isAr ? ' يوم' : ' days') + '</div>';
      return html;
    }
  };

  console.log('[QS-Schedule] System initialized');
})();
