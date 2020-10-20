import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading (state, step: boolean) {
      state.loading = step
    }
  },
  actions: {
    setLoading (context, step: boolean) {
      context.commit('setLoading', step)
    }
  },
  modules: {
  }
})
