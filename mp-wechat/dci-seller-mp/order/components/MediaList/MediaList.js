// pages/order/components/MediaList/MediaList.js
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    boxSize: {
      type: Number,
      value: 196 // rpx
    },
    boxSpan: {
      type: Number,
      value: 16 // rpx
    },
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    imageBoxStyle(data) {
      const width = `width: ${data.boxSize}rpx;`
      const height = `height: ${data.boxSize}rpx;`
      const marginTop = `margin-top: ${data.boxSpan}rpx;`
      return `${width}${height}${marginTop}`
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
