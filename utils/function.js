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
