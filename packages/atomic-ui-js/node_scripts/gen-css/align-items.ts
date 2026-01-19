/**
 * align-items.ts
 *
 * Generates `align-item` property classes (`.ez-align-item-center, .ez-ai-center` etc.).
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  { log, error } = console;

export const genAlignItemsCss = () => {
  const fileName = 'align-items.css',
    outputFilePath = path.join(__dirname, `../../css/modules/${fileName}`),
    out = [
      'normal',
      'baseline',
      'center',
      'start',
      'end',
      'self-start',
      'self-end',
      'flex-start',
      'flex-end',
    ].map(
      k => `.ez-align-items-${k},
.ez-ai-${k} {
  align-items: ${k};
}`
    ),
    content = `/**
 * ${fileName}
 */
${out.join('\n\n')}
`;

  return fs.promises.writeFile(outputFilePath, content).then(() => {
    log(`file ${fileName} written successfully`);
  }, error);
};
