import ejs from "ejs";
import yargs from "yargs";
import path from "path";
import fs from "fs";

// @todo generate README.md as well (for elements)
// @todo add `--no-readme` flag
// @todo add `--no-scss` flag
// @todo add `--no-ts` flag
// @todo add `--no-index` flag
// @todo add a `--with-props` flag
// @todo add param docs

const

  {log, error} = console,

  dirname = path.resolve(path.dirname(process.argv[1])),

  ioFileExists = filePath => fs.promises.access(filePath, fs.constants.F_OK)
    .then(() => true, () => false),

  ioMkdir = fs.promises.mkdir,

  ucaseFirst = s => !s ? s : s[0].toUpperCase() + s.substring(1),

  camelCase = s => !s ? s : s.split(/[^a-z]/gim).map(ucaseFirst).join(''),

  toAbsPath = (...args) => path.resolve(dirname, ...args),

  repoRoot = toAbsPath(dirname, '../../'),

  {argv} = yargs(process.argv.slice(2))
    .scriptName('new-custom-element')
    .default('debug', false)
    .default('srcPath', toAbsPath(repoRoot, 'src/'))
    .default('elmSrcOut', '')
    .default('elmStoryOut', '')
    .default('storiesPath', toAbsPath(repoRoot, 'stories-old/'))
    .default('withProps', false)
    .default('noElmDir', false)
    .default('noStories', false)
    .default('noReadme', false)
    .default('noScss', false)
    .default('noTs', false)
    .default('noIndex', false)
    .default('dryRun', false)
    .default('force', false)
    .default('parentElmDir', '')
    .alias('noStory', 'noStories')
    .alias('f', 'force'),

  elementScssEjs = `@import '../scss/component-includes';

:host {
  display: block;
}
`,

  elementTsEjs = `import {CSSResult, customElement, unsafeCSS} from "lit-element";
import EcmsBase from "../base/EcmsBase";

// @ts-ignore
import styles from './<%= elementName %>.scss';

const componentName = '<%= elementName %>';

@customElement(componentName)
export class <%= elementClassName %> extends EcmsBase {
  static get styles(): CSSResult {
    return unsafeCSS(styles);
  }

}
`,

  elementIndexTsEjs = `export * from './<%= elementName %>.ts';
  `,

  elementStoryTsEjs = `import {html} from "lit-html";
import "../src/<%= elementName %>";
import {stylesAsString} from "./stylesheet";

export default {
  title: '<%= elementName %>'
}

const exampleStyles = \`
  <%= elementName %> {

  }
\`;

export const

  empty = () => html\`
    <style>\${stylesAsString}</style>
    <style>\${exampleStyles}</style>
    <p>Should render nothing:</p>
    <<%= elementName %>></<%= elementName %>>
  \`

;
`,


  scaffold_files = async ({_: elementNames, force, srcPath, elmSrcOut, elmStoryOut, storiesPath, noStories, noElmDir}) => {
    // If top dirs don't exists bail
    await Promise.all([srcPath, storiesPath].map(ioFileExists))
      .catch(errors => {
        log(errors);
        process.abort();
      });

    const tmpls = [elementScssEjs, elementTsEjs, elementIndexTsEjs, elementStoryTsEjs];

    return Promise.all(elementNames.flatMap(elementName => {
      const elmSrcPath = path.join(path.join(srcPath, elmSrcOut), `${elmSrcOut && noElmDir ? '' : elementName}`),
        scssFilePath = path.join(elmSrcPath, `${elementName}.scss`),
        tsFilePath = path.join(elmSrcPath, `${elementName}.ts`),
        indexTsFilePath = path.join(elmSrcPath, `index.ts`),
        storyFilePath = path.join(path.join(storiesPath, elmStoryOut), `${elementName}.stories.ts`),
        files = [scssFilePath, tsFilePath, indexTsFilePath, storyFilePath],
        fileAndTmplAssocList = files.map((x, i) => [files[i], tmpls[i]]),
        writeFiles = async (fileCheckBlns) => {
          const elementClassName = camelCase(elementName + ''),
            elementNameHumanReadable = elementName.split(/[^a-z]/gim).map(ucaseFirst).join(' '),
            tmplConfig = {
              elementName,
              elementNameHumanReadable,
              elementClassName
            };

          // @todo Handle the file level `--no-*` flags here
          if (noStories) {
            tmpls.pop();
            files.pop();
            fileAndTmplAssocList.pop();
          }

          await ioMkdir(elmSrcPath, {recursive: true})
            .then(() => undefined, () => undefined);

          return Promise.all(fileCheckBlns.map((bln, i) => {
              const [filePath, tmpl] = fileAndTmplAssocList[i];
              if (bln && force) {
                return fs.promises.writeFile(filePath, ejs.render(tmpl, tmplConfig))
              } else if (!bln) {
                return fs.promises.writeFile(filePath, ejs.render(tmpl, tmplConfig))
              }
            }
          ));
        }
      ;

      // Bail if file exists and no -f/--force flag passed in
      return Promise.all(files.map(ioFileExists))
        .then(writeFiles, writeFiles)
        .catch(error);
    }))
      .catch(error);
  }

;

(async (argsObj) => {
  if (argv.debug) {
    log('Arguments: ', argv);
  }
  return await scaffold_files(argsObj);
})(argv);
