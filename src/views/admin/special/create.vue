<template>
  <div class="app-container">
    <div class="filter-container">
      添加
    </div>
    <div class="row">
      <div class="col-8">
        <h3>Nested draggable</h3>
        <nested-container :layout="layout" />
      </div>

    </div>
  </div>
</template>

<script>
import nestedContainer from './infra/container'
export default {
  name: 'NestedExample',
  display: 'Nested',
  order: 15,
  components: {
    nestedContainer
  },
  data() {
    return {
      layout: {
        header: { show: true, height: '30px' },
        aside: { show: true, span: 6 },
        main: { show: true, span: 18 },
        footer: { show: true, height: '300px' }
      },
      list: [
        {
          name: '导航-level-1',
          tasks: [
            {
              name: '导航菜单-level-2',
              tasks: [
                {
                  name: '菜单-level-3-1',
                  tasks: []
                },
                {
                  name: '菜单-level-3-22',
                  tasks: []
                }
              ]
            }
          ]
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: []
            }
          ]
        },
        {
          name: 'task 5',
          tasks: []
        }
      ]
    }
  }
}
</script>
<style scoped></style>
