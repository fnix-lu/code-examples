// pages/order/components/NavBar/NavBar.js
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    titleColor: {
      type: String,
      value: 'black'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    navBarHeight: 0
  },

  computed: {
    navBarStyle(data) {
      const height = `height: ${data.navBarHeight}px;`
      const paddingTop = `padding-top: ${data.statusBarHeight}px;`
      const backgroundColor = `background-color: ${data.backgroundColor};`
      return `${height}${paddingTop}${backgroundColor}`
    }
  },

  lifetimes: {
    attached() {
      this.init()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 计算导航栏定位和高度
    init() {
      const { statusBarHeight } = wx.getSystemInfoSync()
      const { top, height } = wx.getMenuButtonBoundingClientRect()
      const navBarHeight = height + 2 * (top - statusBarHeight)
      this.setData({
        statusBarHeight,
        navBarHeight
      })
    },

    goBack() {
      wx.navigateBack()
    }
  }
})
