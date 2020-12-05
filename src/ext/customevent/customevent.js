const ERROR_MUST_STRING = 'the first argument type is requird as string'
const ERROR_MUST_FUNCTION = 'the second argument fn is requird as function'

export class CustomEvent {
  constructor() {
    this._events = {}
  }

  on(name, fn, scope) {
    if (typeof name !== 'string') {
      console.error(ERROR_MUST_STRING)
    } else if (typeof fn !== 'function') {
      console.error(ERROR_MUST_FUNCTION)
    } else {
      name = name.toLowerCase()
      this._events[name] || (this._events[name] = [])
      // this._events?.[name] ?? (this._events[name] = [])
      this._events[name].push(scope ? [fn, scope] : [fn])
    }
    return fn
  }

  fire(name, data) {
    name = name.toLowerCase()
    const eventArr = this._events[name]
    if (eventArr) {
      const event = Object.assign({
        name, // 事件类型
        origin: this, // 绑定的源
      }, data)
      const len = eventArr.length
      for (let i = 0; i < eventArr.length; i++) {
        const item = eventArr[i]
        let fn = item[0]
        // event.scope = item[1] ?? {}
        event.scope = item[1] || {}
        fn(event)
        if (eventArr.length < len) {
          i--
        }
      }
    }
  }

  off(name, fn) {
    name = name.toLowerCase()
    const eventArr = this._events[name]
    if (!eventArr || eventArr.length === 0) {
      return
    }
    if (fn) {
      for (let i = 0; i < eventArr.length; i++) {
        if (fn === eventArr[i][0]) {
          eventArr.splice(i, 1)
          i-- // 可能存在一个事件一个函数绑定多次的情况
        }
      }
    } else {
      eventArr.splice(0, eventArr.length)
    }
  }

  one(name, fn, scope) {
    const nfn = () => {
      this.off(name, nfn)
      fn.apply(scope, arguments)
    }
    this.on(name, nfn, scope)
    return fn
  }
}

export default CustomEvent
