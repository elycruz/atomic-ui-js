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

  ucaseFirst = (str = '') => str[0].toUpperCase() + str.slice(1),

  lcaseFirst = (str = '') => str[0].toLowerCase() + str.slice(1),

  getComponentMeta = (inLocalName = '') => {
    const localName = inLocalName.startsWith('x-') ? inLocalName : `x-${inLocalName}`,
      classNamePrefix = localName.trim()
        .split('-')
        .reduce((agg, part) =>
            agg + (!part ? '' : ucaseFirst(part)),
          ''
        );

    return {localName, classNamePrefix};
  },

  writeCustomElementFiles = async (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Element`,
      nameVarName = `${lcaseFirst(classNamePrefix)}Name`,
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
    ]);
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
    ]);
  },

  writeNextJsComponentFiles = async (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Component`,
      indexFilePath = path.join(outputDir, `index.js`);

    return Promise.all([
      // Write index.js
      fs.writeFile(indexFilePath,
        `import lazy from 'next/dynamic';

const ${className} = lazy(() => import('atomic-ui-js-react/${localName}'), {
  ssr: false
});

export default ${className};
`).then(() => indexFilePath),
    ]);
  },

  writeSitePageFiles = async (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Page`,
      pageTsxFilePath = path.join(outputDir, `page.tsx`),
      humanReadableName = localName
        .split('-')
        .slice(1) // Omit leading 'x'
        .reduce((agg, xs) => `${agg + ucaseFirst(xs)} `, '')
        .trim();

    return Promise.all([
      // Write page.tsx
      fs.writeFile(pageTsxFilePath,
        `export default function ${className}() {
  return <section>
  <header>${humanReadableName} Page</header>
  <article>
    <div>
        Page contents.
    </div>
  </article>
  </section>;
}
`)
        .then(() => pageTsxFilePath),
    ]);
  },

  getFilesScaffolder = (localName, classNamePrefix) => (filesWriter, packagePath) => {
    const outputDir = path.join(packageRoot, packagePath, localName);

    return fs.mkdir(outputDir)
      .then(() => filesWriter(localName, classNamePrefix, outputDir),
        () => {
          if (!force) {
            throw new Error(`Files already exist for this element - ` +
              `Use -f, or --force, to overwrite them.`);
          }

          return filesWriter(localName, classNamePrefix, outputDir);
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
    scaffoldFilesWith = getFilesScaffolder(localName, classNamePrefix),
    printFilesWritten = async fileNames => log(fileNames.reduce(
      (agg, file) => {
        const relativeFilePath = path.relative(__dirname, file);
        return agg + `  - ${relativeFilePath.slice(relativeFilePath.lastIndexOf('../') + 1)}\n`
      },
      ''
    )
      .trimEnd());

  if (!componentNameRegex.test(incomingComponentName)) throwNameTypeMismatch();

  // Write files
  // ----
  // Write ui lib. files
  return scaffoldFilesWith(writeCustomElementFiles, 'packages/atomic-ui-js')
    .then(files => {
      log(`Files written successfully:\n`);
      return printFilesWritten(files);
    })

    // Write React lib. files
    .then(() => scaffoldFilesWith(writeReactComponentFiles, 'packages/atomic-ui-js-react'))
    .then(printFilesWritten)

    // Write Next lib. files
    .then(() => scaffoldFilesWith(writeNextJsComponentFiles, 'packages/atomic-ui-js-next'))
    .then(printFilesWritten)

    // Write Site lib. files
    .then(() => scaffoldFilesWith(writeSitePageFiles, 'apps/atomic-ui-js-site'))
    .then(printFilesWritten)

    // Print final empty newline
    .then(() => log(''))

    .catch(error);
})();
