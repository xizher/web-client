let _webMap = null

export function useMap () {

  return {
    /**
     * @returns {import('../map/mapinit/mapinit').WebMap}
     */
    getWebMap () {
      return _webMap
    },
    setWebMap (webMap) {
      _webMap = webMap
    }
  }
}
