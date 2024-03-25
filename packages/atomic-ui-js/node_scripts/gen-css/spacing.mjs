/**
 * gen-spacing-scheme-css.js
 *
 * Outputs the library's css spacing properties - We are supporting multiples of 6 and 8 and the fibonacci sequence.
 *
 * @todo Each unit set should output it's own css file;  E.g., `fib-spacing.css`, `mult-of-6-spacing.css`, etc.
 */
import fs from 'fs'
import * as path from 'path';
import url from 'url';
import * as utils from '../../utils/number.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {fib, factorsOf, multiplesOf} = utils,
  {log, error} = console,
  fileName = 'spacing.css',

  fibs = fib(5000),
  factorsOf144 = factorsOf(144),
  multiplesOf6 = multiplesOf(6, 16),
  multiplesOf8 = multiplesOf(8, 12),
  spacingNums = Array.from(new Set(fibs.concat(factorsOf144, multiplesOf8, multiplesOf6)).values()).sort((a, b) => {
    if (a < b) return -1;
    return a === b ? 0 : 1;
  }),

  genSpacingCss = () => {
    const outputFilePath = path.join(__dirname, '../../css/modules/', fileName),
      props = spacingNums
        .reduce((agg, x) =>
          `${agg}  --x-${x}px: ${x / 16}rem;\n`, ``),
      content =
        `/**
 * spacing.css
 *
 * The library's spacing properties - factors of 144, multiples of 6 (and 8) (upto 96), and the fibonacci sequence (upto 4181),
 * represented as \`rem\` units.
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

export {genSpacingCss, fibs, factorsOf144, multiplesOf6, spacingNums};
