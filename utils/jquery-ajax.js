import $ from 'jquery'

export default ({ url, ...config }) => new Promise((resolve, reject) => {
  $.ajax({
    url: /^https?:/.test(url) ? url : process.env.VUE_APP_BASE_API + url,
    success: resolve,
    error: reject,
    ...config
  })
})