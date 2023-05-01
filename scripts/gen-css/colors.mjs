/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";
import {xThemes} from "../../constants.js";

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
    const lightnessNums = new Array(9)
        .fill(null, 0, 9)
        .map((_, i) => ((i + 1) * 10) - (i === 9 ? 1 : 0))
        .concat([95, 99, 100]),

      themeColors = [
        primary, secondary, success, info,
        warning, danger, neutral
      ]
        .flatMap(([name, degree, saturation], j) =>
          lightnessNums.flatMap((lightness, i) => {
            const alpha = 1 - ((lightness - 1) * .01);

            return [
              `  --x-${name}-color-${i + 1}: ` +
              `hsl(${degree}, ${saturation}%, ${lightness}%);`,
              `  --x-${name}-color-with-alpha-${i + 1}: ` +
              `hsla(${degree}, ${saturation}%, ${lightness}%, ${alpha});`,
            ];
          })
        ).join('\n'),

      themeVars = Object.keys(xThemes).reduce((agg, k, j) => {
        const themeName = xThemes[k];

        // @todo deprecate --x-theme-{\d} and --x-theme-hsla-{\d} in
        // exchange for the '--x-theme-color-*'.
        return agg + `
.x-theme-${themeName} {
${lightnessNums.flatMap((lightness, i) => {
          return [
            `  --x-color-${i + 1}: var(--x-${themeName}-color-${i + 1});`,
            `  --x-color-with-alpha-${i + 1}: var(--x-${themeName}-color-with-alpha-${i + 1});`,
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
