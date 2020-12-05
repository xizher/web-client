const assert = require('assert')
const { enCrypto, deCrypto } = require('../../js.utils')

describe('crypto 加密解密', () => {
  it('加密 再解密 结果相同', () => {
    const strVal = 'test'
    assert(deCrypto(enCrypto(strVal)) === strVal)
  })
  it('被加密信息 和 加密结果 不相同', () => {
    const strVal = 'test'
    assert(deCrypto(strVal) !== enCrypto(strVal))
  })
})
