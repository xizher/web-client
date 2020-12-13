let _webMap = null

export function useMap () {

  return {
    getWebMap () {
      return _webMap
    },
    setWebMap (webMap) {
      _webMap = webMap
    }
  }
}
