import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        name: 'appmain',
        redirect: 'plan',
        children: [{
                name: 'plan',
                path: 'plan',
                component: () =>
                    import ('@/views/plan/index'),
                meta: {
                    showtabbar: true,
                    more: {
                        headerTitle: '计划分析'
                    }
                }
            }, {
                path: 'pointmall',
                component: () =>
                    import ('@/views/pointmall/index'),
                meta: {
                    showtabbar: true,
                    more: {
                        headerTitle: '积分商城'
                    }
                }
            }, {
                path: 'me',
                component: () =>
                    import ('@/views/me/index'),
                meta: {
                    showtabbar: true,
                    more: {
                        headerTitle: '我的'
                    }
                }
            },
            {
                path: 'history',
                component: () =>
                    import ('@/views/lottery-history/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: {
                        headerTitle: '历史开奖'
                    }
                }
            },
            {
                name: 'predictdetail',
                path: '/predictdetail/:normId',
                component: () =>
                    import ('@/views/predict-detail/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: {
                        headerTitle: '计划详情'
                    }
                }
            },
            {
                name: 'chiceplan',
                path: 'chiceplan',
                component: () =>
                    import ('@/views/choice-plan/index'),
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
                        },
                        headerTitle: '选择计划'
                    }
                }
            },
            {
                name: 'basicnorm',
                path: 'basicnorm',
                component: () =>
                    import ('@/views/basicnorm/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '默认基础指标' }
                }
            },
            {
                name: 'dataanalyse',
                path: 'dataanalyse',
                component: () =>
                    import ('@/views/data-analyse/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '数据分析' }
                }
            },
            {
                name: 'register',
                path: 'register',
                component: () =>
                    import ('@/views/register/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '用户注册' }
                }
            },
            {
                name: 'retrievePassword',
                path: 'retrievePassword',
                component: () =>
                    import ('@/views/retrieve-password/index'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '找回密码' }
                }
            },
            {
                name: 'confirePwd',
                path: 'confirePwd',
                component: () =>
                    import ('@/views/retrieve-password/confirePwd'),
                meta: {
                    showtabbar: false,
                    showBack: true
                }
            }, {
                name: 'bindprofile',
                path: 'bindprofile/:profileType',
                component: () =>
                    import ('@/views/me/bindProfile'),
                meta: {
                    showtabbar: false,
                    showBack: true
                }
            },
            {
                name: 'resetpwd',
                path: 'resetpwd',
                component: () =>
                    import ('@/views/me/resetPwd'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '重置密码' }
                }
            },
            {
                name: 'opinion',
                path: 'opinion',
                component: () =>
                    import ('@/views/me/opinion'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '意见反馈' }
                }
            },
            {
                name: 'onlinehelp',
                path: 'onlinehelp',
                component: () =>
                    import ('@/views/me/onlinehelp'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '在线帮助' }
                }
            },
            {
                name: 'aboutus',
                path: 'aboutus',
                component: () =>
                    import ('@/views/me/aboutUs'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '关于我们' }
                }
            },
            {
                name: 'customservice',
                path: 'customservice',
                component: () =>
                    import ('@/views/me/customService'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '客服信息' }
                }
            },
            {
                name: 'version',
                path: 'version',
                component: () =>
                    import ('@/views/me/version'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '版本信息' }
                }
            },
            {
                name: 'plannorm',
                path: 'plannorm/:planId',
                component: () =>
                    import ('@/views/basicnorm/plannorm'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '计划指标配置' }
                }
            },
            {
                name: 'authinfo',
                path: 'authinfo',
                component: () =>
                    import ('@/views/me/authinfo'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '我的授权' }
                }
            }, {
                name: 'purchase',
                path: 'purchase',
                component: () =>
                    import ('@/views/auth/goods-list'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '授权列表' }
                }
            }, {
                name: 'orderinfo',
                path: 'orderinfo',
                component: () =>
                    import ('@/views/auth/orderinfo'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '商品信息' }
                }
            }, {
                name: 'pay',
                path: 'pay',
                component: () =>
                    import ('@/views/auth/pay'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '在线支付' }
                }
            },
            {
                name: 'point-auth',
                path: 'point-auth',
                component: () =>
                    import ('@/views/pointmall/point-auth'),
                meta: {
                    showtabbar: false,
                    showBack: true,
                    more: { headerTitle: '积分兑换授权' }
                }
            }
        ]
    },

];

export default new Router({
    routes: constantRouterMap
})