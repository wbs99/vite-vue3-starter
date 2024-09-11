import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ConfigProvider } from 'vant'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { directive } from './utils/directive'
import 'virtual:svg-icons-register'
import './assets/stylesheets/nprogress.scss'
import './assets/stylesheets/reset.scss'
import './assets/stylesheets/tailwind.scss'
import './assets/stylesheets/vars.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
app.use(ConfigProvider)
directive(app)
app.mount('#app')
