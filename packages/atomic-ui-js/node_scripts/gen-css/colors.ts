/**
 * colors.mjs
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  { log, error } = console,
  primary = ['primary', 240, 21],
  secondary = ['secondary', 300, 21],
  success = ['success', 120, 21],
  info = ['info', 180, 21],
  warning = ['warning', 60, 21],
  danger = ['danger', 30, 21],
  neutral = ['neutral', 0, 0],
  fileName = 'index.css',
  xThemeKeys = [
    primary,
    secondary,
    success,
    info,
    warning,
    danger,
    neutral,
  ].map(([key]) => key),
  genColorsCss = (
    outputFilePath = path.join(__dirname, '../../css/modules/colors/', fileName)
  ) => {
    const lightnessNums = new Array(10)
        .fill(null, 0, 10)
        .map((_, i) => i * 10)
        .concat([95, 99, 100]),
      themeColors = (
        [primary, secondary, success, info, warning, danger, neutral] as [
          string,
          number,
          number,
        ][]
      )
        .flatMap(([name, hue, saturation]) =>
          lightnessNums.flatMap((lightness, i) => {
            const alpha = 100 - lightness;

            let chroma = Math.min(
              0.21,
              1 -
                (saturation + ((100 - saturation) / lightnessNums.length) * i) *
                  0.01
            ).toFixed(5);

            // If 'neutral' color set chroma to the lowest value
            if (!saturation) chroma = '0';

            return [
              `  --ez-${name}-color-${i}: ` +
                `oklch(${lightness}% ${chroma} ${hue}deg);`,
              `  --ez-${name}-color-with-alpha-${i}: ` +
                `oklch(${lightness}% ${chroma} ${hue}deg / ${alpha}%);`,
            ];
          })
        )
        .join('\n'),
      themeVars = xThemeKeys.reduce<string>((agg: string, themeName) => {
        return (
          agg +
          `
.ez-theme-${themeName} {
${lightnessNums
  .flatMap((lightness, i) => {
    return [
      `  --ez-color-${i}: var(--ez-${themeName}-color-${i});`,
      `  --ez-color-with-alpha-${i}: var(--ez-${themeName}-color-with-alpha-${i});`,
    ];
  })
  .join('\n')}
}\n`
        );
      }, '');

    return fs.promises
      .writeFile(
        outputFilePath,
        `/**
 * colors.css
 *
 * The library's base colors (tentative).
 */

:root {
${themeColors}
  --ez-field: Field;
}

@media (prefers-color-scheme: dark) {
  :root {
    --ez-field: var(--ez-neutral-color-1);
  }
}

${themeVars.trim()}
`
      )
      .then(() => {
        log(`file ${fileName} written successfully`);
      }, error);
  };

export { genColorsCss };
