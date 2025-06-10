import path from 'node:path'
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/

export default async ({ command }) => {
  return {
    // base: mode === 'production' ? './' : '/',
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
      tailwindcss(),
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
