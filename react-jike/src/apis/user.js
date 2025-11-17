import { request } from '@/utils/request';

export function loginApi(loginForm) {
  return request({
    url: '/authorizations',
    method: 'post',
    data: loginForm
  })
}


export function getUserInfoApi() {
  return request({
    url: '/user/profile',
    method: 'get'
  })
}
