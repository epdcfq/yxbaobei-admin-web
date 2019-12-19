import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

/**
 * 获取权限树id/lebel列表
 * @param roles
 * @returns {Array}
 */
export function getRoutesTree(roles) {
  const tree = []
  const routes = (!roles || typeof (roles) === 'undefined') ? store.getters && store.getters.permission_routes : roles
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.id && tmp.name) {
      const tmpTree = { id: tmp.id, label: tmp.meta.title ? tmp.meta.title : tmp.name, children: [] }
      if (tmp.children && tmp.children.length) {
        tmpTree['children'] = getRoutesTree(tmp.children)
      }
      tree.push(tmpTree)
    }
  })
  return tree
}
