// eslint.config.js
import baseConfig from "../../eslint.config.js";

export default [
  ...baseConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
  },
];
