import { loginByUsername } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'

const user = {
    state: {
      user: '',
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
        }  
    },
    actions: {
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password, userInfo.systemType).then(response => {
                    const data = response.result;
                    commit('SET_TOKEN', data);
                    setToken(data);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
}

export default user;