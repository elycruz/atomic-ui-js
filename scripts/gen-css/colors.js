/**
 * colors.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console,
  primary = ['primary', 240],
  secondary = ['secondary', 300],
  success = ['success', 120],
  info = ['info', 180],
  warning = ['warning', 30],
  danger = ['danger', 0],
  neutral = ['neutral', 0],
  fileName = 'colors.css',

  genColorsCss = (outputFilePath = path.join(__dirname, '../../src/css/modules/', fileName)) => {
    const content = `:root {\n${Array(6).fill(0, 0, 6)
      .flatMap((_, i) => {
        // const lightness = 255 * .1 * i;
        return [
          primary, secondary, success, info,
          warning, danger, neutral
        ]
          .flatMap(([c, cN], j) => {
            let l = (i + 1) * 16;
            return [
              `  --x-${c}-hsl-${i + 1}: ` +
              `hsl(${cN}, ${c === 'neutral' ? 0 : 75}%, ${l}%)`,
              `  --x-${c}-hsla-${i + 1}: ` +
              `hsla(${cN}, ${c === 'neutral' ? 0 : 80}%, ${l}%, ${(1 - ((i + 1) * .16)).toFixed(3)})`
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

module.exports = {genColorsCss};