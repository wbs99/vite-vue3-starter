export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 750,
      viewportHeight: 1624,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 2,
      mediaQuery: false,
      exclude: [/node_modules/, /safe-area\.css$/],
    },
  },
}
