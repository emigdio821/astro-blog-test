/** @type {import("prettier").Config} */

export default {
  tabWidth: 2,
  semi: false,
  useTabs: false,
  printWidth: 110,
  endOfLine: 'lf',
  singleQuote: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
