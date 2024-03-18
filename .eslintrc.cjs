module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    `plugin:@typescript-eslint/stylistic-type-checked`,
    `plugin:react/recommended`,
    `plugin:react/jsx-runtime`,
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "vite.config.js"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','react', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
  },
  settings: {
    react: {
      version: "detect",
    }
  }
}
