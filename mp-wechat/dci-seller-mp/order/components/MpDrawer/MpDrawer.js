// pages/order/components/MpDrawer/MpDrawer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHide() {
      this.setData({
        visible: false
      })
    }
  }
})
