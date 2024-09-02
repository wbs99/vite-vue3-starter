# 用于快速创建项目基础配置

# Vue 3 + TypeScript + Vite  start
- 已引入 vue-router@4
- 已引入 pinia
- 已引入 sass
- 已引入 淘宝的 meta viewport
- 已设置部分 CSS Reset

# install
```bash
pnpm i
rm -rf .git
git remote remove origin
pnpm config set save-prefix=''  // 锁死 npm 版本号
```

# Icon
使用方式一：
在 https://yesicon.app/ 找到喜欢的 `icon` ，复制 `icon` 名称 ，填入到 `name` 中

使用方式二:
在 `src/assets/icons` 中添加自己喜欢的 `svg` ，填入到 `name` 中

```vue
<template>
  <SvgIcon name="line-md:arrow-left" />
</template>
