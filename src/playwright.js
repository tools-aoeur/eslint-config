// @ts-check

import playwrightPlugin from 'eslint-plugin-playwright';
import { ERROR, playwrightTestFiles } from './config.js';

const recommended = playwrightPlugin.configs['flat/recommended'];

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  {
    ...recommended,
    files: playwrightTestFiles,
    rules: {
      ...recommended.rules,

      // Don't warn, but error
      'playwright/consistent-spacing-between-blocks': ERROR,
      'playwright/no-conditional-expect': ERROR,
      'playwright/no-element-handle': ERROR,
      'playwright/no-eval': ERROR,
      'playwright/no-identical-title': ERROR,
      'playwright/no-page-pause': ERROR,
      'playwright/no-useless-await': ERROR,
      'playwright/no-useless-not': ERROR,
      'playwright/no-wait-for-selector': ERROR,
      'playwright/no-wait-for-timeout': ERROR,
      'playwright/prefer-locator': ERROR,
      'playwright/prefer-to-have-count': ERROR,
      'playwright/prefer-to-have-length': ERROR,

      // Additional rules
      'playwright/no-get-by-title': ERROR,
      'playwright/prefer-comparison-matcher': ERROR,
      'playwright/prefer-equality-matcher': ERROR,
      'playwright/prefer-native-locators': ERROR,
      'playwright/prefer-to-be': ERROR,
      'playwright/prefer-to-contain': ERROR
    }
  }
];
