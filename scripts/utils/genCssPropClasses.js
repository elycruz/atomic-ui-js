/**
 * justify-content.js
 *
 * Generates `justify-content` property classes (`.x-justify-space-between, .x-jc-space-between` etc.).
 */
const fs = require('fs'),
  path = require('path'),
  {log, error} = console;

/**
 * Writes property values as css classes, for given `propName` -
 *  Resulting content is written to given filePath
 */
const genCssPropClasses = (propName, values, outputFilePath) => {
  const out = values.reduce((agg, k) => agg + `.x-${propName}-${k} {
  ${propName}: ${k};
}\n`, '');
  const content =
    `/**
 * ${outputFilePath}
 */

${out.join('\n\n')}\n`
  ;
  return fs.promises.writeFile(outputFilePath, content)
    .then(
      () => log(`file ${outputFilePath} written successfully`),
      error
    );
};

module.exports = {
  genCssPropClasses
}
