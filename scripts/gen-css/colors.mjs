/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";

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
    const range = Array(5).fill(0, 0, 5),
      content = `:root {\n${[
        primary, secondary, success, info,
        warning, danger, neutral
      ]
      .flatMap(([c, cN], j) => {
        // const lightness = 255 * .1 * i;
        return range.flatMap((_, i) => {
            const offset = i + 1;
            let l = offset * 16;
            return [
              `  --x-${c}-hsl-${i + 1}: ` +
              `hsl(${cN}, ${c === 'neutral' ? 0 : 75}%, ${l}%)`,
              // `  --x-${c}-hsla-${i + 1}: ` +
              // `hsla(${cN}, ${c === 'neutral' ? 0 : 80}%, ${l}%, ${(1 - (offset * .16)).toFixed(3)})`
            ];
          })
      }).join(';\n')
    }\n}\n`;

    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genColorsCss};
