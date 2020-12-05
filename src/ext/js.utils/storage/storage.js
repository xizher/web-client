export function setLocalStorage (key, value) {
  localStorage.setItem(key, value)
}

export function getLocalStorage (key) {
  return localStorage.getItem(key)
}

export function delLocalStorage (key) {
  localStorage.removeItem(key)
}

export function setSessionStorage (key, value) {
  sessionStorage.setItem(key, value)
}

export function getSessionStorage (key) {
  return sessionStorage.getItem(key)
}

export function delSessionStorage (key) {
  sessionStorage.removeItem(key)
}
