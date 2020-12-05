Array.prototype.$insert = function (index, item) {
  this.splice(index, 0, item)
}

Array.prototype.$remove = function (index) {
  const item = this[index]
  this.splice(index, 1)
  return item
}

Array.prototype.$clear = function () {
  this.splice(0, this.length)
}

Array.prototype.$reset = function (...items) {
  this.splice(0, this.length, ...items)
}

Array.prototype.$removeByValue = function (val, { many = false } = {}) {
  const evalStr = `
    for (let i = 0; i < this.length; i++) {
      if (this[i] === ${val}) {
        this.splice(i--, 1)
        ${many ? '' : 'break'}
      }
    }
  `
  eval(evalStr)
}

Array.prototype.$unique = function () {
  this.splice(0, this.length)
  this.push(...new Set(this))
}

Array.prototype.$getUnique = function () {
  return [...new Set(this)]
}

Array.prototype.$equal = function (array) {
  if (this.length !== array.length) {
    return false
  }
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== array[i]) {
      return false
    }
  }
  return true
}

Array.prototype.$findItem = function (propName, propValue) {
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    if (item[propName] === propValue) {
      return item
    }
  }
  return null
}

Array.prototype.$findItems = function (propName, propValue) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    if (item[propName] === propValue) {
      result.push(item)
    }
  }
  return result
}

Array.prototype.$propToArr = function (propName) {
  const propArr = []
  for (let i = 0; i < this.length; i++) {
    propArr.push(this[i][propName])
  }
  return propArr
}

Array.prototype.$sum = function () {
  let sum = 0
  this.forEach(item => sum += item)
  return sum
}

Array.prototype.$last = function () {
  return this[this.length - 1]
}

Array.prototype.$max = function () {
  return Math.max(...this)
}

Array.prototype.$min = function () {
  return Math.min(...this)
}

Array.prototype.$ave = function () {
  return this.$sum() / this.length
}
