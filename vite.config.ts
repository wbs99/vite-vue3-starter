import path from 'node:path'
import process from 'node:process'
import vueLegacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/

export default async ({ mode, command }) => {
  return {
    base: mode === 'production' ? '/zhengwu/' : '/',
    // https://cn.vitejs.dev/config/server-options#server-proxy
    server: {
      open: false,
      host: true,
      port: 5555,
      proxy: {
        '^/api/.*': {
          target: 'http://118.31.32.176:3000',
          changeOrigin: command === 'serve',
          // rewrite: path => path.replace(/^\/api/, ''),
        },
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock',
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        dirs: [
          './composables/**',
        ],
        dts: './src/types/auto-import.d.ts',
        vueTemplate: true,
      }),
      Components({
        dirs: ['src/components'],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        dts: '/src/types/components.d.ts',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: '[name]',
      }),
      vueLegacy({
        renderLegacyChunks: false, // 如果设置为 true ，将会为每个文件单独生成一个兼容浏览器的文件
        modernPolyfills: true,
        polyfills: [
        // ES6+ 基础补丁
          'es.symbol',
          'es.promise',
          'es.promise.finally',
          'es.promise.all-settled',
          'es/map',
          'es/set',
          'es.string.includes',
          'es.array.at',
          'es.array.filter',
          'es.array.find-last',
          'es.array.iterator',
          'es.array.includes',
          'es.object.assign',
          'es.object.entries',
          'es.object.values',
          'es.object.keys',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.to-string',
          'web.dom-collections.for-each',
          // ES2020+ 核心 Polyfill
          'esnext.global-this', // 空值合并(??)和可选链(？.)
          'esnext.string.match-all',
          'esnext.aggregate-error',
          'esnext.promise.all-settled',
        ],
        additionalLegacyPolyfills: [
          'regenerator-runtime/runtime', // 异步语法支持
        ],
        targets: ['chrome >= 75'], // 明确兼容 Chrome 75
      }),
    ],

    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('mock') || id.includes('faker')) {
              return 'mock'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    esbuild: {
      // 打包时移除 console.log
      pure: ['console.log'],
      // 打包时移除 debugger
      drop: ['debugger'],
      // 打包时移除所有注释
      legalComments: 'none'
    },
  }
}
