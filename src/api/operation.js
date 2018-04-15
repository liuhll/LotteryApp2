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