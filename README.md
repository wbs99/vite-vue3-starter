# 用于快速创建项目基础配置

# install
```bash
rm -rf .git
rm -rf node_modules pnpm-lock.yaml
git remote remove origin
pnpm config set save-prefix=''  // 锁死 npm 版本号
pnpm i
```

# 权限验证
https://fantastic-admin.hurui.me/guide/permission.html

# Icon
使用方式一：
在 https://yesicon.app/ 找到喜欢的 `icon` ，复制 `icon` 名称 ，填入到 `name` 中

使用方式二:
在 `src/assets/icons` 中添加自己喜欢的 `svg` ，填入到 `name` 中

```vue
<template>
  <SvgIcon name="line-md:arrow-left" />
</template>
