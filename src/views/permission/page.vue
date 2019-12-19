<template>
  <div class="app-container">
    <el-tree
      :data="pageList"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, pageList }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(pageList)"
          >
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, pageList)"
          >
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form :model="page" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="page.name" placeholder="角色名称" maxlength="30" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { getRoutesTree } from '../../utils/permission'

export default {
  name: 'PagePermission',
  data() {
    return {
      dialogVisible: false,
      dialogType: 'append',
      page: { name: '' },
      data: [],
      pageList: []
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    // 角色切换
    handleRolesChange() {
      // this.$router.push({ path: '/permission/page?' + +new Date() })
    },
    Plist(menuList) {
      // let data
      // menuList.forEach(function(item, key) {
      //   const menu
      //   menu = { id: item.id, label: item.name, children: [] }
      //   if (item.children.length) {
      //     menu['children'] = this.Plist(item.children)
      //   }
      //   data.push(menu)
      // })
      // return data
    },
    getPageList(roles) {
      // const _this = this
      // this.pageList = getRoutesTree()
      // console.log(this.pageList, 'roles')
    },
    append(data) {
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>)
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    margin-top: 10px;
  }
</style>
