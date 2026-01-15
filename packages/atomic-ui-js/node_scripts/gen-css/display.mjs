/**
 * display.js
 *
 * Generates `display` property classes (`.ez-display-block, .ez-d-block` etc.).
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  { log, error } = console,
  fileName = 'display.css',
  genDisplayCss = () => {
    const outputFilePath = path.join(__dirname, '../../css/modules/', fileName),
      out = [
        'block',
        'contents',
        'flex',
        'flow-root',
        'grid',
        'inline',
        'inline-block',
        'inline-flex',
        'inline-grid',
        'inline-table',
        'list-item',
        'none',
        'table',
        'table-caption',
        'table-cell',
        'table-column-group',
        'table-footer-group',
        'table-header-group',
        'table-row',
        'table-row-group',
      ].map(
        k => `.ez-display-${k},
.ez-d-${k} {
  display: ${k};
}\n`
      ),
      content = `/**
 * Display property classes.
 */
${out.join('\n')}\n`;

    return fs.promises
      .writeFile(outputFilePath, content)
      .then(() => log(`file ${fileName} written successfully`), error);
  };

export { genDisplayCss };
