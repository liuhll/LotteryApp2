import request from '@/utils/request';

export function getFinallotterydata() {
    return request({
        url: '/v1/lottery/finallotterydata',
        method: 'GET'
    });
}

export function getPredictdetailDatas() {
    return request({
        url: '/v1/lottery/predictdetaildatas',
        method: 'GET'
    });
}

export function getPredictDatas() {
    return request({
        url: '/v1/lottery/predictdatas',
        method: 'GET'
    });
}
export function updatePredictDatas() {
    return request({
        url: '/v1/lottery/predictdatas',
        method: 'PUT'
    });
}

export function getHistory(pageIndex, lotteryTime) {
    const data = {
        pageIndex,
        lotteryTime
    };
    return request({
      url: '/v1/lottery/history',
      method: 'GET',
      params: data
    });
}

export function getPredictDetailDatas() {
    return request({
        url: '/v1/lottery/predictdetaildatas',
        method: 'GET'
    });
}

export function getPredictDetailData(normId) {
    return request({
        url: '/v1/lottery/predictdetaildata',
        method: 'GET',
        params: { normId }
    });
}

export function getUserPlans() {
    return request({
        url: '/v1/plan/userplans',
        method: 'GET'
    });
}

export function updateUserPlans(selectPlans) {
    return request({
        url: '/v1/plan/userplans',
        method: 'PUT',
        data: { planIds: selectPlans }
    });
}

export function getUserNromDefaultConfig() {
    return request({
        url: '/v1/norm/usernormdefaultconfig',
        method: 'GET'
    })
}

export function updateUserNromDefaultConfig(basicNorm) {
    return request({
        url: '/v1/norm/usernormdefaultconfig',
        method: 'PUT',
        data: basicNorm
    })
}

export function getLotteryList() {
    return request({
        url: '/v1/lottery/list',
        method: 'GET'
    })
}

export function getNormPlanConfig() {
    return request({
        url: '/v1/norm/normplanconfig',
        method: 'GET'
    })
}