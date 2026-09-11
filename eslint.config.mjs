// @ts-check

import js from '@eslint/js'
import * as astroParser from 'astro-eslint-parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

/** @type { import("eslint").Linter.Config[] } */

export default [
  {
    ignores: ['dist', '.astro'],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        project: true,
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    rules: {
      'object-shorthand': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
