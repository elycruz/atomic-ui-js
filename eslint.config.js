// eslint.config.js
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      "**/archived/**/*",
      "**/node_modules/**/*",
      "**/generated/**/*",
    ],
  },

  js.configs.recommended,

  // Convert legacy Storybook config → flat config
  ...compat.extends("plugin:storybook/recommended"),

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
];
