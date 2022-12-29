/**
 * align-items.js
 *
 * Generates `align-item` property classes (`.x-align-item-center, .x-ai-center` etc.).
 */
import fs from 'fs';
import * as path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const {log, error} = console;

export const genAlignItemsCss = () => {
  const fileName = 'align-items.css',
    outputFilePath = path.join(__dirname, `../../css/modules/${fileName}`);
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
