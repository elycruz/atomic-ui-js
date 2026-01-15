/**
 * gen-color-scheme-css.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
import fs from 'fs';
import * as path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  { log, error } = console,
  genFontSizeCssProps = () => {
    const outputFilePath = path.join(
        __dirname,
        '../css/modules/font-size-props.css'
      ),
      out = [],
      content = `/**
 * Display property classes.
 */
${out.join('\n')}\n`;

    return fs.promises
      .writeFile(outputFilePath, content)
      .then(() => log(`file ${outputFilePath} written successfully`), error);
  };
