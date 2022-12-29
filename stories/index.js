const $ = (selector, base = document) =>
    base.querySelector(selector),

  $$ = (selector, base = document) =>
    base.querySelectorAll(selector),

  resizeIframe = iframe => {
    iframe.style.height =
      iframe.contentWindow.document.body.scrollHeight + 'px';
  }
;

// Init
// ----
window.addEventListener('DOMContentLoaded', () => {
  const iframe = $('iframe'),
    menus = $$('.x-menu'),
    nav = $('nav'),
    hambtn = $('.x-hamburger-btn'),

    iframeMutObserver = new MutationObserver(records => {
      let target;
      for (const r of records) {
        target = r.target;
        if (target) break;
      }
      if (target) resizeIframe(iframe);
    });

  iframeMutObserver.observe(iframe.contentWindow.document.body, {
    childList: true,
    subtree: true
  });

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
