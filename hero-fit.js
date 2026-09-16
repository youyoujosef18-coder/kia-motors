/* Keeps the showroom hero exactly one screen tall.
   The sticky header wraps to different heights on narrow viewports (99px on desktop,
   up to ~250px on a small phone), so it is measured rather than guessed, and published
   as --hero-chrome. The hero's min-height is calc(100svh - var(--hero-chrome)). */
(function () {
  var last = -1;

  function fit() {
    var h = document.querySelector('header');
    if (!h) return;
    var px = Math.round(h.getBoundingClientRect().height);
    if (!px || px === last) return;
    last = px;
    document.documentElement.style.setProperty('--hero-chrome', px + 'px');
  }

  function start() {
    fit();
    scrolled();
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(fit);
      ro.observe(document.documentElement);
      if (document.body) ro.observe(document.body);
    }
    // The app re-renders the header on navigation, language and sign-in changes.
    if (window.MutationObserver && document.body) {
      var pending = null;
      new MutationObserver(function () {
        if (pending) return;
        pending = setTimeout(function () { pending = null; fit(); }, 120);
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  /* The nav is transparent over the hero film and solid once you scroll off it. */
  function scrolled() {
    var on = (window.scrollY || document.documentElement.scrollTop || 0) > 24 ? '1' : '0';
    if (document.documentElement.getAttribute('data-scrolled') !== on) {
      document.documentElement.setAttribute('data-scrolled', on);
    }
  }

  addEventListener('scroll', scrolled, { passive: true });
  addEventListener('resize', fit);
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', start);
  else start();
})();
