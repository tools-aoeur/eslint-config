// @ts-check

import globals from 'globals';
import { getPresets } from './src/index.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default (
  await getPresets(
    'javascript',
    'react',
    'cssModules',
    'jest',
    'cypress',
    'vitest',
    'lodash'
  )
).concat({
  languageOptions: {
    globals: globals.node
  }
});
