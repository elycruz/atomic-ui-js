/**
 * position.ts
 *
 * Generates `position` property classes (`.ez-position-absolute` etc.).
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  { log, error } = console,
  genPositionCss = () => {
    const fileName = 'position.css',
      outputFilePath = path.join(__dirname, `../../css/modules/${fileName}`),
      out = ['static', 'relative', 'absolute', 'sticky', 'fixed'].map(
        k => `.ez-position-${k},
.ez-pos-${k} {
  position: ${k};
}`
      ),
      content = `/**
 * ${fileName}
 */
${out.join('\n\n')}\n`;

    return fs.promises.writeFile(outputFilePath, content).then(() => {
      log(`file ${fileName} written successfully`);
    }, error);
  };

export { genPositionCss };
