import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      svgstore(),
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
    ],
    server: {
      open: false, // 自动打开浏览器
      host: true,
      // proxy: {
      //   '/api/v1': {
      //     target: 'http://121.196.236.94:3000/',
      //     changeOrigin: true,
      //   }
      // }
    },
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
})
