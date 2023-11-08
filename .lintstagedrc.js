// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require('path');

const useConcurrently = (name, color, command) => {
  return `concurrently "npm:${command}" --name "${name}" --prefix-colors "${color}"`;
};

const sanitizeFilenames = (filenames) => {
  return filenames.map((f) => {
    const sanitized = f
      .replaceAll('(', '\\(')
      .replaceAll(')', '\\)')
      .replaceAll('[', '\\[')
      .replaceAll(']', '\\]');
    return `'${sanitized}'`;
  });
};

const buildEsLintCommand = (filenames) => {
  filenames = sanitizeFilenames(filenames);
  const name = 'ES Lint Staged & Fix ';
  const color = 'bgBlue.bold';
  const command = `lint:eslint:staged -- --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
  return useConcurrently(name, color, command);
};

const buildPrettierCommand = (filenames) => {
  filenames = sanitizeFilenames(filenames);
  const name = 'Prettier Staged & Fix ';
  const color = 'bgMagenta.bold';
  const command = `lint:prettier:staged -- ${filenames.join(' ')}`;
  return useConcurrently(name, color, command);
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEsLintCommand],
  '*.{js,jsx,ts,tsx,json,css,md,html,yaml,yml}': [buildPrettierCommand],
};
