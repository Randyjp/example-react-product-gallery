module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'jest', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'no-use-before-define': ['error', { functions: false }],
  },
};
