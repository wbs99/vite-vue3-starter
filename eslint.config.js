import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    ignores: [
      'public',
      'dist*',
      '**/*.md',
    ],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'style/semi': ['error', 'never'],
      'vue/operator-linebreak': ['error', 'before'],
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'style/max-statements-per-line': ['off'],
      'style/comma-dangle': 'off',
      'style/brace-style': 'off',
      'style/object-curly-spacing': 'off',
      'style/member-delimiter-style': 'off',
      'curly': 'off',
      'antfu/consistent-list-newline': 'off',
      'antfu/top-level-function': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'unicorn/prefer-number-properties': 'off',
      'ts/no-use-before-define': 'off',
      'ts/lines-between-class-members': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/comma-dangle': 'off',
      'ts/no-unused-vars': 'off',
    },
  },
)
