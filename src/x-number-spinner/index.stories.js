import { isset, log, qs } from "../utils/index.js";
import { allowedDataChars } from "./x-number-spinner.js";

window.addEventListener("DOMContentLoaded", () => {
  if (document.forms) {
    const len = document.forms.length;
    for (let i = 0; i < len; i += 1) {
      const f = document.forms.item(i);
      f.addEventListener("change", log);
      f.addEventListener("input", log);
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.currentTarget,
          data = new FormData(form);

        console.table(
          Array.from(data.entries())
            .reduce((agg, [k, v]) => {
              agg[k] = v;
              return agg;
            }, {}),
        );
      });
    }
  }

  let prevTextInputValue = "";

  const textInput = qs('[name="text-input"]'),
    // Empty array signals use of "browsers" locale.
    currencyFmt = new Intl.NumberFormat([], {
      style: "currency",
      currency: "USD",
    });

  // text-input char restrict
  textInput.addEventListener("input", (e) => {
    e.preventDefault();
    const input = e.currentTarget;
    let newValue = prevTextInputValue;
    if (isset(e.data) && !allowedDataChars.test(e.data)) {
      input.value = prevTextInputValue;
    } else {
      prevTextInputValue = input.value;
    }
  });
}, { once: true });
