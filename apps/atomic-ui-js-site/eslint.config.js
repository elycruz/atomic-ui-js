// eslint.config.js
import baseConfig from "../../eslint.config.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  ...baseConfig,
  nextPlugin.configs["core-web-vitals"],
];
