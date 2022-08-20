import {html} from "lit-html";
import {EcmsTheme} from "../types";
import {stylesheet} from "../utils/storybook/stylesheet";
import {range} from "fjl";

const ecmsThemes = [
  EcmsTheme.Primary,
  EcmsTheme.Secondary,
  EcmsTheme.Success,
  EcmsTheme.Danger,
  EcmsTheme.Warning,
  EcmsTheme.Info,
  EcmsTheme.Light,
  EcmsTheme.Surface,
  EcmsTheme.Grayscale,
];

export const colorThemes = () => {
  return html`
    ${stylesheet}
    <style>
      .ecms-color-grid th {
        padding: var(--ecms-13px);
      }
      .ecms-color-grid tbody td {
        padding: var(--ecms-13px);
      }
    </style>
    <table class="ecms-color-grid">
      <thead>
        <tr>
          ${ecmsThemes.map(k => html`<th>${k}</th>`)}
        </tr>
      </thead>
      <tbody>
      ${range(1, 10).map(i => html`
        <tr>${ecmsThemes.map(k =>html`
          <td style="background: var(--ecms-color-${k}-${i});">&nbsp;</td>
        `)}
        </tr>
      `)}
      </tbody>
    </table>
  `;
};
