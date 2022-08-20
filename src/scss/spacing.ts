import {html} from "lit-html";
import {fib} from "../utils/number";
import {css} from "lit";
import {stylesheet} from "../utils/storybook/stylesheet";
import {range} from "fjl";

const fibSeries = fib(1, 987);

// Remove the first `0` and `1` from the list (since `1` repeats and `0` is not used in spacing defined css properties);
fibSeries.shift();
fibSeries.shift();

export const spacing = () => {
  return html`
    ${stylesheet}
    <style>${css`
      .box {
        display: inline-block;
        background: var(--ecms-color-warning-5);
        border: var(--ecms-1px) solid var(--ecms-color-primary-3);
        margin: var(--ecms-8px);
      }

      .row {
        display: flex;
        flex-flow: row wrap;
      }

      .row, h3 {
        margin-bottom: var(--ecms-21px);
      }

      .column {
        display: flex;
        flex-flow: column nowrap;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      h5 {
        display: inline-block;
        margin-bottom: var(--ecms-21px);
      }
    `}
    </style>
    <div class="grid">
      <div>
        <header>
          <h3 class="ecms-text-h3">Spacing</h3>
        </header>
        <div>
          <p>Our spacing properties consist of css properties that contain unit values used for measurements.</p>
          <p>Additionally, our default defined spacing values are based on the first 16 numbers (minus the first 2) of
            the fibonacci series.</p>
        </div>
      </div>
      <div></div>
      <h5 class="ecms-text-h5">Sizes</h5>
      <h5 class="ecms-text-h5">Boxes</h5>
      ${fibSeries.flatMap((x, i) => html`
        <h3>${x}px (x ${x}px) (--ecms-spacing-${i + 1})</h3>
        <div class="row">${range(0, 15 - (i + 1)).map(() => html`
          <div class="box" style="width: var(--ecms-spacing-${i + 1}); height: var(--ecms-spacing-${i + 1});"></div>
        `)}
        </div>
      `)}
      <header>
        <h3 class="ecms-text-h4">Specific Names</h3>
      </header>
      <div></div>
      ${fibSeries.flatMap((x, i) => html`
        <h3>${x}px (x ${x}px) (--ecms-${x}px)</h3>
        <div class="row">${range(0, 15 - (i + 1)).map(() => html`
          <div class="box" style="width: var(--ecms-${x}px); height: var(--ecms-${x}px);"></div>
        `)}
        </div>
      `)}
    </div>
  `;
}
