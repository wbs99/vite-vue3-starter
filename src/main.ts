import '@svgstore'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
