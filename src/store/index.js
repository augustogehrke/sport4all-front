import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  getters,
  plugins: [createPersistedState({
    paths: ['user']
  })]
})
