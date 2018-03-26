import {
    getIdentifyCode1,
    getIdentifyCode2,
    bindProfile
  } from '@/api/common'

const commonData = {
    actions: {
      GetIdentifyCode1({ commit }, account) {
        return new Promise((resolve, reject) => {
            getIdentifyCode1(account).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data);
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error);
            })
        });
      },
      GetIdentifyCode2({ commit }, account) {
        return new Promise((resolve, reject) => {
            getIdentifyCode2(account).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data);
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error);
            })
        });
      },
      BindProfile({ commit }, bindInfo) {
        return new Promise((resolve, reject) => {
           bindProfile(bindInfo).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data);
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error);
            })
        }); 
      }
    }
}

export default commonData;