import appConf from '../config/app.conf'
import { setLocalStorage, getLocalStorage, enCrypto } from '../ext/js.utils'

if (!getLocalStorage('appConf')) {
  setLocalStorage('appConf', enCrypto(JSON.stringify(appConf)))
}
