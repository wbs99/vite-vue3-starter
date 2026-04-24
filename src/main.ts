import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { directive } from './utils/directive'
import 'virtual:svg-icons-register'
import './assets/stylesheets/app.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
directive(app)
app.mount('#app')
