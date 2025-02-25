import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import vuetify from './config/vuetify.conf'
import '@xizher/js-extension'
import './namespace'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
