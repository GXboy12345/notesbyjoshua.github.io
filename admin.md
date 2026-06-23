---
layout: default
title: Admin Dashboard
permalink: /admin/
nav_exclude: true
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
{% include admin-dashboard-body.html %}
</div>

<script src="{{ '/assets/js/admin-dashboard.js?v=2' | relative_url }}" defer></script>

</div>
