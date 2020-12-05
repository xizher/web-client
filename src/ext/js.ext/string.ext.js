String.prototype.$contain = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (this.toString() === arr[i]) {
      return true
    }
  }
  return false
}

String.prototype.$trimAll = function () {
  return this.replace(new RegExp(' ', 'gm'), '')
}

String.prototype.$replaceAll = function (searchValue, replaceValue) {
  return this.replace(new RegExp(searchValue, 'gm'), replaceValue)
}
