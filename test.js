const mu = require.main.require('./myUtil')
const PzleGenerator = require.main.require('./PzleGenerator')
// t1
// console.log("mu", mu)

// var o1 = {
//   asd: 1,
//   qwe: 2
// }

// o2 = mu.deepClone(o1)
// o2.qwe = 3

// console.log("o1", o1)
// console.log("o2", o2)



// t2
const pg = new PzleGenerator()

var solutionStepsCount = 10
var endState = {
  mechanics: [
  ],
  controllables: [
    {
      id: 'c1',
      pos: {
        x: 0,
        y: 0,
      },
      isTeleable: true,
    }
  ],
  env: {
    dimension: {
      x: 40,
      y: 40,
    }
  }
}

var pz = pg.generatePzleFromEndState(endState, solutionStepsCount)

console.log(pz)
