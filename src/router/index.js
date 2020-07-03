import Vue from 'vue'
import Router from 'vue-router'

const AppLayout = () => import('@/components/layout/AppLayout')
const Maps = () => import('@/components/maps/Maps')
const Sponsors = () => import('@/components/sponsors/Sponsors')
const Login = () => import('@/components/login/Login')

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
