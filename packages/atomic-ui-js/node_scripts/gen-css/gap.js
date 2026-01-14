/**
 * gap.mjs
 *
 * Outputs the library's `.gap-*` classes, supporting only values comprising number values of
 *  multiples of 6, 8, and numerals in the fibonacci sequence, upto, but not greater than, the value 144.
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';
import {spacingNums} from './spacing.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {log, error} = console;

export const genGapCss = () => {
  const outputFilePath = path.join(__dirname, '../../css/modules/gap.css');

  // Generate the `.gap-*` classes.
  const content =
    `/**
 * Gap classes.
 */
${spacingNums.reduce((acc, val) =>
    `${acc}
.gap-${val}px { gap: var(--ez-${val}px, ${val}px); }`
  , '')}\n`;

  return fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
};
