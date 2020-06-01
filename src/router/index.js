import Vue from 'vue'
import Router from 'vue-router'
import Maps from '@/components/maps/Maps'
import Sponsors from '@/components/sponsors/Sponsors'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'maps',
      component: Maps
    },
    {
      path: '/patrocinadores',
      name: 'sponsors',
      component: Sponsors
    }
  ]
})
