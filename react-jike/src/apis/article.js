import { request } from '@/utils/request';

export function getChannelList() {
  return request({
    url: '/channels',
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/mo/articles?draft=false',
    method: 'post',
    data
  })
}