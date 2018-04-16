import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import index2 from '@/components/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index2',
      name: 'index2',
      component: index2
    }
  ]
})
