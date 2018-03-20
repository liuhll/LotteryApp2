import { 
    loginByUsername,
    getUserInfo,
    logout,
    register
} from '@/api/login'
import { 
    getToken,
    setToken,
    removeToken
 } from '@/utils/auth'

const user = {
    state: {
      userInfo: null,
      lotteryInfo: null,
      status: '',
      token: getToken()
    },
    mutations: {
      SET_TOKEN: (state, token) => {
          state.token = token
        },
      SET_STATUS: (state, status) => {
          state.status = status
        },
      SET_NAME: (state, name) => {
          state.name = name
        },
      SET_USERINFO: (state, userInfo) => {
          state.userInfo = userInfo
      },
      SET_LOTTERYINFO: (state, lotteryInfo) => {
          state.lotteryInfo = lotteryInfo
      }  
    },
    actions: {
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {               
                loginByUsername(username, userInfo.password, userInfo.isForce, userInfo.systemType).then(response => {
                    const data = response;
                    if (data.success) {
                        commit('SET_TOKEN', data.result);
                        setToken(data.result);
                        resolve();
                    } else {
                        reject(data.error);
                    }                 
                }).catch(error => {
                    reject(error);
                });
            });
        },

        GetUserInfo({ commit, state }) {
           return new Promise((resolve, reject) => {
              getUserInfo(state.token).then(response => {
                 if (response.success) {
                    commit('SET_USERINFO', response.result)
                    commit('SET_LOTTERYINFO', response.result.lotteryInfo) 
                    resolve(response);
                 } else {
                    reject(response.error);
                 }
              }).catch(error => {
                  reject(error);
              });
           });
        },
        Logout({ commit }) {
          return new Promise((resolve, reject) => {
             logout().then(response => {
                const data = response;
                if (data.success) {
                    commit('SET_TOKEN', null);
                    removeToken();
                    resolve(data.result);
                }
             }).catch(error => {
                 reject(error)
             });
          });
        },
        Register({ }, userInfo) {
            
            return new Promise((resolve, reject) => {
                register(userInfo).then(response => {
                    const data = response;
                    if (data.success) {
                      resolve(data.result);
                    } else {
                        reject(data.error)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user;