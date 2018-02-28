import { getFinallotterydata, getPredictDatas, getHistory } from '@/api/lottery'

const lotteryData = {
   state: {
     finalLotteryData: { },
     historyData: { }
   },
   mutations: {
       SET_FINALLOTTERYDATA: (state, finalLotteryData) => {
           state.finalLotteryData = finalLotteryData;
       }
   },
   actions: {
       GetFinallotterydata({ commit }) {
           return new Promise((resolve, reject) => {              
              getFinallotterydata().then(response => {
                 if (response.success) {
                    const data = response.result;
                    if (data.isLotteryData) {
                        commit('SET_FINALLOTTERYDATA', response.result)
                    }                   
                    resolve(response.result);
                 } else {
                    reject(response.error);
                 }
              }).catch(error => {
                  reject(error);
              });
           });
       },
       GetPredictDatas() {
        return new Promise((resolve, reject) => {
            getPredictDatas().then(response => {
                if (response.success) {
                   const data = response.result;
                   resolve(data);
                } else {
                    reject(response.error);
                }
            });
        });
       },
       GetHistory({ }, histroyParams) {
          return new Promise((resolve, reject) => {
              getHistory(histroyParams.pageIndex, histroyParams.lotteryTime).then(response => {
                  if (response.success) {
                    const data = response.result;
                    resolve(data);
                  } else {
                    reject(response.error);
                  }
              })
          });
       }
   }
}


export default lotteryData;