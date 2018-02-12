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
  //快速积取模 a*b%n
  ModMul (a, b, n) {
    let ans = 0
    while (b) {
      if (b & 1)
        ans = (ans + a) % n
      a = (a + a) % n
      b >>= 1
    }
    return ans
  }

  //快速幂取模 a^b%n
  ModExp (a, b, n) {
    let ans = 1
    while (b) {
      if (b & 1)
        ans = this.ModMul(ans, a, n)
      a = this.ModMul(a, a, n)
      b >>= 1
    }
    return ans
  }

  millerRabinLoop (s) {
    const {bn} = this
    // n-1 = u*2^t
    let t = 0
    let u = bn.sub(1)
    while (u.mod(2).d[0] === 0) {
      u = u.div(2).floor()
      t++
    }
    console.log(u.d[0], t)
    for (let i = 0; i < s; i++) {
      let a = this.getRandom()
      while (a.lt(1) || a.gt(bn)) {
        a = this.getRandom()
      }
      // x=(a^u) mod n
      console.log('u,t', u.d, t)
      // console.log('a', a.pow(u).d)
      console.log('toBinary', a.toBinary)
      console.log(this.ModExp(a.toBinary, '0b011', bn.toBinary))

      // let x = new Decimal(a.pow(u).d.join('')).mod(bn)
      // console.log('a.pow(u)', a.pow(u).d)
      // console.log(x)
      for (let j = 0; j < t; j++) {
        // console.log('x:' + j + ':', x.d)
        let y = new Decimal(new Decimal(x).pow(2).d.join('')).mod(bn)
        console.log('y:' + j + ':', y.d)
        if (y.equals(1) && !x.equals(1) && !x.equals(bn.sub(1))) return false
        x = y
      }
      //这里的时候x=a^(n-1)，根据费马小定理，x!=1的话，肯定不是素数了
      console.log('x!=1的话', x.equals(1))
      if (!x.equals(1)) return false
    }
    return true
  }

}

const mr = new MillerRabin('33478071698956898786044169848212690817704794983713768568912431388982883793878002287614711652531743087737814467999489')
console.log(mr.isPrime())
