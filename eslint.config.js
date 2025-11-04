import js from "@eslint/js";
import globals from "globals";
import { pluginJs } from "eslint/config";

export default [
  pluginJs.configs.recommended,
  { 
    files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser },
    rules: {
      semi: "error"
    } 
  }
];
