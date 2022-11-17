/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";
import {fib} from "../../src/utils/index.js";

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
      fibNums = fib(89).slice(5), // Drop numbers 1, 2, 5, and 8 - These will generate to dark 'lightness'
      content = `:root {\n${[
        primary, secondary, success, info,
        warning, danger, neutral
      ]
        .flatMap(([c, cN], j) =>
          fibNums.flatMap((lightness, i) => ([
              `  --x-${c}-hsl-${i + 1}: ` +
              `hsl(${cN}, ${c === 'neutral' ? 0 : 75}%, ${lightness}%)`,
              // `  --x-${c}-hsla-${i + 1}: ` +
              // `hsla(${cN}, ${c === 'neutral' ? 0 : 80}%, ${l}%, ${(1 - (offset * .16)).toFixed(3)})`
            ]))
        ).join(';\n')
      }\n}\n`;

    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genColorsCss};
