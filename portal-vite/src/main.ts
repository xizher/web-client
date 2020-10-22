import { createApp } from 'vue'
import App from './App.vue'
import '@xizher/js-extension'
import './assets/overload.scss'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
