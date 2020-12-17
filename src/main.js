import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/styles/layout/layout.scss'
import './assets/styles/overwrite/overwrite.scss'
import { loadArcGISJsApiModules } from './map'

loadArcGISJsApiModules().then(() => {
  createApp(App)
    .use(Antd)
    .mount('#app')
})
