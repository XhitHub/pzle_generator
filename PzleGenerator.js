const teleGen = require.main.require('./mechanics/Tele')
// const { generateNextStep, generatePrevStep } = require.main.require('./mechanics/Tele')
const mu = require.main.require('./myUtil')

// const stepGenerators = [
//   genTele
// ]

class PzleGenerator {
  constructor() {
    this.stepGenerators = [
      teleGen
    ]
    console.log("PzleGenerator -> constructor -> this.stepGenerators", this.stepGenerators)
  }
  
  
  generatePzleFromEndState(endState, solutionStepsCount) {
    var currStep = {
      state: endState
    }
    var stepGenerator;

    // generate solution
    for(var i=0; i<solutionStepsCount; i++) {
      stepGenerator = mu.getRandomItem(this.stepGenerators)
      console.log("PzleGenerator -> generatePzleFromEndState -> stepGenerator", stepGenerator)
      currStep = stepGenerator.generatePrevStep(currStep)
    }

    // generate failure paths

    return {
      path: currStep
    }
  }
}

module.exports = PzleGenerator