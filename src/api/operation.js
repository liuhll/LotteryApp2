import request from '@/utils/request';

export function getSignedInfo() {
    return request({
        url: '/v1/operation/signedinfo',
        method: 'GET'
    });
}

export function signed() {
    return request({
        url: '/v1/operation/signed',
        method: 'POST'
    });
}

export function signedlist() {
    return request({
        url: '/v1/operation/signedlist',
        method: 'GET'
    });
}

export function userAuth() {
    return request({
        url: '/v1/sell/userauth',
        method: 'GET'
    });
}

export function goodsList(sellType) {
    return request({
        url: '/v1/sell/goodslist',
        method: 'GET',
        params: sellType
    });
}

export function order(goodsInfo) {
    return request({
        url: '/v1/sell/order',
        method: 'POST',
        data: goodsInfo
    });
}

export function getOrder(orderNo) {
    return request({
        url: '/v1/sell/order',
        method: 'GET',
        params: { orderNo }
    });
}

export function pay(payinfo) {
    return request({
        url: '/v1/sell/pay',
        method: 'POST',
        data: payinfo
    });
}

export function pointPay(payinfo) {
    return request({
        url: '/v1/sell/pointpay',
        method: 'POST',
        data: payinfo
    });
}

export function wechatConfig() {
    return request({
        url: '/v1/operation/wechatconfig',
        method: 'GET'
    });
}