async function wxConfig(path, jsAPIList = []) {
  const res = await getWXAuthConfig(encodeURIComponent(path))
  if (res) {
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: jsAPIList
    })
  }
}

router.beforeEach((to, from, next) => {
  // 配置微信 js-sdk API
  const { href } = router.resolve(to)
  const wxAPIList = to.meta.wxAPIList
  if (isWXBrowser() && Array.isArray(wxAPIList) && wxAPIList.length) {
    const path = location.protocol + '//' + location.host + href
    wxConfig(path, wxAPIList)
  }

  next()
})