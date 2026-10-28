// @ts-check

import cypressPlugin from 'eslint-plugin-cypress';
import { ERROR, cypressTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    ...cypressPlugin.configs.recommended,
    files: cypressTestFiles,
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      'cypress/no-debug': ERROR,
      'cypress/no-pause': ERROR,
      'no-restricted-properties': [
        ERROR,
        ...['it', 'describe', 'test', 'context', 'specify'].map(name => ({
          object: name,
          property: 'only',
          message:
            'This should only be used for debugging and removed afterwards.'
        }))
      ]
    }
  }
];
