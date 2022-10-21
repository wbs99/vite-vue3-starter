import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { createPinia } from 'pinia'
import Icon from "./components/Icon.vue";
import '@svgstore';


const pinia = createPinia()
const app = createApp(App)
app.component("Icon", Icon);
app.use(router)
app.use(pinia)
app.mount('#app')
