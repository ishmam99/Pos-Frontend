import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import api from './config/api.js'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

window.api = api
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueToast, { position: 'top-right' })
app.mount('#app')
