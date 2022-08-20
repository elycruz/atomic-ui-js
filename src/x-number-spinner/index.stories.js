import {log} from "../utils";

window.addEventListener('DOMContentLoaded', e => {
  if (document.forms) {
    const len = document.forms.length;
    for (let i = 0; i < len; i += 1) {
      const f = document.forms.item(i);
      f.addEventListener('change', log);
      f.addEventListener('input', log);
    }
  }
}, {once: true});
