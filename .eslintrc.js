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
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    'indent': ['error', 2],
    'no-var': 'error',
    'prefer-template': 'error',
    'no-multi-assign': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': ['error', 'consistent'],
    'object-shorthand': ['error', 'methods', {
      'avoidExplicitReturnArrows': true,
    }],
    'no-confusing-arrow': 'error',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'space-infix-ops': ['error', {
      'int32Hint': false,
    }],
    'max-len': ['error', 120, {
      'ignoreComments': true,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],
    'eqeqeq': ['off', 'always'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'block-spacing': ['error', 'always'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true,
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true,
    }],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1,
    }],
    'no-unneeded-ternary': ['error', {
      'defaultAssignment': false,
    }],
    'operator-linebreak': ['error', 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    'semi': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'camelcase': 'off',
    'no-mixed-operators': 'off',
    'jsx-a11y/alt-text': 'off',
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': 'off',
    'prefer-rest-params': 'off',
    'no-undef': 'off',
    'react/no-unknown-property': 'off',
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
