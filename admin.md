---
layout: default
title: Admin Dashboard
nav_order: 10
permalink: /admin/
nav_exclude: true
search_exclude: true
has_toc: false
noindex: true
---

# Admin Dashboard

<div class="admin-lock" id="admin-lock">
  <h2>Enter admin passphrase</h2>
  <p>This page is lightly gated for personal workflow use. It is not true server-side authentication.</p>
  <form id="admin-login-form" class="admin-login-form">
    <label for="admin-passphrase">Passphrase</label>
    <div class="admin-login-form__row">
      <input id="admin-passphrase" name="admin-passphrase" type="password" autocomplete="current-password">
      <button type="submit">Unlock</button>
    </div>
    <p class="admin-login-form__error" id="admin-login-error" hidden>Incorrect passphrase.</p>
  </form>
</div>

<div class="admin-dashboard" id="admin-dashboard" hidden>
  <div class="admin-actions">
    <a class="admin-action" href="{{ '/notes/progress/' | relative_url }}">Open Progress Page</a>
    <a class="admin-action" href="https://analytics.google.com/" rel="noopener" target="_blank">Open Google Analytics</a>
    <button class="admin-action admin-action--button" id="admin-lock-button" type="button">Lock</button>
  </div>

  <section class="admin-section">
    <h2>Notes Overview</h2>
    <div class="admin-metric-grid" id="admin-summary"></div>
  </section>

  <section class="admin-section">
    <h2>Course Progress</h2>
    <div class="admin-course-list" id="admin-courses"></div>
  </section>

  <section class="admin-section">
    <h2>Priority Pages</h2>
    <table class="notes-progress-table admin-priority-table">
      <thead>
        <tr>
          <th>Page</th>
          <th>Course</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Main Issues</th>
          <th>Next Step</th>
        </tr>
      </thead>
      <tbody id="admin-priority-pages"></tbody>
    </table>
  </section>

  <section class="admin-section">
    <h2>Issue Counts</h2>
    <div class="admin-issue-list" id="admin-issues"></div>
  </section>

  <section class="admin-section">
    <h2>Google Analytics</h2>
    <div class="admin-ga-panel">
      <p>
        Google Analytics tracking is installed through the site tag. Live private analytics cannot be safely pulled into a public GitHub Pages page without exposing credentials.
      </p>
      <p>
        Use the button above to open the GA dashboard, or embed a Looker Studio report here later if you create a shareable report URL.
      </p>
      <dl>
        <div>
          <dt>Measurement ID</dt>
          <dd><code>G-868QCS9DJP</code></dd>
        </div>
        <div>
          <dt>Tracking Status</dt>
          <dd>Tag present in <code>_includes/head_custom.html</code></dd>
        </div>
      </dl>
    </div>
  </section>
</div>

<script>
  (function () {
    var DATA_URL = "{{ '/assets/data/admin-dashboard.json' | relative_url }}";
    var STORAGE_KEY = "notes-admin-unlocked";
    var ADMIN_PASSWORD_HASH = "3c23972a18d79651f1b2d8b4cf19504ae270ffe0e3125c66e9c6bb4c796332ed";

    var lock = document.getElementById("admin-lock");
    var dashboard = document.getElementById("admin-dashboard");
    var form = document.getElementById("admin-login-form");
    var error = document.getElementById("admin-login-error");
    var lockButton = document.getElementById("admin-lock-button");

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

    function renderPriorityPages(pages) {
      var target = document.getElementById("admin-priority-pages");
      target.innerHTML = pages.map(function (page) {
        var issues = page.issues && page.issues.length ? page.issues.slice(0, 3).join(", ") : "none flagged";
        return '<tr>' +
          '<td><a href="{{ site.baseurl }}' + escapeHtml(page.permalink) + '">' + escapeHtml(page.title) + '</a><br><small>' + escapeHtml(page.path) + '</small></td>' +
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

    function loadDashboard() {
      fetch(DATA_URL, { cache: "no-store" })
        .then(function (response) {
          if (!response.ok) throw new Error("Could not load dashboard data.");
          return response.json();
        })
        .then(function (data) {
          renderSummary(data.summary || {});
          renderCourses(data.courses || []);
          renderPriorityPages(data.priority_pages || []);
          renderIssues(data.top_issues || []);
        })
        .catch(function (err) {
          document.getElementById("admin-summary").innerHTML =
            '<div class="admin-warning">Dashboard data failed to load. Run <code>python3 scripts/update_progress_report.py</code>.</div>';
          console.error(err);
        });
    }

    function unlock() {
      lock.hidden = true;
      dashboard.hidden = false;
      sessionStorage.setItem(STORAGE_KEY, "true");
      loadDashboard();
    }

    function lockDashboard() {
      dashboard.hidden = true;
      lock.hidden = false;
      sessionStorage.removeItem(STORAGE_KEY);
    }

    function hash(value) {
      var encoder = new TextEncoder();
      return crypto.subtle.digest("SHA-256", encoder.encode(value)).then(function (buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("admin-passphrase");
      hash(input.value).then(function (digest) {
        if (digest === ADMIN_PASSWORD_HASH) {
          error.hidden = true;
          input.value = "";
          unlock();
        } else {
          error.hidden = false;
        }
      });
    });

    lockButton.addEventListener("click", lockDashboard);

    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      unlock();
    }
  })();
</script>
