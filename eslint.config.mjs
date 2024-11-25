import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['client/', 'build/'] },
  { languageOptions: { globals: { ...globals.node } } },
  {
    plugins: {
      prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
