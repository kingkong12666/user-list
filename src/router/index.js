import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/components/Authorization'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
