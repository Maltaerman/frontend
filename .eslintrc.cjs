module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint-config-prettier',
  ],
  rules: {
    'vue/no-unused-vars': 'error',
    'no-multi-spaces': ['error'],
    'vue/attribute-hyphenation': ['off'],
    'vue/require-default-prop': ['off'],
    'vue/require-valid-default-prop': ['off'],
    'import/core-modules': 0,
    'vue/v-on-event-hyphenation': ['off'],
    'vue/no-mutating-props': ['off'],
    'vue/multi-word-component-names': ['off'], // to get rid of in future
    'vue/attributes-order': ['error', { alphabetical: true }],
    'for-direction': 'off',
    'no-useless-escape': 'off',
    'vue/no-reserved-component-names': 'off', // to get rid of in future
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
  },
}
