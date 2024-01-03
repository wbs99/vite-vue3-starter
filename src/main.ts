import '@svgstore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/stylesheets/nprogress.scss'
import './assets/stylesheets/reset.scss'
import './assets/stylesheets/tailwind.scss'
import './assets/stylesheets/vars.scss'
import { router } from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
