const mu = require.main.require('./myUtil')

class Pzle {
  constructor(endState, endStateCheck, stepGenerators) {
    this.endStateClone = mu.deepClone(endState)
    this.endStateCheck = endStateCheck,
    this.stepGenerators = stepGenerators

    this.state = endState
    var endStep = {
      isEnd: true
    }
    this.steps = endStep
    this.currStep = endStep
  }

  generatePzle(solutionStepsCount) {
    var count = solutionStepsCount
    var stepGenerator
    while (count > 0) {
      // check curr pzle
      // console.log('@generatePzle count', count)
      // console.log('@generatePzle this.state', this.state)
      // gen prev step
      stepGenerator = mu.getRandomItem(this.stepGenerators)
      stepGenerator.generatePrevStep(this)
      if (stepGenerator.needEndCheck) {
        // only need forward end state check and potential undo for
        //   add mechs
        // need to undo the pzle if generated step is invalid. undo should be stepGenerator specific?
        var endCheckRes = this.endCheck()
        if (endCheckRes) {
          count -= 1
        } else {
          stepGenerator.undoGeneratePrevStep()
        }
      } else {
        count -= 1
      }
    }
    // console.log('@generatePzle end count', count)
  }

  addPrevStep(rawPrevStep) {
    rawPrevStep.nextStep = this.currStep
    this.currStep.prevStep = rawPrevStep
    this.currStep = rawPrevStep
    this.steps = rawPrevStep
  }

  undoGeneratePrevStep() {
    // only undo the step obj
    if (this.currStep.nextStep != null) {
      var tempStep = this.currStep.nextStep
      tempStep.prevStep = null
      this.currStep = tempStep
      this.steps = this.currStep
    }
  }

  endCheck() {
    // [how endStateCheck is] is pzle specific, so should not be implemented in this pzle class
    // check if this's state match endStateCheck's defined end state condition
    this.forwardToEnd()
    var res = this.endStateCheck(this.state, this.endStateClone)
    this.backwardToStart()
    return res
  }

  forward() {
    if (!this.currStep.isEnd) {
      // process mechanics. it is possible that consecutive mechanic steps get triggered all at once at this single step, which should not matters: it only causes some next steps do nothing, until the controllable actions are done
      this.state.mechanics.forEach(mech => {
        mech.forward(this)
        // should do end check at each this.forward, to avoid cases of end state achieved in middle being ignored?
      })
      if (this.currStep.controllableActions != null) {
        this.currStep.controllableActions.forEach(action => {
          action.forward(this)
        })
      }
      this.currStep = this.currStep.nextStep
    }
  }

  backward() {
    if (this.currStep.prevStep != null) {
      // process mechanics. it is possible that consecutive mechanic steps get triggered all at once at this single step, which should not matters: it only causes some next steps do nothing, until the controllable actions are done
      this.state.mechanics.forEach(mech => {
        mech.backward(this)
        // should do end check at each this.forward, to avoid cases of end state achieved in middle being ignored?
      })
      // update currStep first before processing data stored in step as it is the prev step's things that results in curr step state
      this.currStep = this.currStep.prevStep
      if (this.currStep.controllableActions != null) {
        this.currStep.controllableActions.forEach(action => {
          action.backward(this)
        })
      }
    }
  }

  forwardToEnd() {
    while(!this.currStep.isEnd) {
      this.forward()
    }
  }

  backwardToStart() {
    while(this.currStep.prevStep != null) {
      this.backward()
    }
  }
}

module.exports = Pzle