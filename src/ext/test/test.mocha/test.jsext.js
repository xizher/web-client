const assert = require('assert')
require('../../js.ext')

describe('Array 扩展', () => {
  describe('.$insert()', () => {
    it('在数组第二位插入', () => {
      const test = [3, 2, 1]
      test.$insert(1, 5)
      assert(test[1] === 5)
    })
  })
  describe('.$remove()', () => {
    it('删除数组第二位', () => {
      const test = [3, 2, 1]
      assert(test.$remove(1) === 2)
    })
    it('删除数组第一位', () => {
      const test = [3, 2, 1]
      assert(test.$remove(0) !== test[0])
    })
  })
  describe('.$clear()', () => {
    it('清空数组', () => {
      const test = [3, 2, 1]
      test.$clear()
      assert(test.length === 0)
    })
  })
  describe('.$reset()', () => {
    it('重新设置数组', () => {
      const test = [3, 2, 1]
      test.$reset(1, 2)
      assert(test.length === 2 && test[0] === 1)
    })
  })
  describe('.$removeByValue()', () => {
    it('删除值为2的项（第一项）', () => {
      const test = [3, 2, 4, 2, 2]
      test.$removeByValue(2)
      assert(test.length === 4 && test[1] === 4)
    })
    it('删除值为2的所有项', () => {
      const test = [3, 2, 4, 2, 2]
      test.$removeByValue(2, { many: true })
      assert(test.length === 2 && test[0] === 3 && test[1] === 4)
    })
  })
  describe('.$getUnique()', () => {
    it('数据去重后 等于 其唯一值', () => {
      let test = [3, 2, 4, 2, 2]
      test = test.$getUnique()
      assert(test.length === 3 && test[0] === 3 && test[1] === 2)
    })
    it('方法执行后不影响自身', () => {
      const test = [3, 2, 4, 2, 2]
      const test2 = test.$getUnique()
      assert(test.length !== test2.length)
    })
  })
  describe('.$equal()', () => {
    it('数组全部项相等即为真', () => {
      const test = [1, 2, 3]
      const test2 = [1, 2, 3]
      assert(test.$equal(test2) === true)
    })
    it('数组全部项不等即为假', () => {
      const test = [1, 2, 4]
      const test2 = [1, 2, 3]
      assert(test.$equal(test2) !== true)
    })
    it('数组长度不等即为假', () => {
      const test = [1, 2, 4]
      const test2 = [1, 2]
      assert(test.$equal(test2) !== true)
    })
  })
  describe('.$findItem()', () => {
    it('寻找到正确的对象', () => {
      const test = [
        { a: 1, b: 2 },
        { a: 2, b: 4 },
        { a: 3, b: 6 },
      ]
      const test2 = test.$findItem('a', 1)
      assert(test2.b === 2)
    })
  })
  describe('.$findItems()', () => {
    it('寻找到正确的对象集', () => {
      const test = [
        { a: 1, b: 2 },
        { a: 2, b: 4 },
        { a: 1, b: 6 },
      ]
      const test2 = test.$findItems('a', 1)
      assert(test2.length === 2 && test2[0].b === 2 && test2[1].b === 6)
    })
  })
  describe('.$propToArr', () => {
    it('获得到正确的属性项', () => {
      const test = [
        { a: 1, b: 2 },
        { a: 2, b: 4 },
        { a: 1, b: 6 },
      ]
      const test2 = test.$propToArr('b')
      assert(test2.length === 3, test2.$equal([2, 4, 6]))
    })
  })
  describe('.$sum()', () => {
    it('1+2+3+4 值为 10', () => {
      const test = [1, 2, 3, 4]
      assert(test.$sum() === 10)
    })
  })
  describe('.$last()', () => {
    it('[1, 2, 3, 4] 最后一位是 4', () => {
      const test = [1, 2, 3 , 4]
      assert(test.$last() === 4)
    })
  })
  describe('.$max()', () => {
    it('[1, 2, 3, 4] 最大是 4', () => {
      const test = [1, 2, 3 , 4]
      assert(test.$max() === 4)
    })
  })
  describe('.$min()', () => {
    it('[1, 2, 3, 4] 最小是 1', () => {
      const test = [1, 2, 3 , 4]
      assert(test.$min() === 1)
    })
  })
  describe('.$ave()', () => {
    it('[1, 2, 3, 4] 平均值是 2.5', () => {
      const test = [1, 2, 3, 4]
      const test2 = test.$ave()
      assert(test2 === 2.5)
    })
  })

})

describe('String 扩展', () => {
  describe('.$contain()', () => {
    it('a 包含 在 [a, b, c]里面', () => {
      const test = ['a', 'b', 'c']
      assert('a'.$contain(test) === true)
    })
    it('a 不包含 在 [d, b, c]里面', () => {
      const test = ['d', 'b', 'c']
      assert('a'.$contain(test) !== true)
    })
  })
  describe('.$trimAll()', () => {
    it('能够清空字符串所有空格', () => {
      const test = '  ttt aaa s '
      assert(test.$trimAll() === 'tttaaas')
    })
  })
  describe('.$replaceAll()', () => {
    it('能够替换所有符合条件的字符', () => {
      const test = 'Hello World! Welcome!'
      assert(test.$replaceAll('o', '') === 'Hell Wrld! Welcme!')
    })
  })
})

describe('Number 扩展', () => {
  describe('.$toChineseNum()', () => {
    // it('101 是 一百零一', () => {
    //   const test = 101
    //   assert(test.$toChineseNum() === '一百零一', test.$toChineseNum())
    // })
  })
  describe('.$.floor()', () => {
    it('1.6 结果是 1', () => {
      const test = 1.6
      assert(test.$floor() === 1)
    })
  })
  describe('.$ceil()', () => {
    it('1.1 结果是2', () => {
      const test = 1.1
      assert(test.$ceil() === 2)
    })
  })
  describe('.$abs()', () => {
    it('-2 结果是 2', () => {
      const test = -2
      assert(test.$abs() === 2)
    })
  })
  describe('.$round()', () => {
    it('1.4 结果是 1', () => {
      const test = 1.4
      assert(test.$round() === 1)
    })
    it('1.5 结果是 2', () => {
      const test = 1.5
      assert(test.$round() === 2)
    })
  })
  describe('.$toDateFormat', () => {
    it('0 是 1970年', () => {
      const test = 0
      assert(test.$toDateFormat('yyyy') === '1970')
    })
  })
})

describe('Date 扩展', () => {
  describe('.$format()', () => {
    it('2020/01/30 08:44:55', () => {
      const date = new Date('2020/01/30 08:44:55')
      assert(date.$format('yyyy/MM/dd hh:mm:ss') === '2020/01/30 08:44:55')
    })
  })
  describe('.$getNextDate()', () => {
    it('2020/01/31 下一天是 1号', () => {
      const date = new Date('2020/01/31')
      assert(date.$getNextDate().getDate() === 1)
    })
    it('2020/01/31 前两天是 29号', () => {
      const date = new Date('2020/01/31')
      assert(date.$getNextDate(-2).getDate() === 29)
    })
  })
  describe('.$getMonth()', () => {
    it('2020/01/31 月份是 1', () => {
      const date = new Date('2020/01/31')
      assert(date.$getMonth() === 1)
    })
  })
})
