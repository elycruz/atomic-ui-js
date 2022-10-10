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
    const out = [];
    let a = 0, b = 1, i = 0, c = 1;
    while (a < 2000 && b < 2000) {
      a = a + b;
      b = a + b;
      i += 1;
      c *= 2;
      out.push(`  --x-${a}px: ${a / 16}rem`);
      out.push(`  --x-${b}px: ${b / 16}rem`);
      if (c !== b && c !== a) {
        out.push(`  --x-${c}px: ${c / 16}rem`);
      }
    }

    const content =
      `/**
 * spacing.css
 * Fibonacci sequence as spacing properties.
 */
:root {\n${out.join(';\n')}\n}\n`;
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

module.exports = {genSpacingCss};
