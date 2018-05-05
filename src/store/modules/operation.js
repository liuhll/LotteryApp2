import {
    getSignedInfo,
    signed,
    signedlist,
    userAuth,
    goodsList,
    order,
    pay,
    pointPay,
    getOrder

} from '@/api/operation'

import Cookies from 'js-cookie'

const orderNoKey = "OderNo"

const operationData = {
    state: {
        orderNo: Cookies.get(orderNoKey)
    },
    mutations: {
        SET_ORDERNO: (state, orderNo) => {
            state.orderNo = orderNo
        }
    },
    actions: {
        GetSignedInfo({}) {
            return new Promise((resolve, reject) => {
                getSignedInfo().then(response => {
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
        Signed({}) {
            return new Promise((resolve, reject) => {
                signed().then(response => {
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
        GetSignedList({}) {
            return new Promise((resolve, reject) => {
                signedlist().then(response => {
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
        GetUserAuth({}) {
            return new Promise((resolve, reject) => {
                userAuth().then(response => {
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
        GetGoodsList({}, sellType) {
            return new Promise((resolve, reject) => {
                goodsList(sellType).then(response => {
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
        Order({ commit }, goodsInfo) {
            return new Promise((resolve, reject) => {
                order(goodsInfo).then(response => {
                    if (response.success) {
                        const data = response.result;
                        commit('SET_ORDERNO', data.orderNo)
                        Cookies.set(orderNoKey, data.orderNo)
                        resolve(data);
                    } else {
                        reject(response.error)
                    }
                }).catch(error => {
                    reject(error);
                })
            });
        },
        Pay({}, payinfo) {
            return new Promise((resolve, reject) => {
                pay(payinfo).then(response => {
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
        PointPay({}, payinfo) {
            return new Promise((resolve, reject) => {
                pointPay(payinfo).then(response => {
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
        GetOrder({ commit }, orderNo) {
            return new Promise((resolve, reject) => {
                commit('SET_ORDERNO', orderNo)
                Cookies.set(orderNoKey, orderNo)
                getOrder(orderNo).then(response => {
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

export default operationData