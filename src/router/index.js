import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import RegisterIndex from '@/components/register/index'
import LoginIndex from '@/components/login/index'
import UserDetail from '@/components/user/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register/index',
      name: 'registerIndex',
      component: RegisterIndex
    },
    {
      path: '/login/index',
      name: 'loginIndex',
      component: LoginIndex
    },
    {
      path: '/user/detail',
      name: 'userDetail',
      component: UserDetail
    }
  ]
})
