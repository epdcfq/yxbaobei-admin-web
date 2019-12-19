import request from '@/utils/request'

// 列表查询
export function fetchList(query) {
  return request({
    url: '/org/categories',
    method: 'get',
    params: query
  })
}

export function fetchOption(query) {
  return request({
    url: '/org/search/options/categories',
    method: 'post',
    params: query
  })
}
// 分类详情
export function fetchCate(id) {
  return request({
    url: `/org/categories/${id}`,
    method: 'get'
  })
}

// 创建文章
export function createCate(data) {
  return request({
    url: '/org/categories',
    method: 'post',
    data
  })
}

export function updateCate(data) {
  return request({
    url: '/org/categories',
    method: 'post',
    data
  })
}
