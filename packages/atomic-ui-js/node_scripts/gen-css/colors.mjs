/**
 * colors.mjs
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";
import {xThemes} from "../../utils/constants.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),

  {log, error} = console,

  primary = ['primary', 240, 21],
  secondary = ['secondary', 300, 21],
  success = ['success', 120, 21],
  info = ['info', 180, 21],
  warning = ['warning', 60, 21],
  danger = ['danger', 30, 21],
  neutral = ['neutral', 0, 0],
  fileName = 'index.css',
  xThemeKeys = Object.keys(xThemes),

  genColorsCss = (outputFilePath = path.join(__dirname, '../../css/modules/colors/', fileName)) => {
    const lightnessNums = new Array(10)
        .fill(null, 0, 10)
        .map((_, i) => i * 10)
        .concat([95, 99, 100]),

      themeColors = [
        primary, secondary, success, info,
        warning, danger, neutral
      ]
        .flatMap(([name, hue, saturation], j) =>
          lightnessNums.flatMap((lightness, i) => {
            const alpha = 100 - lightness;
            let chroma = Math.min(
              0.21,
              1 - (saturation + ((100 - saturation) / lightnessNums.length) * i) * .01
            ).toFixed(5);

            // If 'neutral' color set chroma to the lowest value
            if (!saturation) chroma = 0;

            return [
              `  --x-${name}-color-${i}: ` +
              `oklch(${lightness}% ${chroma} ${hue}deg);`,
              `  --x-${name}-color-with-alpha-${i}: ` +
              `oklch(${lightness}% ${chroma} ${hue}deg / ${(alpha * .01).toFixed(5)});`,
            ];
          })
        ).join('\n'),

      themeVars = xThemeKeys.reduce((agg, k, j) => {
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
