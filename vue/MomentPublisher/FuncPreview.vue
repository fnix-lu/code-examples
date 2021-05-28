<template>
  <el-dialog
    :visible="visible"
    title="预览"
    width="375px"
    @close="hideDialog">
    <div class="preview-container">
      <user-feed :item="data" :images-folded="false"/>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {
    UserFeed: () => import('./UserFeed')
  },
  props: {
    visible: Boolean,
    data: Object
  },
  methods: {
    // 关闭弹层
    hideDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-container {
  width: 375px;
  height: 667px;
  padding: 0 15px;
}
.el-dialog__wrapper {
  ::v-deep .el-dialog__body {
    padding: 0;
  }
}
</style>
