// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    'coverage/**',
    'next-env.d.ts', // One-off scraping / seed scripts — not shipped, not app code.
    'scripts/**',
  ]),
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  {
    // Engineering standard (same as ak-backend and ak-business-portal):
    // `any` is banned and the unsafe-* family are errors, not warnings.
    // Type external data at the boundary instead of casting through `any`.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // Allow apostrophes and quotes in CMS/marketing copy; still catch `>` and `}` in JSX text.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    },
  },
]);

export default eslintConfig;
