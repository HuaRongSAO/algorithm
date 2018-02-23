const Decimal = require('decimal.js')

class MillerRabin {
  constructor (number) {
    if (typeof number !== 'string' || number === '') throw new Error('MillerRabin 必须传入 十进制,string类型')
    this.number = number
    this.bn = new Decimal(number)
  }

  isPrime () {
    const {number, bn} = this
    if (number === '2') return true
    if (bn.lt(2) || this.isEven()) return false
    const t = this.millerRabinLoop(5)
    return t
  }

  isEven () {
    const {bn} = this
    if (bn.mod(2) === 0) return true
    return false
  }

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

  //快速幂取模 a ^ b mod p = ((a mod p)^b) mod p
  ModExp (a, b, n) {
    let i = new Decimal(0)
    let c = a
    while (!b.equals(i)) {
      c = this.modMul(c, a, n)
      i = i.plus(1)  
    }
    return c
  }

  millerRabinLoop (s) {
    const {bn} = this
    // n-1 = u*2^t
    let t = 0
    let u = bn.sub(1)
    while (u.mod(2).equals(0)) {
      u = u.div(2).floor()
      t++
    }
    console.log('u,t',u.d,t)
    for (let i = 0; i < s; i++) {
      let a = this.getRandom()
      while (a.lt(1) || a.gt(bn)) {
        a = this.getRandom()
      }
      // x=(a^u) mod n
      let x =  this.ModExp(a, u, bn)
      console.log('a' + a.d)
      console.log('x' + x.d)
      for (let j = 0; j < t; j++) {
        // console.log('x:' + j + ':', x.d)
        let y = x.pow(2).mod(bn)
        console.log('y:' + j + ':', y.d)
        if (y.equals(1) && !x.equals(1) && !x.equals(bn.sub(1))) return false
        x = y
      }
      // 这里的时候x=a^(n-1)，根据费马小定理，x!=1的话，肯定不是素数了
      console.log('x.equals(1)' + x.equals(1))
      if (x.equals(1)) return true
      if (!x.equals(1)) return false
    }
    return true
  }

}

const mr = new MillerRabin('13')
console.log(mr.isPrime())
