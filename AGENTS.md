# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 web application starter template built with Vite. It provides a modern foundation for developing SPA (Single Page Application) with rich features including routing, state management, data fetching, and UI components.

## Tech Stack

- **Frontend Framework**: Vue 3.5.17
- **Build Tool**: Vite 6.0.3
- **Routing**: Vue Router 4.5.1
- **State Management**: Pinia 3.0.3 + pinia-plugin-persistedstate 4.3.0
- **Data Fetching**: @tanstack/vue-query 5.81.5 + Axios 1.10.0
- **Styling**: Tailwind CSS 3.4.16 + DaisyUI 4 + Sass 1.89.2
- **Type Checking**: TypeScript 5.8.3
- **Code Linting**: ESLint 9.12.0 with @antfu/eslint-config
- **Package Manager**: pnpm 9.6.0 (required)
- **Auto Import**: unplugin-auto-import 19.3.0 + unplugin-vue-components 28.8.0
- **Icon System**: @iconify/vue 5.0.0 + vite-plugin-svg-icons
- **Mock Data**: vite-plugin-mock 3.0.1
- **Browser Compatibility**: @vitejs/plugin-legacy (Chrome 75+)

## Development Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                    # Start dev server (default port: 5555)
pnpm build                  # Build for production
pnpm preview                # Preview production build locally

# Code Quality
pnpm lint                   # Run ESLint and auto-fix
```

## Architecture

### Project Structure
- `src/main.ts` - Application entry point
- `src/App.vue` - Root component
- `src/router/router.ts` - Vue Router configuration
- `src/stores/` - Pinia state management stores
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/api/` - API interface definitions
- `src/mock/` - Mock data for development
- `src/utils/` - Utility functions
- `src/hooks/` - Custom Composition API hooks
- `src/assets/` - Static assets (icons, styles, etc.)
- `src/types/` - TypeScript type definitions
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Routing System
- Uses Vue Router for client-side routing
- Route definitions in `src/router/router.ts`
- Authentication guard with white list for public routes
- Route meta information for permission control
- Automatic route-based code splitting

### State Management
- Pinia for global state management
- Stores located in `src/stores/`
- Persistent state via pinia-plugin-persistedstate
- TypeScript-first store definitions

### Data Flow
1. Components fetch data via Vue Query hooks or Pinia stores
2. API requests defined in `src/api/`
3. Mock data available in `src/mock/` for development
4. Response types defined in `src/types/`

### Auto Import System
- Vue 3 composition API auto-imported (ref, reactive, computed, etc.)
- Vue Router and Pinia auto-imported
- Components in `src/components/` auto-imported
- Type definitions in `src/types/auto-import.d.ts` and `src/types/components.d.ts`

### Icon System
Two ways to use icons:

**Method 1: Iconify (Recommended)**
- Visit https://yesicon.app/ to find icons
- Copy the icon name (e.g., `line-md:arrow-left`)
- Use in component:
```vue
<template>
  <SvgIcon name="line-md:arrow-left" />
</template>
```

**Method 2: Custom SVG Icons**
- Add SVG files to `src/assets/icons/`
- Use filename as icon name:
```vue
<template>
  <SvgIcon name="loading" />
</template>
```

## Code Style

### TypeScript
- TypeScript strict mode enabled
- Avoid using `any` — prefer explicit or generic types
- Use composition API over options API
- Use **single quotes** and **no semicolons**
- Component order: `template` → `script` → `style`

### Tailwind CSS + DaisyUI

**Class Attribute Ordering:**
When writing Tailwind classes, follow this order for consistency:
1. **Layout classes**: `flex`, `grid`, `justify-*`, `items-*`, `flex-wrap`, `flex-1`, `flex-grow`, etc.
2. **Spacing classes**: `m*`, `p*`, `mx*`, `my*`, `mb*`, `mt*`, `gap-*`, etc.
3. **Size classes**: `w*`, `h*`, `min-w*`, `max-h*`, etc.
4. **Other styles**: `rounded*`, `shadow*`, `border*`, `transition-*`, `transform-*`, etc.
5. **Color classes (last)**: `bg-*`, `text-*`, `border-*`, `from-*`, `to-*`, `via-*`, `decoration-*`, etc.

**Example:**
```vue
<!-- Good: Layout → Spacing → Size → Other → Colors -->
<view class="flex justify-center p-6 mx-4 mt-6 text-gray-800 bg-white rounded-lg shadow-md">
```

**DaisyUI Components:**
- Use DaisyUI component classes for consistent styling
- Combine with Tailwind utilities for customization
- Refer to DaisyUI documentation: https://daisyui.com/

**HTML Comments:**
- Remove all unnecessary HTML comments (e.g., `<!-- Page Title -->`, `<!-- Button Group -->`)
- Only keep essential comments for complex business logic explanations
- Keep code clean and self-documenting

**Styling Best Practices:**
- Prefer Tailwind utility classes over custom CSS
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Use state variants: `hover:`, `active:`, `focus:`
- For complex component styles, use `<style lang="scss" scoped>`
- Leverage DaisyUI components for common UI patterns

### General Guidelines
- Keep code clean, modular, and maintainable
- Follow existing ESLint/Prettier rules
- Use auto-imported components and hooks when available
- Prefer functional patterns and composition over classes
- Use meaningful variable and function names
- Write self-documenting code

## Development Notes

- Package manager: **pnpm** (required)
- Source code: located in `src/`
- Current version: 0.0.0
- Dev server runs on port 5555
- Production base path: `/zhengwu/` (configurable in vite.config.ts)
- Mock data automatically available in development mode
- SVG icons are optimized and bundled via vite-plugin-svg-icons
- Legacy browser support for Chrome 75+ via @vitejs/plugin-legacy

## Build Configuration

- Console.log statements removed in production builds
- Debugger statements removed in production builds
- Code comments removed in production builds
- Manual chunks for vendor libraries (echarts, mock, vendor)
- Tree-shaking and minification enabled
- TypeScript type checking before build (`vue-tsc --noEmit`)

## Important Notes

- This is a standard Vue 3 + Vite web project, not a uni-app project
- Routing is handled by Vue Router, configured in `src/router/router.ts`
- Component and composition API auto-import is configured in vite.config.ts
- Mock API responses are available in development mode via vite-plugin-mock
- The project uses DaisyUI for UI components, which extends Tailwind CSS
- Always test in different browsers, especially older browsers (Chrome 75+)
- Use Vue Query for server state management and caching
- Use Pinia for global client state management
