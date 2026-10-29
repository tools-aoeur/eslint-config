# @tools-aoeur/eslint-config

## Goals

1. Find errors that are detectable with static analysis.
2. Make reading code easier by providing consistent code style.
3. Make writing code faster by leveraging auto fix wherever possible.

## Getting started

1. `pnpm add -D eslint @tools-aoeur/eslint-config` (requires ESLint 10)
2. Setup your project config in `eslint.config.mjs`:

```js
import { getPresets } from '@tools-aoeur/eslint-config';

export default [
  ...(await getPresets(
    // Base config
    'typescript', // or 'javascript'

    // Optional extensions
    'lodash',
    'react',
    'cssModules',
    'jest',
    'cypress',
    'playwright',
    'vitest'
  )),

  {
    // Your custom config
  }
];
```

3. If you require [globals](https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables), like browser APIs on `window`, you can add them to your config:

```js
// eslint.config.mjs
import globals from 'globals';

export default [
  // ...
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
];
```

4. To set up Prettier, add to your `package.json`:

```json
"prettier": "@tools-aoeur/eslint-config/.prettierrc.json"
```

5. If you use TypeScript, add to your `tsconfig.json`:

```json
"extends": "@tools-aoeur/eslint-config/tsconfig.json"
```

Happy linting!

### Test files

| Preset           | Files                                                 |
| ---------------- | ----------------------------------------------------- |
| `jest`, `vitest` | `**/*.{spec,test}.*` (except e2e files below)         |
| `cypress`        | `**/*.cy.*`                                           |
| `playwright`     | `**/*.e2e.*`, `**/e2e/**/*` and `playwright.config.*` |

If your tests live elsewhere, you can apply the presets to other files:

```js
// eslint.config.mjs
import playwright from '@tools-aoeur/eslint-config/src/playwright.js';

export default [
  // ...
  ...playwright.map(config => ({ ...config, files: ['acceptance/**/*.ts'] }))
];
```

## Further configuration

### CI integration

To validate your code in a CI pipeline, add the following to your `package.json`:

```json
"scripts": {
  "lint": "eslint src && prettier src --check"
}
```

### VSCode integration

The following two extensions are recommended:

1. [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

To auto-fix errors from ESLint as well as Prettier on save, you can use the following configuration:

```js
// settings.json (VSCode)
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Migrating to v5 (ESLint 10)

ESLint 10 is required. Plugins that don't support ESLint 10 were replaced:

| Before                   | After                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-import`   | [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), still registered as `import/*`                                                                  |
| `eslint-plugin-jsx-a11y` | [`eslint-plugin-jsx-a11y-x`](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x), still registered as `jsx-a11y/*`                                                       |
| `eslint-plugin-react`    | [`@eslint-react/eslint-plugin`](https://eslint-react.xyz), [`@stylistic/eslint-plugin`](https://eslint.style) and [`eslint-plugin-perfectionist`](https://perfectionist.dev) |

Rules from `eslint-plugin-react` used in your own config or in `eslint-disable` comments need to be renamed:

| Before                                           | After                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `react/button-has-type`                          | `@eslint-react/dom-no-missing-button-type`                                          |
| `react/display-name`                             | `@eslint-react/no-missing-component-display-name`                                   |
| `react/jsx-curly-brace-presence`                 | `@stylistic/jsx-curly-brace-presence`                                               |
| `react/jsx-key`                                  | `@eslint-react/no-missing-key`                                                      |
| `react/jsx-no-target-blank`                      | `@eslint-react/dom-no-unsafe-target-blank`                                          |
| `react/jsx-no-useless-fragment`                  | `@eslint-react/jsx-no-useless-fragment`                                             |
| `react/jsx-sort-props`                           | `perfectionist/sort-jsx-props`                                                      |
| `react/no-unstable-nested-components`            | `@eslint-react/no-nested-component-definitions`                                     |
| `react/no-unused-state`                          | `@eslint-react/no-unused-state`                                                     |
| `react/self-closing-comp`                        | `@stylistic/jsx-self-closing-comp`                                                  |
| `react/forbid-elements`, `react/jsx-no-literals` | `no-restricted-syntax`, e.g. with the selector `JSXOpeningElement[name.name='div']` |

Rules that only apply to `propTypes`, `defaultProps` or class component ordering (e.g. `react/sort-comp`, `react/sort-prop-types`, `react/no-typos`) were dropped without replacement.

Cypress tests are now only matched by `**/*.cy.*`. Files named `*.e2e.*` are treated as Playwright tests.

## Versioning

- Patch releases are for improved documentation, fixing a rule to stop reporting false positives and internal code changes.
- Minor releases are for changes to rules that can automatically be fixed.
- Major releases happen when rules are changed that can't be fixed automatically.
