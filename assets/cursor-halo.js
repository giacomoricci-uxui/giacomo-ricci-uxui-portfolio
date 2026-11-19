/*!
 * cursor-halo.js — giacomoricciuxui.com
 * Alone azzurro leggero che segue il cursore SOLO nella schermata principale
 * (dalla cima della pagina fino alla fine della sezione con nome e cognome).
 * Sta dietro ai contenuti: non copre mai testi, pulsanti o card.
 *
 * IMPOSTAZIONI:
 *   ZONE   'hero'   = solo la sezione con nome e cognome (consigliato)
 *          'screen' = tutta la prima schermata visibile (se è più alta della sezione)
 *   SIZE   diametro massimo dell'alone, in pixel
 *   SOFT   morbidezza dell'inseguimento, in secondi (più alto = più lento)
 *   POWER  intensità da 0 a 1 (0.22 = leggero)
 */
(function () {
  'use strict';

  var ZONE  = 'hero';
  var SIZE  = 760;
  var SOFT  = 0.14;
  var POWER = 0.22;

  // Niente su touch (non c'è cursore) o se l'utente riduce le animazioni
  if (window.matchMedia && (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(hover: none)').matches)) return;

  function init() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';

    var css = document.createElement('style');
    var grad = function (a, b, c) {
      return 'radial-gradient(circle,rgba(' + a + ',calc(var(--hp,.22)*.95)) 0%,rgba(' + a + ',calc(var(--hp,.22)*.52)) 30%,rgba(' + b + ',calc(var(--hp,.22)*.2)) 54%,rgba(' + b + ',0) 72%)';
    };
    css.textContent =
      '.halo-layer{position:absolute;left:0;right:0;overflow:hidden;z-index:-1;pointer-events:none;' +
        '-webkit-mask-image:linear-gradient(to bottom,#000 calc(100% - 140px),transparent 100%);' +
        'mask-image:linear-gradient(to bottom,#000 calc(100% - 140px),transparent 100%)}' +
      '.halo{position:absolute;left:0;top:0;border-radius:50%;pointer-events:none;opacity:0;' +
        'transition:opacity .7s cubic-bezier(.22,1,.36,1);will-change:transform,opacity;background:' + grad('63,180,255', '29,91,224') + '}' +
      '.halo.on{opacity:1}' +
      ':root[data-theme="dark"] .halo{background:' + grad('110,206,255', '52,132,255') + '}' +
      '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .halo{background:' + grad('110,206,255', '52,132,255') + '}}';
    document.head.appendChild(css);

    var layer = document.createElement('div');
    layer.className = 'halo-layer';
    layer.setAttribute('aria-hidden', 'true');
    var halo = document.createElement('div');
    halo.className = 'halo';
    layer.appendChild(halo);
    hero.insertBefore(layer, hero.firstChild);

    var d = SIZE;
    function place() {
      // zona = dalla cima della pagina alla fine della sezione principale
      var hr = hero.getBoundingClientRect(), top = hr.top + window.pageYOffset;
      var bottom = top + hero.offsetHeight;
      if (ZONE === 'screen') bottom = Math.max(bottom, window.innerHeight);
      layer.style.top = (-top) + 'px';
      layer.style.height = bottom + 'px';
      d = Math.min(SIZE, Math.max(420, window.innerWidth * 0.55));
      halo.style.width = halo.style.height = d + 'px';
      halo.style.setProperty('--hp', POWER);
    }
    place();
    window.addEventListener('resize', place, { passive: true });
    window.addEventListener('load', place);
    if (window.ResizeObserver) new ResizeObserver(place).observe(hero);

    var cx = -9999, cy = -9999, x = 0, y = 0, tx = 0, ty = 0;
    var started = false, raf = 0, last = 0;

    function frame(now) {
      raf = 0;
      var dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      var r = layer.getBoundingClientRect();
      var inside = cx >= r.left && cx <= r.right && cy >= Math.max(r.top, 0) && cy <= r.bottom && r.bottom > 0;
      tx = cx - r.left; ty = cy - r.top;
      if (inside && !started) { x = tx; y = ty; started = true; }
      if (!inside) started = false;
      halo.classList.toggle('on', inside);
      if (inside) {
        var k = 1 - Math.exp(-dt / SOFT);
        x += (tx - x) * k; y += (ty - y) * k;
        halo.style.transform = 'translate3d(' + (x - d / 2).toFixed(1) + 'px,' + (y - d / 2).toFixed(1) + 'px,0)';
        if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) kick();
      }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      cx = e.clientX; cy = e.clientY; kick();
    }, { passive: true });
    window.addEventListener('scroll', kick, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { cx = cy = -9999; kick(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
