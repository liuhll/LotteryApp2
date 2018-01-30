import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { 
    path: '/', 
    component: Layout,
    name: 'plan',
    redirect: 'plan',
    children: [{
      path: 'plan'
    }] 
  }
];

export default new Router({
  routes: constantRouterMap
})
