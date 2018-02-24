const Decimal = require('decimal.js')

class MillerRabin {
  constructor (number, security = 8) {
    if (typeof number !== 'string' || number === '') throw new Error('MillerRabin 必须传入 十进制,string类型')
    this.number = number
    this.bn = new Decimal(number)
    this.security = security // 安全系数 循环8次的为素数 99.998+%
  }

  isPrime () {
    const {number, bn} = this
    if (number === '2') return true
    if (bn.lt(2) || this.isEven()) return false
    const t = this.millerRabinLoop()
    return t
  }

  isEven () {
    const {bn} = this
    if (bn.mod(2) === 0) return true
    return false
  }
  // 随机一个和n一样长度的随机数
  getRandom () {
    let len = this.bn.toBinary().length
    let rn = '0b'
    while (rn.length !== (len + 1)) {
      rn += Math.floor(Math.random() * 10 > 4.5) ? '1' : '0'
    }
    return new Decimal(rn)
  }
  // 快速积取模 (a * b) mod p = (a mod p * b mod p) mod p
  modMul (a, b, n) {
    let firMod = a.mod(n)
    let senMod = b.mod(n)
    let product = firMod.mul(senMod)
    return product.mod(n)
  }

  //快速幂取模 a ^ u mod p = ((a mod p)^u) mod p
  ModExp (a, u, n) {
    let i = new Decimal(1)
    let c = a
    while (!u.equals(i)) {
      c = this.modMul(c, a, n)
      i = i.plus(1)  
    }
    return c
  }
  // MillerRabin 循环验证
  millerRabinLoop () {
    const {bn, security} = this
    // n-1 = u*2^t
    let t = 0
    let u = bn.sub(1)
    while (u.mod(2).equals(0)) {
      u = u.div(2).floor()
      t++
    }
    for (let i = 0; i < security; i++) {
      let a = this.getRandom()
      while (a.lte(1) || a.gte(bn)) {
        a = this.getRandom()
      }
      // x=(a^u) mod n
      let x =  this.ModExp(a, u, bn)
      for (let j = 0; j < t; j++) {
        let y = x.mul(x).mod(bn)
        if (y.equals(1) && !x.equals(1) && !x.equals(bn.sub(1))) return false
        x = y
      }
      // 这里的时候x=a^(n-1)，根据费马小定理，x!=1的话，肯定不是素数了
      if (!x.equals(1)) return false
    }
    return true
  }

}
let start = new Date().getTime()
console.log('start')
const mr = new MillerRabin('319489', 2)
console.log(mr.isPrime())
let end = new Date().getTime()
console.log('end')
console.log('time:', end - start)

