/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs.js';
import * as path from "path.js";
import url from "url.js";
import {xThemes} from "../../src/utils/constants.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {log, error} = console,
  primary = ['primary', 256, 72],
  secondary = ['secondary', 300, 72],
  success = ['success', 120, 72],
  info = ['info', 180, 72],
  warning = ['warning', 30, 72],
  danger = ['danger', 0, 72],
  neutral = ['neutral', 0, 0],
  fileName = 'index.css',

  genColorsCss = (outputFilePath = path.join(__dirname, '../../css/modules/colors/', fileName)) => {
    const lightnessNums = new Array(10)
        .fill(null, 0, 10)
        .map((_, i) => i * 10)
        .concat([95, 99, 100]),

      themeColors = [
        primary, secondary, success, info,
        warning, danger, neutral
      ]
        .flatMap(([name, degree, saturation], j) =>
          lightnessNums.flatMap((lightness, i) => {
            const alpha = 100 - lightness;

            return [
              `  --x-${name}-color-${i}: ` +
              `hsl(${degree}deg, ${saturation}%, ${lightness}%);`,
              `  --x-${name}-color-with-alpha-${i}: ` +
              `hsla(${degree}deg, ${saturation}%, ${lightness}%, ${alpha * .01}%);`,
            ];
          })
        ).join('\n'),

      themeVars = Object.keys(xThemes).reduce((agg, k, j) => {
        const themeName = xThemes[k];

        return agg + `
.x-theme-${themeName} {
${lightnessNums.flatMap((lightness, i) => {
          return [
            `  --x-color-${i}: var(--x-${themeName}-color-${i});`,
            `  --x-color-with-alpha-${i}: var(--x-${themeName}-color-with-alpha-${i});`,
          ];
        })
          .join('\n')}
}\n`
      }, '');

    return fs.promises.writeFile(outputFilePath, `/**
 * colors.css
 *
 * The library's base colors (tentative).
 */

:root {
${themeColors}

  --x-field: Field;
}

@media (prefers-color-scheme: dark) {
  :root {
    --x-field: var(--x-neutral-color-1);
  }
}

${themeVars.trim()}
`)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genColorsCss};
