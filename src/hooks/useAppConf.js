import { deCrypto, getLocalStorage } from '../ext/js.utils'
export function useConfig () {
  return JSON.parse(deCrypto(getLocalStorage('appConf')))
}
