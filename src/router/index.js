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
        component: () => import('@/views/plan/index'),
        meta: {
          showtabbar: true
        }
    }, {
        path: 'pointmall',
        component: () => import('@/views/pointmall/index'),
        meta: {
          showtabbar: true
        }
    }, {      
        path: 'me',
        component: () => import('@/views/me/index'),
        meta: {
          showtabbar: true
        }
      },
      {
        path: 'history',
        component: () => import('@/views/lottery-history/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      }
    ] 
  }
];

export default new Router({
  routes: constantRouterMap
})
