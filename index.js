import {addRippleEffect} from "./ripple.js";
import {$$} from './utils';

window.addEventListener('DOMContentLoaded', e => {
  $$('.x-btn, .x-button').forEach(b => {
    b.rippleEffect = 'bounded';
    addRippleEffect(b);
  })
}, {once: true})
