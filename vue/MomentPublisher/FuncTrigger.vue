<template>
  <el-button slot="reference" type="text" class="func-trigger" @click="$emit('click')">
    <svg-icon class="func-icon" :icon-class="svgIcon"/>{{ text }}
  </el-button>
</template>

<script>
export default {
  props: {
    text: String,
    svgIcon: String
  }
}
</script>

<style lang="scss" scoped>
.func-trigger {
  font-size: 12px;
  padding: 0;
  .func-icon {
    font-size: 24px;
    margin-right: 3px;
    vertical-align: -7px;
  }
}
</style>