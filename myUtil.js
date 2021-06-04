const deepClone = (obj) => {
  var s = JSON.stringify(obj)
  return JSON.parse(s)
}

const areSamePos = (p1, p2) => {
  return p1.x == p2.x && p1.y == p2.y
}

module.export = {
  areSamePos
}