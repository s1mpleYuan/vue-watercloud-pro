module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': "error",
    // "vue/no-v-html": "off",
    'max-params': ["error", 3],
    'eqeqeq': 0, // 允许使用非全等
    'no-plusplus': 'off', // 允许使用 ++ --
    "semi": [2, "always"], // 语句强制分号结尾
    'default-case':2, // case 必须有default
    "no-multi-spaces": 1, // 不能用多余的空格
    "no-multiple-empty-lines": [1, {"max": 2}], // 空行最多不能超过2行
  }
}
