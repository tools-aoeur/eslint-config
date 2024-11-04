// @ts-check

import jestPlugin from 'eslint-plugin-jest';
import { ERROR, unitTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      jest: jestPlugin
    },
    files: unitTestFiles,
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'],
      'jest/consistent-test-it': [
        ERROR,
        {
          fn: 'it',
          withinDescribe: 'it'
        }
      ],
      'jest/prefer-lowercase-title': [ERROR, { ignore: ['describe'] }]
    }
  }
];
