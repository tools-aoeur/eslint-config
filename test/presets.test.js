// @ts-check

import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { ESLint } from 'eslint';
import { getPresets } from '../src/index.js';

const fixturesDir = path.join(import.meta.dirname, 'fixtures');

/**
 * Lints a fixture project and returns the sorted, unique rule ids that were
 * reported per file (relative to the fixture project).
 *
 * @param {string} fixture
 * @param {Array<import('eslint').Linter.Config>} config
 * @returns {Promise<Record<string, Array<string>>>}
 */
async function lintFixture(fixture, config) {
  const cwd = path.join(fixturesDir, fixture);
  const eslint = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: config
  });
  const results = await eslint.lintFiles(['.']);
  return Object.fromEntries(
    results.map(result => [
      path.relative(cwd, result.filePath),
      [...new Set(result.messages.map(message => String(message.ruleId)))].sort()
    ])
  );
}

describe('typescript project', async () => {
  const results = await lintFixture('typescript', [
    ...(await getPresets(
      'typescript',
      'react',
      'lodash',
      'cssModules',
      'vitest',
      'cypress',
      'playwright'
    ))
  ]);

  it('reports nothing for valid code', () => {
    assert.deepEqual(results['src/Clean.tsx'], []);
    assert.deepEqual(results['src/util.ts'], []);
    assert.deepEqual(results['tests/e2e/specs/clean.spec.ts'], []);
  });

  it('applies the typescript and react presets', () => {
    assert.deepEqual(results['src/App.tsx'], [
      '@eslint-react/dom-no-missing-button-type',
      '@eslint-react/dom-no-unsafe-target-blank',
      '@eslint-react/no-missing-key',
      '@stylistic/jsx-curly-brace-presence',
      '@stylistic/jsx-self-closing-comp',
      '@typescript-eslint/array-type',
      '@typescript-eslint/consistent-type-imports',
      '@typescript-eslint/method-signature-style',
      '@typescript-eslint/no-unused-vars',
      'jsx-a11y/alt-text',
      'no-console',
      'perfectionist/sort-jsx-props',
      'react-hooks/exhaustive-deps',
      'sort-destructure-keys/sort-destructure-keys'
    ]);
  });

  it('resolves imports with the typescript resolver', () => {
    assert.deepEqual(results['src/res.ts'], [
      'import/no-extraneous-dependencies'
    ]);
  });

  it('applies the vitest preset to unit tests', () => {
    assert.deepEqual(results['src/App.spec.tsx'], [
      'import/newline-after-import',
      'lodash/prefer-noop',
      'sort-imports',
      'vitest/consistent-test-it',
      'vitest/expect-expect',
      'vitest/no-focused-tests',
      'vitest/prefer-lowercase-title'
    ]);
  });

  it('applies the cypress preset to `*.cy.*` files', () => {
    assert.deepEqual(results['src/Thing.cy.tsx'], [
      'cypress/no-pause',
      'cypress/no-unnecessary-waiting',
      'cypress/unsafe-to-chain-command',
      'no-restricted-properties'
    ]);
  });

  it('applies the playwright preset instead of vitest to e2e files', () => {
    assert.deepEqual(results['tests/e2e/specs/basic.spec.ts'], [
      'playwright/consistent-spacing-between-blocks',
      'playwright/expect-expect',
      'playwright/no-focused-test',
      'playwright/no-page-pause',
      'playwright/no-wait-for-timeout',
      'playwright/prefer-locator',
      'playwright/prefer-native-locators',
      'playwright/prefer-to-have-count',
      'playwright/prefer-web-first-assertions'
    ]);
    assert.deepEqual(results['src/app.e2e.ts'], [
      'import/newline-after-import',
      'playwright/consistent-spacing-between-blocks',
      'playwright/no-get-by-title',
      'sort-imports'
    ]);
  });

  it("doesn't treat playwright fixtures as react hooks", () => {
    assert.deepEqual(results['tests/e2e/support/fixtures.ts'], [
      'import/newline-after-import'
    ]);
  });
});

describe('javascript project', async () => {
  const results = await lintFixture('javascript', [
    ...(await getPresets('javascript', 'react', 'jest')),
    { settings: { jest: { version: 30 } } }
  ]);

  it('reports nothing for valid code', () => {
    assert.deepEqual(results['src/a.js'], []);
    assert.deepEqual(results['src/clean.jsx'], []);
    assert.deepEqual(results['src/clean.test.js'], []);
  });

  it('lints `*.jsx` files and resolves imports with the node resolver', () => {
    assert.deepEqual(results['src/b.jsx'], [
      'import/named',
      'import/no-unresolved',
      'import/order',
      'no-undef'
    ]);
  });

  it('applies the jest preset', () => {
    assert.deepEqual(results['src/b.test.js'], [
      'jest/consistent-test-it',
      'jest/expect-expect',
      'jest/no-focused-tests',
      'jest/prefer-lowercase-title'
    ]);
  });
});
