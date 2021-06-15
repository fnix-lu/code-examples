// pages/order/productOrderDetail/components/ProductList/ProductList.js
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAll: false
  },

  computed: {
    visibleList(data) {
      if (data.isAll) {
        return data.list
      }
      return data.list.slice(0, 3)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showAll() {
      this.setData({
        isAll: true
      })
    }
  }
})
