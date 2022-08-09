import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

console.log('env', import.meta.env)
createApp(App).use(pinia).use(router).mount('#app')
