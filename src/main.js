// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import firebase from './plugins/firebase'
import store from './store'
Vue.prototype.$firebase = firebase

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = store.getters.user.token
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  template: '<App/>',
  store,
  components: { App }
})
