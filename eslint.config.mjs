import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import jsdoc from "eslint-plugin-jsdoc";

export default defineConfig([
  {files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      jsdoc: jsdoc
  },
  },
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error"
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [".node_modules/*"]
},
]);
