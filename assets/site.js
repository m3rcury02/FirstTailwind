// Theme toggle, email copy and menu close. Everything on the page works without this file.
(function () {
  "use strict";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var set = root.dataset.theme;
    if (set === "light" || set === "dark") return set;
    return media.matches ? "dark" : "light";
  }

  function syncToggleLabel() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var meta = document.querySelectorAll('meta[name="theme-color"]');
    var color = getComputedStyle(root).getPropertyValue("--bg").trim();
    meta.forEach(function (m) { m.setAttribute("content", color); });
    syncToggleLabel();
  }

  function onToggle(event) {
    var next = currentTheme() === "dark" ? "light" : "dark";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { applyTheme(next); return; }

    // Reveal the new theme in a circle that grows from the button.
    var rect = event.currentTarget.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", x + "px");
    root.style.setProperty("--vt-y", y + "px");
    root.style.setProperty("--vt-r", r + "px");
    document.startViewTransition(function () { applyTheme(next); });
  }

  function onCopy(event) {
    var btn = event.currentTarget;
    var text = btn.getAttribute("data-copy");
    var status = document.getElementById("copy-status");
    function done(msg) {
      if (status) status.textContent = msg;
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = "Copy"; if (status) status.textContent = ""; }, 2400);
    }
    function fallback() {
      var addr = document.getElementById("email-addr");
      var sel = window.getSelection();
      if (addr && sel) {
        var range = document.createRange();
        range.selectNodeContents(addr);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (status) status.textContent = "Address selected. Press Ctrl+C or ⌘C to copy it.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done("Email address copied."); }, fallback);
    } else {
      fallback();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncToggleLabel();
    var toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.addEventListener("click", onToggle);

    var copy = document.getElementById("copy-email");
    if (copy) copy.addEventListener("click", onCopy);

    // Close the mobile menu after a section is chosen.
    var menu = document.getElementById("menu");
    if (menu && menu.hidePopover) {
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) menu.hidePopover();
      });
    }
  });

  media.addEventListener("change", function () {
    if (!root.dataset.theme) syncToggleLabel();
  });
})();
