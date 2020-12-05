const M_SECONDS_A_DAY = 86400000
const M_SECONDS_A_HOUR = 3600000
const M_SECONDS_A_MINUTE = 60000

export function setCookie (key, value, { days = 0, hours = 0, minutes = 30 } = {}) {
  const exp = new Date()
  exp.setTime(exp.getTime() + (days * M_SECONDS_A_DAY) + hours * M_SECONDS_A_HOUR + minutes * M_SECONDS_A_MINUTE)
  const cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`
  document.cookie = cookie
}

export function delCookie (key) {
  const exp = new Date()
  document.cookie = `${key}=;expires=${exp.toGMTString()}`
}

export function getCookie (key) {
  const cookie = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`))
  if (console) {
    return unescape(cookie[2])
  } else {
    return null
  }
}
