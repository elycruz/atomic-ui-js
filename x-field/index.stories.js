import {preventDefault} from "../utils/index.js";

window.addEventListener('DOMContentLoaded', () => {
  for (const form of window.document.forms) {
    form.addEventListener('submit', preventDefault);
  }
}, {once: true});
