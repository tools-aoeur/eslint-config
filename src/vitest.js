// @ts-check

import vitestPlugin from '@vitest/eslint-plugin';
import { ERROR, unitTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      vitest: vitestPlugin
    },
    files: unitTestFiles,
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      'vitest/consistent-test-it': [
        ERROR,
        {
          fn: 'it',
          withinDescribe: 'it'
        }
      ],
      'vitest/prefer-lowercase-title': [ERROR, { ignore: ['describe'] }]
    }
  }
];
