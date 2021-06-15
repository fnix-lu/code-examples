// pages/order/components/ActionSheet/ActionSheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
    title: String,
    actions: Array
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
    },

    onSelect(e) {
      const { index } = e.currentTarget.dataset
      this.triggerEvent('select', index)
      this.onHide()
    }
  }
})
