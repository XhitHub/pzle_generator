const mu = require.main.require('./myUtil')

class Navigate{
  constructor(obj) {
    this.posFrom = obj.posFrom
    this.posTo = obj.posTo
  }

  register(controllable) {
    // if actions are not stored in state, need to store assocation of controllable in action obj?
    this.controllable = controllable
  }

  forward(pzle) {
    if (mu.areSamePos(this.controllable.pos, this.posFrom)) {
      this.controllable.pos = mu.deepClone(this.posTo)
    }
  }

  backward(pzle) {
    if (mu.areSamePos(this.controllable.pos, this.posTo)) {
      this.controllable.pos = mu.deepClone(this.posFrom)
    }
  }
}

const generatePrevStep = (pzle) => {
  // random pick 1 controllable
  var c = mu.getRandomItem(pzle.state.controllables)
  var navAction = new Navigate({
    posFrom: mu.getRandomPos(pzle.state),
    posTo: mu.deepClone(c.pos)
  })
  console.log("generatePrevStep -> navAction", JSON.stringify(navAction))
  navAction.register(c)
  navAction.backward(pzle)
  pzle.addPrevStep({
    controllableActions: [
      navAction
    ]
  })
}

const stepGen = { 
  generatePrevStep,
  needEndCheck: false,
}
module.exports = stepGen