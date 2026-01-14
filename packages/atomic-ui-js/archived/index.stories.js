import {debounce, $, $$} from '../utils/index.js';

// Init
// ----
window.addEventListener('DOMContentLoaded', () => {
  const iframe = $('iframe'),
    header = $('.ez-appbar'),
    footer = $('.ez-app-footer'),
    menus = $$('.ez-menu'),
    nav = $('.ez-app-nav'),
    hamburgerBtn = $('.ez-hamburger-btn'),
    html = $('html'),

    mainIframeHeightResize = (iframe) => {
      const possNewHeight = window.innerHeight +
          (-1 * (header.scrollHeight + footer.scrollHeight));

      iframe.style.height = possNewHeight + 'px';
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

  // Listen for iframe load for resize
  iframe.addEventListener('load', e => mainIframeHeightResize(e.currentTarget));

  hamburgerBtn.addEventListener('click', () => {
    html.classList.toggle('ez-nav-hidden');
    nav.classList.toggle('ez-display-none');
  });

  // Load stories into iframe
  menus.forEach(menu => menu.addEventListener('click', e => {
    if (e.target.localName === 'a') {
      setIframeSrcFromHash(iframe, e.target.hash);
    }
  }));

  const resizeHandler = debounce(() => {
    mainIframeHeightResize(iframe);
  }, 377);

  window.addEventListener('popstate', console.log);
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('orientationchange', resizeHandler);

  // Load initial page
  if (window.location.hash) {
    setIframeSrcFromHash(iframe, window.location.hash);
  }

}, {once: true});

const setIframeSrcFromHash = (iframe, hash = '#colors.html') => {
  iframe.src = hash.slice(1) ?? '';
};
