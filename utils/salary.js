const base = 17200
const five_and_one = 1776
const salary = [
  /*  1 */base,
  /*  2 */base + 3494.25 - 300,
  /*  3 */base - 230 - 300,
  /*  4 */base - 200,
  /*  5 */base - 200,
  /*  6 */base - 160
  /*  7 */
  /*  8 */
  /*  9 */
  /* 10 */
  /* 11 */
  /* 12 */
]

const tax_free = 5000
const tax_rate = [
  { sum: 960000, rate: 0.45, deduct: 181920 },
  { sum: 660000, rate: 0.35, deduct: 85920 },
  { sum: 420000, rate: 0.3, deduct: 52920 },
  { sum: 300000, rate: 0.25, deduct: 31920 },
  { sum: 144000, rate: 0.2, deduct: 16920 },
  { sum: 36000, rate: 0.1, deduct: 2520 },
  { sum: 0, rate: 0.03, deduct: 0 }
]

let last_total_tax = 0
const detail = salary.map((n, i) => {
  const total_salary = salary.slice(0, i + 1).reduce((a, b) => a + b, 0)
  const total_for_tax = total_salary - (five_and_one + tax_free) * (i + 1)
  const tax_rate_used = tax_rate.find(a => total_for_tax > a.sum)
  const total_tax = total_for_tax * tax_rate_used.rate - tax_rate_used.deduct
  const tax = total_tax - last_total_tax
  const get = n - five_and_one - tax
  last_total_tax = total_tax
  return {
    month: i + 1,
    get: get.toFixed(2),
    tax: tax.toFixed(2)
  }
})

console.log(detail)