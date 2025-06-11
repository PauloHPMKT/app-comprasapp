import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './routes'
import './style.css'
import { makeAuthService } from './services/main/auth'

const authLoginService = makeAuthService()

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.provide('authLoginService', authLoginService)
app.mount('#app')
