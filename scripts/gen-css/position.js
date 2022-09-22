/**
 * position.js
 *
 * Generates `position` property classes (`.x-position-absolute` etc.).
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console,

  genPositionCss = () => {
    const fileName = 'position.css',
      outputFilePath = path.join(__dirname, `../../src/css/modules/${fileName}`);
    const out = [
      'static',
      'relative',
      'absolute',
      'sticky',
      'fixed',
    ].map(k => `.x-position-${k} {
  position: ${k};
}`);

    const content =
      `/**
 * ${fileName}
 */
${out.join('\n\n')}\n`;
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

module.exports = {genPositionCss};
