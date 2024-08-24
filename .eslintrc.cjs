module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true, // 解决 'module' is not defined报错。
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-undef': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // any校验
    'react-hooks/exhaustive-deps': 'off', // 取消依赖项校验
    'no-warning-comments': 'off',
  },
}
