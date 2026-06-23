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

<div
  class="admin-page"
  id="admin-page"
  data-dashboard-url="{{ '/assets/data/admin-dashboard.json' | relative_url }}"
  data-base-url="{{ site.baseurl }}"
  data-password-hash="3c23972a18d79651f1b2d8b4cf19504ae270ffe0e3125c66e9c6bb4c796332ed"
>

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

<script id="admin-dashboard-data" type="application/json">
{% include_relative assets/data/admin-dashboard.json %}
</script>

<script src="{{ '/assets/js/admin-dashboard.js' | relative_url }}" defer></script>

</div>
