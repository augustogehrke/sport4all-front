import Vue from 'vue'
import Router from 'vue-router'
import Maps from '@/components/maps/Maps'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Maps',
      component: Maps
    }
  ]
})
