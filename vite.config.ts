import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define: command === 'build' ? { DEBUG: false } : { DEBUG: true },
    plugins: [vue(), svgstore()],
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://121.196.236.94:3000/',
        }
      }
    }
  }
})
