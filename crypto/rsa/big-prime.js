const Decimal = require('decimal.js')
const {primes} = require('./prime-table.json')

// 二进制生成512位大数
const generiteBigNumber = () => {
  let bigNumberBinay = '0b1'
  while (bigNumberBinay.length !== 514) {
    bigNumberBinay += Math.floor(Math.random() * 10 >4.5) ? '1': '0'
    if (bigNumberBinay.length === 513) bigNumberBinay += '1'
  }
  return new Decimal(bigNumberBinay)
}
// 素性表格 mod 验证法
const checkPrimeTable = n => {
  for ((index) in primes) {
    if (n.mod(primes[index]) === 0) return false
  }
  return true
}

// 

const generitePrime = () => {
  const bn = generiteBigNumber()
  return checkPrimeTable(bn) ? bn.d.join('') : generitePrime()
}
console.log(generitePrime())