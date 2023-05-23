import React from 'react';
import {xThemes} from 'atomic-ui-js/utils/constants.js';

import styles from './page.module.scss';

const xColorGridCName = styles['x-color-grid'];

export default function ColorsPage() {

  const themes = Object.values(xThemes);
  const themeRange = '.'.repeat(12).split('');

  return <section>
    <table className={xColorGridCName}>
      <thead>
        <tr>
          <th colSpan={themes.length}>HSL Color Table</th>
        </tr>
        <tr>
          {themes.map(k => <th>{k}</th>)}
        </tr>
      </thead>
      <tbody>
        {themeRange.map((_, i) =>
          <tr>{themes.map(k =>
            <td style={{background: `var(--x-${k}-color-${i + 1})`}}
              title={`--x-${k}-color-${i + 1}`}>&nbsp;
            </td>
          )}
          </tr>
        )}
      </tbody>
    </table>
    <table className={xColorGridCName}>
      <thead>
        <tr>
          <th colSpan={themes.length}>HSLA Color Table</th>
        </tr>
        <tr>
          {themes.map(k => <th>{k}</th>)}
        </tr>
      </thead>
      <tbody>
        {themeRange.map((_, i) =>
          <tr>{themes.map(k =>
            <td style={{background: `var(--x-${k}-color-with-alpha-${i})`}}
              title={`--x-${k}-color-with-alpha-${i}`}>&nbsp;
            </td>
          )}
          </tr>
        )}
      </tbody>
    </table>
  </section>;
}
