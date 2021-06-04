class Tele {
  constructor(teleIn, teleOut, pzle) {
    this.teleIn = teleIn
    this.teleOut = teleOut
    this.pzle = pzle
  }

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

  isTeleable(item) {
    return item.isTeleable
  }
}