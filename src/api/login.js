import request from '@/utils/request';

export function loginByUsername(userName, password, isForce, systemType) {
    const data = {
        userName,
        password,
        isForce,
        systemType
      };
    return request({
      url: '/account/login',
      method: 'POST',
      data
    });
}

export function getUserInfo (token) {
  return request({
      url: '/v1/user/me',
      method: 'GET',
      token
  });
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'POST'
  });
} 