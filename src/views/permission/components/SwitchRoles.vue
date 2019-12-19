<template>
  <div>
    <!--<div style="margin-bottom:15px;">-->
    <!--Your roles: {{ roles }}-->
    <!--</div>-->
    <!--Switch roles:-->
    <el-radio-group v-model="admin">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      console.log(this.$store.getters.roles)
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        return val
        // this.$store.dispatch('user/changeRoles', val).then(() => {
        //   this.$emit('change')
        // })
      }
    }
  }
}
</script>
