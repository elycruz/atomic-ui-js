// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import tsEslint from 'typescript-eslint';

import { defineConfig, globalIgnores } from 'eslint/config';

// const __dirname = new URL('.', import.meta.url).pathname;

const baseRules = {
  'padding-line-between-statements': [
    'error',
    // Blank line before function declarations
    { blankLine: 'always', prev: '*', next: 'function' },
    // Blank line before class declarations
    { blankLine: 'always', prev: '*', next: 'class' },
    // Blank line before variable declarations
    { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
    // Blank line after variable declarations
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
  ],

  // Prettier integration
  'prettier/prettier': 'error',
  'no-undef': 'off', // Typescript handles this better  via it's type checking
  'no-unused-vars': 'off', // Typescript handles this better via it's type checking

  'no-async-promise-executor': 'error',
  'no-await-in-loop': 'warn',
  'no-promise-executor-return': 'error',
  // 'require-atomic-updates': 'error',
  'no-var': 'error',
  'one-var': ['warn', 'consecutive'],
  'prefer-const': 'error',

  // Console
  'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
};

export default defineConfig([
  globalIgnores([
    '**/.storybook',
    '**/*.d.ts',
    '**/archived/**/*',
    '**/coverage/**/*',
    '**/dist',
    '**/generated',
    '**/node_modules',
  ]),
  js.configs.recommended,
  prettierRecommended,
  ...storybook.configs['flat/recommended'],
  jsxA11y['flatConfigs'].recommended,
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: baseRules,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      tsEslint.configs.strict,
      tsEslint.configs.stylistic,
      tsEslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsEslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      ...baseRules,

      '@typescript-eslint/no-unused-vars': 'error',

      // relaxed rules
      '@typescript-eslint/no-explicit-any': 'off',

      // Async/Promise handling rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Front-end best practices
      // '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
    },
  },
  // Tests (Jest/Vitest) override
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/jest.config.{js,ts}',
      '**/vite.config.{js,ts}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
    plugins: {
      // Leave it to the project to install jest/vitest plugin if used
    },
    rules: {
      // Relaxed rules
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
