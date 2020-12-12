import { createApp } from 'vue'
import App from './App'
import router from './router'
import { WebMap, loadArcGISJsApiModules } from './map'
import { setWebMap } from './hooks/useMap'

loadArcGISJsApiModules().then(appInit)

function appInit() {
  const webMap = new WebMap()
  setWebMap(webMap)
  createApp(App)
    .use(router)
    .mount('#app')

}
