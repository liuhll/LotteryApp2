import {
    getFinallotterydata,
    getPredictDatas, 
    updatePredictDatas,
    getHistory,
    getPredictDetailDatas, 
    getPredictDetailData,
    getUserPlans,
    updateUserPlans,
    getUserNromDefaultConfig,
    updateUserNromDefaultConfig,
    getLotteryList,
    getNormPlanConfig,
    getUserPlanNorm,
    updateUserNromConfig,
    updatePredictData
    } from '@/api/lottery'

const lotteryData = {
   state: {
     finalLotteryData: { },
     historyData: { },
     selectPlans: { }
   },
   mutations: {
       SET_FINALLOTTERYDATA: (state, finalLotteryData) => {
           state.finalLotteryData = finalLotteryData;
       },
       SET_SELECT_PLANS: (state, selectPlans) => {
           state.selectPlans = selectPlans;
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
       UpdatePredictDatas() {
        return new Promise((resolve, reject) => {
            updatePredictDatas().then(response => {
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
       },
       GetPredictDetailDatas() {
        return new Promise((resolve, reject) => {
            getPredictDetailDatas().then(response => {
                if (response.success) {
                   const data = response.result;
                   resolve(data);
                } else {
                    reject(response.error);
                }
            });
        });  
       },
       GetPredictDetailData({ },normId) {
        return new Promise((resolve, reject) => {
            getPredictDetailData(normId).then(response => {
            
                if (response.success) {
                   const data = response.result;
                   resolve(data);
                } else {
                    reject(response.error);
                }
            });
        }); 
       },      
       GetUserPlans({ commit }) {
           return new Promise((resolve, reject) => {
              getUserPlans().then(response => {
                  if (response.success) {
                      const data = response.result;
                      const selectPlans = data.userSelectedPlanInfos;
                      commit('SET_SELECT_PLANS', selectPlans);
                      resolve(data)
                  } else {
                      reject(response.error)
                  }
              })
           });
       },
       UpdateUserPlans({ }, planIds) {
          return new Promise((resolve, reject) => {
            updateUserPlans(planIds).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
              })
           });
       },
       GetUserNromDefaultConfig() {
        return new Promise((resolve, reject) => {
            getUserNromDefaultConfig().then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
              })
           }); 
       },
       UpdateUserNromDefaultConfig({ }, basicNorm) {
        return new Promise((resolve, reject) => {
            updateUserNromDefaultConfig(basicNorm).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
              })
           }); 
       },
       GetLotteryList({ }) {
           return new Promise((resolve, reject) => {
            getLotteryList().then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error)
            })
           })
       },
       GetNormPlanConfig({ }, planId) {
          return new Promise((resolve, reject) => {
            getNormPlanConfig(planId).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error)
            })
          })
       },
       GetUserPlanNorm({ }, planId) {
        return new Promise((resolve, reject) => {
            getUserPlanNorm(planId).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error)
            })
          })
       },
       UpdateUserNromConfig({ }, userPlanNorm) {
        return new Promise((resolve, reject) => {
            updateUserNromConfig(userPlanNorm).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error)
            })
          })
       },
       UpdatePredictData({ }, normId) {
        return new Promise((resolve, reject) => {
            updatePredictData(normId).then(response => {
                if (response.success) {
                    const data = response.result;
                    resolve(data)
                } else {
                    reject(response.error)
                }
            }).catch(error => {
                reject(error)
            })
          })
       }
   }
}


export default lotteryData;