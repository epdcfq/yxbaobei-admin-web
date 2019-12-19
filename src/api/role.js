import request from '@/utils/request'

// 获取单页面权限
export function getPermission(pageid) {
  return request({
    url: 'roles/page/${pageid}',
    method: 'post'
  })
}

export function getRoutes() {
  return request({
    url: '/routes/role',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
