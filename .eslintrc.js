module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    "prettier/prettier": 2
  },
  ignorePatterns: [
    ".eslintrc.js",
    "jest.config.js",
    "node_modules/",
    "dist/**/*",
    "docs/**/*",
    "coverage/**/*",
    "*.TypeGuards.ts"
  ]
}
