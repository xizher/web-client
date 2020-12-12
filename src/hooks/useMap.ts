import { WebMap } from '../map'

let _webMap: WebMap

export function setWebMap (webMap: WebMap) : void {
  _webMap = webMap
  Object.assign(window, { // 白盒测试
    _webMap
  })
}

export function getWebMap () : WebMap {
  return _webMap
}
