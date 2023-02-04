const $ = (selector, base = document) =>
    base.querySelector(selector),

  $$ = (selector, base = document) =>
    base.querySelectorAll(selector)
;

// Init
// ----
window.addEventListener('load', () => {
  const iframe = $('iframe'),
    header = $('.x-app-header'),
    footer = $('.x-app-footer'),
    menus = $$('.x-menu'),
    nav = $('.x-app-nav'),
    hambtn = $('.x-hamburger-btn'),

    mainIframeHeightResize = (iframe) => {
      iframe.style.height = window.innerHeight + (-1 * (header.offsetHeight + footer.offsetHeight)) - 12 + 'px';
    },

    iframeMutObserver = new MutationObserver(records => {
      let target;
      for (const r of records) {
        target = r.target;
        if (target) break;
      }
      if (target) mainIframeHeightResize(iframe);
    });

  iframeMutObserver.observe(iframe.contentWindow.document.body, {
    childList: true,
    subtree: true
  });

  iframe.onload = e => mainIframeHeightResize(e.currentTarget);

  hambtn.addEventListener('click', () => {
    nav.classList.toggle('x-display-none');
  });

  // Listen for iframe load for resize
  // iframe.addEventListener('load', () => resizeIframe(iframe));

  // Load stories into iframe
  menus.forEach(menu => menu.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.localName === 'a') {
      iframe.src = e.target.href;
    }
  }));
}, {once: true});
