<template>
  <div class="app-container">
    <!--<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">-->
    <!--<el-radio-button label="top">top</el-radio-button>-->
    <!--<el-radio-button label="right">right</el-radio-button>-->
    <!--<el-radio-button label="bottom">bottom</el-radio-button>-->
    <!--<el-radio-button label="left">left</el-radio-button>-->
    <!--</el-radio-group>-->
    <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick">
      <el-tab-pane label="微信菜单" name="first">
        <config-menu />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ConfigMenu from './components/config_menu'
export default {
  components: {
    ConfigMenu
  },
  data() {
    return {
      activeName: 'first',
      tabPosition: 'top'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
