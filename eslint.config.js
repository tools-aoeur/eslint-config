// @ts-check

import {getPresets} from './src/index.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  ...(await getPresets(
    'typescript', // (contains javascript)
    'react',
    'cssModules',
    'jest',
    'cypress',
    'vitest'
  ))
];
