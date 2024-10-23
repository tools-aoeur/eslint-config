// @ts-check

// @ts-expect-error -- False positive
import importPlugin from 'eslint-plugin-import';
// eslint-disable-next-line import/no-unresolved -- False positive
import typescriptEslint from 'typescript-eslint';
import { ERROR, OFF, typescriptFiles } from './config.js';
import javascript from './javascript.js';

/**
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  ...javascript,

  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.stylisticTypeChecked,
  importPlugin.configs.typescript,

  {
    // Only apply TypeScript rules to TypeScript files to avoid
    // causing issues in regular JavaScript files. See also:
    // https://stackoverflow.com/a/64488474/343045
    files: typescriptFiles,
    settings: {
      'import/resolver': 'typescript'
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // The TypeScript compiler takes care of this
      'import/no-unresolved': OFF,
      'import/named': OFF,
      'import/namespace': OFF,
      'import/default': OFF,
      'import/export': OFF,

      // Use the TypeScript alternatives
      'no-unused-vars': OFF,
      'no-shadow': OFF,
      'no-use-before-define': OFF,
      'no-unused-expressions': OFF,

      '@typescript-eslint/no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all'
        }
      ],
      '@typescript-eslint/no-unused-expressions': ERROR,
      '@typescript-eslint/array-type': [ERROR, { default: 'generic' }],
      '@typescript-eslint/await-thenable': ERROR,
      '@typescript-eslint/method-signature-style': [ERROR, 'property'],
      '@typescript-eslint/no-for-in-array': ERROR,
      '@typescript-eslint/no-misused-promises': [
        ERROR,
        { checksVoidReturn: { attributes: false } }
      ],
      // There are valid use cases for this
      '@typescript-eslint/no-empty-interface': OFF,
      '@typescript-eslint/no-empty-function': OFF,
      '@typescript-eslint/no-shadow': ERROR,
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: { boolean: true, string: true }
        }
      ],
      '@typescript-eslint/switch-exhaustiveness-check': [
        ERROR,
        {
          allowDefaultCaseForExhaustiveSwitch: false,
          requireDefaultForNonUnion: true
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': OFF,
      // Too restrictive
      '@typescript-eslint/no-empty-object-type': OFF,
      '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
      '@typescript-eslint/consistent-type-exports': [
        ERROR,
        { fixMixedExportsWithInlineTypeSpecifier: true }
      ],
      // Prevent type parameter names like `TValue`, `T`, `T1`
      '@typescript-eslint/naming-convention': [
        ERROR,
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z][a-z]',
            match: true
          }
        }
      ]
    }
  }
];
