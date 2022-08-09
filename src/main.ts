import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

if (import.meta.env.MODE !== 'test') {
  // we don't want to use transitions for testing in cypress
  import('./css/vue-transitions.css')
}

console.log('env', import.meta.env)
createApp(App).use(pinia).use(router).mount('#app')
