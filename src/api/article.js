import request from '@/utils/request'

// 列表查询
export function fetchList(query) {
  return request({
    url: '/org/articles',
    method: 'get',
    params: query
  })
}

export function fetchOption(query) {
  return request({
    url: '/org/search/options/article',
    method: 'post',
    params: query
  })
}
// 单篇文章详情
export function fetchArticle(id) {
  return request({
    url: `/org/articles/${id}`,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/org/articles/pv',
    method: 'get',
    params: { pv }
  })
}

// 创建文章
export function createArticle(data) {
  return request({
    url: '/org/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/org/articles/update',
    method: 'post',
    data
  })
}
