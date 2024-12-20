// @ts-check

import { ERROR, cypressTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    files: cypressTestFiles,
    rules: {
      'no-restricted-properties': [
        ERROR,
        ...['it', 'describe', 'test'].map(name => ({
          object: name,
          property: 'only',
          message:
            'This should only be used for debugging and removed afterwards.'
        }))
      ]
    }
  }
];
