import {addRippleEffect, rippleResizeObserver} from "./ripple.js";
import {$$} from './utils';

window.addEventListener('DOMContentLoaded', e => {
  $$('.x-btn, .x-button').forEach(b => {
    b.rippleEffect = 'bounded';
    addRippleEffect(b);
    // rippleResizeObserver.observe(b, {});
  })
}, {once: true})
