/**
 * 质因数分解
 */
function primeFactorization(n, s = []) {
  for (let a = 2; a <= n; a++) {
    if (n % a === 0 && (a < n || s.length)) {
      s.push(a)
      primeFactorization(n / a, s)
      break
    }
  }
  return s
}

console.log(primeFactorization(180))
console.log(primeFactorization(200))
console.log(primeFactorization(77))
console.log(primeFactorization(17))

/**
 * 格式化大陆手机号
 * @param {string} mobile 待格式化的手机号
 * @returns 格式化后的手机号
 */
function formatMobile(mobile) {
  return mobile
    .replace(/\s/g, '')
    .replace(/(\d{3})(\d)/, '$1 $2')
    .replace(/(\d{3}\s\d{4})(\d)/, '$1 $2')
}

console.log(formatMobile('13612348899'))
