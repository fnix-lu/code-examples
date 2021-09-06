function add() {
  const args = [...arguments]

  function fn() {
    args.push(...arguments)
    return fn
  }
  fn.toString = () => args.reduce((s, n) => s + n, 0)

  return fn
}

function add(...a1) {
  let sum = a1.reduce((s, n) => s + n)

  function fn(...a2) {
    sum += a2.reduce((s, n) => s + n)
    return fn
  }
  fn.toString = () => sum

  return fn
}

console.log(add(1))
console.log(add(1)(2))
console.log(add(1)(2)(3))
console.log(add(1)(2, 3))
console.log(add(1, 2)(3))
console.log(add(1, 2, 3))
