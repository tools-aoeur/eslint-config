// @ts-check

import { fixupPluginRules } from '@eslint/compat';
import lodashPlugin from 'eslint-plugin-lodash';
import { ERROR, OFF } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      // Some rules use `context.getSourceCode()`, which was removed in ESLint 10
      lodash: fixupPluginRules(/** @type {any} */ (lodashPlugin))
    },
    rules: {
      .../** @type {any} */ (lodashPlugin.configs.recommended.rules),
      'lodash/prefer-lodash-method': OFF,
      'lodash/import-scope': [ERROR, 'member']
    }
  }
];
