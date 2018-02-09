import { getFinallotterydata } from '@/api/lottery'

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
       }
   }
}


export default lotteryData;