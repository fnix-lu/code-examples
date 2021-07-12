<template>
  <div class="product-tabs">
    <van-tabs
      color="#4D91F7"
      line-width="20"
      line-height="4"
      v-model="activeTab"
      scrollspy
      sticky>
      <van-tab
        title="详情"
        name="tab-detail">
      </van-tab>
      <van-tab
        title="推荐"
        name="tab-recommend">
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.product-tabs {
  padding: 0;
  ::v-deep {
    .van-tabs__nav {
      padding-left: 0.32rem;
      padding-right: 0.32rem;
    }
    .van-tab {
      flex: initial;
      font-size: 0.32rem;
      color: #80868E;
      margin-right: 0.48rem;
      padding: 0;
    }
    .van-tab--active {
      color: #0C1727;
      font-size: 0.4rem;
      font-weight: 500;
    }
    .van-tabs__line {
      // bottom: 18px;
    }
  }
}
</style>