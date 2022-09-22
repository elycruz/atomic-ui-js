/**
 * align-items.js
 *
 * Generates `align-item` property classes (`.x-align-item-center, .x-ai-center` etc.).
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console,

  genAlignItemsCss = () => {
    const fileName = 'align-items.css',
      outputFilePath = path.join(__dirname, `../../src/css/modules/${fileName}`);
    const out = ['normal',
      'baseline',
      'center',
      'start',
      'end',
      'self-start',
      'self-end',
      'flex-start',
      'flex-end',
    ].map(k => `.x-align-items-${k},
.x-ai-${k} {
  align-items: ${k};
}`);

    const content = `/**
 * ${fileName}
 */
${out.join('\n\n')}
`;

    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

module.exports = {genAlignItemsCss};
