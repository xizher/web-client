import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/layout/layout.min.css'
import './assets/styles/overwrite/overwrite.min.css'
import { loadArcGISJsApiModules } from './map'

loadArcGISJsApiModules().then(() => {
  createApp(App)
    .mount('#app')
})
