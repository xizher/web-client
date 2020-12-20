let _webMap = null

export function useMap () {

  return {
    /**
     * @returns {import('../map/esri/mapinit/mapinit').WebMap}
     */
    getWebMap () {
      return _webMap
    },
    setWebMap (webMap) {
      _webMap = webMap
    }
  }
}
