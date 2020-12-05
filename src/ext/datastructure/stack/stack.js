import { CustomEvent } from '../../customevent'

export class Stack extends CustomEvent {
  constructor () {
    super()
    const _items = [] // 私有变量 存储栈元素的数组

    Object.assign(this, {
      push (item) {
        _items.push(item)
        this.fire('push', { pushItem: item })
      },
      pop () {
        const popItem = _items.pop()
        this.fire('pop', { popItem })
        return popItem
      },
      peek () {
        return _items[_items.length - 1]
      },
      isEmpty () {
        return _items.length === 0
      },
      size () {
        return _items.length
      },
      clear () {
        _items.splice(0, _items.length)
      },
      toString () {
        return `[${_items.join(',')}`
      },
      toArray () {
        return [..._items]
      }
    })
  }

}
