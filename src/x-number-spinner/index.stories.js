import {log} from "../utils";

window.addEventListener('DOMContentLoaded', () => {
  if (document.forms) {
    const len = document.forms.length;
    for (let i = 0; i < len; i += 1) {
      const f = document.forms.item(i);
      f.addEventListener('change', log);
      f.addEventListener('input', log);
      f.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.currentTarget,
          data = new FormData(form);

        console.table(
          Array.from(data.entries())
            .reduce((agg, [k, v]) => {
              agg[k] = v;
              return agg;
            }, {})
        );
      });
    }
  }
}, {once: true});
