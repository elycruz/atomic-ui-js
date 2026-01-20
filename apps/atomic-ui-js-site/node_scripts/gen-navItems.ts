import fs from 'node:fs/promises';
import { Stats } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirWalk } from 'node-dirwalk';

const __dirname = fileURLToPath(new URL('.', import.meta.url)),
  targetDir = path.join(__dirname, '../src/app/'),
  outFilePath = path.join(
    __dirname,
    '../src/data/generated/navigation-items.ts'
  ),
  getNavItemConstructor = (dirToWalk: string) =>
    function NavItem(
      fileName: string,
      filePath: string,
      stat: Stats,
      files: string[]
    ) {
      const ext = path.extname(fileName),
        basename = path.basename(fileName, ext),
        uri = filePath.split(dirToWalk)[1];

      // @ts-expect-error - Known type.
      Object.defineProperties(this, {
        label: {
          value: basename[0].toUpperCase() + basename.slice(1),
          enumerable: true,
        },
        uri: {
          value: `/${uri}${uri.length > 1 && !uri.endsWith('/') ? '/' : ''}`,
          enumerable: true,
        },
        alias: { value: basename, enumerable: true },
      });

      if (files?.filter(Boolean).length) {
        // @ts-expect-error - Known type.
        Object.defineProperty(this, 'items', {
          value: files.filter(Boolean),
          enumerable: true,
        });
      }
    },
  genNavItemsJson = async (dir: string) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dirWalk(
      getNavItemConstructor(dir),

      // Directory effect factory
      (dirPath: string) => (fileInfoObj: object) =>
        dirPath.includes('/api') ? null : fileInfoObj,

      // File effect factory
      () => (fileInfoObj: { uri: string }) =>
        fileInfoObj.uri.includes('.') ? undefined : fileInfoObj,

      // Directory to walk
      dir
    );

// Generation file contents
await (async () => {
  // eslint-disable-next-line no-console
  console.log(`Generation nav-items json, from dir: ${targetDir} ...`);

  return genNavItemsJson(targetDir)
    .then(json =>
      fs.writeFile(
        outFilePath,
        `import { NavItem } from '../types';

export const navigationItems: NavItem[] = [${JSON.stringify(json, null, '  ').replaceAll('"', "'")}];
`
      )
    )
    .catch(console.error);
})();
