/**
 * justify-content.js
 *
 * Generates `justify-content` property classes (`.x-justify-space-between, .x-jc-space-between` etc.).
 */
import fs from 'fs';
import * as path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {log, error} = console,

  genJustifyContentCss = () => {
    const fileName = 'justify-content.css',
      outputFilePath = path.join(__dirname, `../../src/css/modules/${fileName}`);
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
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${fileName} written successfully`),
        error
      );
  };

export {genJustifyContentCss};
