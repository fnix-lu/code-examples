const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    boxSize: {
      type: Number,
      value: 208 // rpx
    },
    boxSpan: {
      type: Number,
      value: 32 // rpx
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    fileBoxStyle(data) {
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
