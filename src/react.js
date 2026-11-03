// @ts-check

import eslintReactPlugin from '@eslint-react/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import { ERROR, OFF, playwrightTestFiles } from './config.js';

/**
 * Registers `eslint-plugin-jsx-a11y-x` under the `jsx-a11y` namespace to stay
 * compatible with the rule names of `eslint-plugin-jsx-a11y`.
 */
const jsxA11yRecommended = {
  plugins: {
    'jsx-a11y': jsxA11yPlugin
  },
  rules: Object.fromEntries(
    Object.entries(jsxA11yPlugin.configs.recommended.rules ?? {}).map(
      ([name, value]) => [name.replace(/^jsx-a11y-x\//, 'jsx-a11y/'), value]
    )
  )
};

/**
 * The official `react-hooks` plugin is used for the rules of hooks and the
 * React Compiler rules, therefore the ported rules are disabled.
 */
const eslintReactHooksDuplicates = Object.fromEntries(
  Object.keys(reactHooksPlugin.rules)
    .map(name => `@eslint-react/${name}`)
    .filter(name => name in (eslintReactPlugin.configs.all.rules ?? {}))
    .map(name => [name, OFF])
);

/**
 * Don't warn, but error.
 */
const eslintReactWarningsAsErrors = Object.fromEntries(
  Object.entries(eslintReactPlugin.configs.recommended.rules ?? {})
    .filter(([, value]) => (Array.isArray(value) ? value[0] : value) === 'warn')
    .map(([name, value]) => [
      name,
      Array.isArray(value) ? [ERROR, ...value.slice(1)] : ERROR
    ])
);

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  jsxA11yRecommended,
  eslintReactPlugin.configs.recommended,
  reactHooksPlugin.configs.flat.recommended,
  {
    plugins: {
      '@stylistic': stylisticPlugin,
      perfectionist: perfectionistPlugin,
      'sort-destructure-keys': sortDestructureKeys
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...eslintReactWarningsAsErrors,
      ...eslintReactHooksDuplicates,
      // These APIs are discouraged, but still valid
      '@eslint-react/no-children-count': OFF,
      '@eslint-react/no-children-for-each': OFF,
      '@eslint-react/no-children-map': OFF,
      '@eslint-react/no-children-only': OFF,
      '@eslint-react/no-children-to-array': OFF,
      '@eslint-react/no-clone-element': OFF,
      '@eslint-react/no-use-context': OFF,
      'jsx-a11y/label-has-associated-control': ERROR,
      '@eslint-react/dom-no-missing-button-type': ERROR,
      '@eslint-react/dom-no-unsafe-target-blank': ERROR,
      // False positives with render props
      '@eslint-react/no-nested-component-definitions': OFF,
      '@eslint-react/no-unused-state': ERROR,
      // Two changes from recommended default:
      // - Don't warn, but error
      // - Enable autofix
      'react-hooks/exhaustive-deps': [
        ERROR,
        // Since we throw on missing deps, it's not a question of whether or not
        // the deps are added, but rather if you have to do it manually or
        // automatically. Therefore go for the automatic fix.
        { enableDangerousAutofixThisMayCauseInfiniteLoops: true }
      ],
      '@stylistic/jsx-curly-brace-presence': [
        ERROR,
        { props: 'never', children: 'ignore' }
      ],
      '@stylistic/jsx-self-closing-comp': ERROR,
      'perfectionist/sort-jsx-props': [
        ERROR,
        {
          type: 'alphabetical',
          locales: 'en',
          ignoreCase: true,
          customGroups: [
            { groupName: 'reserved', elementNamePattern: '^(key|ref)$' }
          ],
          groups: ['reserved', 'unknown']
        }
      ],
      'sort-destructure-keys/sort-destructure-keys': ERROR
    }
  },
  {
    // Playwright fixtures call `use(value)`, which isn't a React Hook
    files: playwrightTestFiles,
    rules: {
      'react-hooks/rules-of-hooks': OFF
    }
  }
];
