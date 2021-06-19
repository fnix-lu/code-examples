const BASE_API = 'http://yapi.zc0901.com/mock/114/api/mini'
// const BASE_API = 'http://dci.ngrok.zc0901.com'

const request = ({ url, ...config }) => new Promise((resolve, reject) => {
  url = /^https?:/.test(url) ? url : BASE_API + url

  wx.request({
    url,
    ...config,
    success: (result) => {
      if (result.statusCode === 200) {
        const res = result.data
        resolve(res)
      } else {
        console.error('请求发生错误')
        reject(new Error('请求发生错误'))
      }
    },
    fail: (res) => {},
    complete: (res) => {}
  })
})

export default request
