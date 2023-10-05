module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  rules: {
    'no-var': 'error',
    'prefer-template': 'error',
    'no-multi-assign': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': ['error', 'consistent'],
    'object-shorthand': [
      'error',
      'methods',
      {
        'avoidExplicitReturnArrows': true,
      },
    ],
    'no-confusing-arrow': 'error',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/prop-types': [
      'warn',
      {
        'skipUndeclared': true,
      },
    ],
    'react/jsx-handler-names': [
      'off',
      {
        'eventHandlerPrefix': '(handle|on|set)',
        'checkLocalVariables': true,
      },
    ],
    'react/jsx-closing-tag-location': [2],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-key': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'ignore',
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        'component': true,
        'html': true,
      },
    ],
    'space-infix-ops': [
      'error',
      {
        'int32Hint': false,
      },
    ],
    'max-len': [
      'error',
      120,
      {
        'ignoreComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ],
    'eqeqeq': ['error', 'smart'],
    'arrow-spacing': [
      2,
      {
        'before': true,
        'after': true,
      },
    ],
    'block-spacing': [2, 'always'],
    'comma-spacing': [
      2,
      {
        'before': false,
        'after': true,
      },
    ],
    'key-spacing': [
      2,
      {
        'beforeColon': false,
        'afterColon': true,
      },
    ],
    'keyword-spacing': [
      2,
      {
        'before': true,
        'after': true,
      },
    ],
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [
      2,
      {
        'max': 1,
      },
    ],
    'no-unneeded-ternary': [
      2,
      {
        'defaultAssignment': false,
      },
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        'overrides': {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'semi': [2, 'never'],
    'semi-spacing': [
      2,
      {
        'before': false,
        'after': true,
      },
    ],
    'space-before-blocks': [2, 'always'],
    'no-trailing-spaces': 2,
    'object-curly-spacing': [2, 'always'],
    'camelcase': 'off',
    'no-mixed-operators': 'off',
    'jsx-a11y/alt-text': 'off',
    'no-unused-vars': 'off',
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': 'off',
    'indent': ['error', 2],
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': ['off', { args: 'none' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
}
