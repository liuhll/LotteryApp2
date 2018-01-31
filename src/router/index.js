import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { 
    path: '/', 
    component: Layout,
    name: 'appmain',
    redirect: 'plan',
    children: [{
        path: 'plan',
        component: () => import('@/views/plan/index')
    }, {
        path: 'pointmall',
        component: () => import('@/views/pointmall/index')
    }, {      
        path: 'me',
        component: () => import('@/views/me/index')
      }
    ] 
  }
];

export default new Router({
  routes: constantRouterMap
})
