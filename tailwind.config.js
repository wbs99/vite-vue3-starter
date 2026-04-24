/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#5c33be',
      },

      // ===========================
      // 🔥 1. 宽度、高度、间距（w/h/m/p/gap）
      // ===========================
      spacing: Array.from({ length: 2000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 2. 字体大小 text-28
      // ===========================
      fontSize: Array.from({ length: 2000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 3. 圆角 rounded-410
      // ===========================
      borderRadius: Array.from({ length: 2000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 4. 边框宽度 border-2
      // ===========================
      borderWidth: Array.from({ length: 20 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 5. 行高 leading-44
      // ===========================
      lineHeight: Array.from({ length: 2000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 6. 定位 top/left/right/bottom inset-20
      // ===========================
      inset: Array.from({ length: 1000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),

      // ===========================
      // 🔥 7. 宽高约束
      // ===========================
      minHeight: Array.from({ length: 1000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),
      minWidth: Array.from({ length: 1000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),
      maxHeight: Array.from({ length: 1000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),
      maxWidth: Array.from({ length: 1000 }).reduce((map, _, i) => {
        map[i] = `${i}px`
        return map
      }, {}),
    },

    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    },
  ],
}
