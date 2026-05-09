// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      // Disallow any — enforce explicit typing everywhere
      '@typescript-eslint/no-explicit-any': 'error',
      // Warn on unused variables, allow underscore-prefixed params to be ignored
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Prefer type-only imports where possible for cleaner tree-shaking
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      // Limit console usage — warn and error are fine, log is noise in production
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
]);
