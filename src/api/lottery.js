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