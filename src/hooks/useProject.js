import { reactive, toRefs } from 'vue'

const zdol = {
  state: reactive({
    minLon: 0,
    maxLon: 0,
    lat: 0,
    loaded: false
  }),
  pixelData: null
}

export function useZdol () {
  const setLonlat = options => {
    zdol.state.minLon = options.minLon
    zdol.state.maxLon = options.maxLon
    zdol.state.lat = options.lat
  }
  const setPixelData = p => {
    zdol.pixelData = p
    zdol.state.loaded = true
  }
  const getPixelData = () => zdol.pixelData

  return {
    setLonlat, setPixelData, getPixelData,
    ...toRefs(zdol.state),
  }
}

const vzd = {
  pixelData: {
    GLC: null,
    DEM: null
  },
  state: reactive({
    loaded: false
  })
}

export function useVzd () {
  /**
   * @param { 'GLC' | 'DEM' } type
   */
  const getPixelData = type => vzd.pixelData[type]

  function setPixelData ({ glc, dem }) {
    vzd.pixelData.DEM = dem
    vzd.pixelData.GLC = glc
  }

  return {
    getPixelData, setPixelData,
    ...toRefs(vzd.state)
  }
}
