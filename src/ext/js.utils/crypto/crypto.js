import CryptoJS from 'crypto-js'
// <script src="~/crypto-js.min.js"></script> // => CryptoJS

// import { STRING_CRYPTO_KEY, STRING_CRYPTO_IV } from '@/config/key.conf'
let STRING_CRYPTO_KEY = ''
let STRING_CRYPTO_IV = ''

export function setCryptoConfig ({ key, iv }) {
  STRING_CRYPTO_KEY = key
  STRING_CRYPTO_IV = iv
}

function getKey () {
  return STRING_CRYPTO_KEY
}

function getIv () {
  return STRING_CRYPTO_IV
}

export function enCrypto (str) {
  const key = CryptoJS.enc.Utf8.parse(getKey())
  const iv = CryptoJS.enc.Utf8.parse(getIv())
  let encrypted = ''
  const newVal = CryptoJS.enc.Utf8.parse(str)
  encrypted = CryptoJS.AES.encrypt(newVal, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}

export function deCrypto (str) {
  const key = CryptoJS.enc.Utf8.parse(getKey())
  const iv = CryptoJS.enc.Utf8.parse(getIv())
  const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
  const newVal = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(newVal, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
