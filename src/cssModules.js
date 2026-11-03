// @ts-check

import { fixupPluginRules } from '@eslint/compat';
// @ts-expect-error -- False positive
import cssModules from 'eslint-plugin-css-modules';
import { ERROR, OFF, allTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      // The plugin isn't maintained anymore and uses APIs that were removed in
      // ESLint 10, e.g. `context.getFilename()`
      'css-modules': fixupPluginRules(cssModules)
    },
    rules: {
      'css-modules/no-unused-class': ERROR,
      'css-modules/no-undef-class': ERROR
    }
  },
  {
    files: allTestFiles,
    rules: {
      'css-modules/no-unused-class': OFF
    }
  }
];
