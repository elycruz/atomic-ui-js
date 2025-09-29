// eslint.config.js
import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";

export default [
  {
    ignores: [
      "**/archived/**/*",
      "**/node_modules/**/*",
      "**/generated/**/*",
    ],
  },
  js.configs.recommended,
  storybook.configs.recommended,
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
