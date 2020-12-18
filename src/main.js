import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/styles/layout/layout.scss'
import './assets/styles/module/module.scss'
import './assets/styles/overwrite/overwrite.scss'
import { loadEsriModules, loadEsriExt } from './map/esri'

loadEsriModules().then(() => {
  loadEsriExt()
  createApp(App)
    .use(Antd)
    .mount('#app')
})
