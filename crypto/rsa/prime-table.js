const fs = require('fs')
const primes = [2]
let number = 3

const isPrime = n => {
  if (n <= 3) { return n > 1 }
    if (n % 2 === 0 || n % 3 === 0) { return false }
 
    for (var  i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) { return false }
    }
    return true
}

while (primes.length !== 10000) {
  isPrime(number) && primes.push(number)
  number += 2
}

const JsonString = JSON.stringify({primes:primes})
fs.writeFile('prime-table.json', JsonString, 'utf8', (err) => {
  if (err) throw err;
  console.log('prime table has been saved!');
})