import { setCryptoConfig } from '../ext/js.utils'
import { STRING_CRYPTO_KEY, STRING_CRYPTO_IV } from '../config/key.conf'

setCryptoConfig({
  key: STRING_CRYPTO_KEY, iv: STRING_CRYPTO_IV
})
