const $ = (selector, base = document) =>
    base.querySelector(selector),

  $$ = (selector, base = document) =>
    base.querySelectorAll(selector)
;

// Init
// ----
window.addEventListener('DOMContentLoaded', () => {
  const iframe = $('iframe'),
    menu = $('menu');

  // Listen for iframe load for resize
  // iframe.addEventListener('load', () => {
  //   iframe.style.height =
  //     iframe.contentWindow.document.body.scrollHeight + 'px';
  // });

  // Load stories into iframe
  menu.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.localName === 'a') {
      iframe.src = e.target.href;
    }
  });
}, {once: true});
