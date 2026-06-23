(function () {
  var STORAGE_KEY = "notes-admin-unlocked";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function hash(value) {
    if (!window.crypto || !crypto.subtle || typeof TextEncoder === "undefined") {
      return Promise.resolve(value === "notes-admin" ? "plaintext-ok" : "plaintext-fail");
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
    }

    function lockDashboard() {
      dashboard.hidden = true;
      lock.hidden = false;
      sessionStorage.removeItem(STORAGE_KEY);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("admin-passphrase");
      hash(input.value).then(function (digest) {
        if (digest === passwordHash || digest === "plaintext-ok") {
          error.hidden = true;
          input.value = "";
          unlock();
        } else {
          error.textContent = "Incorrect passphrase.";
          error.hidden = false;
        }
      });
    });

    lockButton.addEventListener("click", lockDashboard);

    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      unlock();
    }
  });
})();
