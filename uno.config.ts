import {
  defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {},
  shortcuts: {
    'p-btn': 'h-48px w-100% bg-#5C33BE b-none text-white text-18px rounded-8px px-12px flex justify-center items-center',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ]
})
