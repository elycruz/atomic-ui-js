/* eslint-env node */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirWalk } from 'node-dirwalk';

const __dirname = fileURLToPath(new URL('.', import.meta.url)),

  targetDir = path.join(__dirname, '../src/app/'),
  outFilePath = path.join(__dirname, '../src/data/generated/navigation-items.ts'),

  getNavItemConstructor = dirToWalk => function NavItem(fileName, filePath, stat, files) {
    const ext = path.extname(fileName),
      basename = path.basename(fileName, ext),
      uri = filePath.split(dirToWalk)[1];

    Object.defineProperties(this, {
      label: { value: basename[0].toUpperCase() + basename.slice(1), enumerable: true },
      uri: { value: `/${uri}${uri.length > 1 && !uri.endsWith('/') ? '/' : ''}`, enumerable: true },
      alias: { value: basename, enumerable: true },
    });

    if (files?.filter(Boolean).length) {
      Object.defineProperty(this, 'items', {
        value: files.filter(Boolean),
        enumerable: true
      });
    }
  },

  genNavItemsJson = async dir => dirWalk(
    getNavItemConstructor(dir),

    // Directory effect factory
    (dirPath, _stat, _dirName) =>
      fileInfoObj => dirPath.includes('/api') ? null : fileInfoObj,

    // File effect factory
    (filePath, _stat, _fileName) =>
      fileInfoObj => /\./.test(fileInfoObj.uri) ? undefined : fileInfoObj,

    // Directory to walk
    dir
  )
;

// Generation file contents
(async () => {
  console.log(`Generation nav-items json, from dir: ${targetDir} ...`);

  return genNavItemsJson(targetDir)
    .then(json => fs.writeFile(
      outFilePath,
      `import { NavItem } from '../types';

export const navigationItems: NavItem[] = [${JSON.stringify(json, null, '  ').replaceAll('"', '\'')}];
`
    ))
    .catch(console.error);
})();
