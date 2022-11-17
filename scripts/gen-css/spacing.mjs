/**
 * gen-spacing-scheme-css.js
 *
 * Outputs the library's css spacing properties - We are supporting multiples of 6 and 8 and the fibonacci sequence.
 */
import fs from 'fs';
import * as path from "path";
import url from "url";
import * as utils from '../../src/utils/number.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {fib, factorsOf} = utils,
  {log, error} = console,
  fileName = 'spacing.css',

  genSpacingCss = () => {
    const outputFilePath = path.join(__dirname, '../../src/css/modules/', fileName),

      fibs = fib(5000),
      factorsOf144 = factorsOf(144),

      props = fibs.concat(factorsOf144.filter(x => !fibs.includes(x))).sort((a, b) => {
        if (a < b) return -1;
        return a === b ? 0 : 1;
      })
        .reduce((agg, x) =>
          `${agg}  --x-${x}px: ${x / 16}rem;\n`, ``),

      content =
        `/**
 * spacing.css
 *
 * The library's spacing properties - factors of 144, and the fibonacci sequence
 * in order sequence represented as \`rem\` units.
 *
 * ====> DO NOT MANUALLY EDIT THIS FILE - This file is generated via a script ({repo-root}/scripts/gen-css/spacing.mjs).
 */

:root {
${props.trimEnd()}
}
`;
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genSpacingCss};
