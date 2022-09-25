/**
 * gen-color-scheme-css.js
 *
 * Outputs the library's css color properties - Colors are made up of `hsl`, and `hsla` generated colors.
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console,

  genFontSizeCssProps = () => {
    const outputFilePath = path.join(__dirname, '../src/css/modules/font-size-props.css');
    const out = [];

    const content =
      `/**
 * Display property classes.
 */
${out.join('\n')}\n`;
    return fs.promises.writeFile(outputFilePath, content)
      .then(
        () => log(`file ${outputFilePath} written successfully`),
        error
      );
  };
