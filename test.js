const mu = require.main.require('./myUtil')
console.log("mu", mu)

var o1 = {
  asd: 1,
  qwe: 2
}

o2 = mu.deepClone(o1)
o2.qwe = 3

console.log("o1", o1)
console.log("o2", o2)

