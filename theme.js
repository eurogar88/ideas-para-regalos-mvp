'use strict';

(function () {
  var STORAGE_KEY = 'regalazo-theme-v1';
  var root = document.documentElement;

  function systemTheme() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      return 'light';
    }
  }

  function readTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (error) {}
    return root.getAttribute('data-theme') || systemTheme();
  }

  function applyTheme(theme) {
    var activeTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', activeTheme);
    var dark = activeTheme === 'dark';
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var index = 0; index < toggles.length; index += 1) {
      toggles[index].textContent = dark ? '☀' : '☾';
      toggles[index].setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
      toggles[index].setAttribute('title', dark ? 'Activar modo claro' : 'Activar modo oscuro');
      toggles[index].setAttribute('aria-pressed', String(dark));
    }
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', dark ? '#161311' : '#fff9f2');
  }

  applyTheme(readTheme());

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, nextTheme); } catch (error) {}
    applyTheme(nextTheme);
  });
}());
