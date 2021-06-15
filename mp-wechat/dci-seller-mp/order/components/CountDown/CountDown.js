// pages/order/components/CountDown/CountDown.js
Component({
  externalClasses: ['ext-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    seconds: {
      type: Number,
      value: 0
    },
    background: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: {
      hh: '00',
      mm: '00',
      ss: '00'
    }
  },

  lifetimes: {
    attached() {
      this.countDown()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatNumber(n, length = 2) {
      n = n.toString()
      if (n.length < length) {
        return '0'.repeat(length - n.length) + n
      }
      return n
    },

    countDown() {
      let seconds = this.data.seconds
      const timer = setInterval(() => {
        seconds -= 1
        if (seconds < 0) {
          clearInterval(timer)
          return
        }

        const h = Math.floor(seconds / 3600)
        const m = Math.floor(seconds / 60) % 60
        const s = seconds % 60
        console.log(h, m, s)
        this.setData({
          time: {
            hh: this.formatNumber(h),
            mm: this.formatNumber(m),
            ss: this.formatNumber(s)
          }
        })
      }, 1000)
    }
  }
})
