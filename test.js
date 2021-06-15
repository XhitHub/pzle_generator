const mu = require.main.require('./myUtil')
// const PzleGenerator = require.main.require('./PzleGenerator')
const Pzle = require.main.require('./Pzle')
const teleGen = require.main.require('./mechanics/Tele')
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
var solutionStepsCount = 10

// // t2
// const pg = new PzleGenerator()
// var pz = pg.generatePzleFromEndState(endState, solutionStepsCount)

// console.log(pz)

// t3
const stepGenerators = [teleGen]
const endStateCheck = (actualState, goalState) => {
  var cA = actualState.controllables.find(item => item.id == 'c1')
  var cG = goalState.controllables.find(item => item.id == 'c1')
  return mu.areSamePos(cA.pos, cG.pos)
}
const pz = new Pzle(endState, endStateCheck, stepGenerators)
pz.generatePzle(solutionStepsCount)
console.log(pz.state)