const mu = require.main.require('./myUtil')

class Tele {
  constructor(teleIn, teleOut, state) {
    this.teleIn = teleIn
    this.teleOut = teleOut
    // register this mechanic to targetState passed in. will be included in prev, next states as when processing the connected states this state will be considered
    this.state = state
    state.mechanics.push(this)
  }

  // compulsory funcs
  forward() {
    // if any tele-able obj in pzle is in this.teleIn, tele it/them to teleOut
    // modify registered state in place
    var state2 = mu.deepClone(this.state)
    [state2.controllables, state2.mechanics].forEach(
      list => {
        list.forEach(
          item => {
            if (isTeleable(item) && mu.areSamePos(item.pos, this.teleIn)) {
              item.pos = mu.deepClone(this.teleOut)
            }
          }
        )
      }
    )
    return state2
  }

  backward() {
    var state2 = mu.deepClone(this.state)
    [state2.controllables, state2.mechanics].forEach(
      list => {
        list.forEach(
          item => {
            if (isTeleable(item) && mu.areSamePos(item.pos, this.teleOut)) {
              item.pos = mu.deepClone(this.teleIn)
            }
          }
        )
      }
    )
    return state2
  }

  generatePrevStep(currState) {
    /*
    randomly create a mechanic of this type, with its attrs ics such that the pzle's prev step has its state results in currState with this mechanic instance involved
    it is creating a step in a way in a path / reversedPath obj
    it can simply return a prev step, and let the parent func to handle the building of the big path obj.
      if prev step is given/obtained, building big path obj with the obtained prev step is same for any mechanics, thus should not be implemented in each mechanic individually
    or return a prev state
    or return a step obj, as it may involve data outside step obj
    */

    // tele target: randomly pick 1 teleable obj
    var target
    // TODO
    // generate tele
    //   this.teleOut: target's pos
    //   this.teleIn: random valid pos
    var tele = new Tele()
    // use generated tele's backward() to obtain passed in currState's prev state?
    // return prev state
  }

  // class specific funcs
  isTeleable(item) {
    return item.isTeleable
  }
}

/*
notes
  round?
  steps
    sub-steps
  can be just generate steps, where some steps are automated mechanics executions, some steps are actions (user triggered actions)
    user actions to be of same interface as mechanics, with forward(), backward(), generatePrevStep()
*/