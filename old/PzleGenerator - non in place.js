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
    var tempStep;

    // generate solution
    for(var i=0; i<solutionStepsCount; i++) {
      stepGenerator = mu.getRandomItem(this.stepGenerators)
      console.log("PzleGenerator -> generatePzleFromEndState -> stepGenerator", stepGenerator)
      tempStep = stepGenerator.generatePrevStep(currStep)

      // re-calculate/inference/forward steps upon new generated prev step, as new thing is added, next steps have changed
        // if prev step is action it may not need as next steps won't get changed
          // generator should indicate whether a re-cal is needed?
      // validate tempStep, see if it can be forwarded to endState

      // need to handle invalid tempStep

      // if valid, set tempStep as currStep
      currStep = tempStep
    }

    // generate failure paths

    return {
      path: currStep
    }
  }

  activateState(state) {
    // problem: cannot know which class to use to construct using the plain obj
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