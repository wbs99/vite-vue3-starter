# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vite 构建的 Vue 3 Web 应用 starter 模板。它为开发 SPA（单页应用）提供了现代化基础，包含路由、状态管理、数据获取和 UI 组件等丰富功能。

## 技术栈

- **前端框架**: Vue 3.5.17
- **构建工具**: Vite 6.0.3
- **路由**: Vue Router 4.5.1
- **状态管理**: Pinia 3.0.3 + pinia-plugin-persistedstate 4.3.0
- **数据获取**: @tanstack/vue-query 5.81.5 + Axios 1.10.0
- **样式**: Tailwind CSS 3.4.16 + DaisyUI 4 + Sass 1.89.2
- **类型检查**: TypeScript 5.8.3
- **代码规范**: ESLint 9.12.0 with @antfu/eslint-config
- **包管理器**: pnpm 9.6.0 (required)
- **自动导入**: unplugin-auto-import 19.3.0 + unplugin-vue-components 28.8.0
- **图标系统**: @iconify/vue 5.0.0 + vite-plugin-svg-icons
- **Mock 数据**: vite-plugin-mock 3.0.1
- **浏览器兼容**: @vitejs/plugin-legacy (Chrome 75+)

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev                    # 启动开发服务器 (默认端口: 5555)
pnpm build                  # 构建生产版本
pnpm preview                # 本地预览生产构建

# 代码质量
pnpm lint                   # 运行 ESLint 并自动修复
```

## 架构

### 项目结构
- `src/main.ts` - 应用入口
- `src/App.vue` - 根组件
- `src/router/router.ts` - Vue Router 配置
- `src/stores/` - Pinia 状态管理 stores
- `src/pages/` - 页面组件
- `src/components/` - 可复用组件
- `src/api/` - API 接口定义
- `src/mock/` - 开发环境 Mock 数据
- `src/utils/` - 工具函数
- `src/hooks/` - 自定义 Composition API hooks
- `src/assets/` - 静态资源 (图标、样式等)
- `src/types/` - TypeScript 类型定义
- `vite.config.ts` - Vite 构建配置
- `eslint.config.js` - ESLint 配置
- `tailwind.config.js` - Tailwind CSS 配置

### 路由系统
- 使用 Vue Router 实现客户端路由
- 路由定义在 `src/router/router.ts`
- 白名单机制实现认证守卫
- 路由 meta 信息用于权限控制
- 自动按路由代码分割

### 状态管理
- Pinia 实现全局状态管理
- Stores 位于 `src/stores/`
- 通过 pinia-plugin-persistedstate 持久化状态
- TypeScript 优先的 store 定义

### 数据流
1. 组件通过 Vue Query hooks 或 Pinia stores 获取数据
2. API 请求定义在 `src/api/`
3. 开发环境可在 `src/mock/` 使用 Mock 数据
4. 响应类型定义在 `src/types/`

### 自动导入系统
- Vue 3 composition API 自动导入 (ref, reactive, computed 等)
- Vue Router 和 Pinia 自动导入
- `src/components/` 下的组件自动导入
- 类型定义在 `src/types/auto-import.d.ts` 和 `src/types/components.d.ts`

### 图标系统

**方式一：Iconify (推荐)**
- 访问 https://yesicon.app/ 查找图标
- 复制图标名称 (例如 `line-md:arrow-left`)
- 在组件中使用：
```vue
<template>
  <SvgIcon name="line-md:arrow-left" />
</template>
```

**方式二：自定义 SVG 图标**
- 将 SVG 文件添加到 `src/assets/icons/`
- 使用文件名作为图标名称：
```vue
<template>
  <SvgIcon name="loading" />
</template>
```

## 代码规范

### TypeScript
- 启用 TypeScript strict 模式
- 避免使用 `any` — 优先使用显式或泛型类型
- 使用 composition API 而非 options API
- 使用 **单引号** 且 **不加分号**
- 组件顺序：`template` → `script` → `style`

### Tailwind CSS + DaisyUI

**类属性顺序：**
编写 Tailwind 类时，请遵循以下顺序以保持一致性：
1. **布局类**: `flex`, `grid`, `justify-*`, `items-*`, `flex-wrap`, `flex-1`, `flex-grow` 等
2. **间距类**: `m*`, `p*`, `mx*`, `my*`, `mb*`, `mt*`, `gap-*` 等
3. **颜色类**: `bg-*`, `text-*`, `border-*`, `from-*`, `to-*`, `via-*`, `decoration-*` 等
4. **其他样式 (最后)**: `rounded*`, `shadow*`, `border*`, `transition-*`, `transform-*` 等

**示例：**
```vue
<!-- Good: 布局 → 间距 → 颜色 → 其他 -->
<view class="flex justify-center p-6 mx-4 mt-6 text-gray-800 bg-white rounded-lg shadow-md">
```

**DaisyUI 组件：**
- 使用 DaisyUI 组件类实现一致样式
- 结合 Tailwind 工具类进行定制
- 参考 DaisyUI 文档：https://daisyui.com/

**HTML 注释：**
- 移除所有不必要的 HTML 注释 (如 `<!-- 页面标题 -->`, `<!-- 按钮组 -->`)
- 仅保留复杂业务逻辑的必要注释
- 保持代码简洁，自文档化

**样式最佳实践：**
- 优先使用 Tailwind 工具类而非自定义 CSS
- 使用 Tailwind 响应式前缀：`sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- 使用状态变体：`hover:`, `active:`, `focus:`
- 复杂组件样式使用 `<style lang="scss" scoped>`
- 使用 DaisyUI 组件实现常见 UI 模式

### 通用规范
- 保持代码简洁、模块化、可维护
- 遵循现有 ESLint/Prettier 规则
- 优先使用自动导入的组件和 hooks
- 优先使用函数式模式和 composition 而非 class
- 使用有意义的变量和函数名
- 编写自文档化代码

## UI 规范

> 参考: https://www.ui-skills.com/

构建更好界面的主观约束。

### 技术栈
- 优先使用 Tailwind CSS 默认值 (spacing, radius, shadows) 而非自定义值
- 需要 JavaScript 动画时，必须使用 `motion-v` 或原生 CSS 动画

### 组件
- 具有键盘或焦点行为的组件必须使用可访问的组件原语
- 必须优先使用项目现有的组件原语
- 禁止在同一交互界面混合使用不同的原语系统
- 推荐使用 DaisyUI 组件实现常见 UI 模式
- 仅图标按钮必须添加 `aria-label`
- 除非明确要求，否则不要手动重建键盘或焦点行为
- 模态框和对话框必须使用 `<Teleport>` 渲染到 DOM 层级之外

### 交互
- 破坏性或不可逆的操作必须使用 `AlertDialog` (或 DaisyUI 模态框)
- 加载状态推荐使用骨架屏结构
- 禁止使用 `h-screen`，应使用 `h-dvh`
- 固定元素必须尊重 `safe-area-inset`
- 错误信息必须显示在操作发生的位置附近
- 禁止在 `input` 或 `textarea` 元素中阻止粘贴

### 动画
- 除非明确要求，否则不要添加动画
- 只能动画化合成器属性 (`transform`, `opacity`)
- 禁止动画化布局属性 (`width`, `height`, `top`, `left`, `margin`, `padding`)
- 应避免动画化绘制属性 (`background`, `color`)，小范围 UI (文本、图标) 除外
- 入场动画推荐使用 `ease-out`
- 交互反馈动画绝不能超过 `200ms`
- 循环动画必须在离开屏幕时暂停
- 必须尊重 `prefers-reduced-motion`
- 除非明确要求，否则不要引入自定义缓动曲线
- 应避免动画化大型图片或全屏表面
- 状态动画必须使用 Vue 的 `<Transition>` 和 `<TransitionGroup>` 组件

### 排版
- 标题必须使用 `text-balance`
- 正文段落必须使用 `text-pretty`
- 数据必须使用 `tabular-nums`
- 密集 UI 推荐使用 `truncate` 或 `line-clamp`
- 除非明确要求，否则不要修改 `letter-spacing` (`tracking-`)

### 布局
- 必须使用固定的 `z-index` 层级 (禁止使用任意 `z-x`)
- 正方形元素推荐使用 `size-x` 而不是 `w-x` + `h-x`

### 性能
- 禁止动画化大型 `blur()` 或 `backdrop-filter` 表面
- 禁止在活动动画之外应用 `will-change`

### 设计
- 除非明确要求，否则不要使用渐变
- 禁止使用紫色或多彩色渐变
- 禁止使用发光效果作为主要视觉提示
- 除非明确要求，否则应使用 Tailwind CSS 默认阴影层级
- 空状态必须提供一个明确的下一个操作
- 每个视图应限制使用一种强调色
- 应优先使用现有主题或 Tailwind CSS 颜色令牌，而非引入新颜色
