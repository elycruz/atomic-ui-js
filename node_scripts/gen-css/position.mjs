/**
 * position.js
 *
 * Generates `position` property classes (`.x-position-absolute` etc.).
 */
import fs from 'fs';
import * as path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {log, error} = console,

  genPositionCss = () => {
    const fileName = 'position.css',
      outputFilePath = path.join(__dirname, `../../css/modules/${fileName}`);
    const out = [
      'static',
      'relative',
      'absolute',
      'sticky',
      'fixed',
    ].map(k => `.x-position-${k},
.x-pos-${k} {
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

export {genPositionCss};
