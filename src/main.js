// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import firebase from './plugins/firebase'
Vue.prototype.$firebase = firebase

Vue.config.productionTip = false

// TO DO: validar se possui token
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       next({ name: 'login' })
//     }
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  template: '<App/>',
  components: { App }
})
