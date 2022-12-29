/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";
import {factorsOf, fib} from "../../utils/index.js";
import {xThemes} from "../../constants.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {log, error} = console,
  primary = ['primary', 240],
  secondary = ['secondary', 300],
  success = ['success', 120],
  info = ['info', 180],
  warning = ['warning', 30],
  danger = ['danger', 0],
  neutral = ['neutral', 0],
  fileName = 'index.css',

  genColorsCss = (outputFilePath = path.join(__dirname, '../../src/css/modules/colors/', fileName)) => {
    const lightnessNums = '.'.repeat(10)
        .split('')
        .map((_, i) => ((i + 1) * 10) - (i === 9 ? 1 : -0)),

      themeColors = [
        primary, secondary, success, info,
        warning, danger, neutral
      ]
        .flatMap(([c, cN], j) =>
          lightnessNums.flatMap((lightness, i) => ([
            `  --x-${c}-hsl-${i + 1}: ` +
            `hsl(${cN}, ${c === 'neutral' ? 0 : 72}%, ${lightness}%)`,
          ]))
        ).join(';\n'),

      themeVars = Object.keys(xThemes).reduce((agg, k, j) => {
        const themeName = xThemes[k];
        return agg + `
.x-theme-${themeName} {
${[lightnessNums.map((_, i) =>
          `  --x-theme-${i + 1}: var(--x-${themeName}-hsl-${i + 1});`).join('\n')]}
}\n`
      }, '');

    return fs.promises.writeFile(outputFilePath, `/**
 * colors.css
 *
 * The library's base colors (tentative).
 */

:root {
${themeColors}
}

${themeVars.trim()}
`)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genColorsCss};
