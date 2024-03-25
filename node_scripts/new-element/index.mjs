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

  FORCE_FLAG = 0x02,
  STYLES_FLAG = 0x04,
  SHADOW_DOM_FLAG = 0x08,

  FLAGS = process.argv.slice(2).reduce((flags, arg) => {
    switch (arg) {
      case '--force':
      case '-f':
        return flags | FORCE_FLAG;
      case '--styles':
      case '-s':
        return flags | STYLES_FLAG;
      case '--shadow':
        return flags | SHADOW_DOM_FLAG;
      default:
        return flags;
    }
  }, 0x00),

  force = Boolean(FLAGS & FORCE_FLAG),
  styles = Boolean(FLAGS & STYLES_FLAG),
  shadow = Boolean(FLAGS & SHADOW_DOM_FLAG),

  packageRoot = path.join(__dirname, '../../'),

  incomingComponentName = process.argv.filter(name => /^[a-z]/i.test(name)).shift(),

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

  doesFileExist = async filePath => fs.access(filePath, fs.F_OK),

  getCustomElementContent = (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Element`,
      nameVarName = `${lcaseFirst(classNamePrefix)}Name`,
      observedAttribNames = `${classNamePrefix}ObservedAttribs`,
      indexCssFilePath = path.join(outputDir, 'index.css'),
      elementFilePath = path.join(outputDir, `${localName}.js`),
      registerFilePath = path.join(outputDir, `register.js`),
      indexFilePath = path.join(outputDir, `index.js`),
      readmeFilePath = path.join(outputDir, `README.md`);

    return [
      [indexCssFilePath, `.${localName} {
  display: inline-block;
}`],
      [elementFilePath,
        `${
          styles && shadow ? `import styles from './index.css' assert { type: 'css' };\n\n` : ''
        }export const ${nameVarName} = '${localName}',

  ${observedAttribNames} = Object.freeze([]);

export class ${className} extends HTMLElement {
  static localName = ${nameVarName};
  static observedAttributes = ${observedAttribNames};

  #initialized = false;
${!shadow ? '' : `\n  constructor() {
    super();

    this.attachShadow({mode: 'open'});${
          !styles ? '' : '\n    this.shadowRoot.adoptedStyleSheets.push(styles);'
        }
  }
`}
  connectedCallback() {
    if (!this.#initialized && this.isConnected) {
      this.#removeListeners()
        .#addListeners();
      this.#initialized = true;
    }
  }

  disconnectedCallback() {
    if (this.#initialized) {
      this.#removeListeners();
      this.#initialized = false;
    }
  }

  #addListeners() {
    return this;
  }

  #removeListeners() {
    return this;
  }

  attributeChangedCallback(name, prevValue, nextValue) {
    if (prevValue === nextValue) return;

    switch (name) {
    default:
      this[name] = nextValue;
      return;
    }
  }
}
`],
      [registerFilePath,
        `import {${className}} from './${localName}.js';
import {registerCustomElement} from '../utils/index.js';

registerCustomElement(${className}.localName, ${className});
`],
      [indexFilePath,
        `export * from './${localName}.js';
export * from './register.js';
`],

      // Write README.md
      [readmeFilePath,
        `# ${localName}

Component description.
`],
    ];
  },

  getReactComponentContent = (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Component`,
      elementClassName = `${classNamePrefix}Element`,
      indexFilePath = path.join(outputDir, `index.js`),
      readmeFilePath = path.join(outputDir, `README.md`);

    return [
      [indexFilePath,
        `'use client';

import React from 'react';
import {createComponent} from '@lit-labs/react';
import {${elementClassName}} from 'atomic-ui-js/${localName}/index.js';

const ${className} = createComponent({
  tagName: ${elementClassName}.localName,
  elementClass: ${elementClassName},
  react: React
});

export default ${className};
`],

      [readmeFilePath,
        `# ${className}

Component description.
`],
    ];
  },

  writeNextJsComponentFiles = (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Component`,
      indexFilePath = path.join(outputDir, `index.js`);

    return [
      [indexFilePath,
        `import lazy from 'next/dynamic';

const ${className} = lazy(() => import('atomic-ui-js-react/${localName}'), {
  ssr: false
});

export default ${className};
`],
    ];
  },

  writeSitePageFiles = (localName, classNamePrefix, outputDir) => {
    const className = `${classNamePrefix}Page`,
      pageTsxFilePath = path.join(outputDir, `page.tsx`),
      humanReadableName = localName
        .split('-')
        .slice(1) // Omit leading 'x'
        .reduce((agg, xs) => `${agg + ucaseFirst(xs)} `, '')
        .trim();

    return [
      // Write page.tsx
      [pageTsxFilePath,
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
`],
    ];
  },

  getFilesScaffolder = (localName, classNamePrefix) => async (filesWriter, packagePath) => {
    const outputDir = path.join(packageRoot, packagePath, localName),

      writeFiles = async () => {
        const initialResult = await filesWriter(localName, classNamePrefix, outputDir);

        if (!filesWriter.requiresAssist) return initialResult;

        const filesAndContentsList = initialResult;

        // Write files
        return Promise.all(filesAndContentsList
          .map(([filePath, content]) =>
            doesFileExist(filePath)
              .then(
                () => {
                  if (!force) {
                    // log(`    - Skipping file ${filePath}\n  - File already exists.`);
                    return {filePath, skipped: true};
                  }
                  return fs.writeFile(filePath, content).then(() => filePath)
                },
                () => fs.writeFile(filePath, content).then(() => filePath))
          )
        )
      };

    // Ensure output dir exists
    return fs.mkdir(outputDir, {recursive: true})
      .then(writeFiles, writeFiles);
  },

  throwNameTypeMismatch = () => {
    throw new TypeError(`Element name must match pattern ${componentNameRegex}`);
  },

  printRelativeFilePaths = async fileNames => {
    const output = fileNames.reduce(
      (agg, file) => {
        if (!file || file.skipped) return agg;

        const relativeFilePath = path.relative(__dirname, file);
        return agg + `  - ${relativeFilePath.slice(relativeFilePath.lastIndexOf('../') + 1)}\n`
      },
      ''
    )
      .trimEnd();

    if (output) log(output);

    return fileNames;
  };

await (async () => {
  log(`Working with arguments:

incoming-component-name: ${incomingComponentName}
force: ${force}
  `);

  if (!incomingComponentName) throwNameTypeMismatch();

  const {localName, classNamePrefix,} = getComponentMeta(incomingComponentName),

    scaffolder = getFilesScaffolder(localName, classNamePrefix),

    scaffoldFilesUsing = (func, outputDir, outFilePaths = []) => {
      return scaffolder(func, outputDir)
        .then(printRelativeFilePaths)
        .then(filePaths => outFilePaths.concat(filePaths));
    };

  if (!componentNameRegex.test(incomingComponentName)) throwNameTypeMismatch();

  // Apply temporary boolean required for achieving file overwrite skip (until all writers are converted).
  getCustomElementContent.requiresAssist = true;
  getReactComponentContent.requiresAssist = true;
  writeNextJsComponentFiles.requiresAssist = true;
  writeSitePageFiles.requiresAssist = true;

  log(`Files written successfully:\n`);

  // Write files
  // ----
  // Write ui lib. files
  return scaffoldFilesUsing(getCustomElementContent, 'packages/atomic-ui-js')

    // Write React lib. files
    .then(collectedFilePaths => scaffoldFilesUsing(
      getReactComponentContent, 'packages/atomic-ui-js-react', collectedFilePaths)
    )

    // Write Next lib. files
    .then(collectedFilePaths => scaffoldFilesUsing(
      writeNextJsComponentFiles, 'packages/atomic-ui-js-next', collectedFilePaths)
    )

    // Write Site lib. files
    .then(collectedFilePaths => scaffoldFilesUsing(
      writeSitePageFiles, 'apps/atomic-ui-js-site/src/app/custom-elements', collectedFilePaths)
    )

    // Print skipped files
    .then(collectedFilePaths => {

      const skippedFiles = collectedFilePaths.filter(fp => fp.skipped).map(fp => fp.filePath),
        skippedFilesLen = skippedFiles.length;

      if (skippedFilesLen === collectedFilePaths.length) log('  None.');

      if (skippedFilesLen) {
        log('\nSkipped files:\n');

        printRelativeFilePaths(skippedFiles);

        log('\n  Use -f, or --force, to overwrite them.');
      }

      // Print final empty newline
      log('')
    })

    .catch(error);
})();
