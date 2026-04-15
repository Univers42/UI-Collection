import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const tsFiles = ['library/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'];
const scriptFiles = ['scripts/**/*.{js,mjs}'];

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'assets/**', 'media/**'],
  },
  {
    files: scriptFiles,
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: tsFiles,
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
    },
  },
);
