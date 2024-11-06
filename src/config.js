export const ERROR = 'error';
export const OFF = 'off';

const jsFileExtensions = ['js', 'jsx', 'mjs', /*   */ 'cjs' /*   */];
const tsFileExtensions = ['ts', 'tsx', 'mts', 'mtsx', 'cts', 'ctsx'];
const allFileExtensions = [...jsFileExtensions, ...tsFileExtensions];

export const unitTestFiles = [
  `**/*.{spec,test}.{${allFileExtensions.join(',')}}`
];
export const cypressTestFiles = [
  `**/*.{cy,e2e}.{${allFileExtensions.join(',')}}`
];
export const allTestFiles = [...unitTestFiles, ...cypressTestFiles];

export const typescriptFiles = [`**/*.{${tsFileExtensions.join(',')}}`];
export const javascriptFiles = [`**/*.{${jsFileExtensions.join(',')}}`];
