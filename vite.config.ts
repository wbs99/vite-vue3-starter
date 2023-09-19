import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import Unocss from 'unocss/vite'
import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      svgstore(),
      viteMockServe({
        mockPath: 'src/mock',
      }),
      Unocss(),
    ],
    // server: {
    //   proxy: {
    //     '/api/v1': {
    //       target: 'http://121.196.236.94:3000/',
    //     }
    //   }
    // }
  }
})
