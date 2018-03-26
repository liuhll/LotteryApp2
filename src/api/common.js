import request from '@/utils/request';


export function getIdentifyCode1 (account) {
    return request({
        url: '/v1/message/identifycode1',
        method: 'GET',
        params: account
    });
}

export function getIdentifyCode2 (account) {
    return request({
        url: '/v1/message/identifycode2',
        method: 'GET',
        params: account
    });
}

export function bindProfile(bindInfo) {
    return request({
        url: '/account/userprofie',
        method: 'PUT',
        data: bindInfo
    });
}