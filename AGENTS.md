# 使用 pnpm 作为包管理器

## 基本命令

```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add <package>

# 添加开发依赖
pnpm add -D <package>

# 移除依赖
pnpm remove <package>

# 更新依赖
pnpm update

# 运行脚本
pnpm dev
pnpm build
pnpm test
```

## 注意事项

1. 项目已配置使用 pnpm@9.6.0
2. 使用 `pnpm-lock.yaml` 锁定依赖版本
3. 避免使用 npm 或 yarn 命令

