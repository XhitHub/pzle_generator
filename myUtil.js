const deepClone = (obj) => {
  var s = JSON.stringify(obj)
  return JSON.parse(s)
}

const areSamePos = (p1, p2) => {
  // not all pzles are 2D map
  return p1.x == p2.x && p1.y == p2.y
}

const randomInt = (min, maxExclusive) => {
  var r = Math.floor(Math.random() * (maxExclusive - min))
  return r + min
}

const getRandomItem = arr => {
  res = null
  if (arr.length > 0) {
    var i = randomInt(0, arr.length)
    console.log("i", i)
    res = arr[i]
  }
  return res
}

const getRandomPos = state => {
  console.log("state", state)
  // not all pzles are simple rect map. this myUtil is actually [ simple 2D rect map pzle ]
  var xHalf = state.env.dimension.x/2
  var yHalf = state.env.dimension.y/2
  var res = {
    x: randomInt(-xHalf, xHalf),
    y: randomInt(-yHalf, yHalf),
  }
  return res
}

module.exports = {
  deepClone,
  areSamePos,
  randomInt,
  getRandomPos,
  getRandomItem,
}