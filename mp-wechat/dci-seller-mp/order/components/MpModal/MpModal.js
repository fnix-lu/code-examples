// pages/order/components/MpModal/MpModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
    title: String,
    content: String,
    showCancel: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancelColor: {
      type: String,
      value: '#999999'
    },
    confirmText: {
      type: String,
      value: '确认'
    },
    confirmColor: {
      type: String,
      value: '#E73626'
    }
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
    hide() {
      this.setData({
        visible: false
      })
    }
  }
})
