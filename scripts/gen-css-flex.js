/**
 * gen-css-flex-classes.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console
;

(async () => {
  const fileName = 'justify-content.css',
    outputFilePath = path.join(__dirname, `../src/css/modules/${fileName}`);
  const out = ['center',
    'start',
    'end',
    'flex-start',
    'flex-end',
    'left',
    'right',
    'normal',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
  ].map(k => `.x-justify-content-${k},
.x-jc-${k} {
  justify-content: ${k};
}`);

  const content =
    `/**
 * ${fileName}
 */
${out.join('\n\n')}\n`;
  return await fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
})();
