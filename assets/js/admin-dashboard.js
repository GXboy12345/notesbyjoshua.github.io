(function () {
  var STORAGE_KEY = "notes-admin-unlocked";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function progressBar(progress) {
    var value = Math.max(0, Math.min(100, parseInt(progress, 10) || 0));
    return '<div class="note-progress" aria-label="Progress: ' + value + '%">' +
      '<span class="note-progress__fill" style="width: ' + value + '%"></span>' +
      '<span class="note-progress__label">' + value + '%</span>' +
      '</div>';
  }

  function metric(label, value) {
    return '<div class="admin-metric"><strong>' + escapeHtml(value) + '</strong><span>' + escapeHtml(label) + '</span></div>';
  }

  function showWarning(message) {
    var target = document.getElementById("admin-summary");
    if (!target) return;
    target.innerHTML = '<div class="admin-warning">' + message + '</div>';
  }

  function renderSummary(summary) {
    var target = document.getElementById("admin-summary");
    target.innerHTML = [
      metric("unit pages", summary.unit_pages),
      metric("all notes pages", summary.all_pages),
      metric("average progress", summary.average_progress + "%"),
      metric("complete pages", summary.complete_pages),
      metric("below review", summary.below_review_pages),
      metric("with placeholders", summary.pages_with_placeholders),
      metric("missing practice", summary.missing_practice_pages),
      metric("missing solutions", summary.missing_solutions_pages)
    ].join("");
  }

  function renderCourses(courses) {
    var target = document.getElementById("admin-courses");
    target.innerHTML = courses.map(function (course) {
      return '<div class="admin-course">' +
        '<div class="admin-course__head"><strong>' + escapeHtml(course.name) + '</strong><span>' + escapeHtml(course.pages) + ' pages</span></div>' +
        progressBar(course.average_progress) +
        '<div class="admin-course__meta">' + escapeHtml(course.complete_pages) + ' complete &middot; ' + escapeHtml(course.below_review_pages) + ' below review</div>' +
        '</div>';
    }).join("");
  }

  function joinUrl(baseUrl, path) {
    var base = baseUrl || "";
    if (!path) return base || "/";
    if (/^https?:\/\//.test(path)) return path;
    return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }

  function renderPriorityPages(pages, baseUrl) {
    var target = document.getElementById("admin-priority-pages");
    target.innerHTML = pages.map(function (page) {
      var issues = page.issues && page.issues.length ? page.issues.slice(0, 3).join(", ") : "none flagged";
      return '<tr>' +
        '<td><a href="' + escapeHtml(joinUrl(baseUrl, page.permalink)) + '">' + escapeHtml(page.title) + '</a><br><small>' + escapeHtml(page.path) + '</small></td>' +
        '<td>' + escapeHtml(page.parent) + '</td>' +
        '<td><span class="note-status note-status--' + escapeHtml(page.status) + '">' + escapeHtml(page.status) + '</span></td>' +
        '<td>' + progressBar(page.progress) + '</td>' +
        '<td>' + escapeHtml(issues) + '</td>' +
        '<td>' + escapeHtml(page.next_step) + '</td>' +
        '</tr>';
    }).join("");
  }

  function renderIssues(issues) {
    var target = document.getElementById("admin-issues");
    target.innerHTML = issues.map(function (item) {
      return '<div class="admin-issue"><span>' + escapeHtml(item.issue) + '</span><strong>' + escapeHtml(item.count) + '</strong></div>';
    }).join("");
  }

  function renderDashboard(data, baseUrl) {
    if (!data || !data.summary) {
      showWarning("Dashboard data is empty. Run <code>python3 scripts/update_progress_report.py</code>.");
      return;
    }

    renderSummary(data.summary || {});
    renderCourses(data.courses || []);
    renderPriorityPages(data.priority_pages || [], baseUrl);
    renderIssues(data.top_issues || []);
  }

  function loadEmbeddedData() {
    var node = document.getElementById("admin-dashboard-data");
    if (!node) return null;
    var text = node.textContent.trim();
    if (!text) return null;
    return JSON.parse(text);
  }

  function loadData(dataUrl) {
    if (!dataUrl || typeof fetch !== "function") {
      return Promise.resolve(loadEmbeddedData());
    }

    return fetch(dataUrl, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("Could not load dashboard data.");
        return response.json();
      })
      .catch(function () {
        return loadEmbeddedData();
      });
  }

  function hash(value) {
    if (!window.crypto || !crypto.subtle || typeof TextEncoder === "undefined") {
      return Promise.reject(new Error("Secure password hashing is unavailable in this browser/context."));
    }

    var encoder = new TextEncoder();
    return crypto.subtle.digest("SHA-256", encoder.encode(value)).then(function (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
        return byte.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  onReady(function () {
    var page = document.getElementById("admin-page");
    if (!page) return;

    var dataUrl = page.getAttribute("data-dashboard-url");
    var baseUrl = page.getAttribute("data-base-url") || "";
    var passwordHash = page.getAttribute("data-password-hash");
    var lock = document.getElementById("admin-lock");
    var dashboard = document.getElementById("admin-dashboard");
    var form = document.getElementById("admin-login-form");
    var error = document.getElementById("admin-login-error");
    var lockButton = document.getElementById("admin-lock-button");

    function unlock() {
      lock.hidden = true;
      dashboard.hidden = false;
      sessionStorage.setItem(STORAGE_KEY, "true");
      showWarning("Loading dashboard data...");
      loadData(dataUrl)
        .then(function (data) {
          renderDashboard(data, baseUrl);
        })
        .catch(function (err) {
          showWarning("Dashboard data failed to load. Run <code>python3 scripts/update_progress_report.py</code>.");
          console.error(err);
        });
    }

    function lockDashboard() {
      dashboard.hidden = true;
      lock.hidden = false;
      sessionStorage.removeItem(STORAGE_KEY);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("admin-passphrase");
      hash(input.value)
        .then(function (digest) {
          if (digest === passwordHash) {
            error.hidden = true;
            input.value = "";
            unlock();
          } else {
            error.textContent = "Incorrect passphrase.";
            error.hidden = false;
          }
        })
        .catch(function (err) {
          error.textContent = err.message;
          error.hidden = false;
        });
    });

    lockButton.addEventListener("click", lockDashboard);

    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      unlock();
    }
  });
})();
