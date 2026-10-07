/*!
 * i18n.js — giacomoricciuxui.com
 * Switch lingua EN | IT.
 * - Lingua iniziale: italiano se il browser è in italiano, altrimenti inglese. La scelta viene ricordata.
 * - Homepage: traduce i testi tramite il dizionario qui sotto (inglese -> italiano).
 * - Pagine case study: mostrano gli elementi con data-l="en" / data-l="it" (gestito dal CSS).
 * - Il pulsante CV punta a Giacomo_Ricci_CV_2026_IT.pdf se esiste, altrimenti resta il CV inglese.
 * Se cambi un testo inglese nel sito, aggiorna anche la voce corrispondente qui.
 */
(function () {
  'use strict';

  var KEY = 'gr-lang';

  var DICT = {
    'Skip to content': 'Vai al contenuto',
    'About': 'Chi sono',
    'Projects': 'Progetti',
    'Contact': 'Contatti',
    'Curious designer with a background in Product Design. Less is more. I care about interaction clarity, usability and scalable design systems, and how small details make interactions smoother.':
      'Designer curioso con un background in Product Design. Less is more. Mi interessano la chiarezza delle interazioni, l\u2019usabilit\u00e0 e i design system scalabili, e come i piccoli dettagli rendano le interazioni pi\u00f9 fluide.',
    'Chat with my AI': 'Chatta con la mia AI',
    'Chat with my AI \u2192': 'Chatta con la mia AI \u2192',
    'Featured Projects': 'Progetti in evidenza',
    'A selection of my recent work in UX/UI and experience design. Tap a project to explore it.':
      'Una selezione dei miei lavori recenti in UX/UI ed experience design. Tocca un progetto per esplorarlo.',
    'Homizy \u2013 Coliving platform': 'Homizy \u2013 Piattaforma di coliving',
    'Lumen \u2013 AI Agent': 'Lumen \u2013 Agente AI',
    'AntiAnti \u2013 Mobile app': 'AntiAnti \u2013 App mobile',
    'PERII \u2013 Wearable & mobile app': 'PERII \u2013 Wearable e app mobile',
    'Coliving platform': 'Piattaforma di coliving',
    'AI Agent': 'Agente AI',
    'Mobile app': 'App mobile',
    'Wearable & mobile app': 'Wearable e app mobile',
    'My diverse background in interaction design and visual systems equips me to tackle visual and user experience challenges across all media with a thoughtful, human-centered approach.':
      'Il mio background eterogeneo in interaction design e sistemi visivi mi permette di affrontare sfide visive e di user experience su ogni media, con un approccio attento e centrato sulle persone.',
    'UX Process': 'Processo UX',
    'Prototyping': 'Prototipazione',
    'Mobile UI': 'UI mobile',
    'Information Architecture': 'Architettura dell\u2019informazione',
    'Usability Testing': 'Test di usabilit\u00e0',
    'UX Writing for AI Systems': 'UX Writing per sistemi AI',
    'Adaptability': 'Adattabilit\u00e0',
    'Skills': 'Competenze',
    'Years of experience': 'Anni di esperienza',
    'Let\u2019s get in touch': 'Mettiamoci in contatto',
    'Let\'s get in touch': 'Mettiamoci in contatto',
    'I\u2019m always open to discussing new projects, creative ideas or opportunities.': 'Sono sempre disponibile a parlare di nuovi progetti, idee creative o opportunit\u00e0.',
    'I\'m always open to discussing new projects, creative ideas or opportunities.': 'Sono sempre disponibile a parlare di nuovi progetti, idee creative o opportunit\u00e0.',
    'Resume': 'CV',
    '\u00a9 2026 Giacomo Ricci \u00b7 Milan': '\u00a9 2026 Giacomo Ricci \u00b7 Milano',
    'View full case study on Behance': 'Vedi il case study completo su Behance'
  };

  var ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];
  var CV_IT = '/assets/Giacomo_Ricci_CV_2026_IT.pdf';
  var current = 'en';
  var textOrig = new WeakMap();
  var cvIt = null; // null = non verificato, true/false dopo il controllo

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function initialLang() {
    try {
      var s = localStorage.getItem(KEY);
      if (s === 'it' || s === 'en') return s;
    } catch (e) {}
    return /^it/i.test(navigator.language || '') ? 'it' : 'en';
  }

  function translateTextNodes(root, lang) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.lang-sw')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      if (!textOrig.has(n)) textOrig.set(n, n.nodeValue);
      var o = textOrig.get(n);
      var key = norm(o);
      if (!key) continue;
      if (lang === 'it' && DICT[key]) {
        var m = o.match(/^(\s*)([\s\S]*?)(\s*)$/);
        n.nodeValue = m[1] + DICT[key] + m[3];
      } else if (lang === 'en' && n.nodeValue !== o) {
        n.nodeValue = o;
      }
    }
  }

  function translateAttrs(lang) {
    var sel = ATTRS.map(function (a) { return '[' + a + ']'; }).join(',');
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        var store = 'i18n' + a.replace(/-/g, '');
        if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(a);
        var o = el.dataset[store];
        el.setAttribute(a, lang === 'it' && DICT[norm(o)] ? DICT[norm(o)] : o);
      });
    });
  }

  function applyCv(lang) {
    var links = document.querySelectorAll('a[href*="Giacomo_Ricci_CV_2026"]');
    if (!links.length) return;
    Array.prototype.forEach.call(links, function (a) {
      if (!a.dataset.cvEn) a.dataset.cvEn = a.getAttribute('href');
    });
    function set(useIt) {
      Array.prototype.forEach.call(links, function (a) {
        a.setAttribute('href', useIt ? CV_IT : a.dataset.cvEn);
      });
    }
    if (lang !== 'it') return set(false);
    if (cvIt !== null) return set(cvIt);
    fetch(CV_IT, { method: 'HEAD' }).then(function (r) {
      cvIt = r.ok && /pdf/i.test(r.headers.get('content-type') || '');
      if (current === 'it') set(cvIt);
    }).catch(function () { cvIt = false; });
  }

  function updateSwitch() {
    var sw = document.querySelector('.lang-sw');
    if (sw) sw.setAttribute('data-lang', current);
    Array.prototype.forEach.call(document.querySelectorAll('.lang-sw button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
  }

  function setLang(lang, persist) {
    current = lang;
    document.documentElement.lang = lang;
    if (persist) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
    translateTextNodes(document.body, lang);
    translateAttrs(lang);
    applyCv(lang);
    updateSwitch();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function buildSwitch() {
    var css = document.createElement('style');
    css.textContent =
      '.lang-sw{--lang-grad:linear-gradient(135deg,#5ab0ff 0%,#1d5be0 100%);--lang-fg:#fff;position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:60;display:grid;grid-template-columns:1fr 1fr;isolation:isolate;padding:4px;border-radius:999px;background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);box-shadow:0 6px 24px rgba(0,0,0,.10);backdrop-filter:blur(12px) saturate(1.4);-webkit-backdrop-filter:blur(12px) saturate(1.4);font:600 13px/1 system-ui,-apple-system,sans-serif;animation:lang-in .6s cubic-bezier(.2,.7,.2,1) both}' +
      '@keyframes lang-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '.lang-sw::before{content:"";position:absolute;z-index:-1;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:var(--lang-grad);box-shadow:0 4px 14px rgba(29,91,224,.35);transition:transform .5s cubic-bezier(.65,0,.35,1),box-shadow .3s}' +
      '.lang-sw[data-lang="it"]::before{transform:translateX(100%)}' +
      '.lang-sw button{all:unset;box-sizing:border-box;cursor:pointer;min-width:46px;padding:9px 14px;text-align:center;border-radius:999px;color:#5b6472;letter-spacing:.05em;transition:color .35s,transform .2s}' +
      '.lang-sw button:hover{transform:scale(1.06)}' +
      '.lang-sw button:focus-visible{outline:2px solid #1d5be0;outline-offset:2px}' +
      '.lang-sw button[aria-pressed="true"]{color:var(--lang-fg)}' +
      '@media(prefers-reduced-motion:reduce){.lang-sw,.lang-sw::before,.lang-sw button{animation:none;transition:none}}' +
      '@media(prefers-color-scheme:dark){:root:not([data-theme=light]) .lang-sw{background:rgba(20,24,33,.82);border-color:rgba(255,255,255,.12)}:root:not([data-theme=light]) .lang-sw button[aria-pressed="false"]{color:#b4bccb}}' +
      ':root[data-theme=dark] .lang-sw{background:rgba(20,24,33,.82);border-color:rgba(255,255,255,.12)}:root[data-theme=dark] .lang-sw button[aria-pressed="false"]{color:#b4bccb}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'lang-sw';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Language / Lingua');
    [['en', 'EN'], ['it', 'IT']].forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', p[0]);
      b.textContent = p[1];
      b.addEventListener('click', function () { setLang(p[0], true); });
      box.appendChild(b);
    });
    document.body.appendChild(box);
  }

  // Copia gradiente e colore testo dai pulsanti del sito, così lo switch resta identico
  function syncSwitchStyle() {
    var sw = document.querySelector('.lang-sw');
    if (!sw) return;
    var ref = document.querySelector('.btn:not(.o)') || document.querySelector('.btn');
    var grad = '', fg = '';
    if (ref) {
      var cs = getComputedStyle(ref);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') grad = cs.backgroundImage;
      else if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') grad = cs.backgroundColor;
      fg = cs.color;
    }
    if (grad) sw.style.setProperty('--lang-grad', grad);
    if (fg) sw.style.setProperty('--lang-fg', fg);
  }

  function watchTheme() {
    if (!('MutationObserver' in window)) return;
    new MutationObserver(function () {
      setTimeout(syncSwitchStyle, 80);
      setTimeout(syncSwitchStyle, 950);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  }

  function watchNewContent() {
    if (!('MutationObserver' in window)) return;
    var t = null;
    new MutationObserver(function () {
      if (current !== 'it') return;
      clearTimeout(t);
      t = setTimeout(function () { translateTextNodes(document.body, 'it'); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    buildSwitch();
    setLang(initialLang(), false);
    syncSwitchStyle();
    watchTheme();
    watchNewContent();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
