module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    'no-multi-spaces': ['error'],
    'vue/attribute-hyphenation': ['off'],
    // 'vue/no-use-v-if-with-v-for': 'off',
    'vue/attributes-order': ['error', { alphabetical: true }],
    'for-direction': 'off',
    'no-useless-escape': 'off',
    indent: ['error', 2, { flatTernaryExpressions: true }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    semi: ['error', 'never'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: 1,
      },
    ],
    'vue/prop-name-casing': ['off'],
    'vue/valid-v-slot': ['off'],
  },
}
