'use strict';

/*
 * Shared, opt-in analytics runtime for the homepage and SEO pages.
 * It deliberately accepts only aggregate product signals: no answers, names,
 * email addresses or shared URLs are sent to Mixpanel.
 */
(function () {
  var CONSENT_KEY = 'regalazo-analytics-consent-v4';
  var CONFIG = {
    token: '7a393adbe60cb8cd073e9aaf44263a33',
    scriptUrl: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js',
    apiHost: 'https://api-eu.mixpanel.com',
    version: 'growth-v4'
  };
  var COPY = {
    es: { title: '¿Nos ayudas a mejorar Regalazo?', text: 'Solo si aceptas cargaremos Mixpanel para medir el uso y mejorar las recomendaciones. No guardamos nombres, emails, respuestas concretas ni texto libre.', accept: 'Aceptar analítica', reject: 'Ahora no', preferences: 'Preferencias de analítica', more: 'Más información' },
    en: { title: 'Help us improve Regalazo?', text: 'We only load Mixpanel if you allow it, to measure usage and improve recommendations. We do not store names, emails, specific answers or free text.', accept: 'Allow analytics', reject: 'Not now', preferences: 'Analytics preferences', more: 'Learn more' },
    de: { title: 'Regalazo verbessern?', text: 'Mixpanel wird nur geladen, wenn du zustimmst, um die Nutzung zu messen und Empfehlungen zu verbessern. Wir speichern keine Namen, E-Mails, konkreten Antworten oder freien Texte.', accept: 'Analytik erlauben', reject: 'Jetzt nicht', preferences: 'Analyse-Einstellungen', more: 'Mehr erfahren' },
    fr: { title: 'Nous aider à améliorer Regalazo ?', text: 'Mixpanel ne sera chargé que si vous l’autorisez, afin de mesurer l’usage et d’améliorer les recommandations. Nous ne conservons ni noms, ni e-mails, ni réponses précises, ni texte libre.', accept: 'Autoriser les statistiques', reject: 'Pas maintenant', preferences: 'Préférences statistiques', more: 'En savoir plus' },
    it: { title: 'Ci aiuti a migliorare Regalazo?', text: 'Mixpanel viene caricato solo se lo consenti, per misurare l’uso e migliorare i consigli. Non conserviamo nomi, email, risposte specifiche o testo libero.', accept: 'Consenti analisi', reject: 'Non ora', preferences: 'Preferenze analisi', more: 'Scopri di più' }
  };
  var SAFE_PROPERTIES = {
    page_viewed: ['path'],
    quiz_started: [],
    quiz_step_viewed: ['questionId', 'step'],
    quiz_answered: ['questionId', 'step'],
    quiz_abandoned: ['questionId', 'step'],
    quiz_completed: ['genderProvided', 'interestCount'],
    recommendations_viewed: ['resultCount', 'variant', 'mode'],
    recommendations_refreshed: ['variant', 'mode'],
    gift_outbound_clicked: ['giftId', 'position', 'store', 'mode', 'linkType'],
    language_changed: ['from', 'to'],
    share_clicked: ['mode', 'ideaCount'],
    share_completed: ['method', 'mode'],
    shared_result_opened: ['mode'],
    weekly_discovery_viewed: ['giftId'],
    weekly_discovery_clicked: ['giftId', 'store'],
    pwa_ready: [],
    pwa_install_prompt_viewed: [],
    pwa_install_prompted: [],
    pwa_install_choice: ['outcome'],
    pwa_installed: [],
    pwa_install_dismissed: [],
    quiz_reset: [],
    analytics_loaded: [],
    gift_feedback: ['giftId', 'feedback']
  };
  var consent = readConsent();
  var queue = [];
  var ready = false;
  var loading = false;
  var pageViewTracked = false;

  function readConsent() {
    try {
      var value = localStorage.getItem(CONSENT_KEY);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function language() {
    var value = String(document.documentElement.lang || 'es').toLowerCase().split('-')[0];
    return COPY[value] ? value : 'es';
  }

  function copy() { return COPY[language()] || COPY.es; }

  function clean(value) {
    var result = String(value || '').trim();
    return /^[a-z0-9_-]{1,80}$/i.test(result) ? result : '';
  }

  function context() {
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (error) { params = null; }
    return {
      entryPath: String(window.location.pathname || '/').replace(/[^a-z0-9/_:.~-]/gi, '').slice(0, 200) || '/',
      source: params ? clean(params.get('utm_source')) || (params.get('source') === 'pwa' ? 'pwa' : 'direct') : 'direct',
      medium: params ? clean(params.get('utm_medium')) || 'none' : 'none',
      campaign: params ? clean(params.get('utm_campaign')) || 'none' : 'none'
    };
  }

  function safeProperties(eventName, properties) {
    if (!Object.prototype.hasOwnProperty.call(SAFE_PROPERTIES, eventName)) return {};
    var safe = {};
    (SAFE_PROPERTIES[eventName] || []).forEach(function (key) {
      if (!properties || !Object.prototype.hasOwnProperty.call(properties, key)) return;
      var value = properties[key];
      if (key === 'position' || key === 'step' || key === 'resultCount' || key === 'variant' || key === 'ideaCount') {
        var number = Number(value);
        if (Number.isFinite(number)) safe[key] = number;
        return;
      }
      var allowed = key === 'path' ? /[^a-z0-9/_:.~-]/gi : /[^a-z0-9:_.-]/gi;
      var text = String(value || '').replace(allowed, '').slice(0, key === 'path' ? 200 : 100);
      if (text) safe[key] = text;
    });
    return safe;
  }

  function send(event) {
    if (ready && window.mixpanel && typeof window.mixpanel.track === 'function') {
      window.mixpanel.track(event.event, event.properties);
    }
  }

  function initialize() {
    if (ready || !window.mixpanel || typeof window.mixpanel.init !== 'function') return ready;
    window.mixpanel.init(CONFIG.token, {
      api_host: CONFIG.apiHost,
      track_pageview: false,
      autocapture: false,
      opt_out_tracking_by_default: true,
      ip: false,
      persistence: 'localStorage',
      // The app sends its own allowlisted attribution fields. Do not let the
      // SDK copy shared-result query strings into default properties.
      property_blacklist: ['$current_url', '$referrer', '$initial_referrer', '$initial_referring_domain']
    });
    if (consent === 'granted' && typeof window.mixpanel.opt_in_tracking === 'function') window.mixpanel.opt_in_tracking();
    ready = true;
    queue.splice(0).forEach(send);
    return true;
  }

  function load() {
    if (consent !== 'granted' || !CONFIG.token || ready || loading) return;
    if (initialize()) return;
    loading = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = CONFIG.scriptUrl;
    script.onload = function () {
      loading = false;
      if (initialize()) track('analytics_loaded', {});
    };
    script.onerror = function () { loading = false; };
    document.head.appendChild(script);
  }

  function track(eventName, properties) {
    if (consent !== 'granted' || !Object.prototype.hasOwnProperty.call(SAFE_PROPERTIES, eventName)) return;
    var entry = context();
    var event = {
      event: eventName,
      properties: Object.assign({
        app: 'regalazo',
        language: language(),
        version: CONFIG.version,
        entry_path: entry.entryPath,
        entry_source: entry.source,
        entry_medium: entry.medium,
        entry_campaign: entry.campaign
      }, safeProperties(eventName, properties || {})),
      timestamp: new Date().toISOString()
    };
    if (ready) send(event);
    else queue.push(event);
  }

  function trackPageView() {
    if (pageViewTracked) return;
    pageViewTracked = true;
    track('page_viewed', { path: window.location.pathname || '/' });
  }

  function setConsent(value) {
    if (value !== 'granted' && value !== 'denied') return;
    consent = value;
    try { localStorage.setItem(CONSENT_KEY, value); } catch (error) {}
    if (value === 'denied') {
      queue.length = 0;
      if (window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
    }
    hideBanner();
    if (value === 'granted') {
      if (ready && window.mixpanel && typeof window.mixpanel.opt_in_tracking === 'function') window.mixpanel.opt_in_tracking();
      load();
      trackPageView();
    }
  }

  function setText() {
    var current = copy();
    var title = document.getElementById('analytics-consent-title');
    var text = document.getElementById('analytics-consent-text');
    var accept = document.getElementById('analytics-consent-accept');
    var reject = document.getElementById('analytics-consent-reject');
    var preferences = document.getElementById('analytics-preferences');
    var more = document.getElementById('analytics-consent-more');
    if (title) title.textContent = current.title;
    if (text) text.textContent = current.text;
    if (accept) accept.textContent = current.accept;
    if (reject) reject.textContent = current.reject;
    if (preferences) preferences.textContent = current.preferences;
    if (more) more.textContent = current.more;
  }

  function ensureBanner() {
    var banner = document.getElementById('regalazo-privacy-choice');
    if (!banner) {
      banner = document.createElement('aside');
      banner.id = 'regalazo-privacy-choice';
      banner.className = 'privacy-choice-banner';
      banner.setAttribute('aria-live', 'polite');
      banner.setAttribute('tabindex', '-1');
      banner.hidden = true;
      banner.innerHTML = '<div class="analytics-consent-copy"><strong id="analytics-consent-title"></strong><span id="analytics-consent-text"></span><a id="analytics-consent-more" href="/privacidad/"></a></div><div class="analytics-consent-actions"><button id="analytics-consent-reject" class="button button-ghost" type="button"></button><button id="analytics-consent-accept" class="button button-primary" type="button"></button></div>';
      document.body.appendChild(banner);
    }
    var preferences = document.getElementById('analytics-preferences');
    if (!preferences) {
      var footer = document.querySelector('.site-footer');
      if (footer) {
        preferences = document.createElement('button');
        preferences.id = 'analytics-preferences';
        preferences.className = 'footer-preferences';
        preferences.type = 'button';
        footer.appendChild(preferences);
      }
    }
    setText();
    return banner;
  }

  function hideBanner() {
    var banner = document.getElementById('regalazo-privacy-choice');
    if (banner) banner.hidden = true;
    document.body.classList.remove('analytics-consent-visible');
  }

  function showBanner() {
    var banner = ensureBanner();
    setText();
    banner.hidden = false;
    document.body.classList.add('analytics-consent-visible');
  }

  function openPreferences() {
    consent = null;
    try { localStorage.removeItem(CONSENT_KEY); } catch (error) {}
    pageViewTracked = false;
    if (window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
    showBanner();
    var banner = document.getElementById('regalazo-privacy-choice');
    if (banner && typeof banner.focus === 'function') banner.focus();
  }

  function bind() {
    var accept = document.getElementById('analytics-consent-accept');
    var reject = document.getElementById('analytics-consent-reject');
    var preferences = document.getElementById('analytics-preferences');
    if (accept && !accept.dataset.analyticsBound) {
      accept.dataset.analyticsBound = 'true';
      accept.addEventListener('click', function () { setConsent('granted'); });
    }
    if (reject && !reject.dataset.analyticsBound) {
      reject.dataset.analyticsBound = 'true';
      reject.addEventListener('click', function () { setConsent('denied'); });
    }
    if (preferences && !preferences.dataset.analyticsBound) {
      preferences.dataset.analyticsBound = 'true';
      preferences.addEventListener('click', openPreferences);
    }
  }

  function init() {
    ensureBanner();
    bind();
    if (consent === 'granted') {
      load();
      trackPageView();
    } else if (!consent) {
      showBanner();
    }
  }

  window.RegalazoAnalyticsCore = Object.freeze({
    track: track,
    trackPageView: trackPageView,
    load: load,
    getConsent: function () { return consent; },
    setConsent: setConsent,
    openPreferences: openPreferences,
    updateCopy: setText,
    getQueue: function () { return queue.slice(); }
  });
  window.RegalazoAnalytics = window.RegalazoAnalytics || window.RegalazoAnalyticsCore;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
