import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

import type { TestProjectInlineConfiguration } from 'vitest/config';

const { NODE_ENV } = process.env,
  isDev = !NODE_ENV || NODE_ENV === 'development',
  dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': dirname,
    },
  },
  // build: {
  //   sourcemap: isDev ? 'inline' : false,
  // },
  // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
  test: {
    globals: true,
    clearMocks: true,
    exclude: ['**/node_modules/**', '**/archived/**', '**/coverage/**'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['lcov', 'text', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'src/**/*.{stories,test,spec,d}.{js,ts,jsx,tsx}',
        '__mocks__/**/*',
        'vitest.setup.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          root: './',
          environment: 'happy-dom',
          setupFiles: ['./vitest.setup.ts'],
          alias: {
            '@': dirname,
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            // Command should match what we have in package.json
            storybookScript: `storybook ${isDev ? 'dev ' : ''}start -p 6006${isDev ? '' : ' --ci'}`,
          }),
        ],
        test: {
          name: 'e2e',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            screenshotFailures: false,
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          alias: {
            '@': dirname,
          },
        },
      },
    ] as TestProjectInlineConfiguration[],
  },
});
