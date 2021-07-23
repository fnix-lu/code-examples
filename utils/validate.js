export function isWXBrowser() {
  return /micromessenger/i.test(navigator.userAgent)
}

export function isWXWork() {
  return /micromessenger/i.test(navigator.userAgent) && /wxwork/i.test(navigator.userAgent)
}

export function isQQ() {
  return 'QQ/' === navigator.userAgent.match(/QQ\//i)
}

export function isIOS() {
  return /(iPhone|iPad|iPod)/i.test(navigator.userAgent)
}

export function isAndroid() {
  return navigator.userAgent.includes('Android') || navigator.userAgent.includes('Adr')
}

export function isMac() {
  return !(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i)) && Boolean(navigator.userAgent.match(/OS ([9]|1[0-9])_\d[_\d]* like Mac OS X/i))
}
