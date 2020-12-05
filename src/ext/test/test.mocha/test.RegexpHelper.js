const assert = require('assert')
const faker = require('faker')
const { RegExpHelper } = require('../../js.utils')

describe('RegExpHelper url 判断', () => {
  for (let i = 0; i < 5; i++) {
    const url = faker.internet.url()
    it(`${url} 是 url`, () => {
      assert(RegExpHelper.URL(url) === true)
    })
  }
  it('ftp://aaa.bbb 是 url', () => {
    assert(RegExpHelper.URL('ftp://aaa.bbb') === true)
  })
  it('www.baidu.com 是 url', () => {
    assert(RegExpHelper.URL('http://www.baidu.com?a=b&b=c') === true)
  })
})
describe('RegExpHelper email 判断', () => {
  for (let i = 0; i < 5; i++) {
    const email = faker.internet.email()
    it(`${email} 是 email`, () => {
      assert(RegExpHelper.EMAIL(email) === true)
    })
  }
  it('eee@www 不是 email', () => {
    assert(RegExpHelper.EMAIL('eee@www') !== true)
  })
  it('eee@www.a 是 email', () => {
    assert(RegExpHelper.EMAIL('eee@www.a') === true)
  })
})
describe('RegExpHelper 非负整数 判断', () => {
  it('0 是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER(0) === true)
  })
  it('-1 不是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER(-1) !== true)
  })
  it('1 是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER(1) === true)
  })
  it('1.1 不是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER(1.1) !== true)
  })
  it('{String} 1.0 不是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER('1.0') !== true)
  })
  it('{Number} 1.0 是 非负整数', () => {
    assert(RegExpHelper.NON_NEGATIVE_INTEGER(1.0) === true)
  })
})
describe('RegExpHelper 正整数 判断', () => {
  it('0 不是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER(0) !== true)
  })
  it('-1 不是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER(-1) !== true)
  })
  it('1 是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER(1) === true)
  })
  it('{String} 1 是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER('1') === true)
  })
  it('{String} 1.0 不是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER('1.0') !== true)
  })
  it('{Number} 1.0 是 正整数', () => {
    assert(RegExpHelper.POSITION_INTEGER(1.0) === true)
  })
})
