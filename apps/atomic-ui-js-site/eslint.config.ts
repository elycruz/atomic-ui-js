// eslint.config.js
import baseConfig from '../../eslint.config.js';
import nextPlugin from '@next/eslint-plugin-next';

const __dirname = new URL('.', import.meta.url).pathname;

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
      },
    },
  },
  nextPlugin.configs['core-web-vitals'],
];
