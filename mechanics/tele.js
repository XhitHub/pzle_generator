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
    // randomly create a mechanic of this type, with its attrs ics such that the pzle's prev step has its state results in currState with this mechanic instance involved
    
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