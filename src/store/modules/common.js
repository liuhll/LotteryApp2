import {
    getIdentifyCode1,
    getIdentifyCode2
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
                    reject(reject.error)
                }
            }).catch(error => {
                reject(error);
            })
        });
      }
    }
}

export default commonData;