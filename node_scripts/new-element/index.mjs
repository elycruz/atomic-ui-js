/**
 * Generates new 'custom element' files for given element name.
 *
 * **Note:**
 *
 * - 'x-' prefix gets added, to element name, if it isn't already there.
 * - Flags must come before element name (element name must be last in argv list).
 *
 * Usage:
 *
 * Default:
 * ```bash
 * $ node index.mjs -- my-custom-element-name
 * ```
 *
 * With `--force`
 * ```bash
 * $ node index.mjs -- -f custom-element-name
 * ```
 */
import fs from 'node:fs/promises'
import * as path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),

  {log, error} = console,

  forceFlagRegex = /-{1,2}f(orce)?/i,
  componentNameRegex = /^[a-z]{1,55}-[\w-]{1,55}$/i,

  packageRoot = path.join(__dirname, '../../'),

  // Whether to overwrite existing files or not
  force = process.argv.some(flag => forceFlagRegex.test(flag)),

  incomingComponentName = process.argv.at(-1),

  getComponentMeta = (inLocalName = '') => {
    const localName = inLocalName.startsWith('x-') ? inLocalName : `x-${inLocalName}`,
      classNamePrefix = localName.trim()
        .split('-')
        .reduce((agg, part) =>
            agg + (!part ? '' : part[0].toUpperCase() + part.slice(1)),
          ''
        );

    return {localName, classNamePrefix};
  },

  writeCustomElementFiles = async (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Element`,
      nameVarName = `${classNamePrefix[0].toLowerCase() + classNamePrefix.slice(1)}Name`,
      indexCssFilePath = path.join(outputDir, 'index.css'),
      elementFilePath = path.join(outputDir, `${localName}.js`),
      registerFilePath = path.join(outputDir, `register.js`),
      indexFilePath = path.join(outputDir, `index.js`),
      readmeFilePath = path.join(outputDir, `README.md`);

    return Promise.all([
      // Write index.css
      fs.writeFile(indexCssFilePath, `.${localName} {
      display: inline-block;
}`)
        .then(() => indexCssFilePath),

      // Write {element}.js
      fs.writeFile(elementFilePath,
        `export const ${nameVarName} = '${localName}';

export class ${className} extends HTMLElement {
  static localName = ${nameVarName};
}
`).then(() => elementFilePath),

      // Write register.js
      fs.writeFile(registerFilePath,
        `import {${className}} from './${localName}.js';
import {registerCustomElement} from '../utils/index.js';

registerCustomElement(${className}.localName, ${className});
`).then(() => registerFilePath),

      // Write index.js
      fs.writeFile(indexFilePath,
        `export * from './${localName}.js';
export * from './register.js';
`).then(() => indexFilePath),

      // Write README.md
      fs.writeFile(readmeFilePath,
        `# ${localName}

Component description.
`).then(() => readmeFilePath),
    ])
      .then(fileNames => fileNames.reduce((agg, file) => {
          return agg + `\n - ${path.basename(file)}`;
        }, 'Custom element files written successfully.  Files written:\n')
      )
  },

  writeReactComponentFiles = async (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Component`,
      elementClassName = `${classNamePrefix}Element`,
      indexFilePath = path.join(outputDir, `index.js`),
      readmeFilePath = path.join(outputDir, `README.md`);

    return Promise.all([
      // Write index.js
      fs.writeFile(indexFilePath,
        `// 'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {${elementClassName}} from 'atomic-ui-js/${localName}/index.js';

const ${className} = createComponent({
  tagName: ${elementClassName}.localName,
  elementClass: ${elementClassName},
  react: React
});

export default ${className};
`).then(() => indexFilePath),

      // Write README.md
      fs.writeFile(readmeFilePath,
        `# ${className}

Component description.
`).then(() => readmeFilePath),
    ])
      .then(fileNames => fileNames.reduce((agg, file) => {
          return agg + `\n - ${path.basename(file)}`;
        }, 'React component files written successfully:\n')
      )
  },

  getFilesScaffolder = (localName, classNamePrefix) => (filesWriter, packagePath) => {
    const outputDir = path.join(packageRoot, packagePath, localName);

    return fs.mkdir(outputDir)
      .then(() => filesWriter(localName, classNamePrefix, outputDir),
        () => {
          if (!force) {
            throw new Error(`Files already exist for this element - ` +
              `Use -f, or --force, to overwrite them regardless.`);
          }

          return filesWriter(localName, classNamePrefix, outputDir)
        });
  },

  throwNameTypeMismatch = () => {
    throw new TypeError(`Element name must match pattern ${componentNameRegex}`);
  }

await (async () => {
  log(`Working with arguments:

incoming-component-name: ${incomingComponentName}
force: ${force}
  `);

  if (!incomingComponentName) throwNameTypeMismatch();

  const {localName, classNamePrefix,} = getComponentMeta(incomingComponentName),
    scaffoldFilesWith = getFilesScaffolder(localName, classNamePrefix);

  if (!componentNameRegex.test(incomingComponentName)) throwNameTypeMismatch();

  return scaffoldFilesWith(writeCustomElementFiles, 'packages/atomic-ui-js')
    .then(message => log(message, '\n'))
    .then(() => scaffoldFilesWith(writeReactComponentFiles, 'packages/atomic-ui-js-react'))
    .then(message => log(message, '\n'))
    // .then(() => scaffoldFilesWith(writeNextComponentFiles, 'packages/atomic-ui-js-next'))
    // .then(message => log(message, '\n'))
    .catch(error);
})();
