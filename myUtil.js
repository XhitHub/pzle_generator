const deepClone = (obj) => {
  var s = JSON.stringify(obj)
  return JSON.parse(s)
}

const areSamePos = (p1, p2) => {
  return p1.x == p2.x && p1.y == p2.y
}

const randomInt = (min, max) => {
  var r = Math.ceil(Math.random() * (max - min))
  return r + min
}

const getRandomPos = state => {
  // not all pzles are simple rect map
}

module.exports = {
  deepClone,
  areSamePos,
  getRandomPos
}