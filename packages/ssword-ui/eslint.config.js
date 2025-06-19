import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import _css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["src/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2015 },
      ecmaVersion: 6, // I like es6... es5 is too hard to support
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // {
  //   files: ["src/styles/*.css"],
  //   plugins: { css },
  //   language: "css/css",
  //   extends: ["css/recommended"],
  // },
  {
    // SCSS
  },
  {
    ignores: [
      "coverage/**/*",
      "dist/**/*",
      "node_modules/**/*",
      "webpack-utils.js",
    ],
    settings: {
      react: {
        version: "18.3.1",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
    },
  },
]);
