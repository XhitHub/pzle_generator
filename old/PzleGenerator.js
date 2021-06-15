const teleGen = require.main.require('./mechanics/Tele')
// const { generateNextStep, generatePrevStep } = require.main.require('./mechanics/Tele')
const mu = require.main.require('./myUtil')

// const stepGenerators = [
//   genTele
// ]

class PzleGenerator {
  constructor() {
    this.generators = [
      teleGen
    ]
    console.log("PzleGenerator -> constructor -> this.generators", this.generators)
  }
  
  
  generatePzleFromEndState(endState, solutionStepsCount) {
    // in-place modify
    //   clone plain obj end state at start
    //   at each gen prev step:
    //     directly in-place modify curr state
    //     validation
    //       forward to end state
    //         check end state with endStateCheck() defined (which should check for parts of state)
    //       backward back to begining
    //     store non state data in steps
    var endStateClone = mu.deepClone(endState)
    var pzle = {
      state: endState,
      // steps: {}
    }
    // generate solution
    var stepGenerator
    for(var i=0; i<solutionStepsCount; i++) {
      stepGenerator = mu.getRandomItem(this.generators)
      console.log("PzleGenerator -> generatePzleFromEndState -> stepGenerator", stepGenerator)
      stepGenerator.generatePrevStep(pzle)
    }
    console.log("PzleGenerator -> generatePzleFromEndState -> pzle", pzle)
  }

  addPrevStep(pzle, endStateClone, endStateCheck, stepGenerator) {
    // generate prev step
    stepGenerator.generatePrevStep(pzle)
    // validate the generation: forwardly do all generated steps (stored in steps of pzle obj), check if proper/planned end state can be reached
  }

  forwardToEnd(pzle) {
    // forward pzle to end step
  }

  backwardToStart(pzle) {
    // backward pzle to start step
  }

  pathForwardRecalculation(startStep, plannedPath) {
    // startStep is generated pzle's start step. the next steps are not yet valid before forward recalc as there are new units added in each generated prev step
    // this func generate the real path of the pzle

    // should use startStep instead of state as there may be crucial non state data in a step
    // trigger all mechanics, actions, ... at each step
    /*
    problem: cannot know wt controllable actions to exec, as they are not auto executed like mechanics
    sol
      also have planned path.
        at each step: 
          besides trigger all mechanics in state, also do controllable actions specified in planned path's corresponding step.
            then may not be able to be recursive?
        with planned path, having branched failure paths may not be an issue
    */

    currStep = startStep
    currPlannedStep = plannedPath
    while (true) {
      // process mechanics. it is possible that consecutive mechanic steps get triggered all at once at this single step, which should not matters
      // problem: states has been deep cloned. the mechanics/... are plain objs with no funcs
      currStep.state.mechanics.forEach(mech => {
        mech.forward(currStep.state)
      })
    }
  }

}

module.exports = PzleGenerator