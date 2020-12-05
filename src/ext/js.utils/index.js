export * from './crypto/crypto'
export * from './cookie/cookie'
export * from './regular/regular'
export * from './storage/storage'

/**
 * 对象深拷贝
 * @param {Object} obj Javascript对象
 * @returns {Object} 深拷贝后的对象引用
 */
export function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 获取GUID字符串
 * @returns {String} GUID字符串
 */
export function guid () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 获取当前页面的根地址
 * @returns {String} 根地址字符串
 */
export function getRootPath () {
  let curPageUrl = window.document.location.href
  let temp = curPageUrl.split('//')
  let rootPath = temp[0] + '//' + temp[1].split('/')[0] + '/' + temp[1].split('/')[1]
  return rootPath
}

/**
 * 获取指定范围随机数
 * @param {Number} minValue 最小值
 * @param {Number} maxValue 最大值
 * @returns {Number} 指定范围的随机数
 */
export function randomRange (minValue, maxValue) {
  return minValue + Math.round(Math.random() * (maxValue - minValue))
}

export function getGeoLocation (options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error, Object.assign({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }, options))
    function success (position) {
      const { longitude, latitude } = position.coords
      resolve({
        lon: longitude,
        lat: latitude,
        detial: position
      })
    }
    function error (err) {
      reject(err)
    }
  })
}

export function watchGeoLocation (success, error, options) {
  const watchId = navigator.geolocation.watchPosition(position => {
    if (typeof success === 'function') {
      success({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
        detail: position
      })
    }
  }, err => {
    if (typeof error === 'function') {
      error(err)
    }
  }, Object.assign({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }, options))
  return {
    remove () {
      navigator.geolocation.clearWatch(watchId)
    }
  }
}

export function isFromMobileBrowser () {
  return !!navigator
    .userAgent
    .match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
