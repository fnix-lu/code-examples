<template>
  <div class="func-popper-header">
    <div class="title">{{ title }}</div>
    <slot></slot>
    <i class="btn-close el-icon-close" @click="$emit('close')"></i>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.func-popper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    margin-right: 8px;
  }
  .btn-close {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>