import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '@/components/layout/AppLayout'
import Maps from '@/components/maps/Maps'
import Sponsors from '@/components/sponsors/Sponsors'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '',
      component: AppLayout,
      children: [
        {
          path: '/',
          default: true,
          name: 'maps',
          component: Maps,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'patrocinadores',
          name: 'sponsors',
          component: Sponsors,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
