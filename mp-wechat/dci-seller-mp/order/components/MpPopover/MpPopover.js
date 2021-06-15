// pages/order/components/MpPopover/MpPopover.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    visibleLayer: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTrigger() {
      this.setData({
        visibleLayer: !this.data.visibleLayer
      })
    }
  }
})
