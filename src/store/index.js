import Vue from 'vue'
import Vuex from 'vuex'
import { SERVER_API } from '../config/api.conf'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverApi: SERVER_API
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
