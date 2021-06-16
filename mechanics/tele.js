const mu = require.main.require('./myUtil')

class Tele {
  // constructor(teleIn, teleOut, state) {
  //   this.teleIn = teleIn
  //   this.teleOut = teleOut
  //   // register this mechanic to targetState passed in. will be included in prev, next states as when processing the connected states this state will be considered
  //   state.mechanics.push(this)
  // }

  constructor(plainObj) {
    // easier construct from deep cloned funcless forms
    this.teleIn = plainObj.teleIn
    this.teleOut = plainObj.teleOut
  }

  register(state) {
    // register this mechanic to passed state
    state.mechanics.push(this)
  }

  // compulsory funcs
  forward(pzle) {
    // if any tele-able obj in pzle is in this.teleIn, tele it/them to teleOut
    // modify registered state in place
    var state = pzle.state
    var arr = [state.controllables, state.mechanics]
    arr.forEach(
      list => {
        list.forEach(
          item => {
            if (this.isTeleable(item) && mu.areSamePos(item.pos, this.teleIn)) {
              item.pos = mu.deepClone(this.teleOut)
            }
          }
        )
      }
    )
    // add empty step? but in non pzle generating usage it should not add steps. put add step in generator instead?
    // pzle.steps
  }

  backward(pzle) {
    // should not operate on a fixed this.state, as the mechanic will be used in other steps too
    var state = pzle.state
    var arr = [state.controllables, state.mechanics]
    arr.forEach(
      list => {
        var filteredList = list.filter(item2 => this.isTeleable(item2))
        // console.log("Tele -> backward -> filteredList", filteredList)
        filteredList.forEach(
          item => {
            // console.log("Tele -> backward -> item", item)
            if (mu.areSamePos(item.pos, this.teleOut)) {
              item.pos = mu.deepClone(this.teleIn)
            }
          }
        )
      }
    )
  }

  // class specific funcs
  isTeleable(item) {
    return item.isTeleable == true
  }
}

// generate this mechanic/... and prev step. is previously "generatePrevStep" in the Tele class
const generatePrevStep = (pzle) => {
  // tele target: randomly pick 1 teleable obj
  var currState = pzle.state
  var teleables = currState.controllables.filter( item => item.isTeleable)
  var target = mu.getRandomItem(teleables)
  
  // generate tele
  //   this.teleOut: target's pos
  //   this.teleIn: random valid pos
  var teleIn = mu.getRandomPos(currState)
  var teleOut = target.pos
  var tele = new Tele({teleIn, teleOut})
  console.log("generatePrevStep -> tele", JSON.stringify(tele))
  
  tele.register(currState)
  // console.log("generatePrevStep -> tele", tele)

  // use generated tele's backward() to determ pzle state's prev state?
  tele.backward(pzle)
  
  // update pzle steps
  var tempStep = pzle.currStep
  pzle.steps = {
    //empty curr step as there is no data outside state needed
    controllableActions: [],
    // if curr step is null, then nextStep is null ( no next step )
    nextStep: tempStep
  }
  pzle.currStep = pzle.steps
  tempStep.prevStep = pzle.currStep
}

const undoGeneratePrevStep = (pzle) => {
  pzle.state.mechanics.pop()
  pzle.undoGeneratePrevStep()
}

const generateNextStep = (pzle) => {
}

/*
notes
  round?
  steps
    sub-steps
  can be just generate steps, where some steps are automated mechanics executions, some steps are actions (user triggered actions)
    user actions to be of same interface as mechanics, with forward(), backward(), generatePrevStep()
*/

const stepGen = { 
  generateNextStep, 
  generatePrevStep,
  undoGeneratePrevStep,
  needEndCheck: true,
}
module.exports = stepGen