<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <user-list />
      </el-tab-pane>
      <el-tab-pane label="角色管理">
        <el-tabs tab-position="left" style="height: 200px;">
          <el-tab-pane label="管理员">管理员</el-tab-pane>
          <el-tab-pane label="代理">代理</el-tab-pane>
          <el-tab-pane label="商家">商家</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="菜单管理">角色管理</el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import UserList from './components/UserList'
export default {
  name: 'Index',
  components: { UserList }
}
</script>

<style scoped>

</style>
