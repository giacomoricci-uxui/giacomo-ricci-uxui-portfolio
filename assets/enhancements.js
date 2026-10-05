/*!
 * enhancements.js — giacomoricciuxui.com
 * 1) Contatore "contagiri" per i numeri 17 (Skills) e 2+ (Years of experience)
 * 2) Scroll fluido e con easing per i link ancora (About, Projects, Contact, AI)
 *
 * Nessuna dipendenza. Rispetta "prefers-reduced-motion".
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * 1. CONTATORE
   * ------------------------------------------------------------------ */

  var COUNT_DURATION = 1600; // ms
  var COUNT_START = 1;       // parte da 1, come richiesto

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // Trova gli elementi-numero (es. "17" e "2+") senza dover conoscere le classi CSS.
  // In alternativa puoi aggiungere data-count="17" direttamente nell'HTML.
  function findCounters() {
    var found = [];
    var explicit = document.querySelectorAll('[data-count]');
    if (explicit.length) {
      Array.prototype.forEach.call(explicit, function (el) { found.push(el); });
      return found;
    }
    var all = document.querySelectorAll('body *');
    Array.prototype.forEach.call(all, function (el) {
      if (el.children.length !== 0) return;
      if (!/^\d+\+?$/.test(el.textContent.trim())) return;
      var parent = el.parentElement;
      if (!parent) return;
      var ctx = parent.textContent || '';
      if (ctx.length < 60 && /skills|years|experience/i.test(ctx)) found.push(el);
    });
    return found;
  }

  function animateCounter(el) {
    var raw = el.getAttribute('data-count') || el.textContent.trim();
    var match = raw.match(/^(\d+)(\+?)$/);
    if (!match) return;
    var target = parseInt(match[1], 10);
    var suffix = match[2];
    var start = Math.min(COUNT_START, target);
    var t0 = null;

    function frame(now) {
      if (t0 === null) t0 = now;
      var p = Math.min((now - t0) / COUNT_DURATION, 1);
      var value = Math.round(start + (target - start) * easeOutQuart(p));
      el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    var counters = findCounters();
    if (!counters.length) return;

    // Evita che la larghezza "salti" mentre le cifre cambiano
    counters.forEach(function (el) {
      el.style.fontVariantNumeric = 'tabular-nums';
    });

    if (reduceMotion || !('IntersectionObserver' in window)) return; // lascia i valori finali

    // Prima dell'animazione mostra il valore iniziale, così non c'è il flash del 17
    var finals = counters.map(function (el) {
      var raw = el.getAttribute('data-count') || el.textContent.trim();
      var m = raw.match(/^(\d+)(\+?)$/);
      if (m) el.textContent = Math.min(COUNT_START, parseInt(m[1], 10)) + m[2];
      return raw;
    });
    counters.forEach(function (el, i) { el.setAttribute('data-count', finals[i]); });

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target); // una sola volta
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   * 2. SCROLL FLUIDO
   * ------------------------------------------------------------------ */

  var rafId = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Altezza dell'header fisso/sticky, così il titolo della sezione non finisce sotto
  function headerOffset() {
    var candidates = document.querySelectorAll('header, nav');
    var h = 0;
    Array.prototype.forEach.call(candidates, function (el) {
      var pos = getComputedStyle(el).position;
      if (pos === 'fixed' || pos === 'sticky') h = Math.max(h, el.getBoundingClientRect().height);
    });
    return h;
  }

  function cancelScroll() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      document.documentElement.style.scrollBehavior = '';
    }
  }

  function smoothScrollTo(target, done) {
    var startY = window.pageYOffset;
    var maxY = document.documentElement.scrollHeight - window.innerHeight;
    var endY = Math.max(0, Math.min(maxY, target.getBoundingClientRect().top + startY - headerOffset()));
    var distance = endY - startY;

    if (reduceMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, endY);
      if (done) done();
      return;
    }

    // Durata proporzionale alla distanza, ma sempre tra 700 e 1300 ms
    var duration = Math.min(1300, Math.max(700, Math.abs(distance) * 0.45));
    var t0 = null;

    cancelScroll();
    // Se nel CSS c'è scroll-behavior:smooth, lo spegniamo durante l'animazione per evitare scatti
    document.documentElement.style.scrollBehavior = 'auto';

    function frame(now) {
      if (t0 === null) t0 = now;
      var p = Math.min((now - t0) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(p));
      if (p < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = null;
        document.documentElement.style.scrollBehavior = '';
        if (done) done();
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  function resolveTarget(link) {
    // Funziona sia con href="#about" sia con href="/#about" (se siamo già sulla home)
    var url;
    try { url = new URL(link.getAttribute('href'), window.location.href); } catch (e) { return null; }
    if (!url.hash || url.hash === '#') return null;
    if (url.origin !== window.location.origin || url.pathname.replace(/\/$/, '') !== window.location.pathname.replace(/\/$/, '')) return null;
    try { return document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (e) { return null; }
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target.closest ? e.target.closest('a[href], [data-scroll-to]') : null;
      if (!link) return;

      var target = null;
      var hash = '';
      var custom = link.getAttribute('data-scroll-to'); // opzionale: <button data-scroll-to="#contact">
      if (custom) {
        target = document.querySelector(custom);
        hash = custom;
      } else {
        target = resolveTarget(link);
        hash = target ? '#' + target.id : '';
      }
      if (!target) return;

      e.preventDefault();
      smoothScrollTo(target, function () {
        // Accessibilità: sposta il focus sulla sezione senza far ripartire lo scroll
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
      if (history.pushState && window.location.hash !== hash) history.pushState(null, '', hash);
    });

    // L'utente riprende il controllo: ferma l'animazione
    ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
      window.addEventListener(evt, cancelScroll, { passive: true });
    });
  }

  /* ------------------------------------------------------------------ */

  function init() {
    initCounters();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
