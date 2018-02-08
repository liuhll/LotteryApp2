import { getToken } from '@/utils/auth' // getToken from cookie
import router from './router'
import store from './store'

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            debugger
            if (store.getters.userInfo === null) {
                store.dispatch('GetUserInfo');
            }
            next()
        }
    } else {
         /* has no token */
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
 });
