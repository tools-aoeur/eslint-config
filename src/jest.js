// @ts-check

import jestPlugin from 'eslint-plugin-jest';
import { ERROR, e2eTestFiles, unitTestFiles } from './config.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    plugins: {
      jest: jestPlugin
    },
    ...jestPlugin.configs['flat/recommended'],
    files: unitTestFiles,
    ignores: e2eTestFiles,
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
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
