import request from '@/utils/request';


export function getIdentifyCode1(account) {
    return request({
        url: '/v1/message/identifycode1',
        method: 'GET',
        params: account
    });
}

export function getIdentifyCode2(account) {
    return request({
        url: '/v1/message/identifycode2',
        method: 'GET',
        params: account
    });
}

export function verifyIdentifycode(identifyCodeInfo) {
    return request({
        url: '/v1/message/identifycode',
        method: 'POST',
        data: identifyCodeInfo
    });
}

export function bindProfile(bindInfo) {
    return request({
        url: '/account/userprofie',
        method: 'PUT',
        data: bindInfo
    });
}

export function retrievePassword(pwdInfo) {
    return request({
        url: '/account/retrievepassword',
        method: 'PUT',
        data: pwdInfo
    });
}

export function resetPassword(pwdInfo) {
    return request({
        url: '/account/password',
        method: 'PUT',
        data: pwdInfo
    });
}

export function addOpinion(opinion) {
    return request({
        url: '/v1/operation/opinion',
        method: 'POST',
        data: opinion
    });
}

export function onlineHelp(lotteryCode) {
    return request({
        url: '/v1/operation/onlinehelps',
        method: 'GET',
        params: lotteryCode
    });
}

export function getAppInfo(platform) {
    return request({
        url: '/v1/operation/appinfo',
        method: 'GET',
        params: platform
    })
}

export function getCustomService() {
    return request({
        url: '/v1/operation/customservice',
        method: 'GET'
    })
}