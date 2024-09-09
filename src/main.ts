import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ConfigProvider } from 'vant'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/stylesheets/nprogress.scss'
import './assets/stylesheets/reset.scss'
import './assets/stylesheets/tailwind.scss'
import './assets/stylesheets/vars.scss'
import { router } from './router/router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
app.use(ConfigProvider)
app.mount('#app')
