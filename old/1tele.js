class Tele {
  constructor(teleIn, teleOut, pzle) {
    this.teleIn = teleIn
    this.teleOut = teleOut
    this.pzle = pzle
  }

  // compulsory funcs
  forward() {
    // if any tele-able obj in pzle is in this.teleIn, tele it/them to teleOut
    this.pzle.items.forEach(
      item => {
        if (isTeleable(item) && areSamePos(item.pos, this.teleIn)) {
          item.pos = deepClone(this.teleOut)
        }
      }
    )
  }

  backward() {
    this.pzle.items.forEach(
      item => {
        if (isTeleable(item) && areSamePos(item.pos, this.teleOut)) {
          item.pos = deepClone(this.teleIn)
        }
      }
    )
  }

  generatePrevStep(currState) {
    /*
    randomly create a mechanic of this type, with its attrs ics such that the pzle's prev step has its state results in currState with this mechanic instance involved
    it is creating a step in a way in a path / reversedPath obj
    it can simply return a prev step, and let the parent func to handle the building of the big path obj.
      if prev step is given/obtained, building big path obj with the obtained prev step is same for any mechanics, thus should not be implemented in each mechanic individually
    */

    // tele target: randomly pick 1 teleable obj
    // generate tele
    //   this.teleOut: target's pos
    //   this.teleIn: random valid pos
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