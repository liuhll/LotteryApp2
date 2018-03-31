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
      },
      {
        name: 'predictdetail',
        path: '/predictdetail/:normId',
        component: () => import('@/views/predict-detail/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'chiceplan',
        path: 'chiceplan',
        component: () => import('@/views/choice-plan/index'),
        meta: {
          showtabbar: false,
          showBack: true,
          more: {
            show: true,
            type: 'img',
            imgUrl: require('@/assets/images/submit.svg'),
            context: '提交',
            event: {
              func: 'submitPlans'
            }
          }
        }
      },
      {
        name: 'basicnorm',
        path: 'basicnorm',
        component: () => import('@/views/basicnorm/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      }, 
      {
        name: 'dataanalyse',
        path: 'dataanalyse',
        component: () => import('@/views/data-analyse/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('@/views/register/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'retrievePassword',
        path: 'retrievePassword',
        component: () => import('@/views/retrieve-password/index'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'confirePwd',
        path: 'confirePwd',
        component: () => import('@/views/retrieve-password/confirePwd'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      }, {
        name: 'bindprofile',
        path: 'bindprofile/:profileType',
        component: () => import('@/views/me/bindProfile'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'resetpwd',
        path: 'resetpwd',
        component: () => import('@/views/me/resetPwd'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'opinion',
        path: 'opinion',
        component: () => import('@/views/me/opinion'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'onlinehelp',
        path: 'onlinehelp',
        component: () => import('@/views/me/onlinehelp'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'aboutus',
        path: 'aboutus',
        component: () => import('@/views/me/aboutUs'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      },
      {
        name: 'customservice',
        path: 'customservice',
        component: () => import('@/views/me/customService'),
        meta: {
          showtabbar: false,
          showBack: true
        }
      }
    ]
  },

];

export default new Router({
  routes: constantRouterMap
})
