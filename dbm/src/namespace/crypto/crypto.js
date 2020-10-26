import namespace from '../namespace'
import CryptoJS from './crypto-js.min.js'
import { STRING_CRYPTO_KEY, STRING_CRYPTO_IV } from '../../config/key.conf'

namespace.reg('WXZ.Crypto')

WXZ.Crypto = class {
  static encrypto (val) {
    const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY)
    const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV)
    let encrypted = ''
    const newVal = CryptoJS.enc.Utf8.parse(val)
    encrypted = CryptoJS.AES.encrypt(newVal, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.ciphertext.toString()
  }

  static decrypto (val) {
    const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY);
    const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV);
    const encryptedHexStr = CryptoJS.enc.Hex.parse(val);
    const newVal = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(newVal, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}