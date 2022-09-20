/**
 * gen-color-scheme-css.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console
;

(async () => {
  const outputFilePath = path.join(__dirname, '../src/css/modules/spacing.css');
  const out = [];
  let a = 0, b = 1, i = 0;
  while (a < 2000 && b < 2000) {
    a = a + b;
    b = a + b;
    i += 1;
    out.push(`  --x-${a}px: ${a / 16}rem`);
    out.push(`  --x-${b}px: ${b / 16}rem`);
  }

  const content =
    `/**
 * spacing.css
 * Fibonacci sequence as spacing properties.
 */
:root {\n${out.join(';\n')}\n}\n`;
  return await fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
})();
