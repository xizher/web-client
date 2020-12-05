import { CustomEvent } from '../../customevent'

export class Queue extends CustomEvent {
  constructor () {
    super()
    const _items = [] // 私有变量 存储队列元素的数组

    Object.assign(this, {
      enqueue (item) {
        _items.unshift(item)
        this.fire('enqueue', { enqueueItem: item })
      },
      dequeue () {
        const dequeueItem = _items.pop()
        this.fire('dequeue', { dequeueItem })
        return dequeueItem
      },
      front () {
        return _items[_items.length - 1]
      },
      end () {
        return _items[0]
      },
      size () {
        return _items.length
      },
      isEmpty () {
        return _items.length === 0
      },
      clear () {
        _items.splice(0, _items.length)
      },
      toString () {
        return `-> ${_items.join(',')} ->`
      },
      toArray () {
        return [..._items]
      }
    })
  }
}
