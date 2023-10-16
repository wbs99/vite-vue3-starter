import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
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
      Unocss(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        dirs: [
          './composables/**',
        ],
        dts: 'src/types/auto-import.d.ts',
        vueTemplate: true,
      })
    ],
    server: {
      host: true,
      proxy: {
        '/api/v1': {
          target: 'http://121.196.236.94:3000/',
          changeOrigin: true,
        }
      }
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
  }
})
