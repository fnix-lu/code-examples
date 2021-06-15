// pages/order/serviceOrderDetail/serviceOrderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    closedCustomerInfo: false,
    activeTab: 'service'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 展开收起客户信息
  toggleCustomerInfo() {
    this.setData({
      closedCustomerInfo: !this.data.closedCustomerInfo
    })
  },

  // 点击 Tab
  tapTab(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({
      activeTab: tab
    })
  },

  // 跳转完单结算
  goFinalSettle() {
    wx.navigateTo({
      url: '/pages/order/finalSettle/finalSettle',
    })
  }
})