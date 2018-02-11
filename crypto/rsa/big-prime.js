const BigNumber = require('bignumber.js')
let bigNumberBinay = '1'

while (bigNumberBinay.length !== 1024) {
  bigNumberBinay += Math.floor(Math.random() * 10 >4.5) ? '1': '0'
  if (bigNumberBinay.length === 1023) bigNumberBinay += '1'
}
console.log(bigNumberBinay)