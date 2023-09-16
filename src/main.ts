import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import Icon from './components/Icon.vue'
import '@svgstore'
import 'virtual:uno.css'

const pinia = createPinia()
const app = createApp(App)
app.component('Icon', Icon)
app.use(router)
app.use(pinia)
app.mount('#app')
