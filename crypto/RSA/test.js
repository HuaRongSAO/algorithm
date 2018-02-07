const ParkMiller = require('park-miller')

const random = new ParkMiller(10)

console.log(random.integer())
console.log(random.integerInRange(10000000000, 10000000000000000))
