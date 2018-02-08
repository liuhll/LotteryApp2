import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'
import { debug } from 'util';

const user = {
    state: {
      userInfo: null,
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
      }  
    },
    actions: {
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {               
                loginByUsername(username, userInfo.password, userInfo.systemType).then(response => {
                    const data = response.data;
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
                 const data = response.data;
                 debugger;
                 if (data.success) {
                    commit('SET_USERINFO', data.result) 
                    resolve(data);
                 } else {
                    reject(data.error);
                 }
              }).catch(error => {
                  reject(error);
              });
           });
        }
    }
}

export default user;