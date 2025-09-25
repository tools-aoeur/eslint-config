// @ts-check

import lodashPlugin from 'eslint-plugin-lodash';
import { ERROR, OFF } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      lodash: /** @type {any} */ (lodashPlugin)
    },
    rules: {
      .../** @type {any} */ (lodashPlugin.configs.recommended.rules),
      'lodash/prefer-lodash-method': OFF,
      'lodash/import-scope': [ERROR, 'member']
    }
  }
];
