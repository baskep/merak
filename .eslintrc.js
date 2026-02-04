module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
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
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
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
      'error',
      {
        'before': true,
        'after': true,
      },
    ],
    'block-spacing': ['error', 'always'],
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
    'semi': ['error', 'never'],
    'semi-spacing': [
      2,
      {
        'before': false,
        'after': true,
      },
    ],
    'space-before-blocks': ['error', 'always'],
    'no-trailing-spaces': 2,
    'object-curly-spacing': ['error', 'always'],
    'camelcase': 'off',
    'no-mixed-operators': 'off',
    'jsx-a11y/alt-text': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': 'off',
    'indent': ['error', 2],
    'react/no-unescaped-entities': 'off',
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
    'react/jsx-closing-tag-location': ['error'],
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
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3 }],
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
}
