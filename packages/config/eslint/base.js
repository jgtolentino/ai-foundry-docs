module.exports = {
  root: false,
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // Prevent apps from importing other apps
    'no-restricted-imports': [
      'error',
      {
        patterns: ['apps/*'],
      },
    ],
    // Prevent accidental schema rename before migration
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/\\bsuqi\\.(gold|platinum)_/i]',
        message: 'Do not reference suqi.* schema; backend stays on scout.*',
      },
    ],
  },
}