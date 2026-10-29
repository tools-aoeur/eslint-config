export const ERROR = 'error';
export const OFF = 'off';

const jsFileExtensions = ['js', 'jsx', 'mjs', /*   */ 'cjs' /*   */];
const tsFileExtensions = ['ts', 'tsx', 'mts', 'mtsx', 'cts', 'ctsx'];
const allFileExtensions = [...jsFileExtensions, ...tsFileExtensions];
const allFileExtensionsGlob = `{${allFileExtensions.join(',')}}`;

export const cypressTestFiles = [`**/*.cy.${allFileExtensionsGlob}`];
export const playwrightTestFiles = [
  `**/*.e2e.${allFileExtensionsGlob}`,
  // Specs, fixtures and helpers in e2e folders, e.g. `tests/e2e/**`
  `**/e2e/**/*.${allFileExtensionsGlob}`,
  `**/playwright.config.${allFileExtensionsGlob}`
];
export const e2eTestFiles = [...cypressTestFiles, ...playwrightTestFiles];

// Unit test presets should ignore `e2eTestFiles`, since `*.spec.*` files in
// e2e folders are typically Playwright tests
export const unitTestFiles = [`**/*.{spec,test}.${allFileExtensionsGlob}`];
export const allTestFiles = [...unitTestFiles, ...e2eTestFiles];

export const typescriptFiles = [`**/*.{${tsFileExtensions.join(',')}}`];
export const javascriptFiles = [`**/*.{${jsFileExtensions.join(',')}}`];
