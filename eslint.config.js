import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbTypescriptBase from 'eslint-config-airbnb-typescript/base';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      Include airbnb-base rules
      ...airbnbBase.rules,
      Include airbnb-typescript/base rules
      ...airbnbTypescriptBase.rules,
      custom rules...
    },
  },
];
