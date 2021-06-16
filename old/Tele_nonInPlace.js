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
  forward(state) {
    // if any tele-able obj in pzle is in this.teleIn, tele it/them to teleOut
    // modify registered state in place
    var state2 = mu.deepClone(state)
    var arr = [state2.controllables, state2.mechanics]
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
    return state2
  }

  backward(state) {
    // should not operate on a fixed this.state, as the mechanic will be used in other steps too
    var state2 = mu.deepClone(state)
    var arr = [state2.controllables, state2.mechanics]
    arr.forEach(
      list => {
        list.forEach(
          item => {
            if (this.isTeleable(item) && mu.areSamePos(item.pos, this.teleOut)) {
              item.pos = mu.deepClone(this.teleIn)
            }
          }
        )
      }
    )
    return state2
  }

  // class specific funcs
  isTeleable(item) {
    return item.isTeleable
  }
}

// generate this mechanic/... and prev step. is previously "generatePrevStep" in the Tele class
const generatePrevStep = (currStep) => {
  /*
  randomly create a mechanic of this type, with its attrs ics such that the pzle's prev step has its state results in currState with this mechanic instance involved
  it is creating a step in a way in a path / reversedPath obj
  it can simply return a prev step, and let the parent func to handle the building of the big path obj.
    if prev step is given/obtained, building big path obj with the obtained prev step is same for any mechanics, thus should not be implemented in each mechanic individually
  or return a prev state
  or return a step obj, as it may involve data outside step obj
    this allows more flexibility
  */

  // tele target: randomly pick 1 teleable obj
  var currState = currStep.state
  var teleables = currState.controllables.filter( item => item.isTeleable)
  var target = mu.getRandomItem(teleables)
  
  // generate tele
  //   this.teleOut: target's pos
  //   this.teleIn: random valid pos
  var teleIn = mu.getRandomPos(currState)
  var teleOut = target.pos
  var tele = new Tele({teleIn, teleOut})
  tele.register(currState)
  console.log("generatePrevStep -> tele", tele)

  // use generated tele's backward() to obtain passed in currState's prev state?
  var prevStepState = tele.backward(currState)
  var prevStep = {
    state: prevStepState,
    nextSteps: [
      currStep
    ]
  }
  // return prev step
  return prevStep
}

const generateNextStep = (currStep) => {
}

/*
notes
  round?
  steps
    sub-steps
  can be just generate steps, where some steps are automated mechanics executions, some steps are actions (user triggered actions)
    user actions to be of same interface as mechanics, with forward(), backward(), generatePrevStep()
*/

const teleGen = { generateNextStep, generatePrevStep }
module.exports = teleGen