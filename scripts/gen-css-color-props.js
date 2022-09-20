/**
 * gen-color-scheme-css.js
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
  grayscale = ['grayscale', 0],

  /**
   * @param {number} n
   * @returns {number[]}
   */
  parseBase255Cmps = (n, groupBinSize = 4) => {
    const binStr = n.toString(2),
      binSize = binStr.length,
      parts = [];
    for (let i = 0; i < binSize; i += groupBinSize) {
      parts.push(Number('0b' + binStr.slice(i, groupBinSize + i)));
    }
    return parts;
  };

(async () => {
  const outputFilePath = path.join(__dirname, '../src/css/colors.css'),
    content = `:root {\n${Array(6).fill(0, 0, 6)
      .flatMap((_, i) => {
        // const lightness = 255 * .1 * i;
        return [
          primary, secondary, success, info,
          warning, danger, grayscale
        ]
          .flatMap(([c, cN], j) => {
            let l = (i + 1) * 16;
            return [
              `  --x-${c}-hsl-${i + 1}: ` +
              `hsl(${cN}, ${c === 'grayscale' ? 0 : 75}%, ${l}%)`,
              `  --x-${c}-hsla-${i + 1}: ` +
              `hsla(${cN}, ${c === 'grayscale' ? 0 : 80}%, ${l}%, ${(1 - ((i + 1) * .16)).toFixed(3)})`
            ];
          })
      }).join(';\n')
    }\n}\n`;

  return await fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
})();
