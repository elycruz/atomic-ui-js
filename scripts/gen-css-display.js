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
  const outputFilePath = path.join(__dirname, '../src/css/modules/display.css');
  const out = [
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
    'inherit',
    'initial',
    'list-item',
    'none',
    'revert',
    // 'revert-layer',
    'table',
    'table-caption',
    'table-cell',
    'table-column-group',
    'table-footer-group',
    'table-header-group',
    'table-row',
    'table-row-group',
    'unset',
  ].map(k => `.x-display-${k} {
  display: ${k};
}\n`);

  const content =
    `/**
 * Display property classes.
 */
${out.join('\n')}\n`;
  return await fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
})();
