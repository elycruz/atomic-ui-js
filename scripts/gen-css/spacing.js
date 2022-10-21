/**
 * gen-color-scheme-css.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console,
  fileName = 'spacing.css',

  genSpacingCss = () => {
    const outputFilePath = path.join(__dirname, '../../src/css/modules/', fileName);
    const out = {};
    let a = 0, b = 1, i = 0, c = 1;
    while (a < 2000 && b < 2000) {
      a = a + b;
      b = a + b;
      i += 1;
      c *= 2;
      if (c !== b && c !== a) {
        out[c] = `  --x-${c}px: ${c / 16}rem`;
      }
      out[a] = `  --x-${a}px: ${a / 16}rem`;
      out[b] = `  --x-${b}px: ${b / 16}rem`;
    }

    const content =
      `/**
 * spacing.css
 * Fibonacci sequence as spacing properties.
 */
:root {\n${Object.keys(out).sort((_a, _b) => {
        const a = parseInt(_a, 10),
          b = parseInt(_b, 10);
        if (a < b) return -1;
        return a > b ? 1 : 0;
      }).map(k => out[k]).join(';\n')};\n}\n`;
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

module.exports = {genSpacingCss};
